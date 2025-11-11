const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = process.env.WOOVI_API_URL || 'https://api.woovi.com/api/v1';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const db = admin.firestore();

/**
 * ✅ MIDDLEWARE: Validar Webhook
 */
const validateWebhook = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    console.error('❌ Webhook não autorizado:', authHeader);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

/**
 * ✅ ENDPOINT ÚNICO POR AFILIADO - PROCESSAR COMISSÃO AUTOMATICAMENTE
 * 
 * POST /api/webhooks/affiliates/:affiliateId
 * 
 * Este endpoint é chamado automaticamente pela Woovi quando:
 * - Cliente paga PIX Recorrente
 * - Woovi confirma transação
 * 
 * O que acontece automaticamente:
 * 1. Identifica afiliado pelo ID na URL
 * 2. Busca dados do afiliado no Firebase
 * 3. Calcula comissão (ex: 25%)
 * 4. Transfere PIX automaticamente para afiliado
 * 5. Registra comissão paga no Firebase
 * 6. Atualiza estatísticas do afiliado
 */
router.post('/affiliates/:affiliateId', validateWebhook, async (req, res) => {
  const startTime = Date.now();
  const { affiliateId } = req.params;
  const { charge, pix } = req.body;
  
  console.log('\n' + '='.repeat(60));
  console.log('🔔 WEBHOOK RECEBIDO');
  console.log('='.repeat(60));
  console.log(`📍 Afiliado ID: ${affiliateId}`);
  console.log(`💰 Valor: R$ ${(charge?.value / 100).toFixed(2)}`);
  console.log(`🔗 Charge ID: ${charge?.correlationID}`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  
  try {
    // 1. Validar dados do webhook
    if (!charge || !charge.value) {
      throw new Error('Webhook inválido: charge ou charge.value ausente');
    }
    
    // 2. Buscar dados do afiliado no Firebase
    console.log(`\n🔍 Buscando afiliado no Firebase...`);
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    
    if (!affiliateDoc.exists) {
      console.error(`❌ Afiliado ${affiliateId} não encontrado`);
      return res.status(404).json({ 
        error: 'Affiliate not found',
        affiliateId 
      });
    }
    
    const affiliate = affiliateDoc.data();
    console.log(`✅ Afiliado encontrado: ${affiliate.name}`);
    
    // Verificar se está ativo
    if (!affiliate.isActive) {
      console.error(`❌ Afiliado ${affiliate.name} está inativo`);
      return res.status(403).json({ 
        error: 'Affiliate is inactive',
        affiliateId 
      });
    }
    
    // 3. Calcular comissão
    const commissionPercent = affiliate.commissionPercent || 25;
    const saleValue = charge.value; // Em centavos
    const commissionValue = Math.floor((saleValue * commissionPercent) / 100);
    
    console.log(`\n📊 CÁLCULO DE COMISSÃO`);
    console.log(`   Venda: R$ ${(saleValue / 100).toFixed(2)}`);
    console.log(`   Percentual: ${commissionPercent}%`);
    console.log(`   Comissão: R$ ${(commissionValue / 100).toFixed(2)}`);
    
    // 4. Verificar comissão mínima (R$ 0.01)
    if (commissionValue < 1) {
      console.warn(`⚠️ Comissão muito baixa (< R$ 0.01), ignorando...`);
      return res.status(200).json({
        success: true,
        message: 'Commission too low, skipped',
        commissionValue
      });
    }
    
    // 5. Transferir PIX automaticamente para o afiliado
    console.log(`\n💸 Transferindo PIX para afiliado...`);
    console.log(`   Chave PIX: ${affiliate.pixKey}`);
    console.log(`   Valor: R$ ${(commissionValue / 100).toFixed(2)}`);
    
    const pixTransferData = {
      value: commissionValue,
      pixKey: affiliate.pixKey,
      correlationID: `commission_${affiliateId}_${Date.now()}`,
      description: `Comissão ${commissionPercent}% - ${charge.correlationID || 'Venda'}`
    };
    
    const transferResponse = await axios.post(
      `${WOOVI_API_URL}/charge`,
      pixTransferData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const pixTransactionId = transferResponse.data.charge?.correlationID || 'unknown';
    console.log(`✅ PIX transferido: ${pixTransactionId}`);
    
    // 6. Registrar comissão no Firebase
    console.log(`\n💾 Registrando comissão no Firebase...`);
    const commissionRef = await db.collection('commissions').add({
      affiliateId,
      affiliateName: affiliate.name,
      affiliateEmail: affiliate.email,
      chargeId: charge.correlationID || charge.transactionID || 'unknown',
      pixTransactionId,
      saleValue,
      commissionPercent,
      commissionValue,
      status: 'PAID',
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      webhookData: {
        charge: {
          correlationID: charge.correlationID,
          value: charge.value,
          status: charge.status
        },
        pix: pix ? {
          endToEndId: pix.endToEndId,
          time: pix.time
        } : null
      }
    });
    
    console.log(`✅ Comissão registrada: ${commissionRef.id}`);
    
    // 7. Atualizar estatísticas do afiliado
    console.log(`\n📈 Atualizando estatísticas do afiliado...`);
    await db.collection('affiliates').doc(affiliateId).update({
      totalCommissions: admin.firestore.FieldValue.increment(commissionValue),
      totalSales: admin.firestore.FieldValue.increment(1),
      lastSaleAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const processingTime = Date.now() - startTime;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 SUCESSO! Comissão paga para ${affiliate.name}`);
    console.log(`⚡ Tempo de processamento: ${processingTime}ms`);
    console.log(`${'='.repeat(60)}\n`);
    
    // TODO: Enviar notificação ao afiliado (email/WhatsApp)
    // sendNotification(affiliate.email, affiliate.phone, commissionValue);
    
    res.status(200).json({
      success: true,
      message: 'Commission processed successfully',
      commission: {
        id: commissionRef.id,
        affiliateId,
        affiliateName: affiliate.name,
        value: commissionValue,
        percent: commissionPercent,
        saleValue,
        pixTransactionId,
        processingTime: `${processingTime}ms`
      }
    });
    
  } catch (error) {
    console.error(`\n❌ ERRO AO PROCESSAR WEBHOOK`);
    console.error(`   Afiliado: ${affiliateId}`);
    console.error(`   Erro: ${error.message}`);
    console.error(`   Stack:`, error.stack);
    
    // Registrar erro no Firebase para auditoria
    try {
      await db.collection('webhook_errors').add({
        affiliateId,
        error: error.message,
        stack: error.stack,
        webhookData: req.body,
        headers: req.headers,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        errorType: error.response ? 'api_error' : 'internal_error',
        apiErrorData: error.response?.data || null
      });
      console.log(`📝 Erro registrado no Firebase`);
    } catch (dbError) {
      console.error(`❌ Erro ao registrar no Firebase:`, dbError.message);
    }
    
    const processingTime = Date.now() - startTime;
    console.log(`⏱️ Tempo até falha: ${processingTime}ms\n`);
    
    res.status(500).json({
      success: false,
      error: error.message,
      affiliateId,
      details: error.response?.data
    });
  }
});

/**
 * ✅ TESTAR WEBHOOK MANUALMENTE
 * 
 * POST /api/webhooks/test/:affiliateId
 * Body: { value: 4990 } // Valor em centavos
 */
router.post('/test/:affiliateId', async (req, res) => {
  try {
    const { affiliateId } = req.params;
    const { value = 4990 } = req.body; // Default: R$ 49,90
    
    // Simular webhook payload
    const testPayload = {
      charge: {
        correlationID: `test_${Date.now()}`,
        value: parseInt(value),
        status: 'COMPLETED'
      },
      pix: {
        endToEndId: `test_${Date.now()}`,
        time: new Date().toISOString()
      }
    };
    
    console.log(`\n🧪 TESTE DE WEBHOOK`);
    console.log(`   Afiliado: ${affiliateId}`);
    console.log(`   Valor: R$ ${(value / 100).toFixed(2)}`);
    
    // Chamar o endpoint de webhook
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/webhooks/affiliates/${affiliateId}`,
      testPayload,
      {
        headers: {
          'Authorization': `Bearer ${WEBHOOK_SECRET}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({
      success: true,
      message: 'Test webhook sent successfully',
      testPayload,
      response: response.data
    });
    
  } catch (error) {
    console.error('Erro no teste de webhook:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data
    });
  }
});

/**
 * ✅ LISTAR COMISSÕES PAGAS
 * 
 * GET /api/webhooks/commissions?affiliateId=xxx&limit=10
 */
router.get('/commissions', async (req, res) => {
  try {
    const { affiliateId, limit = 50 } = req.query;
    
    let query = db.collection('commissions')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit));
    
    if (affiliateId) {
      query = db.collection('commissions')
        .where('affiliateId', '==', affiliateId)
        .orderBy('createdAt', 'desc')
        .limit(parseInt(limit));
    }
    
    const snapshot = await query.get();
    
    const commissions = [];
    snapshot.forEach(doc => {
      commissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate()
      });
    });
    
    // Calcular totais
    const totalValue = commissions.reduce((sum, c) => sum + (c.commissionValue || 0), 0);
    const totalSales = commissions.reduce((sum, c) => sum + (c.saleValue || 0), 0);
    
    res.json({
      success: true,
      count: commissions.length,
      totalCommissionValue: totalValue,
      totalSalesValue: totalSales,
      commissions
    });
    
  } catch (error) {
    console.error('Erro ao listar comissões:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ LISTAR ERROS DE WEBHOOK
 * 
 * GET /api/webhooks/errors?limit=20
 */
router.get('/errors', async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    const snapshot = await db.collection('webhook_errors')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const errors = [];
    snapshot.forEach(doc => {
      errors.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      });
    });
    
    res.json({
      success: true,
      count: errors.length,
      errors
    });
    
  } catch (error) {
    console.error('Erro ao listar erros:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
