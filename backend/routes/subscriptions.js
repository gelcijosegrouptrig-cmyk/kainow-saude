const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = process.env.WOOVI_API_URL || 'https://api.woovi.com/api/v1';

const db = admin.firestore();

/**
 * ✅ CRIAR SUBSCRIPTION PIX RECORRENTE COM AFILIADO
 * 
 * POST /api/subscriptions/create
 * 
 * Body:
 * {
 *   affiliateId: "abc123",
 *   customerName: "João Silva",
 *   customerEmail: "joao@example.com",
 *   customerPhone: "+5511999999999",
 *   customerTaxID: "12345678900",
 *   program: "Kainow Básico",
 *   value: 4990  // R$ 49,90 em centavos
 * }
 */
router.post('/create', async (req, res) => {
  try {
    const {
      affiliateId,
      customerName,
      customerEmail,
      customerPhone,
      customerTaxID,
      program,
      value
    } = req.body;
    
    // Validações
    if (!affiliateId || !customerName || !customerEmail || !value || !program) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: affiliateId, customerName, customerEmail, value, program'
      });
    }
    
    console.log(`\n📝 CRIAR SUBSCRIPTION`);
    console.log(`   Cliente: ${customerName}`);
    console.log(`   Programa: ${program}`);
    console.log(`   Valor: R$ ${(value / 100).toFixed(2)}`);
    console.log(`   Afiliado: ${affiliateId}`);
    
    // 1. Buscar dados do afiliado
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    
    if (!affiliateDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Affiliate not found'
      });
    }
    
    const affiliate = affiliateDoc.data();
    console.log(`   Afiliado: ${affiliate.name} (${affiliate.commissionPercent}%)`);
    
    if (!affiliate.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Affiliate is inactive'
      });
    }
    
    // 2. Criar subscription na Woovi
    const subscriptionData = {
      value: parseInt(value), // Em centavos
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone || '',
        taxID: customerTaxID || ''
      },
      dayGenerateCharge: 25, // Dia 25 de cada mês
      frequency: 'MONTHLY',
      type: 'PIX_RECURRING',
      journeyType: 'PAYMENT_ON_APPROVAL', // Cobra logo após autorização
      additionalInfo: [
        {
          key: 'affiliate_id',
          value: affiliateId
        },
        {
          key: 'affiliate_name',
          value: affiliate.name
        },
        {
          key: 'affiliate_pix_key',
          value: affiliate.pixKey
        },
        {
          key: 'commission_percent',
          value: affiliate.commissionPercent.toString()
        },
        {
          key: 'program',
          value: program
        },
        {
          key: 'customer_name',
          value: customerName
        }
      ]
    };
    
    console.log(`\n🔗 Criando subscription na Woovi...`);
    
    const response = await axios.post(
      `${WOOVI_API_URL}/subscriptions`,
      subscriptionData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const subscription = response.data;
    const subscriptionId = subscription.globalID || subscription.id;
    
    console.log(`✅ Subscription criada: ${subscriptionId}`);
    
    // 3. Registrar subscription no Firebase
    const subscriptionRef = await db.collection('subscriptions').add({
      subscriptionId,
      affiliateId,
      affiliateName: affiliate.name,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      customerTaxID: customerTaxID || '',
      program,
      value: parseInt(value),
      frequency: 'MONTHLY',
      dayGenerateCharge: 25,
      status: 'ACTIVE',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`💾 Subscription registrada no Firebase: ${subscriptionRef.id}`);
    
    // 4. Atualizar contador do afiliado
    await db.collection('affiliates').doc(affiliateId).update({
      totalSubscriptions: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`\n🎉 Subscription criada com sucesso!\n`);
    
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      subscription: {
        id: subscriptionId,
        firestoreId: subscriptionRef.id,
        qrCodeImage: subscription.charge?.qrCodeImage || subscription.qrCodeImage,
        brCode: subscription.charge?.brCode || subscription.brCode,
        paymentLinkUrl: subscription.charge?.paymentLinkUrl || subscription.paymentLinkUrl,
        value: parseInt(value),
        frequency: 'MONTHLY',
        affiliate: {
          id: affiliateId,
          name: affiliate.name,
          commissionPercent: affiliate.commissionPercent
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar subscription:', error.response?.data || error.message);
    
    // Registrar erro
    try {
      await db.collection('errors').add({
        type: 'subscription_creation',
        error: error.message,
        stack: error.stack,
        requestData: req.body,
        apiError: error.response?.data,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error('Erro ao registrar erro:', e);
    }
    
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message,
      details: error.response?.data
    });
  }
});

/**
 * ✅ LISTAR SUBSCRIPTIONS
 * 
 * GET /api/subscriptions/list?affiliateId=xxx&limit=50
 */
router.get('/list', async (req, res) => {
  try {
    const { affiliateId, limit = 50, status } = req.query;
    
    let query = db.collection('subscriptions')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit));
    
    if (affiliateId) {
      query = db.collection('subscriptions')
        .where('affiliateId', '==', affiliateId)
        .orderBy('createdAt', 'desc')
        .limit(parseInt(limit));
    }
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query.get();
    
    const subscriptions = [];
    snapshot.forEach(doc => {
      subscriptions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    // Calcular total
    const totalValue = subscriptions.reduce((sum, s) => sum + (s.value || 0), 0);
    
    res.json({
      success: true,
      count: subscriptions.length,
      totalMonthlyValue: totalValue,
      subscriptions
    });
    
  } catch (error) {
    console.error('Erro ao listar subscriptions:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ BUSCAR SUBSCRIPTION POR ID
 * 
 * GET /api/subscriptions/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('subscriptions').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    const subscription = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    };
    
    // Buscar comissões relacionadas
    const commissionsSnapshot = await db.collection('commissions')
      .where('affiliateId', '==', subscription.affiliateId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    const commissions = [];
    commissionsSnapshot.forEach(doc => {
      commissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      });
    });
    
    res.json({
      success: true,
      subscription,
      recentCommissions: commissions
    });
    
  } catch (error) {
    console.error('Erro ao buscar subscription:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ CANCELAR SUBSCRIPTION
 * 
 * DELETE /api/subscriptions/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('subscriptions').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    const subscription = doc.data();
    
    // Cancelar na Woovi
    try {
      await axios.delete(
        `${WOOVI_API_URL}/subscriptions/${subscription.subscriptionId}`,
        {
          headers: {
            'Authorization': WOOVI_API_KEY
          }
        }
      );
      console.log(`🗑️ Subscription cancelada na Woovi: ${subscription.subscriptionId}`);
    } catch (error) {
      console.error('Erro ao cancelar na Woovi:', error.message);
      // Continua mesmo se falhar
    }
    
    // Atualizar status no Firebase
    await db.collection('subscriptions').doc(id).update({
      status: 'CANCELLED',
      cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
    
  } catch (error) {
    console.error('Erro ao cancelar subscription:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ ESTATÍSTICAS DE SUBSCRIPTIONS
 * 
 * GET /api/subscriptions/stats/summary
 */
router.get('/stats/summary', async (req, res) => {
  try {
    const { affiliateId } = req.query;
    
    let query = db.collection('subscriptions');
    
    if (affiliateId) {
      query = query.where('affiliateId', '==', affiliateId);
    }
    
    const snapshot = await query.get();
    
    let totalActive = 0;
    let totalCancelled = 0;
    let totalMonthlyValue = 0;
    let totalAnnualValue = 0;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      
      if (data.status === 'ACTIVE') {
        totalActive++;
        totalMonthlyValue += data.value || 0;
      } else if (data.status === 'CANCELLED') {
        totalCancelled++;
      }
    });
    
    totalAnnualValue = totalMonthlyValue * 12;
    
    res.json({
      success: true,
      stats: {
        totalSubscriptions: snapshot.size,
        totalActive,
        totalCancelled,
        totalMonthlyValue,
        totalAnnualValue,
        averageValue: snapshot.size > 0 ? Math.floor(totalMonthlyValue / totalActive) : 0
      }
    });
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
