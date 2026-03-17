"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Sport } from "@/types/event";

const POPULAR = ["Lakers", "Yankees", "Cowboys", "Warriors"];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (q: string, s?: Sport | null) => {
    const p = new URLSearchParams({ q });
    if (s) p.set("sport", s);
    router.push(`/search?${p}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) go(query.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-2xl border transition-all duration-300 px-4 py-3",
            focused
              ? "border-[var(--brand)] shadow-[0_0_0_4px_rgba(109,106,232,0.15)] bg-[var(--bg-1)]"
              : "border-white/[0.1] bg-[var(--bg-1)] hover:border-white/[0.18]"
          )}
        >
          <Search
            size={19}
            className={cn(
              "flex-shrink-0 transition-colors duration-200",
              focused ? "text-[var(--brand-light)]" : "text-[var(--text-3)]"
            )}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search for teams, games, or events..."
            className="flex-1 bg-transparent text-white placeholder:text-[var(--text-3)] text-[15px] outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-[var(--brand)] hover:bg-[var(--brand-light)] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all glow-brand"
          >
            Search Deals
          </button>
        </div>
      </form>

      {/* Popular chips */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
        <span className="text-[12px] text-[var(--text-2)] font-medium">Popular:</span>
        {POPULAR.map((term) => (
          <button
            key={term}
            onClick={() => go(term)}
            className="text-[13px] px-3.5 py-1.5 rounded-full border border-white/[0.1] text-[var(--text-2)] hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04] bg-white/[0.02] transition-all font-medium"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
