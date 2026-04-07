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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", textAlign: "center" }}>

              {/* Sport badge */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,108,255,0.15)", border: "1px solid rgba(124,108,255,0.3)", borderRadius: "30px", padding: "5px 16px", fontSize: "0.78rem", fontWeight: 700, color: "#a99fff", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
                {sportEmoji} {event.sport}
              </span>

              {/* Matchup row */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px,5vw,56px)", width: "100%" }}>

                {/* Away team */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "clamp(110px,16vw,180px)", height: "clamp(110px,16vw,180px)",
                    borderRadius: "24px",
                    border: "1.5px solid rgba(124,108,255,0.4)",
                    background: "linear-gradient(135deg, rgba(124,108,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
                    boxShadow: "0 0 48px rgba(124,108,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                    overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {event.awayTeamLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.awayTeamLogo} alt={event.awayTeam} style={{ width: "72%", height: "72%", objectFit: "contain" }} />
                    ) : <span style={{ fontSize: "3.5rem" }}>{sportEmoji}</span>}
                  </div>
                  <div className="font-syne" style={{ fontWeight: 800, fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#ffffff", lineHeight: 1.2, maxWidth: "180px" }}>{event.awayTeam}</div>
                  <span style={{ display: "inline-flex", padding: "4px 14px", borderRadius: "20px", background: "rgba(124,108,255,0.15)", border: "1px solid rgba(124,108,255,0.35)", fontSize: "0.65rem", fontWeight: 800, color: "#a99fff", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>AWAY</span>
                </div>

                {/* VS circle + meta */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "clamp(68px,9vw,100px)", height: "clamp(68px,9vw,100px)",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c6cff 0%, #5b4fe8 100%)",
                    boxShadow: "0 0 40px rgba(124,108,255,0.55), 0 0 80px rgba(124,108,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span className="font-syne" style={{ fontWeight: 900, fontSize: "clamp(16px,2.5vw,28px)", color: "#ffffff", letterSpacing: "-0.5px" }}>VS</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
                    {event.eventDate && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.8rem", color: "#c4c2e0", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
                        <Calendar size={12} style={{ color: "#7c6cff" }} />
                        {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                      </div>
                    )}
                    {event.venue && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: "#8b89a8", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                        <MapPin size={11} style={{ color: "#7c6cff" }} />
                        {event.venue}{event.city ? `, ${event.city}` : ""}
                      </div>
                    )}
                    {event.url && (
                      <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "2px", fontSize: "0.72rem", color: "#7c6cff", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 600 }}>
                        Official page <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Home team */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "clamp(110px,16vw,180px)", height: "clamp(110px,16vw,180px)",
                    borderRadius: "24px",
                    border: "1.5px solid rgba(255,200,80,0.35)",
                    background: "linear-gradient(135deg, rgba(255,200,80,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    boxShadow: "0 0 48px rgba(255,200,80,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                    overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {event.homeTeamLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.homeTeamLogo} alt={event.homeTeam} style={{ width: "72%", height: "72%", objectFit: "contain" }} />
                    ) : <span style={{ fontSize: "3.5rem" }}>🏟️</span>}
                  </div>
                  <div className="font-syne" style={{ fontWeight: 800, fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#ffffff", lineHeight: 1.2, maxWidth: "180px" }}>{event.homeTeam}</div>
                  <span style={{ display: "inline-flex", padding: "4px 14px", borderRadius: "20px", background: "rgba(255,200,80,0.12)", border: "1px solid rgba(255,200,80,0.35)", fontSize: "0.65rem", fontWeight: 800, color: "#ffc850", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>HOME</span>
                </div>

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
