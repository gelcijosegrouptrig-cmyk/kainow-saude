# 🎯 O QUE VOCÊ VAI VER - Guia Visual

## 📱 QUANDO VOCÊ FIZER LOGIN

---

## 🟢 CENÁRIO 1: SERVIDOR FUNCIONANDO

### URL que você verá:
```
https://kainow.com.br/afiliado/dashboard.html
```

### Tela (descrição):
```
╔════════════════════════════════════════════════════════╗
║  [👤] Gelci Silva                      [🚪 Sair]      ║
║  ID: gelcisilva252                                     ║
╚════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────┐
│                                                      │
│  [📊] Total de Vendas: 0                            │
│  [💰] Comissão Total: R$ 0,00                       │
│  [%] Sua Comissão: 20%                              │
│  [👆] Cliques: 0                                     │
│                                                      │
└──────────────────────────────────────────────────────┘

📎 SEUS LINKS DE DIVULGAÇÃO:

┌────────────────────────────────────────────────────────┐
│ [👩] KaiNow Mulher                                     │
│ R$ 49,90/mês • Você ganha R$ 9,98                      │
│ https://kainow.com.br/programa-mulher.html?ref=...    │
│ [📋 Copiar Link]                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ [🛡️] KaiNow Sênior                                     │
│ R$ 59,90/mês • Você ganha R$ 11,98                     │
│ https://kainow.com.br/programa-senior.html?ref=...    │
│ [📋 Copiar Link]                                       │
└────────────────────────────────────────────────────────┘

... e mais 4 programas!
```

**🟢 SEM BANNER AMARELO = MODO ONLINE**

---

## 🟡 CENÁRIO 2: SERVIDOR NÃO FUNCIONANDO

### URL que você verá:
```
https://kainow.com.br/afiliado/dashboard-offline.html
```

### Tela (descrição):
```
╔════════════════════════════════════════════════════════════╗
║  [👤] Gelci Silva    [🔌 OFFLINE] [🔄 Reconectar] [🚪 Sair] ║
║  ID: gelcisilva252                                         ║
╚════════════════════════════════════════════════════════════╝

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🔌 MODO OFFLINE ATIVADO                                ┃
┃                                                         ┃
┃  Você está usando a versão offline do dashboard.       ┃
┃  Seus links de divulgação estão prontos para uso!      ┃
┃                                                         ┃
┃  ℹ️ Por que estou no modo offline?                     ┃
┃  Seu dispositivo não conseguiu conectar ao servidor    ┃
┃  Firebase. Isso pode ser problema de internet,         ┃
┃  firewall, ou bloqueio regional.                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌──────────────────────────────────────────────────────┐
│                                                      │
│  [📊] Total de Vendas: 0                            │
│  [💰] Comissão Total: R$ 0,00                       │
│  [%] Sua Comissão: 20%                              │
│  [👆] Cliques: 0                                     │
│                                                      │
└──────────────────────────────────────────────────────┘

📎 SEUS LINKS DE DIVULGAÇÃO:

┌────────────────────────────────────────────────────────┐
│ [👩] KaiNow Mulher                                     │
│ R$ 49,90/mês • Você ganha R$ 9,98                      │
│ https://kainow.com.br/programa-mulher.html?ref=...    │
│ [📋 Copiar Link]                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ [🛡️] KaiNow Sênior                                     │
│ R$ 59,90/mês • Você ganha R$ 11,98                     │
│ https://kainow.com.br/programa-senior.html?ref=...    │
│ [📋 Copiar Link]                                       │
└────────────────────────────────────────────────────────┘

... e mais 4 programas!
```

**🟡 BANNER AMARELO/LARANJA = MODO OFFLINE**

---

## 🔑 DIFERENÇAS VISUAIS

### Header (Topo da Página):

**ONLINE:**
```
[👤 Gelci Silva]                                    [🚪 Sair]
ID: gelcisilva252
```

**OFFLINE:**
```
[👤 Gelci Silva]    [🔌 OFFLINE] [🔄 Reconectar] [🚪 Sair]
ID: gelcisilva252
```

### Badge Modo Offline:
```
┌───────────────┐
│ 🔌 MODO OFFLINE│  ← Amarelo/preto
└───────────────┘
```

### Banner de Aviso:
```
╔═══════════════════════════════════════════════════════╗
║  🔌 MODO OFFLINE ATIVADO                              ║
║                                                       ║
║  (Explicação do que aconteceu)                        ║
║  (Por que está no modo offline)                       ║
╚═══════════════════════════════════════════════════════╝
```
**Cor:** Gradiente amarelo → laranja  
**Ícone:** 🔌 ou 📡 ou 🔴  

---

## 🎯 O QUE FUNCIONA EM CADA MODO

### ✅ MODO ONLINE (dashboard.html)

**Funciona:**
- ✅ Estatísticas em tempo real
- ✅ Total de vendas atualizado
- ✅ Comissões acumuladas
- ✅ Histórico de vendas
- ✅ Links de divulgação
- ✅ Atualizar dados PIX
- ✅ Personalizar slug
- ✅ Ver cliques (futuro)

**Aparência:**
- Sem banner amarelo
- Sem badge "OFFLINE"
- Sem botão "Reconectar"

---

### ⚠️ MODO OFFLINE (dashboard-offline.html)

**Funciona:**
- ✅ Links de divulgação (PRINCIPAL!)
- ✅ Copiar e compartilhar links
- ✅ Ver sua comissão (%)
- ✅ Ver seus dados pessoais
- ✅ Logout

**NÃO Funciona:**
- ⚠️ Estatísticas atualizadas (mostra 0)
- ⚠️ Histórico de vendas
- ⚠️ Atualizar dados PIX
- ⚠️ Personalizar slug
- ⚠️ Ver cliques

**Aparência:**
- ✅ Banner amarelo/laranja grande
- ✅ Badge "🔌 MODO OFFLINE"
- ✅ Botão verde "🔄 Reconectar"

---

## 📋 SEUS 6 LINKS (Sempre Funcionam!)

### No modo ONLINE ou OFFLINE, você verá:

```
1. KaiNow Mulher
   https://kainow.com.br/programa-mulher.html?ref=gelcisilva252
   R$ 49,90/mês • Você ganha R$ 9,98
   
2. KaiNow Sênior
   https://kainow.com.br/programa-senior.html?ref=gelcisilva252
   R$ 59,90/mês • Você ganha R$ 11,98
   
3. KaiNow Farma
   https://kainow.com.br/programa-farma.html?ref=gelcisilva252
   R$ 19,90/mês • Você ganha R$ 3,98
   
4. KaiNow Acolher
   https://kainow.com.br/programa-acolher.html?ref=gelcisilva252
   R$ 24,90/mês • Você ganha R$ 4,98
   
5. KaiNow Orienta
   https://kainow.com.br/programa-orienta.html?ref=gelcisilva252
   R$ 19,90/mês • Você ganha R$ 3,98
   
6. KaiNow Viva Leve
   https://kainow.com.br/programa-vivaleve.html?ref=gelcisilva252
   R$ 24,90/mês • Você ganha R$ 4,98
```

**Cada link tem:**
- Nome do programa
- Ícone colorido
- Preço mensal
- Sua comissão
- Link completo com seu ID
- Botão "Copiar" azul

---

## 🔄 BOTÃO RECONECTAR

### Quando você clica em "🔄 Reconectar":

**Popup de Confirmação:**
```
┌─────────────────────────────────────────────┐
│  🔄 Tentar reconectar ao servidor?          │
│                                             │
│  Isso vai redirecionar você para o          │
│  dashboard online e verificar se o          │
│  servidor Firebase está acessível agora.    │
│                                             │
│  [Cancelar]  [OK]                           │
└─────────────────────────────────────────────┘
```

**Se clicar OK:**
1. Você é redirecionado para `dashboard.html`
2. Sistema testa Firestore (10 segundos)
3. **Se OK:** Fica em dashboard.html (online)
4. **Se ERRO:** Volta para dashboard-offline.html

---

## 💡 DICAS VISUAIS

### Como saber em qual modo estou?

**3 formas:**

1. **URL no navegador:**
   - `...dashboard.html` = ONLINE
   - `...dashboard-offline.html` = OFFLINE

2. **Badge no header:**
   - Sem badge = ONLINE
   - Badge "🔌 MODO OFFLINE" = OFFLINE

3. **Banner grande:**
   - Sem banner amarelo = ONLINE
   - Banner "🔌 MODO OFFLINE ATIVADO" = OFFLINE

---

## 🎯 RESUMO VISUAL RÁPIDO

```
╔════════════════════════════════════════════════╗
║                                                ║
║            COMO IDENTIFICAR O MODO             ║
║                                                ║
╠════════════════════════════════════════════════╣
║                                                ║
║  🟢 ONLINE:                                    ║
║     • URL: dashboard.html                      ║
║     • Sem badge amarelo                        ║
║     • Sem banner de aviso                      ║
║     • Estatísticas funcionando                 ║
║                                                ║
║  🟡 OFFLINE:                                   ║
║     • URL: dashboard-offline.html              ║
║     • Badge "🔌 MODO OFFLINE"                  ║
║     • Banner amarelo/laranja                   ║
║     • Botão "🔄 Reconectar"                    ║
║     • Estatísticas zeradas                     ║
║                                                ║
║  ✅ AMBOS:                                     ║
║     • 6 links prontos                          ║
║     • Botão copiar funciona                    ║
║     • Pode divulgar normalmente                ║
║                                                ║
╚════════════════════════════════════════════════╝
```

---

## 🚀 TESTE AGORA E VEJA

**Faça o login:**
```
URL: kainow.com.br/afiliado/login.html
Username: gelcisilva252
Senha: kainowipxujp
```

**O sistema vai escolher automaticamente:**
- 🟢 Servidor OK → Modo Online
- 🟡 Servidor com problema → Modo Offline

**Você NÃO precisa fazer nada!**

**Seus links estarão prontos em QUALQUER modo! ✨**

---

**Atualizado:** 10/11/2025 18:45  
**Próximo passo:** TESTE AGORA! 🎯
