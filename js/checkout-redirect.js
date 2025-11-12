const programNames = {
    'programa-mulher': 'KaiNow Mulher',
    'programa-senior': 'KaiNow Sênior', 
    'programa-farma': 'KaiNow Farma',
    'programa-acolher': 'KaiNow Acolher',
    'programa-orienta': 'KaiNow Orienta',
    'programa-vivaleve': 'KaiNow Viva Leve'
};

async function handlePixRecorrente(program, value, programName) {
    const savedAffiliate = JSON.parse(localStorage.getItem('kainow_affiliate') || 'null');
    
    if (savedAffiliate && savedAffiliate.slug) {
        console.log('✅ Afiliado detectado:', savedAffiliate.slug);
        console.log('💰 Pagamento será dividido: 80% empresa + 20% afiliado');
        console.log('🎯 Redirecionando para cadastro...');
        
        // Redirecionar para cadastro com afiliado
        window.location.href = `cadastro-checkout.html?program=${program}&ref=${savedAffiliate.slug}`;
        return;
    }
    
    // Sem afiliado: fluxo normal
    console.log('📝 Sem afiliado, redirecionando para cadastro...');
    window.location.href = `cadastro-checkout.html?program=${program}`;
}

function redirectToCheckout(program, value, programName) {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    let checkoutUrl = `cadastro-checkout.html?program=${program}`;
    if (affiliateRef) {
        checkoutUrl += `&ref=${affiliateRef}`;
        console.log('🎯 Redirecionando para cadastro com afiliado:', affiliateRef);
    } else {
        console.log('📝 Redirecionando para cadastro sem afiliado');
    }
    window.location.href = checkoutUrl;
}

function openCheckoutModal(program, value) {
    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.style.display = 'none';
    
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    let iframeUrl = `cadastro-checkout.html?program=${program}&modal=true`;
    if (affiliateRef) {
        iframeUrl += `&ref=${affiliateRef}`;
    }
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div class="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                <h3 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-user-plus mr-2 text-primary"></i>
                    Cadastro e Assinatura
                </h3>
                <button onclick="closeCheckoutModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            <iframe src="${iframeUrl}" class="w-full h-[calc(90vh-80px)]" frameborder="0"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => { modal.style.display = 'flex'; }, 100);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCheckoutModal();
        }
    });
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => { modal.remove(); }, 300);
    }
}

window.handlePixRecorrente = handlePixRecorrente;
window.redirectToCheckout = redirectToCheckout;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;

console.log('✅ Sistema de Cadastro e Checkout com Afiliados carregado');
console.log('🎯 Fluxo ativo: Cadastro → Pagamento → Ativação');