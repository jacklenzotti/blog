import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPost } from "../../../lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors mb-8 inline-flex items-center gap-1"
      >
        &larr; Blog
      </Link>

      <header className="mt-6 mb-10">
        {post.draft && (
          <span className="inline-block mb-4 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded">
            Draft
          </span>
        )}
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mb-3">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="text-sm text-zinc-400 dark:text-zinc-600"
        >
          {formatDate(post.date)}
        </time>
        {post.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-lg mt-6"
          />
        )}
      </header>

      <div
        className="prose-content text-zinc-600 dark:text-zinc-400 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
