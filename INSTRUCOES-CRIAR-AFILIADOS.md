# 📋 Como Criar Afiliados - KaiNow Saúde

## ✅ SISTEMA FUNCIONANDO

A página para criar afiliados está funcionando perfeitamente!

---

## 🚀 Acesso Rápido

### **Pelo Dashboard (RECOMENDADO):**

1. Acesse: `https://kainow.com.br/admin/dashboard-admin.html`
2. Na seção **"Ações Rápidas"**, clique em:
   - **"Criar Novo Afiliado"** (botão roxo com gradiente)

### **Acesso Direto:**
```
https://kainow.com.br/admin/criar-afiliado-simples.html
```

---

## 📝 Como Criar um Afiliado

### **Exemplo: Criar "teste1"**

1. **Acesse o painel de criação** (pelo dashboard ou link direto)

2. **Preencha os campos:**

   | Campo | Valor de Exemplo |
   |-------|------------------|
   | **Username** | teste1 |
   | **Senha** | kainowjaih9i |
   | **Nome Completo** | jose silva |
   | **Email** | teste@email.com |
   | **CPF** | 000.000.000-00 |
   | **Telefone** | (00)00000-0000 |
   | **Chave PIX** | 11013430794 |
   | **Comissão (%)** | 20 |

3. **Clique em "Criar Afiliado"**

4. **Aguarde confirmação:**
   - ✅ Mensagem verde = Sucesso!
   - ❌ Mensagem vermelha = Erro (veja a mensagem)

5. **Anote as credenciais mostradas**

6. **Teste o login em:**
   ```
   https://kainow.com.br/afiliado/login.html
   ```

---

## 🎯 Dados do Afiliado "teste1"

Para criar exatamente o afiliado que você mencionou:

```
Username: teste1
Senha: kainowjaih9i
Nome: jose silva
Email: teste@email.com
CPF: 000.000.000-00
Telefone: (00)00000-0000
PIX: 11013430794
Comissão: 20%
```

---

## ⚠️ Erros Comuns

### **1. "Username já existe"**
- **Problema:** O username "teste1" já foi criado antes
- **Solução:** Use outro username (ex: teste2, teste3) ou delete o anterior

### **2. "Permission denied"**
- **Problema:** Regras do Firestore estão bloqueando
- **Solução:** 
  1. Acesse: `https://console.firebase.google.com/project/kainowsaude/firestore/rules`
  2. Configure: `allow read, write: if true;`
  3. Publique as regras
  4. Aguarde 5 minutos

### **3. "Servidor indisponível"**
- **Problema:** Conexão temporária com Firebase
- **Solução:** Aguarde 1-2 minutos e tente novamente

---

## 🔍 Verificar Afiliados Criados

### **Opção 1: Firebase Console**
1. Acesse: `https://console.firebase.google.com/project/kainowsaude/firestore/data`
2. Clique em collection **"affiliates"**
3. Veja todos os documentos criados

### **Opção 2: Ferramenta de Verificação**
```
https://kainow.com.br/admin/verificar-afiliados.html
```
- Clique em "Carregar Todos os Afiliados"
- Ou busque por username específico

---

## 📱 Testar Login do Afiliado

Após criar, teste imediatamente:

1. Acesse: `https://kainow.com.br/afiliado/login.html`
2. Digite o **username** e **senha** que você criou
3. Clique em "Entrar"
4. Deve abrir o **dashboard do afiliado**

---

## 🎨 Outros Botões do Dashboard

No dashboard-admin.html, você tem:

| Botão | Função |
|-------|--------|
| **Adicionar Novo Produto** | Gerencia os 6 programas KaiNow |
| **Criar Novo Afiliado** | Cria afiliados individuais |
| **Gerenciar Afiliados** | Lista e edita afiliados existentes |
| **Ver Site Público** | Abre o site principal |
| **Exportar Dados** | Baixa JSON com todos os dados |

---

## ✅ Checklist de Criação

- [ ] Acesso ao dashboard-admin.html
- [ ] Clique em "Criar Novo Afiliado"
- [ ] Preencha todos os campos obrigatórios
- [ ] Clique em "Criar Afiliado"
- [ ] Veja mensagem de sucesso
- [ ] Anote username e senha
- [ ] Teste login do afiliado
- [ ] Confirme acesso ao dashboard

---

## 🆘 Precisa de Ajuda?

### **Ferramenta de Diagnóstico:**
```
https://kainow.com.br/admin/verificar-afiliados.html
```
Esta ferramenta mostra:
- Todos os afiliados cadastrados
- Busca por username específico
- Verifica se dados estão corretos
- Testa credenciais de login

---

## 📊 Estrutura de Dados

Cada afiliado tem 13 campos:

```javascript
{
  username: "teste1",          // para login
  password: "kainowjaih9i",    // senha em texto
  name: "jose silva",          // nome completo
  email: "teste@email.com",    // contato
  cpf: "000.000.000-00",       // identificação
  phone: "(00)00000-0000",     // contato
  pixKey: "11013430794",       // para pagamento
  commission: 20,              // % de comissão
  active: true,                // status ativo/inativo
  sales: 0,                    // contador de vendas
  totalCommission: 0,          // total ganho
  created_at: timestamp,       // data de criação
  lastLogin: null              // último acesso
}
```

---

## 🎯 Resumo Rápido

1. **Acesse:** `https://kainow.com.br/admin/dashboard-admin.html`
2. **Clique:** "Criar Novo Afiliado"
3. **Preencha:** Todos os campos
4. **Crie:** Clique no botão
5. **Teste:** Login em `/afiliado/login.html`

---

**Tudo pronto para criar afiliados!** 🚀
