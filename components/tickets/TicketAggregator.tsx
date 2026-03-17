"use client";
import { useState, useEffect } from "react";
import TicketRow from "./TicketRow";
import PriceSummaryBar from "./PriceSummaryBar";
import PlatformBadge from "./PlatformBadge";
import Skeleton from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";
import { RefreshCw, AlertCircle, Filter, ArrowUpDown } from "lucide-react";
import type { AggregatedTickets, Platform, TicketListing } from "@/types/ticket";

interface TicketAggregatorProps {
  eventId: string;
}

type SortKey = "price" | "platform" | "section";

export default function TicketAggregator({ eventId }: TicketAggregatorProps) {
  const [data, setData] = useState<AggregatedTickets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [filterPlatform, setFilterPlatform] = useState<Platform | "all">("all");
  const [minQty, setMinQty] = useState(1);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(eventId)}`);
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const json = await res.json();
      setData(json.data);
    } catch (e) {
      setError("Could not load ticket listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [eventId]);

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-28 w-full rounded-2xl" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
        <p className="font-semibold text-[var(--text-primary)] mb-1">Failed to load tickets</p>
        <p className="text-sm text-[var(--text-muted)] mb-4">{error}</p>
        <button
          onClick={fetchTickets}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-all"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    );
  }

  if (!data || data.listings.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        <span className="text-5xl mb-3 block">🎟️</span>
        <p className="font-semibold text-[var(--text-primary)] mb-1">No tickets found</p>
        <p className="text-sm text-[var(--text-muted)]">
          We couldn&apos;t find any listings for this event right now. Check back closer to the event date.
        </p>
      </div>
    );
  }

  // Filter and sort
  let filtered = data.listings.filter(
    (l) => filterPlatform === "all" || l.platform === filterPlatform
  ).filter((l) => l.quantity >= minQty);

  if (sortBy === "price") {
    filtered = [...filtered].sort((a, b) => a.pricePerTicket - b.pricePerTicket);
  } else if (sortBy === "platform") {
    filtered = [...filtered].sort((a, b) => a.platform.localeCompare(b.platform));
  } else if (sortBy === "section") {
    filtered = [...filtered].sort((a, b) => a.section.localeCompare(b.section));
  }

  const lowestListing = filtered[0];

  return (
    <div className="space-y-4">
      {/* Price summary */}
      <PriceSummaryBar data={data} />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Platform filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterPlatform("all")}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              filterPlatform === "all"
                ? "bg-brand-600 text-white border-brand-600"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-brand-300"
            }`}
          >
            All platforms
          </button>
          {data.platformsAvailable.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlatform(filterPlatform === p ? "all" : p)}
              className={`transition-all ${filterPlatform === p ? "ring-2 ring-brand-400 rounded-lg" : ""}`}
            >
              <PlatformBadge platform={p} size="sm" />
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto">
          <ArrowUpDown size={14} className="text-[var(--text-muted)]" />
          <span className="text-xs text-[var(--text-muted)]">Sort:</span>
          {(["price", "section", "platform"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`text-xs px-2.5 py-1 rounded-lg border capitalize transition-all ${
                sortBy === key
                  ? "bg-[var(--bg-tertiary)] border-brand-300 text-brand-600 dark:text-brand-400 font-medium"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket listings */}
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

      {data.fromCache && (
        <p className="text-xs text-[var(--text-muted)] text-center">
          Prices cached · Last updated a few minutes ago ·{" "}
          <button onClick={fetchTickets} className="text-brand-500 hover:underline">
            Refresh
          </button>
        </p>
      )}
    </div>
  );
}
