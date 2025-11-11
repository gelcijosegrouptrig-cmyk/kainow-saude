// =====================================================
// 🔐 SISTEMA DE AUTENTICAÇÃO - KAINOW SAÚDE
// =====================================================

// Constantes
const API_BASE = 'tables/users';
const SESSION_KEY = 'kainow_user_session';

// =====================================================
// FUNÇÕES UTILITÁRIAS
// =====================================================

// Gerar ID único (UUID simplificado)
function generateId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => 
        (Math.random() * 16 | 0).toString(16)
    );
}

// Hash simples para senha (em produção, use bcrypt no backend)
function hashPassword(password) {
    // Simulação de hash (em produção, isso deve ser feito no backend)
    return btoa(password + 'kainow_salt_2025');
}

// Validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) 
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) 
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Validar Email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Máscaras de input
function aplicarMascaras() {
    // Máscara CPF
    const cpfInputs = document.querySelectorAll('input[id="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            }
        });
    });

    // Máscara Telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Máscara Data
    const dataInput = document.getElementById('data_nascimento');
    if (dataInput) {
        dataInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/(\d{2})(\d)/, '$1/$2');
                value = value.replace(/(\d{2})(\d)/, '$1/$2');
                e.target.value = value;
            }
        });
    }
}

// Mostrar/ocultar senha
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + '-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function togglePasswordLogin() {
    togglePassword('senha');
}

// Força da senha
function verificarForcaSenha() {
    const senhaInput = document.getElementById('senha');
    const strengthBar = document.getElementById('senha-strength-bar');
    const strengthText = document.getElementById('senha-strength-text');
    
    if (!senhaInput || !strengthBar) return;
    
    senhaInput.addEventListener('input', (e) => {
        const senha = e.target.value;
        let forca = 0;
        
        if (senha.length >= 6) forca += 25;
        if (senha.length >= 8) forca += 25;
        if (/[A-Z]/.test(senha)) forca += 25;
        if (/[0-9]/.test(senha) || /[!@#$%^&*]/.test(senha)) forca += 25;
        
        strengthBar.style.width = forca + '%';
        
        if (forca <= 25) {
            strengthBar.style.backgroundColor = '#EF4444';
            strengthText.textContent = 'Senha fraca';
            strengthText.className = 'text-xs mt-1 text-red-600';
        } else if (forca <= 50) {
            strengthBar.style.backgroundColor = '#F59E0B';
            strengthText.textContent = 'Senha média';
            strengthText.className = 'text-xs mt-1 text-orange-600';
        } else if (forca <= 75) {
            strengthBar.style.backgroundColor = '#10B981';
            strengthText.textContent = 'Senha boa';
            strengthText.className = 'text-xs mt-1 text-green-600';
        } else {
            strengthBar.style.backgroundColor = '#059669';
            strengthText.textContent = 'Senha forte';
            strengthText.className = 'text-xs mt-1 text-green-700 font-semibold';
        }
    });
}

// =====================================================
// SESSÃO E STORAGE
// =====================================================

// Salvar sessão
function salvarSessao(userData) {
    const session = {
        id: userData.id,
        cpf: userData.cpf,
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        status: userData.status,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// Obter sessão
function obterSessao() {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
}

// Limpar sessão
function limparSessao() {
    localStorage.removeItem(SESSION_KEY);
}

// Verificar se está logado
function estaLogado() {
    const session = obterSessao();
    const logado = session !== null;
    console.log('🔐 Verificando se está logado:', logado);
    return logado;
}

// =====================================================
// CADASTRO
// =====================================================

async function realizarCadastro(dadosUsuario) {
    try {
        // Gerar token de ativação
        const tokenAtivacao = generateId();
        
        // Criar objeto do usuário
        const novoUsuario = {
            id: generateId(),
            cpf: dadosUsuario.cpf.replace(/\D/g, ''),
            email: dadosUsuario.email,
            senha: hashPassword(dadosUsuario.senha),
            nome: dadosUsuario.nome,
            telefone: dadosUsuario.telefone,
            data_nascimento: dadosUsuario.data_nascimento,
            status: 'pending', // Aguardando ativação por email
            token_ativacao: tokenAtivacao
        };

        // Enviar para API
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar conta');
        }

        const resultado = await response.json();
        
        // Simular envio de email (em produção, isso seria feito no backend)
        console.log('📧 Email de ativação enviado para:', dadosUsuario.email);
        console.log('🔗 Link de ativação:', 
            `${window.location.origin}/login.html?activate=${tokenAtivacao}`
        );
        
        return { success: true, email: dadosUsuario.email, token: tokenAtivacao };
        
    } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error;
    }
}

// =====================================================
// LOGIN
// =====================================================

async function realizarLogin(cpf, senha) {
    try {
        // Buscar usuário por CPF
        const cpfLimpo = cpf.replace(/\D/g, '');
        
        // 🧪 USUÁRIO DE TESTE - Para demonstração
        // CPF válido para teste: 111.444.777-35
        if (cpfLimpo === '11144477735' && senha === 'teste123') {
            const usuarioTeste = {
                id: 'teste-001',
                cpf: '11144477735',
                nome: 'Usuário Teste',
                email: 'teste@kainow.com',
                telefone: '(27) 99798-1963',
                status: 'active'
            };
            
            // Salvar sessão usando a função correta
            salvarSessao(usuarioTeste);
            
            console.log('✅ Login de teste realizado com sucesso!');
            return { success: true, usuario: usuarioTeste };
        }
        
        const senhaHash = hashPassword(senha);
        
        const response = await fetch(`${API_BASE}?search=${cpfLimpo}&limit=100`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar usuário');
        }

        const resultado = await response.json();
        
        // Filtrar usuário com CPF e senha corretos
        const usuario = resultado.data.find(u => 
            u.cpf === cpfLimpo && u.senha === senhaHash
        );

        if (!usuario) {
            throw new Error('CPF ou senha incorretos');
        }

        // Verificar status da conta
        if (usuario.status === 'pending') {
            throw new Error('Conta não ativada. Verifique seu email.');
        }

        if (usuario.status === 'blocked') {
            throw new Error('Conta bloqueada. Entre em contato com o suporte.');
        }

        // Salvar sessão
        salvarSessao(usuario);
        
        return { success: true, usuario };
        
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
}

// =====================================================
// LOGOUT
// =====================================================

function realizarLogout() {
    limparSessao();
    // Recarregar a página para atualizar a interface
    window.location.reload();
}

// =====================================================
// ATIVAÇÃO DE CONTA
// =====================================================

async function ativarConta(token) {
    try {
        // Buscar usuário pelo token
        const response = await fetch(`${API_BASE}?search=${token}&limit=100`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar token');
        }

        const resultado = await response.json();
        const usuario = resultado.data.find(u => u.token_ativacao === token);

        if (!usuario) {
            throw new Error('Token inválido');
        }

        // Atualizar status para active
        const updateResponse = await fetch(`${API_BASE}/${usuario.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'active',
                token_ativacao: '' // Limpar token
            })
        });

        if (!updateResponse.ok) {
            throw new Error('Erro ao ativar conta');
        }

        return { success: true };
        
    } catch (error) {
        console.error('Erro na ativação:', error);
        throw error;
    }
}

// =====================================================
// EVENT LISTENERS - CADASTRO
// =====================================================

if (window.location.pathname.includes('cadastro.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        aplicarMascaras();
        verificarForcaSenha();
        
        const form = document.getElementById('cadastro-form');
        const submitBtn = document.getElementById('submit-btn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Obter valores
            const nome = document.getElementById('nome').value.trim();
            const cpf = document.getElementById('cpf').value;
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value;
            const dataNascimento = document.getElementById('data_nascimento').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar_senha').value;
            
            // Validações
            if (nome.length < 3) {
                mostrarErro('Nome deve ter pelo menos 3 caracteres');
                return;
            }
            
            if (!validarCPF(cpf)) {
                mostrarErro('CPF inválido');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarErro('Email inválido');
                return;
            }
            
            if (senha.length < 6) {
                mostrarErro('Senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            if (senha !== confirmarSenha) {
                mostrarErro('As senhas não coincidem');
                return;
            }
            
            // Desabilitar botão
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Criando conta...';
            
            try {
                const resultado = await realizarCadastro({
                    nome,
                    cpf,
                    email,
                    telefone,
                    data_nascimento: dataNascimento,
                    senha
                });
                
                // Mostrar mensagem de sucesso
                document.getElementById('email-enviado').textContent = resultado.email;
                document.getElementById('success-message').classList.remove('hidden');
                document.getElementById('cadastro-form').classList.add('hidden');
                
                // Scroll para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            } catch (error) {
                mostrarErro(error.message || 'Erro ao criar conta. Tente novamente.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Criar Minha Conta';
            }
        });
    });
}

// =====================================================
// EVENT LISTENERS - LOGIN
// =====================================================

if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        aplicarMascaras();
        
        // Verificar se há token de ativação na URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenAtivacao = urlParams.get('activate');
        
        if (tokenAtivacao) {
            ativarConta(tokenAtivacao)
                .then(() => {
                    document.getElementById('activation-message').classList.remove('hidden');
                })
                .catch((error) => {
                    mostrarErro('Erro ao ativar conta: ' + error.message);
                });
        }
        
        const form = document.getElementById('login-form');
        const submitBtn = document.getElementById('submit-btn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('senha').value;
            
            if (!validarCPF(cpf)) {
                mostrarErro('CPF inválido');
                return;
            }
            
            if (senha.length < 6) {
                mostrarErro('Senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Entrando...';
            
            try {
                await realizarLogin(cpf, senha);
                
                // Redirecionar para área do usuário (dashboard)
                // Se estiver em iframe, redirecionar a página pai
                if (window.top !== window.self) {
                    window.top.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
                
            } catch (error) {
                mostrarErro(error.message || 'Erro ao fazer login');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
            }
        });
    });
}

// =====================================================
// FUNÇÕES DE UI
// =====================================================

function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    if (errorDiv && errorText) {
        errorText.textContent = mensagem;
        errorDiv.classList.remove('hidden');
        
        // Scroll para o erro
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-ocultar após 5 segundos
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    } else {
        alert(mensagem);
    }
}

// =====================================================
// NAVEGAÇÃO ENTRE PÁGINAS (FUNCIONA EM IFRAME)
// =====================================================

function irParaLogin() {
    // Se estiver em iframe, redirecionar a página pai
    if (window.top !== window.self) {
        window.top.location.href = 'login.html';
    } else {
        window.location.href = 'login.html';
    }
}

function irParaCadastro() {
    // Se estiver em iframe, redirecionar a página pai
    if (window.top !== window.self) {
        window.top.location.href = 'cadastro.html';
    } else {
        window.location.href = 'cadastro.html';
    }
}

// =====================================================
// EXPORTAR FUNÇÕES GLOBAIS
// =====================================================

window.estaLogado = estaLogado;
window.obterSessao = obterSessao;
window.realizarLogout = realizarLogout;
window.togglePassword = togglePassword;
window.togglePasswordLogin = togglePasswordLogin;
window.irParaLogin = irParaLogin;
window.irParaCadastro = irParaCadastro;

console.log('🔐 Sistema de Autenticação KaiNow Saúde carregado!');
