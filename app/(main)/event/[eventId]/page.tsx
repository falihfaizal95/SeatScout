import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import TicketAggregator from "@/components/tickets/TicketAggregator";
import Badge from "@/components/ui/Badge";
import { formatDate, formatTime, parseEventId } from "@/lib/utils";
import { SPORT_EMOJIS } from "@/types/event";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

async function getEventData(eventId: string) {
  try {
    // We use the search API to fetch event data via the aggregator
    // In production this would be a dedicated /api/events/[eventId] endpoint
    const { source, externalId } = parseEventId(eventId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Try Ticketmaster first if it's a TM event
    if (source === "tm" && process.env.TICKETMASTER_API_KEY) {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${externalId}.json?apikey=${process.env.TICKETMASTER_API_KEY}`,
        { next: { revalidate: 300 } }
      );
      if (res.ok) {
        const e = await res.json();
        const venue = e._embedded?.venues?.[0];
        const attractions = e._embedded?.attractions || [];
        const dateStr = e.dates?.start?.dateTime || `${e.dates?.start?.localDate}T${e.dates?.start?.localTime || "19:00:00"}`;

        return {
          id: eventId,
          name: e.name,
          sport: e.classifications?.[0]?.genre?.name || "Sports",
          homeTeam: attractions[0]?.name,
          awayTeam: attractions[1]?.name,
          venue: venue?.name || "TBD",
          city: venue?.city?.name || "",
          state: venue?.state?.stateCode,
          country: venue?.country?.countryCode || "US",
          eventDate: dateStr,
          imageUrl: e.images?.sort((a: {width: number; height: number}, b: {width: number; height: number}) => b.width * b.height - a.width * a.height)[0]?.url,
          url: e.url,
          source: "ticketmaster",
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default async function EventPage({ params }: PageProps) {
  const { eventId } = await params;
  const event = await getEventData(eventId);

  // Decode display info from eventId if API fetch fails
  const { source, externalId } = parseEventId(eventId);
  const sportEmoji = "🏟️";

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 pt-6 mb-6">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to search
        </Link>
      </div>

      {/* Event hero */}
      <div className="relative mb-10">
        {event?.imageUrl && (
          <div className="absolute inset-0 overflow-hidden h-64">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover opacity-20 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/80 to-[var(--bg-primary)]" />
          </div>
        )}

        <div className="relative max-w-5xl mx-auto px-4 pt-8">
          <div className="flex flex-col gap-4">
            {/* Sport badge */}
            <div>
              <Badge variant="brand" size="md">
                {event?.sport ? `${SPORT_EMOJIS[event.sport as keyof typeof SPORT_EMOJIS] || "🎟️"} ${event.sport}` : "🎟️ Sports"}
              </Badge>
            </div>

            {/* Matchup */}
            {event?.homeTeam && event?.awayTeam ? (
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-3xl mb-2">
                    🏈
                  </div>
                  <p className="font-bold text-[var(--text-primary)] text-sm sm:text-base">{event.awayTeam}</p>
                  <p className="text-xs text-[var(--text-muted)]">Away</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-black text-[var(--text-muted)]">VS</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-3xl mb-2">
                    🏟️
                  </div>
                  <p className="font-bold text-[var(--text-primary)] text-sm sm:text-base">{event.homeTeam}</p>
                  <p className="text-xs text-[var(--text-muted)]">Home</p>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight">
                {event?.name || `Event ${externalId}`}
              </h1>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
              {event?.eventDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-brand-500" />
                  <span>{formatDate(event.eventDate)}</span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span>{formatTime(event.eventDate)}</span>
                </div>
              )}
              {event?.venue && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-500" />
                  <span>{event.venue}{event.city && `, ${event.city}`}</span>
                </div>
              )}
              {event?.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-500 hover:text-brand-700 transition-colors"
                >
                  Official page
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket aggregator */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Compare all listings</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Prices aggregated from 7+ platforms in real-time. Click any listing to buy on the original site.
          </p>
        </div>
        <TicketAggregator eventId={eventId} />
      </div>
    </div>
  );
}
