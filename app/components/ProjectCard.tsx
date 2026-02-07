import Link from "next/link";

export interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
  external?: boolean;
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  external,
}: ProjectCardProps) {
  const Wrapper = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      href={href}
      {...externalProps}
      className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex items-center gap-3">
        {image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-lg object-cover"
          />
        )}
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
