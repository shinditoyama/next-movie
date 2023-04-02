# Next Movie

![screenshot](https://raw.githubusercontent.com/shinditoyama/next-movie/main/public/assets/movie.gif)

## Descrição

Aplicação Movie App construído com Next.js e Tailwind CSS. Esta aplicação permite ao usuário pesquisar e filtrar filmes e seriados por meio da chamada API da The Movie Database (TMDB).

Se você deseja experimentar o sistema, confira a demonstração anexado no link abaixo:

**live demo: [https://next-movie-wheat.vercel.app/](https://next-movie-wheat.vercel.app/)**

## Features

- [x] Pesquisar filmes, seriados e artistas
- [x] Filtrar a listagem através do nome ou gênero
- [x] Ver a descrição do filme, seriado ou artista selecionado

## Tecnologias

- [React](https://react.dev/)
- [Next](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Jotai](https://jotai.org/)

## Instalação

**Certifique-se de ter o nodejs e o npm instalados na sua máquina.**

Clone o repositório e entre na pasta do projeto.

```
$ git clone https://github.com/shinditoyama/next-movie.git
$ cd next-movie
```

Instale as dependências.

```bash
$ npm install # or yarn
```

Defina a variável de ambiente da chave de API (.env). Obtenha uma chave acessando o site da [The Movie Database](https://www.themoviedb.org/)

```bash
$ NEXT_PUBLIC_API_KEY={/* YOUR_API_KEY */}
```

Feito isso, agora você pode utilizar o projeto.

```bash
$ npm run dev # or yarn dev
```
