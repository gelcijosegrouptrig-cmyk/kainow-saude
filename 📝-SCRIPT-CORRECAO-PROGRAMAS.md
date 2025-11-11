# 📝 Script para Corrigir Todos os Programas

## 🎯 Objetivo

Adicionar o código de checkout com afiliados em TODOS os 5 programas restantes.

---

## 📋 Código a Adicionar

**Adicionar ANTES da tag `</body>` em cada arquivo:**

```html
<!-- Sistema de Redirecionamento para Checkout -->
<script src="js/checkout-redirect.js"></script>

<!-- Sistema de Rastreamento de Afiliados -->
<script src="js/affiliate-tracker.js"></script>

<script>
    // Mostrar banner de afiliado se houver referência na URL
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get('ref');
    
    if (affiliateRef) {
        console.log('🎯 Programa acessado via afiliado:', affiliateRef);
        
        // Opcional: Mostrar banner de afiliado
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50';
        banner.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-user-check"></i>
                <span class="font-semibold">Indicado por: ${affiliateRef}</span>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Remover banner após 5 segundos
        setTimeout(() => {
            banner.style.opacity = '0';
            banner.style.transition = 'opacity 0.5s';
            setTimeout(() => banner.remove(), 500);
        }, 5000);
    }
</script>
</body>
</html>
```

---

## 📁 Arquivos a Atualizar

### ✅ programa-mulher.html
**Status:** JÁ CORRIGIDO

### ⏳ programa-senior.html
**Ação:** Adicionar código antes de `</body>`

### ⏳ programa-farma.html  
**Ação:** Adicionar código antes de `</body>`

### ⏳ programa-acolher.html
**Ação:** Adicionar código antes de `</body>`

### ⏳ programa-orienta.html
**Ação:** Adicionar código antes de `</body>`

### ⏳ programa-vivaleve.html
**Ação:** Adicionar código antes de `</body>`

---

## 🔧 Como Aplicar Manualmente

### **Passo 1:** Abrir arquivo
```
Abrir: programa-senior.html
```

### **Passo 2:** Buscar final
```
Ctrl+F (ou Cmd+F no Mac)
Buscar: </body>
```

### **Passo 3:** Adicionar código
```
ANTES da tag </body>, colar o código acima
```

### **Passo 4:** Salvar
```
Ctrl+S (ou Cmd+S)
```

### **Passo 5:** Repetir
```
Fazer o mesmo para os outros 4 programas
```

---

## ✅ Verificação

**Após atualizar cada arquivo, testar:**

```
https://kainow.com.br/programa-senior?ref=teste
```

**Deve:**
1. ✅ Mostrar banner "Indicado por: teste"
2. ✅ Botão PIX funcionar
3. ✅ Redirecionar para checkout
4. ✅ Manter `ref=teste` na URL

---

## 🎯 Atalho Rápido

**Se tiver acesso via linha de comando:**

```bash
# Criar script de atualização
cat > atualizar-programas.sh << 'EOF'
#!/bin/bash

CODIGO='
<!-- Sistema de Redirecionamento para Checkout -->
<script src="js/checkout-redirect.js"></script>

<!-- Sistema de Rastreamento de Afiliados -->
<script src="js/affiliate-tracker.js"></script>

<script>
    // Banner de afiliado
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateRef = urlParams.get("ref");
    
    if (affiliateRef) {
        console.log("🎯 Programa acessado via afiliado:", affiliateRef);
        
        const banner = document.createElement("div");
        banner.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50";
        banner.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-user-check"></i>
                <span class="font-semibold">Indicado por: ${affiliateRef}</span>
            </div>
        `;
        document.body.appendChild(banner);
        
        setTimeout(() => {
            banner.style.opacity = "0";
            banner.style.transition = "opacity 0.5s";
            setTimeout(() => banner.remove(), 500);
        }, 5000);
    }
</script>
</body>
</html>'

# Atualizar cada arquivo
for file in programa-senior.html programa-farma.html programa-acolher.html programa-orienta.html programa-vivaleve.html; do
    echo "Atualizando $file..."
    
    # Remove </body></html> do final
    sed -i 's|</body>.*</html>||g' "$file"
    
    # Adiciona novo código
    echo "$CODIGO" >> "$file"
    
    echo "✅ $file atualizado"
done

echo "🎉 Todos os programas atualizados!"
EOF

chmod +x atualizar-programas.sh
./atualizar-programas.sh
```

---

## 📊 Status Final Esperado

| Arquivo | Status |
|---------|--------|
| programa-mulher.html | ✅ FUNCIONANDO |
| programa-senior.html | ✅ FUNCIONANDO |
| programa-farma.html | ✅ FUNCIONANDO |
| programa-acolher.html | ✅ FUNCIONANDO |
| programa-orienta.html | ✅ FUNCIONANDO |
| programa-vivaleve.html | ✅ FUNCIONANDO |

---

## 🧪 Testar Todos

**Após atualizar, testar cada um:**

```
https://kainow.com.br/programa-senior?ref=teste123
https://kainow.com.br/programa-farma?ref=teste123
https://kainow.com.br/programa-acolher?ref=teste123
https://kainow.com.br/programa-orienta?ref=teste123
https://kainow.com.br/programa-vivaleve?ref=teste123
```

**Checklist para cada:**
- [ ] Banner aparece
- [ ] Botão PIX funciona
- [ ] Redireciona para checkout
- [ ] Mantém `ref=teste123` na URL

---

## 💡 Dica Visual

**Use o arquivo:** `ATUALIZAR-TODOS-PROGRAMAS.html`

Interface visual para copiar/colar facilmente!

---

**Tempo estimado:** 2 minutos por arquivo = 10 minutos total

**Status:** 📝 Script documentado e pronto para uso

