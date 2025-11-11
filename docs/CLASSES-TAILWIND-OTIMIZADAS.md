# 🎨 Classes Tailwind Otimizadas - Guia de Referência

## 📋 Índice Rápido

Este documento serve como **guia de referência** para as classes Tailwind utilizadas nos modais otimizados. Use este guia ao fazer manutenções ou criar novos modais.

---

## 📐 Dimensões de Containers

### Larguras Máximas

```css
/* Modais Pequenos (Login, Criar) */
max-w-2xl       → 672px (42rem)

/* Modais Médios (Links, Detalhes) */
max-w-3xl       → 768px (48rem)

/* Modais Grandes (Tabelas, Relatórios) */
max-w-4xl       → 896px (56rem)

/* Largura Total Responsiva */
w-full          → 100% do container
```

### Alturas

```css
/* Altura Máxima dos Modais */
max-h-[85vh]    → 85% da altura da viewport

/* Altura Máxima Alternativa */
max-h-[80vh]    → 80% da altura da viewport (mais compacto)
max-h-[90vh]    → 90% da altura (mais alto)

/* Scroll Automático */
overflow-y-auto → Scroll vertical quando necessário
```

---

## 📦 Padding e Margin

### Padding de Containers

```css
/* Container Principal do Modal */
p-6             → 24px (1.5rem) - Padrão otimizado
p-4             → 16px (1rem) - Compacto

/* Seções Coloridas (PIX, Slug, Info) */
p-4             → 16px (1rem) - Padrão
p-3             → 12px (0.75rem) - Compacto

/* Boxes Internos (Credenciais, Links) */
p-3             → 12px (0.75rem) - Padrão
p-2             → 8px (0.5rem) - Muito compacto

/* Cards de Produtos */
p-4             → 16px (1rem) - Cards principais
p-3             → 12px (0.75rem) - Cards de comissão
```

### Margins Bottom (Espaçamento Vertical)

```css
/* Entre Seções Principais */
mb-6            → 24px - Separação grande (evitar)
mb-4            → 16px - Separação média (ideal)
mb-3            → 12px - Separação pequena (compacto)

/* Entre Elementos de Formulário */
mb-2            → 8px - Formulários densos
mb-1            → 4px - Labels e inputs
```

### Spacing (Gap entre Elementos)

```css
/* Stack Vertical (Formulários) */
space-y-6       → 24px - Muito espaçado (evitar)
space-y-4       → 16px - Espaçamento normal
space-y-3       → 12px - Compacto (recomendado)
space-y-2       → 8px - Muito compacto

/* Grid Horizontal */
space-x-4       → 16px - Normal
space-x-3       → 12px - Compacto (recomendado)
space-x-2       → 8px - Muito compacto

/* Gap em Grids */
gap-4           → 16px - Normal
gap-3           → 12px - Compacto (recomendado)
gap-2           → 8px - Muito compacto
```

---

## 🔤 Tipografia

### Tamanhos de Fonte

```css
/* Títulos Principais do Modal */
text-2xl        → 24px (1.5rem) - Evitar
text-xl         → 20px (1.25rem) - Recomendado
text-lg         → 18px (1.125rem) - Alternativa compacta

/* Nomes e Headers */
text-xl         → 20px (1.25rem) - Normal
text-lg         → 18px (1.125rem) - Recomendado
text-base       → 16px (1rem) - Compacto

/* Subtítulos e Descrições */
text-lg         → 18px (1.125rem) - Grande (evitar)
text-base       → 16px (1rem) - Recomendado
text-sm         → 14px (0.875rem) - Compacto

/* Labels de Campos */
text-sm         → 14px (0.875rem) - Normal (evitar)
text-xs         → 12px (0.75rem) - Recomendado

/* Texto de Ajuda e Badges */
text-sm         → 14px (0.875rem) - Grande (evitar)
text-xs         → 12px (0.75rem) - Recomendado
```

### Peso da Fonte

```css
/* Títulos */
font-black      → 900 - Extra bold (destaques)
font-extrabold  → 800 - Muito bold (títulos)
font-bold       → 700 - Bold (padrão para títulos)

/* Conteúdo */
font-semibold   → 600 - Semi-bold (labels)
font-medium     → 500 - Médio (texto importante)
font-normal     → 400 - Normal (texto comum)
```

---

## 🔘 Botões

### Padding de Botões

```css
/* Botões Primários (Submit, Ação Principal) */
px-6 py-4       → Muito grande (evitar)
px-4 py-3       → Normal (recomendado)
px-3 py-2       → Compacto

/* Botões Secundários (Copiar, Cancelar) */
px-4 py-3       → Normal (evitar)
px-3 py-2       → Recomendado
px-2 py-1.5     → Muito compacto

/* Botões Pequenos (Ícones) */
px-3 py-2       → Normal
px-2 py-1       → Compacto (recomendado)
px-1.5 py-1     → Mínimo
```

### Tamanho de Texto em Botões

```css
/* Botões Principais */
text-base       → 16px - Normal (evitar)
text-sm         → 14px - Recomendado

/* Botões Secundários */
text-sm         → 14px - Normal
text-xs         → 12px - Compacto (recomendado)
```

---

## 📝 Inputs e Campos

### Padding de Inputs

```css
/* Inputs de Texto */
px-4 py-3       → Grande (evitar)
px-3 py-2       → Normal (recomendado)
px-2 py-1.5     → Compacto

/* Textarea */
px-4 py-3       → Normal
px-3 py-2       → Compacto (recomendado)

/* Select */
px-4 py-2       → Normal (evitar)
px-3 py-2       → Recomendado
```

### Tamanho de Fonte em Inputs

```css
/* Inputs Padrão */
text-base       → 16px - Normal (evitar)
text-sm         → 14px - Recomendado

/* Inputs Pequenos */
text-sm         → 14px - Normal
text-xs         → 12px - Compacto
```

### Bordas de Inputs

```css
/* Borda Padrão */
border          → 1px solid
border-2        → 2px solid (destaque, evitar em compacto)

/* Radius */
rounded         → 4px
rounded-md      → 6px
rounded-lg      → 8px (recomendado)
rounded-xl      → 12px (cards)
```

---

## 🎨 Cores e Backgrounds

### Backgrounds de Seções

```css
/* Seção PIX (Verde) */
bg-green-50     → Fundo claro verde
border-green-300 → Borda verde média
text-green-600  → Texto verde escuro

/* Seção Slug (Azul) */
bg-blue-50      → Fundo claro azul
border-blue-300 → Borda azul média
text-blue-600   → Texto azul escuro

/* Seção Credenciais (Azul) */
bg-blue-50      → Fundo claro azul
border-blue-200 → Borda azul clara

/* Mensagem Pronta (Verde) */
bg-green-50     → Fundo claro verde
border-green-200 → Borda verde clara
```

### Gradientes

```css
/* Header de Informações */
bg-gradient-to-r from-primary to-secondary
bg-gradient-to-r from-blue-500 to-purple-600

/* Gradiente para Cards de Ícones */
bg-gradient-to-r from-pink-500 to-pink-600
bg-gradient-to-r from-blue-500 to-blue-600
```

---

## 🖼️ Ícones e Avatares

### Tamanhos de Avatar

```css
/* Avatar Grande (evitar) */
w-16 h-16       → 64px × 64px
text-2xl        → Ícone 24px

/* Avatar Médio (recomendado) */
w-12 h-12       → 48px × 48px
text-lg         → Ícone 18px

/* Avatar Pequeno */
w-10 h-10       → 40px × 40px
text-base       → Ícone 16px
```

### Ícones em Cards

```css
/* Ícone Grande (evitar) */
w-12 h-12       → 48px × 48px

/* Ícone Médio (recomendado) */
w-10 h-10       → 40px × 40px
text-sm         → Fonte do ícone 14px

/* Ícone Pequeno */
w-8 h-8         → 32px × 32px
text-xs         → Fonte do ícone 12px
```

---

## 📊 Layouts Específicos

### Grid de Duas Colunas

```css
/* Grid Normal */
grid grid-cols-2 gap-4    → Gap 16px (evitar)

/* Grid Compacto (recomendado) */
grid grid-cols-2 gap-3    → Gap 12px

/* Grid Muito Compacto */
grid grid-cols-2 gap-2    → Gap 8px
```

### Flex Containers

```css
/* Flex com Espaçamento */
flex space-x-4            → Gap 16px (evitar)
flex space-x-3            → Gap 12px (recomendado)
flex space-x-2            → Gap 8px (compacto)

/* Flex com Gap */
flex gap-4                → Gap 16px
flex gap-3                → Gap 12px (recomendado)
flex gap-2                → Gap 8px
```

---

## 🔢 Exemplos Práticos

### Modal Container Otimizado

```html
<div class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6">
        <!-- Conteúdo -->
    </div>
</div>
```

### Formulário Compacto

```html
<form class="space-y-3">
    <div>
        <label class="block text-xs font-bold text-gray-700 mb-1">
            Nome
        </label>
        <input 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none text-sm"
        >
    </div>
</form>
```

### Seção Colorida

```html
<div class="bg-blue-50 border border-blue-300 rounded-lg p-3">
    <label class="block text-xs font-bold text-gray-700 mb-1">
        <i class="fas fa-link text-blue-600 mr-1"></i>
        Título
    </label>
    <input class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
    <p class="text-xs text-gray-600 mt-1">
        Texto de ajuda compacto
    </p>
</div>
```

### Botões de Footer

```html
<div class="mt-4 flex space-x-2">
    <button class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition text-sm">
        <i class="fas fa-check mr-1"></i>
        Confirmar
    </button>
    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition text-sm">
        Cancelar
    </button>
</div>
```

### Card de Produto Compacto

```html
<div class="border-2 border-pink-200 bg-pink-50 rounded-xl p-4">
    <div class="flex items-center mb-3">
        <div class="bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-3 text-sm">
            <i class="fas fa-venus"></i>
        </div>
        <div>
            <h5 class="text-base font-bold text-gray-800">KaiNow Mulher</h5>
            <p class="text-sm text-gray-600">R$ 49,90/mês</p>
        </div>
    </div>
    
    <div class="bg-white p-3 rounded-lg mb-2">
        <p class="text-xs text-gray-600 mb-1 font-bold">Link:</p>
        <div class="flex items-center gap-2">
            <input type="text" readonly class="flex-1 px-2 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs">
            <button class="bg-primary text-white px-3 py-1.5 rounded text-xs">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    </div>
</div>
```

---

## 📏 Tabela de Conversão Rápida

### De Normal para Compacto

| Classe Antiga | Classe Nova | Economia |
|---------------|-------------|----------|
| `max-w-4xl` | `max-w-3xl` | -14% largura |
| `max-w-4xl` | `max-w-2xl` | -25% largura |
| `max-h-[90vh]` | `max-h-[85vh]` | -5vh altura |
| `p-8` | `p-6` | -25% padding |
| `p-6` | `p-4` | -33% padding |
| `p-4` | `p-3` | -25% padding |
| `space-y-4` | `space-y-3` | -25% gap |
| `mb-6` | `mb-4` | -33% margin |
| `mb-4` | `mb-3` | -25% margin |
| `text-2xl` | `text-xl` | -17% fonte |
| `text-xl` | `text-lg` | -11% fonte |
| `text-lg` | `text-base` | -11% fonte |
| `text-sm` | `text-xs` | -14% fonte |
| `py-4` | `py-3` | -25% padding-y |
| `py-3` | `py-2` | -33% padding-y |
| `border-2` | `border` | -50% borda |

---

## 🎯 Regras de Ouro

### ✅ O Que Fazer

1. **Use `max-w-2xl` para modais de formulário**
2. **Use `max-w-3xl` para modais de visualização**
3. **Use `text-xs` para labels e ajuda**
4. **Use `text-sm` para inputs**
5. **Use `space-y-3` em formulários**
6. **Use `p-6` no container principal**
7. **Use `border` simples (não `border-2`)**
8. **Use `max-h-[85vh]` com `overflow-y-auto`**

### ❌ O Que Evitar

1. **Não use `max-w-4xl` ou maior**
2. **Não use `p-8` no container**
3. **Não use `text-2xl` em títulos de modal**
4. **Não use `space-y-6` (muito espaçado)**
5. **Não use `py-4` em botões (muito alto)**
6. **Não use `mb-6` entre seções (muito espaço)**
7. **Não use `border-2` em tudo (visual pesado)**
8. **Não deixe elementos sem `max-h` (scroll infinito)**

---

## 🔧 Ferramentas Úteis

### Tailwind CSS IntelliSense (VS Code)

```json
{
  "tailwindCSS.includeLanguages": {
    "html": "html"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}
```

### Tailwind Play (Teste Online)

URL: https://play.tailwindcss.com/

Use para testar combinações de classes rapidamente!

---

## 📚 Referências

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)

---

**Versão:** 3.2.0  
**Data:** 10/11/2025  
**Última Atualização:** Otimização de Modais

*Mantenha este guia como referência ao criar ou modificar modais!* 📖
