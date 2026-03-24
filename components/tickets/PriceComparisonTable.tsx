"use client";
import { ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PriceComparisonTableProps {
  eventName: string;
  tmPriceMin?: number;
  tmPriceMax?: number;
  tmUrl: string;
}

const EXTERNAL_PLATFORMS = [
  {
    name: "StubHub",
    color: "text-[#00d1ff]",
    searchUrl: (q: string) =>
      `https://www.stubhub.com/secure/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: "SeatGeek",
    color: "text-[#5cb85c]",
    searchUrl: (q: string) =>
      `https://seatgeek.com/search?search[q]=${encodeURIComponent(q)}`,
  },
  {
    name: "Vivid Seats",
    color: "text-[#a855f7]",
    searchUrl: (q: string) =>
      `https://www.vividseats.com/search?searchTerm=${encodeURIComponent(q)}`,
  },
];

export default function PriceComparisonTable({
  eventName,
  tmPriceMin,
  tmPriceMax,
  tmUrl,
}: PriceComparisonTableProps) {
  const hasPrice = tmPriceMin != null;
  const range    = hasPrice && tmPriceMax ? tmPriceMax - tmPriceMin : 0;

  return (
    <div className="space-y-5">
      {/* Summary stats */}
      {hasPrice && (
        <div className="rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] mb-1">Best Price</p>
              <p className="text-2xl font-black text-[var(--green)]">{formatPrice(tmPriceMin!)}</p>
            </div>
            {tmPriceMax && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] mb-1">Up To</p>
                <p className="text-2xl font-black text-white">{formatPrice(tmPriceMax)}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[var(--text-3)] mb-1">Platform</p>
              <p className="text-2xl font-black text-white">Ticketmaster</p>
            </div>
          </div>

          {/* Price range gradient bar */}
          <div className="relative h-1.5 rounded-full bg-gradient-to-r from-[var(--green)] via-yellow-400 to-red-500 opacity-70" />
          <div className="flex justify-between mt-2 text-[11px] text-[var(--text-3)]">
            <span>{formatPrice(tmPriceMin!)}</span>
            {tmPriceMax && range > 0 && <span>{formatPrice(tmPriceMax)}</span>}
          </div>
        </div>
      )}

      {/* Comparison table */}
      <div className="rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h3 className="font-semibold text-white text-sm">Compare platforms</h3>
        </div>

        {/* Ticketmaster row — live price */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[rgba(124,106,247,0.04)]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--brand)]" />
            <span className="font-semibold text-white text-sm">Ticketmaster</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--brand-dim)] text-[var(--brand-light)] uppercase tracking-wider">
              Live
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-[var(--green)] text-sm">
              {hasPrice ? `From ${formatPrice(tmPriceMin!)}` : "See site"}
            </span>
            <a
              href={tmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white text-[12px] font-semibold transition-all"
            >
              Buy Now <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* External platform rows */}
        {EXTERNAL_PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="font-semibold text-white text-sm">{platform.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-3)] text-sm">Prices may vary</span>
              <a
                href={platform.searchUrl(eventName)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white text-[12px] font-semibold transition-all"
              >
                View <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="px-6 py-3 bg-[rgba(255,255,255,0.02)] border-t border-white/[0.05]">
          <p className="text-[11px] text-[var(--text-3)]">
            ✦ Ticketmaster price is live from their API. External platforms are links to search — prices may differ.
          </p>
        </div>
      </div>
    </div>
  );
}
