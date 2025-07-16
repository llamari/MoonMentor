# MoonMentor

Projeto NLW 2025 - Sistema de salas de estudo colaborativas com transcrição de áudio e perguntas inteligentes.

## Estrutura

- **backend/**: API Node.js com Fastify, Drizzle ORM e integração com Google Gemini para transcrição e embeddings.
- **frontend/**: Aplicação React com TailwindCSS, gerenciamento de salas, perguntas e gravação de áudio.

## Funcionalidades

- Criação e listagem de salas de estudo.
- Gravação e transcrição de áudios via Gemini AI.
- Perguntas e respostas automáticas baseadas no conteúdo gravado.
- Interface moderna com modo claro/escuro.

## Requisitos

- Node.js >= 18
- PostgreSQL com extensão [pgvector](https://github.com/pgvector/pgvector)
- Chave de API do Google Gemini

## Instalação

### Banco de Dados

1. Suba o banco com Docker:
   ```sh
   cd backend
   docker compose up
   ```
2. Certifique-se que a extensão `vector` está instalada (verifique em [backend/docker/setup.sql](backend/docker/setup.sql)).

### Backend

1. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
2. Configure o arquivo `.env` conforme exemplo:
   ```
   PORT=3333
   DATABASE_URL='postgressql://docker:docker@localhost:5432/agents'
   GEMINI_API_KEY='sua-chave-gemini'
   ```
3. Execute as migrações e seed:
   ```sh
   npm run db:seed
   ```
4. Inicie o servidor:
   ```sh
   npm run dev
   ```

### Frontend

1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
2. Inicie o projeto:
   ```sh
   npm run dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173)

## Principais arquivos

- Backend:
  - [src/server.ts](backend/src/server.ts): Inicialização do servidor Fastify.
  - [src/services/gemini.ts](backend/src/services/gemini.ts): Integração com Gemini AI.
  - [src/db/schema/](backend/src/db/schema/): Schemas do banco de dados.

- Frontend:
  - [src/App.tsx](frontend/src/App.tsx): Rotas principais.
  - [src/Pages/CreateRoom.tsx](frontend/src/Pages/CreateRoom.tsx): Página de criação/listagem de salas.
  - [src/Pages/Room.tsx](frontend/src/Pages/Room.tsx): Página de perguntas e gravação.

## Licença

MIT

---

Projeto desenvolvido durante
