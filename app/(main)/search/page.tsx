"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import { SPORT_EMOJIS, type Sport } from "@/types/event";
import type { NormalizedEvent } from "@/types/event";

const SPORT_TABS: Sport[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "UFC", "Boxing", "Tennis"];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initQ = searchParams.get("q") || "";
  const initS = (searchParams.get("sport") as Sport) || "";

  const [query, setQuery] = useState(initQ);
  const [sport, setSport] = useState<Sport | "">(initS);
  const [events, setEvents] = useState<NormalizedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string, s: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const p = new URLSearchParams({ q });
      if (s) p.set("sport", s);
      const res = await fetch(`/api/events/search?${p}`);
      const json = await res.json();
      setEvents(Array.isArray(json.data) ? json.data : []);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initQ) doSearch(initQ, initS);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ q: query });
    if (sport) p.set("sport", sport);
    router.replace(`/search?${p}`, { scroll: false });
    doSearch(query, sport);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Sticky search header */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--bg)]/90 backdrop-blur-xl px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3 mb-4 max-w-2xl">
            <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-[var(--bg-1)] focus-within:border-[var(--brand)]/60 transition-all">
              <Search size={15} className="text-[var(--text-3)] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams, games, events..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[var(--text-3)] outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="text-[var(--text-3)] hover:text-white">
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white text-sm font-semibold transition-all glow-brand"
            >
              Search
            </button>
          </form>

          {/* Sport tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => { setSport(""); if (query) doSearch(query, ""); }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                sport === ""
                  ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                  : "border-white/[0.08] text-[var(--text-2)] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              All
            </button>
            {SPORT_TABS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  const next = sport === s ? "" : s;
                  setSport(next);
                  if (query) doSearch(query, next);
                }}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  sport === s
                    ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                    : "border-white/[0.08] text-[var(--text-2)] hover:text-white hover:border-white/[0.15]"
                }`}
              >
                <span>{SPORT_EMOJIS[s]}</span> {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {loading && (
          <div>
            <div className="h-5 w-40 shimmer rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <EventCardSkeleton key={i} />)}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {!loading && searched && !error && events.length === 0 && (
          <div className="text-center py-24">
            <span className="text-6xl mb-5 block">🔍</span>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-[var(--text-2)]">Try a different search term or check back later.</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            <p className="text-sm text-[var(--text-2)] mb-6">
              <span className="font-semibold text-white">{events.length}</span> events
              {query && <span> for <span className="text-[var(--brand-light)]">&ldquo;{query}&rdquo;</span></span>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div className="text-center py-28">
            <span className="text-7xl mb-6 block">🏟️</span>
            <h3 className="text-2xl font-bold text-white mb-3">Search for any game</h3>
            <p className="text-[var(--text-2)] max-w-md mx-auto">
              Type a team name, sport, or event to compare prices across every platform.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="h-14 shimmer rounded-xl mb-4 max-w-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {Array.from({ length: 8 }).map((_, i) => <EventCardSkeleton key={i} />)}
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
