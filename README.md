# 🎫 Sistema de Chamados

Sistema de gerenciamento de chamados (Help Desk) desenvolvido para praticar arquitetura em Node.js utilizando Express e Sequelize.

O objetivo do projeto é permitir o gerenciamento de chamados técnicos, categorias, usuários, técnicos e comentários por meio de uma API REST.

---

## 🚀 Tecnologias

- Node.js
- Express.js
- Sequelize
- MySQL
- Railway (Banco de Dados)
- Dotenv

---

## 📚 Conceitos aplicados

- Arquitetura em camadas
- Programação Orientada a Objetos (POO)
- API REST
- CRUD completo
- Migrations
- Models
- Relacionamentos entre tabelas
- Tratamento de erros
- Reutilização de código com Service e Controller

---

## 📂 Estrutura do projeto

```
src
├── config
├── controllers
├── database
│   ├── migrations
│   ├── models
│   └── seeders
├── routes
├── services
├── utils
└── app.js
```

---

## ⚙️ Instalação

Clone o repositório

```bash
git clone <url-do-repositorio>
```

Entre na pasta

```bash
cd sistema-chamados
```

Instale as dependências

```bash
npm install
```

Configure as variáveis de ambiente

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

Execute as migrations

```bash
npx sequelize-cli db:migrate
```

Inicie a aplicação

```bash
npm run dev
```

---

## 📌 Funcionalidades

### Chamados

- Criar chamado
- Listar chamados
- Buscar chamado por ID
- Atualizar chamado
- Excluir chamado

### Técnicos

- CRUD completo

### Usuários

- CRUD completo

### Categorias

- CRUD completo

### Comentários

- CRUD completo

---

## 🛠 Endpoints

### Chamados

| Método | Endpoint |
|---------|----------|
| GET | /chamados |
| GET | /chamados/:id |
| POST | /chamados |
| PUT | /chamados/:id |
| DELETE | /chamados/:id |

Repita para as demais entidades.

---

## 💡 Arquitetura

O projeto foi desenvolvido utilizando uma arquitetura em camadas:

```
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models (Sequelize)
   ↓
Banco de Dados
```

Toda a lógica de negócio permanece na camada de Service, enquanto os Controllers apenas recebem as requisições HTTP e retornam as respostas.

---

## 🎯 Objetivo

Este projeto foi desenvolvido para consolidar conhecimentos em:

- Node.js
- Express
- Sequelize
- MySQL
- APIs REST
- Arquitetura em camadas
- POO
- Boas práticas de organização de código

---

## 📄 Licença

Projeto desenvolvido para fins de estudo.
