# 🔧 CORREÇÃO: Gerenciar Afiliados

## ❌ PROBLEMA IDENTIFICADO

A página `admin/gerenciar-afiliados.html` estava usando **localStorage** ao invés de **Firestore**.

### **Por isso:**
- ❌ Só mostrava 1 afiliado (dados antigos no navegador)
- ❌ Não mostrava os 3 afiliados do Firestore
- ❌ Dados desatualizados

---

## ✅ SOLUÇÃO APLICADA

Atualizei a página para buscar afiliados do **Firestore**:

### **O que foi mudado:**

1. **Adicionado Firebase SDK:**
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
   ```

2. **Configuração Firebase adicionada:**
   ```javascript
   const firebaseConfig = {
       apiKey: "AIzaSyA2-tCGH1uaABTzMqhK_BhTy-zIZba0wMs",
       authDomain: "kainowsaude.firebaseapp.com",
       projectId: "kainowsaude",
       // ...
   };
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   ```

3. **Função `loadAffiliates()` atualizada:**
   ```javascript
   // ANTES (localStorage):
   function loadAffiliates() {
       const affiliates = JSON.parse(localStorage.getItem('kainow_affiliates') || '[]');
       return affiliates;
   }

   // DEPOIS (Firestore):
   async function loadAffiliates() {
       const snapshot = await db.collection('affiliates').get();
       const affiliates = snapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
       }));
       return affiliates;
   }
   ```

4. **Carregamento automático adicionado:**
   ```javascript
   window.addEventListener('DOMContentLoaded', async function() {
       await updateStats();
       await renderAffiliates();
   });
   ```

---

## 🚀 COMO TESTAR

### **1. Publicar a correção:**

**Opção A: Aba Publish**
```
1. Clique em "Publish"
2. Aguarde deploy (1-2 min)
3. Teste
```

**Opção B: Git**
```bash
git add admin/gerenciar-afiliados.html
git commit -m "Fix: Gerenciar afiliados agora usa Firestore"
git push origin main
```

### **2. Limpar cache do navegador:**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### **3. Acessar a página:**
```
https://kainow.com.br/admin/gerenciar-afiliados.html
```

### **4. Verificar:**
- ✅ Deve mostrar **3 afiliados**
- ✅ Gelci Silva (gelcisilva252)
- ✅ GELCI JOSE DA SILVA (gelcijosegrouptrig)  
- ✅ RUTHYELI GOMES COSTA SILVA (ruthyelisilva138)

---

## 📊 RESULTADO ESPERADO

### **Antes:**
```
Total Afiliados: 1
Links Gerados: 6

Divulgadores Cadastrados:
1. GELCI JOSE DA SILVA (gelcijosegrouptrig)
```

### **Depois:**
```
Total Afiliados: 3
Links Gerados: 18

Divulgadores Cadastrados:
1. Gelci Silva (gelcisilva252)
2. GELCI JOSE DA SILVA (gelcijosegrouptrig)
3. RUTHYELI GOMES COSTA SILVA (ruthyelisilva138)
```

---

## 🔍 SE AINDA NÃO FUNCIONAR

### **1. Limpar cache e cookies:**
```
Chrome: Ctrl+Shift+Del → Limpar dados de navegação
```

### **2. Abrir em aba anônima:**
```
Ctrl+Shift+N
```

### **3. Verificar console (F12):**
Procure por:
```
🔥 Firebase inicializado
📡 Carregando afiliados do Firestore...
✅ 3 afiliados carregados
```

### **4. Se der erro:**
Me envie o erro do console (F12 → Console)

---

## ⚡ ALTERNATIVA TEMPORÁRIA

Enquanto não publica, use:

```
https://kainow.com.br/admin/buscar-afiliado.html
```

Clique em **"📋 Listar TODOS os Afiliados"**

---

## 📝 RESUMO

| Item | Antes | Depois |
|------|-------|--------|
| Fonte de dados | localStorage | Firestore ✅ |
| Afiliados mostrados | 1 | 3 ✅ |
| Dados atualizados | ❌ Não | ✅ Sim |
| Firebase SDK | ❌ Não tinha | ✅ Adicionado |

---

## 🎯 PRÓXIMO PASSO

**Publique a correção e teste!**

1. Aba "Publish" → Publicar
2. Aguarde 1-2 min
3. Acesse: https://kainow.com.br/admin/gerenciar-afiliados.html
4. Ctrl+Shift+R (limpar cache)
5. Veja os 3 afiliados!

---

**Atualizado:** 10/11/2025 20:15  
**Status:** ✅ Correção aplicada, aguardando deploy
