1	/**
     2	 * 🎯 Sistema de Redirecionamento para Checkout com Afiliados
     3	 * 
     4	 * Gerencia o fluxo de pagamento mantendo o rastreamento do afiliado
     5	 */
     6	
     7	// Função para redirecionar para checkout mantendo o afiliado
     8	// 🆕 ATUALIZADO: Agora redireciona para cadastro-checkout.html (cadastro ANTES do pagamento)
     9	function redirectToCheckout(program, value, programName) {
    10	    // Pegar parâmetros da URL atual
    11	    const urlParams = new URLSearchParams(window.location.search);
    12	    const affiliateRef = urlParams.get('ref');
    13	    
    14	    // Construir URL da página de cadastro (novo fluxo)
    15	    let checkoutUrl = `cadastro-checkout.html?program=${program}`;
    16	    
    17	    // Adicionar referência do afiliado se existir
    18	    if (affiliateRef) {
    19	        checkoutUrl += `&ref=${affiliateRef}`;
    20	        
    21	        // Log para debug
    22	        console.log('🎯 Redirecionando para cadastro com afiliado:', affiliateRef);
    23	    } else {
    24	        console.log('📝 Redirecionando para cadastro sem afiliado');
    25	    }
    26	    
    27	    // Redirecionar
    28	    window.location.href = checkoutUrl;
    29	}
    30	
    31	// Função para processar PIX Recorrente (usada nos programas)
    32	// 🆕 ATUALIZADO: Agora usa sistema de split com afiliados via Woovi
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
        
        // AGUARDAR função estar disponível (máximo 2 segundos)
        let tentativas = 0;
        const intervalo = setInterval(() => {
            if (typeof window.criarCobrancaComAfiliado === 'function') {
                clearInterval(intervalo);
                const valueInCents = Math.round(value * 100);
                console.log('🚀 Chamando criarCobrancaComAfiliado()');
                window.criarCobrancaComAfiliado({
                    id: program,
                    name: programName,
                    value: valueInCents
                });
            } else {
                tentativas++;
                if (tentativas > 20) { // 20 x 100ms = 2 segundos
                    clearInterval(intervalo);
                    console.error('❌ Timeout: função não carregou');
                    alert('Erro ao carregar sistema de pagamento. Recarregue a página.');
                }
            }
        }, 100);
        
        return; // Importante: não continuar
    } else {
        console.log('📝 Nenhum afiliado detectado, usando checkout padrão');
        redirectToCheckout(program, value, programName);
    }
}

    75	
    76	// Função para abrir checkout em modal (alternativa)
    77	// 🆕 ATUALIZADO: Modal agora abre página de cadastro
    78	function openCheckoutModal(program, value) {
    79	    // Criar modal
    80	    const modal = document.createElement('div');
    81	    modal.id = 'checkout-modal';
    82	    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    83	    modal.style.display = 'none';
    84	    
    85	    // Pegar afiliado da URL
    86	    const urlParams = new URLSearchParams(window.location.search);
    87	    const affiliateRef = urlParams.get('ref');
    88	    
    89	    // Construir URL do iframe (página de cadastro)
    90	    let iframeUrl = `cadastro-checkout.html?program=${program}&modal=true`;
    91	    if (affiliateRef) {
    92	        iframeUrl += `&ref=${affiliateRef}`;
    93	    }
    94	    
    95	    modal.innerHTML = `
    96	        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
    97	            <div class="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
    98	                <h3 class="text-xl font-bold text-gray-800">
    99	                    <i class="fas fa-user-plus mr-2 text-primary"></i>
   100	                    Cadastro e Assinatura
   101	                </h3>
   102	                <button onclick="closeCheckoutModal()" class="text-gray-500 hover:text-gray-700">
   103	                    <i class="fas fa-times text-2xl"></i>
   104	                </button>
   105	            </div>
   106	            <iframe 
   107	                src="${iframeUrl}" 
   108	                class="w-full h-[calc(90vh-80px)]"
   109	                frameborder="0"
   110	            ></iframe>
   111	        </div>
   112	    `;
   113	    
   114	    document.body.appendChild(modal);
   115	    
   116	    // Mostrar modal
   117	    setTimeout(() => {
   118	        modal.style.display = 'flex';
   119	    }, 100);
   120	    
   121	    // Fechar com ESC
   122	    document.addEventListener('keydown', function(e) {
   123	        if (e.key === 'Escape') {
   124	            closeCheckoutModal();
   125	        }
   126	    });
   127	}
   128	
   129	// Função para fechar modal
   130	function closeCheckoutModal() {
   131	    const modal = document.getElementById('checkout-modal');
   132	    if (modal) {
   133	        modal.style.display = 'none';
   134	        setTimeout(() => {
   135	            modal.remove();
   136	        }, 300);
   137	    }
   138	}
   139	
   140	// Exportar para uso global
   141	window.handlePixRecorrente = handlePixRecorrente;
   142	window.redirectToCheckout = redirectToCheckout;
   143	window.openCheckoutModal = openCheckoutModal;
   144	window.closeCheckoutModal = closeCheckoutModal;
   145	
   146	console.log('✅ Sistema de Cadastro e Checkout com Afiliados carregado');
   147	console.log('🎯 Fluxo ativo: Cadastro → Pagamento → Ativação');
   148	
