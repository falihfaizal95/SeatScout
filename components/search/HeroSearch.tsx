"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const go = (q: string) => router.push(`/search?q=${encodeURIComponent(q)}`);

  return (
    <div className="mx-auto flex max-w-[680px] flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[var(--text-2)]" />
            <input
              type="text"
              placeholder="Search for teams, games, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[58px] w-full rounded-[10px] border border-[var(--card-border)] bg-[var(--card)] pl-[48px] pr-4 text-[16px] text-[var(--text-1)] outline-none transition-colors placeholder:text-[var(--text-2)] focus:border-[rgba(124,106,247,0.4)]"
            />
          </div>
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="font-syne h-[58px] rounded-[10px] bg-[var(--brand)] px-[28px] text-[15px] font-[700] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-light)] hover:shadow-[0_8px_24px_rgba(124,106,247,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Search Deals →
          </button>
        </div>
      </form>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-[10px]">
        <span className="mr-1 text-[13px] text-[var(--text-3)]">Popular:</span>
        {["Lakers", "Yankees", "Cowboys", "Warriors"].map((team) => (
          <button
            key={team}
            onClick={() => go(team)}
            className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-[14px] py-[6px] text-[13px] text-[var(--text-2)] transition-all hover:border-[rgba(124,106,247,0.3)] hover:bg-[var(--brand-dim)] hover:text-[var(--brand-light)]"
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  );
}
