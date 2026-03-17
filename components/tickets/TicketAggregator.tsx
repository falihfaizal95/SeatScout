"use client";
import { useState, useEffect } from "react";
import TicketRow from "./TicketRow";
import PriceSummaryBar from "./PriceSummaryBar";
import PlatformBadge from "./PlatformBadge";
import { RefreshCw, AlertCircle, ArrowUpDown } from "lucide-react";
import type { AggregatedTickets, Platform, TicketListing } from "@/types/ticket";

type SortKey = "price" | "platform" | "section";

export default function TicketAggregator({ eventId }: { eventId: string }) {
  const [data, setData] = useState<AggregatedTickets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [filterPlatform, setFilterPlatform] = useState<Platform | "all">("all");

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(eventId)}`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json.data);
    } catch {
      setError("Could not load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [eventId]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-36 shimmer rounded-2xl" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-14 shimmer rounded-xl" style={{ opacity: 1 - i * 0.1 }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 rounded-2xl border border-white/[0.07] bg-[var(--bg-1)]">
        <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
        <p className="font-semibold text-white mb-1">Failed to load listings</p>
        <p className="text-sm text-[var(--text-2)] mb-5">{error}</p>
        <button
          onClick={fetchTickets}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand)] text-white text-sm font-semibold transition-all hover:bg-[var(--brand-light)]"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    );
  }

  if (!data || data.listings.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl border border-white/[0.07] bg-[var(--bg-1)]">
        <span className="text-5xl mb-4 block">🎟️</span>
        <p className="font-semibold text-white mb-1">No tickets found</p>
        <p className="text-sm text-[var(--text-2)]">
          No listings available right now. Check back closer to the event.
        </p>
      </div>
    );
  }

  let filtered = data.listings.filter(
    (l) => filterPlatform === "all" || l.platform === filterPlatform
  );
  if (sortBy === "price") filtered = [...filtered].sort((a, b) => a.pricePerTicket - b.pricePerTicket);
  else if (sortBy === "platform") filtered = [...filtered].sort((a, b) => a.platform.localeCompare(b.platform));
  else if (sortBy === "section") filtered = [...filtered].sort((a, b) => a.section.localeCompare(b.section));

  return (
    <div className="space-y-4">
      <PriceSummaryBar data={data} />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Platform filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterPlatform("all")}
            className={`text-[12px] px-3 py-1.5 rounded-lg font-medium transition-all border ${
              filterPlatform === "all"
                ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                : "border-white/[0.08] text-[var(--text-2)] hover:border-white/[0.15] hover:text-white"
            }`}
          >
            All platforms
          </button>
          {data.platformsAvailable.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlatform(filterPlatform === p ? "all" : p)}
              className={`transition-all rounded-lg ${filterPlatform === p ? "ring-2 ring-[var(--brand)]/50" : ""}`}
            >
              <PlatformBadge platform={p} size="sm" />
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown size={13} className="text-[var(--text-3)]" />
          {(["price", "section", "platform"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`text-[11px] px-2.5 py-1.5 rounded-lg border capitalize transition-all ${
                sortBy === key
                  ? "bg-white/[0.08] border-white/[0.12] text-white font-semibold"
                  : "border-white/[0.05] text-[var(--text-3)] hover:text-white"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-2">
        {filtered.map((listing, i) => (
          <TicketRow
            key={listing.id}
            listing={listing}
            isLowest={i === 0 && sortBy === "price"}
            index={i}
          />
        ))}
      </div>

      <p className="text-[11px] text-[var(--text-3)] text-center pt-2">
        Prices updated live ·{" "}
        <button onClick={fetchTickets} className="text-[var(--brand-light)] hover:underline">
          Refresh
        </button>
      </p>
    </div>
  );
}
