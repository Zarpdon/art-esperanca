# Zarpdon

## Objetivo

Este projeto é um e-commerce desenvolvido em Next.js App Router.

## Stack

- Next.js 15
- TypeScript
- React Query
- Drizzle ORM
- PostgreSQL (Neon)
- Tailwind CSS
- shadcn/ui
- React Hook Form para formulários
- Zod para validações
- Better Auth para autenticação

## Convenções

- Escrever código compatível com TypeScript Strict Mode.
- Nunca utilizar `any`.
- Preferir Server Components por padrão.
- Utilizar Client Components apenas quando houver estado, eventos, hooks ou APIs exclusivas do cliente.
- Sempre tipar props com interfaces.
- Preferir composição de componentes.
- Utilizar React Query apenas para dados do cliente.
- Lógica de banco deve permanecer em Server Actions.
- Não remover comentários existentes sem necessidade.
- Não alterar código não relacionado ao problema solicitado.
- Nunca rode 'npm run dev' para verificar se o projeto está funcionando.

## Banco de dados

- Utilizar Drizzle ORM.
- Preferir consultas utilizando `db.query`.
- Utilizar `with` para carregar relações quando apropriado.
- Utilizar `relations` sempre que possível.
- Utilizar `eq`, `and`, `or` e demais operadores do Drizzle em vez de SQL manual.
- Não criar consultas SQL brutas quando houver suporte do Drizzle.
- Use o arquivo `src/db/index.ts` e veja o arquivo `src/db/schema.ts` para verificar a estrutura do banco de dados.

## Interface

- Utilizar componentes do shadcn/ui.
- Utilizar Tailwind CSS.
- Evitar CSS inline.
- Manter o layout mobile-first.

## Código

- Preferir código simples e legível.
- Evitar duplicação.
- Evitar operadores ternários aninhados quando uma variável intermediária tornar o código mais claro.
- Não alterar nomes de funções ou componentes existentes sem necessidade.

## Componentes

- Preferir componentes pequenos e reutilizáveis.
- Extrair lógica repetida para helpers ou hooks.
- Evitar componentes com responsabilidade excessiva.
- Utilizar `cn()` para composição de `className` quando necessário.

## Imports

- Utilizar imports absolutos iniciando por `@/`.
- Remover imports não utilizados.
- Manter os imports organizados automaticamente.

## React e Next.js

- Use componentes da biblioteca shadcn/ui o máximo possível para criação de componentes (veja https://ui.shadcn.com para lista de componentes disponíveis).
- Sempre use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários Use o componente `src/components/ui/form.tsx` e veja `src/app/authentication/components/sign-in-form.tsx` e `src/app/authentication/components/sign-up-form.tsx` como base.
- Use a biblioteca `react-number-format` para formatação de números ou inputs com máscaras.

## React Query

- Utilizar `useQuery` para leitura de dados.
- Utilizar `useMutation` para escrita.
- Invalidar queries relacionadas após mutações.
- Preferir o cálculo e validação dos dados no backend quando possível.

## Tailwind CSS

- Preferir classes utilitárias.
- Evitar valores arbitrários quando houver utilitário equivalente.
- Reutilizar componentes do shadcn/ui antes de criar novos.
- Preferir classes utilitárias do Tailwind antes de criar estilos personalizados.

## Nomenclatura

- Utilizar nomes descritivos para variáveis, funções e componentes.
- Evitar abreviações desnecessárias.
- Manter consistência com os nomes já existentes no projeto.

## Alterações

- Ao sugerir mudanças, alterar apenas o trecho necessário.
- Preservar a formatação e organização do arquivo existente.
- Evitar mover código sem necessidade.

## Respostas

- Antes de escrever código, analisar os arquivos existentes para manter consistência.
- Reutilizar componentes, helpers e funções já existentes antes de criar novos.
- Antes de alterar código existente, preservar a arquitetura atual.
- Preferir modificar o mínimo necessário.
- Não refatorar arquivos inteiros quando apenas uma pequena alteração resolver o problema.

## Diretório

- O diretório raiz é `src/copilot`.
- NUNCA criar pastas ou arquivos fora do diretório raiz `src/copilot`.
- Criar subpastas quando necessário.
- O diretório para componentes é `src/copilot/components`.
- SEMPRE para qualquer arquivo de fora da pasta raiz `src/copilot`, que o usuário solicitar modificação, deverá ser salvo em `src/copilot/modified`.
- NUNCA salvar modificações ou fazer exclusões de arquivos ou pastas fora do diretório raiz `src/copilot`.
- Quando um componente criado for usado em apenas uma página específica, salvar o componente em um subpasta que terá o nome da página que o utiliza e salvar esta subpasta em `src/copilot/components/pages`.
- SEMPRE salvar Server Actions criadas em `src/copilot/actions`.
- SEMPRE salvar hooks criados em `src/copilot/hooks`.
- Use kebab-case para nomes de arquivos e pastas.
