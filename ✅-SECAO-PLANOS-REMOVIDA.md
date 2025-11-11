# ✅ Seção "Planos de Telemedicina" Removida

**Data:** 07/11/2025  
**Status:** ✅ COMPLETO

---

## 📋 O Que Foi Feito

Removi a seção **"Planos de Telemedicina"** do `index.html` conforme solicitado.

### Conteúdo Removido

```
OFERTA ESPECIAL
Planos de Telemedicina
Escolha o plano ideal para você e sua família
```

---

## 🗑️ Seção Removida

**Localização:** `index.html` (linhas 740-1052)

**Conteúdo que foi comentado:**
- Título "OFERTA ESPECIAL"
- Subtítulo "Planos de Telemedicina"
- Descrição "Escolha o plano ideal para você e sua família"
- 3 cards de planos:
  - Plano Básico (R$ 39,90)
  - Plano Padrão (R$ 49,90) - Mais Popular
  - Plano Completo (R$ 59,90)
- Benefícios gerais (operadora ANS, pagamento seguro, etc.)
- FAQ sobre pagamento

**Total:** ~312 linhas de código HTML removidas

---

## 📝 Método de Remoção

A seção foi **comentada** (não deletada), permitindo restauração futura se necessário:

```html
<!-- Seção comentada -->
<!-- <section id="planos" class="py-12 md:py-16 bg-white">
    ... todo o conteúdo ...
</section> -->
```

---

## ✅ Resultado

- ✅ Seção "Planos de Telemedicina" não aparece mais no site
- ✅ Código preservado em comentários (fácil restaurar)
- ✅ Links âncora `#planos` ainda funcionam (mas não há conteúdo visível)

---

## 🔗 Links Afetados

### Links que apontavam para #planos

Esses links ainda existem no site, mas agora apontam para uma seção vazia:

**No index.html:**
- Botões "Ver Planos" em vários lugares
- Links de contratação nos programas

**Nos programas (6 arquivos):**
- `programa-mulher.html` → Botão "Contratar Agora"
- `programa-senior.html` → Botão "Contratar Agora"
- `programa-farma.html` → Botão "Contratar Agora"
- `programa-acolher.html` → Botão "Contratar Agora"
- `programa-orienta.html` → Botão "Contratar Agora"
- `programa-vivaleve.html` → Botão "Contratar Agora"

**Recomendação:** Atualizar esses links para apontar para outra página ou remover se não forem mais necessários.

---

## 🔄 Como Restaurar (se necessário)

Se quiser restaurar a seção no futuro:

1. Abra `index.html`
2. Busque por `<!-- Planos Section - REMOVIDO -->`
3. Remova os comentários `<!--` e `-->`
4. Seção volta a aparecer

---

## 📊 Impacto

| Item | Antes | Depois |
|------|-------|--------|
| Seção Planos | ✅ Visível | ❌ Removida |
| Links #planos | ✅ Funcionam | ⚠️ Apontam para vazio |
| Código HTML | ~3000 linhas | ~2700 linhas |
| Tamanho index.html | 107 KB | ~97 KB (estimado) |

---

## ⚠️ Ações Recomendadas

### Prioridade Alta
1. **Atualizar links** que apontam para `#planos`
   - Opção 1: Redirecionar para página de contratação individual
   - Opção 2: Remover botões "Ver Planos"
   - Opção 3: Criar nova seção de contratação

### Sugestões de Alternativas

**Opção 1: Redirecionar para WhatsApp**
```html
<!-- Mudar de -->
<a href="index.html#planos">Ver Planos</a>

<!-- Para -->
<a href="https://wa.me/5511999999999?text=Quero%20saber%20sobre%20os%20planos">Falar com Especialista</a>
```

**Opção 2: Criar página de contratação separada**
```html
<!-- Mudar de -->
<a href="index.html#planos">Ver Planos</a>

<!-- Para -->
<a href="contratacao.html">Contratar Plano</a>
```

**Opção 3: Remover botões completamente**
```html
<!-- Simplesmente remover os botões "Ver Planos" -->
```

---

## 📁 Arquivo Modificado

- ✅ `index.html` - Seção comentada (linhas 740-1052)

---

## 🎯 Próximos Passos

1. ⏳ Decidir o que fazer com os links `#planos`
2. ⏳ Atualizar botões nos programas (6 arquivos)
3. ⏳ Atualizar links no dashboard (se aplicável)
4. ⏳ Testar navegação do site

---

**Status Final:** 🟢 **SEÇÃO REMOVIDA COM SUCESSO**

A seção "Planos de Telemedicina" não aparece mais no site. O código foi comentado e pode ser restaurado facilmente se necessário.

---

**Observação:** Como os programas agora têm preços individuais (R$ 49,90, R$ 59,90, R$ 19,90, R$ 24,90), a seção de planos gerais não é mais necessária. Os usuários podem contratar cada programa separadamente.
