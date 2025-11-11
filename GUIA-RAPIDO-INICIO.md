# ⚡ Guia Rápido: Começar Agora com Woovi

## 🎯 Objetivo

Implementar PIX Recorrente + Split Automático em **1 semana**.

---

## 📅 CRONOGRAMA 7 DIAS

### 🗓️ DIA 1 - Segunda-feira: Setup Inicial
**Tempo:** 2-3 horas

```
[09:00] Criar conta Woovi
        └─ https://app.woovi.com/register
        
[09:30] Obter API Key
        └─ Dashboard → Configurações → API
        
[10:00] Criar banco de dados
        └─ Executar SQLs (subscriptions, commissions, payments)
        
[11:00] Configurar .env
        ├─ WOOVI_API_KEY
        ├─ WOOVI_WEBHOOK_SECRET
        └─ DATABASE_URL
        
[12:00] ✅ CHECKPOINT: Credenciais configuradas
```

---

### 🗓️ DIA 2 - Terça-feira: Backend - Subscriptions
**Tempo:** 6-8 horas

```
[09:00] Criar estrutura backend
        ├─ backend/
        ├─ backend/routes/
        └─ backend/routes/subscriptions.js
        
[10:00] Implementar POST /api/subscriptions/create
        └─ Ver: SOLUCAO-AUTOMATICA-WEBHOOKS-SPLITS.md (linha 60)
        
[12:00] Testar com Postman
        └─ Criar subscription teste
        
[14:00] Validar QR Code gerado
        └─ Verificar pixRecurring.emv
        
[15:00] Conectar com banco de dados
        └─ Salvar subscription na tabela
        
[16:00] ✅ CHECKPOINT: Subscription criada com sucesso
```

---

### 🗓️ DIA 3 - Quarta-feira: Backend - Webhooks
**Tempo:** 6-8 horas

```
[09:00] Criar backend/routes/webhooks.js
        └─ Ver: SOLUCAO-AUTOMATICA-WEBHOOKS-SPLITS.md (linha 200)
        
[10:00] Implementar POST /webhooks/transaction-received
        ├─ Validar authorization
        ├─ Extrair additionalInfo
        ├─ Calcular comissão
        └─ Transferir PIX
        
[12:00] Deploy backend (Heroku/AWS/Railway)
        └─ Obter URL pública
        
[14:00] Configurar webhook na Woovi
        └─ POST /api/v1/webhook
        
[15:00] Testar webhook (Postman → Manual)
        └─ Simular payload de pagamento
        
[16:00] ✅ CHECKPOINT: Webhook funcionando
```

---

### 🗓️ DIA 4 - Quinta-feira: Frontend - Programa 1 e 2
**Tempo:** 6-8 horas

```
[09:00] Atualizar programa-mulher.html
        └─ handlePixRecorrente()
        
[10:00] Criar showPixQrCodeModal()
        └─ Modal com QR Code + instruções
        
[11:00] Implementar copyPixCode()
        └─ Copiar código PIX
        
[12:00] Testar em navegador
        └─ Criar subscription real
        
[14:00] Atualizar programa-senior.html
        └─ Mesmo processo
        
[15:00] Testar ambos os programas
        
[16:00] ✅ CHECKPOINT: 2 programas funcionando
```

---

### 🗓️ DIA 5 - Sexta-feira: Frontend - Programas 3, 4, 5, 6
**Tempo:** 6-8 horas

```
[09:00] Atualizar programa-farma.html
        
[10:00] Atualizar programa-acolher.html
        
[11:00] Atualizar programa-orienta.html
        
[12:00] Atualizar programa-vivaleve.html
        
[14:00] Testar todos os 6 programas
        ├─ Criar subscriptions
        ├─ Validar QR Codes
        └─ Verificar cookies (kainow_ref)
        
[16:00] ✅ CHECKPOINT: 6 programas funcionando
```

---

### 🗓️ DIA 6 - Sábado: Dashboard Afiliado + Testes
**Tempo:** 4-6 horas

```
[09:00] Adicionar campo PIX Key
        └─ afiliado/dashboard.html
        
[10:00] Implementar validação PIX Key
        └─ CPF, Email, Telefone, UUID
        
[11:00] Mostrar comissões recebidas
        └─ Query: SELECT * FROM commissions WHERE affiliate_id = ?
        
[12:00] Teste completo E2E:
        ├─ Criar afiliado
        ├─ Gerar link personalizado
        ├─ Acessar programa via link
        ├─ Criar subscription
        ├─ Simular pagamento PIX
        ├─ Verificar webhook
        └─ Confirmar comissão paga
        
[14:00] ✅ CHECKPOINT: Sistema completo testado
```

---

### 🗓️ DIA 7 - Domingo: Documentação + Deploy Produção
**Tempo:** 4-6 horas

```
[09:00] Revisar todos os endpoints
        └─ Postman → Export collection
        
[10:00] Criar README técnico
        ├─ Como rodar backend
        ├─ Variáveis de ambiente
        └─ Comandos úteis
        
[11:00] Deploy produção
        ├─ Backend → Heroku/AWS
        ├─ Frontend → GitHub Pages / Cloudflare
        └─ Banco → AWS RDS / PlanetScale
        
[12:00] Atualizar webhook URL
        └─ Painel Woovi → Webhook → Editar
        
[13:00] Teste final em produção
        └─ Pagamento PIX real (valor mínimo)
        
[14:00] Monitorar logs
        └─ Verificar webhooks recebidos
        
[15:00] ✅ CHECKPOINT: Sistema em produção!
```

---

## 📋 CHECKLIST COMPLETO

### Setup Inicial:
- [ ] Criar conta Woovi
- [ ] Obter API Key
- [ ] Criar banco de dados (3 tabelas)
- [ ] Configurar variáveis de ambiente

### Backend:
- [ ] POST /api/subscriptions/create
- [ ] POST /webhooks/transaction-received
- [ ] Função validatePixKey()
- [ ] Função notifyAffiliate()
- [ ] Deploy backend

### Frontend:
- [ ] handlePixRecorrente() - programa-mulher.html
- [ ] handlePixRecorrente() - programa-senior.html
- [ ] handlePixRecorrente() - programa-farma.html
- [ ] handlePixRecorrente() - programa-acolher.html
- [ ] handlePixRecorrente() - programa-orienta.html
- [ ] handlePixRecorrente() - programa-vivaleve.html
- [ ] showPixQrCodeModal()
- [ ] copyPixCode()

### Dashboard Afiliado:
- [ ] Campo PIX Key
- [ ] Validação PIX Key
- [ ] Mostrar comissões recebidas
- [ ] Histórico de pagamentos

### Testes:
- [ ] Subscription sem afiliado
- [ ] Subscription com afiliado
- [ ] Webhook funcionando
- [ ] Split payment executado
- [ ] Banco de dados atualizado
- [ ] Email notificação enviado

### Produção:
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Atualizar webhook URL
- [ ] Teste E2E em produção
- [ ] Monitorar primeiros pagamentos

---

## 🔧 COMANDOS ÚTEIS

### Criar Banco de Dados:
```bash
# MySQL
mysql -u root -p < backend/database/schema.sql

# PostgreSQL
psql -U postgres -d kainow < backend/database/schema.sql
```

### Rodar Backend Local:
```bash
cd backend
npm install
npm run dev
```

### Testar Endpoint (Postman):
```bash
POST http://localhost:3000/api/subscriptions/create
Content-Type: application/json

{
  "program": "mulher",
  "value": 4990,
  "customer": {
    "name": "Maria Silva",
    "email": "maria@teste.com",
    "phone": "5511999999999",
    "taxID": "12345678900"
  },
  "affiliateId": "AFF123",
  "commissionPercent": 25
}
```

### Configurar Webhook (cURL):
```bash
curl --request POST \
  --url https://api.woovi.com/api/v1/webhook \
  --header 'Authorization: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "webhook": {
      "name": "KaiNow - Pagamento Recebido",
      "event": "OPENPIX:TRANSACTION_RECEIVED",
      "url": "https://seu-backend.com/webhooks/transaction-received",
      "authorization": "YOUR_WEBHOOK_SECRET",
      "isActive": true
    }
  }'
```

---

## 🚨 PROBLEMAS COMUNS

### 1. Webhook não está sendo recebido
**Solução:**
- Verificar URL pública do backend
- Validar authorization header
- Testar manualmente com Postman
- Verificar logs do Woovi

### 2. PIX Key inválida
**Solução:**
- Validar formato (CPF: 11 dígitos, Email, etc)
- Usar função validatePixKey()
- Testar com PIX Key real

### 3. Comissão não foi transferida
**Solução:**
- Verificar saldo na conta Woovi
- Validar API Key com permissões corretas
- Checar logs de erro no backend
- Confirmar PIX Key do afiliado

### 4. QR Code não aparece
**Solução:**
- Verificar response da API Woovi
- Validar subscription.pixRecurring.emv
- Checar URL da imagem (qrCodeImage)
- Testar URL da imagem no navegador

---

## 📊 MÉTRICAS PARA MONITORAR

### Dia 1-3:
- ✅ Subscriptions criadas: > 0
- ✅ QR Codes gerados: > 0
- ✅ Webhooks recebidos: > 0

### Dia 4-7:
- ✅ Pagamentos recebidos: > 0
- ✅ Comissões pagas: > 0
- ✅ Afiliados notificados: > 0
- ✅ Taxa de sucesso: > 95%

### Produção:
- ✅ Uptime backend: > 99%
- ✅ Tempo de resposta: < 2s
- ✅ Webhooks processados: 100%
- ✅ Splits executados: 100%

---

## 💡 DICAS DE PRODUTIVIDADE

### 1. Use Templates
- Copie código de SOLUCAO-AUTOMATICA-WEBHOOKS-SPLITS.md
- Não reinvente a roda

### 2. Teste Incrementalmente
- Não espere tudo estar pronto
- Teste cada função isoladamente

### 3. Use Logs Abundantemente
```javascript
console.log('🔔 Webhook recebido:', webhookData);
console.log('💰 Comissão calculada:', commissionValue);
console.log('✅ PIX transferido:', transferResult);
```

### 4. Versione o Código
```bash
git add .
git commit -m "feat: adicionar webhook transaction-received"
git push origin main
```

### 5. Documente Descobertas
- Crie arquivo NOTAS.md
- Anote URLs, credenciais, dúvidas
- Mantenha Postman collection atualizada

---

## 🎯 OBJETIVO FINAL

```
┌─────────────────────────────────────────────────────────┐
│  🎉 APÓS 7 DIAS, VOCÊ TERÁ:                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Sistema de PIX Recorrente funcionando               │
│  ✅ 6 programas com assinatura automática               │
│  ✅ Comissões pagas automaticamente para afiliados      │
│  ✅ Webhook processando pagamentos em tempo real        │
│  ✅ Dashboard de afiliados atualizado                   │
│  ✅ Sistema 100% operacional em produção                │
│                                                         │
│  ♻️  RECEITA RECORRENTE AUTOMÁTICA ATIVADA!            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📞 SUPORTE

### Dúvidas Técnicas:
1. Consulte SOLUCAO-AUTOMATICA-WEBHOOKS-SPLITS.md
2. Leia WOOVI-INTEGRACAO-COMPLETA.md
3. Veja documentação oficial: https://developers.woovi.com

### Dúvidas de Negócio:
1. Releia RESUMO-EXECUTIVO-FINAL.md
2. Veja RESPOSTA-WOOVI-SPLIT.md
3. Compare números em RESUMO-VISUAL-WOOVI.md

---

## 🚀 COMEÇAR AGORA

**PASSO 1:** Criar conta Woovi
→ https://app.woovi.com/register

**PASSO 2:** Baixar código
→ Copiar de SOLUCAO-AUTOMATICA-WEBHOOKS-SPLITS.md

**PASSO 3:** Configurar .env
→ Adicionar API Key

**PASSO 4:** Rodar backend
→ `npm install && npm run dev`

**PASSO 5:** Testar primeira subscription
→ Postman + QR Code

---

**Data:** 10/11/2025  
**Status:** ✅ Guia Pronto  
**Tempo Estimado:** 7 dias  
**Resultado:** Sistema 100% Operacional
