import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const BASE_PATH = process.env.NODE_ENV === "production" ? "/blog" : "";

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
      const rawImage: string | undefined = data.image ?? undefined;
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        draft: data.draft === true,
        image: rawImage && BASE_PATH ? `${BASE_PATH}${rawImage}` : rawImage,
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
  let html = marked(content) as string;
  // Prefix absolute image paths with basePath for production
  if (BASE_PATH) {
    html = html.replace(/src="\/(?!\/)/g, `src="${BASE_PATH}/`);
  }
  const rawImage: string | undefined = data.image ?? undefined;
  const image = rawImage && BASE_PATH ? `${BASE_PATH}${rawImage}` : rawImage;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    draft: data.draft === true,
    image,
    content: html,
  };
}
