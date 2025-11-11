# 🛠️ Ferramentas Administrativas - Kainow Saúde

## 🎯 FERRAMENTAS PRINCIPAIS (Use estas!)

### **1. 🚀 Criar Afiliado (Automático)**
**Arquivo:** `criar-afiliado-auto.html`  
**Uso:** Criar novos afiliados com geração automática de credenciais

**Features:**
- ✅ Gera username automaticamente (nome + sobrenome + 3 dígitos)
- ✅ Gera senha automática (kainow + 8 caracteres)
- ✅ Verificação automática após criação
- ✅ Confirmação visual: "CONFIRMADO NO FIRESTORE"
- ✅ Mostra ID do documento criado
- ✅ Botão para testar login imediatamente
- ✅ Botão para ver no sistema de busca
- ✅ Copiar mensagem WhatsApp formatada

**Quando usar:**
- ✅ Sempre que precisar criar um novo afiliado
- ✅ Primeira opção recomendada

---

### **2. 🔍 Buscar Afiliado**
**Arquivo:** `buscar-afiliado.html`  
**Uso:** Encontrar e diagnosticar afiliados no sistema

**Features:**
- ✅ Buscar por: username, email, CPF, nome
- ✅ Listar TODOS os afiliados
- ✅ Ver todos os 13 campos do afiliado
- ✅ Testar login com 1 clique
- ✅ Copiar credenciais automaticamente
- ✅ Verificar se afiliado existe no Firestore
- ✅ Ver datas de criação e último login

**Quando usar:**
- ✅ Afiliado relata "usuário não encontrado"
- ✅ Verificar se afiliado foi criado corretamente
- ✅ Conferir dados salvos no Firestore
- ✅ Encontrar credenciais de um afiliado
- ✅ Fazer manutenção periódica

---

### **3. ⚙️ Gerenciar Afiliados**
**Arquivo:** `gerenciar-afiliados.html`  
**Uso:** Administração completa de afiliados

**Features:**
- ✅ Listar todos os afiliados
- ✅ Editar dados
- ✅ Ativar/desativar
- ✅ Ver estatísticas
- ✅ Gerenciar comissões
- ✅ Exportar dados

**Quando usar:**
- ✅ Alterar dados de afiliados existentes
- ✅ Ativar/desativar afiliados
- ✅ Ver relatórios e estatísticas

---

### **4. 📦 Gerenciar Produtos**
**Arquivo:** `gerenciar-produtos.html`  
**Uso:** Administração dos programas/produtos

**Features:**
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Definir preços
- ✅ Configurar comissões

---

### **5. 🏠 Dashboard Admin**
**Arquivo:** `dashboard-admin.html`  
**Uso:** Painel principal de administração

**Features:**
- ✅ Visão geral do sistema
- ✅ Estatísticas em tempo real
- ✅ Acesso rápido a todas ferramentas
- ✅ Cards com totais (produtos, afiliados, links)

---

## 🔧 FERRAMENTAS DE DIAGNÓSTICO

### **6. 🔬 Diagnóstico Completo**
**Arquivo:** `diagnostico-completo.html`  
**Uso:** Verificar saúde do sistema

**Features:**
- ✅ Testar conexão Firebase
- ✅ Verificar regras do Firestore
- ✅ Listar todos afiliados
- ✅ Diagnosticar problemas

**Quando usar:**
- ⚠️ Sistema apresentando erros
- ⚠️ Afiliados não conseguem logar
- ⚠️ Dados não salvando

---

### **7. ✅ Verificar e Corrigir**
**Arquivo:** `verificar-e-corrigir.html`  
**Uso:** Corrigir problemas específicos

**Features:**
- ✅ Buscar afiliados com problema
- ✅ Corrigir dados
- ✅ Resetar senhas
- ✅ Verificar integridade

**Quando usar:**
- ⚠️ Afiliado com dados corrompidos
- ⚠️ Senha não funciona
- ⚠️ Problemas específicos

---

### **8. 🔄 Migrar para Firebase**
**Arquivo:** `migrar-para-firebase.html`  
**Uso:** Migrar dados de localStorage para Firestore

**Features:**
- ✅ Detectar afiliados no localStorage
- ✅ Migrar para Firestore
- ✅ Verificar migração
- ✅ Backup automático

**Quando usar:**
- 🆕 Primeira configuração do sistema
- 🔄 Migração de dados antigos

---

## 📊 FERRAMENTAS DE CRIAÇÃO ALTERNATIVAS

### **9. 📝 Criar Afiliado Simples**
**Arquivo:** `criar-afiliado-simples.html`  
**Uso:** Criação manual (sem automação)

**Quando usar:**
- ✋ Preferir definir username e senha manualmente
- ✋ Casos especiais

---

### **10. 📋 Criar Afiliados em Massa**
**Arquivo:** `criar-afiliados-massa.html`  
**Uso:** Criar múltiplos afiliados de uma vez

**Features:**
- ✅ Upload de planilha
- ✅ Criação em lote
- ✅ Validação automática

**Quando usar:**
- 📈 Precisa criar 10+ afiliados
- 📈 Importar lista existente

---

## ⚠️ FERRAMENTAS ANTIGAS (NÃO USE)

Estas ferramentas foram substituídas pelas versões novas acima:

- ❌ `criar-afiliados-teste.html` - Use `criar-afiliado-auto.html`
- ❌ `criar-afiliado-garantido.html` - Use `criar-afiliado-auto.html`
- ❌ `criar-teste1-agora.html` - Use `criar-afiliado-auto.html`
- ❌ `corrigir-senha-teste1.html` - Use `verificar-e-corrigir.html`
- ❌ `verificar-afiliados.html` - Use `buscar-afiliado.html`
- ❌ `diagnostico.html` - Use `diagnostico-completo.html`

---

## 🎯 FLUXO RECOMENDADO DE TRABALHO

### **📋 Para criar um novo afiliado:**

```
1. Abrir: dashboard-admin.html
   ↓
2. Clicar: "Criar Novo Afiliado (Auto)"
   ↓
3. Preencher dados e criar
   ↓
4. Aguardar confirmação "CONFIRMADO NO FIRESTORE"
   ↓
5. Clicar: "Ver no Sistema"
   ↓
6. Confirmar que aparece nos resultados
   ↓
7. Clicar: "Testar Login"
   ↓
8. Se funciona: usar "Copiar Mensagem WhatsApp"
   ↓
9. Enviar credenciais ao afiliado
```

---

### **🔍 Para resolver "usuário não encontrado":**

```
1. Abrir: buscar-afiliado.html
   ↓
2. Buscar por username
   ↓
3. SE ENCONTROU:
   - Usar "Testar Login" da ferramenta
   - Copiar credenciais exatas
   - Enviar novamente ao afiliado
   ↓
4. SE NÃO ENCONTROU:
   - Verificar regras Firestore
   - Criar afiliado novamente
   - Usar criar-afiliado-auto.html
```

---

### **⚙️ Para manutenção periódica:**

```
1. Abrir: buscar-afiliado.html
   ↓
2. Selecionar: "Listar TODOS os afiliados"
   ↓
3. Revisar:
   - Quais estão ativos
   - Últimos logins
   - Dados inconsistentes
   ↓
4. Se necessário:
   - Usar gerenciar-afiliados.html para editar
   - Usar verificar-e-corrigir.html para corrigir
```

---

## 🚀 ACESSO RÁPIDO

### **URLs Diretas (Local):**

```
Dashboard:          admin/dashboard-admin.html
Criar Afiliado:     admin/criar-afiliado-auto.html
Buscar Afiliado:    admin/buscar-afiliado.html
Gerenciar:          admin/gerenciar-afiliados.html
Diagnóstico:        admin/diagnostico-completo.html
```

### **URLs Produção:**

```
Dashboard:          https://kainow.com.br/admin/dashboard-admin.html
Criar Afiliado:     https://kainow.com.br/admin/criar-afiliado-auto.html
Buscar Afiliado:    https://kainow.com.br/admin/buscar-afiliado.html
Gerenciar:          https://kainow.com.br/admin/gerenciar-afiliados.html
Diagnóstico:        https://kainow.com.br/admin/diagnostico-completo.html
```

---

## 📱 ATALHOS DO DASHBOARD

No dashboard admin, use estes botões:

```
┌────────────────────────────────────────────┐
│                                            │
│  [➕] Adicionar Novo Produto              │
│  [✨] Criar Novo Afiliado (Auto)          │  ← Mais usado
│  [🔍] Buscar Afiliado                     │  ← Diagnóstico
│  [⚙️] Gerenciar Afiliados                 │
│  [🌐] Ver Site Público                    │
│  [📥] Exportar Dados                      │
│                                            │
└────────────────────────────────────────────┘
```

---

## 💡 DICAS DE USO

### **✅ Sempre verifique após criar:**

Após criar qualquer afiliado, **sempre**:
1. Use "Ver no Sistema" (busca automática)
2. Confirme que aparece nos resultados
3. Teste o login antes de enviar credenciais

### **🔍 Use a busca para tudo:**

A ferramenta `buscar-afiliado.html` é sua melhor amiga:
- 🔍 Encontrar afiliados rapidamente
- 🔍 Verificar dados salvos
- 🔍 Diagnosticar problemas de login
- 🔍 Copiar credenciais corretas

### **📋 Manutenção semanal:**

1. Abra `buscar-afiliado.html`
2. Selecione "Listar TODOS"
3. Revise a lista completa
4. Verifique afiliados inativos
5. Confirme que dados estão corretos

---

## 🆘 TROUBLESHOOTING

### **Problema: Afiliado não consegue logar**

**Solução:**
1. ✅ Abra `buscar-afiliado.html`
2. ✅ Busque por username
3. ✅ Se encontrar: use "Testar Login"
4. ✅ Se não encontrar: afiliado não foi criado
5. ✅ Crie novamente com `criar-afiliado-auto.html`

---

### **Problema: Dashboard não mostra afiliados**

**Solução:**
1. ✅ Abra `diagnostico-completo.html`
2. ✅ Clique "Testar Conexão Firebase"
3. ✅ Verifique regras do Firestore
4. ✅ Confirme que tem afiliados no banco

---

### **Problema: Erro ao criar afiliado**

**Solução:**
1. ✅ Verifique regras Firestore: `allow write: if true;`
2. ✅ Teste conexão no `diagnostico-completo.html`
3. ✅ Tente criar novamente
4. ✅ Use `buscar-afiliado.html` para verificar

---

## 📞 SUPORTE

### **Documentação Completa:**

- 📄 `README.md` - Visão geral do sistema
- 📄 `🔍-RESOLVER-USUARIO-NAO-ENCONTRADO.md` - Guia de troubleshooting
- 📄 `✅-FIREBASE-CONFIGURADO.md` - Setup Firebase
- 📄 `GUIA-FIREBASE-COMPLETO.md` - Guia completo Firebase

### **Links Úteis:**

- [Firebase Console](https://console.firebase.google.com)
- [Woovi Docs](https://developers.woovi.com)
- [Dashboard Local](admin/dashboard-admin.html)

---

## 🎉 RESUMO

### **Use sempre:**
1. ✅ `criar-afiliado-auto.html` - Para criar
2. ✅ `buscar-afiliado.html` - Para verificar e diagnosticar
3. ✅ `dashboard-admin.html` - Para navegar

### **Use quando necessário:**
4. ⚙️ `gerenciar-afiliados.html` - Para editar
5. 🔬 `diagnostico-completo.html` - Para troubleshooting
6. ✅ `verificar-e-corrigir.html` - Para corrigir problemas

### **Nunca use:**
❌ Ferramentas antigas (criar-afiliados-teste, criar-teste1-agora, etc.)

---

**🚀 Sistema completo e profissional!**

Com essas ferramentas você tem:
- ✅ Criação rápida e confiável
- ✅ Diagnóstico completo
- ✅ Busca e verificação
- ✅ Correção de problemas
- ✅ Manutenção fácil

**Nunca mais terá problemas com afiliados!** 🎯
