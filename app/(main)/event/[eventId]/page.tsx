import { Calendar, MapPin, ArrowLeft, ExternalLink, Music } from "lucide-react";
import Link from "next/link";
import PriceComparisonTable from "@/components/tickets/PriceComparisonTable";
import { formatDate, formatTime, parseEventId } from "@/lib/utils";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

interface EventData {
  id: string;
  name: string;
  segment: string;
  sport: string;
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  venue: string;
  city: string;
  state?: string;
  eventDate: string;
  imageUrl?: string;
  url: string;
  priceMin?: number;
  priceMax?: number;
}

async function getEvent(eventId: string): Promise<EventData | null> {
  try {
    const { source, externalId } = parseEventId(eventId);
    if (source !== "tm" || !process.env.TICKETMASTER_API_KEY) return null;

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${externalId}.json?apikey=${process.env.TICKETMASTER_API_KEY}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;

    const e = await res.json();
    const venue       = e._embedded?.venues?.[0];
    const attractions: Array<{ name: string; images?: Array<{ url: string; width: number; height: number }> }> =
      e._embedded?.attractions ?? [];
    const cl          = e.classifications?.[0];
    const segment     = cl?.segment?.name ?? "Other";
    const genre       = cl?.genre?.name   ?? "";
    const isSpor      = segment === "Sports";

    const bestImage = (imgs?: Array<{ url: string; width: number; height: number }>) =>
      imgs?.length
        ? [...imgs].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url
        : undefined;

    const dateStr =
      e.dates?.start?.dateTime ??
      `${e.dates?.start?.localDate}T${e.dates?.start?.localTime ?? "19:00:00"}`;

    return {
      id:           eventId,
      name:         e.name,
      segment,
      sport:        genre || segment,
      homeTeam:     isSpor ? attractions[1]?.name  : undefined,
      awayTeam:     isSpor ? attractions[0]?.name  : undefined,
      homeTeamLogo: isSpor ? bestImage(attractions[1]?.images) : undefined,
      awayTeamLogo: isSpor ? bestImage(attractions[0]?.images) : undefined,
      venue:        venue?.name            ?? "TBD",
      city:         venue?.city?.name      ?? "",
      state:        venue?.state?.stateCode,
      eventDate:    dateStr,
      imageUrl:     bestImage(e.images),
      url:          e.url,
      priceMin:     e.priceRanges?.[0]?.min,
      priceMax:     e.priceRanges?.[0]?.max,
    };
  } catch {
    return null;
  }
}

// ── Team logo box ──────────────────────────────────────────────────────────────
function TeamBox({
  name,
  logo,
  label,
  emoji,
}: {
  name: string;
  logo?: string;
  label: string;
  emoji: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center min-w-[80px] sm:min-w-[120px]">
      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-white/[0.1] bg-[var(--bg-2)] overflow-hidden flex items-center justify-center">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="w-full h-full object-contain p-2" />
        ) : (
          <span className="text-4xl">{emoji}</span>
        )}
      </div>
      <p className="font-bold text-white text-sm sm:text-base leading-tight max-w-[120px]">{name}</p>
      <p className="text-[11px] text-[var(--text-3)] uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default async function EventPage({ params }: PageProps) {
  const { eventId } = await params;
  const event       = await getEvent(eventId);

  const isSports = event?.segment === "Sports";
  const isMusic  = event?.segment === "Music";

  const sportEmojis: Record<string, string> = {
    NFL: "🏈", NBA: "🏀", MLB: "⚾", NHL: "🏒", MLS: "⚽",
    NCAAF: "🏈", NCAAB: "🏀", UFC: "🥊", Boxing: "🥊",
    Tennis: "🎾", Golf: "⛳",
  };
  const sportEmoji = sportEmojis[event?.sport ?? ""] ?? "🎟️";

  return (
    <div className="min-h-screen pt-20">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background image — blurred, low opacity */}
        {event?.imageUrl && (
          <div className="absolute inset-0 h-80 sm:h-96">
            <img
              src={event.imageUrl}
              alt=""
              className={`w-full h-full object-cover scale-110 blur-sm ${isMusic ? "opacity-25" : "opacity-15"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/20 via-[var(--bg)]/60 to-[var(--bg)]" />
          </div>
        )}

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-12">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-2)] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to search
          </Link>

          {/* ── SPORTS hero ─────────────────────────────────────────────── */}
          {isSports && event?.homeTeam && event?.awayTeam ? (
            <div className="flex flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(124,106,247,0.3)] bg-[var(--brand-dim)] text-[var(--brand-light)] text-xs font-semibold">
                {sportEmoji} {event.sport}
              </span>

              <div className="flex items-center gap-6 sm:gap-12">
                <TeamBox name={event.awayTeam} logo={event.awayTeamLogo} label="Away" emoji={sportEmoji} />
                <div className="flex-shrink-0 text-center">
                  <p className="font-syne text-[28px] sm:text-[36px] font-[800] text-[var(--text-3)] tracking-[-1px]">
                    VS
                  </p>
                </div>
                <TeamBox name={event.homeTeam} logo={event.homeTeamLogo} label="Home" emoji="🏟️" />
              </div>

              <div className="flex flex-wrap justify-center gap-5 text-sm">
                {event.eventDate && (
                  <div className="flex items-center gap-2 text-[var(--text-2)]">
                    <Calendar size={14} className="text-[var(--brand-light)]" />
                    {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center gap-2 text-[var(--text-2)]">
                    <MapPin size={14} className="text-[var(--brand-light)]" />
                    {event.venue}{event.city && `, ${event.city}`}
                  </div>
                )}
                {event.url && (
                  <a href={event.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--brand-light)] hover:text-white transition-colors">
                    Official page <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

          /* ── MUSIC hero ────────────────────────────────────────────── */
          ) : isMusic ? (
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold w-fit">
                <Music size={12} /> {event?.sport || "Music"}
              </span>
              <h1 className="font-syne text-4xl sm:text-5xl font-[800] tracking-[-1.5px] text-white leading-tight">
                {event?.name ?? eventId}
              </h1>
              <div className="flex flex-wrap gap-5 text-sm">
                {event?.eventDate && (
                  <div className="flex items-center gap-2 text-[var(--text-2)]">
                    <Calendar size={14} className="text-blue-400" />
                    {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                  </div>
                )}
                {event?.venue && (
                  <div className="flex items-center gap-2 text-[var(--text-2)]">
                    <MapPin size={14} className="text-blue-400" />
                    {event.venue}{event.city && `, ${event.city}`}
                  </div>
                )}
              </div>
              {event?.url && (
                <div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white text-sm font-semibold transition-all mt-1"
                  >
                    Get Tickets <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

          /* ── DEFAULT hero (theater, comedy, other) ─────────────────── */
          ) : (
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.05] text-[var(--text-2)] text-xs font-medium w-fit">
                🎟️ {event?.sport || "Event"}
              </span>
              <h1 className="font-syne text-3xl sm:text-4xl font-[800] tracking-tight text-white">
                {event?.name ?? eventId}
              </h1>
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
                  <a href={event.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--brand-light)] hover:text-white transition-colors">
                    Get Tickets <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Price comparison ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white mb-1">Compare prices</h2>
          <p className="text-sm text-[var(--text-2)]">
            Live price from Ticketmaster + links to search other platforms.
          </p>
        </div>
        <PriceComparisonTable
          eventName={event?.name ?? eventId}
          tmPriceMin={event?.priceMin}
          tmPriceMax={event?.priceMax}
          tmUrl={event?.url ?? `https://www.ticketmaster.com`}
        />
      </div>
    </div>
  );
}
