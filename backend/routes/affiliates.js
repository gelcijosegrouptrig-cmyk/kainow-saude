const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = process.env.WOOVI_API_URL || 'https://api.woovi.com/api/v1';
const BACKEND_URL = process.env.BACKEND_URL;

const db = admin.firestore();

/**
 * ✅ CRIAR AFILIADO COM WEBHOOK AUTOMÁTICO
 * 
 * Cria afiliado no Firebase e registra webhook único na Woovi
 * 
 * POST /api/affiliates/create
 * Body: { name, email, phone, pixKey, commissionPercent, username, password }
 */
router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, pixKey, commissionPercent, username, password } = req.body;
    
    // Validações
    if (!name || !email || !pixKey || !commissionPercent) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: name, email, pixKey, commissionPercent'
      });
    }
    
    if (commissionPercent < 1 || commissionPercent > 100) {
      return res.status(400).json({
        success: false,
        error: 'Comissão deve ser entre 1% e 100%'
      });
    }
    
    console.log(`📝 Criando afiliado: ${name}`);
    
    // 1. Gerar ID único para o afiliado
    const affiliateRef = db.collection('affiliates').doc();
    const affiliateId = affiliateRef.id;
    
    console.log(`🆔 ID gerado: ${affiliateId}`);
    
    // 2. Criar webhook na Woovi
    const webhookData = {
      webhook: {
        name: `Webhook Afiliado - ${name}`,
        event: 'OPENPIX:TRANSACTION_RECEIVED',
        url: `${BACKEND_URL}/api/webhooks/affiliates/${affiliateId}`,
        authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
        isActive: true
      }
    };
    
    console.log(`🔗 Criando webhook na Woovi: ${webhookData.webhook.url}`);
    
    const webhookResponse = await axios.post(
      `${WOOVI_API_URL}/webhook`,
      webhookData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const webhookId = webhookResponse.data.webhook.id;
    
    console.log(`✅ Webhook criado: ${webhookId}`);
    
    // 3. Salvar afiliado no Firebase com webhook_id
    const affiliateData = {
      name,
      email,
      phone: phone || '',
      pixKey,
      commissionPercent: parseInt(commissionPercent),
      username: username || email,
      password: password || Math.random().toString(36).slice(-8),
      webhookId,
      webhookUrl: `${BACKEND_URL}/api/webhooks/affiliates/${affiliateId}`,
      totalCommissions: 0,
      totalSales: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    };
    
    await affiliateRef.set(affiliateData);
    
    console.log(`💾 Afiliado salvo no Firebase`);
    
    res.status(201).json({
      success: true,
      message: 'Afiliado criado com webhook automático!',
      affiliate: {
        id: affiliateId,
        name,
        email,
        pixKey,
        commissionPercent: parseInt(commissionPercent),
        webhookId,
        webhookUrl: `${BACKEND_URL}/api/webhooks/affiliates/${affiliateId}`,
        username: affiliateData.username,
        temporaryPassword: affiliateData.password
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar afiliado:', error.response?.data || error.message);
    
    // Registrar erro no Firebase
    try {
      await db.collection('errors').add({
        type: 'affiliate_creation',
        error: error.message,
        stack: error.stack,
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
 * ✅ LISTAR TODOS OS AFILIADOS
 * 
 * GET /api/affiliates/list
 */
router.get('/list', async (req, res) => {
  try {
    const snapshot = await db.collection('affiliates')
      .orderBy('createdAt', 'desc')
      .get();
    
    const affiliates = [];
    snapshot.forEach(doc => {
      affiliates.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    res.json({
      success: true,
      count: affiliates.length,
      affiliates
    });
    
  } catch (error) {
    console.error('Erro ao listar afiliados:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ BUSCAR AFILIADO POR ID
 * 
 * GET /api/affiliates/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('affiliates').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Afiliado não encontrado'
      });
    }
    
    const affiliate = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    };
    
    // Buscar estatísticas de comissões
    const commissionsSnapshot = await db.collection('commissions')
      .where('affiliateId', '==', id)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    const recentCommissions = [];
    commissionsSnapshot.forEach(doc => {
      recentCommissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate()
      });
    });
    
    res.json({
      success: true,
      affiliate,
      recentCommissions
    });
    
  } catch (error) {
    console.error('Erro ao buscar afiliado:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ ATUALIZAR AFILIADO
 * 
 * PUT /api/affiliates/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Remover campos que não devem ser atualizados
    delete updates.id;
    delete updates.webhookId;
    delete updates.webhookUrl;
    delete updates.createdAt;
    delete updates.totalCommissions;
    delete updates.totalSales;
    
    updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    
    await db.collection('affiliates').doc(id).update(updates);
    
    res.json({
      success: true,
      message: 'Afiliado atualizado com sucesso',
      affiliateId: id
    });
    
  } catch (error) {
    console.error('Erro ao atualizar afiliado:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ DELETAR AFILIADO E SEU WEBHOOK
 * 
 * DELETE /api/affiliates/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar afiliado
    const doc = await db.collection('affiliates').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Afiliado não encontrado'
      });
    }
    
    const affiliate = doc.data();
    
    // Deletar webhook na Woovi
    if (affiliate.webhookId) {
      try {
        await axios.delete(
          `${WOOVI_API_URL}/webhook/${affiliate.webhookId}`,
          {
            headers: {
              'Authorization': WOOVI_API_KEY
            }
          }
        );
        console.log(`🗑️ Webhook deletado na Woovi: ${affiliate.webhookId}`);
      } catch (error) {
        console.error('Erro ao deletar webhook:', error.message);
        // Continua mesmo se falhar (webhook pode já ter sido deletado)
      }
    }
    
    // Desativar afiliado (soft delete)
    await db.collection('affiliates').doc(id).update({
      isActive: false,
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      message: 'Afiliado desativado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao deletar afiliado:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * ✅ LISTAR WEBHOOKS ATIVOS NA WOOVI
 * 
 * GET /api/affiliates/webhooks/list-all
 */
router.get('/webhooks/list-all', async (req, res) => {
  try {
    const response = await axios.get(
      `${WOOVI_API_URL}/webhook`,
      {
        headers: {
          'Authorization': WOOVI_API_KEY
        }
      }
    );
    
    res.json({
      success: true,
      webhooks: response.data
    });
    
  } catch (error) {
    console.error('Erro ao listar webhooks:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
/**
 * ✅ BUSCAR AFILIADO POR SLUG
 * 
 * GET /api/affiliates/slug/:slug
 */
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    console.log('🔍 Buscando afiliado com slug:', slug);
    
    const snapshot = await db.collection('afiliados')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log('❌ Afiliado não encontrado:', slug);
      return res.status(404).json({
        success: false,
        error: 'Afiliado não encontrado',
        slug: slug
      });
    }
    
    const doc = snapshot.docs[0];
    const affiliate = {
      id: doc.id,
      ...doc.data()
    };
    
    console.log('✅ Afiliado encontrado:', affiliate.name);
    
    res.json(affiliate);
    
  } catch (error) {
    console.error('❌ Erro ao buscar afiliado por slug:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
/**
 * ✅ BUSCAR AFILIADO POR SLUG
 * 
 * GET /api/affiliates/slug/:slug
 */
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    console.log('🔍 Buscando afiliado com slug:', slug);
    
    const snapshot = await db.collection('afiliados')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log('❌ Afiliado não encontrado:', slug);
      return res.status(404).json({
        success: false,
        error: 'Afiliado não encontrado',
        slug: slug
      });
    }
    
    const doc = snapshot.docs[0];
    const affiliate = {
      id: doc.id,
      ...doc.data()
    };
    
    console.log('✅ Afiliado encontrado:', affiliate.name);
    
    res.json(affiliate);
    
  } catch (error) {
    console.error('❌ Erro ao buscar afiliado por slug:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
/**
 * ✅ BUSCAR AFILIADO POR SLUG
 * 
 * GET /api/affiliates/slug/:slug
 */
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    console.log('🔍 Buscando afiliado com slug:', slug);
    
    const snapshot = await db.collection('afiliados')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log('❌ Afiliado não encontrado:', slug);
      return res.status(404).json({
        success: false,
        error: 'Afiliado não encontrado',
        slug: slug
      });
    }
    
    const doc = snapshot.docs[0];
    const affiliate = {
      id: doc.id,
      ...doc.data()
    };
    
    console.log('✅ Afiliado encontrado:', affiliate.name);
    
    res.json(affiliate);
    
  } catch (error) {
    console.error('❌ Erro ao buscar afiliado por slug:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
module.exports = router;

module.exports = router;
