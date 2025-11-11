# 📋 Resumo: Deploy GitHub + Railway

## 🎯 Objetivo

Fazer deploy do backend Node.js no Railway para processar webhooks Woovi e ativar clientes automaticamente após pagamento PIX.

---

## ✅ O Que Está Pronto

### Arquivos do Backend
- ✅ `backend/server.js` - Servidor Express
- ✅ `backend/webhook-woovi.js` - Webhook handler
- ✅ `backend/package.json` - Dependencies
- ✅ `backend/.env` - Credenciais Woovi
- ✅ `backend/.gitignore` - Segurança
- ✅ `backend/railway.json` - Config Railway
- ✅ `backend/README.md` - Documentação

### Guias Criados
- ✅ `🎯-COMECE-AQUI-DEPLOY.md` - Ponto de partida
- ✅ `⚡-DEPLOY-RAPIDO-5-PASSOS.md` - Versão rápida (20min)
- ✅ `🚂-RAILWAY-DEPLOY-COMPLETO.md` - Versão detalhada (45min)
- ✅ `✅-CHECKLIST-DEPLOY.md` - Acompanhamento
- ✅ `📚-INDICE-GUIAS-DEPLOY.md` - Navegação
- ✅ `🎉-TUDO-PRONTO-PARA-DEPLOY.md` - Resumo final

---

## 🚀 Fluxo de Deploy (Simplificado)

```
1. GitHub
   git init → git add . → git commit → git push
   ↓
2. Railway
   Login GitHub → New Project → Deploy from repo
   ↓
3. Configurar
   Root: backend/ → Variables: 4 variáveis → Generate Domain
   ↓
4. Woovi
   Webhooks → Add URL → Event: CHARGE_COMPLETED
   ↓
5. Testar
   curl / → Fazer pagamento → Verificar logs
```

---

## 📝 Comandos Git (Resumo)

```bash
# Na pasta do projeto Kainow
git init
git add .
git commit -m "Deploy backend - Woovi PIX"
git remote add origin https://github.com/SEU-USUARIO/kainow-saude.git
git branch -M main
git push -u origin main
```

---

## 🔧 Variáveis Railway

```env
WOOVI_APP_ID=Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9
WOOVI_API_URL=https://api.woovi.com/api/v1
FIREBASE_PROJECT_ID=kainowmedic-fa477
NODE_ENV=production
```

---

## 🔗 Webhook Woovi

```
URL: https://[seu-projeto].up.railway.app/webhook/woovi
Evento: OPENPIX:CHARGE_COMPLETED
Método: POST
Status: Ativo
```

---

## 🧪 Testes Básicos

```bash
# 1. Health check
curl https://[sua-url].up.railway.app/
# Resposta: {"status":"ok","message":"Kainow Saúde API"}

# 2. Criar afiliado teste no painel

# 3. Fazer cadastro via link afiliado

# 4. Gerar QR Code PIX

# 5. Fazer pagamento

# 6. Verificar logs Railway (deve aparecer webhook)

# 7. Verificar Firestore (cliente deve estar "ativo")
```

---

## ⏱️ Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| Ler documentação | 5-10 min |
| Configurar Git/GitHub | 10-15 min |
| Deploy Railway | 5-10 min |
| Configurar variáveis | 5 min |
| Configurar webhook Woovi | 5 min |
| Testes | 10-15 min |
| **TOTAL** | **40-60 min** |

---

## 💰 Custos

- **GitHub:** Gratuito (repositório privado)
- **Railway:** $5 crédito inicial ou 500h/mês grátis
- **Woovi:** Conforme plano contratado
- **Firebase:** Spark plan (grátis até 50k leituras/dia)

**Custo total inicial:** $0 (usando créditos gratuitos)

---

## 🆘 Se Algo Der Errado

1. **Build failed no Railway**
   - Verificar Root Directory: `backend`
   - Ver logs de erro
   - Consultar: `🚂-RAILWAY-DEPLOY-COMPLETO.md`

2. **Webhook não funciona**
   - Verificar URL está correta
   - Verificar evento selecionado
   - Ver logs do Railway
   - Testar manualmente com curl

3. **Firebase error**
   - Verificar `FIREBASE_PROJECT_ID`
   - Verificar permissões Firestore
   - Ver logs de autenticação

---

## 📚 Documentação Completa

**Iniciantes:** Leia [🚂-RAILWAY-DEPLOY-COMPLETO.md](🚂-RAILWAY-DEPLOY-COMPLETO.md)

**Experientes:** Leia [⚡-DEPLOY-RAPIDO-5-PASSOS.md](⚡-DEPLOY-RAPIDO-5-PASSOS.md)

**Organizado:** Use [✅-CHECKLIST-DEPLOY.md](✅-CHECKLIST-DEPLOY.md)

**Perdido:** Comece por [🎯-COMECE-AQUI-DEPLOY.md](🎯-COMECE-AQUI-DEPLOY.md)

---

## ✅ Checklist Rápido

Antes de começar:
- [ ] Conta GitHub criada
- [ ] Conta Railway criada
- [ ] Git instalado
- [ ] Credenciais Woovi em mãos

Deploy:
- [ ] Código no GitHub
- [ ] Projeto criado no Railway
- [ ] Root Directory configurado
- [ ] Variáveis adicionadas
- [ ] Domain gerado
- [ ] Health check OK

Woovi:
- [ ] Webhook criado
- [ ] URL configurada
- [ ] Evento selecionado
- [ ] Webhook ativo

Testes:
- [ ] Afiliado criado
- [ ] Cadastro funcionando
- [ ] QR Code gerado
- [ ] Pagamento feito
- [ ] Webhook recebido
- [ ] Cliente ativado
- [ ] Comissão registrada

---

## 🎉 Resultado Final

Depois do deploy completo, você terá:

✅ Backend online 24/7  
✅ Webhook automático funcionando  
✅ Clientes ativados automaticamente  
✅ Comissões registradas automaticamente  
✅ Split PIX automático (80/20)  
✅ Sistema 100% funcional em produção  

---

## 🚀 Começar Agora

**Passo 1:** Abra [🎯-COMECE-AQUI-DEPLOY.md](🎯-COMECE-AQUI-DEPLOY.md)

**Passo 2:** Escolha seu guia

**Passo 3:** Siga passo a passo

**Passo 4:** Celebre! 🎉

---

**Criado em:** 10/11/2024  
**Para:** Deploy Backend Kainow Saúde  
**Status:** ✅ Pronto para uso
