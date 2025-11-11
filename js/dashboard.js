// Dashboard JavaScript - KaiNow Saúde

// Constante para chave da sessão (deve ser igual ao auth.js)
const SESSION_KEY = 'kainow_user_session';

// Verificar se usuário está logado
function checkAuth() {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    
    console.log('🔍 Dashboard - Verificando autenticação...');
    console.log('🔑 Chave da sessão:', SESSION_KEY);
    console.log('👤 Usuário encontrado:', user);
    
    if (!user) {
        console.log('❌ Usuário não encontrado - Redirecionando para login');
        // Redirecionar para login se não estiver logado
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return null;
    }
    
    console.log('✅ Usuário autenticado:', user.nome);
    return user;
}

// Carregar dados do usuário
function loadUserData() {
    const user = checkAuth();
    
    if (!user) return;
    
    // Atualizar nome do usuário
    const userName = user.nome || user.email.split('@')[0];
    document.getElementById('user-name-header').textContent = userName;
    document.getElementById('welcome-text').textContent = `Olá, ${userName}!`;
    
    // Atualizar inicial
    const initial = userName.charAt(0).toUpperCase();
    document.getElementById('user-initial').textContent = initial;
}

// Toggle mobile menu
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// Logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        console.log('🚪 Fazendo logout...');
        localStorage.removeItem(SESSION_KEY);
        console.log('✅ Sessão removida');
        window.location.href = 'index.html';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    
    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                toggleMobileMenu();
            }
        });
    });
});
