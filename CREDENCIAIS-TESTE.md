# 🧪 Credenciais de Teste - KaiNow Saúde

## 🔐 Login de Teste

Para testar o sistema completo sem precisar fazer cadastro, use as seguintes credenciais:

### Credenciais Disponíveis

| Campo | Valor |
|-------|-------|
| **CPF** | `111.444.777-35` |
| **Senha** | `teste123` |

---

## 📋 Como Usar

### 1. Acessar a Página de Login
- Vá para [login.html](login.html)
- Ou clique em qualquer botão "Contratar Agora" nos programas

### 2. Fazer Login com Credenciais de Teste
1. Digite o CPF: **111.444.777-35**
2. Digite a Senha: **teste123**
3. Clique em "Entrar"

### 3. O Que Você Pode Testar

Após fazer login, você terá acesso a:

✅ **Sistema de Checkout Completo**
- Página checkout.html com informações do usuário
- Pagamento via PIX (simulado)
- Pagamento via Cartão de Crédito (simulado)

✅ **Área do Usuário**
- Dashboard (dashboard.html)
- Agendamentos (agendamentos.html)
- Prontuários (prontuarios.html)
- Histórico (historico.html)
- Perfil (perfil.html)

✅ **Contratação de Programas**
- KaiNow Mulher - R$ 49,90/mês
- KaiNow Sênior - R$ 59,90/mês
- KaiNow Farma - R$ 19,90/mês
- KaiNow Acolher - R$ 24,90/mês
- KaiNow Orienta - R$ 19,90/mês
- KaiNow Viva Leve - R$ 24,90/mês

---

## 🎯 Dados do Usuário de Teste

O usuário de teste possui os seguintes dados salvos:

```json
{
  "id": "teste-001",
  "cpf": "11144477735",
  "nome": "Usuário Teste",
  "email": "teste@kainow.com",
  "telefone": "(27) 99798-1963",
  "status": "active"
}
```

---

## 💳 Testando Pagamentos

### PIX (Simulado)
1. Escolha a opção "PIX"
2. Veja o QR Code e código PIX gerados
3. Clique em "Já fiz o pagamento PIX"
4. Aguarde 3 segundos (simulação de confirmação)
5. Pagamento aprovado! ✅

### Cartão de Crédito (Simulado)
1. Escolha a opção "Cartão de Crédito"
2. Preencha os dados (qualquer número de cartão com 16 dígitos)
3. Exemplo de dados válidos:
   - **Número**: 4111 1111 1111 1111
   - **Nome**: Usuário Teste
   - **Validade**: 12/28
   - **CVV**: 123
   - **CPF**: 111.444.777-35
4. Clique em "Finalizar Pagamento"
5. Aguarde 2 segundos (simulação de processamento)
6. Pagamento aprovado! ✅

---

## 🔄 Fluxo Completo de Teste

### Passo a Passo Recomendado:

1. **Acesse a Home** (index.html)
2. **Navegue pelos Programas**
   - KaiNow Mulher
   - KaiNow Sênior
   - KaiNow Farma
   - KaiNow Acolher
   - KaiNow Orienta
   - KaiNow Viva Leve
3. **Clique em "Contratar Agora"** em qualquer programa
4. **Faça Login** com as credenciais de teste
5. **Escolha forma de pagamento** (PIX ou Cartão)
6. **Complete o pagamento simulado**
7. **Veja o modal de sucesso**
8. **Acesse o Dashboard** para ver suas assinaturas

---

## 🚀 Recursos Implementados

### ✅ Sistema de Autenticação
- Login com CPF e senha
- Validação de CPF
- Máscaras automáticas nos campos
- Sessão via localStorage

### ✅ Sistema de Checkout
- Página de checkout responsiva
- Verificação de login
- Resumo do pedido
- Duas formas de pagamento (PIX e Cartão)
- Modal de sucesso após pagamento

### ✅ Gestão de Assinaturas
- Salvamento de assinaturas no localStorage
- Data de início e renovação
- Status do programa (active)

### ✅ Interface Completa
- Design responsivo (mobile-first)
- Tailwind CSS para estilização
- Font Awesome para ícones
- Animações e transições suaves
- Feedback visual em todas as ações

---

## 🛠️ Desenvolvimento

### Usuário de Teste é Criado Automaticamente

Ao carregar a página **checkout.html**, o sistema cria automaticamente um usuário de teste no localStorage se não existir nenhum usuário.

**Código em** `js/checkout.js`:
```javascript
function createTestUser() {
    const existingUser = localStorage.getItem('kainow_user');
    
    if (!existingUser) {
        const testUser = {
            cpf: '111.444.777-35',
            nome: 'Usuário Teste',
            email: 'teste@kainow.com',
            telefone: '(27) 99798-1963',
            dataNascimento: '01/01/1990',
            genero: 'outro'
        };
        
        localStorage.setItem('kainow_user', JSON.stringify(testUser));
    }
}
```

### Login de Teste Integrado no Sistema

O sistema de autenticação (`js/auth.js`) reconhece as credenciais de teste e faz login automaticamente sem precisar de API:

```javascript
// Usuário de teste
if (cpfLimpo === '11144477735' && senha === 'teste123') {
    const usuarioTeste = {
        id: 'teste-001',
        cpf: '11144477735',
        nome: 'Usuário Teste',
        email: 'teste@kainow.com',
        telefone: '(27) 99798-1963',
        status: 'active'
    };
    
    localStorage.setItem('kainow_user', JSON.stringify(usuarioTeste));
    return { success: true, usuario: usuarioTeste };
}
```

---

## 📝 Notas Importantes

### ⚠️ Sistema de Pagamento Simulado
- Os pagamentos são **simulados** para demonstração
- Nenhuma transação real é processada
- Nenhum dado bancário real deve ser inserido
- Use dados fictícios para testes

### 🔒 Segurança
- Em produção, use um sistema de autenticação real
- Implemente hash de senhas com bcrypt no backend
- Use tokens JWT para sessões
- Integre com gateways de pagamento reais (Mercado Pago, PagSeguro, etc.)

### 💾 localStorage
- Os dados são salvos apenas no navegador do usuário
- Limpar o cache/cookies apaga os dados
- Não compartilhe dados sensíveis via localStorage em produção

---

## 🎉 Pronto para Testar!

Agora você pode testar todo o sistema de checkout e contratação de programas usando as credenciais:

**CPF**: `111.444.777-35`  
**Senha**: `teste123`

Divirta-se testando! 🚀

---

**Última Atualização**: 07/11/2025  
**Projeto**: KaiNow Saúde - Sistema de Telemedicina
