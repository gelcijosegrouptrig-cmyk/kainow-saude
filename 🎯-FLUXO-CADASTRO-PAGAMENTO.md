# 🎯 FLUXO COMPLETO: CADASTRO ANTES DO PAGAMENTO

## ✅ IMPLEMENTADO!

---

## 📋 ARQUIVOS CRIADOS:

### 1. **`cadastro-checkout.html`** (19KB)
**Página de cadastro do cliente**

**Funcionalidades:**
- ✅ Formulário completo de dados pessoais
- ✅ Detecção automática do afiliado (via ?ref=username)
- ✅ Banner mostrando quem indicou
- ✅ Informações do programa escolhido
- ✅ Máscaras automáticas (CPF, telefone)
- ✅ Validação de senha
- ✅ Aceite de termos
- ✅ Salva no Firestore (collection: `clientes`)
- ✅ Mantém referência do afiliado
- ✅ Redireciona para pagamento

**Campos coletados:**
```javascript
{
  nome: "João Silva",
  email: "joao@email.com",
  cpf: "123.456.789-00",
  telefone: "(11) 99999-9999",
  dataNascimento: "01/01/1990",
  senha: "senha123",
  
  programa: "mulher",
  programaNome: "KaiNow Mulher",
  valorMensal: 49.90,
  
  indicadoPor: "ruthyelisilva138",
  afiliado: {
    username: "ruthyelisilva138",
    nome: "RUTHYELI GOMES COSTA SILVA",
    comissao: 20,
    pixKey: "964.508.868-20"
  },
  
  status: "aguardando_pagamento",
  dataCadastro: timestamp,
  pagamentoId: null,
  dataPagamento: null
}
```

---

### 2. **`pagamento-pix.html`** (12KB)
**Página de pagamento**

**Funcionalidades:**
- ✅ Mostra dados do cliente cadastrado
- ✅ Mostra resumo do plano
- ✅ Exibe afiliado (se houver)
- ✅ QR Code PIX (placeholder - precisa integração real)
- ✅ Código PIX para copiar
- ✅ Instruções de pagamento
- ✅ Verificação de pagamento (simulada)
- ✅ Atualiza status no Firestore após pagamento
- ✅ Redireciona para dashboard

---

## 🔄 FLUXO COMPLETO:

```
1. Cliente clica no link do afiliado
   https://kainow.com.br/programa-mulher.html?ref=ruthyelisilva138
   ↓
2. Vê a página do programa
   - Banner: "Indicado por: RUTHYELI"
   - Informações do plano
   - Benefícios
   ↓
3. Clica em "Assinar com PIX"
   ↓
4. REDIRECIONA PARA: cadastro-checkout.html
   URL: cadastro-checkout.html?program=mulher&ref=ruthyelisilva138
   ↓
5. Cliente preenche formulário:
   - Nome completo
   - Email
   - CPF
   - Telefone
   - Data de nascimento
   - Senha (2x)
   - Aceitar termos
   ↓
6. Sistema SALVA no Firestore
   - Collection: 'clientes'
   - Status: 'aguardando_pagamento'
   - Mantém referência do afiliado
   ↓
7. REDIRECIONA PARA: pagamento-pix.html
   URL: pagamento-pix.html?client=ABC123&program=mulher&ref=ruthyelisilva138
   ↓
8. Cliente vê:
   - QR Code PIX
   - Código para copiar
   - Resumo dos dados
   - Valor a pagar
   ↓
9. Cliente PAGA via PIX
   ↓
10. Sistema DETECTA pagamento (webhook)
    - Atualiza status: 'ativo'
    - Salva ID do pagamento
    - Registra data/hora
    ↓
11. REDIRECIONA PARA: dashboard.html
    Cliente já logado automaticamente
    ↓
12. Cliente acessa dashboard:
    - Agendar consultas
    - Ver prontuários
    - Histórico
    - Dados pessoais
```

---

## 🔧 O QUE FALTA FAZER:

### **1. Atualizar botões "Assinar com PIX" nas páginas de programa**

Nos arquivos:
- `programa-mulher.html`
- `programa-senior.html`
- `programa-farma.html`
- `programa-acolher.html`
- `programa-orienta.html`
- `programa-vivaleve.html`

**MUDAR:**
```html
<!-- ANTES (vai direto para checkout) -->
<button onclick="window.location.href='checkout.html?program=mulher&ref=...'">
    Assinar com PIX
</button>

<!-- DEPOIS (vai para cadastro) -->
<button onclick="window.location.href='cadastro-checkout.html?program=mulher&ref=' + getAffiliateRef()">
    Assinar com PIX
</button>
```

**Ou melhor ainda:**
```javascript
function handlePixRecorrente() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    const programId = 'mulher'; // Mudar conforme a página
    
    let url = `cadastro-checkout.html?program=${programId}`;
    if (affiliateRef) {
        url += `&ref=${affiliateRef}`;
    }
    
    window.location.href = url;
}
```

---

### **2. Integração com Gateway de Pagamento (PIX)**

Para gerar QR Code PIX real, você precisa:

#### **Opção A: Woovi (OpenPix)**
```javascript
// Em pagamento-pix.html
async function gerarQRCodePIX(clientData) {
    const response = await fetch('https://api.openpix.com.br/api/v1/charge', {
        method: 'POST',
        headers: {
            'Authorization': 'SUA_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            value: clientData.valorMensal * 100, // Em centavos
            customer: {
                name: clientData.nome,
                email: clientData.email,
                taxID: clientData.cpf
            },
            additionalInfo: [
                {
                    key: 'Plano',
                    value: clientData.programaNome
                },
                {
                    key: 'Afiliado',
                    value: clientData.indicadoPor || 'Sem indicação'
                }
            ]
        })
    });
    
    const data = await response.json();
    
    // Exibir QR Code
    document.getElementById('qr-code-img').src = data.charge.qrCodeImage;
    document.getElementById('pix-code').value = data.charge.brCode;
    
    return data.charge.correlationID;
}
```

#### **Opção B: Mercado Pago**
```javascript
// Similar ao Woovi, mas com endpoints do Mercado Pago
```

---

### **3. Webhook para Detectar Pagamento**

Você precisa de um backend (Node.js, Python, PHP) para:

```javascript
// Backend: webhook endpoint
app.post('/webhook/pagamento', async (req, res) => {
    const { chargeId, status, customer } = req.body;
    
    if (status === 'COMPLETED') {
        // Buscar cliente no Firestore pelo email ou CPF
        const clientSnapshot = await db.collection('clientes')
            .where('email', '==', customer.email)
            .get();
        
        if (!clientSnapshot.empty) {
            const clientDoc = clientSnapshot.docs[0];
            
            // Atualizar status
            await clientDoc.ref.update({
                status: 'ativo',
                pagamentoId: chargeId,
                dataPagamento: admin.firestore.FieldValue.serverTimestamp()
            });
            
            // Transferir comissão para afiliado (se houver)
            const clientData = clientDoc.data();
            if (clientData.afiliado) {
                await transferirComissao(clientData);
            }
            
            // Enviar email de boas-vindas
            await enviarEmailBoasVindas(clientData);
        }
    }
    
    res.sendStatus(200);
});
```

---

### **4. Login Automático após Pagamento**

Em `pagamento-pix.html`, quando detectar pagamento:

```javascript
async function aposConfirmarPagamento(clientId) {
    // Buscar dados do cliente
    const clientDoc = await db.collection('clientes').doc(clientId).get();
    const clientData = clientDoc.data();
    
    // Criar sessão
    const sessionData = {
        userId: clientId,
        nome: clientData.nome,
        email: clientData.email,
        programa: clientData.programa,
        status: 'ativo',
        loginTime: new Date().toISOString()
    };
    
    // Salvar sessão
    localStorage.setItem('kainow_client_session', JSON.stringify(sessionData));
    
    // Redirecionar
    window.location.href = 'dashboard.html';
}
```

---

### **5. Dashboard do Cliente**

O arquivo `dashboard.html` precisa:

1. **Verificar sessão:**
```javascript
function checkClientAuth() {
    const session = localStorage.getItem('kainow_client_session');
    
    if (!session) {
        window.location.href = 'login.html';
        return null;
    }
    
    return JSON.parse(session);
}
```

2. **Carregar dados do Firestore:**
```javascript
async function loadClientData() {
    const session = checkClientAuth();
    
    const clientDoc = await db.collection('clientes')
        .doc(session.userId)
        .get();
    
    if (clientDoc.exists) {
        const data = clientDoc.data();
        
        // Verificar se está ativo
        if (data.status !== 'ativo') {
            alert('⚠️ Aguardando confirmação do pagamento...');
            window.location.href = 'pagamento-pix.html?client=' + session.userId;
            return;
        }
        
        // Carregar dashboard
        renderDashboard(data);
    }
}
```

---

## 🧪 COMO TESTAR:

### **1. Fluxo Completo (Local):**

```bash
1. Abra: programa-mulher.html?ref=ruthyelisilva138
2. Clique em "Assinar com PIX"
3. Preencha o formulário de cadastro
4. Clique em "Continuar para Pagamento"
5. Veja a página de pagamento
6. (Aguarde webhook simular pagamento - 50 segundos)
7. Será redirecionado para dashboard
```

### **2. Verificar no Firestore:**

```bash
1. Firebase Console → Firestore Database
2. Collection: 'clientes'
3. Veja o documento criado
4. Verifique os campos:
   - status: 'aguardando_pagamento' → 'ativo'
   - indicadoPor: username do afiliado
   - afiliado: dados completos
```

---

## 📊 ESTRUTURA DO FIRESTORE:

```
Firestore
│
├── affiliates (afiliados)
│   ├── IbJkR0mo1Thv5g7C8k01
│   │   ├── username: "ruthyelisilva138"
│   │   ├── name: "RUTHYELI GOMES COSTA SILVA"
│   │   ├── commission: 20
│   │   └── pixKey: "964.508.868-20"
│   └── ...
│
└── clientes (clientes/pacientes)
    ├── XYZ789ABC123
    │   ├── nome: "João Silva"
    │   ├── email: "joao@email.com"
    │   ├── cpf: "123.456.789-00"
    │   ├── programa: "mulher"
    │   ├── valorMensal: 49.90
    │   ├── indicadoPor: "ruthyelisilva138"
    │   ├── afiliado: { ... }
    │   ├── status: "ativo"
    │   └── dataPagamento: timestamp
    └── ...
```

---

## ⚠️ IMPORTANTE:

### **Segurança:**
- ⚠️ **NÃO armazene senhas em texto puro!**
- ✅ Use hash (bcrypt, SHA256)
- ✅ Implemente em backend

### **Gateway de Pagamento:**
- ⚠️ QR Code é placeholder
- ✅ Precisa integração real (Woovi/Mercado Pago)
- ✅ Precisa webhook configurado

### **Verificação de Pagamento:**
- ⚠️ Atualmente simulada (50 segundos)
- ✅ Implementar webhook real
- ✅ Backend para processar

---

## 🎯 PRÓXIMOS PASSOS:

1. ✅ **Publicar arquivos criados** (cadastro-checkout.html, pagamento-pix.html)
2. ⏳ **Atualizar botões** nas páginas de programa
3. ⏳ **Escolher gateway** de pagamento (Woovi/Mercado Pago)
4. ⏳ **Configurar webhook** para detectar pagamentos
5. ⏳ **Implementar backend** para processar comissões
6. ⏳ **Testar fluxo completo** end-to-end

---

**Status:** ✅ Cadastro e Pagamento criados  
**Atualizado:** 10/11/2025 21:00  
**Aguardando:** Publicação e integração com gateway
