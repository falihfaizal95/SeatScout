"use client";
import { ExternalLink, Users, CheckCircle } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { TicketListing } from "@/types/ticket";

interface TicketRowProps {
  listing: TicketListing;
  isLowest?: boolean;
  index: number;
}

export default function TicketRow({ listing, isLowest, index }: TicketRowProps) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 hover:border-brand-200 dark:hover:border-brand-800 hover:bg-brand-50/30 dark:hover:bg-brand-950/10 ${
        isLowest
          ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
          : "border-[var(--border)] bg-[var(--bg-primary)]"
      }`}
    >
      {/* Rank */}
      <span className="w-6 text-center text-xs font-bold text-[var(--text-muted)] flex-shrink-0">
        {isLowest ? "🏆" : `#${index + 1}`}
      </span>

      {/* Platform */}
      <div className="w-32 flex-shrink-0">
        <PlatformBadge platform={listing.platform} size="sm" />
        {listing.isMock && (
          <span className="text-xs text-[var(--text-muted)] ml-1">(est.)</span>
        )}
      </div>

      {/* Section/Row */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {listing.section}
          {listing.row && <span className="text-[var(--text-muted)]"> · Row {listing.row}</span>}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] w-20 flex-shrink-0">
        <Users size={12} />
        <span>{listing.quantity} avail</span>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0 w-24">
        <p
          className={`font-bold text-base ${
            isLowest ? "text-green-600 dark:text-green-400" : "text-[var(--text-primary)]"
          }`}
        >
          {formatPrice(listing.pricePerTicket)}
        </p>
        <p className="text-xs text-[var(--text-muted)]">per ticket</p>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0">
        <a
          href={listing.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-all hover:shadow-brand"
        >
          Buy
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
