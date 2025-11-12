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

        // ✅ BUSCAR AFILIADO DIRETO DO FIREBASE
        console.log('🔍 Buscando afiliado no Firebase:', affiliate.id);
        
        const snapshot = await db.collection('afiliados')
            .where('slug', '==', affiliate.id)
            .limit(1)
            .get();
        
        if (snapshot.empty) {
            throw new Error('Afiliado não encontrado no Firebase');
        }
        
        const doc = snapshot.docs[0];
        const affiliateData = doc.data();
        
        console.log('✅ Afiliado encontrado:', affiliateData.name);

        // Criar cobrança mock
        const charge = {
            id: `charge_${Date.now()}`,
            value: productData.value,
            qrCode: `https://via.placeholder.com/300x300.png?text=QR+Code+PIX`,
            qrCodeText: `00020126360014BR.GOV.BCB.PIX0114+55119${Math.random().toString().slice(2,11)}520400005303986540${(productData.value/100).toFixed(2)}5802BR5925KaiNow Saude6009Sao Paulo`,
            paymentLink: `https://kainow-saude.pages.dev/pagamento-pix.html`,
            split: {
                company: { percentage: 80, value: Math.floor(productData.value * 0.8) },
                affiliate: { percentage: 20, value: Math.floor(productData.value * 0.2), pixKey: affiliateData.pixKey }
            },
            status: 'ACTIVE',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        console.log('✅ Cobrança criada com sucesso!');
        console.log('💰 Split:', charge.split);

        localStorage.setItem('kainow_current_charge', JSON.stringify({
            chargeId: charge.id,
            productId: productData.id,
            productName: productData.name,
            value: productData.value,
            qrCode: charge.qrCode,
            qrCodeText: charge.qrCodeText,
            paymentLink: charge.paymentLink,
            affiliateId: affiliate.id,
            affiliateName: affiliateData.name,
            split: charge.split,
            createdAt: new Date().toISOString(),
            expiresAt: charge.expiresAt
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
