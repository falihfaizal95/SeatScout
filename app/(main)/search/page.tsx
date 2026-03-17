"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import EventCardSkeleton from "@/components/events/EventCardSkeleton";
import { SPORT_EMOJIS, type Sport } from "@/types/event";
import type { NormalizedEvent } from "@/types/event";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialSport = (searchParams.get("sport") as Sport) || "";

  const [query, setQuery] = useState(initialQuery);
  const [sport, setSport] = useState<Sport | "">(initialSport);
  const [events, setEvents] = useState<NormalizedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = useCallback(async (q: string, s: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const params = new URLSearchParams({ q });
      if (s) params.set("sport", s);
      const res = await fetch(`/api/events/search?${params}`);
      const json = await res.json();
      setEvents(json.data || []);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery, initialSport);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ q: query });
    if (sport) params.set("sport", sport);
    router.replace(`/search?${params}`, { scroll: false });
    doSearch(query, sport);
  };

  const clearSport = () => {
    setSport("");
    if (query) doSearch(query, "");
  };

  const SPORT_SUBSET: Sport[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "UFC", "Boxing", "Tennis"];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Search bar */}
        <div className="sticky top-16 z-40 py-4 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)] mb-8 -mx-4 px-4">
          <form onSubmit={handleSearch} className="flex gap-3 max-w-3xl">
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] focus-within:border-brand-400 focus-within:shadow-brand transition-all">
              <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams, games, events..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all"
            >
              Search
            </button>
          </form>

          {/* Sport filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            {SPORT_SUBSET.map((s) => (
              <button
                key={s}
                onClick={() => {
                  const next = sport === s ? "" : s;
                  setSport(next);
                  if (query) doSearch(query, next);
                }}
                className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                  sport === s
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-brand-300 bg-[var(--bg-secondary)]"
                }`}
              >
                {SPORT_EMOJIS[s]} {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div>
            <div className="h-6 w-48 shimmer rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        )}

        {!loading && hasSearched && events.length === 0 && !error && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No events found</h3>
            <p className="text-[var(--text-muted)]">
              Try a different search term, or check back closer to the season.
            </p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">{events.length}</span> events found
                {query && <span> for &ldquo;<span className="text-brand-600">{query}</span>&rdquo;</span>}
                {sport && <span> · <button onClick={clearSport} className="text-brand-600 hover:underline">{sport} ×</button></span>}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🏟️</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Search for any game
            </h3>
            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              Type a team name, sport, or event above to find tickets and compare prices across every platform.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 shimmer rounded-xl mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
                <div className="h-36 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
