## TypeScript

To get started, create an empty `tsconfig.json` file in the root of your project:

```
touch tsconfig.json
```

install typescript, @types/react, and @types/node by running:

```
# If you’re using npm
npm install --save-dev typescript @types/react @types/node

# If you’re using Yarn
yarn add --dev typescript @types/react @types/node
```

Now, try starting the development server again. After starting the server, Next.js will:

- Populate the `tsconfig.json` file for you. You may customize this file.
- Create the `next-env.d.ts` file, which ensures Next.js types are picked up by the TypeScript compiler. You should not touch this file.

## Next.js Specific Types

### Static Generation and Server-side Rendering

For `getStaticProps`, `getStaticPaths`, and `getServerSideProps`, you can use the `GetStaticProps`, `GetStaticPaths`, and `GetServerSideProps` types respectively:

```

export const getStaticProps: GetStaticProps = async context => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
}
```

### API Routes

The following is an example of how to use the built-in types for API routes:

```
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // ...
}
```

### Custom App

You can convert `pages/_app.js` into `pages/_app.tsx` and use the built-in type `AppProps`, like so:

```
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```

### Converting Files

To convert the blog app into TypeScript, update files from `.js` to `.tsx` and `.ts`.

Also, since `remark-html` doesn’t have type definitions within the package or in DefinitelyTyped, create a top-level `global.d.ts` file to add a type declaration.

```
declare module 'remark-html' {
  const html: any
  export default html
}
```
