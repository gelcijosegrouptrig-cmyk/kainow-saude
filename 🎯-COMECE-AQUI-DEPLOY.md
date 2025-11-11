# 🎯 COMECE AQUI - Guia de Deploy

## 📚 Documentação Disponível

Escolha o guia ideal para você:

---

### 1️⃣ **⚡-DEPLOY-RAPIDO-5-PASSOS.md** 
⏱️ **20 minutos** | 🎯 **Objetivo**

**Para quem:**
- Já tem experiência com Git/GitHub
- Quer deploy rápido sem detalhes
- Prefere comandos diretos

**O que tem:**
- 5 passos essenciais
- Comandos prontos para copiar
- Zero explicações extras

---

### 2️⃣ **🚂-RAILWAY-DEPLOY-COMPLETO.md**
⏱️ **45 minutos** | 📖 **Detalhado**

**Para quem:**
- Primeira vez fazendo deploy
- Quer entender cada passo
- Precisa de troubleshooting

**O que tem:**
- Guia passo a passo com prints
- Explicação de cada conceito
- Solução de 5+ problemas comuns
- Dicas de monitoramento e custos

---

### 3️⃣ **✅-CHECKLIST-DEPLOY.md**
⏱️ **Acompanhamento** | ✅ **Checklist**

**Para quem:**
- Quer acompanhar progresso
- Não quer esquecer nenhum passo
- Gosta de marcar itens concluídos

**O que tem:**
- 50+ itens de verificação
- Organizado por etapas
- Campos para anotar URLs
- Status de conclusão

---

## 🚀 Qual Escolher?

### Você é INICIANTE?
👉 Siga: **🚂-RAILWAY-DEPLOY-COMPLETO.md**  
👉 Use: **✅-CHECKLIST-DEPLOY.md** para acompanhar

### Você é EXPERIENTE?
👉 Siga: **⚡-DEPLOY-RAPIDO-5-PASSOS.md**  
👉 Consulte o completo se travar

### Você quer TESTAR ANTES?
👉 Leia: **🧪-TESTAR-LOCALMENTE.md** (se existir)  
👉 Depois: Deploy no Railway

---

## 📋 Pré-requisitos

Antes de começar qualquer guia, tenha:

✅ **Contas criadas:**
- [ ] GitHub (https://github.com)
- [ ] Railway (https://railway.app)
- [ ] Woovi (https://app.woovi.com)

✅ **Instalado no computador:**
- [ ] Git (https://git-scm.com)
- [ ] Node.js v16+ (apenas para testes locais)
- [ ] Editor de código (VSCode recomendado)

✅ **Informações em mãos:**
- [ ] Credenciais Woovi (já temos!)
- [ ] Acesso ao Firebase Console
- [ ] Projeto funcionando localmente

---

## ⚡ Início Rápido (Resumão)

Se você JÁ FEZ deploy antes e só quer relembrar:

```bash
# 1. GitHub
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/USER/REPO.git
git push -u origin main

# 2. Railway
# - New Project → Deploy from GitHub
# - Settings → Root Directory: backend
# - Variables → Add: WOOVI_APP_ID, WOOVI_API_URL, FIREBASE_PROJECT_ID, NODE_ENV
# - Settings → Generate Domain → Copiar URL

# 3. Woovi
# - Webhooks → Add → URL: https://SUA-URL/webhook/woovi
# - Event: OPENPIX:CHARGE_COMPLETED

# 4. Testar
curl https://SUA-URL.up.railway.app/
```

✅ Pronto! Sistema no ar!

---

## 🗺️ Fluxo Completo do Deploy

```
📦 PREPARAÇÃO
   ↓
🐙 GITHUB (código no repositório)
   ↓
🚂 RAILWAY (backend online)
   ↓
🔗 WOOVI (webhook configurado)
   ↓
🧪 TESTES (fluxo end-to-end)
   ↓
🎉 PRODUÇÃO (sistema funcionando!)
```

---

## 💡 Dicas Importantes

### ⚠️ NÃO commite o .env
O arquivo `backend/.env` tem credenciais! Ele já está no `.gitignore`.

### ✅ Use .env.example
Para outros desenvolvedores saberem quais variáveis configurar.

### 🔄 Deploy automático
Toda vez que você der `git push`, Railway faz deploy automático!

### 💰 Custos
Railway é grátis até 500h/mês (suficiente para MVP e testes).

### 📊 Monitoramento
Sempre verifique os logs no Railway Dashboard após deploy.

---

## 🆘 Ajuda e Suporte

### Deu erro no deploy?
1. Leia a seção "Solução de Problemas" no guia completo
2. Verifique os logs no Railway
3. Copie o erro exato e me envie

### Webhook não funciona?
1. Verifique URL está correta
2. Verifique evento: `OPENPIX:CHARGE_COMPLETED`
3. Verifique webhook está ativo
4. Teste manualmente com curl

### Split não aparece?
1. Verifique chave PIX do afiliado está correta
2. Verifique valor da comissão no código
3. Veja no dashboard Woovi se split foi processado

---

## 🎯 Próximo Passo

**Escolha seu guia e comece agora! 🚀**

1. Abra o arquivo escolhido
2. Siga passo a passo
3. Marque itens no checklist
4. Teste tudo ao final

**Boa sorte com o deploy! 💚**

---

## 📞 Links Úteis

- **Railway Docs:** https://docs.railway.app
- **Woovi API:** https://developers.woovi.com
- **Firebase Docs:** https://firebase.google.com/docs
- **Git Basics:** https://git-scm.com/book/pt-br/v2

---

**Última atualização:** Implementação Woovi PIX + Webhook + Split  
**Status do projeto:** ✅ Pronto para produção
