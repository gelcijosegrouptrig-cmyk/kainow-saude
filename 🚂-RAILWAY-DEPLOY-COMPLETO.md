# 🚂 Deploy Completo no Railway - Guia Passo a Passo

## 📋 Pré-requisitos

✅ **O que você precisa ter:**
- Conta no GitHub (gratuita)
- Conta no Railway (gratuita - 500h/mês ou $5 crédito inicial)
- Projeto Kainow já funcionando localmente
- Credenciais do Woovi (já temos!)

⏱️ **Tempo estimado:** 30-45 minutos na primeira vez

---

## 🎯 PARTE 1: Preparar o GitHub (15 minutos)

### **Passo 1.1: Criar Repositório no GitHub**

1. Acesse https://github.com
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   ```
   Nome: kainow-saude
   Descrição: Sistema de Gestão de Saúde com PIX
   ✅ Private (recomendado para proteger credenciais)
   ❌ NÃO marcar "Add a README file"
   ```
5. Clique em **"Create repository"**
6. **NÃO FECHE A PÁGINA** - guarde ela aberta!

### **Passo 1.2: Instalar Git (se necessário)**

**No Windows:**
1. Baixe: https://git-scm.com/download/win
2. Instale com configurações padrão
3. Abra o **Git Bash** (instalado junto)

**No Mac:**
1. Abra o Terminal
2. Digite: `git --version`
3. Se não tiver, o Mac oferece para instalar

**No Linux:**
```bash
sudo apt update
sudo apt install git
```

### **Passo 1.3: Configurar Git (primeira vez)**

Abra o terminal na pasta do seu projeto e digite:

```bash
# Configurar nome e email
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"

# Verificar configuração
git config --list
```

### **Passo 1.4: Inicializar Repositório Local**

**No terminal, na pasta raiz do projeto Kainow:**

```bash
# Inicializar git
git init

# Verificar status
git status
```

Você deve ver vários arquivos em vermelho (não rastreados).

### **Passo 1.5: Adicionar Arquivos ao Git**

```bash
# Adicionar TODOS os arquivos
git add .

# Verificar o que foi adicionado
git status
```

Agora os arquivos devem aparecer em verde!

### **Passo 1.6: Fazer o Primeiro Commit**

```bash
# Criar commit inicial
git commit -m "Initial commit - Kainow Saúde com Woovi PIX"

# Verificar commit
git log --oneline
```

### **Passo 1.7: Conectar com GitHub**

Volte para a página do GitHub que você deixou aberta e copie os comandos. Eles serão algo como:

```bash
# Adicionar repositório remoto
git remote add origin https://github.com/SEU-USUARIO/kainow-saude.git

# Renomear branch para main (se necessário)
git branch -M main

# Enviar código para GitHub
git push -u origin main
```

**⚠️ IMPORTANTE:** Você pode precisar autenticar:
- GitHub vai pedir usuário e senha
- **NÃO use sua senha normal!** Use um **Personal Access Token**
- Veja como criar: https://github.com/settings/tokens

### **Passo 1.8: Verificar no GitHub**

1. Atualize a página do GitHub
2. Você deve ver todos os arquivos do projeto
3. ✅ **GitHub configurado com sucesso!**

---

## 🚀 PARTE 2: Deploy no Railway (20 minutos)

### **Passo 2.1: Criar Conta no Railway**

1. Acesse https://railway.app
2. Clique em **"Login"** ou **"Start a New Project"**
3. Escolha **"Login with GitHub"**
4. Autorize o Railway a acessar suas informações do GitHub
5. ✅ Conta criada! Você tem **$5 de crédito** ou **500h grátis/mês**

### **Passo 2.2: Criar Novo Projeto**

1. No dashboard do Railway, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Se pedir, clique em **"Configure GitHub App"**
4. Selecione seu repositório **"kainow-saude"**
5. Clique no repositório para selecioná-lo

### **Passo 2.3: Configurar Root Directory**

⚠️ **IMPORTANTE:** O Railway precisa saber que o backend está na pasta `backend/`

1. Após selecionar o repo, clique em **"Add variables"** (ou pule por enquanto)
2. Volte ao dashboard do projeto
3. Clique no serviço criado (card azul/roxo)
4. Vá em **"Settings"** (aba no topo)
5. Role até **"Root Directory"**
6. Digite: `backend`
7. Clique em **"Update"** ou tecle Enter

### **Passo 2.4: Configurar Variáveis de Ambiente**

1. No mesmo serviço, clique na aba **"Variables"**
2. Clique em **"+ New Variable"** ou **"RAW Editor"**
3. Cole as seguintes variáveis:

```env
WOOVI_APP_ID=Q2xpZW50X0lkXzYwYjU1ZDhjLTY3ZmQtNGUxMi1iYTg3LWMwNTNlMGVhMzE4YjpDbGllbnRfU2VjcmV0X2tXZHR2cVlPNEFMeEU0bEF1TktKNUZZV3hsMW1WWFpMSDdOWXJWZVJQMVE9
WOOVI_API_URL=https://api.woovi.com/api/v1
FIREBASE_PROJECT_ID=kainowmedic-fa477
NODE_ENV=production
```

4. Clique em **"Add"** ou **"Save"**

**⚠️ Não precisa adicionar PORT** - Railway define automaticamente!

### **Passo 2.5: Fazer o Deploy**

1. O Railway vai detectar automaticamente que é um projeto Node.js
2. Ele vai instalar as dependências (`npm install`)
3. Vai executar `npm start` (que roda `node server.js`)
4. Aguarde 2-5 minutos...

**Acompanhe os logs:**
- Clique na aba **"Deployments"**
- Clique no deployment em andamento
- Veja os logs em tempo real

**Sucesso quando ver:**
```
✅ Build successful
✅ Deployment successful
🚀 Server running on port XXXX
```

### **Passo 2.6: Obter a URL Pública**

1. Volte para a aba **"Settings"**
2. Role até **"Networking"** ou **"Domains"**
3. Clique em **"Generate Domain"**
4. Railway vai criar uma URL tipo:
   ```
   https://kainow-saude-production.up.railway.app
   ```
5. **COPIE ESSA URL!** Você vai precisar dela!

### **Passo 2.7: Testar o Backend**

Abra a URL no navegador ou use o terminal:

```bash
# Testar health check
curl https://SUA-URL.up.railway.app/

# Deve retornar:
# {"status":"ok","message":"Kainow Saúde API"}
```

Se retornar isso, **SUCESSO! ✅** Seu backend está online!

---

## 🔗 PARTE 3: Configurar Webhook no Woovi (10 minutos)

### **Passo 3.1: Acessar Dashboard Woovi**

1. Acesse https://app.woovi.com
2. Faça login com suas credenciais
3. Vá no menu lateral → **"Desenvolvedor"** ou **"API"**
4. Procure por **"Webhooks"**

### **Passo 3.2: Adicionar Novo Webhook**

1. Clique em **"Adicionar Webhook"** ou **"+ Novo"**
2. Preencha:
   ```
   Nome: Kainow Backend Production
   URL: https://SUA-URL.up.railway.app/webhook/woovi
   Método: POST
   Evento: OPENPIX:CHARGE_COMPLETED
   Status: Ativo ✅
   ```
3. Clique em **"Salvar"** ou **"Criar"**

### **Passo 3.3: Testar Webhook (Opcional)**

Se o Woovi tiver opção de teste:
1. Clique em **"Testar"** ou **"Send Test"**
2. Verifique os logs no Railway
3. Deve aparecer: `✅ Webhook recebido`

---

## 🧪 PARTE 4: Testar Fluxo Completo (10 minutos)

### **Teste 1: Health Check**

```bash
curl https://SUA-URL.up.railway.app/
# Resposta esperada: {"status":"ok","message":"Kainow Saúde API"}
```

### **Teste 2: Criar Afiliado**

1. Acesse seu site: `painel-afiliado.html`
2. Faça login como admin
3. Crie um afiliado de teste com chave PIX

### **Teste 3: Fazer Cadastro via Link do Afiliado**

1. Copie o link do afiliado
2. Abra em aba anônima
3. Preencha o cadastro
4. Escolha um programa (R$ 29,90)

### **Teste 4: Gerar QR Code PIX Real**

1. Na página de pagamento, clique em **"Gerar QR Code"**
2. Deve aparecer um QR Code REAL do Woovi
3. Copie o código PIX (brCode)

### **Teste 5: Fazer Pagamento de Teste**

**Opção A - Woovi Sandbox (se disponível):**
1. Use ferramenta de teste do Woovi
2. Simule pagamento completo

**Opção B - Pagamento Real Mínimo:**
1. Faça um pagamento de R$ 0,01 para testar
2. Use seu próprio PIX

### **Teste 6: Verificar Webhook Funcionou**

1. Após pagar, aguarde 5-30 segundos
2. Verifique os logs do Railway:
   ```
   ✅ Webhook recebido: OPENPIX:CHARGE_COMPLETED
   ✅ Cliente ativado: [ID]
   ✅ Comissão registrada: R$ X,XX
   ```

3. Verifique no Firestore:
   - Cliente deve estar com `status: "ativo"`
   - Deve ter registro na coleção `comissoes`
   - Deve ter registro na coleção `pagamentos`

### **Teste 7: Verificar Split de Comissão**

1. Acesse dashboard do Woovi
2. Vá em **"Transações"** ou **"Pagamentos"**
3. Encontre o pagamento de teste
4. Deve mostrar:
   ```
   Valor Total: R$ 29,90
   Split 1: R$ 5,98 → [Chave PIX do Afiliado]
   Split 2: R$ 23,92 → [Sua conta principal]
   ```

Se tudo isso funcionou: **🎉 DEPLOY COMPLETO E FUNCIONANDO! 🎉**

---

## 🔧 Solução de Problemas

### **Problema 1: "Build failed" no Railway**

**Causa:** Dependências não instalaram corretamente

**Solução:**
1. Vá em Settings → Root Directory
2. Confirme que está: `backend`
3. Vá em Deployments → Clique no failed
4. Leia o erro nos logs
5. Geralmente: adicionar `package-lock.json` ao git

### **Problema 2: "Application failed to respond"**

**Causa:** Servidor não está iniciando na porta correta

**Solução:**
1. Verifique se `server.js` usa `process.env.PORT`
2. Código correto:
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

### **Problema 3: Webhook não recebe eventos**

**Causa:** URL incorreta ou evento não configurado

**Solução:**
1. Verifique URL no Woovi: `https://SUA-URL.up.railway.app/webhook/woovi`
2. Verifique evento selecionado: `OPENPIX:CHARGE_COMPLETED`
3. Verifique status: Ativo ✅
4. Teste manualmente:
   ```bash
   curl -X POST https://SUA-URL.up.railway.app/webhook/woovi \
     -H "Content-Type: application/json" \
     -d '{"event":"OPENPIX:CHARGE_COMPLETED","charge":{"status":"COMPLETED"}}'
   ```

### **Problema 4: Firebase authentication failed**

**Causa:** Credenciais do Firebase não configuradas

**Solução:**
1. Railway detecta automaticamente credenciais do Firebase via SDK
2. Certifique-se que `FIREBASE_PROJECT_ID` está nas variáveis
3. Se persistir, gere uma Service Account Key:
   - Firebase Console → Project Settings → Service Accounts
   - Generate New Private Key
   - Adicione como variável no Railway: `GOOGLE_APPLICATION_CREDENTIALS_JSON`

### **Problema 5: CORS errors no frontend**

**Causa:** Frontend não consegue fazer requests para backend

**Solução:**
1. Verifique se `cors` está instalado
2. Verifique `server.js`:
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

---

## 📊 Monitoramento

### **Ver Logs em Tempo Real**

1. Railway Dashboard → Seu Serviço
2. Aba **"Deployments"**
3. Clique no deployment ativo
4. Logs aparecem em tempo real

### **Ver Métricas**

1. Aba **"Metrics"**
2. Veja CPU, RAM, Network
3. Garanta que não está estourando o limite grátis

### **Configurar Alertas (Opcional)**

1. Settings → Notifications
2. Adicione email ou Slack
3. Receba alertas de downtime

---

## 🔄 Atualizações Futuras

Quando você fizer mudanças no código:

```bash
# Na pasta do projeto
git add .
git commit -m "Descrição da mudança"
git push origin main
```

O Railway faz **deploy automático** quando detecta mudanças no GitHub! 🎉

---

## 💰 Custos

### **Plano Gratuito Railway:**
- **$5 crédito inicial** (dura ~1 mês)
- **OU 500h/mês grátis** após acabar crédito
- Suficiente para testes e MVP

### **Quando Atualizar para Pago:**
- Quando passar de 500h/mês (~20 dias 24/7)
- Plano: $5/mês por serviço
- Crédito adicional: $0.000231/min ($10 = ~43.000 min)

---

## ✅ Checklist Final

Antes de considerar o deploy completo, verifique:

- ✅ GitHub: Repositório criado e código enviado
- ✅ Railway: Projeto criado e deploy successful
- ✅ Variables: Todas as 4 variáveis configuradas
- ✅ Root Directory: Configurado como `backend`
- ✅ Domain: URL pública gerada
- ✅ Health Check: GET / retorna status OK
- ✅ Woovi: Webhook configurado e ativo
- ✅ Teste: QR Code real gerado
- ✅ Teste: Pagamento processado e webhook recebido
- ✅ Teste: Cliente ativado automaticamente
- ✅ Teste: Comissão registrada no Firestore
- ✅ Teste: Split aparece no dashboard Woovi

---

## 🎉 PARABÉNS!

Se você chegou até aqui e todos os testes passaram, seu sistema está **100% FUNCIONAL EM PRODUÇÃO**! 🚀

**O que funciona agora:**
✅ Cadastro de clientes
✅ Geração de QR Code PIX real
✅ Webhook automático de confirmação
✅ Ativação automática de clientes
✅ Split automático de comissões (80/20)
✅ Painel de afiliados funcionando
✅ Sistema completo end-to-end

**Próximos passos (opcionais):**
1. Configurar domínio personalizado
2. Adicionar SSL customizado
3. Configurar emails transacionais
4. Adicionar analytics
5. Otimizar performance

---

## 🆘 Precisa de Ajuda?

Se algo deu errado em qualquer etapa:
1. Copie o erro exato (print ou texto)
2. Me envie junto com o passo que estava fazendo
3. Vou te ajudar a resolver! 🚀

**Boa sorte com o deploy! 💚**
