import Link from "next/link";
import ProjectCard from "./components/ProjectCard";

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
    "https://api.github.com/users/jacklenzotti/repos?sort=pushed&per_page=6",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jack-l-641496106/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/jacklenzotti",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    href:
      "https://open.spotify.com/user/jack_benett_?si=wQLNF0-cRm-88aJNup-mGA",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
];

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-left"
    >
      <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
        {repo.name}
      </h3>
      {repo.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-500">
        {repo.language && <span>{repo.language}</span>}
        {repo.stargazers_count > 0 && (
          <span>{repo.stargazers_count} stars</span>
        )}
      </div>
    </a>
  );
}

export default async function Home() {
  const recentRepos = await getRecentRepos();

  return (
    <div>
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden"
      >
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-[#0a0a0a] dark:to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/30 via-transparent to-transparent dark:from-zinc-700/10" />

        <div className="flex flex-col items-center gap-8 p-8 relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="me.jpeg"
            alt="Jack Lenzotti"
            width={160}
            height={160}
            className="rounded-full animate-fade-in-up shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-800"
          />
          <div className="text-center animate-fade-in-up animation-delay-200">
            <h1 className="text-5xl font-bold tracking-tight">Jack Lenzotti</h1>
            <p className="mt-3 text-xl text-zinc-500 dark:text-zinc-400">
              Software Engineer &middot; Chicago
            </p>
          </div>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 text-center max-w-lg animate-fade-in-up animation-delay-400">
            Developer Experience engineer and hobbyist game maker. Building
            tools that make developers&apos; lives easier.
          </p>
          <div className="flex gap-6 animate-fade-in-up animation-delay-600">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="flex flex-col items-center gap-8 p-8 max-w-4xl w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl font-semibold">Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Featured Projects */}
          <div className="w-full">
            <h3 className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
              Featured
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard
                title="ChessMatch"
                description="A colorful chess puzzle game"
                href="/chessmatch"
                image="chessmatch/feature.jpg"
                tags={["iOS & Android", "Coming Soon"]}
              />
              <ProjectCard
                title="Hank"
                description="Autonomous AI coding agent for GitHub issues"
                href="/hank"
                tags={["CLI Tool", "Open Source"]}
              />
              <ProjectCard
                title="Hank Dash"
                description="Real-time monitoring dashboard for Hank agents"
                href="/hank-dash"
                tags={["Web App", "Open Source"]}
              />
            </div>
          </div>

          {recentRepos.length > 0 && (
            <div className="w-full">
              <h3 className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                Recently Active
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentRepos.slice(0, 4).map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

      {/* Contact Section */}
      <section id="contact" className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-8 p-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Want to chat? Drop me a line.
          </p>
          <a
            href="mailto:jacklenzotti@gmail.com"
            className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="group-hover:underline">
              jacklenzotti@gmail.com
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
