"use client";

export default function ProjectsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-12">
        Apps, tools, and open source work.
      </p>
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Failed to load project data. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
