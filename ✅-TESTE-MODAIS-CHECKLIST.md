# ✅ CHECKLIST DE TESTE - SISTEMA DE MODAIS

**Use este checklist para validar o sistema de modais**

---

## 🔐 AUTH MODAL (Login/Cadastro)

### **Abrir Modal de Login**
- [ ] Clicar em botão "Entrar" no header
- [ ] Modal aparece com animação fadeIn + slideUp
- [ ] Background escuro com blur
- [ ] Loading spinner visível
- [ ] Iframe carrega `login.html`
- [ ] Loading desaparece após ~1 segundo
- [ ] Formulário de login visível

### **Testar Login**
- [ ] Inserir CPF: `111.444.777-35`
- [ ] Inserir Senha: `teste123`
- [ ] Clicar em "Entrar"
- [ ] Login realizado com sucesso
- [ ] Modal fecha automaticamente
- [ ] Nome "Usuário Teste" aparece no header

### **Abrir Modal de Cadastro**
- [ ] Clicar em botão "Cadastrar" no header
- [ ] Modal aparece com animação
- [ ] Iframe carrega `cadastro.html`
- [ ] Formulário de cadastro visível

### **Fechar Modal (3 formas)**
- [ ] Clicar no botão X → Modal fecha
- [ ] Pressionar tecla ESC → Modal fecha
- [ ] Clicar fora do modal (overlay) → Modal fecha
- [ ] Iframe src é limpo (verificar DevTools)
- [ ] Body volta a ter scroll

---

## 💝 PROGRAM MODAL (6 Programas)

### **Abrir Dropdown**
- [ ] Clicar em "Programas" no header
- [ ] Dropdown abre com 6 programas
- [ ] Ícones corretos para cada programa

### **Testar KaiNow Mulher**
- [ ] Clicar em "KaiNow Mulher"
- [ ] Modal abre com header rosa-roxo
- [ ] Ícone fa-venus visível
- [ ] Título "KaiNow Mulher" correto
- [ ] Iframe carrega `programa-mulher.html`
- [ ] Dropdown fecha automaticamente

### **Testar KaiNow Sênior**
- [ ] Clicar em "KaiNow Sênior"
- [ ] Header muda para âmbar-laranja
- [ ] Ícone fa-user-shield visível
- [ ] Título "KaiNow Sênior" correto

### **Testar KaiNow Farma**
- [ ] Clicar em "KaiNow Farma"
- [ ] Header muda para verde-esmeralda
- [ ] Ícone fa-pills visível
- [ ] Título "KaiNow Farma" correto

### **Testar KaiNow Acolher**
- [ ] Clicar em "KaiNow Acolher"
- [ ] Header muda para azul-índigo
- [ ] Ícone fa-hands-holding-child visível
- [ ] Título "KaiNow Acolher" correto

### **Testar KaiNow Orienta**
- [ ] Clicar em "KaiNow Orienta"
- [ ] Header muda para roxo-violeta
- [ ] Ícone fa-lightbulb visível
- [ ] Título "KaiNow Orienta" correto

### **Testar KaiNow Viva Leve**
- [ ] Clicar em "KaiNow Viva Leve"
- [ ] Header muda para teal-ciano
- [ ] Ícone fa-spa visível
- [ ] Título "KaiNow Viva Leve" correto

---

## 🏥 SPECIALTY MODAL (37 Especialidades)

### **Abrir Dropdown**
- [ ] Clicar em "Especialidades" no header
- [ ] Dropdown abre com lista scrollable
- [ ] 37 especialidades visíveis
- [ ] Scroll funciona no dropdown

### **Testar Cardiologia**
- [ ] Clicar em "Cardiologia"
- [ ] Modal abre com header vermelho-rosa
- [ ] Ícone fa-heartbeat visível
- [ ] Título "Cardiologia" correto
- [ ] Iframe carrega `especialidade-cardiologia.html`
- [ ] Dropdown fecha automaticamente

### **Testar Neurologia**
- [ ] Clicar em "Neurologia"
- [ ] Header muda para violeta-roxo
- [ ] Ícone fa-brain visível
- [ ] Título "Neurologia" correto

### **Testar Pediatria**
- [ ] Clicar em "Pediatria"
- [ ] Header muda para azul-ciano
- [ ] Ícone fa-baby-carriage visível
- [ ] Título "Pediatria" correto

### **Testar Oftalmologia**
- [ ] Clicar em "Oftalmologia"
- [ ] Header muda para céu-azul
- [ ] Ícone fa-eye visível
- [ ] Título "Oftalmologia" correto

### **Testar Dermatologia**
- [ ] Clicar em "Dermatologia"
- [ ] Header muda para âmbar-laranja
- [ ] Ícone fa-hand-holding-medical visível
- [ ] Título "Dermatologia" correto

### **Testar mais 5 especialidades aleatórias**
- [ ] Especialidade 1: Cores e ícone corretos
- [ ] Especialidade 2: Cores e ícone corretos
- [ ] Especialidade 3: Cores e ícone corretos
- [ ] Especialidade 4: Cores e ícone corretos
- [ ] Especialidade 5: Cores e ícone corretos

---

## 📱 TESTE MOBILE

### **Auth Modal Mobile**
- [ ] Modal ocupa 100% da tela (fullscreen)
- [ ] Sem bordas arredondadas
- [ ] Header fixo no topo
- [ ] Iframe ocupa altura restante
- [ ] Scroll funciona dentro do iframe

### **Program Modal Mobile**
- [ ] Modal fullscreen
- [ ] Cores dinâmicas funcionam
- [ ] Fechar com X funciona
- [ ] Navegação dentro do iframe funciona

### **Specialty Modal Mobile**
- [ ] Modal fullscreen
- [ ] Dropdown scrollable funciona
- [ ] Cores dinâmicas funcionam
- [ ] Fechar funciona

### **Orientação do Dispositivo**
- [ ] Portrait: Modal fullscreen correto
- [ ] Landscape: Modal fullscreen correto
- [ ] Rotação: Sem quebras de layout

---

## 🎨 TESTE VISUAL

### **Animações**
- [ ] Modal aparece com fadeIn suave
- [ ] Card sobe com slideUp suave
- [ ] Loading spinner gira corretamente
- [ ] Transição de cores suave

### **Cores e Gradientes**
- [ ] Gradientes aplicados corretamente
- [ ] Cores combinam com o tema do item
- [ ] Header colorido contrasta bem com branco

### **Tipografia**
- [ ] Títulos legíveis
- [ ] Ícones do tamanho correto
- [ ] Textos alinhados corretamente

---

## 🐛 TESTE DE BUGS

### **Múltiplas Aberturas**
- [ ] Abrir e fechar modal 5× seguidas → Funciona
- [ ] Abrir um modal, fechar, abrir outro → Funciona
- [ ] Alternar entre modais rapidamente → Sem erros

### **Scroll**
- [ ] Body não tem scroll quando modal aberto
- [ ] Body recupera scroll ao fechar modal
- [ ] Iframe tem scroll interno quando necessário

### **Console**
- [ ] Abrir DevTools (F12)
- [ ] Testar todos os modais
- [ ] Verificar se há erros no console
- [ ] Não deve haver erros vermelhos

### **Performance**
- [ ] Modais abrem rapidamente (<500ms)
- [ ] Animações são suaves (60fps)
- [ ] Carregamento de iframe aceitável (<2s)

---

## ⚙️ TESTE DE FUNCIONALIDADE

### **Navegação dentro do Modal**
- [ ] Clicar em links dentro do iframe
- [ ] Links funcionam corretamente
- [ ] Formulários podem ser preenchidos
- [ ] Botões respondem ao click

### **Integração com Sistema**
- [ ] Login pelo modal atualiza header
- [ ] Logout funciona corretamente
- [ ] Dashboard acessível após login
- [ ] Navegação entre áreas funcionando

---

## 🌐 TESTE CROSS-BROWSER

### **Chrome**
- [ ] Auth Modal funciona
- [ ] Program Modal funciona
- [ ] Specialty Modal funciona
- [ ] Animações suaves

### **Firefox**
- [ ] Auth Modal funciona
- [ ] Program Modal funciona
- [ ] Specialty Modal funciona
- [ ] Animações suaves

### **Safari (Mac/iOS)**
- [ ] Auth Modal funciona
- [ ] Program Modal funciona
- [ ] Specialty Modal funciona
- [ ] Animações suaves

### **Edge**
- [ ] Auth Modal funciona
- [ ] Program Modal funciona
- [ ] Specialty Modal funciona
- [ ] Animações suaves

---

## 📊 RESUMO DO TESTE

### **Total de Testes:**
```
Auth Modal:        15 testes
Program Modal:     30 testes
Specialty Modal:   35 testes
Mobile:            15 testes
Visual:             8 testes
Bugs:              12 testes
Funcionalidade:     8 testes
Cross-browser:     16 testes
----------------------------
TOTAL:            139 testes
```

---

## ✅ CRITÉRIOS DE APROVAÇÃO

**O sistema está aprovado se:**
- ✅ **Pelo menos 95%** dos testes passarem (132/139)
- ✅ **Nenhum erro crítico** (modal não abre, site quebra)
- ✅ **0 erros no console**
- ✅ **Animações suaves** em todos os navegadores

---

## 🎯 PRIORIDADES DE TESTE

### **Alta Prioridade** 🔴
1. Auth Modal (Login/Cadastro)
2. Fechar modais (X, ESC, click-outside)
3. Cores dinâmicas corretas
4. Responsividade mobile
5. Console sem erros

### **Média Prioridade** 🟡
1. Todos os 6 programas
2. 10 especialidades principais
3. Animações suaves
4. Performance

### **Baixa Prioridade** 🟢
1. Todas as 37 especialidades
2. Cross-browser
3. Testes de stress

---

## 📝 REPORTAR BUGS

**Se encontrar um bug:**

1. **Onde ocorreu?**
   - [ ] Auth Modal
   - [ ] Program Modal
   - [ ] Specialty Modal

2. **O que esperava?**
   - Descreva o comportamento esperado

3. **O que aconteceu?**
   - Descreva o que realmente aconteceu

4. **Console:**
   - Cole mensagens de erro (se houver)

5. **Browser:**
   - Nome e versão

6. **Screenshots:**
   - Anexe se possível

---

## 🎉 TESTE CONCLUÍDO

**Data do Teste:** ___/___/_____  
**Testado por:** __________________  
**Resultado:** [ ] ✅ Aprovado  [ ] ❌ Reprovado  
**Taxa de Sucesso:** _____ / 139 testes  

**Observações:**
```
[Escreva aqui suas observações]
```

---

✅ **CHECKLIST PRONTO PARA USO!**

**Dica:** Imprima ou use este arquivo para marcar cada item conforme testa.
