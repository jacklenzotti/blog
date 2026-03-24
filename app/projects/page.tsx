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

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Featured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            title="RhythmMatch"
            description="A neon rhythm puzzle game"
            href="/rhythmmatch"
            image="rhythmmatch/feature.png"
            tags={["iOS & Android", "Coming Soon"]}
          />
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
            tags={["CLI", "Open Source"]}
          />
          <ProjectCard
            title="Hank Dash"
            description="Real-time monitoring dashboard for Hank agents"
            href="/hank-dash"
            tags={["Web App", "Open Source"]}
          />
        </div>
      </section>

      {/* Highlighted Repos */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Open Source
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
