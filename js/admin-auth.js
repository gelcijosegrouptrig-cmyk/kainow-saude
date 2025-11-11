/**
 * Sistema de Autenticação Administrativa
 * KaiNow Saúde - Proteção de Rotas Admin
 */

// Verificar se está logado como admin
function checkAdminAuth() {
    const sessionLocal = localStorage.getItem('kainow_admin_session');
    const sessionTemp = sessionStorage.getItem('kainow_admin_session');
    
    if (!sessionLocal && !sessionTemp) {
        // Não está logado - redirecionar para login
        window.location.href = 'login-admin.html';
        return false;
    }
    
    return true;
}

// Obter dados da sessão
function getAdminSession() {
    const sessionLocal = localStorage.getItem('kainow_admin_session');
    const sessionTemp = sessionStorage.getItem('kainow_admin_session');
    
    const sessionData = sessionLocal || sessionTemp;
    
    if (sessionData) {
        try {
            return JSON.parse(sessionData);
        } catch (e) {
            console.error('Erro ao parsear sessão:', e);
            return null;
        }
    }
    
    return null;
}

// Fazer logout
function adminLogout() {
    localStorage.removeItem('kainow_admin_session');
    sessionStorage.removeItem('kainow_admin_session');
    window.location.href = 'login-admin.html';
}

// Verificar se a sessão ainda é válida
function validateSession() {
    const session = getAdminSession();
    
    if (!session) {
        return false;
    }
    
    // Verificar se a sessão não expirou (24 horas)
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        // Sessão expirada
        adminLogout();
        return false;
    }
    
    return true;
}

// Executar verificação ao carregar a página
if (typeof window !== 'undefined') {
    // Verificar autenticação automaticamente em páginas admin
    const currentPath = window.location.pathname;
    
    // Páginas que requerem autenticação
    const protectedPages = [
        'dashboard-admin.html',
        'gerenciar-produtos.html',
        'gerenciar-afiliados.html'
    ];
    
    // Verificar se está em página protegida
    const isProtectedPage = protectedPages.some(page => currentPath.includes(page));
    
    if (isProtectedPage) {
        checkAdminAuth();
        validateSession();
    }
}
