# 📚 Sistema de Chamados API

API REST desenvolvida em **Node.js** para gerenciamento de chamados de suporte técnico.

O projeto foi desenvolvido com foco em boas práticas de arquitetura, separação de responsabilidades, autenticação e autorização, regras de negócio, auditoria e documentação de API.

A aplicação utiliza uma arquitetura em camadas baseada em **Controllers, Services e Models**, com **Sequelize ORM** para persistência de dados e **Docker** para padronização do ambiente de execução.

---

# 🚀 Funcionalidades

## 🔐 Autenticação e autorização

* Autenticação utilizando JWT
* Senhas criptografadas com Bcrypt
* Autorização baseada em cargos
* Middleware de autenticação
* Middleware de autorização
* Aprovação e rejeição de usuários
* Controle de acesso por perfil

## 👥 Usuários

* Cadastro de usuários
* Consulta de usuários
* Atualização de usuários
* Exclusão de usuários
* Aprovação de usuários
* Rejeição de usuários
* Controle de perfis

## 🎫 Chamados

* Criação de chamados
* Consulta de chamados
* Atualização de chamados
* Exclusão de chamados
* Assumir chamados
* Resolver chamados
* Fechar chamados
* Controle de status
* Controle de prioridade
* Associação com categorias
* Associação com técnicos

## 🏷️ Categorias

* Criação de categorias
* Consulta de categorias
* Atualização de categorias
* Exclusão de categorias
* Validação de categorias utilizadas por chamados

## 💬 Comentários

* Adição de comentários aos chamados
* Consulta de comentários
* Associação entre comentários, usuários e chamados

## 📜 Histórico e auditoria

* Registro automático de alterações
* Registro do usuário responsável pela ação
* Histórico por chamado
* Linha do tempo dos eventos
* Histórico somente para leitura

## 📊 Consultas e dashboard

* Dashboard com estatísticas
* Filtros de chamados
* Busca textual
* Paginação
* Ordenação

## 📖 Documentação

* Documentação OpenAPI
* Swagger UI
* Autenticação Bearer Token no Swagger
* Exemplos de requisições e respostas

## 🐳 Containerização

* Dockerfile
* Docker Compose
* Imagem baseada em Node.js
* Execução como usuário não-root
* Healthcheck da API
* Variáveis de ambiente
* Execução de migrations através do Docker

---

# 🛠 Tecnologias

### Backend

* Node.js
* Express
* Sequelize ORM
* MySQL
* JWT
* Bcrypt

### Documentação

* Swagger
* OpenAPI
* swagger-jsdoc
* swagger-ui-express

### DevOps e ferramentas

* Docker
* Docker Compose
* Sequelize CLI
* ESLint
* Prettier
* Git
* GitHub

### Banco de dados

* MySQL
* Aiven

---

# 📂 Estrutura do projeto

```text
src/
├── config/
├── constants/
├── controllers/
├── database/
│   ├── migrations/
│   ├── models/
│   └── seeders/
├── docs/
├── errors/
├── middlewares/
├── routes/
├── services/
└── utils/

Dockerfile
docker-compose.yml
.dockerignore
.env.example
.gitignore
package.json
package-lock.json
README.md
```

---

# ⚙️ Configuração do ambiente

## Pré-requisitos

### Execução local

Para executar diretamente com Node.js:

* Node.js 24+
* npm
* MySQL compatível

### Execução com Docker

Para executar utilizando Docker:

* Docker
* Docker Compose
* Acesso ao banco MySQL configurado no ambiente

A aplicação atualmente utiliza um banco **MySQL hospedado na Aiven**.

---

# 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Utilize o `.env.example` como referência:

```env
PORT=3000
NODE_ENV=development

MYSQLHOST=
MYSQLPORT=
MYSQLDATABASE=
MYSQLUSER=
MYSQLPASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=1d
```

> **Importante:** o arquivo `.env` contém informações sensíveis e não deve ser enviado para o repositório.

---

# 🐳 Executando com Docker

A aplicação pode ser executada utilizando Docker Compose.

## 1. Clone o projeto

```bash
git clone <url-do-repositorio>
```

Entre na pasta:

```bash
cd sistema-chamado
```

## 2. Configure o `.env`

Crie o arquivo:

```text
.env
```

e preencha as variáveis utilizando o `.env.example` como referência.

## 3. Construa a imagem

```bash
docker compose build
```

## 4. Execute as migrations

Caso esteja utilizando um banco novo:

```bash
docker compose run --rm api npm run migrate
```

O comando utiliza o próprio ambiente Docker para executar o Sequelize CLI. Portanto, não é necessário instalar Node.js ou Sequelize CLI diretamente no computador.

Caso o banco já possua todas as migrations aplicadas, esta etapa não é necessária.

## 5. Inicie a aplicação

```bash
docker compose up
```

A API estará disponível em:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs
```

Healthcheck:

```text
http://localhost:3000/health
```

## Parar a aplicação

```bash
docker compose down
```

---

# 🗄️ Migrations

As migrations são gerenciadas pelo **Sequelize CLI**.

Para executar através do Docker:

```bash
docker compose run --rm api npm run migrate
```

Para verificar o status:

```bash
docker compose run --rm api npx sequelize-cli db:migrate:status
```

As migrations **não são executadas automaticamente quando o container inicia**.

Essa separação evita que cada instância da API tente alterar o schema do banco durante sua inicialização.

---

# 🌱 Seeders

Os seeders podem ser executados através do ambiente Docker:

```bash
docker compose run --rm api npm run seed
```

> Utilize seeders apenas quando fizer sentido para o ambiente em questão, especialmente em ambientes de desenvolvimento ou testes.

---

# 👤 Usuários para teste

| Perfil        | Email                                         | Senha      |
| ------------- | --------------------------------------------- | ---------- |
| Administrador | [admin@email.com](mailto:admin@email.com)     | admin123   |
| Técnico       | [tecnico@email.com](mailto:tecnico@email.com) | tecnico123 |
| Usuário       | [usuario@email.com](mailto:usuario@email.com) | usuario123 |

Todos os usuários de teste são criados com o status **Aprovado**.

> ⚠️ Essas credenciais são destinadas exclusivamente ao ambiente de desenvolvimento/testes.

---

# 📁 Categorias iniciais

Os seeders disponibilizam categorias como:

* Hardware
* Software
* Rede
* Impressoras

---

# 📖 Documentação da API

Após iniciar a aplicação, acesse:

```text
http://localhost:3000/docs
```

A documentação Swagger permite:

* visualizar todos os endpoints;
* consultar parâmetros;
* visualizar schemas;
* consultar exemplos de requisição e resposta;
* autenticar utilizando JWT;
* testar os endpoints diretamente pelo navegador.

---

# 🔐 Fluxo recomendado para testes

1. Faça login utilizando o administrador.
2. Copie o token JWT.
3. Clique em **Authorize** no Swagger.
4. Informe o token utilizando o esquema Bearer.
5. Crie um novo usuário.
6. Aprove o usuário criado.
7. Faça login com o novo usuário.
8. Crie um chamado.
9. Faça login com um técnico.
10. Assuma o chamado.
11. Adicione comentários quando necessário.
12. Resolva o chamado.
13. Feche o chamado.
14. Consulte o histórico.
15. Consulte o dashboard.

---

# ❤️ Healthcheck

A API possui um endpoint de saúde:

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

Esse endpoint também é utilizado pelo `HEALTHCHECK` configurado no Dockerfile para verificar se a aplicação está respondendo corretamente.

---

# 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas baseada em princípios de separação de responsabilidades.

```text
Request
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models / Sequelize
   │
   ▼
MySQL
```

### Controllers

Responsáveis pelo tratamento das requisições HTTP e construção das respostas.

### Services

Concentram as regras de negócio da aplicação.

O projeto utiliza uma classe base de Service para operações comuns e Services específicos para comportamentos particulares de cada domínio.

### Models

Representam as entidades persistidas no banco de dados utilizando Sequelize.

### Middlewares

Responsáveis por comportamentos transversais, como:

* autenticação;
* autorização;
* tratamento de erros.

### Errors

A aplicação utiliza erros personalizados para representar diferentes situações, como:

* validação;
* autenticação;
* autorização;
* recurso não encontrado.

### Constants

Centralizam valores utilizados pelas regras de negócio, como:

* status;
* prioridades;
* ações de histórico.

---

# 🐳 Arquitetura Docker

A aplicação é executada em um container Docker e utiliza um banco MySQL externo hospedado na Aiven.

```text
┌──────────────────────────────┐
│        Docker Container      │
│                              │
│  Node.js                     │
│  Express                     │
│  Sequelize                   │
│  Swagger                     │
│                              │
│  Sistema de Chamados API     │
└──────────────┬───────────────┘
               │
               │ conexão MySQL
               ▼
┌──────────────────────────────┐
│          Aiven MySQL         │
└──────────────────────────────┘
```

O container:

* utiliza Node.js 24;
* utiliza uma imagem `node:24-slim`;
* executa como usuário não-root;
* possui healthcheck;
* recebe configurações através de variáveis de ambiente.

---

# 📌 Scripts disponíveis

```bash
npm start
```

Inicia a aplicação.

```bash
npm run dev
```

Inicia a aplicação em modo de desenvolvimento utilizando Nodemon.

```bash
npm run migrate
```

Executa as migrations do Sequelize.

```bash
npm run seed
```

Executa os seeders.

---

# 🧪 Testes

Os testes automatizados serão implementados em uma etapa posterior do projeto.

Atualmente, os endpoints podem ser validados através da documentação Swagger e das ferramentas de teste de API.

---

# 📈 Roadmap

* [x] Arquitetura em camadas
* [x] CRUDs principais
* [x] Autenticação JWT
* [x] Autorização por cargos
* [x] Regras de negócio
* [x] Categorias
* [x] Comentários
* [x] Histórico e auditoria
* [x] Dashboard
* [x] Filtros e paginação
* [x] Documentação Swagger/OpenAPI
* [x] Docker
* [x] Docker Compose
* [x] Healthcheck
* [ ] Testes automatizados
* [ ] CI/CD
* [ ] Release 1.0.0

---

# 👨‍💻 Autor

Desenvolvido por **Estevan Barbosa**.
