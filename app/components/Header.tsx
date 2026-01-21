"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the about section element
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      // Get the top position of the about section
      const aboutTop = aboutSection.getBoundingClientRect().top;

      // Hide header when about section reaches near the top of viewport
      // Show when we're above the about section
      setIsVisible(aboutTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <nav className="flex justify-center gap-16 p-6">
        <a
          href="#about"
          className="text-lg font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-all hover:scale-110"
        >
          About
        </a>
        <a
          href="#projects"
          className="text-lg font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-all hover:scale-110"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-lg font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-all hover:scale-110"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
