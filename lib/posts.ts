import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  draft: boolean;
  image?: string;
}

export interface Post extends PostMeta {
  content: string; // rendered HTML
}

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPostMeta(): PostMeta[] {
  return getPostFiles()
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        draft: data.draft === true,
        image: data.image ?? undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPublishedPostMeta(): PostMeta[] {
  return getAllPostMeta().filter((p) => !p.draft);
}

export function getAllSlugs(): string[] {
  // Include draft slugs so draft pages are still statically generated (for preview)
  return getPostFiles().map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): Post | null {
  const filepath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const html = marked(content) as string;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    draft: data.draft === true,
    image: data.image ?? undefined,
    content: html,
  };
}
