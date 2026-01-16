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

async function getStarredRepos(): Promise<Repo[]> {
  const res = await fetch(
    "https://api.github.com/users/jacklenzotti/starred?per_page=6",
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
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/jacklenzotti",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/user/jack_benett_?si=wQLNF0-cRm-88aJNup-mGA",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
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
      <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{repo.name}</h3>
      {repo.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-500">
        {repo.language && <span>{repo.language}</span>}
        {repo.stargazers_count > 0 && <span>{repo.stargazers_count} stars</span>}
      </div>
    </a>
  );
}

export default async function Home() {
  const [recentRepos, starredRepos] = await Promise.all([
    getRecentRepos(),
    getStarredRepos(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <main className="flex flex-col items-center gap-8 p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="me.jpeg"
            alt="Jack Lenzotti"
            width={150}
            height={150}
            className="rounded-full"
          />
          <h1 className="text-3xl font-semibold">Jack Lenzotti</h1>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </main>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <main className="flex flex-col items-center gap-8 p-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold">About</h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p>
              Software engineer based in Chicago.
            </p>
            <p>
              10x-ing my own productivity with agents. Building IDE plugins, MCP servers, and mobile applications.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Stack: Whatever gets the job done
            </p>
          </div>
        </main>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <main className="flex flex-col items-center gap-8 p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-semibold">Projects</h2>

          {recentRepos.length > 0 && (
            <div className="w-full">
              <h3 className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">Recently Active</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          )}

          {starredRepos.length > 0 && (
            <div className="w-full mt-8">
              <h3 className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">Recently Starred</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {starredRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          )}
        </main>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <main className="flex flex-col items-center gap-8 p-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Want to chat? Drop me a line.
          </p>
          <a
            href="mailto:jacklenzotti@gmail.com"
            className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:underline">jacklenzotti@gmail.com</span>
          </a>
        </main>
      </section>
    </div>
  );
}
