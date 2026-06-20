"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, BookOpen, Settings, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-4 md:px-8 flex justify-center">
      {/* Top Banner Alert from the GuruG screenshots */}
      <div className="absolute top-0 left-0 right-0 bg-brand-orange h-1.5 w-full"></div>

      <div className="w-full max-w-6xl flex items-center justify-between bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-100 shadow-md">
        {/* Logo */}
        <Link href="/classroom" className="flex items-center gap-2">
          <div className="text-2xl font-black font-display tracking-tight text-brand-orange">
            Shikshak-Saarthi<span className="text-gray-800 font-semibold text-sm ml-1 px-1.5 py-0.5 bg-gray-100 rounded-md">Classroom OS</span>
          </div>
        </Link>

        {/* Central Capsule Tabs */}
        <nav className="hidden md:flex items-center bg-gray-50 p-1.5 rounded-full border border-gray-100">
          <Link
            href="/classroom"
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/classroom"
                ? "bg-brand-orange text-white shadow-sm"
                : "text-gray-600 hover:text-brand-orange hover:bg-white"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Classroom Mode</span>
          </Link>

          <Link
            href="/study"
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/study"
                ? "bg-brand-orange text-white shadow-sm"
                : "text-gray-600 hover:text-brand-orange hover:bg-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Mode</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-full text-gray-500 hover:text-brand-orange hover:bg-gray-50 border border-gray-100 transition-all"
            title="Configure API Keys"
          >
            <Settings className="w-5 h-5" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 border border-gray-100 transition-all hidden sm:flex"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>

          <Link
            href="/classroom"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Learning</span>
          </Link>
        </div>
      </div>

      {/* Mobile navigation floating pill (visible on mobile only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white/95 backdrop-blur shadow-lg border border-gray-100 p-1.5 rounded-full">
        <Link
          href="/classroom"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            pathname === "/classroom"
              ? "bg-brand-orange text-white"
              : "text-gray-600"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Classroom</span>
        </Link>
        <Link
          href="/study"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            pathname === "/study"
              ? "bg-brand-orange text-white"
              : "text-gray-600"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Study</span>
        </Link>
      </div>
    </header>
  );
}
