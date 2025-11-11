/**
 * WEBHOOK WOOVI - Processamento Automático de Pagamentos
 * 
 * Este webhook é chamado pela Woovi quando um pagamento é confirmado.
 * Ele atualiza o status do cliente e processa a comissão do afiliado.
 */

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

/**
 * GET /webhook/woovi
 * 
 * Endpoint de teste (responde com 200 OK)
 */
router.get('/woovi', async (req, res) => {
    console.log('✅ Teste GET recebido no webhook');
    res.status(200).json({ 
        success: true, 
        message: 'Webhook endpoint is ready and listening',
        service: 'Kainow Saúde Backend',
        methods: ['GET', 'POST'],
        timestamp: new Date().toISOString()
    });
});

/**
 * POST /webhook/woovi
 * 
 * Recebe notificação da Woovi sobre pagamento
 */
router.post('/woovi', async (req, res) => {
    try {
        console.log('\n🔔 WEBHOOK RECEBIDO DA WOOVI');
        console.log('Headers:', req.headers);
        console.log('Body:', JSON.stringify(req.body, null, 2));

        // ✅ ACEITAR TESTES DO WOOVI (requisições vazias)
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log('✅ Teste do Woovi - Webhook endpoint está funcionando');
            return res.status(200).json({ 
                success: true, 
                message: 'Webhook endpoint ready',
                service: 'Kainow Saúde Backend',
                timestamp: new Date().toISOString()
            });
        }

        const { event, charge, evento } = req.body;

        // ✅ ACEITAR TESTE DO WOOVI (evento: "teste_webhook")
        if (evento === 'teste_webhook') {
            console.log('✅ Teste do Woovi aceito com sucesso!');
            return res.status(200).json({ 
                success: true, 
                message: 'Test webhook received successfully',
                service: 'Kainow Saúde Backend',
                event: event,
                timestamp: new Date().toISOString()
            });
        }

        // Validar evento real
        if (!event || !charge) {
            console.error('❌ Webhook inválido: faltam dados');
            return res.status(400).json({ error: 'Invalid webhook data' });
        }

        console.log(`📊 Evento: ${event}`);
        console.log(`💰 Charge ID: ${charge.transactionID}`);
        console.log(`💵 Valor: R$ ${(charge.value / 100).toFixed(2)}`);
        console.log(`📍 Status: ${charge.status}`);

        // Processar apenas pagamentos completos
        if (event === 'OPENPIX:CHARGE_COMPLETED' && charge.status === 'COMPLETED') {
            await processarPagamentoCompleto(charge);
        } else {
            console.log(`ℹ️ Evento ${event} ignorado (status: ${charge.status})`);
        }

        // Retornar 200 OK para Woovi
        res.status(200).json({ success: true, received: true });

    } catch (error) {
        console.error('❌ Erro no webhook:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Processar pagamento completo
 */
async function processarPagamentoCompleto(charge) {
    console.log('\n✅ PROCESSANDO PAGAMENTO COMPLETO');

    try {
        const transactionID = charge.transactionID;
        const correlationID = charge.correlationID;

        // 1. Buscar cliente pelo transactionID
        const clientesSnapshot = await db.collection('clientes')
            .where('pixTransactionId', '==', transactionID)
            .limit(1)
            .get();

        if (clientesSnapshot.empty) {
            console.error('❌ Cliente não encontrado para transactionID:', transactionID);
            return;
        }

        const clienteDoc = clientesSnapshot.docs[0];
        const clienteId = clienteDoc.id;
        const clienteData = clienteDoc.data();

        console.log(`👤 Cliente encontrado: ${clienteData.nome} (${clienteId})`);
        console.log(`📧 Email: ${clienteData.email}`);
        console.log(`💼 Programa: ${clienteData.programaNome}`);

        // 2. Atualizar status do cliente para ATIVO
        await db.collection('clientes').doc(clienteId).update({
            status: 'ativo',
            pixStatus: 'COMPLETED',
            pixPaidAt: admin.firestore.FieldValue.serverTimestamp(),
            dataPagamento: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('✅ Status do cliente atualizado para ATIVO');

        // 3. Processar comissão do afiliado (se houver)
        if (clienteData.indicadoPor && clienteData.afiliado) {
            await processarComissaoAfiliado(clienteData, charge);
        }

        // 4. Registrar histórico de pagamento
        await registrarHistoricoPagamento(clienteId, clienteData, charge);

        // 5. Enviar notificações (opcional)
        // await enviarNotificacoes(clienteData);

        console.log('✅ Pagamento processado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao processar pagamento:', error);
        throw error;
    }
}

/**
 * Processar comissão do afiliado
 */
async function processarComissaoAfiliado(clienteData, charge) {
    console.log('\n💰 PROCESSANDO COMISSÃO DO AFILIADO');

    try {
        const afiliadoUsername = clienteData.indicadoPor;
        const valorPago = charge.value; // Em centavos
        const comissaoPercent = clienteData.afiliado?.comissao || 20;
        const comissaoValor = Math.round(valorPago * (comissaoPercent / 100));

        console.log(`👤 Afiliado: ${clienteData.afiliado.nome}`);
        console.log(`💵 Valor pago: R$ ${(valorPago / 100).toFixed(2)}`);
        console.log(`📊 Comissão: ${comissaoPercent}%`);
        console.log(`💰 Valor da comissão: R$ ${(comissaoValor / 100).toFixed(2)}`);

        // Buscar afiliado no Firestore
        const afiliadosSnapshot = await db.collection('afiliados')
            .where('username', '==', afiliadoUsername)
            .limit(1)
            .get();

        if (afiliadosSnapshot.empty) {
            console.error('❌ Afiliado não encontrado:', afiliadoUsername);
            return;
        }

        const afiliadoDoc = afiliadosSnapshot.docs[0];
        const afiliadoId = afiliadoDoc.id;
        const afiliadoData = afiliadoDoc.data();

        // Registrar comissão
        const comissaoId = `comissao_${charge.transactionID}`;
        await db.collection('comissoes').doc(comissaoId).set({
            afiliadoId: afiliadoId,
            afiliadoUsername: afiliadoUsername,
            afiliadoNome: afiliadoData.nome,
            clienteId: clienteData.id || charge.correlationID,
            clienteNome: clienteData.nome,
            programa: clienteData.programa,
            programaNome: clienteData.programaNome,
            valorVenda: valorPago,
            comissaoPercent: comissaoPercent,
            comissaoValor: comissaoValor,
            pixTransactionId: charge.transactionID,
            pixCorrelationId: charge.correlationID,
            status: 'pendente', // pendente, pago, cancelado
            dataCriacao: admin.firestore.FieldValue.serverTimestamp(),
            dataVencimento: admin.firestore.Timestamp.fromDate(
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
            )
        });

        console.log('✅ Comissão registrada com sucesso!');

        // Atualizar estatísticas do afiliado
        await db.collection('afiliados').doc(afiliadoId).update({
            totalVendas: admin.firestore.FieldValue.increment(1),
            totalComissoes: admin.firestore.FieldValue.increment(comissaoValor),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('✅ Estatísticas do afiliado atualizadas!');

        // Se o afiliado tem chave PIX, criar split automático
        if (afiliadoData.pixKey) {
            console.log(`🔄 Split automático será processado pela Woovi`);
            console.log(`💳 Chave PIX do afiliado: ${afiliadoData.pixKey}`);
            // O split já foi configurado na criação da cobrança
        }

    } catch (error) {
        console.error('❌ Erro ao processar comissão:', error);
        // Não falhar o webhook se a comissão falhar
    }
}

/**
 * Registrar histórico de pagamento
 */
async function registrarHistoricoPagamento(clienteId, clienteData, charge) {
    console.log('\n📝 REGISTRANDO HISTÓRICO DE PAGAMENTO');

    try {
        const pagamentoId = `pagamento_${charge.transactionID}`;
        
        await db.collection('pagamentos').doc(pagamentoId).set({
            clienteId: clienteId,
            clienteNome: clienteData.nome,
            clienteEmail: clienteData.email,
            programa: clienteData.programa,
            programaNome: clienteData.programaNome,
            valor: charge.value,
            valorFormatado: `R$ ${(charge.value / 100).toFixed(2)}`,
            metodoPagamento: 'PIX',
            pixTransactionId: charge.transactionID,
            pixCorrelationId: charge.correlationID,
            pixPaidAt: charge.paidAt ? admin.firestore.Timestamp.fromDate(new Date(charge.paidAt)) : null,
            status: 'pago',
            dataCriacao: admin.firestore.FieldValue.serverTimestamp(),
            metadata: {
                chargeData: charge
            }
        });

        console.log('✅ Histórico de pagamento registrado!');

    } catch (error) {
        console.error('❌ Erro ao registrar histórico:', error);
        // Não falhar o webhook se o histórico falhar
    }
}

/**
 * Enviar notificações (opcional)
 */
async function enviarNotificacoes(clienteData) {
    console.log('\n📧 ENVIANDO NOTIFICAÇÕES');
    
    // TODO: Implementar envio de email
    // TODO: Implementar envio de WhatsApp (Twilio, etc)
    
    console.log('ℹ️ Notificações não implementadas ainda');
}

module.exports = router;
