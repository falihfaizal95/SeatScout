"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { type Sport } from "@/types/event";

const POPULAR = ["Lakers", "Yankees", "Cowboys", "Warriors"];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
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
    <div className="w-full max-w-3xl mx-auto">
      {/* Glass wrapper — matches zip exactly */}
      <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Input with absolute search icon */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--text-3)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for teams, games, or events..."
                className="w-full pl-12 pr-4 h-14 bg-transparent border-0 text-white placeholder:text-[var(--text-3)] text-lg outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim()}
              className="h-14 px-8 bg-[var(--green)] hover:bg-[#16a34a] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-lg font-semibold transition-all flex-shrink-0"
            >
              Search Deals
            </button>
          </div>
        </form>
      </div>

      {/* Popular — rounded-lg pills matching zip */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-[var(--text-2)] text-sm">Popular:</span>
        {POPULAR.map((team) => (
          <button
            key={team}
            onClick={() => go(team)}
            className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg text-[var(--text-2)] hover:text-white text-sm transition-all"
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  );
}
