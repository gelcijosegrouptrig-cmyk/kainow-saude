# 🏥 Sistema de Especialidades com Dropdown + Iframe

## 📋 Visão Geral

Implementação completa de um sistema de dropdown para **37 especialidades médicas**, onde cada especialidade abre em sua própria página dentro de um **iframe modal responsivo**.

---

## ✨ O que foi implementado?

### 1️⃣ **Dropdown "Especialidades" no Header**

**Localização:** Ao lado do dropdown "Programas" no header

**Características:**
- ✅ Click-based (não hover) - melhor para mobile
- ✅ Lista todas as 37 especialidades com scroll vertical
- ✅ Max-height: 70vh (navegação confortável)
- ✅ Ícones únicos por especialidade (Font Awesome)
- ✅ Hover effects com fundo azul claro
- ✅ Auto-fechamento (clicar fora, ESC, selecionar item)
- ✅ Mutuamente exclusivo com dropdown "Programas"

**Código:** `index.html` (linhas ~57-92)

```html
<!-- Dropdown Especialidades -->
<div class="relative hidden md:block">
    <button id="especialidades-dropdown-btn" class="...">
        <i class="fas fa-chevron-down mr-1 text-xs"></i>
        Especialidades
    </button>
    <div id="especialidades-dropdown-menu" class="hidden ... max-h-[70vh] overflow-y-auto">
        <div class="p-2">
            <!-- 37 especialidades populadas via JavaScript -->
        </div>
    </div>
</div>
```

---

### 2️⃣ **Páginas Individuais por Especialidade**

**5 especialidades completas criadas:**

| Arquivo | Especialidade | Cor Temática |
|---------|---------------|--------------|
| `especialidade-cardiologia.html` | Cardiologia | Vermelho/Rosa |
| `especialidade-dermatologia.html` | Dermatologia | Âmbar/Laranja |
| `especialidade-ginecologia.html` | Ginecologia | Rosa/Rose |
| `especialidade-pediatria.html` | Pediatria | Azul/Ciano |
| `especialidade-psiquiatria.html` | Psiquiatria | Roxo/Índigo |

**Estrutura de cada página:**

1. **Header com Gradiente** - Cor temática + ícone animado
2. **Seção "O que é?"** - Explicação da especialidade + telemedicina
3. **Seção "O que trata?"** - Grid 2x4 com condições tratadas
4. **Seção "Quando procurar?"** - Sintomas de alerta (gradiente colorido)
5. **Seção "Benefícios Online"** - Vantagens da teleconsulta
6. **CTAs** - Botões para consultar agora + WhatsApp
7. **Info Box** - Aviso sobre emergências ou privacidade

**Tamanho médio:** 10-12 KB por página
**Responsivo:** Funciona perfeitamente em mobile/tablet/desktop

---

### 3️⃣ **Sistema de Iframe Modal Responsivo**

**Já existente e atualizado para especialidades**

**Características:**
- ✅ Fullscreen em mobile (100vh)
- ✅ 95vh com bordas arredondadas em desktop
- ✅ Loading indicator (spinner animado)
- ✅ Controles de navegação:
  - Botão × para fechar
  - Botão Voltar (history.back)
  - Botão Recarregar (location.reload)
  - Botão Nova Aba (target="_blank")
- ✅ Sandbox seguro configurado
- ✅ Z-index: 100 (acima de tudo)
- ✅ Animações: fadeIn (modal) + slideUp (conteúdo)

**Função JavaScript:** `openIframeModal(url, title)`

```javascript
openIframeModal('especialidade-cardiologia.html', 'Cardiologia');
```

---

### 4️⃣ **JavaScript: Funções Principais**

#### **`populateEspecialidadesDropdown()`**
- Lê array `specialties` (37 especialidades)
- Gera links dinamicamente
- Normaliza nomes para URLs:
  - Remove acentos: `Ginecologia/Obstetrícia` → `ginecologia-obstetricia`
  - Substitui `/` por `-`
  - Substitui espaços por `-`
- Adiciona ícones e classes de hover

**Exemplo de URL gerada:**
```
"Ginecologia/Obstetrícia" → "especialidade-ginecologia-obstetricia.html"
"Alergia e Imunologia Pediátrica" → "especialidade-alergia-e-imunologia-pediatrica.html"
```

#### **`setupEspecialidadesDropdown()`**
- Controla abertura/fechamento do dropdown
- Toggle ao clicar no botão
- Fecha ao clicar fora ou pressionar ESC
- Fecha dropdown "Programas" quando abrir "Especialidades"

#### **`setupIframeLinks()` (atualizada)**
- Intercepta cliques em todos os links que começam com `especialidade-`
- Previne abertura de nova página (`e.preventDefault()`)
- Fecha dropdown automaticamente
- Abre iframe modal com título correto

---

## 🎯 Como Funciona o Fluxo Completo

### Experiência do Usuário:

1. **Usuário clica no dropdown "Especialidades" no header**
   - Dropdown abre com lista de 37 especialidades
   - Pode rolar para ver todas (scroll vertical)

2. **Usuário clica em "Cardiologia"**
   - Link: `especialidade-cardiologia.html`
   - JavaScript intercepta o clique
   - Dropdown fecha automaticamente
   - Iframe modal abre com loading indicator

3. **Página de Cardiologia carrega no iframe**
   - Fullscreen (mobile) ou 95vh (desktop)
   - Usuário pode:
     - Ler sobre a especialidade
     - Ver o que é tratado
     - Clicar em "Consultar Cardiologista Agora"
     - Clicar em "Falar no WhatsApp"

4. **Usuário fecha o iframe**
   - Botão × no header
   - Pressiona ESC
   - Clica em "Nova Aba" (abre em nova janela)
   - Retorna à página principal

---

## 📂 Arquivos Modificados/Criados

### **Criados:**
- ✅ `especialidade-cardiologia.html` (12 KB)
- ✅ `especialidade-dermatologia.html` (10 KB)
- ✅ `especialidade-ginecologia.html` (10 KB)
- ✅ `especialidade-pediatria.html` (12 KB)
- ✅ `especialidade-psiquiatria.html` (12 KB)
- ✅ `SISTEMA-ESPECIALIDADES-DROPDOWN.md` (este arquivo)

### **Modificados:**
- ✅ `index.html` - Adicionado dropdown Especialidades, ocultada seção grid
- ✅ `js/main.js` - Adicionadas 3 funções novas + atualizada setupIframeLinks()
- ✅ `README.md` - Documentação atualizada

---

## 🔧 Código-Fonte das Funções JavaScript

### **1. Popular Dropdown**

```javascript
// Popular Dropdown de Especialidades
function populateEspecialidadesDropdown() {
    const menuContainer = document.querySelector('#especialidades-dropdown-menu .p-2');
    if (!menuContainer) return;
    
    // Criar link para cada especialidade
    specialties.forEach(specialty => {
        const link = document.createElement('a');
        const specialtySlug = specialty.name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/\//g, '-') // Substitui / por -
            .replace(/\s+/g, '-'); // Substitui espaços por -
        
        link.href = `especialidade-${specialtySlug}.html`;
        link.className = 'block px-3 py-2 hover:bg-blue-50 rounded-lg transition text-sm';
        link.innerHTML = `
            <i class="fas ${specialty.icon} text-primary mr-2"></i>
            ${specialty.name}
        `;
        
        menuContainer.appendChild(link);
    });
}
```

### **2. Controlar Dropdown**

```javascript
// Setup Dropdown Especialidades (click-based)
function setupEspecialidadesDropdown() {
    const btn = document.getElementById('especialidades-dropdown-btn');
    const menu = document.getElementById('especialidades-dropdown-menu');
    
    if (!btn || !menu) return;
    
    // Toggle dropdown ao clicar no botão
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Fechar dropdown de programas se estiver aberto
        const programasMenu = document.getElementById('programas-dropdown-menu');
        if (programasMenu) {
            programasMenu.classList.add('hidden');
        }
        
        menu.classList.toggle('hidden');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
    
    // Fechar dropdown com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            menu.classList.add('hidden');
        }
    });
}
```

### **3. Interceptar Links de Especialidades**

```javascript
// Links de especialidades (todos que começam com "especialidade-")
const especialidadeLinks = document.querySelectorAll('a[href^="especialidade-"]');

especialidadeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Fechar dropdowns se estiverem abertos
        const especialidadesDropdown = document.getElementById('especialidades-dropdown-menu');
        if (especialidadesDropdown) {
            especialidadesDropdown.classList.add('hidden');
        }
        
        const url = this.getAttribute('href');
        const title = this.textContent.trim() || 'Especialidade Médica';
        openIframeModal(url, title);
    });
});
```

---

## 📊 Especialidades Disponíveis (37)

### **Com páginas criadas (5):**
1. ✅ Cardiologia
2. ✅ Dermatologia
3. ✅ Ginecologia/Obstetrícia
4. ✅ Pediatria
5. ✅ Psiquiatria

### **Restantes (32) - Usar como template:**
6. Alergia e Imunologia Pediátrica
7. Cirurgia Geral
8. Cirurgia Plástica
9. Cirurgia Vascular
10. Clínica Médica
11. Coloproctologia
12. Endocrinologia/Metabologia
13. Gastroenterologia
14. Gastroenterologia Pediátrica
15. Geriatria
16. Hematologia Pediátrica
17. Hematologia e Hemoterapia
18. Infectologia Pediátrica
19. Mastologia
20. Neurologia
21. Nutricionista
22. Oftalmologia
23. Ortopediatria
24. Otorrinolaringologia
25. Pneumologia
26. Pneumologia Pediátrica
27. Psicologia
28. Reumatologia
29. Urologia
30. Nefrologia
31. Oncologia
32. Proctologia
33. Angiologia
34. Nutrologia
35. Homeopatia
36. Acupuntura
37. Fisioterapia

---

## 🎨 Cores Temáticas Sugeridas

| Especialidade | Cor Principal | Cor Secundária |
|---------------|---------------|----------------|
| Cardiologia | `red-600` | `pink-600` |
| Dermatologia | `amber-600` | `orange-600` |
| Ginecologia | `pink-600` | `rose-600` |
| Pediatria | `blue-600` | `cyan-600` |
| Psiquiatria | `purple-600` | `indigo-600` |
| Neurologia | `violet-600` | `purple-600` |
| Ortopedia | `slate-600` | `gray-600` |
| Oftalmologia | `sky-600` | `blue-600` |
| Gastro | `lime-600` | `green-600` |
| Pneumologia | `teal-600` | `cyan-600` |
| Nutrição | `emerald-600` | `green-600` |
| Psicologia | `indigo-600` | `blue-600` |

---

## 🚀 Próximos Passos

### **Prioridade Alta:**
1. ✅ **Sistema implementado** - Dropdown + 5 especialidades prontas
2. 🔲 **Criar 32 páginas restantes** usando os templates existentes
3. 🔲 **Atualizar números de WhatsApp** (substituir `5511999999999` por número real)

### **Prioridade Média:**
4. 🔲 **Adicionar imagens ilustrativas** nas páginas de especialidades
5. 🔲 **Criar dropdown mobile** para especialidades (hamburger menu)
6. 🔲 **SEO**: Meta tags específicas por especialidade

### **Prioridade Baixa:**
7. 🔲 **Adicionar depoimentos** de pacientes por especialidade
8. 🔲 **Integrar agenda** para marcar consulta diretamente
9. 🔲 **Analytics**: Rastrear especialidades mais acessadas

---

## 📱 Responsividade

### **Mobile (< 768px):**
- Dropdown oculto (usar menu hamburger)
- Iframe fullscreen (100vh, sem bordas)
- Cards especialidade em coluna única

### **Tablet (768px - 1024px):**
- Dropdown visível no header
- Iframe 95vh com bordas
- Cards especialidade em 2 colunas

### **Desktop (> 1024px):**
- Dropdown visível no header
- Iframe 95vh com bordas arredondadas
- Cards especialidade em 2 colunas (layout amplo)

---

## 🔗 Links Úteis

- **Font Awesome Icons:** https://fontawesome.com/icons
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Array de Especialidades:** `js/main.js` (linhas 1-40)
- **Iframe Modal:** `js/main.js` (função `openIframeModal`, linha ~419)

---

## ✅ Checklist de Implementação

- [x] Criar dropdown "Especialidades" no header
- [x] Ocultar seção grid de especialidades da página principal
- [x] Criar função `populateEspecialidadesDropdown()`
- [x] Criar função `setupEspecialidadesDropdown()`
- [x] Atualizar função `setupIframeLinks()` para especialidades
- [x] Criar 5 páginas de especialidades (Cardiologia, Dermatologia, Ginecologia, Pediatria, Psiquiatria)
- [x] Testar responsividade dos iframes
- [x] Atualizar README.md com documentação
- [x] Criar arquivo SISTEMA-ESPECIALIDADES-DROPDOWN.md

---

**Desenvolvido com ❤️ para KaiNow Saúde**
