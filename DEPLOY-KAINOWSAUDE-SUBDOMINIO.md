# 🚀 Deploy KaiNow Saúde - Subdomínio kainowsaude.kainow.com.br

## 📊 Estrutura Final

- **https://kainow.com.br** → Projeto atual (hbvidaesaude) ✅ Continua funcionando
- **https://kainowsaude.kainow.com.br** → Projeto KaiNow Saúde 🆕 Novo

---

## 🎯 PASSO 1: Fazer Upload dos Arquivos para GitHub

### 1.1 - Preparar os Arquivos

1. **Localize a pasta do projeto KaiNow Saúde** no seu computador
   - Deve conter: `index.html`, pastas `admin/`, `css/`, `js/`, etc.

2. **Localize a pasta do repositório GitHub**
   - Deve estar em algo como:
   - `C:\Users\SeuUsuario\Documents\GitHub\kainowsaude`

### 1.2 - Copiar Arquivos para o Repositório

**IMPORTANTE:** Copie TODOS os arquivos do projeto para dentro da pasta do repositório.

```
kainowsaude/  (repositório GitHub)
├── index.html
├── cadastro.html
├── login.html
├── dashboard.html
├── checkout.html
├── wrangler.toml
├── admin/
│   ├── login-admin.html
│   ├── dashboard-admin.html
│   ├── gerenciar-produtos.html
│   ├── gerenciar-afiliados.html
│   └── criar-afiliados-teste.html
├── css/
│   └── (todos os arquivos CSS)
├── js/
│   ├── admin-auth.js
│   └── affiliate-tracker.js
├── programa-mulher.html
├── programa-senior.html
├── programa-farma.html
├── programa-acolher.html
├── programa-orienta.html
├── programa-vivaleve.html
├── especialidade-cardiologia.html
└── (todos os outros arquivos HTML de especialidades)
```

### 1.3 - Fazer Commit e Push com GitHub Desktop

1. **Abra o GitHub Desktop**

2. **Selecione o repositório:** `kainowsaude`

3. **Você verá todos os arquivos na lista de alterações** (lado esquerdo)

4. **No campo de commit message** (inferior esquerdo), escreva:
   ```
   Deploy completo KaiNow Saúde - Todos os arquivos
   ```

5. **Clique em "Commit to main"**

6. **Clique em "Push origin"** (botão azul no topo)

7. **Aguarde o upload completar** ⏳

---

## 🎯 PASSO 2: Criar Projeto no Cloudflare Pages

### 2.1 - Acessar Cloudflare Dashboard

1. Vá para: https://dash.cloudflare.com
2. Login com suas credenciais
3. Clique em **Workers & Pages** (menu lateral esquerdo)

### 2.2 - Conectar ao GitHub

1. Clique em **Create application**

2. Clique na aba **Pages**

3. Clique em **Connect to Git**

4. Se for a primeira vez:
   - Clique em **Connect GitHub**
   - Autorize o Cloudflare a acessar sua conta GitHub
   - Selecione o repositório `gelcijosegrouptrig-cmyk/kainowsaude`

5. Se já conectou antes:
   - Selecione o repositório `kainowsaude` da lista

### 2.3 - Configurar o Projeto

**Preencha os campos:**

```
Project name: kainowsaude
Production branch: main
```

**Build settings:**

```
Framework preset: None
Build command: (deixar VAZIO)
Build output directory: /
```

**IMPORTANTE:** Não preencha nada em "Build command"!

### 2.4 - Fazer Deploy

1. Clique em **Save and Deploy**

2. Aguarde o deploy completar (1-3 minutos) ⏳

3. Você verá a mensagem: **"Success! Your site is live!"**

4. Anote a URL gerada (algo como): `kainowsaude.pages.dev`

---

## 🎯 PASSO 3: Adicionar Subdomínio Customizado

### 3.1 - Ir para Custom Domains

1. No projeto `kainowsaude` que acabou de criar
2. Clique na aba **Custom domains** (menu superior)
3. Clique em **Set up a custom domain**

### 3.2 - Adicionar o Subdomínio

1. Digite: `kainowsaude.kainow.com.br`

2. Clique em **Continue**

3. Cloudflare vai perguntar se quer adicionar o registro DNS:
   - ✅ Marque a opção **"Activate domain"**
   - Clique em **Activate domain**

4. Cloudflare vai **automaticamente**:
   - ✅ Criar registro CNAME no DNS
   - ✅ Provisionar certificado SSL
   - ✅ Ativar HTTPS

### 3.3 - Aguardar Ativação

**Status vai mudar de:**
- ⏳ `Initializing...` → ⏳ `Pending` → ✅ `Active`

**Tempo:** 1-5 minutos

Quando ficar **Active**, pronto! 🎉

---

## 🎯 PASSO 4: Verificar se Está Funcionando

### 4.1 - Testar os Dois Sites

**Site 1 (deve continuar funcionando):**
- https://kainow.com.br
- Deve mostrar: hbvidaesaude

**Site 2 (novo):**
- https://kainowsaude.kainow.com.br
- Deve mostrar: KaiNow Saúde

### 4.2 - Testar Funcionalidades

1. **Página inicial** carrega corretamente?
2. **Menu** funciona?
3. **Links dos programas** abrem?
4. **Links das especialidades** abrem?
5. **Login/Cadastro** abrem?
6. **Checkout** funciona?

---

## ✅ Checklist Completo

- [ ] Copiei todos os arquivos para a pasta do repositório GitHub
- [ ] Fiz commit no GitHub Desktop
- [ ] Fiz push para o GitHub
- [ ] Criei projeto no Cloudflare Pages conectado ao GitHub
- [ ] Configurei como "None" (sem build)
- [ ] Deploy foi concluído com sucesso
- [ ] Adicionei custom domain: `kainowsaude.kainow.com.br`
- [ ] DNS foi configurado automaticamente
- [ ] Status mudou para "Active" ✅
- [ ] SSL está habilitado 🔒
- [ ] Site está acessível em https://kainowsaude.kainow.com.br
- [ ] Site antigo continua em https://kainow.com.br

---

## 🎊 Resultado Final

### **Antes:**
❌ kainow.com.br → Mostrava projeto errado

### **Depois:**
✅ **https://kainow.com.br** → Projeto hbvidaesaude (continua)
✅ **https://kainowsaude.kainow.com.br** → Projeto KaiNow Saúde (novo!)

---

## 🔧 Troubleshooting

### Erro: "Repository not found"
- Certifique-se de ter feito push no GitHub Desktop
- Verifique se os arquivos aparecem em: https://github.com/gelcijosegrouptrig-cmyk/kainowsaude

### Erro: "Build failed"
- Certifique-se de ter deixado "Build command" VAZIO
- Framework preset deve ser "None"

### Site mostra "404 Not Found"
- Verifique se `index.html` está na raiz do repositório
- Aguarde 1-2 minutos após deploy

### DNS não propaga
- Aguarde até 5 minutos
- Limpe cache do navegador (Ctrl+F5)
- Tente em navegador anônimo

---

## 📞 URLs Importantes

- **Repositório GitHub:** https://github.com/gelcijosegrouptrig-cmyk/kainowsaude
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Projeto Cloudflare:** (será criado após PASSO 2)
- **Site Final:** https://kainowsaude.kainow.com.br

---

## 🚀 Próximos Passos (Opcional)

Depois que estiver funcionando, você pode:

1. **Adicionar também www:**
   - `www.kainowsaude.kainow.com.br`

2. **Configurar redirects** (se quiser):
   - Redirecionar de um domínio para outro

3. **Deploy Automático:**
   - Toda vez que fizer push no GitHub, site atualiza automaticamente! 🎉

---

## 💡 Dicas

- **Sempre teste em navegador anônimo** para ver resultado real
- **Limpe cache** do navegador regularmente
- **GitHub Desktop** torna tudo muito mais fácil
- **Cloudflare Pages** faz tudo automaticamente (DNS, SSL, etc)

---

## ✨ Vantagens Desta Solução

✅ Dois sites independentes
✅ Deploy automático via GitHub
✅ SSL grátis nos dois
✅ DNS configurado automaticamente
✅ Fácil de atualizar (só fazer push)
✅ Zero custo

---

**Criado em:** 09/11/2025
**Status:** Pronto para executar 🚀
