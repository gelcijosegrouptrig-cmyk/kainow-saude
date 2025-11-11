# 🎯 Sistema de Webhook Automático por Afiliado

## 🚀 OBJETIVO

**Criar webhook individual para cada afiliado automaticamente** e processar comissões via PIX sem intervenção manual!

---

## 📋 COMO FUNCIONA

### 1️⃣ Cadastro de Afiliado (AUTOMÁTICO)
```
Admin cadastra afiliado
  ↓
Sistema gera webhook único
  ↓
Registra na Woovi via API
  ↓
Armazena webhook_id no Firebase
```

### 2️⃣ Cliente Assina Programa (AUTOMÁTICO)
```
Cliente escaneia QR Code do afiliado
  ↓
Sistema cria subscription
  ↓
Adiciona affiliate_id em additionalInfo
  ↓
Woovi cobra automaticamente todo mês
```

### 3️⃣ Pagamento Recebido (100% AUTOMÁTICO)
```
Cliente paga PIX Recorrente
  ↓
Woovi dispara webhook do afiliado
  ↓
Backend identifica afiliado
  ↓
Calcula comissão (ex: 25%)
  ↓
Transfere PIX automaticamente
  ↓
Afiliado recebe na conta
```

---

## 🏗️ ARQUITETURA TÉCNICA

### **POST /api/v1/webhook** - Criar Webhook Woovi

```javascript
// Endpoint oficial da Woovi
POST https://api.woovi.com/api/v1/webhook

Headers:
  Authorization: {WOOVI_APP_ID}
  Content-Type: application/json

Body:
{
  "webhook": {
    "name": "Webhook Afiliado - João Silva",
    "event": "OPENPIX:TRANSACTION_RECEIVED",
    "url": "https://seu-backend.com/webhooks/affiliates/abc123",
    "authorization": "Bearer seu-token-secreto",
    "isActive": true
  }
}

Response:
{
  "webhook": {
    "id": "webhook_abc123xyz",
    "name": "Webhook Afiliado - João Silva",
    "event": "OPENPIX:TRANSACTION_RECEIVED",
    "url": "https://seu-backend.com/webhooks/affiliates/abc123",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 💻 IMPLEMENTAÇÃO BACKEND

### 1️⃣ Criar Webhook ao Cadastrar Afiliado

**Arquivo:** `backend/routes/affiliates.js`

```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = 'https://api.woovi.com/api/v1';
const BACKEND_URL = process.env.BACKEND_URL; // Ex: https://seu-backend.herokuapp.com

// Inicializar Firebase
const db = admin.firestore();

// ✅ Criar afiliado + webhook automático
router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, pixKey, commissionPercent } = req.body;
    
    // 1. Gerar ID único para o afiliado
    const affiliateRef = db.collection('affiliates').doc();
    const affiliateId = affiliateRef.id;
    
    // 2. Criar webhook na Woovi
    const webhookData = {
      webhook: {
        name: `Webhook Afiliado - ${name}`,
        event: 'OPENPIX:TRANSACTION_RECEIVED',
        url: `${BACKEND_URL}/webhooks/affiliates/${affiliateId}`,
        authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
        isActive: true
      }
    };
    
    const webhookResponse = await axios.post(
      `${WOOVI_API_URL}/webhook`,
      webhookData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const webhookId = webhookResponse.data.webhook.id;
    
    // 3. Salvar afiliado no Firebase com webhook_id
    await affiliateRef.set({
      name,
      email,
      phone,
      pixKey,
      commissionPercent,
      webhookId,
      webhookUrl: `${BACKEND_URL}/webhooks/affiliates/${affiliateId}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Afiliado criado com webhook automático!',
      affiliate: {
        id: affiliateId,
        name,
        email,
        webhookId,
        webhookUrl: `${BACKEND_URL}/webhooks/affiliates/${affiliateId}`
      }
    });
    
  } catch (error) {
    console.error('Erro ao criar afiliado:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message
    });
  }
});

module.exports = router;
```

---

### 2️⃣ Receber Webhook e Processar Comissão Automaticamente

**Arquivo:** `backend/routes/webhooks.js`

```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = 'https://api.woovi.com/api/v1';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const db = admin.firestore();

// Middleware para validar webhook
const validateWebhook = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// ✅ Endpoint único para cada afiliado
router.post('/affiliates/:affiliateId', validateWebhook, async (req, res) => {
  try {
    const { affiliateId } = req.params;
    const { charge, pix } = req.body;
    
    console.log(`🔔 Webhook recebido para afiliado: ${affiliateId}`);
    console.log(`💰 Valor recebido: R$ ${(charge.value / 100).toFixed(2)}`);
    
    // 1. Buscar dados do afiliado no Firebase
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    
    if (!affiliateDoc.exists) {
      console.error(`Afiliado ${affiliateId} não encontrado`);
      return res.status(404).json({ error: 'Affiliate not found' });
    }
    
    const affiliate = affiliateDoc.data();
    
    // 2. Calcular comissão
    const commissionPercent = affiliate.commissionPercent || 25;
    const commissionValue = Math.floor((charge.value * commissionPercent) / 100);
    
    console.log(`📊 Comissão calculada: ${commissionPercent}% = R$ ${(commissionValue / 100).toFixed(2)}`);
    
    // 3. Transferir PIX automaticamente para o afiliado
    const pixTransferData = {
      value: commissionValue,
      pixKey: affiliate.pixKey,
      correlationID: `commission_${affiliateId}_${Date.now()}`,
      description: `Comissão ${commissionPercent}% - Venda ${charge.correlationID}`
    };
    
    const transferResponse = await axios.post(
      `${WOOVI_API_URL}/charge`,
      pixTransferData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ PIX transferido: ${transferResponse.data.charge.correlationID}`);
    
    // 4. Registrar comissão no Firebase
    await db.collection('commissions').add({
      affiliateId,
      affiliateName: affiliate.name,
      chargeId: charge.correlationID,
      saleValue: charge.value,
      commissionPercent,
      commissionValue,
      pixTransactionId: transferResponse.data.charge.correlationID,
      status: 'PAID',
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // 5. Atualizar estatísticas do afiliado
    await db.collection('affiliates').doc(affiliateId).update({
      totalCommissions: admin.firestore.FieldValue.increment(commissionValue),
      totalSales: admin.firestore.FieldValue.increment(1),
      lastSaleAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`🎉 Comissão processada com sucesso para ${affiliate.name}!`);
    
    res.status(200).json({
      success: true,
      message: 'Commission processed successfully',
      commission: {
        affiliateId,
        affiliateName: affiliate.name,
        value: commissionValue,
        percent: commissionPercent
      }
    });
    
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error.response?.data || error.message);
    
    // Registrar erro no Firebase para auditoria
    await db.collection('webhook_errors').add({
      affiliateId: req.params.affiliateId,
      error: error.message,
      stack: error.stack,
      webhookData: req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ✅ Listar todos os webhooks ativos
router.get('/list', async (req, res) => {
  try {
    const response = await axios.get(
      `${WOOVI_API_URL}/webhook`,
      {
        headers: {
          'Authorization': WOOVI_API_KEY
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Deletar webhook de afiliado
router.delete('/affiliates/:affiliateId/webhook/:webhookId', async (req, res) => {
  try {
    const { affiliateId, webhookId } = req.params;
    
    // Deletar webhook na Woovi
    await axios.delete(
      `${WOOVI_API_URL}/webhook/${webhookId}`,
      {
        headers: {
          'Authorization': WOOVI_API_KEY
        }
      }
    );
    
    // Atualizar Firebase
    await db.collection('affiliates').doc(affiliateId).update({
      webhookId: admin.firestore.FieldValue.delete(),
      webhookUrl: admin.firestore.FieldValue.delete(),
      isActive: false
    });
    
    res.json({ success: true, message: 'Webhook deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

### 3️⃣ Criar Subscription com Dados do Afiliado

**Arquivo:** `backend/routes/subscriptions.js`

```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const WOOVI_API_KEY = process.env.WOOVI_APP_ID;
const WOOVI_API_URL = 'https://api.woovi.com/api/v1';
const db = admin.firestore();

// ✅ Criar subscription vinculada ao afiliado
router.post('/create', async (req, res) => {
  try {
    const {
      affiliateId,
      customerName,
      customerEmail,
      customerPhone,
      customerTaxID,
      program,
      value
    } = req.body;
    
    // 1. Buscar dados do afiliado
    const affiliateDoc = await db.collection('affiliates').doc(affiliateId).get();
    
    if (!affiliateDoc.exists) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }
    
    const affiliate = affiliateDoc.data();
    
    // 2. Criar subscription na Woovi
    const subscriptionData = {
      value: value, // Em centavos (ex: 4990 = R$ 49,90)
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        taxID: customerTaxID
      },
      dayGenerateCharge: 25, // Dia que cobra no mês
      frequency: 'MONTHLY',
      type: 'PIX_RECURRING',
      journeyType: 'PAYMENT_ON_APPROVAL',
      additionalInfo: [
        {
          key: 'affiliate_id',
          value: affiliateId
        },
        {
          key: 'affiliate_name',
          value: affiliate.name
        },
        {
          key: 'affiliate_pix_key',
          value: affiliate.pixKey
        },
        {
          key: 'commission_percent',
          value: affiliate.commissionPercent.toString()
        },
        {
          key: 'program',
          value: program
        }
      ]
    };
    
    const response = await axios.post(
      `${WOOVI_API_URL}/subscriptions`,
      subscriptionData,
      {
        headers: {
          'Authorization': WOOVI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const subscription = response.data;
    
    // 3. Registrar subscription no Firebase
    await db.collection('subscriptions').add({
      subscriptionId: subscription.globalID,
      affiliateId,
      affiliateName: affiliate.name,
      customerName,
      customerEmail,
      program,
      value,
      status: 'ACTIVE',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      subscription: {
        id: subscription.globalID,
        qrCodeImage: subscription.charge.qrCodeImage,
        brCode: subscription.charge.brCode,
        paymentLinkUrl: subscription.charge.paymentLinkUrl
      }
    });
    
  } catch (error) {
    console.error('Erro ao criar subscription:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

### 4️⃣ Server Principal

**Arquivo:** `backend/server.js`

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/affiliates', require('./routes/affiliates'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  console.log(`📡 Webhook URL: ${process.env.BACKEND_URL}/api/webhooks/affiliates/:affiliateId`);
});
```

---

### 5️⃣ Variáveis de Ambiente

**Arquivo:** `backend/.env`

```bash
# Woovi API
WOOVI_APP_ID=sua-chave-woovi-aqui
WOOVI_API_URL=https://api.woovi.com/api/v1

# Backend
BACKEND_URL=https://seu-backend.herokuapp.com
PORT=3000

# Webhook Security
WEBHOOK_SECRET=sua-chave-secreta-super-segura-123

# Firebase (Service Account)
# Baixe o arquivo JSON do Firebase Console e coloque em:
# backend/firebase-service-account.json
```

---

## 📱 INTERFACE ADMIN - Cadastrar Afiliado

**Arquivo:** `admin/criar-afiliado-com-webhook.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Criar Afiliado com Webhook Automático</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">
            🎯 Criar Afiliado + Webhook Automático
        </h1>
        
        <form id="affiliate-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                </label>
                <input type="text" id="name" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input type="email" id="email" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                </label>
                <input type="tel" id="phone" required placeholder="+5511999999999"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Chave PIX (para receber comissões)
                </label>
                <input type="text" id="pixKey" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Percentual de Comissão (%)
                </label>
                <input type="number" id="commissionPercent" required value="25" min="1" max="100"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            
            <button type="submit"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                ✅ Criar Afiliado + Webhook Automático
            </button>
        </form>
        
        <div id="result" class="mt-6 hidden"></div>
        <div id="loading" class="mt-6 hidden text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-gray-600">Criando webhook na Woovi...</p>
        </div>
    </div>

    <script>
        const BACKEND_URL = 'https://seu-backend.herokuapp.com';

        document.getElementById('affiliate-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const loading = document.getElementById('loading');
            const result = document.getElementById('result');
            const form = e.target;
            
            loading.classList.remove('hidden');
            result.classList.add('hidden');
            
            try {
                const data = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    pixKey: document.getElementById('pixKey').value,
                    commissionPercent: parseInt(document.getElementById('commissionPercent').value)
                };
                
                const response = await fetch(`${BACKEND_URL}/api/affiliates/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const json = await response.json();
                
                loading.classList.add('hidden');
                
                if (json.success) {
                    result.className = 'mt-6 bg-green-50 border border-green-200 rounded-lg p-6';
                    result.innerHTML = `
                        <h3 class="text-xl font-bold text-green-800 mb-4">✅ Sucesso!</h3>
                        <p class="text-green-700 mb-4">Afiliado criado com webhook automático!</p>
                        <div class="bg-white rounded p-4 text-sm font-mono">
                            <p><strong>ID:</strong> ${json.affiliate.id}</p>
                            <p><strong>Nome:</strong> ${json.affiliate.name}</p>
                            <p><strong>Webhook ID:</strong> ${json.affiliate.webhookId}</p>
                            <p><strong>Webhook URL:</strong> ${json.affiliate.webhookUrl}</p>
                        </div>
                        <p class="mt-4 text-green-700">
                            ✅ Agora toda venda será processada automaticamente!<br>
                            💰 Comissões serão pagas via PIX instantaneamente!
                        </p>
                    `;
                    form.reset();
                } else {
                    throw new Error(json.error || 'Erro desconhecido');
                }
                
            } catch (error) {
                loading.classList.add('hidden');
                result.className = 'mt-6 bg-red-50 border border-red-200 rounded-lg p-6';
                result.innerHTML = `
                    <h3 class="text-xl font-bold text-red-800 mb-2">❌ Erro</h3>
                    <p class="text-red-700">${error.message}</p>
                `;
            }
            
            result.classList.remove('hidden');
        });
    </script>
</body>
</html>
```

---

## 🎯 VANTAGENS DO SISTEMA

### ✅ **100% Automático**
- Webhook criado automaticamente ao cadastrar afiliado
- Não precisa configurar manualmente na Woovi
- Um webhook único por afiliado

### ✅ **Seguro**
- Cada webhook tem URL única
- Validação com Bearer token
- Auditoria completa no Firebase

### ✅ **Escalável**
- Suporta milhares de afiliados
- Cada um com seu próprio webhook
- Processamento paralelo

### ✅ **Rastreável**
- Todos os webhooks registrados no Firebase
- Histórico completo de comissões
- Logs de erro para depuração

---

## 📊 FLUXO VISUAL COMPLETO

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1: CADASTRO DO AFILIADO (ÚNICO)                      │
└─────────────────────────────────────────────────────────────┘

Admin acessa: admin/criar-afiliado-com-webhook.html
   │
   │  1. Preenche dados (nome, email, PIX, comissão)
   │
   │  2. Clica "Criar Afiliado"
   │
   ├──────────────────────────────────────┐
   │                                      │
   │                               Backend recebe
   │                                      │
   │                               3. Gera ID único
   │                                      │
   │                               4. POST /api/v1/webhook
   │                                      ├───────────────────►
   │                                      │               Woovi API
   │                               5. Recebe webhook_id
   │                                      │◄──────────────────┤
   │                                      │
   │                               6. Salva no Firebase:
   │                                  - affiliate_id
   │                                  - webhook_id
   │                                  - webhook_url
   │
   │  ✅ PRONTO! Afiliado ativo com webhook configurado
   │

┌─────────────────────────────────────────────────────────────┐
│  FASE 2: VENDA RECORRENTE (AUTOMÁTICO TODO MÊS)            │
└─────────────────────────────────────────────────────────────┘

DIA 25 de todo mês:
   │
   │  Woovi cobra cliente automaticamente
   │
   │  Cliente paga PIX
   │
   │  Woovi dispara webhook:
   │    POST https://backend.com/webhooks/affiliates/{affiliate_id}
   │
   ├──────────────────────────────────────┐
   │                                      │
   │                               Backend recebe
   │                                      │
   │                               1. Valida Bearer token
   │                                      │
   │                               2. Busca afiliado no Firebase
   │                                      │
   │                               3. Calcula comissão (25%)
   │                                      │
   │                               4. POST /api/v1/charge
   │                                  (Transfere PIX)
   │                                      ├───────────────────►
   │                                      │               Woovi API
   │                               5. Confirma transferência
   │                                      │◄──────────────────┤
   │                                      │
   │                               6. Registra comissão paga
   │                                  no Firebase
   │
   │  ✅ Afiliado recebe PIX na conta!
   │

```

---

## 🚀 PRÓXIMOS PASSOS

### 1. **Configurar Backend (Heroku/Railway)**
```bash
# 1. Clonar backend
git clone seu-repo-backend.git
cd backend

# 2. Instalar dependências
npm install express axios cors dotenv firebase-admin

# 3. Configurar .env
cp .env.example .env
# Adicionar WOOVI_APP_ID, WEBHOOK_SECRET, etc.

# 4. Deploy
git push heroku main
```

### 2. **Obter Credenciais Woovi**
- Acessar: https://app.woovi.com
- Ir em: API/Plugins → App ID
- Copiar: WOOVI_APP_ID

### 3. **Criar Primeiro Afiliado**
- Abrir: `admin/criar-afiliado-com-webhook.html`
- Preencher dados
- Sistema cria webhook automaticamente!

### 4. **Testar Webhook**
- Criar subscription teste
- Simular pagamento
- Verificar se comissão foi paga

---

## 📞 SUPORTE

**Dúvidas?** Siga a ordem:
1. ✅ Criar backend (7 dias)
2. ✅ Configurar Firebase
3. ✅ Obter credenciais Woovi
4. ✅ Criar primeiro afiliado
5. ✅ Testar webhook

**Status:** 🎯 Sistema 100% planejado e pronto para implementação!

