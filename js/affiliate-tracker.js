// Sistema de Rastreamento de Afiliados - KaiNow Saúde
// Detecta parâmetro ?ref= na URL e salva o afiliado responsável pela venda

(function() {
    'use strict';

    // Função para obter parâmetro da URL
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Função para salvar referência do afiliado
    function saveAffiliateRef(affiliateId) {
        // Salvar no localStorage com data de expiração (30 dias)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const affiliateData = {
            id: affiliateId,
            timestamp: new Date().toISOString(),
            expiry: expiryDate.toISOString(),
            page: window.location.pathname
        };

        localStorage.setItem('kainow_affiliate_ref', JSON.stringify(affiliateData));
        
        // Também salvar em cookie
        document.cookie = `kainow_ref=${affiliateId}; expires=${expiryDate.toUTCString()}; path=/`;
        
        console.log('✅ Referência de afiliado salva:', affiliateId);
    }

    // Função para obter afiliado salvo
    function getSavedAffiliate() {
        try {
            const data = localStorage.getItem('kainow_affiliate_ref');
            if (!data) return null;

            const affiliateData = JSON.parse(data);
            
            // Verificar se expirou
            const now = new Date();
            const expiry = new Date(affiliateData.expiry);
            
            if (now > expiry) {
                // Referência expirada, remover
                localStorage.removeItem('kainow_affiliate_ref');
                return null;
            }

            return affiliateData;
        } catch (e) {
            return null;
        }
    }

    // Função para modificar links de pagamento
    function updatePaymentLinks() {
        const affiliateRef = getSavedAffiliate();
        
        if (!affiliateRef) {
            console.log('ℹ️ Nenhuma referência de afiliado encontrada');
            return;
        }

        console.log('🔗 Atualizando links com afiliado:', affiliateRef.id);

        // Buscar todos os links de pagamento
        const paymentLinks = document.querySelectorAll('a[href*="woovi.com"]');
        
        paymentLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            
            // Adicionar parâmetro de afiliado ao link
            // Nota: Woovi pode ter API específica para split, ajuste conforme necessário
            const separator = originalHref.includes('?') ? '&' : '?';
            const newHref = `${originalHref}${separator}affiliate=${affiliateRef.id}`;
            
            link.setAttribute('href', newHref);
            link.setAttribute('data-affiliate', affiliateRef.id);
            
            console.log('✅ Link atualizado:', newHref);
        });

        // Registrar conversão potencial
        registerPotentialConversion(affiliateRef);
    }

    // Função para registrar conversão potencial
    function registerPotentialConversion(affiliateRef) {
        // Obter conversões anteriores
        let conversions = JSON.parse(localStorage.getItem('kainow_conversions') || '[]');

        // Adicionar nova conversão potencial
        const conversion = {
            affiliateId: affiliateRef.id,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            product: detectProduct(),
            status: 'potential'
        };

        conversions.push(conversion);
        
        // Manter apenas últimas 100 conversões
        if (conversions.length > 100) {
            conversions = conversions.slice(-100);
        }

        localStorage.setItem('kainow_conversions', JSON.stringify(conversions));
    }

    // Detectar produto da página atual
    function detectProduct() {
        const path = window.location.pathname;
        
        if (path.includes('mulher')) return 'mulher';
        if (path.includes('senior')) return 'senior';
        if (path.includes('farma')) return 'farma';
        if (path.includes('acolher')) return 'acolher';
        if (path.includes('orienta')) return 'orienta';
        if (path.includes('vivaleve')) return 'vivaleve';
        
        return 'unknown';
    }

    // Adicionar informação visual sobre afiliado (opcional)
    function showAffiliateInfo() {
        const affiliateRef = getSavedAffiliate();
        
        if (!affiliateRef) return;

        // Buscar informações do afiliado (por ID ou slug)
        const affiliates = JSON.parse(localStorage.getItem('kainow_affiliates') || '[]');
        const affiliate = affiliates.find(a => a.id === affiliateRef.id || a.slug === affiliateRef.id);

        if (!affiliate) return;

        // Criar banner discreto
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-4 right-4 bg-white border-2 border-primary rounded-lg shadow-xl p-4 z-50 max-w-sm';
        banner.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                    ${affiliate.name.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1">
                    <p class="text-xs text-gray-600">Indicado por:</p>
                    <p class="font-bold text-gray-800">${affiliate.name}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        // Remover após 10 segundos
        setTimeout(() => {
            banner.remove();
        }, 10000);
    }

    // Inicializar quando a página carregar
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar se tem parâmetro ?ref= na URL
        const affiliateId = getURLParameter('ref');
        
        if (affiliateId) {
            console.log('🎯 Referência de afiliado detectada:', affiliateId);
            saveAffiliateRef(affiliateId);
        }

        // Atualizar links de pagamento
        updatePaymentLinks();

        // Mostrar informação do afiliado (opcional)
        // showAffiliateInfo();
    });

    // Expor funções globalmente se necessário
    window.KaiNowAffiliate = {
        getSavedAffiliate: getSavedAffiliate,
        updatePaymentLinks: updatePaymentLinks
    };

})();
