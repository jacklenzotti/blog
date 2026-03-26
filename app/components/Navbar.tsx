"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
  { label: "zottware", href: "https://zottware.com", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          Jack Lenzotti
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} link={link} pathname={pathname} />
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.label} link={link} pathname={pathname} onClick={() => setMobileOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  link,
  pathname,
  onClick,
}: {
  link: { label: string; href: string; external?: boolean };
  pathname: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        {link.label}
      </a>
    );
  }

  const isActive =
    link.href === "/"
      ? pathname === "/"
      : pathname.startsWith(link.href.split("#")[0]) &&
        link.href !== "/#contact";

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      }`}
    >
      {link.label}
    </Link>
  );
}
