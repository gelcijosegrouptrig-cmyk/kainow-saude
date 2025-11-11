# 🚨 CONFIGURAR REGRAS DO FIRESTORE - URGENTE

## ❌ PROBLEMA IDENTIFICADO

O afiliado `gelcijosegrouptrig` **NÃO foi salvo** no Firestore porque as regras de segurança podem estar bloqueando a escrita.

---

## ✅ SOLUÇÃO: Atualizar Regras

### 1️⃣ Acesse o Firebase Console

```
https://console.firebase.google.com
```

### 2️⃣ Selecione seu projeto

```
kainowsaude
```

### 3️⃣ Vá em Firestore Database

- Menu lateral esquerdo
- Clique em **"Firestore Database"**

### 4️⃣ Clique em "Rules" (Regras)

- Aba superior: **"Rules"**

### 5️⃣ Copie e cole estas regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita em affiliates
    match /affiliates/{document=**} {
      allow read, write: if true;
    }
    
    // Permitir leitura e escrita em todas as coleções (temporário para desenvolvimento)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 6️⃣ Clique em "Publish" (Publicar)

### 7️⃣ Aguarde 10 segundos

As regras levam alguns segundos para propagar.

---

## 🔍 REGRAS ATUAIS POSSÍVEIS

Se você ver algo assim, **está bloqueado**:

```javascript
// ❌ ERRADO - Bloqueia tudo
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ← BLOQUEIA TUDO!
    }
  }
}
```

---

## ✅ REGRAS CORRETAS (Modo Desenvolvimento)

```javascript
// ✅ CORRETO - Permite tudo (desenvolvimento)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ← PERMITE TUDO
    }
  }
}
```

---

## 🔐 REGRAS SEGURAS (Produção - Futuro)

Quando o sistema estiver pronto, use regras mais seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Affiliates: Permitir leitura/escrita com autenticação
    match /affiliates/{affiliateId} {
      // Permitir leitura se estiver autenticado
      allow read: if request.auth != null;
      
      // Permitir criação (para admin)
      allow create: if true;
      
      // Permitir atualização apenas do próprio documento
      allow update: if request.auth != null 
                    && request.auth.uid == resource.data.uid;
      
      // Permitir exclusão apenas admin
      allow delete: if false;
    }
    
    // Outras coleções
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🧪 TESTAR SE FUNCIONOU

Depois de atualizar as regras:

### 1. Aguarde 10 segundos

### 2. Abra a ferramenta de criar afiliado:
```
admin/criar-afiliado-auto.html
```

### 3. Tente criar o afiliado novamente:
```
Nome: GELCI JOSE DA SILVA
Email: gelci.jose.grouptrig@gmail.com
CPF: 110.134.307-94
Telefone: 11982142014
PIX: 11013430794
Comissão: 20
```

### 4. Se der sucesso:
- ✅ Aparecerá "CONFIRMADO NO FIRESTORE"
- ✅ Poderá fazer login

### 5. Se ainda falhar:
- Verifique o console do navegador (F12)
- Procure por erros de permissão
- Me envie o erro

---

## 📊 VERIFICAR REGRAS ATUAIS

Para ver suas regras atuais:

1. Firebase Console
2. Firestore Database
3. Aba "Rules"
4. Veja o que está escrito

**Me diga o que você vê lá!**

---

## ⚡ RESUMO RÁPIDO

```
1. Firebase Console → Firestore Database
2. Aba "Rules"
3. Copiar e colar regras com "allow read, write: if true"
4. Publicar
5. Aguardar 10 segundos
6. Tentar criar afiliado novamente
```

---

## 🎯 PRÓXIMO PASSO

**Depois de atualizar as regras:**

Tente criar o afiliado novamente e me diga:
- ✅ Funcionou?
- ❌ Ainda dá erro?
- 📸 Screenshot do erro (se houver)

---

**FAÇA ISSO AGORA E ME AVISE! 🚀**
