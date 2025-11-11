# 📤 COMO FAZER UPLOAD DOS ARQUIVOS PARA GITHUB

## 🎯 Objetivo:
Fazer upload do arquivo `index.html` (e outros) para o repositório `hbvidaesaude` no GitHub.

---

## 📋 MÉTODO 1: Upload Direto pelo GitHub (MAIS FÁCIL)

### **Passo 1: Acessar o Repositório**

Vá para: https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude

### **Passo 2: Upload de Arquivo**

1. Clique no botão **"Add file"** (canto superior direito)
2. Clique em **"Upload files"**
3. **Arraste o arquivo `index.html`** para a área de upload
4. **OU** clique em "choose your files" e selecione
5. Na caixa de commit message, escreva:
   ```
   Adicionado index.html - Deploy inicial KaiNow Saúde
   ```
6. Clique em **"Commit changes"** (botão verde)

### **Passo 3: Aguardar Deploy Automático**

1. Cloudflare vai detectar automaticamente (30 segundos)
2. Aguarde 1-2 minutos para build
3. Acesse: https://kainowsaude.kainow.com.br
4. ✅ Deve funcionar!

---

## 📋 MÉTODO 2: GitHub Desktop

### **Passo 1: Abrir GitHub Desktop**

1. Abra o aplicativo **GitHub Desktop**
2. Vá em **File** → **Clone repository**
3. Selecione: `gelcijosegrouptrig-cmyk/hbvidaesaude`
4. Escolha uma pasta no seu computador
5. Clique em **Clone**

### **Passo 2: Adicionar Arquivos**

1. Abra a pasta onde clonou o repositório
2. Copie o arquivo `index.html` para dentro da pasta
3. Copie também `wrangler.toml`
4. Volte para o GitHub Desktop

### **Passo 3: Commit e Push**

1. Você verá os arquivos listados
2. Escreva mensagem:
   ```
   Deploy inicial - index.html + wrangler.toml
   ```
3. Clique em **"Commit to main"**
4. Clique em **"Push origin"**

### **Passo 4: Aguardar Deploy**

1. Aguarde 1-2 minutos
2. Acesse: https://kainowsaude.kainow.com.br
3. ✅ Funcionando!

---

## 📋 MÉTODO 3: Git Command Line

Se você sabe usar Git:

```bash
# Clone o repositório
git clone https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude.git
cd hbvidaesaude

# Adicione os arquivos
# (copie index.html e wrangler.toml para a pasta)

# Commit e push
git add .
git commit -m "Deploy inicial KaiNow Saúde"
git push origin main

# Aguarde 1-2 minutos
# Site estará funcionando!
```

---

## ✅ VERIFICAÇÃO

Após fazer upload, verifique:

1. **GitHub:** https://github.com/gelcijosegrouptrig-cmyk/hbvidaesaude
   - Deve aparecer: `index.html` e `wrangler.toml`

2. **Cloudflare Deploy:** https://dash.cloudflare.com
   - Workers & Pages → hbvidaesaude → Implantações
   - Deve aparecer novo deploy "em andamento" ou "concluído"

3. **Site Final:**
   - https://kainowsaude.kainow.com.br
   - Deve abrir sem erro 404!

---

## 🎊 PRONTO!

Depois que o site estiver funcionando, você pode adicionar mais páginas:
- admin/
- css/
- js/
- programa-*.html
- especialidade-*.html

**Mesmo processo:** Upload → Commit → Push → Deploy automático!

---

**Criado em:** 09/11/2025
**Arquivos necessários:** index.html + wrangler.toml
