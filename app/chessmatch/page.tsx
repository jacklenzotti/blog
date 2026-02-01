import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChessMatch - Coming Soon",
  description:
    "ChessMatch — a colorful chess puzzle game. Coming soon to iOS and Google Play.",
};

const screenshots = [
  { src: "chessmatch/screenshot5.png", alt: "Gameplay - Building Up" },
  { src: "chessmatch/screenshot4.png", alt: "Victory screen" },
  { src: "chessmatch/screenshot1.png", alt: "Level - Castle Corners" },
  { src: "chessmatch/screenshot2.png", alt: "Level - Wall Breaker" },
  { src: "chessmatch/screenshot3.png", alt: "Level - Frozen Walls" },
];

export default function ChessMatch() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Back link */}
      <a
        href="./"
        className="self-start mb-8 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        &larr; Back
      </a>

      {/* Header */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">ChessMatch</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-1">
          A colorful chess puzzle game
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
          Coming soon to iOS &amp; Google Play
        </p>
      </div>

      {/* Video Preview */}
      <div className="w-full max-w-sm mb-12 aspect-[9/16]">
        <iframe
          src="https://www.youtube.com/embed/zbnkP8qj9l4"
          title="ChessMatch Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl shadow-lg"
        />
      </div>

      {/* Screenshots */}
      <div className="w-full max-w-5xl">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {screenshots.map((s, i) => (
            <div key={i} className="flex-shrink-0 snap-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="h-[500px] w-auto rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Store badges placeholder */}
      <div className="mt-12 flex gap-4 items-center">
        <span className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-500 dark:text-zinc-400">
          App Store — Coming Soon
        </span>
        <span className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-500 dark:text-zinc-400">
          Google Play — Coming Soon
        </span>
      </div>
    </div>
  );
}
