# 📚 Sistema de Chamados API

API REST desenvolvida em Node.js para gerenciamento de chamados de suporte técnico.

O projeto foi desenvolvido com foco em boas práticas de arquitetura, autenticação JWT, documentação OpenAPI (Swagger) e organização em camadas utilizando Services, Controllers e Models.

---

# 🚀 Funcionalidades

- Autenticação com JWT
- Autorização por cargos
- CRUD de usuários
- Aprovação e rejeição de usuários
- CRUD de chamados
- Assumir chamados
- Resolver chamados
- Fechar chamados
- CRUD de categorias
- Comentários em chamados
- Histórico automático de alterações
- Dashboard com estatísticas
- Filtros
- Busca textual
- Paginação
- Ordenação
- Documentação Swagger
- Seeders para ambiente de testes

---

# 🛠 Tecnologias

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT
- Bcrypt
- Swagger (OpenAPI)
- Docker
- ESLint
- Prettier

---

# 📂 Estrutura do projeto

```
src
├── config
├── constants
├── controllers
├── database
├── docs
├── errors
├── middlewares
├── models
├── routes
├── services
└── utils
```

---

# ⚙️ Instalação

Clone o projeto

```bash
git clone <url-do-repositorio>
```

Instale as dependências

```bash
npm install
```

Configure o arquivo `.env`.

Execute as migrations

```bash
npx sequelize-cli db:migrate
```

Popule o banco com dados de teste

```bash
npx sequelize-cli db:seed:all
```

Inicie a aplicação

```bash
npm run dev
```

---

# 👤 Usuários para teste

| Perfil | Email | Senha |
|--------|-------|-------|
| Administrador | admin@email.com | admin123 |
| Técnico | tecnico@email.com | tecnico123 |
| Usuário | usuario@email.com | usuario123 |

Todos os usuários já são criados com o status **Aprovado**.

---

# 📁 Categorias iniciais

- Hardware
- Software
- Rede
- Impressoras

---

# 📖 Documentação da API

Após iniciar a aplicação, a documentação estará disponível em:

```
http://localhost:3000/docs
```

Através do Swagger é possível:

- autenticar utilizando JWT;
- testar todos os endpoints;
- visualizar exemplos de requisição e resposta;
- consultar a documentação completa da API.

---

# 🔐 Fluxo recomendado para testes

1. Faça login utilizando o administrador.
2. Copie o token JWT.
3. Clique em **Authorize** no Swagger.
4. Cole o token.
5. Crie um novo usuário.
6. Aprove o usuário criado.
7. Faça login com o novo usuário.
8. Crie um chamado.
9. Faça login com o técnico.
10. Assuma o chamado.
11. Resolva o chamado.
12. Feche o chamado.
13. Consulte o histórico.
14. Consulte o dashboard.

---

# 📌 Arquitetura

O projeto segue uma arquitetura em camadas composta por:

- Controllers
- Services
- Models
- Middlewares
- Constants
- Documentação OpenAPI

A lógica de negócio é concentrada na camada de Services, enquanto os Controllers ficam responsáveis apenas pelo tratamento das requisições e respostas.

---

# 👨‍💻 Autor

Desenvolvido por **Estevan Barbosa**.