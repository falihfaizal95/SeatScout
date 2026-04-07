import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate, formatTime, parseEventId } from "@/lib/utils";
import EventDashboard from "@/components/events/EventDashboard";

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
    const cl      = e.classifications?.[0];
    const segment = cl?.segment?.name ?? "Other";
    const genre   = cl?.genre?.name   ?? "";
    const isSpor  = segment === "Sports";

    const bestImage = (imgs?: Array<{ url: string; width: number; height: number }>) =>
      imgs?.length ? [...imgs].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url : undefined;

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
      venue:        venue?.name       ?? "TBD",
      city:         venue?.city?.name ?? "",
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

export default async function EventPage({ params }: PageProps) {
  const { eventId } = await params;
  const event       = await getEvent(eventId);
  const isSports    = event?.segment === "Sports";

  const sportEmojis: Record<string, string> = {
    NFL: "🏈", NBA: "🏀", MLB: "⚾", NHL: "🏒", MLS: "⚽",
    NCAAF: "🏈", NCAAB: "🏀", UFC: "🥊", Boxing: "🥊", Tennis: "🎾",
  };
  const sportEmoji = sportEmojis[event?.sport ?? ""] ?? "🎟️";

  return (
    <div style={{ background: "#0e0d18", minHeight: "100vh", paddingTop: "80px" }}>

      {/* ── Hero ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Blurred background */}
        {event?.imageUrl && (
          <div style={{ position: "absolute", inset: 0, height: "360px" }}>
            <img src={event.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(20px)", opacity: 0.12, transform: "scale(1.1)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,13,24,0.3) 0%, rgba(14,13,24,0.7) 50%, #0e0d18 100%)" }} />
          </div>
        )}

        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "40px clamp(20px,4vw,48px) 48px" }}>

          {/* Back link */}
          <Link href="/search" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#8b89a8", textDecoration: "none", marginBottom: "32px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", transition: "color 0.15s" }}>
            ← Back to results
          </Link>

          {/* Sports hero */}
          {isSports && event?.homeTeam && event?.awayTeam ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center" }}>
              {/* Sport badge */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,108,255,0.15)", border: "1px solid rgba(124,108,255,0.3)", borderRadius: "30px", padding: "5px 16px", fontSize: "0.8rem", fontWeight: 700, color: "#a99fff", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
                {sportEmoji} {event.sport}
              </span>

              {/* Team matchup */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px, 6vw, 64px)" }}>
                {/* Away team */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", minWidth: "100px" }}>
                  <div style={{ width: "clamp(80px,12vw,120px)", height: "clamp(80px,12vw,120px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {event.awayTeamLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.awayTeamLogo} alt={event.awayTeam} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
                    ) : <span style={{ fontSize: "3rem" }}>{sportEmoji}</span>}
                  </div>
                  <div className="font-syne" style={{ fontWeight: 800, fontSize: "clamp(0.95rem,2.5vw,1.15rem)", color: "#ffffff", lineHeight: 1.2, maxWidth: "140px" }}>{event.awayTeam}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8b89a8", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>AWAY</div>
                </div>

                {/* VS */}
                <div className="font-syne" style={{ fontWeight: 900, fontSize: "clamp(24px,5vw,44px)", color: "rgba(255,255,255,0.2)", letterSpacing: "-1px", flexShrink: 0 }}>VS</div>

                {/* Home team */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", minWidth: "100px" }}>
                  <div style={{ width: "clamp(80px,12vw,120px)", height: "clamp(80px,12vw,120px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {event.homeTeamLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.homeTeamLogo} alt={event.homeTeam} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
                    ) : <span style={{ fontSize: "3rem" }}>🏟️</span>}
                  </div>
                  <div className="font-syne" style={{ fontWeight: 800, fontSize: "clamp(0.95rem,2.5vw,1.15rem)", color: "#ffffff", lineHeight: 1.2, maxWidth: "140px" }}>{event.homeTeam}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8b89a8", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>HOME</div>
                </div>
              </div>

              {/* Meta row */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "18px", fontSize: "0.88rem", color: "#8b89a8" }}>
                {event.eventDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                    <Calendar size={14} style={{ color: "#7c6cff", flexShrink: 0 }} />
                    {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                  </div>
                )}
                {event.venue && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                    <MapPin size={14} style={{ color: "#7c6cff", flexShrink: 0 }} />
                    {event.venue}{event.city ? `, ${event.city}` : ""}
                  </div>
                )}
                {event.url && (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", color: "#7c6cff", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 600 }}>
                    Official page <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

          ) : (
            /* Non-sports hero */
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,108,255,0.12)", border: "1px solid rgba(124,108,255,0.25)", borderRadius: "30px", padding: "5px 14px", fontSize: "0.78rem", fontWeight: 700, color: "#a99fff", width: "fit-content", fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
                {sportEmoji} {event?.sport || "Event"}
              </span>
              <h1 className="font-syne" style={{ fontWeight: 900, fontSize: "clamp(28px,5vw,48px)", color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                {event?.name ?? eventId}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.88rem", color: "#8b89a8" }}>
                {event?.eventDate && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                    <Calendar size={14} style={{ color: "#7c6cff" }} />
                    {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                  </div>
                )}
                {event?.venue && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                    <MapPin size={14} style={{ color: "#7c6cff" }} />
                    {event.venue}{event.city ? `, ${event.city}` : ""}
                  </div>
                )}
                {event?.url && (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", color: "#7c6cff", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 600 }}>
                    Official page <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Dashboard ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px) 80px" }}>
        <EventDashboard eventId={eventId} sport={event?.sport ?? ""} />
      </div>

    </div>
  );
}
