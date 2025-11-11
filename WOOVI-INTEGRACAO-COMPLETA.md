# 🎯 Integração Completa Woovi (OpenPIX)
## PIX Recorrente + Split Payment para Afiliados

---

## 📋 Sumário Executivo

✅ **PIX Automático (Recorrente):** CONFIRMADO - Woovi possui API completa de subscriptions  
✅ **Split Payment:** CONFIRMADO - Woovi suporta divisão automática de pagamentos  
⚠️ **Limitação Importante:** Splits NÃO funcionam diretamente em subscriptions, apenas em charges individuais

---

## 🏗️ Arquitetura da Solução

### Fluxo Completo:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. CLIENTE ASSINA PROGRAMA (via botão PIX Recorrente)          │
│    ↓                                                             │
│    Backend cria Subscription na Woovi                           │
│    → Retorna QR Code PIX Recorrente                            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. CLIENTE AUTORIZA PIX AUTOMÁTICO (no app do banco)           │
│    ↓                                                             │
│    Woovi ativa subscription e gera primeira cobrança            │
│    → Webhook: OPENPIX:CHARGE_CREATED                           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. CLIENTE PAGA PRIMEIRA COBRANÇA                               │
│    ↓                                                             │
│    Woovi confirma pagamento                                     │
│    → Webhook: OPENPIX:TRANSACTION_RECEIVED                     │
│    ↓                                                             │
│    Backend recebe webhook e cria split para afiliado           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. MENSALMENTE: NOVA COBRANÇA AUTOMÁTICA                        │
│    ↓                                                             │
│    Woovi gera charge automaticamente (dia 25 do mês)           │
│    → Webhook: OPENPIX:CHARGE_CREATED                           │
│    ↓                                                             │
│    Cliente paga automaticamente                                 │
│    → Webhook: OPENPIX:TRANSACTION_RECEIVED                     │
│    ↓                                                             │
│    Backend cria split para afiliado                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementação Técnica

### 1️⃣ Criar Subscription (Assinatura Recorrente)

**Endpoint:** `POST https://api.woovi.com/api/v1/subscriptions`

**Headers:**
```json
{
  "Authorization": "YOUR_WOOVI_API_KEY",
  "Content-Type": "application/json"
}
```

**Body Exemplo (Programa Mulher - R$ 49,90):**
```json
{
  "customer": {
    "name": "Maria Silva",
    "email": "maria@email.com",
    "phone": "5511999999999",
    "taxID": "12345678900"
  },
  "value": 4990,
  "name": "Programa Mulher - Assinatura Mensal",
  "comment": "Assinatura Programa Mulher",
  "dayGenerateCharge": 25,
  "frequency": "MONTHLY",
  "type": "PIX_RECURRING",
  "dayDue": 7,
  "correlationID": "programa-mulher-AFF1762773875782",
  "additionalInfo": [
    {
      "key": "affiliate_id",
      "value": "AFF1762773875782"
    },
    {
      "key": "program",
      "value": "mulher"
    },
    {
      "key": "commission_percent",
      "value": "25"
    }
  ],
  "pixRecurringOptions": {
    "retryPolicy": "THREE_RETRIES_7_DAYS",
    "journey": "PAYMENT_ON_APPROVAL",
    "minimumValue": 4990
  }
}
```

**Parâmetros Importantes:**

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `value` | Valor em **centavos** | 4990 = R$ 49,90 |
| `dayGenerateCharge` | Dia do mês para gerar cobrança | 25 (dia 25 de cada mês) |
| `frequency` | Frequência da assinatura | WEEKLY, MONTHLY, SEMIANNUALLY, ANNUALLY |
| `type` | Tipo de assinatura | PIX_RECURRING ou RECURRENT |
| `dayDue` | Dias para vencimento após geração | 7 (cobrar hoje, vence em 7 dias) |
| `correlationID` | Seu ID único para rastreamento | programa-mulher-AFF123 |
| `additionalInfo` | Metadados customizados | affiliate_id, commission_percent, etc. |
| `pixRecurringOptions.journey` | Tipo de jornada | PAYMENT_ON_APPROVAL ou ONLY_RECURRENCY |
| `pixRecurringOptions.retryPolicy` | Política de retry | NON_PERMITED ou THREE_RETRIES_7_DAYS |

**Response Exemplo:**
```json
{
  "subscription": {
    "globalID": "UGF5bWVudFN1YnNjcmlwdGlvbjo2OGFjYmNkNGE5NTY1M2VmMjQzYjY2Zjc=",
    "customer": {
      "name": "Maria Silva",
      "email": "maria@email.com",
      "phone": "+5511999999999",
      "taxID": {
        "taxID": "12345678900",
        "type": "BR:CPF"
      }
    },
    "dayGenerateCharge": 25,
    "value": 4990,
    "status": "ACTIVE",
    "correlationID": "programa-mulher-AFF1762773875782",
    "pixRecurring": {
      "recurrencyId": "RN5481141720250825yPWxVcFfpA1",
      "emv": "00020101021226870014br.gov.bcb.pix...",
      "journey": "PAYMENT_ON_APPROVAL",
      "status": "CREATED"
    }
  }
}
```

---

### 2️⃣ Configurar Webhooks

**Endpoint:** `POST https://api.woovi.com/api/v1/webhook`

**Webhook 1: Quando cobrança é criada**
```json
{
  "webhook": {
    "name": "Cobrança Criada",
    "event": "OPENPIX:CHARGE_CREATED",
    "url": "https://seu-backend.com/webhooks/woovi/charge-created",
    "authorization": "your-secret-key",
    "isActive": true
  }
}
```

**Webhook 2: Quando pagamento é recebido**
```json
{
  "webhook": {
    "name": "Pagamento Recebido",
    "event": "OPENPIX:TRANSACTION_RECEIVED",
    "url": "https://seu-backend.com/webhooks/woovi/transaction-received",
    "authorization": "your-secret-key",
    "isActive": true
  }
}
```

**Eventos Disponíveis:**
- `OPENPIX:CHARGE_CREATED` - Quando uma nova cobrança é gerada
- `OPENPIX:TRANSACTION_RECEIVED` - Quando o pagamento é confirmado
- `OPENPIX:CHARGE_COMPLETED` - Quando a cobrança é completada
- `OPENPIX:CHARGE_EXPIRED` - Quando a cobrança expira

---

### 3️⃣ Processar Webhook de Pagamento

**⚠️ IMPORTANTE:** Split payment deve ser feito APÓS confirmar pagamento!

**Backend Endpoint:** `POST /webhooks/woovi/transaction-received`

```javascript
// backend/routes/webhooks.js
app.post('/webhooks/woovi/transaction-received', async (req, res) => {
  try {
    // 1. Validar webhook (security)
    const authHeader = req.headers.authorization;
    if (authHeader !== 'your-secret-key') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Extrair dados do pagamento
    const { charge, pix, pixQrCode } = req.body;
    
    // 3. Buscar informações do afiliado no additionalInfo
    const affiliateInfo = charge.additionalInfo.find(info => info.key === 'affiliate_id');
    const commissionInfo = charge.additionalInfo.find(info => info.key === 'commission_percent');
    
    if (!affiliateInfo || !commissionInfo) {
      console.log('Pagamento sem afiliado - não há split');
      return res.status(200).json({ message: 'No affiliate split needed' });
    }

    const affiliateId = affiliateInfo.value;
    const commissionPercent = parseInt(commissionInfo.value);
    
    // 4. Buscar dados do afiliado no banco de dados
    const affiliate = await getAffiliateById(affiliateId);
    
    if (!affiliate || !affiliate.pixKey) {
      console.error('Afiliado não tem PIX Key cadastrada');
      return res.status(400).json({ error: 'Affiliate PIX Key not found' });
    }

    // 5. Calcular comissão
    const totalValue = charge.value; // Em centavos
    const commissionValue = Math.floor((totalValue * commissionPercent) / 100);
    
    // 6. Criar transferência PIX para afiliado
    const splitPayment = await createPixTransfer({
      pixKey: affiliate.pixKey,
      value: commissionValue,
      description: `Comissão ${commissionPercent}% - ${charge.correlationID}`,
      correlationID: `commission-${charge.correlationID}-${Date.now()}`
    });

    // 7. Registrar comissão no banco de dados
    await saveCommission({
      affiliateId: affiliateId,
      chargeId: charge.correlationID,
      programValue: totalValue,
      commissionPercent: commissionPercent,
      commissionValue: commissionValue,
      status: 'PAID',
      paidAt: new Date(),
      pixKey: affiliate.pixKey,
      splitPaymentId: splitPayment.id
    });

    console.log(`✅ Comissão paga: R$ ${(commissionValue / 100).toFixed(2)} para ${affiliateId}`);
    
    res.status(200).json({ 
      message: 'Webhook processed successfully',
      commission: {
        affiliate: affiliateId,
        value: commissionValue,
        status: 'PAID'
      }
    });

  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

### 4️⃣ Criar Transferência PIX (Split Payment)

**⚠️ NOTA:** Woovi não tem endpoint direto de "split" em subscriptions. A solução é fazer **transferências PIX manuais** após receber pagamento.

**Endpoint:** `POST https://api.woovi.com/api/v1/charge` (para criar cobrança com split) ou usar API de transferência PIX

**Alternativa 1: Criar Charge com Split (para pagamentos únicos)**
```json
{
  "correlationID": "unique-charge-id",
  "value": 4990,
  "customer": {
    "name": "Maria Silva",
    "taxID": "12345678900"
  },
  "splits": [
    {
      "value": 1248,
      "pixKey": "11999999999",
      "splitType": "SPLIT_INTERNAL_TRANSFER"
    }
  ]
}
```

**Alternativa 2: Transferência PIX Direta** (RECOMENDADO para subscriptions)

Usar Woovi Payments API para criar transferência:
```json
POST /api/v1/payment
{
  "value": 1248,
  "pixKey": "11999999999",
  "description": "Comissão Afiliado - Programa Mulher",
  "correlationID": "commission-AFF123-2025-01"
}
```

---

## 💰 Valores e Comissões dos Programas

| Programa | Valor Mensal | Comissão 25% | Comissão 40% |
|----------|-------------|--------------|--------------|
| Programa Mulher | R$ 49,90 | R$ 12,48 | R$ 19,96 |
| Programa Sênior | R$ 59,90 | R$ 14,98 | R$ 23,96 |
| Programa Farma | R$ 19,90 | R$ 4,98 | R$ 7,96 |
| Programa Acolher | R$ 24,90 | R$ 6,23 | R$ 9,96 |
| Programa Orienta | R$ 19,90 | R$ 4,98 | R$ 7,96 |
| Programa Viva Leve | R$ 24,90 | R$ 6,23 | R$ 9,96 |

**Valores em centavos para API:**
- R$ 49,90 = `4990`
- R$ 59,90 = `5990`
- R$ 19,90 = `1990`
- R$ 24,90 = `2490`

---

## 🔐 Segurança e Validação

### 1. Validar Webhooks
```javascript
function validateWooviWebhook(req) {
  const authHeader = req.headers.authorization;
  const expectedAuth = process.env.WOOVI_WEBHOOK_SECRET;
  
  if (authHeader !== expectedAuth) {
    throw new Error('Invalid webhook authorization');
  }
  
  return true;
}
```

### 2. Validar PIX Key do Afiliado
```javascript
function validatePixKey(pixKey) {
  // CPF: 11 dígitos
  if (/^\d{11}$/.test(pixKey)) return true;
  
  // CNPJ: 14 dígitos
  if (/^\d{14}$/.test(pixKey)) return true;
  
  // Email
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(pixKey)) return true;
  
  // Telefone: +5511999999999
  if (/^\+55\d{10,11}$/.test(pixKey)) return true;
  
  // Chave aleatória: UUID
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pixKey)) return true;
  
  return false;
}
```

### 3. Prevenir Duplicação de Comissões
```javascript
async function preventDuplicateCommission(chargeId, affiliateId) {
  const existing = await db.commissions.findOne({
    chargeId: chargeId,
    affiliateId: affiliateId
  });
  
  if (existing) {
    throw new Error('Commission already paid for this charge');
  }
}
```

---

## 📊 Banco de Dados - Tabela de Comissões

```sql
CREATE TABLE commissions (
  id VARCHAR(36) PRIMARY KEY,
  affiliate_id VARCHAR(50) NOT NULL,
  charge_id VARCHAR(100) NOT NULL,
  subscription_id VARCHAR(100),
  program_name VARCHAR(50),
  program_value INT NOT NULL,
  commission_percent INT NOT NULL,
  commission_value INT NOT NULL,
  pix_key VARCHAR(100) NOT NULL,
  split_payment_id VARCHAR(100),
  status ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED'),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_commission (charge_id, affiliate_id)
);
```

---

## 🎨 Atualizar handlePixRecorrente() nos Programas

Atualizar nos 6 arquivos de programa:

```javascript
async function handlePixRecorrente(program, value) {
  try {
    // 1. Validar aceite de termos
    const termsAccepted = document.getElementById(`accept-terms-${program}`).checked;
    if (!termsAccepted) {
      alert('❌ Por favor, aceite os termos para continuar');
      return;
    }

    // 2. Mostrar loading
    const btn = document.getElementById(`btn-pix-${program}`);
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Processando...';

    // 3. Coletar dados do cliente
    const customerData = {
      name: document.getElementById('customer-name')?.value,
      email: document.getElementById('customer-email')?.value,
      phone: document.getElementById('customer-phone')?.value,
      taxID: document.getElementById('customer-cpf')?.value
    };

    // 4. Buscar affiliate_id do cookie
    const affiliateId = getCookie('kainow_ref') || '';

    // 5. Criar subscription via backend
    const response = await fetch('/api/subscriptions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        program: program,
        value: Math.round(value * 100), // Converter para centavos
        customer: customerData,
        affiliateId: affiliateId,
        commissionPercent: affiliateId ? 25 : 0
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao criar assinatura');
    }

    // 6. Mostrar QR Code PIX Recorrente
    showPixQrCode({
      qrCodeImage: data.subscription.pixRecurring.qrCodeImage,
      emv: data.subscription.pixRecurring.emv,
      value: value,
      program: program
    });

  } catch (error) {
    console.error('Erro ao processar PIX Recorrente:', error);
    alert(`❌ Erro ao processar assinatura: ${error.message}`);
    
    // Restaurar botão
    const btn = document.getElementById(`btn-pix-${program}`);
    btn.disabled = false;
    btn.innerHTML = '<i class="fab fa-pix mr-3"></i>Assinar com PIX Recorrente';
  }
}

function showPixQrCode({ qrCodeImage, emv, value, program }) {
  // Criar modal com QR Code
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold text-center mb-4">
        🎉 Assinatura Criada!
      </h2>
      
      <div class="bg-gray-100 rounded-lg p-4 mb-4">
        <img src="${qrCodeImage}" alt="QR Code PIX" class="w-full">
      </div>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p class="text-sm text-gray-700 mb-2">
          <strong>💳 Valor mensal:</strong> R$ ${value.toFixed(2)}
        </p>
        <p class="text-sm text-gray-700 mb-2">
          <strong>📅 Cobrança:</strong> Todo dia 25
        </p>
        <p class="text-sm text-gray-700">
          <strong>♻️ Renovação:</strong> Automática
        </p>
      </div>
      
      <div class="space-y-3">
        <button 
          onclick="copyPixCode('${emv}')"
          class="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          📋 Copiar Código PIX
        </button>
        
        <button 
          onclick="closePixModal()"
          class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
        >
          Fechar
        </button>
      </div>
      
      <p class="text-xs text-gray-500 text-center mt-4">
        Após autorizar o PIX Recorrente no seu banco,<br>
        você será cobrado automaticamente todo mês
      </p>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function copyPixCode(emv) {
  navigator.clipboard.writeText(emv);
  alert('✅ Código PIX copiado!');
}

function closePixModal() {
  document.querySelector('.fixed.inset-0').remove();
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}
```

---

## 📝 Backend API Endpoint

**Arquivo:** `backend/routes/subscriptions.js`

```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');

const WOOVI_API_KEY = process.env.WOOVI_API_KEY;
const WOOVI_API_URL = 'https://api.woovi.com/api/v1';

// Criar assinatura
router.post('/create', async (req, res) => {
  try {
    const { program, value, customer, affiliateId, commissionPercent } = req.body;

    // Validar dados
    if (!program || !value || !customer) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Criar subscription na Woovi
    const subscriptionData = {
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        taxID: customer.taxID
      },
      value: value, // Já em centavos
      name: `Programa ${program.charAt(0).toUpperCase() + program.slice(1)} - Assinatura Mensal`,
      comment: `Assinatura Programa ${program}`,
      dayGenerateCharge: 25,
      frequency: 'MONTHLY',
      type: 'PIX_RECURRING',
      dayDue: 7,
      correlationID: `${program}-${affiliateId || 'direct'}-${Date.now()}`,
      additionalInfo: [
        { key: 'program', value: program },
        { key: 'affiliate_id', value: affiliateId || '' },
        { key: 'commission_percent', value: commissionPercent.toString() }
      ],
      pixRecurringOptions: {
        retryPolicy: 'THREE_RETRIES_7_DAYS',
        journey: 'PAYMENT_ON_APPROVAL',
        minimumValue: value
      }
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

    // Salvar subscription no banco de dados
    await saveSubscription({
      wooviId: response.data.subscription.globalID,
      correlationID: subscriptionData.correlationID,
      program: program,
      value: value,
      customer: customer,
      affiliateId: affiliateId,
      commissionPercent: commissionPercent,
      status: 'ACTIVE',
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      subscription: response.data.subscription
    });

  } catch (error) {
    console.error('Erro ao criar subscription:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Erro ao criar assinatura',
      details: error.response?.data 
    });
  }
});

module.exports = router;
```

---

## ✅ Checklist de Implementação

### Fase 1: Configuração Woovi
- [ ] Criar conta na Woovi (https://openpix.com.br)
- [ ] Obter API Key (Production)
- [ ] Configurar webhooks no painel Woovi
- [ ] Testar credenciais com Postman/Insomnia

### Fase 2: Backend
- [ ] Criar endpoint `/api/subscriptions/create`
- [ ] Criar endpoint `/webhooks/woovi/transaction-received`
- [ ] Implementar função de transferência PIX
- [ ] Criar tabela `subscriptions` no banco
- [ ] Criar tabela `commissions` no banco
- [ ] Implementar validação de PIX Key
- [ ] Implementar prevenção de duplicação

### Fase 3: Frontend (6 programas)
- [ ] Atualizar `handlePixRecorrente()` em programa-mulher.html
- [ ] Atualizar `handlePixRecorrente()` em programa-senior.html
- [ ] Atualizar `handlePixRecorrente()` em programa-farma.html
- [ ] Atualizar `handlePixRecorrente()` em programa-acolher.html
- [ ] Atualizar `handlePixRecorrente()` em programa-orienta.html
- [ ] Atualizar `handlePixRecorrente()` em programa-vivaleve.html
- [ ] Criar modal de exibição de QR Code PIX
- [ ] Implementar função de copiar código PIX

### Fase 4: Dashboard Afiliado
- [ ] Adicionar campo PIX Key no cadastro de afiliado
- [ ] Validar formato de PIX Key no frontend
- [ ] Mostrar comissões recebidas no dashboard
- [ ] Mostrar histórico de comissões mensais

### Fase 5: Testes
- [ ] Testar criação de subscription
- [ ] Testar webhook de pagamento recebido
- [ ] Testar cálculo de comissão
- [ ] Testar transferência PIX para afiliado
- [ ] Testar assinatura sem afiliado
- [ ] Testar cancelamento de assinatura

### Fase 6: Monitoramento
- [ ] Implementar logs de webhooks
- [ ] Implementar logs de splits
- [ ] Criar dashboard de comissões pagas
- [ ] Configurar alertas de falhas

---

## 🚨 Limitações e Soluções Alternativas

### ❌ Problema: Splits não funcionam em subscriptions
**Solução:** Processar split via webhook após pagamento confirmado

### ⚠️ Problema: Woovi cobra taxa nas transferências PIX
**Solução:** Incluir taxa no cálculo de comissão ou absorver como custo operacional

### 💡 Problema: Cliente pode cancelar PIX automático pelo banco
**Solução:** Implementar webhook `OPENPIX:CHARGE_EXPIRED` para notificar cancelamento

---

## 📊 Estimativa de Custos Woovi

**Taxas Woovi (aproximadas):**
- PIX Recorrente: 0,99% por transação
- Transferência PIX: R$ 2,00 por transação

**Exemplo: Programa Sênior (R$ 59,90)**
- Valor recebido: R$ 59,90
- Taxa Woovi (0,99%): R$ 0,59
- Líquido: R$ 59,31
- Comissão afiliado (25%): R$ 14,83
- Taxa transferência PIX: R$ 2,00
- **Lucro líquido:** R$ 42,48 (70,9%)

---

## 🎯 Próximos Passos

1. **Revisar esta documentação** com equipe técnica
2. **Criar conta Woovi** e obter credenciais
3. **Implementar backend** (subscriptions + webhooks)
4. **Testar em ambiente de desenvolvimento**
5. **Atualizar frontend** dos 6 programas
6. **Testar fluxo completo** com pagamento real
7. **Monitorar primeiros pagamentos** e splits
8. **Ajustar conforme necessário**

---

## 📚 Documentação Oficial

- Woovi API: https://developers.woovi.com
- OpenPIX Docs: https://openpix.com.br/docs
- PIX Recorrente: https://openpix.com.br/pix-recorrente

---

**Data:** 2025-01-10  
**Versão:** 1.0  
**Status:** ✅ Documentação Completa - Pronta para Implementação
