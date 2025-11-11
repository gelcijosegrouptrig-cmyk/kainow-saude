# 🚀 DEPLOY BACKEND - GUIA RÁPIDO

**Tempo estimado:** 30-60 minutos  
**Dificuldade:** Fácil

---

## 📋 PRÉ-REQUISITOS

- [x] Código do backend pronto
- [x] Credenciais Woovi
- [x] Conta Firebase configurada
- [ ] Conta em serviço de hosting

---

## 🎯 OPÇÃO 1: RAILWAY (RECOMENDADO - GRÁTIS)

### Por que Railway?
- ✅ Deploy automático via GitHub
- ✅ $5 grátis por mês (suficiente para começar)
- ✅ HTTPS automático
- ✅ Logs em tempo real
- ✅ Fácil de configurar

### Passo a Passo:

#### 1. Preparar o backend (5 min)

Criar `backend/server.js`:
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const webhookWoovi = require('./webhook-woovi');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/webhook', webhookWoovi);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Kainow API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```

Criar `backend/package.json`:
```json
{
  "name": "kainow-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "firebase-admin": "^12.0.0"
  }
}
```

#### 2. Criar conta Railway (2 min)

1. Acesse: https://railway.app
2. Clique "Start a New Project"
3. Login com GitHub

#### 3. Deploy (3 min)

1. No Railway, clique "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione seu repositório
4. Configure:
   - Root Directory: `backend`
   - Start Command: `npm start`

#### 4. Configurar variáveis de ambiente (5 min)

No Railway, vá em "Variables" e adicione:

```env
WOOVI_APP_ID=Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9
WOOVI_API_URL=https://api.woovi.com/api/v1
FIREBASE_PROJECT_ID=kainowmedic-fa477
PORT=3000
NODE_ENV=production
```

#### 5. Obter URL do deploy (1 min)

Railway vai gerar uma URL tipo:
```
https://kainow-backend-production.up.railway.app
```

**COPIE ESTA URL!** Você vai precisar dela.

---

## 🔗 CONFIGURAR WEBHOOK NA WOOVI (10 min)

### 1. Entrar no Painel Woovi

1. Acesse: https://app.woovi.com
2. Faça login
3. Vá em **Configurações** → **Webhooks**

### 2. Adicionar Webhook

Clique "Novo Webhook" e configure:

**URL do Webhook:**
```
https://kainow-backend-production.up.railway.app/webhook/woovi
```

**Eventos:**
- ✅ `OPENPIX:CHARGE_COMPLETED`

**Método:** POST

**Headers (opcional):**
```
Content-Type: application/json
```

Clique "Salvar"

### 3. Testar Webhook

Woovi tem opção "Testar Webhook". Use ela para verificar se está funcionando.

**Resposta esperada:**
```json
{
    "success": true,
    "received": true
}
```

---

## 🧪 TESTAR TUDO (15 min)

### Teste 1: Health Check

Acesse no navegador:
```
https://kainow-backend-production.up.railway.app/
```

**Esperado:**
```json
{
    "status": "ok",
    "message": "Kainow API"
}
```

### Teste 2: Webhook Manual

Use Postman ou curl:

```bash
curl -X POST https://kainow-backend-production.up.railway.app/webhook/woovi \
  -H "Content-Type: application/json" \
  -d '{
    "event": "OPENPIX:CHARGE_COMPLETED",
    "charge": {
      "transactionID": "test_123",
      "status": "COMPLETED",
      "value": 4990
    }
  }'
```

**Esperado:**
```json
{
    "success": true,
    "received": true
}
```

### Teste 3: Pagamento Real

1. Acesse: `https://kainow.com.br/cadastro-checkout.html?program=mulher&ref=teste`
2. Preencha cadastro
3. Clique continuar
4. Veja QR Code gerado
5. Faça pagamento PIX (pode ser valor teste)
6. Aguarde confirmação
7. Verifique se:
   - ✅ Cliente status mudou para "ativo"
   - ✅ Comissão foi registrada
   - ✅ Dashboard do cliente abriu

---

## 🔍 MONITORAR LOGS

### Railway

No painel Railway:
1. Clique no seu projeto
2. Vá em "Deployments"
3. Clique no deployment ativo
4. Veja "Logs" em tempo real

**O que procurar:**
```
🔔 WEBHOOK RECEBIDO DA WOOVI
✅ PROCESSANDO PAGAMENTO COMPLETO
👤 Cliente encontrado: Maria Santos
✅ Status do cliente atualizado para ATIVO
💰 PROCESSANDO COMISSÃO DO AFILIADO
✅ Comissão registrada com sucesso!
```

---

## 🐛 TROUBLESHOOTING

### Problema: Webhook não é chamado

**Causa:** URL incorreta ou Woovi não configurada

**Solução:**
1. Verificar URL no painel Woovi
2. Testar URL manualmente com curl
3. Ver logs do Railway

### Problema: Erro 500 no webhook

**Causa:** Erro no código ou Firebase não configurado

**Solução:**
1. Ver logs no Railway
2. Verificar se variáveis de ambiente estão corretas
3. Verificar se Firebase está ativo

### Problema: Cliente não ativa após pagamento

**Causa:** Webhook não atualizou Firestore

**Solução:**
1. Ver logs do webhook
2. Verificar se `transactionID` está correto
3. Verificar se Firebase tem permissões

---

## 📊 CHECKLIST FINAL

Antes de considerar pronto:

- [ ] Backend deployed (Railway, Heroku, etc)
- [ ] URL do backend obtida
- [ ] Webhook configurado na Woovi
- [ ] Variáveis de ambiente configuradas
- [ ] Health check funcionando (/)
- [ ] Webhook teste funcionando
- [ ] Pagamento PIX teste completo
- [ ] Cliente ativado automaticamente
- [ ] Comissão registrada
- [ ] Logs sem erros

---

## 🎉 RESULTADO FINAL

**Backend no ar:** ✅  
**Webhook configurado:** ✅  
**Pagamento funcionando:** ✅  
**Split automático:** ✅  

**🚀 SISTEMA 100% OPERACIONAL!**

---

## 💡 PRÓXIMAS MELHORIAS

### Monitoramento:
- [ ] Sentry para erros
- [ ] Uptime monitoring
- [ ] Alertas no Telegram/Slack

### Segurança:
- [ ] Rate limiting
- [ ] Validação de assinatura Woovi
- [ ] CORS configurado
- [ ] Logs estruturados

### Performance:
- [ ] Cache de queries Firestore
- [ ] Queue para processamento (Bull)
- [ ] Retry automático em falhas

---

**Última atualização:** 11/11/2025 02:45  
**Tempo total:** 30-60 minutos  
**Dificuldade:** Fácil

**🎯 Siga este guia e seu sistema estará em produção!**

