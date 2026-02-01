"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setDismissed(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-8 pointer-events-none">
      <svg
        className="w-8 h-8 text-zinc-300 dark:text-zinc-600 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </footer>
  );
}
