import { Calendar, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import TicketAggregator from "@/components/tickets/TicketAggregator";
import { formatDate, formatTime, parseEventId } from "@/lib/utils";
import { SPORT_EMOJIS } from "@/types/event";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

async function getEvent(eventId: string) {
  try {
    const { source, externalId } = parseEventId(eventId);
    if (source === "tm" && process.env.TICKETMASTER_API_KEY) {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${externalId}.json?apikey=${process.env.TICKETMASTER_API_KEY}`,
        { next: { revalidate: 300 } }
      );
      if (!res.ok) return null;
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
        eventDate: dateStr,
        imageUrl: e.images?.sort((a: { width: number; height: number }, b: { width: number; height: number }) => b.width * b.height - a.width * a.height)[0]?.url,
        url: e.url,
      };
    }
    return null;
  } catch { return null; }
}

export default async function EventPage({ params }: PageProps) {
  const { eventId } = await params;
  const event = await getEvent(eventId);
  const sportEmoji = event?.sport ? (SPORT_EMOJIS[event.sport as keyof typeof SPORT_EMOJIS] || "🎟️") : "🎟️";

  return (
    <div className="min-h-screen pt-20">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        {event?.imageUrl && (
          <div className="absolute inset-0 h-72">
            <img src={event.imageUrl} alt="" className="w-full h-full object-cover opacity-15 blur-sm scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/30 via-[var(--bg)]/60 to-[var(--bg)]" />
          </div>
        )}

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-10">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-2)] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to search
          </Link>

          {/* Event info */}
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.05] text-[var(--text-2)] text-xs font-medium w-fit">
              {sportEmoji} {event?.sport || "Sports"}
            </span>

            {event?.homeTeam && event?.awayTeam ? (
              <div className="flex items-center gap-5 sm:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--bg-2)] border border-white/[0.08] flex items-center justify-center text-3xl mb-2">
                    {sportEmoji}
                  </div>
                  <p className="font-bold text-white text-sm sm:text-base">{event.awayTeam}</p>
                  <p className="text-[11px] text-[var(--text-3)]">Away</p>
                </div>
                <div className="flex-shrink-0 text-center">
                  <p className="text-2xl font-black text-[var(--text-3)]">VS</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--bg-2)] border border-white/[0.08] flex items-center justify-center text-3xl mb-2">
                    🏟️
                  </div>
                  <p className="font-bold text-white text-sm sm:text-base">{event.homeTeam}</p>
                  <p className="text-[11px] text-[var(--text-3)]">Home</p>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {event?.name || eventId}
              </h1>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {event?.eventDate && (
                <div className="flex items-center gap-2 text-[var(--text-2)]">
                  <Calendar size={14} className="text-[var(--brand-light)]" />
                  {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                </div>
              )}
              {event?.venue && (
                <div className="flex items-center gap-2 text-[var(--text-2)]">
                  <MapPin size={14} className="text-[var(--brand-light)]" />
                  {event.venue}{event.city && `, ${event.city}`}
                </div>
              )}
              {event?.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[var(--brand-light)] hover:text-white transition-colors"
                >
                  Official page <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white mb-1">Compare all listings</h2>
          <p className="text-sm text-[var(--text-2)]">
            Prices from 7+ platforms in real-time. Click any row to buy directly.
          </p>
        </div>
        <TicketAggregator eventId={eventId} />
      </div>
    </div>
  );
}
