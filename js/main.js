// Especialidades Médicas
const specialties = [
    { name: "Alergia e Imunologia Pediátrica", icon: "fa-allergies", category: "Pediatria" },
    { name: "Cardiologia", icon: "fa-heartbeat", category: "Clínica" },
    { name: "Cirurgia Geral", icon: "fa-user-md", category: "Cirurgia" },
    { name: "Cirurgia Plástica", icon: "fa-hand-sparkles", category: "Cirurgia" },
    { name: "Cirurgia Vascular", icon: "fa-stethoscope", category: "Cirurgia" },
    { name: "Clínica Médica", icon: "fa-clinic-medical", category: "Clínica" },
    { name: "Coloproctologia", icon: "fa-user-md", category: "Clínica" },
    { name: "Dermatologia", icon: "fa-hand-holding-medical", category: "Clínica" },
    { name: "Endocrinologia/Metabologia", icon: "fa-dna", category: "Clínica" },
    { name: "Gastroenterologia", icon: "fa-notes-medical", category: "Clínica" },
    { name: "Gastroenterologia Pediátrica", icon: "fa-baby", category: "Pediatria" },
    { name: "Geriatria", icon: "fa-wheelchair", category: "Clínica" },
    { name: "Ginecologia/Obstetrícia", icon: "fa-female", category: "Clínica" },
    { name: "Hematologia Pediátrica", icon: "fa-tint", category: "Pediatria" },
    { name: "Hematologia e Hemoterapia", icon: "fa-tint", category: "Clínica" },
    { name: "Infectologia Pediátrica", icon: "fa-shield-virus", category: "Pediatria" },
    { name: "Mastologia", icon: "fa-ribbon", category: "Clínica" },
    { name: "Neurologia", icon: "fa-brain", category: "Clínica" },
    { name: "Nutricionista", icon: "fa-apple-alt", category: "Saúde" },
    { name: "Oftalmologia", icon: "fa-eye", category: "Clínica" },
    { name: "Ortopediatria", icon: "fa-child", category: "Pediatria" },
    { name: "Otorrinolaringologia", icon: "fa-head-side-mask", category: "Clínica" },
    { name: "Pediatria", icon: "fa-baby-carriage", category: "Pediatria" },
    { name: "Pneumologia", icon: "fa-lungs", category: "Clínica" },
    { name: "Pneumologia Pediátrica", icon: "fa-lungs-virus", category: "Pediatria" },
    { name: "Psicologia", icon: "fa-user-friends", category: "Saúde Mental" },
    { name: "Psiquiatria", icon: "fa-head-side-virus", category: "Saúde Mental" },
    { name: "Reumatologia", icon: "fa-hand-holding-medical", category: "Clínica" },
    { name: "Urologia", icon: "fa-procedures", category: "Clínica" },
    { name: "Nefrologia", icon: "fa-kidney", category: "Clínica" },
    { name: "Oncologia", icon: "fa-ribbon", category: "Clínica" },
    { name: "Proctologia", icon: "fa-notes-medical", category: "Clínica" },
    { name: "Angiologia", icon: "fa-heart-pulse", category: "Clínica" },
    { name: "Nutrologia", icon: "fa-weight-scale", category: "Saúde" },
    { name: "Homeopatia", icon: "fa-leaf", category: "Saúde" },
    { name: "Acupuntura", icon: "fa-spa", category: "Saúde" },
    { name: "Fisioterapia", icon: "fa-dumbbell", category: "Reabilitação" }
];

// Função para renderizar especialidades
function renderSpecialties(filteredSpecialties = specialties) {
    const grid = document.getElementById('specialties-grid');
    const noResults = document.getElementById('no-results');
    
    if (filteredSpecialties.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    grid.innerHTML = filteredSpecialties.map(specialty => `
        <div class="specialty-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col items-center text-center h-full">
                <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <i class="fas ${specialty.icon} text-3xl text-primary"></i>
                </div>
                <h3 class="font-bold text-lg text-gray-800 mb-2">${specialty.name}</h3>
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mb-4">${specialty.category}</span>
                <button onclick="openAppointmentModal('${specialty.name}')" class="mt-auto w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <i class="fas fa-calendar-check mr-2"></i>Agendar Consulta
                </button>
            </div>
        </div>
    `).join('');
    
    // Adicionar animação de entrada
    const cards = document.querySelectorAll('.specialty-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Função de busca
function setupSearch() {
    const searchInput = document.getElementById('search-specialty');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        const filtered = specialties.filter(specialty => 
            specialty.name.toLowerCase().includes(searchTerm) ||
            specialty.category.toLowerCase().includes(searchTerm)
        );
        
        renderSpecialties(filtered);
    });
}

// Menu Mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Fechar menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header fixo com sombra ao rolar
function setupHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-xl');
        } else {
            header.classList.remove('shadow-xl');
        }
    });
}

// Animação de entrada dos elementos
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Estatísticas animadas (contador)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar animação quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// FAQ Toggle
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Fechar todas as outras FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle da FAQ atual
            if (isOpen) {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Modal de Agendamento (simulado)
function setupAppointmentModal() {
    const appointmentButtons = document.querySelectorAll('a[href="#"]');
    
    appointmentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('consulta') || button.textContent.includes('Agendar')) {
                e.preventDefault();
                showAppointmentInfo();
            }
        });
    });
}

function openAppointmentModal(specialtyName = '') {
    // Verificar se o usuário está logado
    if (typeof estaLogado === 'function' && !estaLogado()) {
        // Mostrar modal de login necessário
        mostrarModalLoginNecessario(specialtyName);
        return;
    }
    
    // Criar modal de agendamento
    const modalHTML = `
        <div id="appointment-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="animation: fadeIn 0.3s ease;">
            <div class="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" style="animation: slideUp 0.3s ease;">
                <div class="text-center mb-6">
                    <i class="fas fa-calendar-check text-6xl text-primary mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Agendar Consulta</h3>
                    ${specialtyName ? `<p class="text-lg font-semibold text-secondary mb-2">${specialtyName}</p>` : ''}
                    <p class="text-gray-600">Escolha como deseja agendar sua consulta</p>
                </div>
                
                <div class="space-y-4 mb-6">
                    <a href="https://api.whatsapp.com/send?phone=5511912345678&text=Olá! Gostaria de agendar uma consulta${specialtyName ? ' de ' + specialtyName : ''}" target="_blank" class="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 p-4 rounded-lg transition-all hover:shadow-lg">
                        <div class="flex items-center space-x-3 text-white">
                            <i class="fab fa-whatsapp text-3xl"></i>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-lg">WhatsApp</p>
                                <p class="text-sm opacity-90">Atendimento rápido e prático</p>
                            </div>
                            <i class="fas fa-arrow-right text-xl"></i>
                        </div>
                    </a>
                    
                    <a href="tel:+551131234567" class="block bg-gradient-to-r from-primary to-secondary hover:opacity-90 p-4 rounded-lg transition-all hover:shadow-lg">
                        <div class="flex items-center space-x-3 text-white">
                            <i class="fas fa-phone-alt text-3xl"></i>
                            <div class="flex-1 text-left">
                                <p class="font-bold text-lg">Telefone</p>
                                <p class="text-sm opacity-90">Central de atendimento 24h</p>
                            </div>
                            <i class="fas fa-arrow-right text-xl"></i>
                        </div>
                    </a>
                    
                    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-4 rounded-lg">
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-info-circle text-amber-600 text-xl mt-1"></i>
                            <div>
                                <p class="font-bold text-sm text-gray-700 mb-1">Informações Importantes:</p>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• <strong>Pronto Atendimento:</strong> 24h/dia</li>
                                    <li>• <strong>Especialidades:</strong> Agendamento com 48h de antecedência</li>
                                    <li>• Tenha em mãos seu número de beneficiário</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button onclick="closeAppointmentModal()" class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                    <i class="fas fa-times mr-2"></i>Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Fechar ao clicar fora
    document.getElementById('appointment-modal').addEventListener('click', (e) => {
        if (e.target.id === 'appointment-modal') {
            closeAppointmentModal();
        }
    });
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// Modal de Login Necessário
function mostrarModalLoginNecessario(specialtyName = '') {
    const modalHTML = `
        <div id="appointment-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="animation: fadeIn 0.3s ease;">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" style="animation: slideUp 0.3s ease;">
                <div class="text-center mb-6">
                    <i class="fas fa-lock text-6xl text-amber-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Login Necessário</h3>
                    ${specialtyName ? `<p class="text-lg font-semibold text-secondary mb-2">${specialtyName}</p>` : ''}
                    <p class="text-gray-600">Para agendar consultas, você precisa estar logado em sua conta</p>
                </div>
                
                <div class="space-y-4 mb-6">
                    <a href="login.html" class="block bg-gradient-to-r from-primary to-secondary hover:opacity-90 p-4 rounded-lg transition-all hover:shadow-lg">
                        <div class="flex items-center justify-center space-x-3 text-white">
                            <i class="fas fa-sign-in-alt text-2xl"></i>
                            <div class="text-left">
                                <p class="font-bold text-lg">Fazer Login</p>
                                <p class="text-sm opacity-90">Já tenho uma conta</p>
                            </div>
                        </div>
                    </a>
                    
                    <a href="cadastro.html" class="block bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 p-4 rounded-lg transition-all hover:shadow-lg">
                        <div class="flex items-center justify-center space-x-3 text-white">
                            <i class="fas fa-user-plus text-2xl"></i>
                            <div class="text-left">
                                <p class="font-bold text-lg">Criar Conta</p>
                                <p class="text-sm opacity-90">É rápido e gratuito</p>
                            </div>
                        </div>
                    </a>
                    
                    <div class="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <p class="font-bold text-sm text-gray-700 mb-1">Por que preciso de conta?</p>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Histórico de consultas</li>
                                    <li>• Agendamentos mais rápidos</li>
                                    <li>• Acesso a exames e resultados</li>
                                    <li>• Segurança dos seus dados</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button onclick="closeAppointmentModal()" class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                    <i class="fas fa-times mr-2"></i>Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Fechar ao clicar fora
    document.getElementById('appointment-modal').addEventListener('click', (e) => {
        if (e.target.id === 'appointment-modal') {
            closeAppointmentModal();
        }
    });
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Sistema de Iframe Modal para Links Externos
function openIframeModal(url, title = 'Carregando...') {
    // Verificar se é link interno (âncora #)
    if (url.startsWith('#')) {
        return; // Deixa o comportamento padrão de smooth scroll
    }
    
    const iframeHTML = `
        <div id="iframe-modal" class="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-0 md:p-4 animate-fadeIn">
            <div class="bg-white w-full h-full md:h-[95vh] md:rounded-2xl shadow-2xl flex flex-col animate-slideUp overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-primary to-secondary px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-window-restore text-white text-xl md:text-2xl"></i>
                        <h3 class="text-white font-bold text-base md:text-xl truncate max-w-[200px] md:max-w-none">${title}</h3>
                    </div>
                    <button onclick="closeIframeModal()" class="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition">
                        <i class="fas fa-times text-xl md:text-2xl"></i>
                    </button>
                </div>
                
                <!-- Loading Indicator -->
                <div id="iframe-loading" class="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
                        <p class="text-gray-600 text-lg font-semibold">Carregando...</p>
                    </div>
                </div>
                
                <!-- Iframe Content -->
                <div class="flex-1 relative bg-gray-100">
                    <iframe 
                        id="content-iframe" 
                        src="${url}" 
                        class="w-full h-full border-0"
                        onload="document.getElementById('iframe-loading').style.display='none'"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
                
                <!-- Footer com botões de navegação -->
                <div class="bg-gray-100 border-t border-gray-300 px-4 py-2 md:py-3 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <button onclick="document.getElementById('content-iframe').contentWindow.history.back()" 
                                class="px-3 py-1.5 md:px-4 md:py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm md:text-base">
                            <i class="fas fa-arrow-left mr-1 md:mr-2"></i>
                            <span class="hidden md:inline">Voltar</span>
                        </button>
                        <button onclick="document.getElementById('content-iframe').contentWindow.location.reload()" 
                                class="px-3 py-1.5 md:px-4 md:py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-sm md:text-base">
                            <i class="fas fa-sync-alt mr-1 md:mr-2"></i>
                            <span class="hidden md:inline">Recarregar</span>
                        </button>
                    </div>
                    <a href="${url}" target="_blank" 
                       class="px-3 py-1.5 md:px-4 md:py-2 bg-primary text-white hover:bg-secondary rounded-lg transition text-sm md:text-base">
                        <i class="fas fa-external-link-alt mr-1 md:mr-2"></i>
                        <span class="hidden md:inline">Abrir Nova Aba</span>
                        <span class="md:hidden">Nova Aba</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', iframeHTML);
    document.body.style.overflow = 'hidden'; // Prevenir scroll da página
    
    // Fechar com ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeIframeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeIframeModal() {
    const modal = document.getElementById('iframe-modal');
    if (modal) {
        modal.classList.add('animate-fadeOut');
        document.body.style.overflow = ''; // Restaurar scroll
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Interceptar cliques em links externos (login, cadastro, especialidades)
// PROGRAMAS AGORA ABREM COMO PÁGINAS NORMAIS (não em iframe modal)
function setupIframeLinks() {
    // Links de autenticação (login, cadastro) - mantém iframe
    const authLinks = document.querySelectorAll(`
        a[href="login.html"], 
        a[href="cadastro.html"]
    `);
    
    authLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            const title = this.textContent.trim() || 'KaiNow Saúde';
            openIframeModal(url, title);
        });
    });
    
    // Links de programas - REMOVIDO (abrem como páginas normais)
    // Programas agora abrem diretamente sem iframe modal
    const programLinks = document.querySelectorAll(`
        a[href="programa-mulher.html"],
        a[href="programa-senior.html"],
        a[href="programa-farma.html"],
        a[href="programa-acolher.html"],
        a[href="programa-orienta.html"],
        a[href="programa-vivaleve.html"]
    `);
    
    programLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Não previne default - links abrem normalmente
            // Apenas fecha o dropdown
            const produtosDropdown = document.getElementById('produtos-dropdown-menu');
            if (produtosDropdown) {
                produtosDropdown.classList.add('hidden');
            }
        });
    });
    
    // Links de especialidades (todos que começam com "especialidade-")
    const especialidadeLinks = document.querySelectorAll('a[href^="especialidade-"]');
    
    especialidadeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar dropdowns se estiverem abertos
            const especialidadesDropdown = document.getElementById('especialidades-dropdown-menu');
            if (especialidadesDropdown) {
                especialidadesDropdown.classList.add('hidden');
            }
            
            const url = this.getAttribute('href');
            const title = this.textContent.trim() || 'Especialidade Médica';
            openIframeModal(url, title);
        });
    });
}

// Modal de Programas Especializados
function openProgramModal(programName) {
    const programsInfo = {
        'Sênior': {
            title: 'KaiNow Sênior',
            icon: 'fa-user-shield',
            color: 'amber',
            description: 'Programa dedicado ao cuidado da terceira idade com atenção especializada em geriatria.',
            benefits: [
                'Consultas com geriatra 24h',
                'Acompanhamento de doenças crônicas (diabetes, hipertensão, etc)',
                'Orientação sobre uso correto de medicamentos',
                'Prevenção de quedas e acidentes domésticos',
                'Suporte nutricional para idosos',
                'Avaliação cognitiva periódica',
                'Suporte psicológico especializado'
            ],
            specialties: ['Geriatria', 'Cardiologia', 'Neurologia', 'Ortopedia', 'Nutrição', 'Psicologia']
        },
        'Farma': {
            title: 'KaiNow Farma',
            icon: 'fa-pills',
            color: 'green',
            description: 'Economia em medicamentos e produtos de saúde com descontos especiais em rede credenciada.',
            benefits: [
                'Até 80% de desconto em medicamentos genéricos',
                'Desconto em medicamentos de marca',
                'Rede credenciada em todo Brasil',
                'Entrega em domicílio disponível',
                'Descontos em produtos de higiene e beleza',
                'Programa de fidelidade com pontos',
                'App exclusivo para pedidos'
            ],
            specialties: ['Mais de 15.000 farmácias credenciadas', 'Entrega expressa', 'Produtos de saúde']
        },
        'Acolher': {
            title: 'KaiNow Acolher',
            icon: 'fa-hands-holding-child',
            color: 'blue',
            description: 'Cuidado completo com sua saúde mental e emocional. Suporte psicológico e psiquiátrico 24h.',
            benefits: [
                'Psicólogos disponíveis 24/7',
                'Psiquiatria com prescrição de medicamentos',
                'Terapia individual, casal e familiar',
                'Atendimento emergencial para crises',
                'Acompanhamento de ansiedade e depressão',
                'Tratamento de burnout e estresse',
                'Grupos de apoio online'
            ],
            specialties: ['Psicologia', 'Psiquiatria', 'Terapia Cognitiva', 'Orientação Familiar']
        },
        'Orienta': {
            title: 'KaiNow Orienta',
            icon: 'fa-lightbulb',
            color: 'purple',
            description: 'Educação em saúde e prevenção de doenças. Aprenda a cuidar melhor de você e sua família.',
            benefits: [
                'Programas de prevenção personalizados',
                'Orientação nutricional completa',
                'Planos de vacinação',
                'Check-ups preventivos orientados',
                'Palestras e webinars mensais',
                'Conteúdos exclusivos sobre saúde',
                'Orientação para exames de rotina'
            ],
            specialties: ['Clínica Médica', 'Nutrição', 'Enfermagem', 'Educação em Saúde']
        },
        'Viva Leve': {
            title: 'KaiNow Viva Leve',
            icon: 'fa-spa',
            color: 'teal',
            description: 'Programa de qualidade de vida, bem-estar e hábitos saudáveis para uma vida plena e equilibrada.',
            benefits: [
                'Planos de exercícios personalizados',
                'Aulas de meditação e mindfulness',
                'Yoga e alongamento online',
                'Acompanhamento nutricional',
                'Controle de peso saudável',
                'Gestão de estresse e ansiedade',
                'Dicas de sono e descanso'
            ],
            specialties: ['Nutrição', 'Educação Física', 'Psicologia', 'Meditação']
        }
    };
    
    const program = programsInfo[programName];
    if (!program) return;
    
    const colorClasses = {
        'amber': 'from-amber-500 to-orange-600',
        'green': 'from-green-500 to-emerald-600',
        'blue': 'from-blue-500 to-indigo-600',
        'purple': 'from-purple-500 to-violet-600',
        'teal': 'from-teal-500 to-cyan-600'
    };
    
    const modalHTML = `
        <div id="program-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
                <!-- Header -->
                <div class="bg-gradient-to-r ${colorClasses[program.color]} p-8 text-white relative overflow-hidden">
                    <div class="absolute inset-0 bg-white opacity-5"></div>
                    <button onclick="closeProgramModal()" class="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                    <div class="relative z-10">
                        <i class="fas ${program.icon} text-6xl mb-4"></i>
                        <h2 class="text-3xl font-bold mb-2">${program.title}</h2>
                        <p class="text-lg opacity-90">${program.description}</p>
                    </div>
                </div>
                
                <!-- Content -->
                <div class="p-8">
                    <!-- Benefícios -->
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-star text-yellow-500 mr-3"></i>
                            Benefícios Inclusos
                        </h3>
                        <ul class="space-y-3">
                            ${program.benefits.map(benefit => `
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-${program.color}-500 mt-1 mr-3"></i>
                                    <span class="text-gray-700">${benefit}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- Especialidades -->
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-user-md text-${program.color}-500 mr-3"></i>
                            ${programName === 'Farma' ? 'Cobertura' : 'Especialidades'}
                        </h3>
                        <div class="flex flex-wrap gap-3">
                            ${program.specialties.map(specialty => `
                                <span class="bg-${program.color}-100 text-${program.color}-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    ${specialty}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Aviso -->
                    <div class="bg-gradient-to-r ${colorClasses[program.color]} bg-opacity-10 border-2 border-${program.color}-200 rounded-xl p-6 mb-8">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle text-${program.color}-600 text-2xl mr-4 mt-1"></i>
                            <div>
                                <h4 class="font-bold text-gray-800 mb-2">Incluído em Todos os Planos</h4>
                                <p class="text-gray-700">
                                    O ${program.title} está incluído em todos os nossos planos de telemedicina sem custo adicional. 
                                    Contrate agora e tenha acesso imediato!
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- CTAs -->
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="https://wa.me/5527997981963?text=Olá!%20Quero%20contratar%20o%20${program.title.replace(/\s/g, '%20')}" onclick="closeProgramModal()" class="flex-1 bg-gradient-to-r ${colorClasses[program.color]} text-white px-6 py-4 rounded-full font-bold text-center hover:shadow-lg transition-all duration-300">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Contratar Agora
                        </a>
                        <a href="https://wa.me/5527997981963?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20${program.title.replace(' ', '%20')}" 
                           target="_blank"
                           class="flex-1 bg-green-500 text-white px-6 py-4 rounded-full font-bold text-center hover:bg-green-600 transition-all duration-300">
                            <i class="fab fa-whatsapp mr-2"></i>
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Fechar ao clicar fora
    const modal = document.getElementById('program-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProgramModal();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeProgramModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeProgramModal() {
    const modal = document.getElementById('program-modal');
    if (modal) {
        modal.classList.add('animate-fadeOut');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Setup Dropdown Produtos (click-based)
function setupProdutosDropdown() {
    const btn = document.getElementById('produtos-dropdown-btn');
    const menu = document.getElementById('produtos-dropdown-menu');
    
    if (!btn || !menu) return;
    
    // Toggle dropdown ao clicar no botão
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Fechar dropdown de especialidades se estiver aberto
        const especialidadesMenu = document.getElementById('especialidades-dropdown-menu');
        if (especialidadesMenu) {
            especialidadesMenu.classList.add('hidden');
        }
        
        menu.classList.toggle('hidden');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
    
    // Fechar dropdown com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menu.classList.add('hidden');
        }
    });
}

// Popular Dropdown de Especialidades
function populateEspecialidadesDropdown() {
    const menuContainer = document.querySelector('#especialidades-dropdown-menu .p-2');
    if (!menuContainer) return;
    
    // Criar button para cada especialidade (abre em iframe modal)
    specialties.forEach(specialty => {
        const button = document.createElement('button');
        const specialtySlug = specialty.name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/\//g, '-') // Substitui / por -
            .replace(/\s+/g, '-'); // Substitui espaços por -
        
        button.type = 'button';
        button.className = 'block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-sm';
        button.onclick = function() {
            openSpecialtyModal(specialty.name, specialtySlug);
            // Fechar dropdown após clicar
            document.getElementById('especialidades-dropdown-menu').classList.add('hidden');
        };
        button.innerHTML = `
            <i class="fas ${specialty.icon} text-primary mr-2"></i>
            ${specialty.name}
        `;
        
        menuContainer.appendChild(button);
    });
}

// Setup Dropdown Especialidades (click-based)
function setupEspecialidadesDropdown() {
    const btn = document.getElementById('especialidades-dropdown-btn');
    const menu = document.getElementById('especialidades-dropdown-menu');
    
    if (!btn || !menu) return;
    
    // Toggle dropdown ao clicar no botão
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Fechar dropdown de produtos se estiver aberto
        const produtosMenu = document.getElementById('produtos-dropdown-menu');
        if (produtosMenu) {
            produtosMenu.classList.add('hidden');
        }
        
        menu.classList.toggle('hidden');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
    
    // Fechar dropdown com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menu.classList.add('hidden');
        }
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    renderSpecialties();
    setupSearch();
    setupMobileMenu();
    setupSmoothScroll();
    setupHeaderScroll();
    setupScrollAnimations();
    animateCounters();
    setupFAQ();
    setupAppointmentModal();
    setupPaymentForm();
    populateEspecialidadesDropdown(); // Popular dropdown de especialidades
    setupIframeLinks(); // Setup iframe modal para login/cadastro/programas/especialidades
    setupProdutosDropdown(); // Setup dropdown de produtos
    setupEspecialidadesDropdown(); // Setup dropdown de especialidades
    
    console.log('KaiNow Saúde - Sistema carregado com sucesso!');
});

// Modal de Pagamento
// Variável global para armazenar plano selecionado
let selectedPlan = {
    name: 'completo',
    price: 59.90,
    displayName: 'Plano Completo'
};

function openPaymentModal(planName = 'completo', planPrice = 59.90) {
    // Atualizar plano selecionado
    selectedPlan = {
        name: planName,
        price: planPrice,
        displayName: planName === 'basico' ? 'Plano Básico' : 
                     planName === 'padrao' ? 'Plano Padrão' : 
                     'Plano Completo'
    };
    
    // Atualizar título e preço no modal
    const modalTitle = document.querySelector('#payment-modal h3');
    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-heartbeat mr-3"></i>${selectedPlan.displayName}`;
    }
    
    const priceDisplay = document.querySelector('#payment-modal .text-5xl');
    if (priceDisplay) {
        const priceInt = Math.floor(selectedPlan.price);
        const priceDec = (selectedPlan.price % 1).toFixed(2).split('.')[1];
        priceDisplay.textContent = priceInt;
        priceDisplay.nextElementSibling.textContent = ',' + priceDec;
    }
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Previne scroll do body
        
        // Animação de entrada
        setTimeout(() => {
            modal.querySelector('div').style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
    }
    
    console.log('📋 Plano selecionado:', selectedPlan);
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        // Animação de saída
        modal.querySelector('div').style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restaura scroll
        }, 200);
    }
}

// Máscara para CPF
function formatCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara para Telefone
function formatPhone(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

// Validar formulário antes de redirecionar para pagamento
function validateFormBeforePayment(event) {
    const form = document.getElementById('payment-form');
    
    if (!form || !form.checkValidity()) {
        event.preventDefault();
        
        if (form) {
            form.reportValidity();
        }
        
        // Mostrar alerta
        alert('⚠️ Por favor, preencha todos os campos obrigatórios antes de continuar para o pagamento.');
        return false;
    }
    
    // Coletar dados para analytics
    const formData = {
        nome: form.nome.value,
        cpf: form.cpf.value,
        email: form.email.value,
        telefone: form.telefone.value,
        nascimento: form.nascimento.value,
        plano: 'Plano Mensal - R$ 59,90',
        data_assinatura: new Date().toISOString(),
        metodo_pagamento: event.target.closest('.payment-option-card') ? 
            (event.target.href?.includes('woovi') ? 'PIX' : 'Cartão') : 'Cartão'
    };
    
    console.log('Dados da Assinatura:', formData);
    
    // Mostrar mensagem de sucesso
    setTimeout(() => {
        showSuccessMessage(formData.metodo_pagamento);
    }, 500);
    
    return true;
}

// Processar Formulário de Pagamento
function setupPaymentForm() {
    const form = document.getElementById('payment-form');
    const cpfInput = document.querySelector('input[name="cpf"]');
    const phoneInput = document.querySelector('input[name="telefone"]');
    
    // Aplicar máscaras
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = formatCPF(e.target.value);
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }
}

// Mensagem de sucesso
function showSuccessMessage(metodo = 'Cartão') {
    const isPix = metodo === 'PIX';
    const icon = isPix ? 'fa-qrcode' : 'fa-credit-card';
    const bgColor = isPix ? 'bg-green-500' : 'bg-accent';
    const texto = isPix ? 
        'Complete o pagamento via PIX na página que foi aberta.' : 
        'Complete o pagamento com cartão na página do Mercado Pago que foi aberta.';
    
    const messageHTML = `
        <div id="success-message" class="fixed top-24 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in max-w-sm">
            <div class="flex items-start space-x-3">
                <i class="fas ${icon} text-2xl mt-1"></i>
                <div>
                    <h4 class="font-bold text-lg mb-1">Redirecionado para pagamento!</h4>
                    <p class="text-sm">${texto}</p>
                </div>
                <button onclick="closeSuccessMessage()" class="ml-2 hover:bg-white hover:bg-opacity-20 rounded p-1">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHTML);
    
    // Auto fechar após 8 segundos
    setTimeout(() => {
        closeSuccessMessage();
    }, 8000);
}

function closeSuccessMessage() {
    const message = document.getElementById('success-message');
    if (message) {
        message.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            message.remove();
        }, 300);
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('payment-modal');
    if (modal && e.target === modal) {
        closePaymentModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePaymentModal();
        closeAppointmentModal();
        closePixPayment();
        closeCardPayment();
    }
});

// Função para abrir o pagamento PIX em iframe
function openPixPayment(event) {
    event.preventDefault();
    
    // Valida o formulário primeiro
    if (!validateFormBeforePayment(event)) {
        return;
    }
    
    // URL do PIX
    const pixUrl = 'https://woovi.com/pay/ef8af5ea-0820-42a7-bbb8-3d9a8f32c24a';
    
    // Obtém elementos
    const iframe = document.getElementById('pix-iframe');
    const modal = document.getElementById('pix-payment-frame');
    
    if (!iframe || !modal) {
        console.error('Elementos do modal PIX não encontrados');
        return;
    }
    
    // Define a URL do PIX
    iframe.src = pixUrl;
    
    // Exibe o modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Modal PIX aberto em iframe');
    
    // Detectar erro de carregamento do iframe (X-Frame-Options)
    setTimeout(() => {
        try {
            // Tenta acessar o conteúdo do iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                throw new Error('Iframe bloqueado');
            }
        } catch (error) {
            // Se o iframe não carregar (bloqueado por X-Frame-Options)
            console.warn('⚠️ Iframe bloqueado, abrindo em popup centralizado');
            
            // Fecha o modal
            closePixPayment();
            
            // Abre em popup centralizado
            const width = 600;
            const height = 800;
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            
            const popup = window.open(
                pixUrl,
                'PagamentoPIX',
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
            );
            
            if (popup) {
                popup.focus();
                alert('✅ Janela de pagamento PIX aberta!\n\nComplete o pagamento na janela que acabou de abrir.');
            } else {
                alert('⚠️ Pop-up bloqueado!\n\nPor favor, permita pop-ups para este site e tente novamente.');
            }
        }
    }, 2000); // Aguarda 2 segundos para tentar carregar
}

// Função para fechar o iframe do PIX
function closePixPayment() {
    const modal = document.getElementById('pix-payment-frame');
    const iframe = document.getElementById('pix-iframe');
    
    if (!modal || !iframe) {
        console.error('Elementos do modal PIX não encontrados');
        return;
    }
    
    // Esconde o modal
    modal.classList.add('hidden');
    
    // Limpa o iframe
    iframe.src = '';
    
    // Restaura scroll
    document.body.style.overflow = '';
    
    console.log('❌ Modal PIX fechado');
}

// Função para abrir o pagamento com Cartão (Mercado Pago) em iframe
function openCardPayment(event) {
    event.preventDefault();
    
    // Valida o formulário primeiro
    if (!validateFormBeforePayment(event)) {
        return;
    }
    
    // Obtém dados do formulário
    const form = document.getElementById('payment-form');
    const customerData = {
        name: form.nome.value,
        email: form.email.value,
        cpf: form.cpf.value.replace(/\D/g, ''),
        phone: form.telefone.value.replace(/\D/g, ''),
        birthdate: form.nascimento.value
    };
    
    // Cria preferência de pagamento no Mercado Pago
    createMercadoPagoPreference(customerData);
}

// ========================================
// PAGAMENTO CARTÃO - MERCADO PAGO
// ========================================

// URL do checkout Mercado Pago - ASSINATURA RECORRENTE
const SUBSCRIPTION_CHECKOUT_URL = 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=e18931ef8b4543cb8d299c762f1814c0';

// Função principal para abrir checkout de pagamento
async function createMercadoPagoPreference(customerData) {
    try {
        console.log('🔄 Iniciando checkout de pagamento...');
        console.log('👤 Dados do cliente:', customerData);
        
        if (SUBSCRIPTION_CHECKOUT_URL) {
            console.log('✅ Abrindo checkout Mercado Pago...');
            openMercadoPagoCheckout(SUBSCRIPTION_CHECKOUT_URL);
        } else {
            alert('⚠️ Link de pagamento não configurado.\n\nContate o suporte.');
        }
        
    } catch (error) {
        console.error('💥 Erro ao abrir checkout:', error);
        alert('⚠️ Erro ao iniciar pagamento.\n\nPor favor, tente novamente.');
    }
}

// Função para abrir checkout do Mercado Pago em iframe
function openMercadoPagoCheckout(checkoutUrl) {
    // Obtém elementos
    const iframe = document.getElementById('card-iframe');
    const modal = document.getElementById('card-payment-frame');
    
    if (!iframe || !modal) {
        console.error('Elementos do modal Cartão não encontrados');
        return;
    }
    
    // Define a URL do Mercado Pago
    iframe.src = checkoutUrl;
    
    // Exibe o modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Modal Mercado Pago aberto em iframe');
    
    // Detectar erro de carregamento do iframe (X-Frame-Options)
    setTimeout(() => {
        try {
            // Tenta acessar o conteúdo do iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                throw new Error('Iframe bloqueado');
            }
        } catch (error) {
            // Se o iframe não carregar (bloqueado por X-Frame-Options)
            console.warn('⚠️ Iframe bloqueado, abrindo em popup centralizado');
            
            // Fecha o modal
            closeCardPayment();
            
            // Abre em popup centralizado
            const width = 800;
            const height = 900;
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            
            const popup = window.open(
                checkoutUrl,
                'PagamentoMercadoPago',
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
            );
            
            if (popup) {
                popup.focus();
                console.log('✅ Popup aberto com sucesso');
                
                // Mostrar modal de ajuda
                showPaymentHelp(checkoutUrl);
            } else {
                console.error('❌ Popup bloqueado pelo navegador');
                
                // Mostrar modal com instruções e link
                showPopupBlockedModal(checkoutUrl);
            }
        }
    }, 2000); // Aguarda 2 segundos para tentar carregar
}

// Função para fechar o iframe do Cartão
function closeCardPayment() {
    const modal = document.getElementById('card-payment-frame');
    const iframe = document.getElementById('card-iframe');
    
    if (!modal || !iframe) {
        console.error('Elementos do modal Cartão não encontrados');
        return;
    }
    
    // Esconde o modal
    modal.classList.add('hidden');
    
    // Limpa o iframe
    iframe.src = '';
    
    // Restaura scroll
    document.body.style.overflow = '';
    
    console.log('❌ Modal Cartão fechado');
}

// Fechar modais ao clicar fora
document.addEventListener('click', (e) => {
    const pixModal = document.getElementById('pix-payment-frame');
    const cardModal = document.getElementById('card-payment-frame');
    
    if (pixModal && e.target === pixModal) {
        closePixPayment();
    }
    
    if (cardModal && e.target === cardModal) {
        closeCardPayment();
    }
});

// Modal de ajuda quando popup abre
function showPaymentHelp(checkoutUrl) {
    const modalHTML = `
        <div id="payment-help-modal" class="fixed inset-0 bg-black bg-opacity-50 z-70 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div class="text-center mb-6">
                    <i class="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Janela de Pagamento Aberta!</h3>
                    <p class="text-gray-600">Complete o pagamento na janela que foi aberta</p>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700">
                        <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                        Se a janela não aparecer, verifique se o navegador bloqueou o pop-up
                    </p>
                </div>
                
                <button onclick="closePaymentHelp()" class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Entendi
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closePaymentHelp() {
    const modal = document.getElementById('payment-help-modal');
    if (modal) modal.remove();
}

// Modal quando popup é bloqueado
function showPopupBlockedModal(checkoutUrl) {
    const modalHTML = `
        <div id="popup-blocked-modal" class="fixed inset-0 bg-black bg-opacity-50 z-70 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div class="text-center mb-6">
                    <i class="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Pop-up Bloqueado!</h3>
                    <p class="text-gray-600">Seu navegador bloqueou a janela de pagamento</p>
                </div>
                
                <div class="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 class="font-bold text-gray-800 mb-2">Como permitir:</h4>
                    <ol class="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                        <li>Clique no ícone 🚫 na barra de endereço</li>
                        <li>Selecione "Sempre permitir pop-ups"</li>
                        <li>Clique em "Pagar com Cartão" novamente</li>
                    </ol>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 class="font-bold text-gray-800 mb-2">Ou abra manualmente:</h4>
                    <button onclick="copyPaymentLink('${checkoutUrl}')" class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition mb-2">
                        <i class="fas fa-copy mr-2"></i>
                        Copiar Link de Pagamento
                    </button>
                    <button onclick="openPaymentInNewTab('${checkoutUrl}')" class="w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition">
                        <i class="fas fa-external-link-alt mr-2"></i>
                        Abrir em Nova Aba
                    </button>
                </div>
                
                <button onclick="closePopupBlockedModal()" class="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closePopupBlockedModal() {
    const modal = document.getElementById('popup-blocked-modal');
    if (modal) modal.remove();
}

function copyPaymentLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ Link copiado!\n\nCole em uma nova aba do navegador para completar o pagamento.');
    }).catch(() => {
        prompt('Copie este link:', url);
    });
}

function openPaymentInNewTab(url) {
    window.open(url, '_blank');
    closePopupBlockedModal();
    alert('✅ Nova aba aberta!\n\nComplete o pagamento na aba que foi aberta.');
}

// Expor funções globalmente
window.closeAppointmentModal = closeAppointmentModal;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.closeSuccessMessage = closeSuccessMessage;
window.validateFormBeforePayment = validateFormBeforePayment;
window.openPixPayment = openPixPayment;
window.closePixPayment = closePixPayment;
window.openCardPayment = openCardPayment;
window.closeCardPayment = closeCardPayment;
window.closePaymentHelp = closePaymentHelp;
window.closePopupBlockedModal = closePopupBlockedModal;
window.copyPaymentLink = copyPaymentLink;
window.openPaymentInNewTab = openPaymentInNewTab;
