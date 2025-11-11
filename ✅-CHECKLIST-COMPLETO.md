# ✅ CHECKLIST COMPLETO DE DEPLOY

Use este checklist para garantir que tudo está correto!

---

## 📋 ETAPA 1: PREPARAÇÃO (Antes de começar)

- [ ] Tenho a pasta do projeto no meu computador
- [ ] Sei onde está a pasta (caminho completo)
- [ ] Tenho git instalado no computador
- [ ] Tenho acesso ao GitHub
- [ ] Tenho acesso ao painel do Cloudflare

**💡 Se marcou TUDO acima, continue!**

---

## 📋 ETAPA 2: VERIFICAR ESTRUTURA LOCAL

Abra a pasta do projeto e verifique:

- [ ] Arquivo `index.html` existe na raiz
- [ ] Pasta `css/` existe
- [ ] Arquivo `css/style.css` existe DENTRO da pasta css/
- [ ] Pasta `js/` existe
- [ ] Arquivo `js/main.js` existe DENTRO da pasta js/
- [ ] Arquivo `wrangler.toml` existe na raiz
- [ ] Pasta `.github/workflows/` existe
- [ ] Arquivo `.github/workflows/deploy.yml` existe

**💡 Se marcou TUDO acima, estrutura local está PERFEITA!**

---

## 📋 ETAPA 3: ESCOLHER MÉTODO DE DEPLOY

Escolha APENAS UM método:

### Método A: Script Automático (Recomendado)

**Windows:**
- [ ] Localizei o arquivo `EXECUTAR-AGORA.bat`
- [ ] Cliquei duas vezes nele
- [ ] Janela preta abriu
- [ ] Digitei `s` quando perguntou
- [ ] Script está rodando

**Mac/Linux:**
- [ ] Abri o Terminal
- [ ] Naveguei até a pasta do projeto (`cd caminho`)
- [ ] Executei: `bash EXECUTAR-AGORA.sh`
- [ ] Digitei `s` quando perguntou
- [ ] Script está rodando

**Resultado esperado:**
- [ ] Vejo mensagem "✅ SUCESSO! Arquivos enviados para GitHub!"
- [ ] Nenhuma mensagem de erro apareceu

---

### Método B: Comandos Git Manuais

- [ ] Abri Terminal/Prompt na pasta do projeto
- [ ] Executei: `git status` (ver o que mudou)
- [ ] Executei: `git add .` (adicionar tudo)
- [ ] Executei: `git commit -m "Corrigir estrutura"` (criar commit)
- [ ] Executei: `git push origin main` (enviar para GitHub)
- [ ] OU executei: `git push origin master` (se main falhou)

**Resultado esperado:**
- [ ] Vejo mensagem de sucesso do git push
- [ ] Nenhuma mensagem de erro de autenticação
- [ ] Nenhuma mensagem de rejeição

---

### Método C: Upload Manual no GitHub

- [ ] Abri: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude
- [ ] Verifiquei se há `main.js` na raiz (ERRADO)
- [ ] Se havia, deletei ele
- [ ] Verifiquei se há `style.css` na raiz (ERRADO)
- [ ] Se havia, deletei ele
- [ ] Cliquei em "Add file" → "Upload files"
- [ ] Arrastei toda a pasta do projeto
- [ ] Vi a lista de arquivos que serão enviados
- [ ] Cliquei em "Commit changes"

**Resultado esperado:**
- [ ] Vejo mensagem "Commit changes successful"
- [ ] Página recarregou mostrando novos arquivos

---

## 📋 ETAPA 4: VERIFICAR GITHUB

Abra: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude

**Verificar estrutura:**

- [ ] Vejo pasta `.github/` na lista
- [ ] Vejo pasta `css/` na lista
- [ ] Vejo pasta `js/` na lista
- [ ] Vejo arquivo `index.html` na lista
- [ ] Vejo arquivo `wrangler.toml` na lista
- [ ] Vejo arquivo `.gitignore` na lista

**Verificar detalhes:**

- [ ] Cliquei na pasta `css/`
- [ ] Vejo arquivo `style.css` DENTRO de css/
- [ ] Voltei para raiz
- [ ] Cliquei na pasta `js/`
- [ ] Vejo arquivo `main.js` DENTRO de js/
- [ ] Voltei para raiz

**Verificar que NÃO há:**

- [ ] NÃO vejo `main.js` na raiz (fora de js/)
- [ ] NÃO vejo `style.css` na raiz (fora de css/)

**💡 Se marcou TUDO acima, GitHub está PERFEITO!**

---

## 📋 ETAPA 5: AGUARDAR DEPLOY

**Importante:** Deploy leva tempo!

- [ ] Anotei o horário atual: ______:______ (hora:minuto)
- [ ] Vou aguardar 10 minutos completos
- [ ] Não vou fazer novo git push enquanto aguardo
- [ ] Não vou fazer refresh a cada segundo (causa ansiedade!)

**Fazer enquanto aguarda:**

- [ ] Tomar um café ☕
- [ ] Checar o celular 📱
- [ ] Alongar um pouco 🧘
- [ ] Respirar fundo 😌

**Após 5 minutos:**

- [ ] Abri: https://dash.cloudflare.com/
- [ ] Naveguei: Workers & Pages → hbvidaesaude → Implantações
- [ ] Vejo o status do último deploy

**Status possível:**

- [ ] 🔄 Building... (ainda construindo - NORMAL)
- [ ] ✅ Success (sucesso! - aguardar mais 5 min)
- [ ] ❌ Failed (falhou - cliquei em "View details" para ver erro)

---

## 📋 ETAPA 6: VERIFICAR CLOUDFLARE

Após 10 minutos completos:

- [ ] Abri: https://dash.cloudflare.com/
- [ ] Fui para: Workers & Pages
- [ ] Cliquei em: hbvidaesaude
- [ ] Cliquei em: Implantações (Deployments)
- [ ] Vejo o deploy mais recente (topo da lista)

**Status do deploy:**

- [ ] Status é: ✅ Success
- [ ] Tempo foi: há _____ minutos
- [ ] Branch é: main (ou master)
- [ ] Commit message é o que eu escrevi

**Se status é ❌ Failed:**

- [ ] Cliquei no deploy falhado
- [ ] Cliquei em "View details" ou "View build logs"
- [ ] Copiei o log de erro
- [ ] Vou enviar o erro para você me ajudar

**💡 Se status é Success, continue!**

---

## 📋 ETAPA 7: LIMPAR CACHE

Antes de testar, limpar cache:

**Chrome/Edge:**
- [ ] Pressionei: `Ctrl + Shift + Delete` (Windows) ou `Cmd + Shift + Delete` (Mac)
- [ ] Selecionei: "Cached images and files"
- [ ] Selecionei período: "All time"
- [ ] Cliquei: "Clear data"

**Firefox:**
- [ ] Pressionei: `Ctrl + Shift + Del`
- [ ] Selecionei: "Cache"
- [ ] Cliquei: "Clear Now"

**Safari:**
- [ ] Pressionei: `Cmd + Option + E`
- [ ] Cache limpo!

**Alternativa (todos navegadores):**
- [ ] Abri aba anônima/privada
- [ ] `Ctrl + Shift + N` (Chrome) ou `Ctrl + Shift + P` (Firefox)

---

## 📋 ETAPA 8: TESTAR SITE

**Teste 1: URL Cloudflare (backup)**

- [ ] Abri em aba anônima: https://hbvidaesaude.pages.dev
- [ ] Site carregou? (Se SIM, ótimo! Se NÃO, anotar o erro)
- [ ] Vejo o layout azul com gradiente?
- [ ] Vejo o menu de navegação no topo?
- [ ] Vejo a seção "Sobre"?
- [ ] Vejo a seção "Especialidades"?
- [ ] Vejo a seção "Planos"?

**Teste 2: URL Principal (domínio customizado)**

- [ ] Abri em aba anônima: https://hbvidaesaude.me
- [ ] Site carregou? (Se SIM, perfeito! Se NÃO, anotar o erro)
- [ ] Vejo o mesmo layout que no .pages.dev?

**💡 Se .pages.dev funciona mas .me não:**
- [ ] É problema de DNS, não de deploy
- [ ] Vou aguardar mais 1 hora para DNS propagar
- [ ] Depois vou testar de novo

---

## 📋 ETAPA 9: TESTAR FUNCIONALIDADES

**CSS funcionando:**
- [ ] Vejo cores (azul, verde, etc.)
- [ ] Vejo layout organizado (não tudo desalinhado)
- [ ] Vejo gradiente azul no hero section
- [ ] Botões têm estilo (não são HTML puro)

**JavaScript funcionando:**
- [ ] Menu mobile abre/fecha quando clico no ícone hambúrguer
- [ ] Busca de especialidades filtra quando eu digito
- [ ] Scroll é suave quando clico no menu
- [ ] Modal abre quando clico em "Assinar Agora"

**Pagamentos funcionando:**

- [ ] Cliquei em "Assinar Agora" ou "Pagar com Cartão"
- [ ] Modal de pagamento abriu
- [ ] Preenchi os dados do formulário
- [ ] Cliquei em "Pagar com PIX"
- [ ] QR Code Woovi apareceu

**OU:**

- [ ] Cliquei em "Pagar com Cartão"
- [ ] Modal Mercado Pago abriu (NÃO Cielo!)
- [ ] Formulário do Mercado Pago está visível
- [ ] Vejo opção de cartão de crédito

**💡 Se TUDO acima funciona, PERFEITO!**

---

## 📋 ETAPA 10: CONFIRMAR DEPLOY AUTOMÁTICO

Agora vamos confirmar que deploy automático está funcionando:

**Teste de deploy:**

- [ ] Vou fazer uma pequena mudança no site
- [ ] Abri `index.html` em editor de texto
- [ ] Mudei algo simples (ex: um texto no hero)
- [ ] Salvei o arquivo
- [ ] Executei: `git add index.html`
- [ ] Executei: `git commit -m "Teste de deploy automático"`
- [ ] Executei: `git push origin main`
- [ ] Aguardei 10 minutos
- [ ] Limpei cache do navegador
- [ ] Abri https://hbvidaesaude.me
- [ ] Vejo a mudança que fiz! ✅

**💡 Se viu a mudança, deploy automático FUNCIONA!**

---

## 🎉 SUCESSO TOTAL!

Se você marcou TUDO nos checklists acima, você tem:

✅ Site online em hbvidaesaude.me  
✅ Estrutura correta no GitHub  
✅ Deploy automático funcionando  
✅ Pagamentos PIX funcionando (Woovi)  
✅ Pagamentos Cartão funcionando (Mercado Pago)  
✅ Design responsivo funcionando  
✅ HTTPS/SSL ativo  
✅ CDN global ativo  

**🚀 Sistema completo funcionando igual kainow.com.br!**

---

## ❌ ALGO DEU ERRADO?

Se você **NÃO** conseguiu marcar todos os itens, identifique ONDE parou:

**Parei na Etapa 3:**
- Problema: Não consigo fazer git push
- Solução: Use Método C (upload manual no GitHub)

**Parei na Etapa 4:**
- Problema: Estrutura no GitHub está errada
- Solução: Deletar arquivos incorretos e fazer upload de novo

**Parei na Etapa 5/6:**
- Problema: Deploy falhou no Cloudflare
- Solução: Me enviar o log de erro do Cloudflare

**Parei na Etapa 8:**
- Problema: Site não carrega ou mostra erro
- Solução: Me enviar screenshot do erro

**Parei na Etapa 9:**
- Problema: Funcionalidades não funcionam
- Solução: Verificar console do navegador (F12) e me enviar erros

---

## 📞 PRECISA DE AJUDA?

Se não conseguiu marcar tudo, me envie:

**1. Em qual etapa você parou:**
```
Parei na etapa _____
```

**2. O que aconteceu:**
```
Quando eu fiz _____, apareceu _____
```

**3. Screenshots:**
- [ ] Screenshot do GitHub (estrutura de arquivos)
- [ ] Screenshot do Cloudflare (status do deploy)
- [ ] Screenshot do site (erro ou tela branca)
- [ ] Screenshot do Terminal (se usou comandos git)

**4. Logs/Erros:**
```
[Cole aqui qualquer mensagem de erro]
```

---

**📌 SALVE ESTE ARQUIVO!**

Use este checklist sempre que fizer deploy para garantir que tudo está certo!

**⏰ Tempo total para completar:** 15-20 minutos

**🎯 Taxa de sucesso:** 95% se seguir passo a passo
