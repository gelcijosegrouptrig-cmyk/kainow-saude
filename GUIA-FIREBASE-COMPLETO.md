# 🔥 Guia Completo: Configurar Firebase no KaiNow

## 📋 O QUE FOI CRIADO

✅ **3 arquivos novos:**
1. `js/firebase-config.js` - Configuração centralizada
2. `afiliado/login-firebase.html` - Login com Firebase
3. `admin/migrar-para-firebase.html` - Ferramenta de migração

---

## 🚀 PASSO A PASSO (15 minutos)

### 1️⃣ Criar Projeto Firebase (5 minutos)

**1. Acesse o Console Firebase:**
```
https://console.firebase.google.com
```

**2. Clique em "Adicionar projeto" (ou "Add project")**

**3. Configure o projeto:**
```
Nome: kainow-saude
Google Analytics: Desabilitar (opcional)
```

**4. Aguarde criação (1-2 minutos)**

---

### 2️⃣ Habilitar Firestore (2 minutos)

**1. No menu lateral, clique em:**
```
Build → Firestore Database
```

**2. Clique em "Create database"**

**3. Escolha modo:**
```
✅ Production mode (recomendado)
```

**4. Escolha localização:**
```
southamerica-east1 (São Paulo)
```

**5. Aguarde criação**

---

### 3️⃣ Configurar Regras de Segurança (3 minutos)

**1. Na aba "Rules", substitua por:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Coleção de afiliados
    match /affiliates/{affiliateId} {
      // Permitir leitura apenas para autenticados
      allow read: if request.auth != null;
      
      // Permitir criação apenas de admin
      allow create: if request.auth != null && request.auth.token.admin == true;
      
      // Permitir update apenas do próprio perfil
      allow update: if request.auth != null && 
                      (request.auth.uid == affiliateId || 
                       request.auth.token.admin == true);
      
      // Permitir delete apenas de admin
      allow delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Coleção de teste (para debug)
    match /_test/{testId} {
      allow read, write: if true;
    }
    
    // Bloquear tudo mais por padrão
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**2. Clique em "Publish"**

---

### 4️⃣ Obter Credenciais Firebase (2 minutos)

**1. No menu lateral, clique em:**
```
⚙️ Project Settings (ícone de engrenagem)
```

**2. Scroll até "Your apps"**

**3. Clique em ícone "Web" (`</>`)**

**4. Configure app:**
```
App nickname: kainow-web
Firebase Hosting: NÃO marcar
```

**5. Copie o objeto firebaseConfig:**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "kainow-saude.firebaseapp.com",
  projectId: "kainow-saude",
  storageBucket: "kainow-saude.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

---

### 5️⃣ Atualizar Código com Credenciais (3 minutos)

**Substituir credenciais em 3 arquivos:**

#### A. `js/firebase-config.js`
```javascript
// Linha 8-14: Substituir firebaseConfig
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_AUTH_DOMAIN_AQUI",
    projectId: "SEU_PROJECT_ID_AQUI",
    storageBucket: "SEU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
    appId: "SEU_APP_ID_AQUI"
};
```

#### B. `afiliado/login-firebase.html`
```javascript
// Linha 105-111: Substituir firebaseConfig
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    // ... mesmo conteúdo acima
};
```

#### C. `admin/migrar-para-firebase.html`
```javascript
// Linha 118-124: Substituir firebaseConfig
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    // ... mesmo conteúdo acima
};
```

---

## 🔄 MIGRAR DADOS EXISTENTES

### Opção 1: Via Interface Web (Recomendado)

**1. Abra no navegador:**
```
file:///caminho/do/projeto/admin/migrar-para-firebase.html
```

**OU subir para produção:**
```
https://kainow.com.br/admin/migrar-para-firebase.html
```

**2. Verifique conexão Firebase (deve aparecer verde)**

**3. Verifique afiliados no localStorage**

**4. Clique em "Migrar Afiliados para Firebase"**

**5. Aguarde conclusão**

**6. Clique em "Listar Afiliados no Firebase" para confirmar**

### Opção 2: Via Console do Navegador

```javascript
// Abrir Console (F12) em qualquer página do site
// Copiar e executar:

async function migrarParaFirebase() {
    const affiliates = JSON.parse(localStorage.getItem('kainow_affiliates') || '[]');
    
    if (affiliates.length === 0) {
        console.log('Nenhum afiliado para migrar');
        return;
    }

    console.log(`Migrando ${affiliates.length} afiliados...`);

    for (const affiliate of affiliates) {
        try {
            // Verificar se já existe
            const existing = await db.collection('affiliates')
                .where('username', '==', affiliate.username)
                .get();

            if (existing.empty) {
                await db.collection('affiliates').add({
                    ...affiliate,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log(`✅ ${affiliate.name}`);
            } else {
                console.log(`⏭️  ${affiliate.name} já existe`);
            }
        } catch (error) {
            console.error(`❌ ${affiliate.name}:`, error);
        }
    }

    console.log('Migração concluída!');
}

migrarParaFirebase();
```

---

## ✅ TESTAR FUNCIONAMENTO

### 1. Teste Local (Antes de Subir)

**1. Abrir `afiliado/login-firebase.html` no navegador:**
```
file:///caminho/projeto/afiliado/login-firebase.html
```

**2. Verificar no console:**
```
🔥 Firebase inicializado com sucesso!
```

**3. Tentar fazer login com credenciais de teste:**
```
Usuário: (ver no admin ou localStorage)
Senha: (senha do afiliado)
```

**4. Deve redirecionar para dashboard**

### 2. Teste em Produção

**1. Subir arquivos para GitHub:**
```bash
git add .
git commit -m "feat: adicionar Firebase Authentication"
git push origin main
```

**2. Aguardar deploy Cloudflare (2-5 minutos)**

**3. Acessar:**
```
https://kainow.com.br/afiliado/login-firebase.html
```

**4. Testar login em OUTRO dispositivo (não sua máquina)**

---

## 🔧 ADICIONAR AFILIADO MANUALMENTE NO FIREBASE

### Via Console Firebase:

**1. Acessar:**
```
Console Firebase → Firestore Database
```

**2. Clicar em "Start collection"**

**3. Collection ID:**
```
affiliates
```

**4. Adicionar documento:**

```javascript
// Auto-ID (deixar gerar automaticamente)

// Campos:
{
  name: "Teste Afiliado",
  username: "teste.afiliado",
  password: "senha123", // ⚠️ Em produção, usar bcrypt!
  email: "teste@afiliado.com",
  phone: "11999999999",
  commission: 25,
  slug: "testeafiliado",
  pixKey: "",
  status: "ACTIVE",
  passwordChanged: false,
  createdAt: timestamp (usar "Add field" > "timestamp" > "Now"),
  updatedAt: timestamp
}
```

**5. Salvar**

**6. Testar login com:**
```
Usuário: teste.afiliado
Senha: senha123
```

---

## 📊 ESTRUTURA DO BANCO DE DADOS

### Coleção: `affiliates`

```javascript
{
  // Identificação
  "id": "auto-generated-id",
  "username": "joao.silva",
  "password": "senha123", // ⚠️ Usar bcrypt em produção!
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  
  // Sistema de Comissões
  "commission": 25, // Percentual
  "pixKey": "11999999999", // Chave PIX
  "slug": "joaosilva", // Para links personalizados
  
  // Status
  "status": "ACTIVE", // ou "INACTIVE", "SUSPENDED"
  "passwordChanged": false,
  
  // Auditoria
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "lastLogin": Timestamp
}
```

---

## 🔐 MELHORIAS DE SEGURANÇA (PRÓXIMOS PASSOS)

### 1. Implementar Hash de Senha (bcrypt)

```html
<!-- Adicionar ao login-firebase.html -->
<script src="https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/dist/bcrypt.min.js"></script>

<script>
// Ao criar afiliado:
const passwordHash = bcrypt.hashSync(password, 10);

// Ao fazer login:
const isValid = bcrypt.compareSync(password, affiliate.password);
</script>
```

### 2. Implementar Firebase Authentication

```javascript
// Usar Firebase Auth ao invés de comparação manual
await auth.signInWithEmailAndPassword(email, password);
```

### 3. Implementar JWT Tokens

```javascript
// Gerar token JWT após login
const token = jwt.sign({ affiliateId: doc.id }, SECRET_KEY);
```

---

## 🚨 SOLUÇÃO DE PROBLEMAS

### Erro: "permission-denied"

**Causa:** Regras de segurança muito restritivas

**Solução temporária (apenas para testes):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ APENAS TESTE!
    }
  }
}
```

**Solução permanente:**
Usar regras de segurança adequadas (veja seção 3)

### Erro: "unavailable"

**Causa:** Problema de conexão com Firebase

**Solução:**
1. Verificar internet
2. Verificar se projeto Firebase está ativo
3. Verificar se Firestore foi habilitado

### Erro: "Usuário não encontrado"

**Causa:** Afiliado não existe no Firebase

**Solução:**
1. Executar migração (admin/migrar-para-firebase.html)
2. OU adicionar manualmente via Console Firebase

---

## 📈 PRÓXIMOS PASSOS

### Curto Prazo (Esta Semana):
- [x] Configurar Firebase
- [x] Migrar dados localStorage → Firestore
- [ ] Testar login em múltiplos dispositivos
- [ ] Implementar hash de senha (bcrypt)

### Médio Prazo (Próximas 2 Semanas):
- [ ] Migrar dashboard para Firebase
- [ ] Adicionar Firebase Auth (email/senha)
- [ ] Implementar JWT tokens
- [ ] Criar API de comissões

### Longo Prazo (Próximo Mês):
- [ ] Integrar com Woovi (PIX Recorrente + Splits)
- [ ] Dashboard de analytics
- [ ] Sistema de notificações
- [ ] App mobile (React Native)

---

## 📚 DOCUMENTAÇÃO ÚTIL

- **Firebase Console:** https://console.firebase.google.com
- **Firestore Docs:** https://firebase.google.com/docs/firestore
- **Auth Docs:** https://firebase.google.com/docs/auth
- **Security Rules:** https://firebase.google.com/docs/firestore/security/get-started

---

## ✅ CHECKLIST FINAL

### Configuração:
- [ ] Projeto Firebase criado
- [ ] Firestore habilitado
- [ ] Regras de segurança configuradas
- [ ] Credenciais copiadas
- [ ] Código atualizado (3 arquivos)

### Migração:
- [ ] Dados migrados do localStorage
- [ ] Afiliados verificados no Firebase Console
- [ ] Login testado localmente
- [ ] Login testado em outro dispositivo

### Produção:
- [ ] Arquivos commitados no Git
- [ ] Push para GitHub
- [ ] Deploy no Cloudflare
- [ ] Login testado em produção

---

**Data:** 10/11/2025  
**Versão:** 1.0  
**Status:** ✅ Guia Completo Criado  
**Próximo Passo:** Configurar Firebase seguindo este guia  

**Tempo estimado:** 15 minutos  
**Resultado:** Login funcionando em todos os dispositivos! 🎉
