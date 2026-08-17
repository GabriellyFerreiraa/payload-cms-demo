Note: This is a focused demo, not a client project. Built to work through how Payload CMS sits inside a Next.js App Router application — where the server boundary falls, and what changes when the CMS is a dependency instead of a separate service. See Why build this? below.

# 📝 Payload CMS Demo

A headless CMS running inside a Next.js App Router app. Content is authored in the Payload admin panel, stored in Postgres, and rendered by React Server Components — so a marketing team can publish without a pull request, a build, or a developer.

🔗 **Live demo:** [payload-cms-demo-sigma.vercel.app](https://payload-cms-demo-sigma.vercel.app)
🔐 **Admin panel:** `/admin`

## 🤔 Why build this?

Most "headless CMS" setups are two systems: a CMS somewhere else, and a frontend that fetches from it over HTTP. That means an API token to protect, a network hop on every render, and CORS to configure.

Payload works differently. It's a dependency of the Next.js app, not a service next to it. The admin panel is a route in the same application, and content is read through a Local API that queries the database directly on the server.

| | Hosted CMS + frontend | Payload in Next.js |
|---|---|---|
| Content fetch | HTTP request to an external API | `payload.find()` — direct DB query, server-side |
| Credentials | API token, must be protected | No token in the render path |
| Deploys | Two systems | One |
| Schema changes | CMS dashboard, then update the frontend | A TypeScript file, versioned in git |

**The trade-off:** a hosted CMS means someone else runs the infrastructure and the content team gets a polished product on day one. Payload means the schema lives in your repo and the content lives in your database — better when content structure changes with the product, worse when you want a CMS you never have to operate.

---

## 🇬🇧 English

### About the project

A small publishing setup that demonstrates the full path: a content model defined in code, an admin panel generated from it, records in Postgres, and a public page rendering them server-side.

Each post on the public page displays the fields behind it — collection, slug, status, publish date — because the point of a CMS is that the structure is visible and editable rather than buried in markup.

### Features

- **Content model as code** — the `posts` collection is a TypeScript config file, so schema changes are reviewable in a pull request and versioned like any other code.
- **Local API rendering** — `payload.find()` queries Postgres directly from a Server Component. No HTTP round trip, no API token in the render path.
- **Draft/published states** — the public query filters on `status`, so unpublished work is never rendered.
- **Rich text authoring** — content is stored as structured JSON rather than an HTML blob, so it can be rendered differently per surface.
- **Credentials server-side only** — `DATABASE_URI` and `PAYLOAD_SECRET` are set as Vercel environment variables and carry no `NEXT_PUBLIC_` prefix, so they never enter the client bundle.

### Tech stack

- Next.js (App Router) + React
- TypeScript
- Payload CMS 3
- PostgreSQL on Neon
- Deployed on Vercel

### Running locally

```
git clone https://github.com/GabriellyFerreiraa/payload-cms-demo.git
cd payload-cms-demo
npm install
npm run dev
```

The app runs at `http://localhost:3000`, the admin panel at `/admin`. Create a `.env` file first:

```
DATABASE_URI=your_postgres_connection_string
PAYLOAD_SECRET=a_long_random_string
```

Neither carries `NEXT_PUBLIC_`, and that's deliberate: both are read only on the server. `PAYLOAD_SECRET` signs admin sessions — if it reaches the browser, session tokens can be forged.

---

## 🇪🇸 Español

### Sobre el proyecto

Un sistema de publicación pequeño que muestra el recorrido completo: un modelo de contenido definido en código, un panel de administración generado a partir de él, registros en Postgres, y una página pública que los renderiza del lado del servidor.

Cada post en la página pública muestra los campos que lo sostienen — colección, slug, estado, fecha de publicación — porque la razón de ser de un CMS es que la estructura sea visible y editable, no que quede enterrada en el markup.

### Funcionalidades

- **Modelo de contenido como código** — la colección `posts` es un archivo de configuración en TypeScript, así que los cambios de esquema se revisan en un pull request y quedan versionados como cualquier otro código.
- **Renderizado con la Local API** — `payload.find()` consulta Postgres directamente desde un Server Component. Sin ida y vuelta HTTP, sin token de API en el camino del renderizado.
- **Estados de borrador y publicado** — la consulta pública filtra por `status`, así que el trabajo sin publicar nunca se renderiza.
- **Edición con texto enriquecido** — el contenido se guarda como JSON estructurado en lugar de un bloque de HTML, así puede renderizarse distinto según la superficie.
- **Credenciales solo en el servidor** — `DATABASE_URI` y `PAYLOAD_SECRET` se cargan como variables de entorno en Vercel y no llevan el prefijo `NEXT_PUBLIC_`, por lo que nunca entran al bundle del cliente.

### Tecnologías utilizadas

- Next.js (App Router) + React
- TypeScript
- Payload CMS 3
- PostgreSQL en Neon
- Desplegado en Vercel

### Cómo ejecutar localmente

```
git clone https://github.com/GabriellyFerreiraa/payload-cms-demo.git
cd payload-cms-demo
npm install
npm run dev
```

La app corre en `http://localhost:3000`, el panel de administración en `/admin`. Primero creá un archivo `.env`:

```
DATABASE_URI=tu_connection_string_de_postgres
PAYLOAD_SECRET=una_cadena_larga_y_aleatoria
```

Ninguna lleva `NEXT_PUBLIC_`, y es a propósito: las dos se leen solo en el servidor. `PAYLOAD_SECRET` firma las sesiones del panel — si llega al navegador, los tokens de sesión se pueden falsificar.

---

## 🇧🇷 Português

### Sobre o projeto

Um sistema de publicação pequeno que mostra o caminho completo: um modelo de conteúdo definido em código, um painel de administração gerado a partir dele, registros no Postgres, e uma página pública renderizando tudo do lado do servidor.

Cada post na página pública mostra os campos por trás dele — coleção, slug, status, data de publicação — porque a razão de existir de um CMS é que a estrutura seja visível e editável, não enterrada no markup.

### Funcionalidades

- **Modelo de conteúdo como código** — a coleção `posts` é um arquivo de configuração em TypeScript, então mudanças de schema são revisadas em um pull request e ficam versionadas como qualquer outro código.
- **Renderização com a Local API** — `payload.find()` consulta o Postgres direto de um Server Component. Sem ida e volta HTTP, sem token de API no caminho da renderização.
- **Estados de rascunho e publicado** — a consulta pública filtra por `status`, então o trabalho não publicado nunca é renderizado.
- **Edição com texto rico** — o conteúdo é salvo como JSON estruturado em vez de um bloco de HTML, então pode ser renderizado de formas diferentes conforme a superfície.
- **Credenciais só no servidor** — `DATABASE_URI` e `PAYLOAD_SECRET` são variáveis de ambiente na Vercel e não levam o prefixo `NEXT_PUBLIC_`, então nunca entram no bundle do cliente.

### Tecnologias utilizadas

- Next.js (App Router) + React
- TypeScript
- Payload CMS 3
- PostgreSQL na Neon
- Deploy na Vercel

### Como rodar localmente

```
git clone https://github.com/GabriellyFerreiraa/payload-cms-demo.git
cd payload-cms-demo
npm install
npm run dev
```

O app roda em `http://localhost:3000`, o painel de administração em `/admin`. Primeiro crie um arquivo `.env`:

```
DATABASE_URI=sua_connection_string_do_postgres
PAYLOAD_SECRET=uma_string_longa_e_aleatoria
```

Nenhuma leva `NEXT_PUBLIC_`, e isso é proposital: as duas são lidas só no servidor. `PAYLOAD_SECRET` assina as sessões do painel — se chegar ao navegador, tokens de sessão podem ser forjados.

---

## 📂 Project Structure

```
src/
 ├─ app/
 │   ├─ (frontend)/
 │   │   ├─ page.tsx          # Server Component — reads posts via the Local API
 │   │   └─ styles.css
 │   └─ (payload)/            # Admin panel routes, generated by Payload
 ├─ collections/
 │   ├─ Posts.ts              # Content model — fields, access, admin display
 │   ├─ Users.ts              # Admin authentication
 │   └─ Media.ts              # Uploads
 └─ payload.config.ts         # DB adapter, collections registry, secret
```

On the two route groups: `(frontend)` and `(payload)` are one Next.js application sharing one database connection and one deploy. The admin panel isn't a separate service — that's the architectural point of Payload, and the reason there's no API token to protect between the CMS and the site.

---

## 👩‍💻 Author / Autora

**Gabrielly Ferreira**
📫 gabiferreira101@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/gabrielly-ferreira-619609113) · [GitHub](https://github.com/GabriellyFerreiraa)
