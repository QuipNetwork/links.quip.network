# links.quip.network

The link page for Quip Network, served at <https://links.quip.network>. The
site uses React and TypeScript. Vite builds it and prerenders it to static
HTML.

## Where to contribute

Open issues and pull requests on GitHub, at
<https://github.com/QuipNetwork/links.quip.network>. That repository is the
source for the site.

The copy at <https://gitlab.com/quip.network/links.quip.network> is a
read-only mirror. A sync job copies every branch from GitHub to the mirror
and replaces any change made there. Issues and merge requests on the mirror
are off.

## Edit the content

Most changes edit one file, `src/data/siteData.ts`. It holds the sections of
the page:

| key | contents |
| -- | -- |
| `spotlight` | the banner at the top, hidden after its `endsAt` time |
| `products` | product cards |
| `earn` | ways to earn, such as Quip Points |
| `featuredEvents` | the conference schedule, hidden after each `endsAt` date |
| `community` | social accounts |
| `developers` | developer links |
| `resources` | other links |

The events section shows the hosted events from
[Luma](https://lu.ma/quipnetwork) first, then `featuredEvents`. No component
reads the `events` list, so a change there does not show on the page.

Put images under `public/images/`. The section components live in
`src/components/sections/`.

## Run it locally

Install [Bun](https://bun.sh), then run:

```sh
bun install
bun run dev
```

The development server listens on <http://localhost:8888>.

To run inside a container instead, use the `run` script. It uses Podman, or
Docker when Podman is absent:

```sh
./run build   # build the development image from Containerfile.dev
./run dev     # start the development server on port 8888
./run bun install
```

## Check and build

```sh
bun run check   # type check
bun run lint    # ESLint
bun run build   # type check, build, and prerender into dist/
```

`bun run build` runs the client build, then a server build of
`src/entry-server.tsx`, then `prerender.mjs`, which writes static HTML into
`dist/`.

## Deploy

Netlify builds the site with `bun run build` and publishes `dist/`. Every pull
request gets a deploy preview.

`netlify.toml` also holds the redirects. `/api/luma/*` proxies to the Luma
API, and `/__contact` sends the contact form to the form handler on
<https://www.quip.network>.
