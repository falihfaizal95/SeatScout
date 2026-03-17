"use client";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { SPORT_EMOJIS } from "@/types/event";
import type { NormalizedEvent } from "@/types/event";

interface EventCardProps {
  event: NormalizedEvent;
  index?: number;
}

export default function EventCard({ event }: EventCardProps) {
  const emoji = SPORT_EMOJIS[event.sport as keyof typeof SPORT_EMOJIS] || "🎟️";
  const hasTeams = event.homeTeam && event.awayTeam;

  return (
    <Link href={`/event/${event.id}`} className="group block">
      <div className="rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">

        {/* Image / gradient header */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[var(--bg-2)] to-[var(--bg-3)]">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">{emoji}</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-1)] via-transparent to-transparent" />

          {/* Sport badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.12] bg-black/40 backdrop-blur-sm text-[11px] font-semibold text-[var(--text-2)]">
              {emoji} {event.sport}
            </span>
          </div>

          {/* Price */}
          {event.lowestPrice && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[var(--green)]/15 border border-[var(--green)]/30 text-[var(--green)] text-xs font-bold">
                From {formatPrice(event.lowestPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {hasTeams ? (
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-semibold text-sm text-white truncate">{event.awayTeam}</span>
              <span className="text-[10px] font-bold text-[var(--text-3)] mx-2 flex-shrink-0 uppercase tracking-wider">vs</span>
              <span className="font-semibold text-sm text-white truncate text-right">{event.homeTeam}</span>
            </div>
          ) : (
            <h3 className="font-semibold text-sm text-white mb-2.5 line-clamp-2 leading-snug">
              {event.name}
            </h3>
          )}

          <div className="space-y-1.5 mt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-3)]">
              <Calendar size={11} />
              <span>{formatDate(event.eventDate)} · {formatTime(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-3)]">
              <MapPin size={11} />
              <span className="truncate">{event.venue}, {event.city}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-3)] capitalize">{event.source}</span>
            <span className="text-[11px] font-semibold text-[var(--brand-light)] group-hover:translate-x-0.5 transition-transform">
              Compare →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
