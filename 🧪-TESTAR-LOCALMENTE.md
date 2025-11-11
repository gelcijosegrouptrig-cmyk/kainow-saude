# 🧪 TESTAR LOCALMENTE ANTES DO DEPLOY

**Tempo:** 15-20 minutos  
**Objetivo:** Garantir que tudo funciona antes de fazer deploy

---

## 📋 PRÉ-REQUISITOS

- ✅ Node.js instalado (v16 ou superior)
- ✅ Firebase configurado
- ✅ Credenciais Woovi

---

## 🚀 PASSO A PASSO

### 1. Instalar Dependências (2 min)

```bash
cd backend
npm install
```

**Dependências instaladas:**
- express
- cors
- dotenv
- firebase-admin

### 2. Configurar Variáveis de Ambiente (1 min)

O arquivo `backend/.env` já está criado com:
```env
WOOVI_APP_ID=Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9
WOOVI_API_URL=https://api.woovi.com/api/v1
FIREBASE_PROJECT_ID=kainowmedic-fa477
PORT=3000
NODE_ENV=development
```

**✅ Pronto! Não precisa mudar nada.**

### 3. Iniciar Servidor (1 min)

```bash
cd backend
npm start
```

**Saída esperada:**
```
🚀 Kainow Saúde API
📍 Server running on port 3000
🌍 Environment: development
🔥 Firebase: Connected
💳 Woovi: Configured

✅ Ready to receive webhooks!
```

### 4. Testar Health Check (30 seg)

Abra em outro terminal ou no navegador:

```bash
curl http://localhost:3000/
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "Kainow Saúde API",
  "version": "1.0.0",
  "timestamp": "2025-11-11T05:50:00.000Z"
}
```

### 5. Testar Status (30 seg)

```bash
curl http://localhost:3000/status
```

**Resposta esperada:**
```json
{
  "server": "running",
  "firebase": "connected",
  "woovi": "configured",
  "timestamp": "2025-11-11T05:50:00.000Z"
}
```

### 6. Testar Webhook (2 min)

Simular chamada da Woovi:

```bash
curl -X POST http://localhost:3000/webhook/woovi \
  -H "Content-Type: application/json" \
  -d '{
    "event": "OPENPIX:CHARGE_COMPLETED",
    "charge": {
      "transactionID": "test_transaction_123",
      "correlationID": "test_correlation_123",
      "status": "COMPLETED",
      "value": 4990,
      "paidAt": "2025-11-11T05:50:00.000Z"
    }
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "received": true
}
```

**Logs no servidor:**
```
🔔 WEBHOOK RECEBIDO DA WOOVI
📊 Evento: OPENPIX:CHARGE_COMPLETED
💰 Charge ID: test_transaction_123
💵 Valor: R$ 49,90
📍 Status: COMPLETED
❌ Cliente não encontrado para transactionID: test_transaction_123
(Normal - é um teste sem cliente real)
```

### 7. Testar Frontend com Backend Local (5 min)

**Opção A: Usar servidor HTTP simples**

```bash
# Na raiz do projeto
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

**Opção B: Usar Live Server (VS Code)**

1. Instalar extensão "Live Server"
2. Clicar direito em `index.html` → "Open with Live Server"

**Opção C: Apenas abrir no navegador**

Abra `index.html` diretamente no navegador.

### 8. Testar Fluxo Completo (5-10 min)

1. **Acessar programa:**
   ```
   http://localhost:8000/programa-mulher.html?ref=teste123
   ```

2. **Ver banner:**
   - Deve mostrar "Indicado por: teste123"

3. **Clicar "Assinar com PIX":**
   - Redireciona para cadastro

4. **Preencher cadastro:**
   - Nome, Email, CPF, Telefone, Senha
   - Clicar "Continuar"

5. **Ver página de pagamento:**
   - Sistema chama API Woovi
   - QR Code deve ser gerado
   - Código PIX deve aparecer

**⚠️ NOTA:** O QR Code será real, mas estará em ambiente de **teste** da Woovi. Você pode pagar com PIX de teste ou aguardar timeout.

---

## 🐛 TROUBLESHOOTING

### Problema: Erro ao iniciar servidor

**Erro:** `Cannot find module 'express'`

**Solução:**
```bash
cd backend
npm install
```

### Problema: Firebase não conecta

**Erro:** `Firebase Admin not initialized`

**Solução:**
Verificar se `FIREBASE_PROJECT_ID` está correto no `.env`

### Problema: QR Code não gera

**Erro:** `401 Unauthorized`

**Solução:**
Verificar se `WOOVI_APP_ID` está correto no `.env`

### Problema: CORS error no frontend

**Erro:** `Access-Control-Allow-Origin`

**Solução:**
Backend já tem CORS habilitado. Se persistir, verificar se servidor está rodando.

---

## ✅ CHECKLIST DE TESTES

Antes de fazer deploy:

- [ ] Backend inicia sem erros
- [ ] Health check funciona (/)
- [ ] Status mostra tudo "configured" (/status)
- [ ] Webhook recebe POST (/webhook/woovi)
- [ ] Frontend carrega corretamente
- [ ] Formulário de cadastro funciona
- [ ] Redirecionamento para pagamento funciona
- [ ] QR Code é gerado (API Woovi)
- [ ] Código PIX pode ser copiado
- [ ] Logs do backend são claros

---

## 🎯 PRÓXIMO PASSO

Se tudo funciona localmente:

**→ Fazer deploy!**

Siga o guia: `🚀-DEPLOY-BACKEND-RAPIDO.md`

---

## 📝 NOTAS

### Ambiente de Teste vs Produção

**Teste (Local):**
- ✅ Usa credenciais reais da Woovi
- ✅ Gera QR Codes reais
- ⚠️ Pagamentos são de teste
- ⚠️ Split não acontece de verdade

**Produção (Após deploy):**
- ✅ Usa mesmas credenciais
- ✅ Pagamentos são reais
- ✅ Split acontece de verdade
- ✅ Dinheiro cai nas contas

### Woovi - Modo Teste

Para testar pagamentos sem dinheiro real:

1. Acesse painel Woovi
2. Veja se está em modo "Teste" ou "Produção"
3. Em "Teste": pagamentos são simulados
4. Em "Produção": pagamentos são reais

**⚠️ CUIDADO:** Certifique-se do modo antes de divulgar!

---

## 🎉 TUDO CERTO?

Se todos os testes passaram:

✅ Backend funcionando  
✅ API Woovi integrada  
✅ Frontend carregando  
✅ Fluxo completo testado  

**→ PRONTO PARA DEPLOY!** 🚀

---

**Última atualização:** 11/11/2025 02:55  
**Próximo passo:** Deploy em produção

