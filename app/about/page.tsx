import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jack Lenzotti — Developer Experience engineer, hobbyist game maker, based in Chicago.",
};

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
  {
    name: "Email",
    href: "mailto:jacklenzotti@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
];

const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "Kotlin", "Java", "Swift", "Python", "Go"],
  },
  {
    category: "Frameworks & Runtimes",
    items: ["React", "Next.js", "Node.js", "Kotlin Multiplatform", "SwiftUI"],
  },
  {
    category: "AI & Agents",
    items: ["Claude Code", "Codex", "Cursor", "Windsurf", "MCP", "LSP"],
  },
  {
    category: "Tools",
    items: ["Git", "Gradle", "Docker", "AWS", "GitHub Actions"],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">About</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-12">
        Developer Experience engineer and hobbyist game maker.
      </p>

      {/* Bio Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="me.jpeg"
            alt="Jack Lenzotti"
            className="w-32 h-32 rounded-full ring-4 ring-zinc-100 dark:ring-zinc-800 shadow-lg"
          />
          <div className="flex-1">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              I&apos;m a Developer Experience engineer based in Chicago,
              passionate about building tools that make developers&apos; lives
              easier.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              When I&apos;m not working on developer tooling at scale,
              you&apos;ll find me experimenting with game development. I believe
              in clean UIs, great developer experiences, and writing code
              that&apos;s a joy to work with.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              I&apos;m always exploring new technologies and finding ways to
              improve workflows, whether that&apos;s through better tooling,
              cleaner architecture, or just making things a bit more delightful
              to use.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-6 uppercase tracking-wider">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Currently Section */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-6 uppercase tracking-wider">
          Currently
        </h2>
        <ul className="space-y-3">
          <li className="text-zinc-600 dark:text-zinc-400">
            Released two mobile games in one month using AI agents —{" "}
            <a href="https://store.steampowered.com/app/4454830/ChessMatch/" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline">ChessMatch</a>{" "}
            and{" "}
            <a href="https://play.google.com/store/apps/details?id=com.jacklenzotti.rhythmmatch&hl=en_US" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline">RhythmMatch</a>
          </li>
          <li className="text-zinc-600 dark:text-zinc-400">
            Building AI-powered developer tools and autonomous coding agents
          </li>
          <li className="text-zinc-600 dark:text-zinc-400">
            Working on developer tooling at scale
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-6 uppercase tracking-wider">
          Connect
        </h2>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
