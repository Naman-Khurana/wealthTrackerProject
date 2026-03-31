# Wealth Tracker Frontend

Production-focused personal finance dashboard frontend built with Next.js (App Router), TypeScript, React Query, Axios interceptors, and chart-driven analytics.

## Resume-Ready Features

### Backend-Integrated Production Features

- JWT auth flow with cookie-based session handling and automatic redirect logic for protected routes via Next.js middleware.
- Refresh token implementation support using Axios response interceptors that retry failed requests after silent token refresh.
- Concurrent 401 protection using a shared refresh promise to prevent refresh-token request storms.
- Secure logout flow that clears client auth state and query cache before redirecting to login.
- Centralized API client with `withCredentials` enabled for authenticated cross-request session continuity.

### Frontend Engineering Features

- App Router architecture with route groups for auth and main app sections (`(auth)`, `(site)`) to keep navigation concerns clean.
- Global auth context with persistent hydration from localStorage for seamless reload behavior.
- React Query integration for server-state caching, stale-time tuning, and targeted invalidation after mutations.
- Data-heavy financial dashboards with reusable chart components (line/bar/doughnut) built on Chart.js and react-chartjs-2.
- Modular analytics pages for earnings, expenses, and budget insights with API-driven visualizations.
- Centralized modal orchestration via context + renderer pattern to avoid prop drilling across feature modules.
- Reusable UI component layers for cards, graph wrappers, profile controls, and dashboard widgets.
- Interactive auth UX with animated transitions, inline validation states, and password visibility controls.
- Responsive dashboard shell with persistent navbar/sidebar layout and scroll-aware content panes.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- TanStack React Query
- Axios
- Chart.js + react-chartjs-2
- Framer Motion

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
