/**
 * 🎯 Sistema de Redirecionamento para Checkout com Afiliados
 * 
 * Gerencia o fluxo de pagamento mantendo o rastreamento do afiliado
 */

// Função para redirecionar para checkout mantendo o afiliado
// 🆕 ATUALIZADO: Agora redireciona para inscricao.html (cadastro ANTES do pagamento)
function redirectToCheckout(program, value, programName) {
    // Pegar parâmetros da URL atual
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    
    // Construir URL da página de cadastro (novo fluxo)
    let checkoutUrl = `inscricao.html?program=${program}`;
    
    // Adicionar referência do afiliado se existir
    if (affiliateRef) {
        checkoutUrl += `&ref=${affiliateRef}`;
        
        // Log para debug
        console.log('🎯 Redirecionando para cadastro com afiliado:', affiliateRef);
    } else {
        console.log('📝 Redirecionando para cadastro sem afiliado');
    }
    
    // Redirecionar
    window.location.href = checkoutUrl;
}

// Função para processar PIX Recorrente (usada nos programas)
// 🆕 ATUALIZADO: Agora usa sistema de split com afiliados via Woovi
function handlePixRecorrente(program, value) {
    // Mapear nomes dos programas
    const programNames = {
        'mulher': 'KaiNow Mulher',
        'senior': 'KaiNow Sênior',
        'farma': 'KaiNow Farma',
        'acolher': 'KaiNow Acolher',
        'orienta': 'KaiNow Orienta',
        'vivaleve': 'KaiNow Viva Leve'
    };
    
    const programName = programNames[program] || 'KaiNow';
    
    // Verificar se tem afiliado rastreado
    const affiliate = window.KaiNowAffiliate ? window.KaiNowAffiliate.getSavedAffiliate() : null;
    
    if (affiliate && affiliate.id) {
        console.log('✅ Afiliado detectado:', affiliate.id);
        console.log('💰 Pagamento será dividido: 80% empresa + 20% afiliado');
        
        // Usar novo sistema de pagamento com split
        if (typeof window.criarCobrancaComAfiliado === 'function') {
            const valueInCents = Math.round(value * 100); // Converter para centavos
            console.log('🚀 Chamando criarCobrancaComAfiliado()');
            window.criarCobrancaComAfiliado({
                id: program,
                name: programName,
                value: valueInCents
            });
            return; // Importante: sair da função aqui!
        } else {
            console.error('❌ Sistema de pagamento com afiliado não carregado!');
            console.error('❌ window.criarCobrancaComAfiliado não existe');
            alert('Erro ao processar pagamento. Recarregue a página.');
            return;
        }
    } else {
        console.log('📝 Nenhum afiliado detectado, usando checkout padrão');
        // Redirecionar para página de cadastro sem afiliado
        redirectToCheckout(program, value, programName);
    }
}

// Função para abrir checkout em modal (alternativa)
// 🆕 ATUALIZADO: Modal agora abre página de cadastro
function openCheckoutModal(program, value) {
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.style.display = 'none';
    
    // Pegar afiliado da URL
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    
    // Construir URL do iframe (página de cadastro)
    let iframeUrl = `inscricao.html?program=${program}&modal=true`;
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
            <iframe 
                src="${iframeUrl}" 
                class="w-full h-[calc(90vh-80px)]"
                frameborder="0"
            ></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar modal
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 100);
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCheckoutModal();
        }
    });
}

// Função para fechar modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Exportar para uso global
window.handlePixRecorrente = handlePixRecorrente;
window.redirectToCheckout = redirectToCheckout;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;

console.log('✅ Sistema de Cadastro e Checkout com Afiliados carregado');
console.log('🎯 Fluxo ativo: Cadastro → Pagamento → Ativação');