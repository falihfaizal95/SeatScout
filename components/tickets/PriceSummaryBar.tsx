"use client";
import { formatPrice } from "@/lib/utils";
import type { AggregatedTickets } from "@/types/ticket";

interface PriceSummaryBarProps {
  data: AggregatedTickets;
}

export default function PriceSummaryBar({ data }: PriceSummaryBarProps) {
  const { lowestPrice, averagePrice, listings } = data;

  if (!lowestPrice || listings.length === 0) return null;

  const highestPrice = Math.max(...listings.map((l) => l.pricePerTicket));
  const range = highestPrice - lowestPrice;

  const avgPosition =
    range > 0 && averagePrice
      ? ((averagePrice - lowestPrice) / range) * 100
      : 50;

  const savings =
    averagePrice && lowestPrice
      ? Math.round(((averagePrice - lowestPrice) / averagePrice) * 100)
      : 0;

  return (
    <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] p-5">
      <div className="flex flex-wrap gap-6 mb-4">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Lowest available</p>
          <p className="text-2xl font-bold gradient-text">{formatPrice(lowestPrice)}</p>
        </div>
        {averagePrice && (
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-0.5">Avg. price</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{formatPrice(averagePrice)}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Highest</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{formatPrice(highestPrice)}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Listings found</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{listings.length}</p>
        </div>
        {savings > 0 && (
          <div className="ml-auto">
            <p className="text-xs text-[var(--text-muted)] mb-0.5">Best deal saves</p>
            <p className="text-2xl font-bold text-green-500">{savings}% vs avg</p>
          </div>
        )}
      </div>

      {/* Price range bar */}
      <div className="relative">
        <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-80" />
        {/* Lowest price marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-600 border-2 border-white shadow-brand"
          style={{ left: "0%", transform: "translateX(-50%) translateY(-50%)" }}
        >
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-brand-600 whitespace-nowrap">
            Best
          </div>
        </div>
        {/* Average marker */}
        {averagePrice && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[var(--text-muted)] shadow"
            style={{
              left: `${avgPosition}%`,
              transform: "translateX(-50%) translateY(-50%)",
            }}
          />
        )}
      </div>
      <div className="flex justify-between mt-5 text-xs text-[var(--text-muted)]">
        <span>Cheapest: {formatPrice(lowestPrice)}</span>
        <span>Most expensive: {formatPrice(highestPrice)}</span>
      </div>
    </div>
  );
}
