# ✅ Checklist de Deploy - Kainow Saúde

Use este checklist para acompanhar seu progresso no deploy!

---

## 📦 PREPARAÇÃO

- [ ] Projeto funcionando localmente
- [ ] Git instalado no computador
- [ ] Conta no GitHub criada
- [ ] Conta no Railway criada
- [ ] Credenciais do Woovi em mãos

---

## 🐙 GITHUB

- [ ] Repositório criado no GitHub (público ou privado)
- [ ] Git inicializado na pasta do projeto (`git init`)
- [ ] Arquivos adicionados ao git (`git add .`)
- [ ] Primeiro commit feito (`git commit -m "..."`)
- [ ] Repositório local conectado ao GitHub (`git remote add origin`)
- [ ] Código enviado para GitHub (`git push`)
- [ ] Verificado no GitHub que todos arquivos estão lá

---

## 🚂 RAILWAY - CONFIGURAÇÃO INICIAL

- [ ] Projeto criado no Railway
- [ ] Repositório GitHub conectado ao Railway
- [ ] Root Directory configurado como `backend`
- [ ] Deploy automático iniciado

---

## 🔧 RAILWAY - VARIÁVEIS DE AMBIENTE

- [ ] `WOOVI_APP_ID` adicionada
- [ ] `WOOVI_API_URL` adicionada
- [ ] `FIREBASE_PROJECT_ID` adicionada
- [ ] `NODE_ENV` adicionada (production)
- [ ] Variáveis salvas

---

## 🌍 RAILWAY - DEPLOY

- [ ] Build finalizado com sucesso (sem erros)
- [ ] Deploy finalizado com sucesso
- [ ] Logs mostram "Server running"
- [ ] Domain público gerado
- [ ] URL pública copiada e salva

---

## 🧪 RAILWAY - TESTES

- [ ] Health check funcionando (GET / retorna status OK)
- [ ] Backend responde na URL pública
- [ ] Logs não mostram erros críticos

---

## 🔗 WOOVI - WEBHOOK

- [ ] Dashboard Woovi acessado
- [ ] Webhook criado
- [ ] URL do webhook: `https://SUA-URL/webhook/woovi`
- [ ] Evento `OPENPIX:CHARGE_COMPLETED` selecionado
- [ ] Webhook ativado (status: ativo)
- [ ] Teste de webhook enviado (opcional)

---

## 🎯 TESTES END-TO-END

### Teste 1: Afiliado
- [ ] Afiliado de teste criado
- [ ] Chave PIX do afiliado configurada
- [ ] Link do afiliado copiado

### Teste 2: Cadastro
- [ ] Acessado link do afiliado
- [ ] Formulário de cadastro preenchido
- [ ] Cadastro finalizado com sucesso
- [ ] Redirecionado para página de pagamento

### Teste 3: Pagamento
- [ ] QR Code PIX gerado (real, não placeholder)
- [ ] brCode (código PIX) aparece
- [ ] QR Code é escaneável
- [ ] Dados do pagamento corretos (valor, nome, etc)

### Teste 4: Webhook
- [ ] Pagamento PIX realizado
- [ ] Aguardado 5-30 segundos
- [ ] Logs do Railway mostram webhook recebido
- [ ] Cliente ativado automaticamente (status: "ativo")
- [ ] Frontend detectou pagamento (redirecionou)

### Teste 5: Comissão
- [ ] Registro criado na coleção `comissoes` no Firestore
- [ ] Valor da comissão correto (20% do valor pago)
- [ ] Status da comissão: "pendente"
- [ ] Estatísticas do afiliado atualizadas

### Teste 6: Split Woovi
- [ ] Dashboard Woovi mostra transação
- [ ] Split aparece na transação
- [ ] Valor correto para afiliado (20%)
- [ ] Valor correto para empresa (80%)
- [ ] Transferência processada

---

## 📊 VERIFICAÇÃO FINAL

- [ ] Sistema funcionando 100% end-to-end
- [ ] Sem erros nos logs
- [ ] Documentação revisada
- [ ] URL de produção salva
- [ ] Credenciais seguras (não commitadas no git)

---

## 🎉 DEPLOY COMPLETO!

Se todos os itens acima estão marcados: **PARABÉNS! 🚀**

Seu sistema está 100% funcional em produção!

---

## 📝 INFORMAÇÕES PARA GUARDAR

```
GitHub Repo: https://github.com/SEU-USUARIO/kainow-saude
Railway URL: https://_____.up.railway.app
Webhook URL: https://_____.up.railway.app/webhook/woovi
Woovi Dashboard: https://app.woovi.com
Firebase Console: https://console.firebase.google.com
```

---

## 🔄 PRÓXIMAS ATUALIZAÇÕES

Quando fizer mudanças no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```

Railway faz deploy automático! ✨

---

**Data do Deploy:** ___/___/_____  
**Status:** ✅ FUNCIONAL | ⚠️ EM TESTES | ❌ COM PROBLEMAS

---

## 🆘 Problemas?

Consulte:
- `🚂-RAILWAY-DEPLOY-COMPLETO.md` - Guia detalhado
- `⚡-DEPLOY-RAPIDO-5-PASSOS.md` - Versão resumida
- Logs do Railway - Para erros em tempo real
