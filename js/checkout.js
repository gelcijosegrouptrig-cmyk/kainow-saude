// Checkout JavaScript - KaiNow Saúde

// Constante para chave da sessão (deve ser igual ao auth.js)
const SESSION_KEY = 'kainow_user_session';

// Dados dos programas
const programs = {
    'mulher': {
        name: 'KaiNow Mulher',
        price: 49.90,
        icon: 'fa-venus',
        color: 'pink'
    },
    'senior': {
        name: 'KaiNow Sênior',
        price: 59.90,
        icon: 'fa-user-shield',
        color: 'amber'
    },
    'farma': {
        name: 'KaiNow Farma',
        price: 19.90,
        icon: 'fa-pills',
        color: 'green'
    },
    'acolher': {
        name: 'KaiNow Acolher',
        price: 24.90,
        icon: 'fa-hands-holding-child',
        color: 'blue'
    },
    'orienta': {
        name: 'KaiNow Orienta',
        price: 19.90,
        icon: 'fa-lightbulb',
        color: 'purple'
    },
    'vivaleve': {
        name: 'KaiNow Viva Leve',
        price: 24.90,
        icon: 'fa-spa',
        color: 'teal'
    }
};

// Criar usuário de teste (apenas para demonstração)
function createTestUser() {
    // Verificar se já existe algum usuário
    const existingUser = localStorage.getItem(SESSION_KEY);
    
    if (!existingUser) {
        // Criar usuário de teste (CPF válido)
        const testUser = {
            cpf: '111.444.777-35',
            nome: 'Usuário Teste',
            email: 'teste@kainow.com',
            telefone: '(27) 99798-1963',
            dataNascimento: '01/01/1990',
            genero: 'outro'
        };
        
        // Salvar usuário de teste
        localStorage.setItem(SESSION_KEY, JSON.stringify(testUser));
        
        console.log('✅ Usuário de teste criado!');
        console.log('📋 CPF: 111.444.777-35');
        console.log('🔑 Senha: teste123');
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    createTestUser(); // Criar usuário de teste se não existir
    checkUserLogin();
    loadProgramFromURL();
    setupCardFormatting();
});

// Verificar se usuário está logado
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    console.log('🛒 Checkout - Verificando login:', user);
    
    if (user) {
        // Usuário logado - mostrar seção de pagamento
        document.getElementById('user-avatar').textContent = user.nome.charAt(0).toUpperCase();
        document.getElementById('user-greeting').textContent = `Olá, ${user.nome.split(' ')[0]}!`;
        document.getElementById('login-check').classList.remove('bg-white');
        document.getElementById('login-check').classList.add('bg-green-50', 'border', 'border-green-200');
        document.getElementById('login-btn').textContent = 'Logado';
        document.getElementById('login-btn').classList.remove('bg-primary');
        document.getElementById('login-btn').classList.add('bg-green-500', 'cursor-default');
        document.getElementById('login-btn').removeAttribute('href');
        
        // Mostrar seção de pagamento
        document.getElementById('payment-section').style.display = 'block';
    } else {
        // Usuário não logado
        document.getElementById('payment-section').style.display = 'none';
    }
}

// Carregar programa da URL
function loadProgramFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('program') || 'mulher';
    const program = programs[programId];
    
    if (program) {
        // Atualizar informações do programa
        document.getElementById('program-name').textContent = program.name;
        document.getElementById('program-price').textContent = `R$ ${program.price.toFixed(2).replace('.', ',')}`;
        document.getElementById('total-price').textContent = `R$ ${program.price.toFixed(2).replace('.', ',')}`;
        
        // Atualizar ícone
        const iconElement = document.getElementById('program-icon');
        iconElement.className = `fas ${program.icon} text-3xl text-${program.color}-500 mr-3`;
        
        // Salvar no localStorage para processamento
        localStorage.setItem('checkout_program', JSON.stringify({
            id: programId,
            ...program
        }));
    }
}

// Alternar método de pagamento
function switchPaymentMethod(method) {
    // Atualizar tabs
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.classList.remove('active', 'text-primary', 'border-primary');
        tab.classList.add('text-gray-600', 'border-transparent');
    });
    
    const activeTab = document.getElementById(`tab-${method}`);
    activeTab.classList.add('active', 'text-primary', 'border-primary');
    activeTab.classList.remove('text-gray-600', 'border-transparent');
    
    // Mostrar/ocultar conteúdo
    document.querySelectorAll('.payment-content').forEach(content => {
        content.style.display = 'none';
    });
    
    document.getElementById(`${method}-payment`).style.display = 'block';
}

// Copiar código PIX
function copyPixCode() {
    const pixCode = document.querySelector('.font-mono').textContent;
    navigator.clipboard.writeText(pixCode).then(() => {
        // Feedback visual
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Copiado!';
        btn.classList.add('text-green-600');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('text-green-600');
        }, 2000);
    });
}

// Confirmar pagamento PIX
function confirmPixPayment() {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY));
    const program = JSON.parse(localStorage.getItem('checkout_program'));
    console.log('💳 Processando pagamento PIX...');
    
    if (!user) {
        alert('Por favor, faça login para continuar.');
        window.location.href = 'login.html?redirect=checkout.html';
        return;
    }
    
    // Simular processamento
    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Aguardando pagamento...';
    
    // Simular confirmação após 3 segundos
    setTimeout(() => {
        // Salvar assinatura
        saveSubscription(program);
        
        // Mostrar modal de sucesso
        showSuccessModal();
    }, 3000);
}

// Processar pagamento com cartão
function processCardPayment(event) {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem(SESSION_KEY));
    const program = JSON.parse(localStorage.getItem('checkout_program'));
    console.log('💳 Processando pagamento com cartão...');
    
    if (!user) {
        alert('Por favor, faça login para continuar.');
        window.location.href = 'login.html?redirect=checkout.html';
        return;
    }
    
    // Validar campos
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardCpf = document.getElementById('card-cpf').value;
    
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv || !cardCpf) {
        alert('Por favor, preencha todos os campos do cartão.');
        return;
    }
    
    // Validar número do cartão (simples)
    if (cardNumber.replace(/\s/g, '').length < 16) {
        alert('Número do cartão inválido.');
        return;
    }
    
    // Simular processamento
    const btn = event.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processando pagamento...';
    
    // Simular aprovação após 2 segundos
    setTimeout(() => {
        // Salvar assinatura
        saveSubscription(program);
        
        // Mostrar modal de sucesso
        showSuccessModal();
    }, 2000);
}

// Salvar assinatura do usuário
function saveSubscription(program) {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY));
    console.log('💾 Salvando assinatura:', program.name);
    
    // Adicionar programa às assinaturas do usuário
    const subscriptions = JSON.parse(localStorage.getItem('user_subscriptions') || '[]');
    
    subscriptions.push({
        programId: program.id,
        programName: program.name,
        price: program.price,
        startDate: new Date().toISOString(),
        renewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
        status: 'active'
    });
    
    localStorage.setItem('user_subscriptions', JSON.stringify(subscriptions));
    
    // Limpar checkout
    localStorage.removeItem('checkout_program');
}

// Mostrar modal de sucesso
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Formatação automática dos campos do cartão
function setupCardFormatting() {
    // Formatar número do cartão
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Formatar validade
    const cardExpiry = document.getElementById('card-expiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Formatar CPF
    const cardCpf = document.getElementById('card-cpf');
    if (cardCpf) {
        cardCpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            }
            e.target.value = value;
        });
    }
    
    // Apenas números no CVV
    const cardCvv = document.getElementById('card-cvv');
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}
