import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer based in Chicago. Developer Experience engineer and hobbyist game maker.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl font-semibold mb-2">About</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Software engineer based in Chicago
          </p>
        </div>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <p>
                I'm a software engineer focused on Developer Experience,
                building tools and platforms that make developers' lives easier.
                I care deeply about crafting elegant APIs, smooth workflows, and
                delightful developer tooling.
              </p>
              <p>
                When I'm not improving developer experiences, I'm usually
                tinkering with game development projects. I'm particularly drawn
                to puzzle games and interactive experiences that blend logic
                with creativity. My current focus is ChessMatch, a colorful
                chess puzzle game that reimagines classic chess problems.
              </p>
              <p>
                I believe in building things that are simple, functional, and
                well-crafted. Whether it's a developer tool or a game mechanic,
                the best solutions are often the most straightforward ones.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Technologies */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-3 uppercase tracking-wider">
                Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Swift",
                  "Python",
                  "Go",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-3 uppercase tracking-wider">
                Game Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Godot", "GDScript", "SwiftUI", "SpriteKit"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mb-3 uppercase tracking-wider">
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "Vercel", "Tailwind CSS", "CI/CD"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Developer Experience Engineer
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
                Focus Area
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Building internal tools, improving CI/CD pipelines, and creating
                developer-friendly APIs. Working to reduce friction in the
                development process and make complex systems accessible.
              </p>
            </div>
            <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Full-Stack Development
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
                Background
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Experience building web applications with modern frameworks,
                RESTful APIs, and scalable backend systems. Comfortable across
                the stack from database design to frontend interactions.
              </p>
            </div>
            <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Mobile & Game Development
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
                Side Projects
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Creating mobile games and interactive experiences using Godot
                and Swift. Exploring game design, UI/UX, and cross-platform
                development.
              </p>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Game Development
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Fascinated by game mechanics and puzzle design. Currently
                working on ChessMatch, a chess puzzle game that combines
                strategy with visual polish.
              </p>
            </div>
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Chess Puzzles
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Love solving and creating chess puzzles. The intersection of
                tactical patterns and creative problem-solving is endlessly
                engaging.
              </p>
            </div>
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Developer Tools
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Always exploring new tools and workflows. Interested in how
                great developer experiences can unlock creativity and
                productivity.
              </p>
            </div>
            <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Open Source
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Contributing to and learning from open source projects. The
                collaborative nature of OSS drives better software and shared
                knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-xl font-semibold">Get in Touch</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
              I'm always interested in hearing about new projects, collaboration
              opportunities, or just chatting about tech and games.
            </p>
            <a
              href="mailto:jacklenzotti@gmail.com"
              className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="group-hover:underline">
                jacklenzotti@gmail.com
              </span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
