/**
 * Script para Popular Afiliados de Teste
 * KaiNow Saúde - Sistema de Afiliados
 */

// Função para criar afiliados de teste
function popularAfiliadosTeste() {
    // Afiliados de teste
    const afiliadosTeste = [
        {
            name: 'João Silva',
            email: 'joao.silva@email.com',
            phone: '(11) 98765-4321',
            commission: 20
        },
        {
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '(21) 97654-3210',
            commission: 20
        },
        {
            name: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            phone: '(31) 96543-2109',
            commission: 20
        },
        {
            name: 'Ana Costa',
            email: 'ana.costa@email.com',
            phone: '(41) 95432-1098',
            commission: 25
        },
        {
            name: 'Carlos Ferreira',
            email: 'carlos.ferreira@email.com',
            phone: '(51) 94321-0987',
            commission: 15
        },
        {
            name: 'Juliana Rocha',
            email: 'juliana.rocha@email.com',
            phone: '(61) 93210-8765',
            commission: 20
        },
        {
            name: 'Roberto Lima',
            email: 'roberto.lima@email.com',
            phone: '(71) 92109-7654',
            commission: 30
        },
        {
            name: 'Fernanda Alves',
            email: 'fernanda.alves@email.com',
            phone: '(81) 91098-6543',
            commission: 20
        },
        {
            name: 'Ricardo Souza',
            email: 'ricardo.souza@email.com',
            phone: '(85) 90987-5432',
            commission: 20
        },
        {
            name: 'Patricia Martins',
            email: 'patricia.martins@email.com',
            phone: '(27) 99876-4321',
            commission: 22
        }
    ];

    // Obter afiliados existentes
    let affiliates = JSON.parse(localStorage.getItem('kainow_affiliates') || '[]');
    
    console.log('📊 Afiliados existentes:', affiliates.length);
    
    // Criar novos afiliados
    const novosAfiliados = [];
    afiliadosTeste.forEach((testData, index) => {
        const affiliate = {
            id: 'AFF' + Date.now() + index,
            name: testData.name,
            email: testData.email,
            phone: testData.phone,
            commission: testData.commission,
            createdAt: new Date().toISOString()
        };
        novosAfiliados.push(affiliate);
        affiliates.push(affiliate);
    });
    
    // Salvar no localStorage
    localStorage.setItem('kainow_affiliates', JSON.stringify(affiliates));
    
    console.log('✅ Afiliados criados:', novosAfiliados.length);
    console.log('📊 Total de afiliados:', affiliates.length);
    console.log('🔗 Total de links gerados:', affiliates.length * 6);
    
    return novosAfiliados;
}

// Função para limpar todos os afiliados
function limparAfiliados() {
    localStorage.removeItem('kainow_affiliates');
    console.log('🗑️ Todos os afiliados foram removidos');
}

// Função para mostrar estatísticas
function mostrarEstatisticas() {
    const affiliates = JSON.parse(localStorage.getItem('kainow_affiliates') || '[]');
    const totalLinks = affiliates.length * 6;
    
    console.log('═══════════════════════════════════════');
    console.log('📊 ESTATÍSTICAS DO SISTEMA DE AFILIADOS');
    console.log('═══════════════════════════════════════');
    console.log('👥 Total de Afiliados:', affiliates.length);
    console.log('🔗 Total de Links Gerados:', totalLinks);
    console.log('💰 Comissão Média:', affiliates.length > 0 ? (affiliates.reduce((sum, a) => sum + a.commission, 0) / affiliates.length).toFixed(1) + '%' : '0%');
    console.log('═══════════════════════════════════════');
    
    if (affiliates.length > 0) {
        console.log('\n👥 LISTA DE AFILIADOS:');
        affiliates.forEach((aff, index) => {
            console.log(`\n${index + 1}. ${aff.name}`);
            console.log(`   📧 ${aff.email}`);
            console.log(`   📱 ${aff.phone}`);
            console.log(`   💰 Comissão: ${aff.commission}%`);
            console.log(`   🆔 ID: ${aff.id}`);
            console.log(`   📅 Criado: ${new Date(aff.createdAt).toLocaleDateString('pt-BR')}`);
        });
    }
}

// Exportar funções
if (typeof window !== 'undefined') {
    window.popularAfiliadosTeste = popularAfiliadosTeste;
    window.limparAfiliados = limparAfiliados;
    window.mostrarEstatisticas = mostrarEstatisticas;
}

// Log de instruções
console.log('═══════════════════════════════════════════════════════');
console.log('🎯 COMANDOS DISPONÍVEIS NO CONSOLE:');
console.log('═══════════════════════════════════════════════════════');
console.log('popularAfiliadosTeste()   - Criar 10 afiliados de teste');
console.log('mostrarEstatisticas()     - Ver estatísticas do sistema');
console.log('limparAfiliados()         - Remover todos os afiliados');
console.log('═══════════════════════════════════════════════════════');
