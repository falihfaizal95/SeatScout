"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SPORTS, SPORT_EMOJIS, type Sport } from "@/types/event";

const PLACEHOLDERS = [
  "Super Bowl tickets...",
  "Lakers vs Celtics...",
  "Yankees vs Red Sox...",
  "Stanley Cup Finals...",
  "World Cup...",
  "UFC 300...",
  "Wimbledon finals...",
];

const QUICK_SEARCHES = [
  "NFL playoffs",
  "NBA Finals",
  "World Series",
  "Stanley Cup",
  "MLS Cup",
  "College Football",
];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams({ q });
    if (selectedSport) params.set("sport", selectedSport);
    router.push(`/search?${params}`);
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    const params = new URLSearchParams({ q: term });
    router.push(`/search?${params}`);
  };

  const SPORT_SUBSET: Sport[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "UFC"];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search box */}
      <form onSubmit={handleSearch} className="relative group">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border transition-all duration-300 px-4 py-3.5",
            isFocused
              ? "border-brand-400 shadow-brand bg-[var(--bg-primary)]"
              : "border-[var(--border-strong)] bg-[var(--bg-primary)] hover:border-brand-300 shadow-soft dark:shadow-soft-dark"
          )}
        >
          <Search
            size={20}
            className={cn(
              "flex-shrink-0 transition-colors",
              isFocused ? "text-brand-500" : "text-[var(--text-muted)]"
            )}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base outline-none min-w-0"
          />
          <Button
            type="submit"
            size="md"
            disabled={!query.trim()}
            className="flex-shrink-0 gap-1.5"
          >
            Find seats
            <ArrowRight size={16} />
          </Button>
        </div>
      </form>

      {/* Sport filters */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {SPORT_SUBSET.map((sport) => (
          <button
            key={sport}
            onClick={() =>
              setSelectedSport(selectedSport === sport ? null : sport)
            }
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
              selectedSport === sport
                ? "bg-brand-600 text-white border-brand-600 shadow-brand"
                : "bg-[var(--bg-primary)] border-[var(--border)] text-[var(--text-secondary)] hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400"
            )}
          >
            <span>{SPORT_EMOJIS[sport]}</span>
            {sport}
          </button>
        ))}
      </div>

      {/* Quick search suggestions */}
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        <span className="text-xs text-[var(--text-muted)] self-center">Try:</span>
        {QUICK_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-brand-600 hover:border-brand-300 transition-all"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
