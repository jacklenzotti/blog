export default function ProjectsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
      <div className="h-5 w-64 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse mb-12" />

      <div className="mb-16">
        <div className="h-4 w-16 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
            >
              <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
            >
              <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
