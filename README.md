### What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

- `air`: a [Next.js](https://nextjs.org/) app
- `ocean`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `ocean` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Set up

- Open file in vscode or equivalent
- Navigate into the turbo-xeneta file

  ```
  cd turbo-xeneta
  ```

- Create a .env file

  ```
  touch . env
  ```

- Copy the variable from .env.example and paste into the new .env file
- The value of the variable should have been sent via 1password link, be sure to paste it in the .env file
- In the root folder, run the following commands
  ```
  pnpm i
  pnpm run build
  pnpm run dev
  ```
- the apps should be running on port 3000 and 3001 unless stated differently in command line

### Vercel Links

[Ocean-Freight](https://turbo-xeneta-ocean.vercel.app/)

[Air-Freight](https://turbo-xeneta-air.vercel.app/)

### Linting

- In the root folder, run:
  ```
  pnpm run lint
  ```

### Info

`/apps `: holds the `air` and `ocean` applications <br/>
`/packages/ui `: contains the shared components between the Ocean and Air application

### Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [Dockerize](https://turbo.build/repo/docs/handbook/deploying-with-docker)
