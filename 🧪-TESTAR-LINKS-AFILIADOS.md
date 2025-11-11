# 🧪 TESTE DE LINKS DE AFILIADOS

## 🎯 OBJETIVO

Testar se os links de afiliados estão:
1. ✅ Usando username correto
2. ✅ Mostrando banner de indicação
3. ✅ Mantendo referência no checkout
4. ✅ Configurando split de pagamento

---

## 📋 LINKS CORRETOS DOS AFILIADOS

### **RUTHYELI GOMES COSTA SILVA**
Username: `ruthyelisilva138`

```
https://kainow.com.br/programa-mulher.html?ref=ruthyelisilva138
https://kainow.com.br/programa-senior.html?ref=ruthyelisilva138
https://kainow.com.br/programa-farma.html?ref=ruthyelisilva138
https://kainow.com.br/programa-acolher.html?ref=ruthyelisilva138
https://kainow.com.br/programa-orienta.html?ref=ruthyelisilva138
https://kainow.com.br/programa-vivaleve.html?ref=ruthyelisilva138
```

### **GELCI JOSE DA SILVA**
Username: `gelcijosegrouptrig`

```
https://kainow.com.br/programa-mulher.html?ref=gelcijosegrouptrig
https://kainow.com.br/programa-senior.html?ref=gelcijosegrouptrig
(... e assim por diante)
```

### **Gelci Silva**
Username: `gelcisilva252`

```
https://kainow.com.br/programa-mulher.html?ref=gelcisilva252
https://kainow.com.br/programa-senior.html?ref=gelcisilva252
(... e assim por diante)
```

---

## ✅ CHECKLIST DE TESTE

### **TESTE 1: Verificar Link Gerado**

1. **Acesse:**
   ```
   https://kainow.com.br/admin/gerenciar-afiliados.html
   ```

2. **Clique em "Ver Links"** de qualquer afiliado

3. **Verifique:**
   - [ ] Link usa `?ref=username` (não `?ref=IbJkR0mo...`)
   - [ ] Username está correto
   - [ ] Domínio é `kainow.com.br`

---

### **TESTE 2: Abrir Link (Página do Programa)**

1. **Copie um link** (ex: programa-mulher.html)

2. **Abra em aba anônima** (Ctrl+Shift+N)

3. **Verifique:**
   - [ ] Banner no topo: "✨ Indicado por: [NOME DO AFILIADO]"
   - [ ] Informações do programa aparecem
   - [ ] Botão "Assinar com PIX" presente
   - [ ] Preço correto (R$ 49,90 para Mulher)

---

### **TESTE 3: Ir para Checkout**

1. **Clique em "Assinar com PIX"**

2. **Verifique a URL:**
   - [ ] URL mantém `?ref=username`
   - [ ] Não perdeu a referência do afiliado

3. **Verifique a página:**
   - [ ] Mostra dados do programa
   - [ ] Mostra valor total
   - [ ] Tem formulário de dados pessoais

---

### **TESTE 4: Verificar Split (Informações)**

No checkout, procure por:

1. **Resumo de Split:**
   ```
   💰 Divisão do Pagamento:
   - Afiliado (20%): R$ 9,98
   - Plataforma (80%): R$ 39,92
   ```

2. **Informações do Afiliado:**
   ```
   👤 Divulgador: RUTHYELI GOMES COSTA SILVA
   💳 PIX: 964.508.868-20
   ```

---

## 🔍 VERIFICAR NO CONSOLE (F12)

Abra o console do navegador (F12) e procure por:

```javascript
// Ao abrir a página do programa:
console.log('🎯 Afiliado detectado:', 'ruthyelisilva138');

// Ao ir para checkout:
console.log('💰 Split configurado:', {
    affiliate: 'ruthyelisilva138',
    affiliateAmount: 9.98,
    platformAmount: 39.92
});
```

---

## ⚠️ PROBLEMAS COMUNS

### **Problema 1: Link com ID ao invés de Username**
```
❌ ?ref=IbJkR0mo1Thv5g7C8k01
✅ ?ref=ruthyelisilva138
```

**Solução:** Publicar correção aplicada

---

### **Problema 2: Banner não aparece**
```
❌ Página carrega sem banner
```

**Verificar:**
1. URL tem `?ref=username`?
2. JavaScript está carregando?
3. Console tem erros?

---

### **Problema 3: Referência perde no checkout**
```
❌ programa-mulher.html?ref=username
✅ Mas checkout.html sem ?ref
```

**Solução:** Verificar redirecionamento em `programa-*.html`

---

## 🧪 TESTE COMPLETO PASSO A PASSO

### **1. Prepare o teste:**
```bash
# Abra 3 abas:
1. Admin (gerenciar afiliados)
2. Aba anônima (para teste)
3. Console do navegador (F12)
```

### **2. Pegue o link:**
```bash
1. Admin → Ver Links → Copiar link "KaiNow Mulher"
2. Verificar se usa username (não ID)
```

### **3. Teste o link:**
```bash
1. Cole na aba anônima
2. Aguarde carregar
3. Verificar banner "Indicado por:"
4. Verificar console (F12)
```

### **4. Teste o checkout:**
```bash
1. Clique em "Assinar com PIX"
2. Verificar URL mantém ?ref=
3. Verificar split de pagamento
4. NÃO completar o pagamento (é teste)
```

---

## 📊 RESULTADOS ESPERADOS

### **✅ SUCESSO:**
```
✓ Link usa username
✓ Banner aparece
✓ Referência mantida no checkout
✓ Split configurado (se backend estiver pronto)
```

### **❌ FALHA:**
```
✗ Link usa ID do Firestore
✗ Banner não aparece
✗ Referência perdida
✗ Split não configurado
```

---

## 🎯 PRÓXIMOS PASSOS

### **Se os links estiverem corretos:**
1. ✅ Sistema está pronto para divulgação
2. ✅ Afiliados podem começar a compartilhar
3. ⚠️ Backend precisa ser configurado para split real

### **Se precisar corrigir:**
1. Publicar a correção aplicada
2. Limpar cache (Ctrl+Shift+R)
3. Testar novamente

---

## 💡 NOTAS IMPORTANTES

### **Split de Pagamento Real:**

O split automático via PIX requer:

1. **Gateway de Pagamento:**
   - Woovi (OpenPix) - suporta split nativo
   - Mercado Pago - suporta marketplace
   - Outro gateway compatível

2. **Backend:**
   - Webhook para receber notificação
   - Sistema para dividir pagamento
   - API para transferir comissão

3. **Configuração:**
   - Cadastro na plataforma do gateway
   - API keys configuradas
   - Webhook endpoint configurado

### **Status Atual:**
- ✅ Frontend preparado
- ✅ Links rastreiam afiliado
- ⚠️ Backend precisa implementar split real

---

## 📞 SUPORTE

Se encontrar problemas:
1. Anote o erro exato
2. Tire screenshot
3. Verifique console (F12)
4. Informe qual teste falhou

---

**Atualizado:** 10/11/2025  
**Status:** Correção aplicada, aguardando publicação
