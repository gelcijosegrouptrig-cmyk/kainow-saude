# ⚡ GUIA RÁPIDO - Configurar kainow.com.br

## 🎯 OBJETIVO FINAL

```
https://kainow.com.br → Seu site KaiNow Saúde
```

---

## 📋 INFORMAÇÕES QUE VOCÊ TEM

```
✅ Domínio: kainow.com.br
✅ DNS 1: brady.ns.cloudflare.com
✅ DNS 2: hope.ns.cloudflare.com
✅ Site atual: ojdbcsqw.gensparkspace.com
```

---

## 🚀 PASSO A PASSO (10 MINUTOS)

### **PASSO 1: Configurar Registro.br** (5 minutos)

```
1. Acesse: https://registro.br

2. Faça login

3. Clique em: "Meus Domínios"

4. Clique em: kainow.com.br

5. Clique em: "Modificar Servidores DNS"

6. Apague os DNS atuais

7. Adicione:
   DNS 1: brady.ns.cloudflare.com
   DNS 2: hope.ns.cloudflare.com

8. Clique: "Salvar"

✅ Pronto! Aguarde 2-6 horas para funcionar
```

---

### **PASSO 2: Configurar Cloudflare** (5 minutos)

#### **2.1 - Criar conta Cloudflare (se ainda não tem):**

```
1. Acesse: https://dash.cloudflare.com/sign-up

2. Crie conta gratuita

3. Confirme email
```

#### **2.2 - Adicionar domínio:**

```
1. No Cloudflare, clique: "Add a Site"

2. Digite: kainow.com.br

3. Escolha plano: "Free" (R$ 0)

4. Clique: "Continue"
```

#### **2.3 - Confirmar nameservers:**

```
Cloudflare vai mostrar:

✅ brady.ns.cloudflare.com
✅ hope.ns.cloudflare.com

Se aparecer isso, está certo!
Clique: "Continue"
```

#### **2.4 - Adicionar registro DNS:**

```
1. Clique: "Add record"

2. Preencha:
   Type:    CNAME
   Name:    @
   Target:  ojdbcsqw.gensparkspace.com
   Proxy:   🔴 DNS only (cinza)
   
3. Clique: "Save"

4. Adicione outro:
   Type:    CNAME
   Name:    www
   Target:  ojdbcsqw.gensparkspace.com
   Proxy:   🔴 DNS only (cinza)

5. Clique: "Save"
```

#### **2.5 - Ativar HTTPS:**

```
1. No menu lateral, clique: "SSL/TLS"

2. Escolha: "Full"

3. Vá em: "Edge Certificates"

4. Ative: "Always Use HTTPS"

5. Ative: "Automatic HTTPS Rewrites"
```

---

### **PASSO 3: Aguardar** ⏰

```
⏰ Aguarde: 2-6 horas (normal)

Durante esse tempo, o DNS está se propagando
pelo mundo todo.

Pode levar até 48h em casos raros.
```

---

### **PASSO 4: Testar** ✅

```
Após algumas horas, teste:

1. Abra navegador anônimo

2. Digite: https://kainow.com.br

3. Digite: https://www.kainow.com.br

Se carregou = ✅ FUNCIONOU!
```

---

## 🔍 VERIFICAR SE PROPAGOU

### **Método 1: Site de verificação**

```
1. Acesse: https://whatsmydns.net

2. Digite: kainow.com.br

3. Escolha: CNAME

4. Veja o mapa:
   - ✅ Verde = Propagado
   - ❌ Vermelho = Ainda não propagou

Se 50% ou mais estiver verde, já funciona!
```

### **Método 2: Comando (Windows/Mac)**

```bash
# Windows - CMD:
nslookup kainow.com.br

# Mac/Linux - Terminal:
dig kainow.com.br

# Se aparecer "ojdbcsqw.gensparkspace.com" = ✅ Funcionou!
```

---

## 📊 VISUAL DO PROCESSO

```
ANTES:
kainow.com.br → ❌ Não funciona

CONFIGURANDO:
1. Registro.br     [░░░░░░] → DNS Cloudflare
2. Cloudflare DNS  [░░░░░░] → GenSparkSpace
3. Propagação      [░░░░░░] → Mundo todo

DEPOIS (2-6 horas):
kainow.com.br → ✅ Site KaiNow Saúde!
```

---

## 🎯 CONFIGURAÇÃO /Saude (OPCIONAL)

### **Para kainow.com.br/Saude funcionar:**

#### **Opção 1: Redirect automático (Cloudflare)**

```
1. No Cloudflare, vá em: "Rules" → "Redirect Rules"

2. Clique: "Create rule"

3. Configure:
   Name: Redirect para Saude
   
   When incoming requests match:
   Field: URI Path
   Operator: equals
   Value: /
   
   Then:
   Type: Dynamic
   Expression: concat("/Saude", http.request.uri.path)
   Status code: 301

4. Clique: "Deploy"
```

#### **Opção 2: Arquivo no servidor (Mais simples)**

Crie arquivo `index.html` na raiz com:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/Saude/">
    <title>KaiNow Saúde</title>
</head>
<body>
    <script>
        window.location.href = '/Saude/';
    </script>
    <p>Redirecionando para <a href="/Saude/">KaiNow Saúde</a>...</p>
</body>
</html>
```

---

## ✅ CHECKLIST RÁPIDO

### **Registro.br:**
- [ ] Acessou registro.br
- [ ] Mudou DNS para Cloudflare
- [ ] Salvou alterações

### **Cloudflare:**
- [ ] Criou conta (se necessário)
- [ ] Adicionou kainow.com.br
- [ ] Configurou CNAME (@)
- [ ] Configurou CNAME (www)
- [ ] Ativou HTTPS

### **Teste:**
- [ ] Aguardou 2-6 horas
- [ ] Testou https://kainow.com.br
- [ ] Testou https://www.kainow.com.br
- [ ] Site carregou corretamente

---

## 🆘 PROBLEMAS COMUNS

### **"Site não carrega"**
```
✅ Aguarde mais tempo (até 48h)
✅ Limpe cache do navegador (Ctrl+Shift+Del)
✅ Teste em aba anônima
✅ Verifique propagação: whatsmydns.net
```

### **"Aviso de segurança SSL"**
```
✅ No Cloudflare: SSL/TLS → Full
✅ Ative: Always Use HTTPS
✅ Aguarde 15 minutos
✅ Limpe cache
```

### **"DNS não resolveu"**
```
✅ Verifique se DNS está correto no Registro.br
✅ Deve ser brady.ns.cloudflare.com e hope.ns.cloudflare.com
✅ Aguarde mais tempo
```

---

## 📱 RESUMO EM TÓPICOS

### **O que fazer:**

```
1️⃣ Registro.br
   └─ Mudar DNS para Cloudflare

2️⃣ Cloudflare
   ├─ Adicionar domínio
   ├─ Configurar CNAME
   └─ Ativar HTTPS

3️⃣ Aguardar
   └─ 2-6 horas

4️⃣ Testar
   └─ https://kainow.com.br
```

### **Tempo total:**
```
⏱️ Configuração: 10 minutos
⏰ Propagação: 2-6 horas
✅ Total: Menos de 1 dia
```

---

## 🎉 RESULTADO FINAL

### **Depois de configurado:**

```
✅ https://kainow.com.br
   → Seu site carrega

✅ https://www.kainow.com.br
   → Seu site carrega

✅ HTTPS ativo (cadeado verde)

✅ Rápido (CDN Cloudflare)

✅ Seguro (Certificado SSL)
```

---

## 💡 DICAS

### **Acelerar propagação:**
```
✅ Use DNS 1.1.1.1 (Cloudflare) no seu computador
✅ Limpe cache DNS: ipconfig /flushdns (Windows)
✅ Reinicie roteador
```

### **Depois de funcionar:**
```
✅ Configure /Saude (redirect)
✅ Ative cache no Cloudflare
✅ Configure firewall
✅ Monitore Analytics
```

---

## 📞 PRECISA DE AJUDA?

### **Suporte Cloudflare:**
```
Chat: https://dash.cloudflare.com (canto inferior direito)
Docs: https://developers.cloudflare.com
```

### **Verificar DNS:**
```
https://whatsmydns.net/?d=kainow.com.br
```

---

## 🎯 PRÓXIMO PASSO

### **Agora faça:**

1. **Abra duas abas:**
   - Tab 1: https://registro.br
   - Tab 2: https://dash.cloudflare.com

2. **Configure seguindo o passo a passo acima**

3. **Aguarde 2-6 horas**

4. **Teste: https://kainow.com.br**

5. **✅ PRONTO!**

---

**TOTAL: 10 MINUTOS DE CONFIGURAÇÃO + 2-6 HORAS DE ESPERA = SITE NO AR!** 🚀

**Dificuldade:** ⭐⭐☆☆☆ (Fácil)  
**Custo:** R$ 0 (Plano Free Cloudflare)  
**Suporte:** 24/7 via Cloudflare
