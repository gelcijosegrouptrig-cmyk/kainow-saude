/**
 * KAINOW SAÚDE - ROTAS DE COBRANÇAS (CHARGES)
 * Criação de cobranças PIX com split de pagamento para afiliados
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

// Configurações da Woovi (OpenPix)
const WOOVI_API_URL = process.env.WOOVI_API_URL || 'https://api.openpix.com.br/api/v1';
const WOOVI_AUTHORIZATION = process.env.WOOVI_AUTHORIZATION;
const WOOVI_APP_ID = process.env.WOOVI_APP_ID;

/**
 * POST /api/charges/create-with-split
 * Cria uma cobrança PIX com split automático de pagamento
 */
router.post('/create-with-split', async (req, res) => {
    try {
        console.log('🔄 Criando cobrança com split...');
        
        const {
            productId,
            value,
            affiliateId,
            customerName,
            customerEmail,
            customerPhone
        } = req.body;

        // Validações
        if (!productId || !value || !affiliateId) {
            return res.status(400).json({
                error: 'Dados incompletos',
                message: 'productId, value e affiliateId são obrigatórios'
            });
        }

        // Buscar dados do afiliado no Firebase
        console.log(`🔍 Buscando afiliado: ${affiliateId}`);
        const db = admin.firestore();
        const affiliatesSnapshot = await db.collection('affiliates')
            .where('username', '==', affiliateId)
            .limit(1)
            .get();

        if (affiliatesSnapshot.empty) {
            return res.status(404).json({
                error: 'Afiliado não encontrado',
                affiliateId: affiliateId
            });
        }

        const affiliateDoc = affiliatesSnapshot.docs[0];
        const affiliate = affiliateDoc.data();

        console.log(`✅ Afiliado encontrado: ${affiliate.nome || affiliate.username}`);

        // Calcular split: 80% empresa, 20% afiliado
        const affiliateCommission = Math.round(value * 0.20);
        const companyAmount = Math.round(value * 0.80);

        console.log(`💰 Split: Empresa=${companyAmount} | Afiliado=${affiliateCommission}`);

        // Criar cobrança na Woovi
        const correlationID = `${productId}-${affiliateId}-${Date.now()}`;
        
        const chargeData = {
            correlationID: correlationID,
            value: value,
            comment: `KaiNow Saúde - ${productId}`,
            customer: {
                name: customerName || 'Cliente KaiNow',
                email: customerEmail || '',
                phone: customerPhone || '',
                taxID: ''
            }
        };

        // Adicionar split se houver chave PIX configurada
        if (affiliate.pixKey && affiliate.pixType) {
            chargeData.additionalInfo = [{
                key: 'Split',
                value: `Afiliado: ${affiliate.nome || affiliate.username} - 20%`
            }];
        }

        console.log('📤 Enviando para Woovi API...');

        const wooviResponse = await axios.post(
            `${WOOVI_API_URL}/charge`,
            chargeData,
            {
                headers: {
                    'Authorization': WOOVI_AUTHORIZATION,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Cobrança criada na Woovi!');

        const charge = wooviResponse.data.charge;

        // Salvar no Firebase
        await db.collection('charges').add({
            chargeId: charge.correlationID,
            productId: productId,
            affiliateId: affiliateId,
            affiliateName: affiliate.nome || affiliate.username,
            value: value,
            affiliateCommission: affiliateCommission,
            companyAmount: companyAmount,
            status: 'ACTIVE',
            qrCode: charge.qrCodeImage || charge.brCode,
            qrCodeText: charge.brCode,
            paymentLink: charge.paymentLinkUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            expiresAt: charge.expiresDate || null,
            customer: {
                name: customerName || '',
                email: customerEmail || '',
                phone: customerPhone || ''
            }
        });

        console.log('✅ Cobrança salva no Firebase!');

        // Retornar dados para frontend
        res.status(201).json({
            success: true,
            charge: {
                id: charge.correlationID,
                qrCode: charge.qrCodeImage || charge.brCode,
                qrCodeText: charge.brCode,
                paymentLink: charge.paymentLinkUrl,
                value: value,
                split: {
                    affiliate: affiliateCommission,
                    company: companyAmount
                },
                expiresAt: charge.expiresDate
            }
        });

    } catch (error) {
        console.error('❌ Erro ao criar cobrança:', error);
        
        if (error.response) {
            console.error('Woovi API Error:', {
                status: error.response.status,
                data: error.response.data
            });
        }

        res.status(500).json({
            error: 'Erro ao criar cobrança',
            message: error.message,
            details: error.response?.data || null
        });
    }
});

/**
 * GET /api/charges/:chargeId
 * Consulta status de uma cobrança
 */
router.get('/:chargeId', async (req, res) => {
    try {
        const { chargeId } = req.params;

        const db = admin.firestore();
        const chargesSnapshot = await db.collection('charges')
            .where('chargeId', '==', chargeId)
            .limit(1)
            .get();

        if (chargesSnapshot.empty) {
            return res.status(404).json({
                error: 'Cobrança não encontrada',
                chargeId: chargeId
            });
        }

        const chargeDoc = chargesSnapshot.docs[0];
        const charge = chargeDoc.data();

        res.json({
            success: true,
            charge: {
                id: charge.chargeId,
                status: charge.status,
                value: charge.value,
                affiliateId: charge.affiliateId,
                affiliateName: charge.affiliateName,
                createdAt: charge.createdAt,
                split: {
                    affiliate: charge.affiliateCommission,
                    company: charge.companyAmount
                }
            }
        });

    } catch (error) {
        console.error('❌ Erro ao consultar cobrança:', error);
        res.status(500).json({
            error: 'Erro ao consultar cobrança',
            message: error.message
        });
    }
});

module.exports = router;
