# 🏥 KaiNow Backend API

Backend completo para o sistema KaiNow Saúde construído com Node.js, Express e MongoDB.

---

## 📋 Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local ou Atlas)

---

## 🚀 Instalação

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações
nano .env
```

**Configurações mínimas necessárias:**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kainow
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
```

### 3. Iniciar Servidor

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará disponível em: `http://localhost:3000`

---

## 📡 Endpoints da API

### Autenticação (`/api/auth`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cadastrar novo usuário |
| POST | `/api/auth/login` | Fazer login |
| POST | `/api/auth/logout` | Fazer logout |
| POST | `/api/auth/forgot-password` | Solicitar recuperação de senha |
| POST | `/api/auth/reset-password` | Resetar senha |

### Usuários (`/api/users`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users/me` | Obter perfil do usuário logado |
| PUT | `/api/users/me` | Atualizar perfil |

### Agendamentos (`/api/appointments`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/appointments` | Listar agendamentos |
| POST | `/api/appointments` | Criar agendamento |
| GET | `/api/appointments/:id` | Obter agendamento específico |
| PUT | `/api/appointments/:id` | Atualizar agendamento |
| DELETE | `/api/appointments/:id` | Cancelar agendamento |

### Especialidades (`/api/specialties`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/specialties` | Listar especialidades |

### Programas (`/api/programs`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/programs` | Listar programas |

---

## 🧪 Exemplos de Uso

### Cadastrar Usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678900",
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123",
    "telefone": "(11) 98765-4321",
    "dataNascimento": "1990-01-01",
    "genero": "masculino"
  }'
```

### Fazer Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678900",
    "senha": "senha123"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso!",
  "data": {
    "user": {
      "id": "...",
      "cpf": "12345678900",
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Acessar Rota Protegida

```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🗄️ Estrutura do Banco de Dados

### Coleção: Users

```javascript
{
  _id: ObjectId,
  cpf: String,
  nome: String,
  email: String,
  telefone: String,
  dataNascimento: Date,
  genero: String,
  senha: String (hash),
  status: String,
  emailVerificado: Boolean,
  assinaturas: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Segurança

- ✅ Senhas com hash bcrypt
- ✅ JWT para autenticação
- ✅ Rate limiting
- ✅ Helmet para headers HTTP
- ✅ CORS configurável
- ✅ Validação de inputs
- ✅ Proteção contra tentativas de login

---

## 📦 Scripts Disponíveis

```bash
npm start      # Iniciar servidor (produção)
npm run dev    # Iniciar com auto-reload (desenvolvimento)
npm test       # Executar testes
```

---

## 🐛 Debugging

Para ativar logs detalhados, defina no `.env`:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

---

## 📝 Próximos Passos

- [ ] Implementar rotas de usuários completas
- [ ] Implementar sistema de agendamentos
- [ ] Adicionar upload de arquivos
- [ ] Implementar notificações (email/SMS)
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar rate limiting por usuário
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar cache com Redis
- [ ] Adicionar monitoramento (Sentry)

---

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**🏥 KaiNow Saúde - Backend API v1.0.0**
