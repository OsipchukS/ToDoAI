# Tasks

A simple, client-side task manager built with React, TypeScript, Redux Toolkit, and Material UI. All data is stored in the browser via `localStorage` — no backend required.

## Features

- Create, edit, and delete tasks
- Toggle completion with a single click
- Filter by status: **All / Active / Completed**
- Live search across title and description
- Sort by created date, updated date, or title (asc/desc)
- Light and dark themes (auto-detects system preference on first load)
- Data persisted in `localStorage`, restored on next visit
- Fully keyboard accessible, responsive layout

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — dev server and bundler
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- [Material UI 6](https://mui.com/) + [Emotion](https://emotion.sh/)
- `localStorage` for persistence (custom middleware, no extra deps)

## Getting started

```bash
npm install
npm run dev
```

The app opens at <http://localhost:5173>.

## Scripts

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload         |
| `npm run build`     | Type-check and build for production into `dist/`  |
| `npm run preview`   | Preview the production build locally              |
| `npm run lint`      | Run ESLint on the `src/` tree                     |
| `npm run typecheck` | Run TypeScript without emitting files             |
| `npm run format`    | Format `src/` with Prettier                       |

## Production

After `npm run build`, the entire app is a set of static files in `dist/` (HTML + JS + CSS). No Node.js runtime is required on the server.

### Local preview

To verify the production build locally:

```bash
npm run build
npm run preview          # http://localhost:4173
npm run preview -- --host 0.0.0.0 --port 4173   # accessible on LAN
```

> `vite preview` is intended only for local verification. It is **not** a production server — it lacks proper caching headers, compression tuning, and security headers. Do not expose it to real traffic.

### Static hosting (recommended)

Upload the contents of `dist/` to any static host: nginx, Caddy, Apache, S3 + CloudFront, Firebase Hosting, GitHub Pages, etc.

Minimal nginx config with SPA fallback and asset caching:

```nginx
server {
  listen 80;
  server_name _;
  root /var/www/todoai/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
```

### Docker (multi-stage with nginx)

Recommended container setup: build with Node, serve with nginx. Resulting image is ~30 MB.

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**.dockerignore:**

```
node_modules
dist
.git
.opencode
.env*
```

**Build and run:**

```bash
docker build -t macnaer/todoai .
docker run --rm -p 8080:80 macnaer/todoai
# open http://localhost:8080
```

> Avoid using `vite preview` as your container `CMD` — the resulting image is ~10x larger, has no production-grade HTTP layer, and Vite itself warns against it. Also note: `--host` accepts a hostname or IP (`0.0.0.0`), never a URL like `http://0.0.0.0`.

### Platform-as-a-Service

Zero-config deploys with built-in HTTPS and CDN:

| Platform | Build command | Output directory |
| --- | --- | --- |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| Cloudflare Pages | `npm run build` | `dist` |
| GitHub Pages | `npm run build` (via GitHub Actions) | `dist` |

For GitHub Pages under a sub-path (e.g. `/ToDoAI/`), set `base: '/ToDoAI/'` in `vite.config.ts` before building.

## Project structure

```
src/
├── app/
│   ├── store.ts            # Redux store + localStorage middleware
│   └── hooks.ts            # Typed useAppDispatch / useAppSelector
├── components/
│   ├── AppHeader.tsx       # Sticky top bar (title, search, theme, add)
│   └── EmptyState.tsx      # Placeholder when the list is empty
├── features/
│   ├── tasks/
│   │   ├── tasks-types.ts
│   │   ├── tasks-slice.ts  # CRUD reducers + selectors
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskFormDialog.tsx
│   │   └── ConfirmDeleteDialog.tsx
│   └── theme/
│       ├── theme-slice.ts
│       ├── theme-config.ts # MUI createTheme (light + dark palettes)
│       └── ThemeToggle.tsx
├── lib/
│   ├── id.ts               # Stable UUID generator
│   └── storage.ts          # localStorage read/write helpers
├── App.tsx
├── main.tsx
└── index.css
```

## Data storage

The full Redux state is serialised to `localStorage` under the key `demo-site:state:v1` on every dispatch. On startup, the saved state is read back and used as `preloadedState`. The `:v1` suffix in the key makes future schema migrations safe — bump the version to invalidate old data.

To wipe all tasks and reset preferences, clear the browser storage for the site or run in the console:

```js
localStorage.removeItem('demo-site:state:v1');
```

## Keyboard shortcuts

- **Ctrl/Cmd + Enter** — submit the task form
- **Esc** — close any open dialog
- **Tab / Shift + Tab** — navigate focusable elements

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Requires `crypto.randomUUID` (falls back to a `Math.random` based ID generator if unavailable) and `Intl.RelativeTimeFormat`.

## License

MIT
