# 🏥 IFRAME MODAL PARA 33 ESPECIALIDADES MÉDICAS

**Data:** 07/11/2025  
**Status:** ✅ IMPLEMENTADO COM SUCESSO  
**Tipo:** Sistema de Modal Iframe Compacto para Especialidades

---

## 📋 RESUMO DA IMPLEMENTAÇÃO

Foi implementado um **sistema de modal iframe compacto** para as **33 especialidades médicas**, permitindo que todas abram em um modal overlay em vez de navegação tradicional. O sistema é idêntico ao modal dos programas, com tamanho **640px × 90vh** (médio) e **cores dinâmicas** específicas para cada especialidade.

---

## 🎯 OBJETIVOS ALCANÇADOS

✅ Modal compacto de 640px × 90vh para especialidades  
✅ 33 especialidades com cores e ícones únicos  
✅ Dropdown com buttons onclick em vez de links href  
✅ Header dinâmico com gradient específico por especialidade  
✅ Loading spinner durante carregamento do iframe  
✅ Fechar modal com ESC ou clicando fora  
✅ Responsivo - fullscreen no mobile  
✅ Animações suaves (fadeIn + slideUp)  

---

## 📦 ARQUIVOS MODIFICADOS

### 1. **index.html**
- ✅ Adicionado HTML do modal `#specialty-modal` (linhas ~1335-1370)
- ✅ Adicionadas 3 funções JavaScript (linhas ~1613-1700):
  - `openSpecialtyModal(specialtyName, specialtySlug)`
  - `closeSpecialtyModal()`
  - `hideSpecialtyLoading()`
- ✅ Criado objeto `specialtyConfigs` com 33 configurações

### 2. **js/main.js**
- ✅ Modificada função `populateEspecialidadesDropdown()` (linhas 808-830)
- ✅ Alterado de `<a href="...">` para `<button onclick="openSpecialtyModal()">`

### 3. **css/iframe-modal.css**
- ✅ Adicionados estilos para `#specialty-modal` (linhas 173-206)
- ✅ Animações fadeIn e slideUp
- ✅ Responsividade mobile (fullscreen)

---

## 🎨 CONFIGURAÇÕES DAS 33 ESPECIALIDADES

Cada especialidade possui:
- **Nome completo** (ex: "Cardiologia")
- **Slug** (ex: "cardiologia")
- **Ícone Font Awesome** (ex: "fa-heartbeat")
- **Gradiente de cores único** (ex: "from-red-500 to-pink-600")

### 📊 Tabela Completa

| # | Especialidade | Slug | Ícone | Cores |
|---|---------------|------|-------|-------|
| 1 | Alergia e Imunologia Pediátrica | `alergia-e-imunologia-pediatrica` | `fa-allergies` | `from-pink-400 to-rose-500` |
| 2 | Cardiologia | `cardiologia` | `fa-heartbeat` | `from-red-500 to-pink-600` |
| 3 | Cirurgia Geral | `cirurgia-geral` | `fa-user-md` | `from-gray-600 to-slate-700` |
| 4 | Cirurgia Plástica | `cirurgia-plastica` | `fa-hand-sparkles` | `from-purple-400 to-pink-500` |
| 5 | Cirurgia Vascular | `cirurgia-vascular` | `fa-stethoscope` | `from-blue-600 to-indigo-700` |
| 6 | Clínica Médica | `clinica-medica` | `fa-clinic-medical` | `from-blue-500 to-indigo-600` |
| 7 | Coloproctologia | `coloproctologia` | `fa-user-md` | `from-teal-500 to-cyan-600` |
| 8 | Dermatologia | `dermatologia` | `fa-hand-holding-medical` | `from-amber-500 to-orange-600` |
| 9 | Endocrinologia/Metabologia | `endocrinologia-metabologia` | `fa-dna` | `from-violet-500 to-purple-600` |
| 10 | Gastroenterologia | `gastroenterologia` | `fa-notes-medical` | `from-emerald-500 to-green-600` |
| 11 | Gastroenterologia Pediátrica | `gastroenterologia-pediatrica` | `fa-baby` | `from-lime-400 to-green-500` |
| 12 | Geriatria | `geriatria` | `fa-wheelchair` | `from-slate-500 to-gray-600` |
| 13 | Ginecologia/Obstetrícia | `ginecologia-obstetricia` | `fa-female` | `from-pink-500 to-rose-600` |
| 14 | Hematologia Pediátrica | `hematologia-pediatrica` | `fa-tint` | `from-red-400 to-rose-500` |
| 15 | Hematologia e Hemoterapia | `hematologia-e-hemoterapia` | `fa-tint` | `from-red-600 to-rose-700` |
| 16 | Infectologia Pediátrica | `infectologia-pediatrica` | `fa-shield-virus` | `from-yellow-500 to-amber-600` |
| 17 | Mastologia | `mastologia` | `fa-ribbon` | `from-pink-400 to-fuchsia-500` |
| 18 | Neurologia | `neurologia` | `fa-brain` | `from-violet-500 to-purple-600` |
| 19 | Nutricionista | `nutricionista` | `fa-apple-alt` | `from-emerald-500 to-green-600` |
| 20 | Oftalmologia | `oftalmologia` | `fa-eye` | `from-sky-500 to-blue-600` |
| 21 | Ortopediatria | `ortopediatria` | `fa-child` | `from-cyan-500 to-blue-600` |
| 22 | Otorrinolaringologia | `otorrinolaringologia` | `fa-head-side-mask` | `from-indigo-500 to-purple-600` |
| 23 | Pediatria | `pediatria` | `fa-baby-carriage` | `from-blue-400 to-cyan-500` |
| 24 | Pneumologia | `pneumologia` | `fa-lungs` | `from-teal-500 to-cyan-600` |
| 25 | Pneumologia Pediátrica | `pneumologia-pediatrica` | `fa-lungs-virus` | `from-cyan-400 to-teal-500` |
| 26 | Psicologia | `psicologia` | `fa-user-friends` | `from-purple-400 to-violet-500` |
| 27 | Psiquiatria | `psiquiatria` | `fa-head-side-virus` | `from-purple-600 to-indigo-700` |
| 28 | Reumatologia | `reumatologia` | `fa-hand-holding-medical` | `from-orange-500 to-red-600` |
| 29 | Urologia | `urologia` | `fa-procedures` | `from-blue-500 to-indigo-600` |
| 30 | Nefrologia | `nefrologia` | `fa-kidney` | `from-teal-600 to-cyan-700` |
| 31 | Oncologia | `oncologia` | `fa-ribbon` | `from-rose-500 to-pink-600` |
| 32 | Proctologia | `proctologia` | `fa-notes-medical` | `from-teal-500 to-emerald-600` |
| 33 | Angiologia | `angiologia` | `fa-heart-pulse` | `from-red-500 to-rose-600` |
| 34 | Nutrologia | `nutrologia` | `fa-weight-scale` | `from-green-500 to-emerald-600` |
| 35 | Homeopatia | `homeopatia` | `fa-leaf` | `from-green-400 to-lime-500` |
| 36 | Acupuntura | `acupuntura` | `fa-spa` | `from-teal-400 to-cyan-500` |
| 37 | Fisioterapia | `fisioterapia` | `fa-dumbbell` | `from-orange-500 to-amber-600` |

---

## 🔧 CÓDIGO IMPLEMENTADO

### 1. **HTML do Modal** (index.html)

```html
<!-- Modal Iframe Especialidades (Compacto) -->
<div id="specialty-modal" class="hidden fixed inset-0 z-[9999] overflow-hidden">
    <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onclick="closeSpecialtyModal()"></div>
    <div class="relative h-full flex items-center justify-center p-2">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slideUp">
            <!-- Header Compacto com Cores Dinâmicas -->
            <div id="specialty-modal-header" class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-t-xl flex justify-between items-center">
                <h3 class="text-base font-bold flex items-center">
                    <i id="specialty-modal-icon" class="fas fa-stethoscope mr-2 text-lg"></i>
                    <span id="specialty-modal-title">Especialidade</span>
                </h3>
                <button onclick="closeSpecialtyModal()" class="text-white hover:text-gray-200 text-xl font-bold transition">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Iframe Container -->
            <div class="flex-1 overflow-hidden relative">
                <!-- Loading -->
                <div id="specialty-loading" class="absolute inset-0 flex items-center justify-center bg-white">
                    <div class="text-center">
                        <div class="spinner mx-auto mb-3"></div>
                        <p class="text-sm text-gray-600">Carregando especialidade...</p>
                    </div>
                </div>
                
                <iframe 
                    id="specialty-iframe" 
                    src="" 
                    class="w-full h-full border-0"
                    onload="hideSpecialtyLoading()"
                ></iframe>
            </div>
        </div>
    </div>
</div>
```

### 2. **JavaScript** (index.html)

```javascript
// Configurações das 33 especialidades (cores e ícones)
const specialtyConfigs = {
    'alergia-e-imunologia-pediatrica': { name: 'Alergia e Imunologia Pediátrica', icon: 'fa-allergies', gradient: 'from-pink-400 to-rose-500' },
    'cardiologia': { name: 'Cardiologia', icon: 'fa-heartbeat', gradient: 'from-red-500 to-pink-600' },
    // ... [31 especialidades restantes]
};

// Abre modal de especialidade com cores e ícones dinâmicos
function openSpecialtyModal(specialtyName, specialtySlug) {
    const modal = document.getElementById('specialty-modal');
    const iframe = document.getElementById('specialty-iframe');
    const header = document.getElementById('specialty-modal-header');
    const title = document.getElementById('specialty-modal-title');
    const icon = document.getElementById('specialty-modal-icon');
    const loading = document.getElementById('specialty-loading');
    
    // Obter configuração da especialidade
    const config = specialtyConfigs[specialtySlug];
    
    if (config) {
        // Definir título e ícone
        title.textContent = config.name;
        icon.className = `fas ${config.icon} mr-2 text-lg`;
        
        // Atualizar gradiente do header
        header.className = `bg-gradient-to-r ${config.gradient} text-white px-4 py-2.5 rounded-t-xl flex justify-between items-center`;
    }
    
    // Mostrar loading
    loading.style.display = 'flex';
    
    // Definir src do iframe
    const pageUrl = `especialidade-${specialtySlug}.html`;
    iframe.src = pageUrl;
    
    // Mostrar modal
    modal.classList.remove('hidden');
    document.body.classList.add('iframe-modal-open');
}

function closeSpecialtyModal() {
    const modal = document.getElementById('specialty-modal');
    const iframe = document.getElementById('specialty-iframe');
    
    modal.classList.add('hidden');
    iframe.src = '';
    document.body.classList.remove('iframe-modal-open');
}

function hideSpecialtyLoading() {
    const loading = document.getElementById('specialty-loading');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSpecialtyModal();
    }
});
```

### 3. **Dropdown Modificado** (js/main.js)

```javascript
// Popular Dropdown de Especialidades
function populateEspecialidadesDropdown() {
    const menuContainer = document.querySelector('#especialidades-dropdown-menu .p-2');
    if (!menuContainer) return;
    
    // Criar button para cada especialidade (abre em iframe modal)
    specialties.forEach(specialty => {
        const button = document.createElement('button');
        const specialtySlug = specialty.name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/\//g, '-') // Substitui / por -
            .replace(/\s+/g, '-'); // Substitui espaços por -
        
        button.type = 'button';
        button.className = 'block w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition text-sm';
        button.onclick = function() {
            openSpecialtyModal(specialty.name, specialtySlug);
            // Fechar dropdown após clicar
            document.getElementById('especialidades-dropdown-menu').classList.add('hidden');
        };
        button.innerHTML = `
            <i class="fas ${specialty.icon} text-primary mr-2"></i>
            ${specialty.name}
        `;
        
        menuContainer.appendChild(button);
    });
}
```

### 4. **CSS** (css/iframe-modal.css)

```css
/* Specialty Modal Compacto */
#specialty-modal {
    animation: fadeIn 0.3s ease-out;
}

#specialty-modal > div > div {
    animation: slideUp 0.4s ease-out;
}

/* Specialty iframe responsivo - Médio (640px) */
#specialty-iframe {
    min-height: 600px;
}

/* Mobile - Specialty Modal Fullscreen */
@media (max-width: 768px) {
    #specialty-modal .max-w-2xl {
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }
    
    #specialty-modal .rounded-xl {
        border-radius: 0;
    }
    
    #specialty-modal .rounded-t-xl {
        border-radius: 0;
    }
    
    #specialty-iframe {
        min-height: calc(100vh - 50px);
    }
}
```

---

## 🎬 FLUXO DE FUNCIONAMENTO

1. **Usuário clica no dropdown "Especialidades"**
2. **Lista de 33 especialidades é exibida**
3. **Usuário clica em uma especialidade (ex: "Cardiologia")**
4. **JavaScript executa** `openSpecialtyModal('Cardiologia', 'cardiologia')`
5. **Modal é exibido com:**
   - Header com gradiente vermelho-rosa
   - Ícone de coração (fa-heartbeat)
   - Título "Cardiologia"
   - Loading spinner
6. **Iframe carrega** `especialidade-cardiologia.html`
7. **Loading desaparece** após iframe carregar
8. **Usuário interage** com o conteúdo da especialidade dentro do iframe
9. **Usuário fecha** clicando em X, ESC ou fora do modal

---

## 📱 RESPONSIVIDADE

### Desktop (≥768px)
- Modal: 640px × 90vh
- Centralizado na tela
- Background com blur
- Bordas arredondadas

### Mobile (<768px)
- Modal: 100vw × 100vh (fullscreen)
- Sem bordas arredondadas
- Header fixo no topo
- Iframe ocupa toda altura restante

---

## 🎨 DIFERENÇAS ENTRE OS 3 TIPOS DE MODAL

| Característica | Auth Modal | Program Modal | Specialty Modal |
|----------------|-----------|---------------|-----------------|
| **Largura** | 448px | 640px | 640px |
| **Altura** | 85vh | 90vh | 90vh |
| **Tamanho** | Pequeno | Médio | Médio |
| **Cores** | Fixas (azul) | Dinâmicas (6 configs) | Dinâmicas (33 configs) |
| **Conteúdo** | Login/Cadastro | Programas KaiNow | Especialidades Médicas |
| **Ícones** | Fixos | Dinâmicos | Dinâmicos |
| **Mobile** | Fullscreen | Fullscreen | Fullscreen |

---

## 🎉 RESULTADO FINAL

Agora o site KaiNow possui **3 sistemas de modal iframe integrados**:

1. 🔐 **Auth Modal** (448px) - Login e Cadastro
2. 💝 **Program Modal** (640px) - 6 Programas KaiNow
3. 🏥 **Specialty Modal** (640px) - 33 Especialidades Médicas

Todos com:
- ✅ Design compacto e profissional
- ✅ Cores e ícones dinâmicos
- ✅ Animações suaves
- ✅ Responsividade mobile
- ✅ Loading indicators
- ✅ Fechar com ESC ou click-outside

---

## 📚 REFERÊNCIAS

- Modal Auth: 🪟-IFRAME-LOGIN-COMPACTO.md
- Modal Programas: 🎯-IFRAME-PROGRAMAS-COMPACTO.md
- Especialidades: 📊-SESSAO-ESPECIALIDADES-COMPLETA.md

---

✅ **IMPLEMENTAÇÃO CONCLUÍDA COM SUCESSO!** 🎉
