import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RhythmMatch - Coming Soon",
  description:
    "RhythmMatch — a neon rhythm puzzle game. Coming soon to iOS and Google Play.",
};

const screenshots = [
  { src: "rhythmmatch/screenshot1.png", alt: "Main menu" },
  { src: "rhythmmatch/screenshot2.png", alt: "Level select - Track 1" },
  { src: "rhythmmatch/screenshot3.png", alt: "Gameplay - Encore stage" },
  { src: "rhythmmatch/screenshot4.png", alt: "Gameplay - Encore stage" },
  { src: "rhythmmatch/screenshot5.png", alt: "Gameplay - Opener stage" },
  { src: "rhythmmatch/screenshot6.png", alt: "Gameplay - Main Set stage" },
  { src: "rhythmmatch/screenshot7.png", alt: "Gameplay - Headline stage" },
];

export default function RhythmMatch() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">RhythmMatch</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-1">
          A neon rhythm puzzle game
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
          Coming soon to iOS &amp; Google Play
        </p>
      </div>

      {/* Video Preview */}
      <div className="w-full max-w-sm mb-12 aspect-[9/16]">
        <iframe
          src="https://www.youtube.com/embed/10N_W074HwI"
          title="RhythmMatch Preview"
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
