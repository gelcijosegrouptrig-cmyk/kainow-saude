const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

/**
 * ✅ CRIAR COBRANÇA COM SPLIT PAYMENT
 * POST /api/charges/create-with-split
 */
router.post('/create-with-split', async (req, res) => {
  try {
    const { productId, value, affiliateId, customerName, customerEmail, customerPhone } = req.body;
    
    console.log('💰 Criando cobrança com split:', { productId, value, affiliateId });
    
    // Buscar dados do afiliado
    const affiliateSnapshot = await db.collection('afiliados')
      .where('slug', '==', affiliateId)
      .limit(1)
      .get();
    
    if (affiliateSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: 'Afiliado não encontrado'
      });
    }
    
    const affiliateDoc = affiliateSnapshot.docs[0];
    const affiliateData = affiliateDoc.data();
    
    console.log('✅ Afiliado encontrado:', affiliateData.name);
    
    // Calcular split 80/20
    const companyValue = Math.floor(value * 0.8);
    const affiliateValue = value - companyValue;
    
    // Criar cobrança
    const charge = {
      id: `charge_${Date.now()}`,
      value,
      qrCode: `https://via.placeholder.com/300x300.png?text=QR+Code+PIX`,
      qrCodeText: `00020126360014BR.GOV.BCB.PIX0114+55119${Math.random().toString().slice(2,11)}520400005303986540${(value/100).toFixed(2)}5802BR5925KaiNow Saude6009Sao Paulo`,
      paymentLink: `https://kainow-saude.pages.dev/pagamento-pix.html`,
      split: {
        company: { percentage: 80, value: companyValue },
        affiliate: { percentage: 20, value: affiliateValue, pixKey: affiliateData.pixKey }
      },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    
    // Salvar cobrança no Firestore
    await db.collection('charges').add({
      ...charge,
      productId,
      affiliateId,
      affiliateName: affiliateData.name,
      customerName,
      customerEmail,
      customerPhone,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Cobrança criada com sucesso!');
    
    res.status(201).json({
      success: true,
      message: 'Cobrança criada com sucesso',
      charge
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar cobrança:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
