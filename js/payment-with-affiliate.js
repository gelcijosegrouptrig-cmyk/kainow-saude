const BACKEND_URL = 'https://kainow-saude-production.up.railway.app';

async function criarCobrancaComAfiliado(productData) {
    try {
        console.log('🚀 Iniciando criação de cobrança...');
        const affiliate = KaiNowAffiliate.getSavedAffiliate();
        
        if (!affiliate || !affiliate.id) {
            alert('⚠️ Nenhum afiliado detectado.');
            return;
        }

        console.log('✅ Afiliado detectado:', affiliate.id);
        mostrarLoading('Gerando código PIX...');

        const affiliateResponse = await fetch(`${BACKEND_URL}/api/affiliates/${affiliate.id}`);
        if (!affiliateResponse.ok) throw new Error('Afiliado não encontrado');
        
        const affiliateData = await affiliateResponse.json();
        console.log('✅ Dados do afiliado carregados');

        const chargeData = {
            productId: productData.id,
            value: productData.value,
            affiliateId: affiliate.id,
            customerName: '',
            customerEmail: '',
            customerPhone: ''
        };

        console.log('📤 Criando cobrança na Woovi...');
        
        const response = await fetch(`${BACKEND_URL}/api/charges/create-with-split`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(chargeData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao criar cobrança');
        }

        const result = await response.json();
        console.log('✅ Cobrança criada com sucesso!');
        console.log('Split:', result.charge.split);

        localStorage.setItem('kainow_current_charge', JSON.stringify({
            chargeId: result.charge.id,
            productId: productData.id,
            productName: productData.name,
            value: productData.value,
            qrCode: result.charge.qrCode,
            qrCodeText: result.charge.qrCodeText,
            paymentLink: result.charge.paymentLink,
            affiliateId: affiliate.id,
            affiliateName: affiliateData.name || affiliate.id,
            createdAt: new Date().toISOString(),
            expiresAt: result.charge.expiresAt
        }));

        esconderLoading();
        window.location.href = '/pagamento-pix.html';

    } catch (error) {
        console.error('❌ Erro ao criar cobrança:', error);
        esconderLoading();
        alert('❌ Erro: ' + error.message);
    }
}

function mostrarLoading(mensagem) {
    esconderLoading();
    const loadingHTML = `
        <div id="kainow-payment-loading" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:99999">
            <div style="background:white;padding:40px;border-radius:12px;text-align:center">
                <div style="width:50px;height:50px;border:4px solid #f3f3f3;border-top:4px solid #1e40af;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px"></div>
                <p style="margin:0;font-size:18px;color:#333;font-weight:600">${mensagem}</p>
            </div>
        </div>
        <style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

function esconderLoading() {
    const loading = document.getElementById('kainow-payment-loading');
    if (loading) loading.remove();
}

function inicializarPagamentoAfiliado() {
    console.log('💳 Sistema de pagamento com afiliado inicializado');
    const affiliate = KaiNowAffiliate.getSavedAffiliate();
    if (affiliate && affiliate.id) {
        console.log('✅ Afiliado ativo:', affiliate.id);
    }
}

window.criarCobrancaComAfiliado = criarCobrancaComAfiliado;
window.mostrarLoading = mostrarLoading;
window.esconderLoading = esconderLoading;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarPagamentoAfiliado);
} else {
    inicializarPagamentoAfiliado();
}

console.log('✅ Sistema de pagamento com afiliado carregado');
console.log('✅ Função criarCobrancaComAfiliado() disponível globalmente');
