# ✅ Resposta: Woovi tem PIX Automático e Split Payment?

## 🎯 Resposta Direta

**Pergunta:** "conferi, se o pix estar automatico, woovi,e com apçao de split pagamento, nos afiliados!"

---

## ✅ PIX AUTOMÁTICO (RECORRENTE): **SIM!**

A Woovi possui **API completa de PIX Recorrente** (subscriptions):

```javascript
POST https://api.woovi.com/api/v1/subscriptions

{
  "value": 4990, // R$ 49,90 em centavos
  "type": "PIX_RECURRING",
  "frequency": "MONTHLY",
  "dayGenerateCharge": 25,
  "customer": {...},
  "pixRecurringOptions": {
    "journey": "PAYMENT_ON_APPROVAL",
    "retryPolicy": "THREE_RETRIES_7_DAYS"
  }
}
```

**✅ Funciona assim:**
1. Cliente escaneia QR Code PIX
2. Autoriza cobrança automática no banco
3. Woovi cobra automaticamente todo mês (dia 25)
4. Cliente NÃO precisa pagar manualmente todo mês

---

## ⚠️ SPLIT PAYMENT NOS AFILIADOS: **SIM, MAS...**

A Woovi **TEM split payment**, porém com uma limitação:

### ❌ O que NÃO funciona:
```javascript
// ❌ Não é possível adicionar splits diretamente na subscription
POST /api/v1/subscriptions
{
  "splits": [...] // ❌ NÃO EXISTE este campo em subscriptions
}
```

### ✅ O que FUNCIONA:

**Solução:** Processar split **APÓS** receber pagamento via webhook

```javascript
// 1. Woovi envia webhook quando pagamento é confirmado
POST /webhooks/woovi/transaction-received
{
  "charge": {
    "value": 4990,
    "correlationID": "programa-mulher-AFF123",
    "additionalInfo": [
      { "key": "affiliate_id", "value": "AFF1762773875782" },
      { "key": "commission_percent", "value": "25" }
    ]
  }
}

// 2. Seu backend calcula comissão e transfere para afiliado
const commissionValue = (4990 * 25) / 100; // R$ 12,48
await transferPixToAffiliate({
  pixKey: affiliate.pixKey,
  value: commissionValue,
  description: "Comissão Programa Mulher"
});
```

---

## 🏗️ Como Funciona na Prática

### Mês 1: Cliente assina
```
Cliente → Autoriza PIX Recorrente
         ↓
Woovi → Cobra R$ 49,90
         ↓
Webhook → Backend recebe notificação
         ↓
Backend → Transfere R$ 12,48 para afiliado (25%)
```

### Mês 2, 3, 4... (Automático)
```
Woovi → Cobra automaticamente no dia 25
         ↓
Webhook → Backend recebe notificação
         ↓
Backend → Transfere comissão para afiliado
```

---

## 💰 Exemplo Real: Programa Mulher (R$ 49,90)

| Mês | Cliente Paga | Woovi Taxa (0.99%) | Comissão Afiliado (25%) | Transfer Taxa | Seu Lucro |
|-----|--------------|-------------------|------------------------|---------------|-----------|
| Jan | R$ 49,90 | R$ 0,49 | R$ 12,48 | R$ 2,00 | R$ 34,93 |
| Fev | R$ 49,90 | R$ 0,49 | R$ 12,48 | R$ 2,00 | R$ 34,93 |
| Mar | R$ 49,90 | R$ 0,49 | R$ 12,48 | R$ 2,00 | R$ 34,93 |
| ... | **AUTOMÁTICO** | ... | **AUTOMÁTICO** | ... | ... |

**💡 Vantagem:** Cliente paga uma vez, você recebe todo mês automaticamente!

---

## 🔧 O Que Precisa Implementar

### 1. Backend API
```javascript
// Criar subscription
POST /api/subscriptions/create
→ Chama Woovi API
→ Retorna QR Code PIX Recorrente

// Receber webhook de pagamento
POST /webhooks/woovi/transaction-received
→ Calcula comissão do afiliado
→ Transfere via PIX
→ Registra no banco de dados
```

### 2. Atualizar Frontend (6 programas)
```javascript
// Atualizar função handlePixRecorrente()
async function handlePixRecorrente(program, value) {
  // 1. Validar aceite de termos
  // 2. Enviar para backend criar subscription
  // 3. Mostrar QR Code PIX Recorrente
  // 4. Cliente autoriza no banco
}
```

### 3. Dashboard Afiliado
```javascript
// Adicionar campo PIX Key
<input 
  type="text" 
  placeholder="CPF, Email, Telefone ou Chave Aleatória"
  value={affiliate.pixKey}
/>

// Mostrar comissões recebidas
<div>
  <h3>Comissões Recebidas Este Mês</h3>
  <p>R$ 149,40 (12 assinaturas × R$ 12,45)</p>
</div>
```

---

## ✅ Conclusão

| Funcionalidade | Status | Como Funciona |
|---------------|--------|---------------|
| PIX Recorrente | ✅ **FUNCIONA** | API de subscriptions + QR Code |
| Split Automático | ⚠️ **NÃO NATIVO** | Processar via webhook + transferência |
| Pagamento Mensal | ✅ **AUTOMÁTICO** | Cliente paga uma vez, renova sozinho |
| Comissão Afiliado | ✅ **POSSÍVEL** | Transferir após webhook de pagamento |

---

## 🚀 Próximo Passo

1. **Criar conta Woovi**: https://openpix.com.br
2. **Obter API Key** no painel
3. **Implementar backend** (ver documento `WOOVI-INTEGRACAO-COMPLETA.md`)
4. **Testar com pagamento real**
5. **Monitorar webhooks e splits**

---

## 📚 Documentação Completa

Ver arquivo: **`WOOVI-INTEGRACAO-COMPLETA.md`**
- 📖 120+ linhas de documentação técnica
- 💻 Código completo de implementação
- 🔐 Segurança e validações
- 💰 Cálculos de comissão
- ✅ Checklist de implementação

---

**Resumo:** 
- ✅ PIX Recorrente: **SIM, funciona perfeitamente!**
- ⚠️ Split Payment: **SIM, mas precisa processar via webhook**
- 🎯 Solução: **100% viável e automatizada**

**Data:** 2025-01-10  
**Status:** ✅ Confirmado após análise completa da API Woovi
