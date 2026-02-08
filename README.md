# Jack Lenzotti's Personal Site

A personal portfolio site built with Next.js 16 and deployed to GitHub Pages.

## Tech Stack

- **Next.js 16** — App Router with static export
- **React 19** — Server and client components
- **Tailwind CSS v4** — Utility-first styling with dark mode
- **TypeScript 5** — Type safety throughout

## Pages

| Route         | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `/`           | Home — hero, featured projects, recent GitHub repos, contact |
| `/about`      | Bio, skills, current work                                    |
| `/projects`   | All projects + GitHub repositories                           |
| `/chessmatch` | ChessMatch game showcase                                     |
| `/hank`       | Hank autonomous AI coding agent                              |
| `/hank-dash`  | Hank Dash real-time monitoring dashboard                     |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Build

```bash
npm run build   # Static export to /out
npm run lint    # ESLint check
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on push to `master`.

Live at: <https://jacklenzotti.github.io/blog/>

## Project Structure

```
app/
├── layout.tsx              # Root layout (Navbar + Footer)
├── page.tsx                # Home page
├── globals.css             # Tailwind + theme + animations
├── about/page.tsx          # About page
├── projects/page.tsx       # Projects index
├── chessmatch/page.tsx     # ChessMatch showcase
├── hank/page.tsx           # Hank project page
├── hank-dash/page.tsx      # Hank Dash project page
└── components/
    ├── Navbar.tsx           # Fixed nav with active state + theme toggle
    ├── Footer.tsx           # Site-wide footer
    ├── ProjectCard.tsx      # Reusable project card
    ├── ThemeToggle.tsx      # Dark mode toggle (system/light/dark)
    └── ThemeScript.tsx      # Flash prevention script
```
