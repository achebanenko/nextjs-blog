Tutorial  
https://nextjs.org/learn/basics/create-nextjs-app

Source and result  
https://github.com/zeit/next-learn-starter/tree/master/demo  
https://next-learn-starter.now.sh/

## Install

Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.

\$ npm init next-app nextjs-blog --example "https://github.com/zeit/next-learn-starter/tree/master/learn-starter"

## Run

$ cd nexjs-blog  
$ npm run dev # yarn dev

## Create a new page

Simply create a JS file under the `pages` directory, and the path to the file becomes the URL path.  
The component can have any name, but you must export it as a `default` export.

Create a file called `first-post.js` inside the `posts` directory with the following contents:

```
export default function FirstPost() {
  return <h1>First Post</h1>
}
```

## Link Component

`<Link>` that wraps the `<a>` tag allows you to do client-side navigation to a different page in the application.  
Use `<Link href="…">` and put an `<a>` tag inside.

```
import Link from "next/link"
...
<h2>
  Read <Link href="/posts/first-post"><a>this page</a></Link>
</h2>
...
```

Client-side navigation means that the page transition happens using JavaScript, which is faster than the default navigation done by the browser.

Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).

If you need to add attributes like, for example, `className`, add it to the `a` tag, not to the `Link` tag.

```
<Link href="/">
  <a className="foo" target="_blank" rel="noopener noreferrer">
    Hello World
  </a>
</Link>
```

## Assets

Next.js can serve static files, like images, under the top-level `public` directory.  
The logo image exists inside the `public` directory at the top level of your application.

```
<img src="/vercel.svg" alt="Vercel Logo" className="logo" />
```

The `public` directory is also useful for `robots.txt`, Google Site Verification, and any other static assets.

## Metadata

`<Head>` is a React Component that is built into Next.js. It allows you to modify the `<head>` of a page.

```
import Head from "next/head"
...
<div className="container">
  <Head>
    <title>Create Next App</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  ...
</div>
```

If you want to customize the `<html>`, for example to add the `lang` attribute, you can do so by creating a custom `Document` component.

## CSS Styling

Next.js has built-in support for styled-jsx, but you can also use other popular CSS-in-JS libraries such as styled-components or emotion.

This is using a library called styled-jsx. It’s a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped (other components won’t be affected).

```
<div className="container">
  ...
  <style jsx>{`
    ...
  `}</style>
</div>
```

Next.js has built-in support for CSS and Sass which allows you to import `.css` and `.scss` files.  
Using popular CSS libraries like Tailwind CSS is also supported.

## Layout Component

Create a top-level directory called `components`.  
Inside, create a file called `layout.js`

```
function Layout({ children }) {
  return <div>{children}</div>;
}
export default Layout;
```

Create a file called `layout.module.css` in the components directory with the following  
We’ll use CSS Modules, which lets you import CSS files in a React component.  
To use this CSS Modules, the CSS file name must end with `.module.css`.

```
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

To use this in `Layout`, you need to:  
Import it as `styles`  
Use `styles.<class-name>` as `className`

```
import styles from './layout.module.css'

export default function Layout({children}) {
  return <div className={styles.container}>{children}</div>
}
```

Now, if you take a look at the HTML in your browser’s devtools, you’ll notice that the `div` tag has a class name that looks like `layout_container__...`.  
This is what CSS Modules does: It _automatically generates unique class names_.

CSS Modules are extracted from the JavaScript bundles at build time and generate `.css` files that are loaded automatically by Next.js.

## Global Styles

In Next.js, you can add global CSS files by importing them from `_app.js`. You cannot import global CSS anywhere else.

You can place the global CSS file anywhere and use any name.  
Create a top-level `styles` directory and create `global.css` inside.

`App` component is the top-level component which will be common across all the different pages. You can use `App` component to keep state when navigating between pages, for example.

To load global CSS files, create a file called `_app.js` under `pages` and import styles from it.

```
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

You need to restart the development server when you add `_app.js`.

## Polishing Layout

Save the picture as `profile.jpg` in the `public/images` directory.

Add some more polished styles for `components/layout.module.css`.

Let’s create a set of utility CSS classes for typography and others that will be useful across multiple components.  
Let’s add it as a CSS Module at `styles/utils.module.css`.

`components/layout.js`

```
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Art Chebanenko";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        ... // link, meta
      </Head>

      <header className={styles.header}>
        {home ? (
          ...
        ) : (
          ...
        )}
      </header>

      <main>{children}</main>

      {!home && (
        ...
      )}
    </div>
  );
}
```

`pages/index.js`

```
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        ...
      </section>
    </Layout>
  );
}

```

## Styling Tips

### Using `classnames` library to toggle classes

First write a CSS module (e.g. alert.module.css) like this:

```
.success {
  color: green;
}
.error {
  color: red;
}
```

And use `classnames` like this:

```
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```

### Customizing PostCSS Config

Out of the box, with no configuration, Next.js compiles CSS using PostCSS.  
To customize PostCSS config, you can create a top-level file called `postcss.config.js`.  
This is useful if you’re using libraries like [Tailwind CSS](https://tailwindcss.com/).

Here’s an example `postcss.config.js` for using Tailwind CSS with `purgecss` which removes unused CSS.  
You need to install `tailwindcss`, `@fullhuman/postcss-purgecss`, and `postcss-preset-env`.  
You don’t need `autoprefixer` because Next.js includes it by default.

```
module.exports = {
  plugins: [
    'tailwindcss',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}'
              ],
              defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || []
            }
          ]
        ]
      : []),
    'postcss-preset-env'
  ]
}
```

### Using Sass

Out of the box, Next.js allows you to import Sass using both the `.scss` and `.sass` extensions.  
You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

Before you can use Next.js' built-in Sass support, be sure to install sass:

```
npm install sass
```

## Pre-rendering

Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript.  
Each generated HTML is associated with minimal JavaScript code necessary for that page.  
When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive.  
(This process is called hydration.)

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering.

**Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then reused on each request.  
**Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Next.js lets you choose which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

### Static Generation with and without Data

Maybe you need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — Static Generation with data — out of the box.

In Next.js, when you export a page component, you can also export an `async` function called `getStaticProps`.  
`getStaticProps` runs at build time in production, and…  
Inside the function, you can fetch external data and pass that as the props of the page.

```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

In development mode, `getStaticProps` runs on each request instead.

### Blog Data

We’ll now add blog data to our app using the file system.  
Create a new top-level directory called `posts`.  
Inside, create two files: `pre-rendering.md` and `ssg-ssr.md`.

Metadata section at the top of markdown file is containing `title` and `date`.  
This is called YAML Front Matter, which can be parsed using a library called `gray-matter`.

### Implement getStaticProps

First, install gray-matter which lets us parse the metadata in each markdown file.

\$ npm install gray-matter

Next, we’ll create a simple library for fetching data from the file system.

`lib/posts.js`

```
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
```

console.log(matterResult)

```
{
  content: ...,
  data: {
    title: 'When to Use Static Generation v.s. Server-side Rendering',
    date: '2020-01-02'
  },
  isEmepty: false,
  excerpt: '',
  orig: <Buffer ...>
}
{
  ...
}
```

`pages/index.js`

```
import { getSortedPostsData } from '../lib/posts'
...
export default function Home ({ allPostsData }) {
  return (
  ...
  <ul className={utilStyles.list}>
    {allPostsData.map(({ id, date, title }) => (
      <li className={utilStyles.listItem} key={id}>
        {title}
        <br />
        {id}
        <br />
        {date}
      </li>
    ))}
  </ul>
  ...
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
```

https://github.com/zeit/next.js/issues/7755  
Remember, you can only do FS-related operations while on the server. This means you cannot use fs while rendering.  
If you use `fs`, be sure it's only within `getInitialProps`.

You may also need to create a `next.config.js` file with the following content to get the client bundle to build:

```
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
```

#### Fetch External API or Query Database

`getStaticProps` runs **only on the server-side**. It will never be run on the client-side.  
It won’t even be included in the JS bundle for the browser.  
That means you can write code such as direct database queries without them being sent to browsers.

In our `lib/posts.js`, we’ve implemented `getSortedPostsData` which fetches data from the file system.  
But you can fetch the data from other sources, like an external API endpoint:

```
import fetch from 'node-fetch'

export async function getSortedPostsData() {
  // Instead of the file system, fetch post data from an external API endpoint
  const posts = await fetch('..')
  return res.json()
}
```

You can also query the database directly:

```
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system, fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

#### Development v.s. Production

- In development (`npm run dev` or `yarn dev`), `getStaticProps` runs on every request.
- In production, `getStaticProps` runs at _build time_.

Because it’s meant to be run at **build time**, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

#### Only Allowed in a Page

`getStaticProps` can only be exported from a page. You can’t export it from non-page files.  
One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### Fetching Data at Request Time

If you need to fetch data at request time instead of at build time, you can try **Server-side Rendering**.  
To use Server-side Rendering, you need to export `getServerSideProps`.

Because `getServerSideProps` is called at request time, its parameter (`context`) contains request specific parameters.

```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

### Client-side Rendering

If you do not need to pre-render the data, you can use strategy, called **Client-side Rendering**:

- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

### SWR

The team behind Next.js has created a React hook for data fetching called SWR.  
We highly recommend it If you’re fetching data on the client side.  
It handles caching, revalidation, focus tracking, refetching on interval, and more.
https://swr.now.sh/

```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

## Dynamic Routes

### Page Path Depends on External Data

Next.js allows you to statically generate pages with paths that depend on external data.  
This enables dynamic URLs in Next.js.

1. First, we’ll create a page called `[id].js` under `pages/posts`.  
   Pages that begin with `[` and end with `]` are dynamic pages in Next.js.

2. We’ll export an async function called `getStaticPaths` from this page.  
   In this function, we need to return a list of possible values for `id`.

3. Finally, we need to implement `getStaticProps` again - this time,  
   to fetch necessary data for the blog post with a given `id`.  
   `getStaticProps` is given `params`, which contains `id`.

The returned list by `getAllPostIds()` is not just an array of strings — it must be an array of objects  
that look like the comment inside. Each object must have the `params` key and contain an object with the `id` key (because we’re using `[id]` in the file name). Otherwise, `getStaticPaths` will fail.

`lib/posts.js`

```
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   ...
  // ]

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
```

`posts/[id].js`

```
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```

The array of possible values for `id` must be the value of the `paths` key of the returned object.  
This is exactly what `getAllPostIds()` returns.

We need to update `getStaticProps` to use `await` when calling `getPostData`.

### Render Markdown

To render markdown content, we’ll use the `remark` library.

\$ npm install remark remark-html

Import them on `lib/posts.js` and update `getPostData()` to use remark.

```
import remark from 'remark'
import html from 'remark-html'

...

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
```

We added the `async` keyword to `getPostData` because we need to use `await` for `remark`.

Finally, update the `Post` component to render `contentHtml` using `dangerouslySetInnerHTML`

```
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}
```

### Polishing the Post Page

### Polishing the Index Page

`pages/index.js`

```
import Link from 'next/link'
import Date from '../components/date'

...

<li className={utilStyles.listItem} key={id}>
  <Link href="/posts/[id]" as={`/posts/${id}`}>
    <a>{title}</a>
  </Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
...
```

`components/date.js`

```
import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
```

### Dynamic Routes Details

#### Fetch External API or Query Database

Like `getStaticProps`, `getStaticPaths` can fetch data from any data source.  
In our example, `getAllPostIds` (which is used by `getStaticPaths`) may fetch from an external API endpoint:

```
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const posts = await fetch('..')
  const postsJson = res.json()
  return postsJson.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
```

- In development (`npm run dev` or `yarn dev`), `getStaticPaths` runs on every request.
- In production, `getStaticPaths` runs at build time.

#### Fallback

If `fallback` is `false`, then any paths not returned by `getStaticPaths` will result in a 404 page.

If `fallback` is `true`, then the behavior of `getStaticProps` (?) changes:

- The paths returned from `getStaticPaths` will be rendered to HTML at build time.
- The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path (see “Fallback pages” below for details).
- In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

### Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (`...`) inside the brackets.  
For example:  
`pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.

If you do this, in `getStaticPaths`, you must return an array as the value of the id key like so:

```
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

And `params.id` will be an array in `getStaticProps`:

```
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

#### Router

If you want to access the Next.js router, you can do so by importing the `useRouter` hook from `next/router`.

#### 404 Pages

To create a custom 404 page, create `pages/404.js`. This file is statically generated at build time.

```
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

## API Routes

Next.js has support for API Routes, which lets you easily create an API endpoint as a Node.js function.  
You can do so by creating a function inside the `pages/api` directory.  
They can be deployed as Serverless Functions (also known as Lambdas).

```
// req = request data, res = response data
export default (req, res) => {
  // ...
}
```

Create a file called `hello.js` in `pages/api`

```
export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
}
```

- `req` is an instance of http.IncomingMessage, plus some pre-built middlewares.
- `res` is an instance of http.ServerResponse, plus some helper functions.

### Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`

You should not fetch an API Route from `getStaticProps` or `getStaticPaths`. Instead, write your server-side code directly in `getStaticProps` or `getStaticPaths` (or call a helper function).

Here’s why: `getStaticProps` and `getStaticPaths` runs only on the server-side.  
It will never be run on the client-side. It won’t even be included in the JS bundle for the browser.  
That means you can write code such as direct database queries without them being sent to browsers.

### A Good Use Case: Handle Form Input

For example, you can create a form in your page and have it send a `POST` request to your API Route.  
You can then write code to directly save it to your database.  
The API Route code will not be part of your client bundle, so you can safely write server-side code.

```
export default (req, res) => {
  const email = req.body.email
  // Then save email to your database, etc...
}
```

### Preview Mode

Static Generation is useful when your pages fetch data from a headless CMS.  
However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page.  
You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content.  
You’d want Next.js to bypass Static Generation only for this specific case.

Next.js has the feature called Preview Mode which solves this problem, and it utilizes API Routes.  
[Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)

### Dynamic API Routes

API Routes can be dynamic, just like regular pages.  
[Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes)

## Deploying Your Next.js App
