# 🔐 CONFIGURAR GITHUB SECRETS PARA DEPLOY AUTOMÁTICO

## 📋 SEUS TOKENS CLOUDFLARE

Você forneceu:
- **Token 1:** `5bd1613844791bb930631a4a98d278d4`
- **Token 2:** `ef4dfafae6fc56ebf84a3b58aa7d8b45`

---

## 🎯 IDENTIFICAR CREDENCIAIS

### 1. Descobrir Account ID

**MÉTODO A: Via Dashboard Cloudflare**

1. Acesse: https://dash.cloudflare.com/
2. Login com: **gelcijosegrouptrig@gmail.com**
3. Clique em qualquer domínio (ex: **hbvidaesaude.me**)
4. No painel direito, você verá:
   ```
   Account ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. **COPIE** este Account ID

**MÉTODO B: Via API (Terminal)**

```bash
# Testar Token 1
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer 5bd1613844791bb930631a4a98d278d4" \
  -H "Content-Type: application/json"

# Testar Token 2
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer ef4dfafae6fc56ebf84a3b58aa7d8b45" \
  -H "Content-Type: application/json"
```

A resposta vai mostrar seu Account ID.

---

## 🔧 CONFIGURAR SECRETS NO GITHUB

### PASSO 1: Acessar Settings do Repositório

1. Abra: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude
2. Clique na aba **"Settings"** (configurações)
3. No menu lateral esquerdo, clique em:
   ```
   Secrets and variables → Actions
   ```

### PASSO 2: Adicionar Secret #1 - API Token

1. Clique em **"New repository secret"**
2. Preencha:
   ```
   Name: CLOUDFLARE_API_TOKEN
   Value: 5bd1613844791bb930631a4a98d278d4
   ```
   *(ou use o Token 2 se você souber qual é o correto)*
3. Clique em **"Add secret"**

### PASSO 3: Adicionar Secret #2 - Account ID

1. Clique em **"New repository secret"** novamente
2. Preencha:
   ```
   Name: CLOUDFLARE_ACCOUNT_ID
   Value: [seu Account ID copiado no passo anterior]
   ```
3. Clique em **"Add secret"**

### PASSO 4: Verificar Secrets

Você deve ver 2 secrets listados:
```
✓ CLOUDFLARE_API_TOKEN
✓ CLOUDFLARE_ACCOUNT_ID
```

---

## ✅ TESTAR GITHUB ACTIONS

### Fazer um Commit de Teste

**Via Interface Web:**

1. Abra: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude/blob/main/README.md
2. Clique no ícone ✏️ (Edit)
3. Faça uma mudança pequena (adicione um espaço em branco)
4. Scroll até o final
5. Commit message: `Teste GitHub Actions`
6. Clique em **"Commit changes"**

**Via Git CLI:**

```bash
# Fazer alteração em qualquer arquivo
echo "teste" >> README.md

# Commit e push
git add .
git commit -m "Teste GitHub Actions"
git push
```

### Monitorar Workflow

1. Vá para: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude/actions
2. Você verá o workflow "Deploy para Cloudflare Pages" executando
3. Clique nele para ver logs em tempo real
4. Aguarde completar (1-2 minutos)

Se completar com ✅ (sucesso):
- GitHub Actions está funcionando!
- Site foi atualizado automaticamente

Se falhar ❌:
- Clique no workflow
- Veja os logs de erro
- Provavelmente token incorreto ou sem permissões

---

## 🔍 VERIFICAR QUAL TOKEN USAR

Se você não sabe qual token é o correto:

### Testar Token 1

```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer 5bd1613844791bb930631a4a98d278d4" \
  -H "Content-Type: application/json"
```

**Resposta esperada:**
```json
{
  "success": true,
  "result": {
    "id": "...",
    "status": "active"
  }
}
```

### Testar Token 2

```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer ef4dfafae6fc56ebf84a3b58aa7d8b45" \
  -H "Content-Type: application/json"
```

Use o token que retornar `"success": true`.

---

## 🎯 PERMISSÕES NECESSÁRIAS

O token precisa ter estas permissões:

```
Account → Cloudflare Pages → Edit
Account → Account Settings → Read
```

**Verificar permissões:**

1. https://dash.cloudflare.com/profile/api-tokens
2. Encontre o token na lista
3. Clique em "View" ou "Edit"
4. Veja as permissões

Se não tiver as permissões corretas:
1. Crie um novo token
2. Use o template "Edit Cloudflare Workers"
3. Copie o novo token
4. Atualize o secret no GitHub

---

## 🚨 SEGURANÇA

### ✅ CORRETO:

- Armazenar tokens em GitHub Secrets
- Usar tokens com permissões limitadas
- Não compartilhar tokens publicamente
- Revogar tokens não utilizados

### ❌ INCORRETO:

- ~~Colocar tokens diretamente no código~~
- ~~Compartilhar tokens em chat/email~~
- ~~Usar token com permissões de admin~~
- ~~Deixar tokens expostos no repositório~~

---

## 📊 ARQUIVO .github/workflows/deploy.yml

O arquivo já está criado e configurado para usar os secrets:

```yaml
- name: Deploy para Cloudflare Pages
  uses: cloudflare/pages-action@v1
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    projectName: hbvidaesaude
    directory: .
```

Quando você configurar os secrets, ele vai funcionar automaticamente!

---

## 🎯 FLUXO COMPLETO

```
┌─────────────────────────────────────────────────────────┐
│ 1. Você faz commit e push para GitHub                  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 2. GitHub Actions detecta push na branch main          │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Workflow .github/workflows/deploy.yml executa        │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Usa secrets CLOUDFLARE_API_TOKEN e ACCOUNT_ID       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Faz deploy no Cloudflare Pages                      │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 6. ✅ Site atualizado em https://hbvidaesaude.me       │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 DICA

**Você NÃO precisa de GitHub Actions para deploy automático!**

**Cloudflare Pages já faz deploy automático** quando você conecta via interface web (sem precisar de tokens).

**GitHub Actions é opcional** e serve para:
- Controle mais fino do processo
- Logs mais detalhados no GitHub
- Deploy manual via interface
- Integração com outros workflows

**Para iniciantes: use Cloudflare Pages direto (sem GitHub Actions).**

---

## 🆘 PROBLEMAS COMUNS

### ❌ "Invalid API Token"

**Solução:**
- Verifique se copiou o token correto
- Teste o token via curl (comandos acima)
- Crie um novo token se necessário

### ❌ "Account ID not found"

**Solução:**
- Verifique se copiou o Account ID correto
- Veja no Cloudflare Dashboard (painel direito)

### ❌ "Permission denied"

**Solução:**
- Token não tem permissões suficientes
- Crie novo token com template "Edit Cloudflare Workers"
- Atualize o secret no GitHub

---

## ✅ CHECKLIST FINAL

- [ ] Descobrir Account ID (Cloudflare Dashboard)
- [ ] Testar qual token funciona (curl)
- [ ] Acessar GitHub → Settings → Secrets
- [ ] Adicionar CLOUDFLARE_API_TOKEN
- [ ] Adicionar CLOUDFLARE_ACCOUNT_ID
- [ ] Fazer commit de teste
- [ ] Ver Actions tab executar
- [ ] Verificar deploy bem-sucedido
- [ ] Site atualizado em https://hbvidaesaude.me

---

## 📚 REFERÊNCIAS

- GitHub Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- Cloudflare API Tokens: https://dash.cloudflare.com/profile/api-tokens
- Cloudflare Pages Action: https://github.com/cloudflare/pages-action

---

**Precisa de ajuda para configurar? Me avise!** 😊
