import type { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";
import {
  AppStoreIcon,
  FacebookIcon,
  GooglePlayIcon,
  InstagramIcon,
  SteamIcon,
  YouTubeIcon,
} from "../components/icons";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            title="ChessMatch"
            description="Chess strategy meets match-3 puzzling. 100 hand-designed levels."
            href="https://store.steampowered.com/app/4454830/ChessMatch/"
            image="chessmatch/feature.jpg"
            tags={[
              {
                label: "Steam",
                href: "https://store.steampowered.com/app/4454830/ChessMatch/",
                icon: SteamIcon,
              },
              {
                label: "App Store",
                href: "https://apps.apple.com/us/app/chessmatch-match-3-game/id6758308749",
                icon: AppStoreIcon,
              },
              {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=com.jacklenzotti.chessmatch&hl=en_US",
                icon: GooglePlayIcon,
              },
            ]}
            external
          />
          <ProjectCard
            title="RhythmMatch"
            description="Beat-synced match-3 with synthwave vibes."
            href="https://play.google.com/store/apps/details?id=com.jacklenzotti.rhythmmatch&hl=en_US"
            image="rhythmmatch/feature.png"
            tags={[
              {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=com.jacklenzotti.rhythmmatch&hl=en_US",
                icon: GooglePlayIcon,
              },
            ]}
            external
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
            href="https://www.instagram.com/zottfiles/"
            tags={[
              "Remotion",
              "Shorts",
              {
                label: "Instagram",
                href: "https://www.instagram.com/zottfiles/",
                icon: InstagramIcon,
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/shorts/hHYw0B9P6KI",
                icon: YouTubeIcon,
              },
            ]}
            external
          />
          <ProjectCard
            title="Zottmaps"
            description="Maps that tell the story. Geography, borders, and history animated into short-form video."
            href="https://www.facebook.com/zottmaps/"
            tags={[
              "Remotion",
              "Shorts",
              {
                label: "Facebook",
                href: "https://www.facebook.com/zottmaps/",
                icon: FacebookIcon,
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@zottmaps",
                icon: YouTubeIcon,
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
            tags={["Open Source"]}
            external
          />
          <ProjectCard
            title="PullPush MCP"
            description="MCP server that gives AI assistants access to Reddit historical data via PullPush.io. Search comments and submissions by subreddit, author, date, score, and keywords."
            href="https://github.com/jacklenzotti/pullpush-mcp"
            tags={[
              "MCP",
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
            tags={["MCP", "Open Source"]}
            external
          />
          <ProjectCard
            title="Cities: Skylines MCP"
            description="MCP server and in-game bridge that lets AI tools drive Cities: Skylines — roads, zoning, cinematic tours, and timelapses."
            href="https://github.com/jacklenzotti/cities-skylines-mcp"
            tags={["MCP", "Open Source"]}
            external
          />
          <ProjectCard
            title="Clausewitz MCP"
            description="MCP server for Paradox modding — EU5, EU4, Victoria 3, HOI4, CK3, Stellaris. Grounds AI mod authoring in the game&apos;s own script docs instead of guesswork."
            href="https://github.com/jacklenzotti/clausewitz-mcp"
            tags={["MCP", "Open Source"]}
            external
          />
          <ProjectCard
            title="GTerm Director"
            description="Machinima director for Garry&apos;s Mod over MCP. Around 44 scene tools for camera, actors, props, and recording. Fork of Earu/GTerm."
            href="https://github.com/jacklenzotti/gterm-director"
            tags={["MCP", "Open Source"]}
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
