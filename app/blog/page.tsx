import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPostMeta } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Jack Lenzotti on engineering, game dev, and tooling.",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getPublishedPostMeta();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Blog</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-12">
        Writing on engineering, game dev, and tooling.
      </p>

      {posts.length === 0 ? (
        <p className="text-zinc-400 dark:text-zinc-600">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {post.title}
                  </h2>
                  <time
                    dateTime={post.date}
                    className="text-sm text-zinc-400 dark:text-zinc-600 shrink-0"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
              <div className="mt-4 h-px bg-zinc-100 dark:bg-zinc-800" />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
