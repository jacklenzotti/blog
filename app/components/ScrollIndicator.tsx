"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Hide when near bottom (within 100px)
      const nearBottom = scrollTop + windowHeight >= docHeight - 100;
      setIsVisible(!nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on home page
  if (pathname !== "/") {
    return null;
  }

  if (!isVisible) {
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
