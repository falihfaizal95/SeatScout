"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPORT_EMOJIS, type Sport } from "@/types/event";

const PLACEHOLDERS = [
  "Lakers vs Celtics...",
  "Super Bowl tickets...",
  "Yankees vs Red Sox...",
  "Stanley Cup Finals...",
  "UFC 300...",
  "World Cup...",
];

const QUICK: string[] = ["NBA Finals", "NFL playoffs", "World Series", "Stanley Cup", "UFC"];
const SPORTS: Sport[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "UFC"];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<Sport | null>(null);
  const [pidx, setPidx] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPidx((i) => (i + 1) % PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const go = (q: string, s?: Sport | null) => {
    const p = new URLSearchParams({ q });
    if (s) p.set("sport", s);
    router.push(`/search?${p}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) go(query.trim(), sport);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main search bar */}
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
            placeholder={PLACEHOLDERS[pidx]}
            className="flex-1 bg-transparent text-white placeholder:text-[var(--text-3)] text-[15px] outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--brand)] hover:bg-[var(--brand-light)] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all glow-brand"
          >
            Search
            <ArrowRight size={15} />
          </button>
        </div>
      </form>

      {/* Sport pills */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {SPORTS.map((s) => (
          <button
            key={s}
            onClick={() => {
              const next = sport === s ? null : s;
              setSport(next);
            }}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200",
              sport === s
                ? "bg-[var(--brand)] border-[var(--brand)] text-white glow-brand"
                : "border-white/[0.08] text-[var(--text-2)] hover:border-white/[0.18] hover:text-white bg-white/[0.03]"
            )}
          >
            <span className="text-[11px]">{SPORT_EMOJIS[s]}</span>
            {s}
          </button>
        ))}
      </div>

      {/* Quick searches */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
        <span className="text-[11px] text-[var(--text-3)] font-medium uppercase tracking-wider">Trending:</span>
        {QUICK.map((term) => (
          <button
            key={term}
            onClick={() => go(term)}
            className="text-[12px] px-3 py-1 rounded-full border border-white/[0.06] text-[var(--text-3)] hover:text-white hover:border-white/[0.15] bg-white/[0.02] transition-all"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
