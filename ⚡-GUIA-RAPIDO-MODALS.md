# ⚡ GUIA RÁPIDO: MODALS KAINOW

**Referência Rápida para Desenvolvedores**

---

## 🚀 USO RÁPIDO

### **Abrir Modal**
```javascript
// Auth
openAuthModal('login.html')
openAuthModal('cadastro.html')

// Program
openProgramModal('programa-mulher.html')

// Specialty
openSpecialtyModal('Cardiologia', 'cardiologia')
```

### **Fechar Modal**
```javascript
closeAuthModal()
closeProgramModal()
closeSpecialtyModal()
```

---

## 📋 IDs DOS ELEMENTOS

### **Auth Modal**
```
#auth-modal            → Container principal
#auth-modal-header     → Header
#auth-modal-title      → Título
#auth-iframe           → Iframe
#auth-loading          → Loading spinner
```

### **Program Modal**
```
#program-modal         → Container principal
#program-modal-header  → Header (dinâmico)
#program-modal-title   → Título (dinâmico)
#program-modal-icon    → Ícone (dinâmico)
#program-iframe        → Iframe
#program-loading       → Loading spinner
```

### **Specialty Modal**
```
#specialty-modal       → Container principal
#specialty-modal-header → Header (dinâmico)
#specialty-modal-title → Título (dinâmico)
#specialty-modal-icon  → Ícone (dinâmico)
#specialty-iframe      → Iframe
#specialty-loading     → Loading spinner
```

---

## 🎨 ADICIONAR NOVA CONFIGURAÇÃO

### **Novo Programa**
```javascript
// Em index.html, no objeto programConfigs:
'programa-novo.html': {
    title: 'Nome do Programa',
    icon: 'fa-icon-name',
    gradient: 'from-cor1 to-cor2'
}

// No dropdown HTML:
<button onclick="openProgramModal('programa-novo.html')">
    <i class="fas fa-icon-name"></i>
    Nome do Programa
</button>
```

### **Nova Especialidade**
```javascript
// Em index.html, no objeto specialtyConfigs:
'nova-especialidade': {
    name: 'Nova Especialidade',
    icon: 'fa-icon-name',
    gradient: 'from-cor1 to-cor2'
}

// Em js/main.js, no array specialties:
{ name: "Nova Especialidade", icon: "fa-icon-name", category: "Categoria" }
```

---

## 🔧 CLASSES CSS IMPORTANTES

### **Mostrar/Ocultar**
```css
.hidden              → Oculta elemento
.flex                → Mostra elemento (flex)
.block               → Mostra elemento (block)
```

### **Animações**
```css
.animate-fadeIn      → Fade in (0.3s)
.animate-slideUp     → Slide up (0.4s)
.spinner             → Loading spinner
```

### **Z-Index**
```css
z-[9999]             → Modal (máxima prioridade)
z-10                 → Loading (sobre iframe)
```

---

## 📱 BREAKPOINTS

```css
/* Mobile */
@media (max-width: 768px) {
    /* Modal fullscreen */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
    /* Modal tamanho fixo */
}

/* Desktop */
@media (min-width: 1025px) {
    /* Modal tamanho fixo */
}
```

---

## 🎯 EVENTOS

### **Keyboard**
```javascript
// ESC fecha modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
```

### **Click Outside**
```html
<!-- Overlay com onclick -->
<div onclick="closeModal()"></div>
```

### **Iframe Load**
```html
<!-- Iframe com onload -->
<iframe onload="hideLoading()"></iframe>
```

---

## 🐛 TROUBLESHOOTING

### **Modal não abre**
```javascript
// Verificar se elemento existe
console.log(document.getElementById('modal-id'));

// Verificar se class 'hidden' foi removida
console.log(modal.classList.contains('hidden'));
```

### **Cores não mudam**
```javascript
// Verificar se config existe
console.log(configs[slug]);

// Verificar se header está sendo atualizado
console.log(header.className);
```

### **Loading não desaparece**
```javascript
// Verificar se hideLoading() é chamado
console.log('hideLoading() executado');

// Verificar timeout
setTimeout(() => {
    console.log('Loading deve estar oculto');
}, 400);
```

---

## 📚 ARQUIVOS RELACIONADOS

### **HTML**
- `index.html` → Página principal com modals

### **JavaScript**
- `index.html` (inline) → Funções de controle
- `js/main.js` → Dropdown especialidades

### **CSS**
- `css/iframe-modal.css` → Estilos dos modals
- `css/style.css` → Estilos gerais

### **Documentação**
- `🪟-IFRAME-LOGIN-COMPACTO.md` → Auth Modal
- `🎯-IFRAME-PROGRAMAS-COMPACTO.md` → Program Modal
- `🏥-IFRAME-ESPECIALIDADES-COMPACTO.md` → Specialty Modal
- `📋-SESSAO-IFRAME-MODALS-COMPLETA.md` → Sessão completa
- `🎨-VISUAL-RESUMO-MODALS.md` → Resumo visual

---

## 🎯 TAMANHOS

| Modal | Desktop | Mobile |
|-------|---------|--------|
| Auth | 448px × 85vh | 100vw × 100vh |
| Program | 640px × 90vh | 100vw × 100vh |
| Specialty | 640px × 90vh | 100vw × 100vh |

---

## 🎨 CORES TAILWIND

### **Mais Usadas**
```
from-red-500 to-pink-600       → Vermelho/Rosa
from-blue-500 to-indigo-600    → Azul/Índigo
from-green-500 to-emerald-600  → Verde/Esmeralda
from-purple-500 to-violet-600  → Roxo/Violeta
from-amber-500 to-orange-600   → Âmbar/Laranja
from-teal-500 to-cyan-600      → Teal/Ciano
```

---

## 🔍 ÍCONES FONT AWESOME

### **Mais Usados**
```
fa-heartbeat           → Cardiologia
fa-brain               → Neurologia
fa-baby-carriage       → Pediatria
fa-eye                 → Oftalmologia
fa-hand-holding-medical → Dermatologia
fa-venus               → KaiNow Mulher
fa-user-shield         → KaiNow Sênior
fa-pills               → KaiNow Farma
```

---

## ⚡ COMANDOS ÚTEIS

### **Abrir DevTools**
```
F12 ou Ctrl+Shift+I
```

### **Inspecionar Elemento**
```
Ctrl+Shift+C
```

### **Console**
```javascript
// Ver todos os modals
console.log(document.querySelectorAll('[id$="-modal"]'));

// Ver configurações
console.log(programConfigs);
console.log(specialtyConfigs);

// Forçar fechar todos
closeAuthModal();
closeProgramModal();
closeSpecialtyModal();
```

---

## 🎓 BOAS PRÁTICAS

### **1. Sempre limpar iframe ao fechar**
```javascript
iframe.src = '';
```

### **2. Sempre remover class modal-open do body**
```javascript
document.body.classList.remove('iframe-modal-open');
```

### **3. Sempre aguardar 300ms para ocultar loading**
```javascript
setTimeout(() => { loading.style.display = 'none'; }, 300);
```

### **4. Sempre verificar se config existe**
```javascript
if (config) {
    // Aplicar configurações
}
```

---

## 📝 CHECKLIST DE DEPLOY

- [ ] Testar todos os modals
- [ ] Validar cores e ícones
- [ ] Testar no mobile
- [ ] Testar tecla ESC
- [ ] Testar click outside
- [ ] Verificar console (sem erros)
- [ ] Testar loading spinner
- [ ] Validar responsividade
- [ ] Testar múltiplas aberturas
- [ ] Verificar performance

---

## 🆘 SUPORTE

**Problemas?**
1. Verificar console do navegador
2. Verificar se arquivos foram carregados
3. Verificar se IDs dos elementos estão corretos
4. Verificar se funções estão definidas
5. Consultar documentação completa

**Documentação Completa:**
- `📋-SESSAO-IFRAME-MODALS-COMPLETA.md`

---

✅ **GUIA RÁPIDO PRONTO!** ⚡
