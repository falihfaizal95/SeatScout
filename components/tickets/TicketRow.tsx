"use client";
import { ExternalLink, Users } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
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
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-px ${
        isLowest
          ? "border-[var(--green)]/25 bg-[var(--green)]/[0.04] hover:bg-[var(--green)]/[0.07]"
          : "border-white/[0.06] bg-[var(--bg-1)] hover:border-white/[0.12] hover:bg-[var(--bg-2)]"
      }`}
    >
      {/* Rank */}
      <span className="w-7 text-center text-xs font-bold flex-shrink-0 text-[var(--text-3)]">
        {isLowest ? (
          <span className="text-[var(--green)] text-sm">✦</span>
        ) : (
          `#${index + 1}`
        )}
      </span>

      {/* Platform */}
      <div className="w-28 flex-shrink-0">
        <PlatformBadge platform={listing.platform} size="sm" />
      </div>

      {/* Section */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-1)] truncate">
          {listing.section}
          {listing.row && (
            <span className="text-[var(--text-3)]"> · Row {listing.row}</span>
          )}
        </p>
        {listing.isMock && (
          <p className="text-[10px] text-[var(--text-3)] mt-0.5">Estimated price</p>
        )}
      </div>

      {/* Qty */}
      <div className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--text-3)] w-20 flex-shrink-0">
        <Users size={11} />
        <span>{listing.quantity} avail</span>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0 w-20">
        <p className={`font-bold text-[15px] ${isLowest ? "text-[var(--green)]" : "text-white"}`}>
          {formatPrice(listing.pricePerTicket)}
        </p>
        <p className="text-[10px] text-[var(--text-3)]">per ticket</p>
      </div>

      {/* CTA */}
      <a
        href={listing.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all ${
          isLowest
            ? "bg-[var(--green)] hover:bg-green-400 text-black glow-green"
            : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08]"
        }`}
      >
        Buy
        <ExternalLink size={11} />
      </a>
    </div>
  );
}
