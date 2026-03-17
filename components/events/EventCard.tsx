"use client";
import Link from "next/link";
import { MapPin, Calendar, Tag } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { SPORT_EMOJIS } from "@/types/event";
import type { NormalizedEvent } from "@/types/event";

interface EventCardProps {
  event: NormalizedEvent;
  index?: number;
}

export default function EventCard({ event }: EventCardProps) {
  const sportEmoji = SPORT_EMOJIS[event.sport as keyof typeof SPORT_EMOJIS] || "🎟️";
  const hasTeams = event.homeTeam && event.awayTeam;

  return (
    <Link href={`/event/${event.id}`}>
      <Card
        hover
        className="overflow-hidden group"
      >
        {/* Event image or gradient header */}
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-50">{sportEmoji}</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Sport badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="brand" className="text-xs backdrop-blur-sm bg-white/20 text-white border border-white/20">
              {sportEmoji} {event.sport}
            </Badge>
          </div>

          {/* Price badge */}
          {event.lowestPrice && (
            <div className="absolute bottom-3 right-3">
              <span className="text-xs font-bold text-white bg-brand-600 px-2.5 py-1 rounded-full shadow-brand">
                From {formatPrice(event.lowestPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Teams or event name */}
          {hasTeams ? (
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[var(--text-primary)] text-sm truncate">{event.awayTeam}</span>
              <span className="text-xs font-bold text-[var(--text-muted)] mx-2 flex-shrink-0">vs</span>
              <span className="font-semibold text-[var(--text-primary)] text-sm truncate text-right">{event.homeTeam}</span>
            </div>
          ) : (
            <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1 line-clamp-2">
              {event.name}
            </h3>
          )}

          {/* Date */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--text-muted)]">
            <Calendar size={12} className="flex-shrink-0" />
            <span>{formatDate(event.eventDate)}</span>
            <span>·</span>
            <span>{formatTime(event.eventDate)}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[var(--text-muted)]">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              {event.source === "ticketmaster" ? "Ticketmaster" : event.source === "seatgeek" ? "SeatGeek" : event.source}
            </span>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">
              Compare prices →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
