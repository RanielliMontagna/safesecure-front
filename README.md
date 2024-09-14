<div align='center'>
    <img src='public/safe-secure-logo.svg' alt='Safe Secure Logo' width='100'  />
    <h1 align='center' style={{margin: 0}}>Safe Secure Front</h1>
    <p align='center' style={{margin: 0}}>Aplicação web para controle de alocação de equipamentos</p>
</div>

## 📖 Sobre

O Safe Secure é uma aplicação web para controle de alocação de equipamentos. A aplicação permite o cadastro de equipamentos, categorias, funcionários e alocação de equipamentos para funcionários. Além disso, a aplicação conta com um sistema de registro de logs de ações realizadas na aplicação.

## 📚 Funcionalidades

- [x] Login de usuário com autenticação JWT.
- [ ] Cadastro, listagem, atualização e remoção de equipamentos.
- [x] Cadastro, listagem, atualização e remoção de categorias para os equipamentos.
- [x] Cadastro, listagem, atualização e remoção de funcionários.
- [ ] Alocação de equipamentos para funcionários.
- [ ] Sistema de registro de logs de ações realizadas na aplicação.

## 🚀 Tecnologias

- [Vite](https://vitejs.dev/) - Um construtor de aplicativos da web moderno e rápido que substitui o webpack
- [React](https://reactjs.org/) - Uma biblioteca JavaScript para criar interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) - Um superconjunto de JavaScript que adiciona tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Um framework CSS de utilidade de baixo nível para construir designs personalizados
- [Shadcn](https://ui.shadcn.com/) - Componentes de interface projetados para Tailwind CSS e React
- [React Query](https://tanstack.com/query/v3) - Uma biblioteca para gerenciamento de estado de dados em aplicações React
- [React Hook Form](https://react-hook-form.com/) - Uma biblioteca para gerenciamento de formulários em aplicações React
- [React Router](https://reactrouter.com/) - Uma biblioteca para roteamento de aplicações React
- [Axios](https://axios-http.com/) - Um cliente HTTP baseado em Promises para o navegador e node.js

## 📦 Instalação

```bash
# Clone o repositório
$ git clone
 ap
# Acesse a pasta do projeto
$ cd safesecure-front

# Instale as dependências
$ pnpm i # ou npm install ou yarn

# Crie um arquivo .env.local e adicione as variáveis de ambiente
$ cp .env.example .env.local

# Execute a aplicação
$ pnpm dev # ou npm run dev ou yarn dev

# A aplicação estará disponível em http://localhost:5173
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
