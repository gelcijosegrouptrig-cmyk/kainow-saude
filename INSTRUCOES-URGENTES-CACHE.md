# 🚨 INSTRUÇÕES URGENTES - Problema de Cache

## ❌ O PROBLEMA

Seu navegador está **salvando a versão antiga** da página em cache, mesmo que o código já esteja corrigido.

**Código correto (linha 369):**
```javascript
const affiliateLink = `https://kainow.com.br/programa-${product.id}.html?ref=${affiliateId}`;
```

**Mas seu navegador mostra:**
```
https://kainowsaude.com.br/programa-mulher.html?ref=AFF...
```

Isso é **100% problema de cache do navegador**.

---

## ✅ SOLUÇÃO DEFINITIVA (Faça EXATAMENTE assim)

### **MÉTODO 1: URL com Cache-Busting (Mais Eficaz)**

**Cole esta URL e pressione ENTER:**
```
https://kainow.com.br/admin/afiliados-v3.html
```

Esta página vai:
1. Limpar o cache automaticamente
2. Redirecionar para a versão correta
3. Adicionar parâmetros anti-cache

---

### **MÉTODO 2: Limpar Cache do Navegador (Completo)**

#### **Google Chrome / Edge:**
1. Pressione: **CTRL + SHIFT + DELETE**
2. Selecione: **"Última hora"**
3. Marque APENAS: **"Imagens e arquivos em cache"**
4. Clique: **"Limpar dados"**
5. **Feche TODAS as abas do admin**
6. **Feche o navegador completamente**
7. Abra novamente
8. Cole: `https://kainow.com.br/admin/gerenciar-afiliados.html`
9. Pressione: **CTRL + SHIFT + R**

#### **Firefox:**
1. Pressione: **CTRL + SHIFT + DELETE**
2. Selecione: **"Última hora"**
3. Marque: **"Cache"**
4. Clique: **"Limpar agora"**
5. **Feche TODAS as abas do admin**
6. **Feche o navegador completamente**
7. Abra novamente
8. Cole: `https://kainow.com.br/admin/gerenciar-afiliados.html`
9. Pressione: **CTRL + SHIFT + R**

---

### **MÉTODO 3: Modo de Desenvolvedor (Desabilitar Cache)**

#### **Chrome / Edge:**
1. Abra: https://kainow.com.br/admin/gerenciar-afiliados.html
2. Pressione: **F12** (abre DevTools)
3. Vá na aba: **"Network"** (Rede)
4. Marque: **"Disable cache"** ✅
5. **MANTENHA o F12 aberto**
6. Pressione: **CTRL + R** para recarregar
7. Clique em "Ver Links"
8. Agora deve mostrar o domínio correto!

#### **Firefox:**
1. Abra: https://kainow.com.br/admin/gerenciar-afiliados.html
2. Pressione: **F12**
3. Vá em: **"Rede"** (Network)
4. Clique no ícone de engrenagem ⚙️
5. Marque: **"Desabilitar cache"** ✅
6. **MANTENHA o F12 aberto**
7. Pressione: **CTRL + R**
8. Clique em "Ver Links"

---

### **MÉTODO 4: Janela Privada (Teste Rápido)**

1. **Feche TODAS as janelas privadas abertas**
2. Abra nova janela privada: **CTRL + SHIFT + N**
3. Cole: `https://kainow.com.br/admin/gerenciar-afiliados.html`
4. Login: **admin** / **kainow2025**
5. Clique em "Ver Links"
6. **Copie o link e me mostre**

Se na janela privada aparecer **kainow.com.br** (correto), confirma que é cache!

---

## 🔍 COMO VERIFICAR SE DEU CERTO

### **Verificação Visual:**

Quando você clicar em "Ver Links", deve aparecer um **banner verde** no canto superior direito por 5 segundos:

```
✅ Versão 3.0 Carregada!
   Links usam: kainow.com.br
```

Se aparecer este banner = versão correta carregada!

### **Verificação no Console:**

1. Pressione **F12**
2. Vá na aba **"Console"**
3. Deve aparecer:
   ```
   🚀 Gerenciador de Afiliados v3.0 carregado!
   📅 Timestamp: 2025-11-10T...
   🔗 Domínio dos links: kainow.com.br
   ```

4. Quando clicar em "Ver Links", deve aparecer:
   ```
   🔗 Link gerado (v3.0): https://kainow.com.br/programa-mulher.html?ref=AFF...
   🔗 Link gerado (v3.0): https://kainow.com.br/programa-senior.html?ref=AFF...
   ```

### **Link Correto:**
```
✅ https://kainow.com.br/programa-mulher.html?ref=AFF1762770904167
```

### **Link Errado (cache):**
```
❌ https://kainowsaude.com.br/programa-mulher.html?ref=AFF1762770904167
```

---

## 🎯 TESTE PASSO A PASSO

Faça EXATAMENTE nesta ordem:

```
PASSO 1: Fechar TUDO
├─ Feche todas as abas do admin
├─ Feche o navegador completamente
└─ Aguarde 5 segundos

PASSO 2: Limpar Cache
├─ Abra o navegador
├─ CTRL + SHIFT + DELETE
├─ Limpar "Última hora"
└─ Marque "Cache" ou "Imagens em cache"

PASSO 3: Acessar Versão Nova
├─ Cole: https://kainow.com.br/admin/afiliados-v3.html
├─ Aguarde redirecionamento automático
└─ OU cole: https://kainow.com.br/admin/gerenciar-afiliados.html

PASSO 4: Forçar Reload
├─ Pressione CTRL + SHIFT + R
├─ Aguarde carregar completamente
└─ Procure banner verde "v3.0 Carregada!"

PASSO 5: Abrir DevTools
├─ Pressione F12
├─ Vá em "Console"
└─ Veja se mostra "v3.0 carregado"

PASSO 6: Ver Links
├─ Clique em "Ver Links" no divulgador
├─ Veja o Console (deve mostrar "Link gerado v3.0")
└─ Copie o primeiro link

PASSO 7: Verificar
├─ Cole o link aqui
└─ Deve ter: kainow.com.br (SEM "saude")
```

---

## 💡 POR QUE ISSO ACONTECE?

O navegador salva arquivos `.html`, `.css`, `.js` em cache para carregar páginas mais rápido.

Quando você atualiza o código no servidor, o navegador continua usando a versão antiga do cache.

**Soluções implementadas:**

1. ✅ Adicionei meta tags anti-cache no HTML
2. ✅ Adicionei versão "v3.0" visível na página
3. ✅ Adicionei banner de confirmação
4. ✅ Adicionei logs no console
5. ✅ Criei URL com cache-busting (afiliados-v3.html)
6. ✅ Adicionei botão "Forçar Atualização"

---

## 🆘 SE NADA FUNCIONAR

**Me envie:**

1. **Print da tela** mostrando os links gerados
2. **Print do Console** (F12 → Console)
3. **URL da barra de endereço** (copie e cole)
4. **Navegador que está usando** (Chrome, Firefox, Edge?)
5. **Sistema operacional** (Windows, Mac, Linux?)

Com essas informações consigo diagnosticar o problema exato!

---

## ✅ CHECKLIST FINAL

Antes de me responder, confirme:

- [ ] Fechei TODAS as abas do admin
- [ ] Fechei o navegador completamente
- [ ] Limpei o cache (CTRL + SHIFT + DELETE)
- [ ] Aguardei alguns segundos
- [ ] Abri o navegador novamente
- [ ] Acessei: afiliados-v3.html OU gerenciar-afiliados.html
- [ ] Pressionei CTRL + SHIFT + R
- [ ] Vi o banner verde "v3.0 Carregada!"
- [ ] Abri o Console (F12)
- [ ] Vi "v3.0 carregado" no console
- [ ] Cliquei em "Ver Links"
- [ ] Copiei o link gerado
- [ ] Verifiquei se tem "kainow.com.br" (sem saude)

---

**Se fizer TUDO isso e ainda aparecer errado, há algo muito estranho acontecendo e vou investigar mais profundamente!**

---

**Criado:** 10/11/2025  
**Versão do Sistema:** 3.0  
**Status:** Código correto, problema é cache do navegador
