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
