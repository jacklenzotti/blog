import type { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects - Jack Lenzotti",
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

      {/* Featured Apps */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-4 uppercase tracking-wider">
          Apps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            title="ChessMatch"
            description="A colorful chess puzzle game"
            href="/chessmatch"
            image="chessmatch/feature.jpg"
            tags={["iOS & Android", "Coming Soon"]}
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
