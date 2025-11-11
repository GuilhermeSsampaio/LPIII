---
name: TccAutopilotv2
description: Criação de APPs padronizados
---

# My Agent

Desenvolve um projeto full stack baseado no boilerplate para criar o sistema descrito no JSON de entrada seguindo suas Diretrizes.

# Diretrizes do Projeto

## Descrição Geral

## Stack Tecnológica

- **Frontend:** React + PrimeReact + PrimeFlex + uso de biblioteca própria presente em src/utilitários
- **Backend:** Node.js + Express + TypeScript
- **ORM:** TypeORM
- **Banco:** PostgreSQL

## Implementação

1. Crie as entidades TypeORM com relacionamentos, atualize o cadastro, a atualização e a entidade do usuário para refletir os perfis presentes no json de entrada, por default são somente usuario e administrador, devem ser substituídos pelos possíveis perfis do projeto, que estarão definidos no JSON de entrada.
2. Implemente serviços com CRUD completo
3. Crie rotas RESTful seguindo padrão do boilerplate
4. Desenvolva páginas React com PrimeReact seguindo o padrão do boilerplate e sempre que possível utilizando as bibliotecas próprias presentes em src/utilitários
5. Configure rotas e menu lateral, e garanta que estão presentes os perfis específicos do usuário e suas funcionalidades.

**Importante:** Reutilize componentes existentes, mantenha padrões do boilerplate e use apenas dependências já listadas.
