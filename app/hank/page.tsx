import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hank",
  description:
    "Hank — an autonomous AI coding agent that works on GitHub issues using Claude Code.",
};

const features = [
  {
    title: "GitHub Integration",
    description: "Monitors issues and syncs work",
  },
  {
    title: "AI-Powered",
    description: "Uses Claude Code for autonomous implementation",
  },
  {
    title: "Configurable",
    description: "Set iteration limits, labels, and preferences",
  },
  {
    title: "Progress Tracking",
    description: "Real-time status reporting and updates",
  },
];

const techStack = ["TypeScript", "Node.js", "Claude Code SDK", "GitHub API"];

export default function Hank() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Hank</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-1">
          Autonomous AI Coding Agent
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
          Open Source &middot; CLI Tool
        </p>
      </div>

      {/* Description */}
      <div className="max-w-2xl text-center mb-12">
        <p className="text-zinc-600 dark:text-zinc-400">
          Hank is an autonomous AI coding agent that works on GitHub issues.
          It&apos;s a CLI tool that monitors issues labeled with
          &quot;hank&quot;, spins up Claude Code agents to work on each issue
          autonomously, manages work loops with configurable iteration limits,
          and tracks progress to report status.
        </p>
      </div>

      {/* Features */}
      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
            >
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/jacklenzotti/hank"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}
