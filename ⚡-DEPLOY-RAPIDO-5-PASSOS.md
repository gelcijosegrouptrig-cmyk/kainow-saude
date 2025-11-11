# ⚡ Deploy Rápido - 5 Passos Essenciais

Se você quer ir direto ao ponto, siga apenas estes 5 passos:

---

## 1️⃣ GitHub (5 min)

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Deploy inicial"

# Criar repo no GitHub e conectar
git remote add origin https://github.com/SEU-USUARIO/kainow-saude.git
git branch -M main
git push -u origin main
```

✅ **Resultado:** Código no GitHub

---

## 2️⃣ Railway - Criar Projeto (2 min)

1. Acesse https://railway.app
2. Login with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: `kainow-saude`

✅ **Resultado:** Projeto criado no Railway

---

## 3️⃣ Railway - Configurar (5 min)

**A) Root Directory:**
- Settings → Root Directory → `backend`

**B) Variáveis:**
- Variables → Add:
```env
WOOVI_APP_ID=Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9
WOOVI_API_URL=https://api.woovi.com/api/v1
FIREBASE_PROJECT_ID=kainowmedic-fa477
NODE_ENV=production
```

**C) Domain:**
- Settings → Networking → Generate Domain
- **COPIE A URL!**

✅ **Resultado:** Backend configurado e online

---

## 4️⃣ Woovi - Webhook (3 min)

1. Acesse https://app.woovi.com
2. API/Webhooks → Adicionar
3. URL: `https://SUA-URL.up.railway.app/webhook/woovi`
4. Evento: `OPENPIX:CHARGE_COMPLETED`
5. Salvar

✅ **Resultado:** Webhook configurado

---

## 5️⃣ Testar (5 min)

```bash
# Teste 1: Health check
curl https://SUA-URL.up.railway.app/
# Deve retornar: {"status":"ok","message":"Kainow Saúde API"}

# Teste 2: Fazer cadastro no site e gerar QR Code
# Teste 3: Fazer pagamento PIX
# Teste 4: Verificar ativação automática
```

✅ **Resultado:** Sistema funcionando 100%! 🎉

---

## 🆘 Deu Erro?

Consulte o guia completo: `🚂-RAILWAY-DEPLOY-COMPLETO.md`

---

**⏱️ Tempo total: 20 minutos**
