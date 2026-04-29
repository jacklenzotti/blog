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

      {/* zottware */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          zottware
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ProjectCard
            title="zottware"
            description="Solo game studio. Two mobile games built in one month with AI agents."
            href="https://zottware.com"
            tags={["Game Studio"]}
            external
          />
        </div>
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

      {/* Video Channels */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Video Channels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            title="Zottfiles"
            description="Wikipedia&apos;s strangest articles, code-animated into 60-second shorts. History, anomalies, oddities. Everything from Lake Nyos to Roopkund."
            href="https://www.youtube.com/shorts/hHYw0B9P6KI"
            tags={[
              "Remotion",
              "Shorts",
              {
                label: "Featured video",
                href: "https://www.youtube.com/shorts/hHYw0B9P6KI",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
              },
            ]}
            external
          />
          <ProjectCard
            title="Zottware"
            description="First-person black-hat retellings of historical hacks and exploit explainers. Narrated from the attacker&apos;s chair."
            href="https://www.youtube.com/shorts/GxJd5fSxG2E"
            tags={[
              "Remotion",
              "Cybersecurity",
              {
                label: "Featured video",
                href: "https://www.youtube.com/shorts/GxJd5fSxG2E",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
              },
            ]}
            external
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
            description="Automated pipeline that converts Reddit stories into short-form vertical videos with AI voiceover"
            href="https://github.com/jacklenzotti/ReelDeal"
            tags={[
              "Open Source",
              {
                label: "YouTube",
                href: "https://www.youtube.com/@zottware",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
              },
              {
                label: "TikTok",
                href: "https://www.tiktok.com/@zottwaregames",
                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
              },
            ]}
            external
          />
          <ProjectCard
            title="PullPush MCP"
            description="MCP server that gives AI assistants access to Reddit historical data via PullPush.io. Search comments and submissions by subreddit, author, date, score, and keywords."
            href="https://github.com/jacklenzotti/pullpush-mcp"
            tags={[
              "Open Source",
              {
                label: "npm",
                href: "https://www.npmjs.com/package/pullpush-mcp",
              },
              {
                label: "MCP Registry",
                href: "https://mcp-registry.org/registry/io.github.jacklenzotti/pullpush-mcp",
              },
            ]}
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
            previews={[
              "picasso-examples/icon_castle.png",
              "picasso-examples/icon_smite.png",
              "picasso-examples/icon_enchant.png",
              "picasso-examples/icon_hint.png",
            ]}
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
