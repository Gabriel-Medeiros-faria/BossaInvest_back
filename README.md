
# Sistema de Gestão de Investimentos

Este repositório contém o backend para um sistema de gestão de investimentos. A aplicação permite que os usuários criem contas, visualizem opções de investimento e gerenciem suas carteiras.

## Tecnologias Utilizadas

- **NestJS**: Framework robusto para construção de APIs escaláveis.
- **TypeScript**: Tipagem estática para JavaScript, proporcionando maior segurança no desenvolvimento.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações.
- **TypeORM**: Ferramenta ORM para interação com o banco de dados.
- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **JWT (JSON Web Tokens)**: Implementado para autenticação e autorização segura.

## Resumo da API

### Funcionalidades:

- **Criação de Usuários**: Cadastro de novos usuários com informações básicas.
- **Autenticação**: Login seguro utilizando JWT.
- **Consulta de Investimentos**: Visualização de possíveis opções de investimento disponíveis na plataforma.
- **Gerenciamento de Carteira**:
  - Adicionar investimentos na carteira do usuário.
  - Visualizar os detalhes dos investimentos armazenados na carteira.

## Como Rodar o Projeto Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Gabriel-Medeiros-faria/BossaInvest_back.git
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env.development` baseado no exemplo abaixo:
   ```
   NODE_ENV="development"
   PORT=5100
   DB_TYPE="postgres"
   DB_HOST="localhost"
   DB_PORT=5432
   DB_USER="postgres"
   DB_PASS="12345"
   DB_DATABASE="bossaInvest"
   JWT_SECRET='trWCbQuNri6sVAUmE%v^2y%DbkQC9G#mYDw#%%urWZD%Qr'
   CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:5000,http://localhost:5173"
   ```

4. **Execute as migrações** para configurar o banco de dados:
   ```bash
   npm run typeorm:run
   ```

5. **Inicie o servidor**:
   ```bash
   npm run start:dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Documentação da API

### Endpoints Principais:

- **/auth/register**: Cadastro de um novo usuário.
- **/auth/login**: Realiza login e retorna um token JWT.
- **/investments**: Lista os investimentos disponíveis.
- **/wallet**: Gerencia os investimentos na carteira do usuário.

A documentação completa está disponível em [https://documenter.getpostman.com/view/24991884/2sAYQfCocU]

