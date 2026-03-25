import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Jack Lenzotti's games — ChessMatch, RhythmMatch, and more.",
};

export default function Support() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10">
          Need help with one of our games? We&apos;re here.
        </p>

        <div className="space-y-8">
          {/* Contact */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Get in Touch
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              For bug reports, feature requests, or general questions — email us
              and we&apos;ll get back to you as soon as we can.
            </p>
            <a
              href="mailto:jacklenzotti@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              jacklenzotti@gmail.com
            </a>
          </div>

          {/* FAQ */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Common Questions
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Where can I find info about your games?
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Visit{" "}
                  <a
                    href="https://zottware.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
                  >
                    zottware.com
                  </a>{" "}
                  for all game info, trailers, and download links.
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  I found a bug — how do I report it?
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Send us an email at jacklenzotti@gmail.com with a description
                  of the issue, what device you&apos;re on, and a screenshot if
                  you have one.
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Do your games have in-app purchases?
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Some games may include optional purchases. All transactions go
                  through the App Store or Google Play — we never handle payment
                  info directly.
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  How do I request a refund?
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Refunds are handled by Apple or Google. You can request one
                  through the App Store or Google Play.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy link */}
          <div className="text-center pt-4">
            <a
              href="/privacy"
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
