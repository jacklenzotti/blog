# Projects Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the blog projects page to feature released games linking to zottware.com, move Hank/Hank Dash to Open Source, add a teaser card, and clean up dead detail pages.

**Architecture:** Edit ProjectCard to support optional href, rewrite the projects page sections, update home page and footer external links, delete 4 detail pages, copy teaser image.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-24-projects-page-restructure-design.md`

---

### Task 1: Copy teaser image into public/

**Files:**
- Create: `public/crabs.png` (copy from `/Users/jack/Desktop/crabs.png`)

- [ ] **Step 1: Copy the image**

```bash
cp /Users/jack/Desktop/crabs.png /Users/jack/code/blog/public/crabs.png
```

- [ ] **Step 2: Verify it exists**

```bash
ls -la /Users/jack/code/blog/public/crabs.png
```

Expected: file exists, reasonable size

- [ ] **Step 3: Commit**

```bash
git add public/crabs.png
git commit -m "feat: add crabs teaser image"
```

---

### Task 2: Make ProjectCard href optional

**Files:**
- Modify: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Update the interface and component**

Make `href` optional. When omitted, render a `<div>` instead of `<Link>`/`<a>`, with no hover border effect and default cursor.

```tsx
import Link from "next/link";

export interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tags?: string[];
  external?: boolean;
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  external,
}: ProjectCardProps) {
  const isClickable = !!href;

  const content = (
    <>
      <div className="flex items-center gap-3">
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover"
          />
        )}
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </>
  );

  const baseClasses = "block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors";

  if (!isClickable) {
    return (
      <div className={`${baseClasses} opacity-70`}>
        {content}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} hover:border-zinc-400 dark:hover:border-zinc-600`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} hover:border-zinc-400 dark:hover:border-zinc-600`}
    >
      {content}
    </Link>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
cd /Users/jack/code/blog && npx next build 2>&1 | tail -20
```

Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add app/components/ProjectCard.tsx
git commit -m "feat: make ProjectCard href optional for teaser cards"
```

---

### Task 3: Rewrite the projects page

**Files:**
- Modify: `app/projects/page.tsx`

- [ ] **Step 1: Replace the Featured and Open Source sections**

Replace the entire content of the file with:

```tsx
import type { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and apps by Jack Lenzotti.",
};

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

async function getRecentRepos(): Promise<Repo[]> {
  const res = await fetch(
    "https://api.github.com/users/jacklenzotti/repos?sort=pushed&per_page=12",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ProjectsPage() {
  const repos = await getRecentRepos();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-12">
        Apps, tools, and open source work.
      </p>

      {/* Games */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Games
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
          Two mobile games. One month. Built with AI agents.{" "}
          <a
            href="https://zottware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
          >
            Learn more at zottware.com &rarr;
          </a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectCard
            title="ChessMatch"
            description="Chess strategy meets match-3 puzzling. 100 hand-designed levels."
            href="https://zottware.com/chessmatch"
            image="chessmatch/feature.jpg"
            tags={["iOS", "Android", "Steam"]}
            external
          />
          <ProjectCard
            title="RhythmMatch"
            description="Beat-synced match-3 with synthwave vibes."
            href="https://zottware.com/rhythmmatch"
            image="rhythmmatch/feature.png"
            tags={["iOS", "Android"]}
            external
          />
          <ProjectCard
            title="Up Next"
            description="???"
            image="crabs.png"
            tags={["Coming Soon"]}
          />
        </div>
      </section>

      {/* Open Source */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Open Source
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            title="Hank"
            description="Autonomous AI coding agent for GitHub issues"
            href="https://github.com/jacklenzotti/hank"
            tags={["CLI", "Open Source"]}
            external
          />
          <ProjectCard
            title="Hank Dash"
            description="Real-time monitoring dashboard for Hank agents"
            href="https://github.com/jacklenzotti/hank-dash"
            tags={["Web App", "Open Source"]}
            external
          />
          <ProjectCard
            title="ReelDeal"
            description="Automated pipeline that converts Reddit stories into short-form vertical videos with AI voiceover for YouTube Shorts, TikTok, and Reels"
            href="https://github.com/jacklenzotti/ReelDeal"
            tags={["Open Source"]}
            external
          />
          <ProjectCard
            title="just-google-it"
            description="MCP server and CLI that gives AI coding agents web search so they can look up solutions when they get stuck"
            href="https://github.com/jacklenzotti/just-google-it"
            tags={["Open Source"]}
            external
          />
          <ProjectCard
            title="picasso"
            description="CLI pipeline for converting AI-generated images into game-ready 2D assets with sprite slicing, background removal, and atlas packing"
            href="https://github.com/jacklenzotti/picasso"
            tags={["Open Source"]}
            external
          />
        </div>
      </section>

      {/* GitHub Repos */}
      {repos.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
            GitHub Repositories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <ProjectCard
                key={repo.name}
                title={repo.name}
                description={repo.description || "No description"}
                href={repo.html_url}
                tags={[
                  ...(repo.language ? [repo.language] : []),
                  ...(repo.stargazers_count > 0
                    ? [`${repo.stargazers_count} stars`]
                    : []),
                ]}
                external
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
cd /Users/jack/code/blog && npx next build 2>&1 | tail -20
```

Expected: builds successfully

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: restructure projects page with Games section and updated OSS"
```

---

### Task 4: Update home page external links

**Files:**
- Modify: `app/page.tsx` (lines 148-173, the Featured subsection)

- [ ] **Step 1: Update the Featured subsection**

In `app/page.tsx`, replace the "Featured" subsection (lines 148-173) with updated links and descriptions. The ChessMatch card should link to `https://zottware.com/chessmatch` externally. Hank and Hank Dash should link to their GitHub repos externally. All three need `target="_blank"` and `rel="noopener noreferrer"` since they use `ProjectCard` with the `external` prop.

Replace lines 148-174:

```tsx
          {/* Featured Projects */}
          <div className="w-full">
            <h3 className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
              Featured
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard
                title="ChessMatch"
                description="Chess strategy meets match-3 puzzling. 100 hand-designed levels."
                href="https://zottware.com/chessmatch"
                image="chessmatch/feature.jpg"
                tags={["iOS", "Android", "Steam"]}
                external
              />
              <ProjectCard
                title="Hank"
                description="Autonomous AI coding agent for GitHub issues"
                href="https://github.com/jacklenzotti/hank"
                tags={["CLI Tool", "Open Source"]}
                external
              />
              <ProjectCard
                title="Hank Dash"
                description="Real-time monitoring dashboard for Hank agents"
                href="https://github.com/jacklenzotti/hank-dash"
                tags={["Web App", "Open Source"]}
                external
              />
            </div>
          </div>
```

- [ ] **Step 2: Verify it builds**

```bash
cd /Users/jack/code/blog && npx next build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update home page project links to external URLs"
```

---

### Task 5: Update footer links

**Files:**
- Modify: `app/components/Footer.tsx` (lines 34-43, the `footerLinks` array)

- [ ] **Step 1: Update footerLinks array**

The footer currently uses `<Link>` for all items (internal routing). ChessMatch, Hank, and Hank Dash now point externally. The simplest approach: change the `footerLinks` data to include an `external` flag, then conditionally render `<a>` vs `<Link>`.

Replace lines 34-43 with:

```tsx
const footerLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "ChessMatch", href: "https://zottware.com/chessmatch", external: true },
  { label: "Hank", href: "https://github.com/jacklenzotti/hank", external: true },
  { label: "Hank Dash", href: "https://github.com/jacklenzotti/hank-dash", external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Support", href: "/support" },
];
```

Then update the rendering (lines 55-63) to handle external links:

```tsx
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
```

- [ ] **Step 2: Verify it builds**

```bash
cd /Users/jack/code/blog && npx next build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: update footer links to external URLs for games and tools"
```

---

### Task 6: Delete detail pages

**Files:**
- Delete: `app/chessmatch/page.tsx`
- Delete: `app/rhythmmatch/page.tsx`
- Delete: `app/hank/page.tsx`
- Delete: `app/hank-dash/page.tsx`

- [ ] **Step 1: Remove the directories**

```bash
rm -rf /Users/jack/code/blog/app/chessmatch
rm -rf /Users/jack/code/blog/app/rhythmmatch
rm -rf /Users/jack/code/blog/app/hank
rm -rf /Users/jack/code/blog/app/hank-dash
```

- [ ] **Step 2: Verify no broken imports**

```bash
cd /Users/jack/code/blog && npx next build 2>&1 | tail -20
```

Expected: builds successfully (no pages reference these deleted files)

- [ ] **Step 3: Commit**

```bash
git add -u
git commit -m "chore: remove detail pages for games and tools (now link externally)"
```

---

### Task 7: Final verification

- [ ] **Step 1: Full build**

```bash
cd /Users/jack/code/blog && npx next build
```

Expected: clean build, no errors

- [ ] **Step 2: Lint check**

```bash
cd /Users/jack/code/blog && npx next lint
```

Expected: no lint errors

- [ ] **Step 3: Spot-check the output**

Verify the generated pages include the expected sections:
- `/projects` has Games (3 cards), Open Source (5 cards), GitHub Repos
- Home page Featured section has external links
- No routes exist for `/chessmatch`, `/rhythmmatch`, `/hank`, `/hank-dash`

```bash
cd /Users/jack/code/blog && ls .next/server/app/ 2>/dev/null | head -20
```
