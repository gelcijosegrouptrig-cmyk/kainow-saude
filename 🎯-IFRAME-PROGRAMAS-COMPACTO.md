# 🎯 IFRAME PROGRAMAS COMPACTO

## ✅ IMPLEMENTADO

Sistema de **modal iframe compacto** para todos os 6 programas especializados!

---

## 🎨 TAMANHOS

### Desktop:
```
Largura: 640px (max-w-2xl)
Altura:  90vh máximo
Iframe:  600px mínimo
```

### Mobile:
```
Largura: 100vw (fullscreen)
Altura:  100vh (fullscreen)
Iframe:  calc(100vh - 50px)
```

---

## 📋 PROGRAMAS CONFIGURADOS

### 1️⃣ KaiNow Mulher
- **Ícone:** `fa-venus`
- **Cor:** Rosa → Roxo (`from-pink-500 to-purple-600`)
- **Arquivo:** `programa-mulher.html`

### 2️⃣ KaiNow Sênior
- **Ícone:** `fa-user-shield`
- **Cor:** Âmbar → Laranja (`from-amber-500 to-orange-600`)
- **Arquivo:** `programa-senior.html`

### 3️⃣ KaiNow Farma
- **Ícone:** `fa-pills`
- **Cor:** Verde → Esmeralda (`from-green-500 to-emerald-600`)
- **Arquivo:** `programa-farma.html`

### 4️⃣ KaiNow Acolher
- **Ícone:** `fa-hands-holding-child`
- **Cor:** Azul → Índigo (`from-blue-500 to-indigo-600`)
- **Arquivo:** `programa-acolher.html`

### 5️⃣ KaiNow Orienta
- **Ícone:** `fa-lightbulb`
- **Cor:** Roxo → Violeta (`from-purple-500 to-violet-600`)
- **Arquivo:** `programa-orienta.html`

### 6️⃣ KaiNow Viva Leve
- **Ícone:** `fa-spa`
- **Cor:** Turquesa → Ciano (`from-teal-500 to-cyan-600`)
- **Arquivo:** `programa-vivaleve.html`

---

## 🎨 DESIGN DINÂMICO

### Header Personalizado:
Cada programa tem seu **gradiente único** no header do modal:

```javascript
const programConfigs = {
    'programa-mulher.html': {
        title: 'KaiNow Mulher',
        icon: 'fa-venus',
        gradient: 'from-pink-500 to-purple-600'  // Rosa
    },
    'programa-senior.html': {
        title: 'KaiNow Sênior',
        icon: 'fa-user-shield',
        gradient: 'from-amber-500 to-orange-600'  // Laranja
    }
    // ... etc
};
```

---

## 📊 COMPARAÇÃO DE TAMANHOS

### Auth Modal vs Program Modal:

| Tipo | Largura | Altura | Uso |
|------|---------|--------|-----|
| **Auth** | 448px (max-w-md) | 85vh | Login/Cadastro |
| **Program** | 640px (max-w-2xl) | 90vh | Programas |

**Program Modal é 43% maior** para acomodar mais conteúdo!

---

## 🔧 FUNCIONAMENTO

### 1. Dropdown Atualizado

**ANTES:**
```html
<a href="programa-mulher.html">KaiNow Mulher</a>
```

**DEPOIS:**
```html
<button onclick="openProgramModal('programa-mulher.html')">
    KaiNow Mulher
</button>
```

### 2. Funções JavaScript

```javascript
// Abrir modal de programa
openProgramModal(page)
  ↓
- Busca configuração (título, ícone, cor)
- Atualiza header com gradiente específico
- Define ícone do programa
- Mostra loading
- Carrega página no iframe
- Exibe modal

// Fechar modal
closeProgramModal()
  ↓
- Esconde modal
- Limpa iframe
- Remove overflow: hidden

// Esconder loading
hideProgramLoading()
  ↓
- Remove spinner após carregar
```

---

## ⌨️ CONTROLES

### Fechar Modal:
- ✅ **ESC** - Pressione para fechar
- ✅ **Click fora** - Clique no overlay
- ✅ **Botão X** - Clique no [X]

### Navegação:
- ✅ **Dropdown** - Menu Programas no header
- ✅ **Múltiplos** - Abrir vários programas seguidos

---

## 🎯 VISUAL

### Desktop (>768px):
```
┌──────────────────────────────────┐
│ 👩 KaiNow Mulher          [X]    │ ← Header rosa
├──────────────────────────────────┤
│                                  │
│   [Conteúdo do Programa]         │ ← 640px largura
│                                  │    90vh altura
│                                  │
│   [Contratar Agora]              │
│                                  │
└──────────────────────────────────┘
```

### Mobile (<768px):
```
┌────────────────────┐
│ 👩 Mulher    [X]   │ ← Header rosa
├────────────────────┤
│                    │
│  [Conteúdo]        │
│                    │
│                    │ ← Fullscreen
│                    │
│  [Contratar]       │
│                    │
└────────────────────┘
```

---

## 💡 HEADER DINÂMICO

### Cada programa muda a cor do header:

```
KaiNow Mulher    → 🟣 Rosa/Roxo
KaiNow Sênior    → 🟠 Âmbar/Laranja
KaiNow Farma     → 🟢 Verde/Esmeralda
KaiNow Acolher   → 🔵 Azul/Índigo
KaiNow Orienta   → 🟣 Roxo/Violeta
KaiNow Viva Leve → 🔷 Turquesa/Ciano
```

---

## 📱 RESPONSIVIDADE

### Breakpoints:

**Desktop (>768px):**
- Modal: 640px centralizado
- Altura: 90vh máximo
- Border radius: 12px
- Padding lateral: 8px

**Mobile (<768px):**
- Modal: 100vw fullscreen
- Altura: 100vh fullscreen
- Border radius: 0 (sem bordas)
- Padding: 0

---

## 🔍 CÓDIGO DETALHADO

### HTML Modal:
```html
<div id="program-modal" class="hidden fixed inset-0 z-[9999]">
  <!-- Overlay -->
  <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" 
       onclick="closeProgramModal()">
  </div>
  
  <!-- Container -->
  <div class="relative h-full flex items-center justify-center p-2">
    <!-- Modal 640px -->
    <div class="bg-white rounded-xl max-w-2xl max-h-[90vh]">
      
      <!-- Header Dinâmico -->
      <div id="program-modal-header" 
           class="bg-gradient-to-r from-primary to-secondary">
        <h3>
          <i id="program-modal-icon"></i>
          <span id="program-modal-title"></span>
        </h3>
        <button onclick="closeProgramModal()">[X]</button>
      </div>
      
      <!-- Iframe -->
      <div class="flex-1 overflow-hidden">
        <div id="program-loading">Carregando...</div>
        <iframe id="program-iframe"></iframe>
      </div>
    </div>
  </div>
</div>
```

### JavaScript:
```javascript
// Configurações de cada programa
const programConfigs = {
    'programa-mulher.html': {
        title: 'KaiNow Mulher',
        icon: 'fa-venus',
        gradient: 'from-pink-500 to-purple-600'
    }
    // ... outros programas
};

// Abrir modal
function openProgramModal(page) {
    const config = programConfigs[page];
    
    // Atualizar header
    title.textContent = config.title;
    icon.className = `fas ${config.icon}`;
    header.className = `... ${config.gradient} ...`;
    
    // Carregar iframe
    iframe.src = page;
    modal.classList.remove('hidden');
}
```

### CSS:
```css
/* Modal 640px */
#program-modal {
    z-index: 9999;
}

#program-iframe {
    min-height: 600px;
}

/* Mobile fullscreen */
@media (max-width: 768px) {
    #program-modal .max-w-2xl {
        max-width: 100%;
        max-height: 100vh;
    }
    
    #program-iframe {
        min-height: calc(100vh - 50px);
    }
}
```

---

## 🎉 VANTAGENS

### ✅ UX Melhorada:
1. **Não sai da página** - Contexto mantido
2. **Mais rápido** - Carrega só o programa
3. **Visual consistente** - Mesmo padrão para todos
4. **Cores dinâmicas** - Header muda conforme programa

### ✅ Performance:
1. **Lazy loading** - Carrega apenas quando aberto
2. **Iframe isolado** - Não afeta página principal
3. **Cache funciona** - Navegador cacheia programas

### ✅ Mobile:
1. **Fullscreen** - Melhor visualização
2. **Toque otimizado** - Fácil de usar
3. **Responsivo** - Adapta automaticamente

---

## 🚀 TESTE AGORA

### Passo a Passo:

1. **Acesse:** https://ojdbcsqw.gensparkspace.com/
2. **Clique:** Menu "Programas" no header
3. **Escolha:** Qualquer programa (ex: KaiNow Mulher)
4. **Observe:** 
   - Modal abre em 640px
   - Header rosa/roxo
   - Ícone venus
   - Loading spinner
5. **Teste:**
   - Abrir outros programas
   - Ver cores diferentes
   - Pressionar ESC
   - Clicar fora
   - Mobile (fullscreen)

---

## 📏 MEDIDAS EXATAS

### Desktop:
```
Modal Width:    640px (max-w-2xl)
Modal Height:   90vh
Iframe Height:  600px mínimo
Header Height:  40px (py-2.5)
Padding:        8px (p-2)
Border Radius:  12px (rounded-xl)
```

### Mobile:
```
Modal Width:    100vw
Modal Height:   100vh
Iframe Height:  calc(100vh - 50px)
Border Radius:  0
Padding:        0
```

---

## 🎨 CUSTOMIZAÇÃO

### Alterar tamanho do modal:
```html
<!-- Atual: 640px -->
<div class="max-w-2xl">

<!-- Maior: 768px -->
<div class="max-w-3xl">

<!-- Menor: 512px -->
<div class="max-w-xl">
```

### Alterar altura:
```html
<!-- Atual: 90vh -->
<div class="max-h-[90vh]">

<!-- Maior: 95vh -->
<div class="max-h-[95vh]">

<!-- Menor: 85vh -->
<div class="max-h-[85vh]">
```

---

## ✅ ARQUIVOS MODIFICADOS

1. **index.html** (3 edições):
   - Adicionado modal HTML
   - Adicionado JavaScript com configs
   - Alterado dropdown para botões

2. **css/iframe-modal.css** (1 edição):
   - Adicionados estilos do modal
   - Media queries mobile

**Total:** 2 arquivos ✅

---

## 📊 RESUMO

```
╔════════════════════════════════════════╗
║  ✅ 6 PROGRAMAS EM IFRAME              ║
║  ✅ MODAL 640PX (COMPACTO)             ║
║  ✅ ALTURA 90VH                        ║
║  ✅ HEADERS DINÂMICOS (6 CORES)        ║
║  ✅ ÍCONES PERSONALIZADOS              ║
║  ✅ LOADING ANIMADO                    ║
║  ✅ MOBILE FULLSCREEN                  ║
║  ✅ ESC E CLICK FORA                   ║
╚════════════════════════════════════════╝
```

---

## 🎯 COMPARAÇÃO COMPLETA

| Modal | Largura | Altura | Para |
|-------|---------|--------|------|
| **Auth** | 448px | 85vh | Login/Cadastro |
| **Program** | 640px | 90vh | 6 Programas |

**Program = Auth + 43% largura + 6% altura**

---

**Data:** 07/11/2025  
**Tamanho:** 640px × 90vh (Desktop)  
**Programas:** 6 configurados  
**Status:** ✅ IMPLEMENTADO E FUNCIONANDO
