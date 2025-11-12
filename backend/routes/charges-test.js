const express = require('express');
const router = express.Router();
const axios = require('axios');

const WOOVI_API_URL = process.env.WOOVI_API_URL || 'https://api.openpix.com.br/api/v1';
const WOOVI_AUTHORIZATION = process.env.WOOVI_AUTHORIZATION;

router.post('/create-simple', async (req, res) => {
    try {
        console.log('🧪 Testando cobrança SIMPLES (sem split)...');
        
        const chargeData = {
            correlationID: `test-${Date.now()}`,
            value: 20000,
            comment: 'KaiNow Saúde - Teste sem split',
            customer: {
                name: 'Maria Teste',
                email: 'maria@teste.com'
            }
        };

        console.log('📤 Enviando para Woovi...');

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

        console.log('✅ Sucesso!');

        return res.status(201).json({
            success: true,
            charge: wooviResponse.data
        });

    } catch (error) {
        console.error('❌ Erro:', error.message);
        
        return res.status(500).json({
            error: 'Erro ao criar cobrança',
            message: error.message,
            wooviError: error.response?.data || null
        });
    }
});

module.exports = router;
