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
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[28px] border border-white/15 bg-white/[0.08] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 size-6 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for teams, games, or events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 w-full rounded-2xl border border-white/10 bg-white px-14 pr-5 text-lg text-slate-900 outline-none transition-shadow placeholder:text-slate-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.16)]"
              />
            </div>
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="h-16 rounded-2xl bg-[var(--green)] px-10 text-lg font-semibold text-white transition-colors hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:opacity-40 md:min-w-[240px]"
            >
              Search Deals
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <span className="text-base text-[var(--text-2)]">Popular:</span>
        {["Lakers", "Yankees", "Cowboys", "Warriors"].map((team) => (
          <button
            key={team}
            onClick={() => go(team)}
            className="rounded-2xl border border-white/[0.1] bg-white/[0.05] px-5 py-3 text-base font-medium text-[var(--text-2)] transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  );
}
