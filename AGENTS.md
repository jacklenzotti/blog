# Agents Operational Guide

## Build & Dev Commands

- `npm run dev` — dev server on port 3000
- `npm run build` — static export to /out
- `npm run lint` — ESLint check
- `make dev` / `make build` — shortcuts

## Architecture

- Next.js 16 App Router, static export (`output: 'export'`)
- Base path: `/blog` in production, empty in dev
- Tailwind CSS v4 with inline theme config
- Dark mode via `prefers-color-scheme` media query

## Layout Structure

- `app/layout.tsx` — root layout with Navbar + Footer (site-wide)
- `app/components/Navbar.tsx` — client component, fixed top nav with active state detection
- `app/components/Footer.tsx` — server component, social links + page links + copyright
- `app/components/ProjectCard.tsx` — reusable card for projects (supports internal Link and external `<a>`)

## Pages

- `/` — home page (hero, featured projects, recent repos, contact)
- `/about` — expanded bio, skills, experience, interests
- `/projects` — projects index (featured projects + GitHub repos)
- `/chessmatch` — ChessMatch game showcase
- `/hank` — Hank autonomous AI coding agent
- `/hank-dash` — Hank Dash real-time monitoring dashboard
