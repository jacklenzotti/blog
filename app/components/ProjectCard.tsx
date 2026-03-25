import Link from "next/link";

export type Tag = string | { label: string; href: string; icon?: React.ReactNode };

export interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tags?: Tag[];
  previews?: string[];
  external?: boolean;
}

export default function ProjectCard({
  title,
  description,
  href,
  image,
  tags,
  previews,
  external,
}: ProjectCardProps) {
  const hasClickableTags = tags?.some((t) => typeof t !== "string");
  const isClickable = !!href;

  const tagElements = tags && tags.length > 0 && (
    <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 dark:text-zinc-500">
      {tags.map((tag) => {
        if (typeof tag === "string") {
          return <span key={tag}>{tag}</span>;
        }
        return (
          <a
            key={tag.label}
            href={tag.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label={tag.label}
          >
            {tag.icon ?? tag.label}
          </a>
        );
      })}
    </div>
  );

  const previewElements = previews && previews.length > 0 && (
    <div className="flex items-center gap-2 mt-3">
      {previews.map((src) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={src}
          src={src}
          alt=""
          className="w-10 h-10 rounded object-contain"
        />
      ))}
    </div>
  );

  const baseClasses =
    "block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors";
  const hoverClasses = "hover:border-zinc-400 dark:hover:border-zinc-600";

  // When there are clickable tags, use a div wrapper to avoid nested <a> tags.
  // The card href is rendered as a link on the title instead.
  if (hasClickableTags) {
    return (
      <div className={`${baseClasses} ${isClickable ? hoverClasses : "opacity-70"}`}>
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
              {isClickable ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="hover:underline"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        {previewElements}
        {tagElements}
      </div>
    );
  }

  const content = (
    <>
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
      {previewElements}
      {tagElements}
    </>
  );

  if (!isClickable) {
    return (
      <div className={`${baseClasses} opacity-70`}>{content}</div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${hoverClasses}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${hoverClasses}`}
    >
      {content}
    </Link>
  );
}
