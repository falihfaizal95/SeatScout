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
    <div className="mx-auto flex max-w-[680px] flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex w-full items-center rounded-[18px] border border-[var(--card-border)] bg-[var(--card)] p-[16px] focus-within:border-[rgba(124,106,247,0.4)] transition-colors">
          <Search className="ml-4 size-6 shrink-0 text-[var(--text-3)]" />
          <input
            type="text"
            placeholder="Search for teams, games, or events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-[20px] text-[17px] text-[var(--text-1)] outline-none placeholder:text-[var(--text-3)]"
          />
          <button
            type="submit"
            className="font-syne shrink-0 rounded-[12px] bg-[var(--brand)] px-[32px] py-[20px] text-[17px] font-[700] text-white transition-all hover:bg-[var(--brand-light)] hover:shadow-[0_8px_24px_rgba(124,106,247,0.35)]"
          >
            Search Deals →
          </button>
        </div>
      </form>

      <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-[10px]">
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
