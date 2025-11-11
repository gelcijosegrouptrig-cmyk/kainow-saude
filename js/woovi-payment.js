/**
 * WOOVI PAYMENT INTEGRATION
 * Integração completa com API Woovi para pagamentos PIX
 */

const WOOVI_CONFIG = {
    appId: 'Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9',
    apiUrl: 'https://api.woovi.com/api/v1'
};

/**
 * Criar cobrança PIX
 */
async function criarCobrancaPix(dados) {
    console.log('🔄 Criando cobrança PIX na Woovi...');
    console.log('Dados:', dados);

    const {
        clienteId,
        nome,
        email,
        cpf,
        telefone,
        programa,
        programaNome,
        valorMensal,
        afiliadoUsername,
        afiliadoNome,
        afiliadoCpf,
        afiliadoPixKey,
        comissaoPercent
    } = dados;

    // Calcular comissão
    const valorEmCentavos = Math.round(valorMensal * 100);
    const comissaoEmCentavos = Math.round(valorEmCentavos * (comissaoPercent / 100));

    try {
        // 1. Criar cobrança PIX
        const cobrancaPayload = {
            correlationID: `cliente_${clienteId}_${Date.now()}`,
            value: valorEmCentavos,
            comment: `${programaNome} - Mensalidade`,
            customer: {
                name: nome,
                email: email,
                phone: telefone,
                taxID: cpf.replace(/\D/g, '')
            },
            additionalInfo: [
                {
                    key: 'cliente_id',
                    value: clienteId
                },
                {
                    key: 'programa',
                    value: programa
                },
                {
                    key: 'programa_nome',
                    value: programaNome
                },
                {
                    key: 'afiliado_username',
                    value: afiliadoUsername || 'direto'
                },
                {
                    key: 'afiliado_nome',
                    value: afiliadoNome || 'Venda Direta'
                },
                {
                    key: 'comissao_percent',
                    value: comissaoPercent?.toString() || '0'
                },
                {
                    key: 'comissao_valor',
                    value: comissaoEmCentavos.toString()
                }
            ]
        };

        // Se tem afiliado, adicionar split
        if (afiliadoPixKey && comissaoPercent > 0) {
            cobrancaPayload.splits = [
                {
                    pixKey: afiliadoPixKey,
                    value: comissaoEmCentavos,
                    description: `Comissão de ${comissaoPercent}% - ${afiliadoNome}`
                }
            ];
        }

        console.log('📤 Payload da cobrança:', JSON.stringify(cobrancaPayload, null, 2));

        const response = await fetch(`${WOOVI_CONFIG.apiUrl}/charge`, {
            method: 'POST',
            headers: {
                'Authorization': WOOVI_CONFIG.appId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cobrancaPayload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Erro da API Woovi:', errorData);
            throw new Error(errorData.message || 'Erro ao criar cobrança');
        }

        const cobrancaData = await response.json();
        console.log('✅ Cobrança criada com sucesso:', cobrancaData);

        return {
            success: true,
            transactionId: cobrancaData.charge.transactionID,
            correlationID: cobrancaData.charge.correlationID,
            qrCode: cobrancaData.charge.qrCodeImage,
            qrCodeText: cobrancaData.charge.brCode,
            value: cobrancaData.charge.value,
            status: cobrancaData.charge.status,
            expiresAt: cobrancaData.charge.expiresDate
        };

    } catch (error) {
        console.error('❌ Erro ao criar cobrança PIX:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Verificar status do pagamento
 */
async function verificarStatusPagamento(transactionId) {
    try {
        console.log(`🔍 Verificando status do pagamento: ${transactionId}`);

        const response = await fetch(`${WOOVI_CONFIG.apiUrl}/charge/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': WOOVI_CONFIG.appId
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao verificar status');
        }

        const data = await response.json();
        console.log('📊 Status do pagamento:', data);

        return {
            success: true,
            status: data.charge.status,
            paidAt: data.charge.paidAt,
            value: data.charge.value
        };

    } catch (error) {
        console.error('❌ Erro ao verificar status:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Polling para verificar pagamento (verifica a cada 5 segundos)
 */
function iniciarPollingPagamento(transactionId, callback, maxTentativas = 60) {
    let tentativas = 0;
    
    const intervalo = setInterval(async () => {
        tentativas++;
        
        const resultado = await verificarStatusPagamento(transactionId);
        
        if (resultado.success) {
            if (resultado.status === 'COMPLETED') {
                clearInterval(intervalo);
                callback({ success: true, pago: true, data: resultado });
            } else if (resultado.status === 'EXPIRED') {
                clearInterval(intervalo);
                callback({ success: true, pago: false, expirado: true });
            }
        }
        
        // Parar após maxTentativas (5 minutos por padrão)
        if (tentativas >= maxTentativas) {
            clearInterval(intervalo);
            callback({ success: false, timeout: true });
        }
    }, 5000); // Verifica a cada 5 segundos
    
    return intervalo;
}

/**
 * Copiar código PIX
 */
function copiarCodigoPix(codigo) {
    navigator.clipboard.writeText(codigo).then(() => {
        console.log('✅ Código PIX copiado!');
        return true;
    }).catch(err => {
        console.error('❌ Erro ao copiar:', err);
        return false;
    });
}

// Exportar funções
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        criarCobrancaPix,
        verificarStatusPagamento,
        iniciarPollingPagamento,
        copiarCodigoPix
    };
}
