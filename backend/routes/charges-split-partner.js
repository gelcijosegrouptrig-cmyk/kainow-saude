/**
 * KAINOW SAÚDE - ROTAS DE COBRANÇAS COM SPLIT USANDO SPLIT-PARTNER API
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const SPLIT_PARTNER_API_URL = 'https://eb50a388.split-partner.pages.dev/api/v2/pix/split';

router.post('/create-with-split', async (req, res) => {
    try {
        console.log('🔄 Criando cobrança com split via Split Partner API...');
        
        const {
            productId,
            value,
            affiliateId,
            customerName,
            customerEmail,
            customerPhone
        } = req.body;

        if (!productId || !value || !affiliateId) {
            return res.status(400).json({
                error: 'Dados incompletos',
                message: 'productId, value e affiliateId são obrigatórios'
            });
        }

        console.log(`🔍 Buscando afiliado: ${affiliateId}`);
        const db = admin.firestore();
        const affiliatesSnapshot = await db.collection('affiliates')
            .where('slug', '==', affiliateId)
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

        console.log(`✅ Afiliado encontrado: ${affiliate.name}`);

        const valorEmReais = value / 100;
        const percentualAfiliado = 20;
        const percentualEmpresa = 80;

        const splitData = {
            valor_total: valorEmReais,
            descricao: `KaiNow Saúde - ${productId} - ${customerName || 'Cliente'}`,
            pessoa1: {
                nome: "KaiNow Saúde",
                chave_pix: process.env.KAINOW_PIX_KEY || "contato@kainow.com.br",
                percentual: percentualEmpresa
            },
            pessoa2: {
                nome: affiliate.name,
                chave_pix: affiliate.pixKey,
                percentual: percentualAfiliado
            }
        };

        console.log('📤 Enviando para Split Partner API...');

        const splitResponse = await axios.post(SPLIT_PARTNER_API_URL, splitData, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Cobrança criada via Split Partner!');

        const charge = splitResponse.data;

        await db.collection('charges').add({
            transactionId: charge.transaction_id,
            productId: productId,
            affiliateId: affiliateId,
            affiliateName: affiliate.name,
            value: value,
            valorEmReais: valorEmReais,
            affiliateCommission: Math.round(value * 0.20),
            companyAmount: Math.round(value * 0.80),
            status: charge.status || 'pending',
            qrCode: charge.qr_code || '',
            pixCopiaECola: charge.pix_copia_cola || '',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            customer: {
                name: customerName || '',
                email: customerEmail || '',
                phone: customerPhone || ''
            }
        });

        console.log('✅ Cobrança salva no Firebase!');

        return res.status(201).json({
            success: true,
            charge: {
                transactionId: charge.transaction_id,
                value: value,
                status: charge.status || 'pending',
                qrCodeImage: charge.qr_code_base64 ? `data:image/png;base64,${charge.qr_code_base64}` : null,
                brCode: charge.pix_copia_cola,
                split: {
                    empresa: { percentual: percentualEmpresa, valor: Math.round(value * 0.80) / 100 },
                    afiliado: { percentual: percentualAfiliado, valor: Math.round(value * 0.20) / 100 }
                }
            }
        });

    } catch (error) {
        console.error('❌ Erro:', error.message);
        return res.status(500).json({
            error: 'Erro ao criar cobrança',
            message: error.message
        });
    }
});

module.exports = router;
