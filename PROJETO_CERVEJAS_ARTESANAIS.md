# Projeto: Encomenda de Cervejas Artesanais

## Descrição

Sistema full stack desenvolvido com React, Express, TypeORM e PrimeReact para gerenciar encomendas de cervejas artesanais.

## Tecnologias Utilizadas

### Backend
- Node.js com TypeScript
- Express.js
- TypeORM
- PostgreSQL/MySQL
- JWT para autenticação

### Frontend
- React 18
- PrimeReact 7
- PrimeFlex
- Axios

## Estrutura do Projeto

### Entidades

#### Usuario
- CPF (chave primária)
- Nome
- Email (único)
- Senha (criptografada)
- Perfil (maestro, patrocinador, criador, gerente_emporio)
- Status (ativo, inativo, pendente)
- Questão e resposta de segurança
- Cor do tema

#### Criador (herda de Usuario)
- País de origem
- Ano de fundação
- Estilo de cerveja especializado
- Lista de cervejas artesanais

#### GerenteEmporio (herda de Usuario)
- Telefone
- País de localização
- Nível de experiência
- Lista de encomendas

#### CervejaArtesanal
- Nome
- Teor alcoólico
- Categoria
- Disponibilidade
- Contém glúten
- Criador (relacionamento)

#### Encomenda
- Data
- Quantidade
- Valor total
- Nota fiscal emitida
- Cerveja artesanal (relacionamento)
- Gerente de empório (relacionamento)

## Funcionalidades

### Perfil Criador
1. Cadastro de criador (após cadastro de usuário)
2. Gerenciamento de cervejas artesanais (CRUD completo)
   - Cadastrar cerveja
   - Editar cerveja
   - Excluir cerveja
   - Listar cervejas
3. Visualização de encomendas recebidas

### Perfil Gerente de Empório
1. Cadastro de gerente de empório (após cadastro de usuário)
2. Visualização do catálogo de cervejas artesanais
3. Fazer encomendas
4. Gerenciamento de encomendas (CRUD completo)
   - Ver minhas encomendas
   - Editar encomenda
   - Excluir encomenda

## Rotas Backend

### Criador
- `POST /criadores` - Cadastrar criador
- `GET /criadores/:cpf` - Buscar criador
- `PATCH /criadores` - Atualizar criador
- `POST /criadores/cervejas-artesanais` - Cadastrar cerveja
- `PATCH /criadores/cervejas-artesanais` - Alterar cerveja
- `DELETE /criadores/cervejas-artesanais/:id` - Remover cerveja
- `GET /criadores/cervejas-artesanais/criador/:cpf` - Buscar cervejas do criador
- `GET /criadores/cervejas-artesanais/todas` - Buscar todas as cervejas

### Gerente de Empório
- `POST /gerentes-emporio` - Cadastrar gerente
- `GET /gerentes-emporio/:cpf` - Buscar gerente
- `PATCH /gerentes-emporio` - Atualizar gerente
- `POST /gerentes-emporio/encomendas` - Cadastrar encomenda
- `PATCH /gerentes-emporio/encomendas` - Alterar encomenda
- `DELETE /gerentes-emporio/encomendas/:id` - Remover encomenda
- `GET /gerentes-emporio/encomendas/gerente/:cpf` - Buscar encomendas do gerente
- `GET /gerentes-emporio/encomendas/criador/:cpf` - Buscar encomendas recebidas pelo criador

## Páginas Frontend

### Criador
- `/cadastrar-criador` - Cadastro/edição de criador
- `/gerenciar-cervejas` - Listagem de cervejas do criador
- `/cadastrar-cerveja` - Cadastro/edição de cerveja artesanal
- `/encomendas-recebidas` - Visualização de encomendas recebidas

### Gerente de Empório
- `/cadastrar-gerente-emporio` - Cadastro/edição de gerente
- `/catalogo-cervejas` - Catálogo de cervejas disponíveis
- `/fazer-encomenda` - Formulário para fazer encomenda
- `/minhas-encomendas` - Listagem de encomendas feitas
- `/editar-encomenda` - Edição de encomenda

## Fluxo de Autenticação

1. Usuário faz login com CPF e senha
2. Sistema verifica credenciais e perfil
3. Token JWT é gerado
4. Usuário é redirecionado para página inicial
5. Menu lateral mostra opções específicas do perfil

## Fluxo de Cadastro

### Criador
1. Cadastrar usuário geral (nome, email, CPF, senha, etc.)
2. Cadastrar dados específicos do criador (país, ano, estilo)
3. Status muda para "ativo"
4. Acesso ao painel do criador

### Gerente de Empório
1. Cadastrar usuário geral (nome, email, CPF, senha, etc.)
2. Cadastrar dados específicos do gerente (telefone, país, experiência)
3. Status muda para "ativo"
4. Acesso ao painel do gerente

## Como Executar

### Backend
```bash
cd back-end
npm install
npm run dev
```

### Frontend
```bash
cd front-end
npm install --legacy-peer-deps
npm start
```

## Variáveis de Ambiente

### Backend (.env)
```
PORT=3333
CORS_ORIGIN=http://localhost:3000
SENHA_JWT=sua_senha_secreta
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3333
```

## Observações

- O projeto mantém compatibilidade com os perfis existentes (Maestro e Patrocinador)
- Todas as senhas são criptografadas com bcrypt
- CPFs são hasheados com MD5 antes de serem armazenados
- Utiliza PrimeReact para componentes UI
- Seguindo os padrões do boilerplate original
