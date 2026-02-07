"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          An error occurred while loading this page.
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
