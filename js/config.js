// =====================================================
// 🔧 CONFIGURAÇÕES CENTRALIZADAS - KAINOW SAÚDE
// =====================================================

/**
 * Arquivo de configuração centralizada do sistema
 * Todas as constantes e configurações devem ser definidas aqui
 * para facilitar manutenção e evitar duplicação
 */

const KAINOW_CONFIG = {
    // =====================================================
    // INFORMAÇÕES DO APLICATIVO
    // =====================================================
    APP_NAME: 'KaiNow Saúde',
    APP_VERSION: '1.0.1',
    APP_DESCRIPTION: 'Sistema completo de telemedicina',
    
    // =====================================================
    // CHAVES DE ARMAZENAMENTO (LOCALSTORAGE)
    // =====================================================
    STORAGE_KEYS: {
        SESSION: 'kainow_user_session',           // Sessão do usuário logado
        USER_SUBSCRIPTIONS: 'user_subscriptions',  // Assinaturas do usuário
        CHECKOUT_PROGRAM: 'checkout_program',      // Programa em checkout
        REMEMBER_ME: 'kainow_remember_me',         // Lembrar login
        LAST_VISIT: 'kainow_last_visit'            // Última visita
    },
    
    // =====================================================
    // API E ENDPOINTS
    // =====================================================
    API: {
        BASE_URL: '/api',                          // Base URL da API
        USERS_ENDPOINT: 'tables/users',            // Endpoint de usuários
        APPOINTMENTS_ENDPOINT: 'tables/appointments', // Agendamentos
        SPECIALTIES_ENDPOINT: 'tables/specialties',   // Especialidades
        PROGRAMS_ENDPOINT: 'tables/programs',         // Programas
        TIMEOUT: 30000                             // Timeout de 30s
    },
    
    // =====================================================
    // AUTENTICAÇÃO
    // =====================================================
    AUTH: {
        TOKEN_EXPIRY: 24 * 60 * 60 * 1000,        // 24 horas em ms
        MIN_PASSWORD_LENGTH: 6,                    // Tamanho mínimo da senha
        MAX_LOGIN_ATTEMPTS: 5,                     // Tentativas máximas
        LOCKOUT_DURATION: 15 * 60 * 1000,         // 15 minutos em ms
        SALT_ROUNDS: 10                            // Bcrypt salt rounds
    },
    
    // =====================================================
    // VALIDAÇÕES
    // =====================================================
    VALIDATION: {
        CPF_PATTERN: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE_PATTERN: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        CARD_PATTERN: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
        CVV_PATTERN: /^\d{3,4}$/,
        EXPIRY_PATTERN: /^\d{2}\/\d{2}$/
    },
    
    // =====================================================
    // INTERFACE DO USUÁRIO
    // =====================================================
    UI: {
        TOAST_DURATION: 5000,                      // Duração de notificações (ms)
        LOADING_MIN_DURATION: 500,                 // Duração mínima de loading
        MODAL_TRANSITION: 300,                     // Transição de modais (ms)
        DEBOUNCE_DELAY: 300,                       // Delay para debounce (ms)
        MAX_FILE_SIZE: 5 * 1024 * 1024,           // 5MB
        ITEMS_PER_PAGE: 10                         // Paginação
    },
    
    // =====================================================
    // CONTATOS E SUPORTE
    // =====================================================
    CONTACT: {
        WHATSAPP: '5511942008484',                 // WhatsApp (formato internacional)
        WHATSAPP_DISPLAY: '(11) 4200-8484',        // WhatsApp (display)
        EMAIL: 'contato@kainow.com.br',
        SUPPORT_EMAIL: 'suporte@kainow.com.br',
        PHONE: '(11) 4200-8484'
    },
    
    // =====================================================
    // PROGRAMAS ESPECIALIZADOS
    // =====================================================
    PROGRAMS: {
        mulher: {
            id: 'mulher',
            name: 'KaiNow Mulher',
            price: 49.90,
            icon: 'fa-venus',
            color: 'pink',
            description: 'Saúde integral da mulher'
        },
        senior: {
            id: 'senior',
            name: 'KaiNow Sênior',
            price: 59.90,
            icon: 'fa-user-shield',
            color: 'amber',
            description: 'Cuidado completo para idosos'
        },
        farma: {
            id: 'farma',
            name: 'KaiNow Farma',
            price: 19.90,
            icon: 'fa-pills',
            color: 'green',
            description: 'Descontos em medicamentos'
        },
        acolher: {
            id: 'acolher',
            name: 'KaiNow Acolher',
            price: 24.90,
            icon: 'fa-hands-holding-child',
            color: 'blue',
            description: 'Saúde mental e emocional'
        },
        orienta: {
            id: 'orienta',
            name: 'KaiNow Orienta',
            price: 19.90,
            icon: 'fa-lightbulb',
            color: 'purple',
            description: 'Orientação médica 24/7'
        },
        vivaleve: {
            id: 'vivaleve',
            name: 'KaiNow Viva Leve',
            price: 24.90,
            icon: 'fa-spa',
            color: 'teal',
            description: 'Emagrecimento saudável'
        }
    },
    
    // =====================================================
    // CREDENCIAIS DE TESTE (DESENVOLVIMENTO APENAS)
    // =====================================================
    TEST_USER: {
        cpf: '11144477735',
        cpf_formatted: '111.444.777-35',
        senha: 'teste123',
        nome: 'Usuário Teste',
        email: 'teste@kainow.com',
        telefone: '(27) 99798-1963'
    },
    
    // =====================================================
    // AMBIENTE
    // =====================================================
    ENVIRONMENT: {
        IS_PRODUCTION: window.location.hostname !== 'localhost',
        IS_DEVELOPMENT: window.location.hostname === 'localhost',
        DEBUG_MODE: false,                         // Ativar logs detalhados
        USE_MOCK_API: true                         // Usar API mockada
    },
    
    // =====================================================
    // FEATURES FLAGS
    // =====================================================
    FEATURES: {
        ENABLE_VIDEOCALL: false,                   // Videochamadas
        ENABLE_CHAT: false,                        // Chat em tempo real
        ENABLE_DIGITAL_PRESCRIPTION: false,        // Receita digital
        ENABLE_PAYMENT_GATEWAY: false,             // Gateway real
        ENABLE_NOTIFICATIONS: false,               // Push notifications
        ENABLE_ANALYTICS: true                     // Google Analytics
    },
    
    // =====================================================
    // MENSAGENS PADRÃO
    // =====================================================
    MESSAGES: {
        SUCCESS: {
            LOGIN: 'Login realizado com sucesso!',
            LOGOUT: 'Logout realizado com sucesso!',
            REGISTER: 'Cadastro realizado com sucesso!',
            UPDATE: 'Dados atualizados com sucesso!',
            DELETE: 'Removido com sucesso!',
            SAVE: 'Salvo com sucesso!'
        },
        ERROR: {
            LOGIN_FAILED: 'CPF ou senha incorretos',
            NETWORK: 'Erro de conexão. Tente novamente.',
            INVALID_CPF: 'CPF inválido',
            INVALID_EMAIL: 'Email inválido',
            INVALID_PASSWORD: 'Senha deve ter pelo menos 6 caracteres',
            GENERIC: 'Ocorreu um erro. Tente novamente.',
            SESSION_EXPIRED: 'Sessão expirada. Faça login novamente.'
        },
        INFO: {
            LOADING: 'Carregando...',
            PROCESSING: 'Processando...',
            SAVING: 'Salvando...',
            WAIT: 'Por favor, aguarde...'
        }
    },
    
    // =====================================================
    // CORES DO TEMA
    // =====================================================
    THEME: {
        PRIMARY: '#0066CC',
        SECONDARY: '#00A8E8',
        ACCENT: '#00C9A7',
        DARK: '#1A202C',
        SUCCESS: '#10B981',
        WARNING: '#F59E0B',
        ERROR: '#EF4444',
        INFO: '#3B82F6'
    }
};

// =====================================================
// EXPORTAR CONFIGURAÇÃO GLOBALMENTE
// =====================================================

// Tornar disponível globalmente
window.KAINOW_CONFIG = KAINOW_CONFIG;

// Shortcut para chaves de armazenamento (mais usado)
window.SESSION_KEY = KAINOW_CONFIG.STORAGE_KEYS.SESSION;
window.API_BASE = KAINOW_CONFIG.API.USERS_ENDPOINT;

// =====================================================
// FUNÇÕES AUXILIARES DE CONFIGURAÇÃO
// =====================================================

/**
 * Obter valor de configuração por caminho
 * @param {string} path - Caminho da configuração (ex: 'API.BASE_URL')
 * @returns {any} Valor da configuração
 */
function getConfig(path) {
    const keys = path.split('.');
    let value = KAINOW_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            console.warn(`⚠️ Configuração não encontrada: ${path}`);
            return undefined;
        }
    }
    
    return value;
}

/**
 * Verificar se está em modo de desenvolvimento
 * @returns {boolean}
 */
function isDevelopment() {
    return KAINOW_CONFIG.ENVIRONMENT.IS_DEVELOPMENT;
}

/**
 * Verificar se está em modo de produção
 * @returns {boolean}
 */
function isProduction() {
    return KAINOW_CONFIG.ENVIRONMENT.IS_PRODUCTION;
}

/**
 * Logar apenas em modo debug
 * @param  {...any} args - Argumentos para console.log
 */
function debugLog(...args) {
    if (KAINOW_CONFIG.ENVIRONMENT.DEBUG_MODE) {
        console.log('[DEBUG]', ...args);
    }
}

// Exportar funções auxiliares
window.getConfig = getConfig;
window.isDevelopment = isDevelopment;
window.isProduction = isProduction;
window.debugLog = debugLog;

// =====================================================
// LOG DE INICIALIZAÇÃO
// =====================================================

console.log(`
╔══════════════════════════════════════════════════════════╗
║         🏥 ${KAINOW_CONFIG.APP_NAME.toUpperCase()} v${KAINOW_CONFIG.APP_VERSION}         ║
╚══════════════════════════════════════════════════════════╝
`);

console.log('✅ Configurações carregadas com sucesso!');
console.log(`📍 Ambiente: ${isProduction() ? 'PRODUÇÃO 🚀' : 'DESENVOLVIMENTO 🔧'}`);
console.log(`🔑 Chave de sessão: ${SESSION_KEY}`);
console.log(`🌐 API Base: ${API_BASE}`);

if (isDevelopment()) {
    console.log('🐛 Modo debug disponível via: debugLog(...)');
    console.log('⚙️ Configurações disponíveis em: window.KAINOW_CONFIG');
}

// =====================================================
// EXPORTAR PARA USO EM MÓDULOS (SE NECESSÁRIO)
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = KAINOW_CONFIG;
}
