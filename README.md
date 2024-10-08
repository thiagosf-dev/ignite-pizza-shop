# React + TypeScript + Vite

`react 18`  `typescript 5`  `vite 5`

> This project was built using the

- `pnpm v9.6.0`
- `node v18.20.2`
- `npm v10.5.0`

```shell
pnpm create vite@latest
```

## To clone this project

```shell
git clone https://github.com/thiagosf-dev/ignite-pizza-shop.git
```

## To install the dependencies

```shell
pnpm i
```

## Set up [`shadcn-ui`](https://ui.shadcn.com/docs/installation/vite)

```shell
pnpm add -D tailwindcss postcss autoprefixer @types/node
```

```shell
npx tailwindcss init -p
```

### Edit `tsconfig.json`

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Edit `tsconfig.app.json`

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

### Edit `vite.config.ts`

```json
import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Run

```shell
pnpm dlx shadcn-ui@latest init
```

### Installed components

`pnpm dlx shadcn-ui@latest add button card calendar dialog dropdown-menu input label skeleton select separator table textarea`

## Set `ESlint` and `Prettier`

```shell
pnpm add -d eslint @rocketseat/eslint-config prettier-plugin-tailwindcss eslint-plugin-simple-import-sort
```

### Edit the `.eslintrc.json` file in the project root

```shell
{
  "extends": [
    "@rocketseat/eslint-config/react"
  ],
  "plugins": [
    "simple-import-sort"
  ],
  "rules": {
    "simple-import-sort/imports": "error"
  }
}
```

### Edit the `prettier.config.cjs` file in the project root

```shell
{
  "extends": [
    "@rocketseat/eslint-config/react"
  ],
  "plugins": [
    "simple-import-sort"
  ],
  "rules": {
    "simple-import-sort/imports": "error"
  }
}
```

### Edit the `package.json` file

```shell
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix",
```

## Set [`react-router-dm`](<https://reactrouter.com/en/main/start/tutorial>)

```shell
pnpm i react-router-dom
```

## Install `react-helmet-async`

```shell
pnpm i react-helmet-async
```

## Install `react-hook-form`

```shell
pnpm i react-hook-form
```

## Install `zod`

```shell
pnpm i zod
```

## Install `@hookform/resolvers`

```shell
pnpm i @hookform/resolvers
```

## Install `sonner` (a Toast Library)

```shell
pnpm i sonner
```

## Install `recharts` (a Charts Library)

```shell
pnpm i recharts
```

## Install `axios` (a API Client)

```shell
pnpm i axios
```

## Install `zod` (to type the ENV file)

```shell
pnpm i zod
```

## Install `react-query` (react hooks to call requests)

```shell
pnpm i @tanstack/react-query
```

## Install `date-fns` (date management library)

```shell
pnpm i date-fns
```
