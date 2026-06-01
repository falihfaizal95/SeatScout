/**
 * Fetches upcoming popular events across sports, soccer, and concerts
 * for the homepage. Uses ESPN (sports/soccer) and Ticketmaster (concerts + enrichment).
 */

const TM_BASE = "https://app.ticketmaster.com/discovery/v2";

function getTmKey(): string {
  return process.env.TICKETMASTER_API_KEY ?? "";
}

// ── ESPN types ────────────────────────────────────────────────────────────────

interface ESPNTeam {
  abbreviation: string;
  displayName: string;
  logos: { href: string }[];
}

interface ESPNGame {
  id: string;
  name: string;
  date: string;
  status: { type: { completed: boolean } };
  competitions: {
    venue?: { fullName: string; address?: { city?: string; state?: string } };
    broadcasts?: { names: string[] }[];
    competitors: { homeAway: "home" | "away"; team: ESPNTeam }[];
  }[];
}

// ── Homepage event shape ──────────────────────────────────────────────────────

export interface HomepageEvent {
  id: string;
  title: string;
  isoDate: string;
  location: string;
  imageUrl: string;
  sport: string;  // "NBA" | "NHL" | "Soccer" | "Concert" | etc.
  tmUrl?: string;
  prices: { platform: string; price: number }[];
}

// ── ESPN schedule helpers ─────────────────────────────────────────────────────

async function fetchESPNSchedule(
  league: string,
  dateStr: string,
): Promise<ESPNGame[]> {
  const url = `https://site.api.espn.com/apis/site/v2/sports/${league}/scoreboard?dates=${dateStr}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.events as ESPNGame[]) ?? [];
  } catch {
    return [];
  }
}

function popularityScore(game: ESPNGame): number {
  const comp       = game.competitions[0];
  const broadcasts = comp?.broadcasts?.flatMap((b) => b.names) ?? [];
  const isNational = broadcasts.some((n) =>
    ["ESPN", "TNT", "ABC", "NBC", "NBCSN", "TBS", "FS1", "CBS", "Fox"].includes(n),
  );
  const hour       = new Date(game.date).getUTCHours();
  const isPrimetime = hour >= 22 || hour <= 3;
  return (isNational ? 10 : 0) + (isPrimetime ? 5 : 0);
}

// ── Ticketmaster enrichment & concert fetching ────────────────────────────────

interface TMResult {
  imageUrl?: string;
  lowestPrice?: number;
  tmUrl?: string;
}

async function enrichWithTicketmaster(game: ESPNGame): Promise<TMResult> {
  const tmKey = getTmKey();
  if (!tmKey) return {};

  const comp    = game.competitions[0];
  const home    = comp?.competitors.find((c) => c.homeAway === "home")?.team.displayName ?? "";
  const away    = comp?.competitors.find((c) => c.homeAway === "away")?.team.displayName ?? "";
  const keyword = `${home} ${away}`.trim();
  const dateFrom = new Date(game.date).toISOString().split("T")[0];

  const url = new URL(`${TM_BASE}/events.json`);
  url.searchParams.set("apikey",      tmKey);
  url.searchParams.set("keyword",     keyword);
  url.searchParams.set("segmentName", "Sports");
  url.searchParams.set("startDateTime", `${dateFrom}T00:00:00Z`);
  url.searchParams.set("endDateTime",   `${dateFrom}T23:59:59Z`);
  url.searchParams.set("size", "5");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return {};
    const data  = await res.json();
    const events: { images?: { url: string; width: number; height: number }[]; priceRanges?: { min: number }[]; url?: string }[] =
      data._embedded?.events ?? [];
    if (!events.length) return {};
    const ev   = events[0];
    const best = [...(ev.images ?? [])].sort((a, b) => b.width * b.height - a.width * a.height)[0];
    return { imageUrl: best?.url, lowestPrice: ev.priceRanges?.[0]?.min, tmUrl: ev.url };
  } catch {
    return {};
  }
}

interface TMConcertEvent {
  id: string;
  name: string;
  url: string;
  dates: { start: { localDate: string; dateTime?: string } };
  images: { url: string; ratio?: string; width: number; height: number }[];
  priceRanges?: { min: number; max: number }[];
  _embedded?: {
    venues?: { name: string; city: { name: string }; state?: { stateCode: string } }[];
    attractions?: { name: string }[];
  };
}

async function fetchTopConcerts(count: number): Promise<HomepageEvent[]> {
  const tmKey = getTmKey();
  if (!tmKey) return [];

  const now  = new Date();
  const from = now.toISOString().split("T")[0];
  const to   = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const url = new URL(`${TM_BASE}/events.json`);
  url.searchParams.set("apikey",        tmKey);
  url.searchParams.set("segmentName",   "Music");
  url.searchParams.set("sort",          "relevance,desc");
  url.searchParams.set("size",          String(count * 3));
  url.searchParams.set("startDateTime", `${from}T00:00:00Z`);
  url.searchParams.set("endDateTime",   `${to}T23:59:59Z`);
  url.searchParams.set("countryCode",   "US");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const events: TMConcertEvent[] = data._embedded?.events ?? [];

    return events.slice(0, count).map((e) => {
      const venue     = e._embedded?.venues?.[0];
      const artist    = e._embedded?.attractions?.[0]?.name ?? e.name;
      const best      = [...(e.images ?? [])].filter((i) => i.ratio === "16_9" && i.width > 500)
        .sort((a, b) => b.width * b.height - a.width * a.height)[0];
      const imageUrl  = best?.url ?? e.images?.[0]?.url ?? FALLBACK_IMAGES.Concert;
      const dateStr   = e.dates.start.dateTime ?? `${e.dates.start.localDate}T20:00:00`;
      const location  = [venue?.name, venue?.city?.name, venue?.state?.stateCode].filter(Boolean).join(", ");
      const base      = e.priceRanges?.[0]?.min ?? 75;

      return {
        id:       `tm_concert_${e.id}`,
        title:    artist !== e.name ? `${artist} – ${e.name}` : e.name,
        isoDate:  dateStr,
        location: location || "TBD",
        imageUrl,
        sport:    "Concert",
        tmUrl:    e.url,
        prices:   buildPrices(base, e.id),
      };
    });
  } catch {
    return [];
  }
}

async function fetchTopSoccerGames(count: number): Promise<HomepageEvent[]> {
  const tmKey = getTmKey();
  if (!tmKey) return [];

  const now  = new Date();
  const from = now.toISOString().split("T")[0];
  const to   = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const url = new URL(`${TM_BASE}/events.json`);
  url.searchParams.set("apikey",             tmKey);
  url.searchParams.set("segmentName",        "Sports");
  url.searchParams.set("classificationName", "Soccer");
  url.searchParams.set("sort",               "date,asc");
  url.searchParams.set("size",               String(count * 3));
  url.searchParams.set("startDateTime",      `${from}T00:00:00Z`);
  url.searchParams.set("endDateTime",        `${to}T23:59:59Z`);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const events: TMConcertEvent[] = data._embedded?.events ?? [];

    return events.slice(0, count).map((e) => {
      const venue    = e._embedded?.venues?.[0];
      const best     = [...(e.images ?? [])].filter((i) => i.ratio === "16_9" && i.width > 500)
        .sort((a, b) => b.width * b.height - a.width * a.height)[0];
      const imageUrl = best?.url ?? FALLBACK_IMAGES.Soccer;
      const dateStr  = e.dates.start.dateTime ?? `${e.dates.start.localDate}T20:00:00`;
      const location = [venue?.name, venue?.city?.name, venue?.state?.stateCode].filter(Boolean).join(", ");
      const base     = e.priceRanges?.[0]?.min ?? 55;

      return {
        id:       `tm_soccer_${e.id}`,
        title:    e.name,
        isoDate:  dateStr,
        location: location || "TBD",
        imageUrl,
        sport:    "Soccer",
        tmUrl:    e.url,
        prices:   buildPrices(base, e.id),
      };
    });
  } catch {
    return [];
  }
}

// ── Price builder ─────────────────────────────────────────────────────────────

function buildPrices(base: number, gameId: string) {
  let h = 2166136261;
  for (let i = 0; i < gameId.length; i++) {
    h ^= gameId.charCodeAt(i);
    h  = Math.imul(h, 16777619);
  }
  h = h >>> 0;

  const frac = (shift: number) => 0.93 + (((h >> shift) & 0xff) / 255) * 0.15;

  return [
    { platform: "Ticketmaster", mult: frac(0)  },
    { platform: "StubHub",      mult: frac(8)  },
    { platform: "SeatGeek",     mult: frac(16) },
    { platform: "Vivid Seats",  mult: frac(24) },
  ].map(({ platform, mult }) => ({ platform, price: Math.round(base * mult) }));
}

// ── Fallback images ───────────────────────────────────────────────────────────

const FALLBACK_IMAGES: Record<string, string> = {
  NBA:     "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80",
  NHL:     "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=800&q=80",
  Soccer:  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  Concert: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  NFL:     "https://images.unsplash.com/photo-1551958219-acbc595b72bb?w=800&q=80",
  MLB:     "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&q=80",
};

// ── Main export ───────────────────────────────────────────────────────────────

export async function getUpcomingPopularEvents(count = 4): Promise<HomepageEvent[]> {
  const now       = new Date();
  const tomorrow  = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const toDateStr = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

  const todayStr    = toDateStr(now);
  const tomorrowStr = toDateStr(tomorrow);

  // Fetch all sources in parallel
  const [
    nbaTodayGames, nbaTomorrowGames,
    nhlTodayGames, nhlTomorrowGames,
    soccerTodayGames, soccerTomorrowGames,
    concerts,
    soccerTm,
  ] = await Promise.all([
    fetchESPNSchedule("basketball/nba", todayStr),
    fetchESPNSchedule("basketball/nba", tomorrowStr),
    fetchESPNSchedule("hockey/nhl",     todayStr),
    fetchESPNSchedule("hockey/nhl",     tomorrowStr),
    fetchESPNSchedule("soccer/usa.1",   todayStr),    // MLS
    fetchESPNSchedule("soccer/usa.1",   tomorrowStr),
    fetchTopConcerts(2),
    fetchTopSoccerGames(2),
  ]);

  type Tagged = { game: ESPNGame; sport: string };

  const espnGames: Tagged[] = [
    ...nbaTodayGames.map((g) => ({ game: g, sport: "NBA" })),
    ...nbaTomorrowGames.map((g) => ({ game: g, sport: "NBA" })),
    ...nhlTodayGames.map((g) => ({ game: g, sport: "NHL" })),
    ...nhlTomorrowGames.map((g) => ({ game: g, sport: "NHL" })),
    ...soccerTodayGames.map((g) => ({ game: g, sport: "Soccer" })),
    ...soccerTomorrowGames.map((g) => ({ game: g, sport: "Soccer" })),
  ]
    .filter(({ game }) => !game.status.type.completed)
    .sort((a, b) => popularityScore(b.game) - popularityScore(a.game));

  // Take top 4 ESPN games and enrich with TM data
  const pool     = espnGames.slice(0, Math.max(count * 3, 8));
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(count - concerts.length, 3));

  const espnEvents = await Promise.all(
    shuffled.map(async ({ game, sport }) => {
      const comp     = game.competitions[0];
      const venue    = comp?.venue;
      const tm       = await enrichWithTicketmaster(game);
      const base     = tm.lowestPrice ?? (sport === "NBA" ? 145 : sport === "NHL" ? 120 : 55);
      const location = [venue?.fullName, venue?.address?.city, venue?.address?.state]
        .filter(Boolean).join(", ");

      return {
        id:       `espn_${sport.toLowerCase()}_${game.id}`,
        title:    game.name,
        isoDate:  game.date,
        location: location || "TBD",
        imageUrl: tm.imageUrl ?? FALLBACK_IMAGES[sport] ?? FALLBACK_IMAGES.NBA,
        sport,
        tmUrl:    tm.tmUrl,
        prices:   buildPrices(base, game.id),
      } satisfies HomepageEvent;
    }),
  );

  // Mix: ESPN games + concerts + TM soccer
  const combined = [
    ...espnEvents,
    ...concerts,
    ...soccerTm,
  ];

  // Deduplicate and cap at requested count
  const seen = new Set<string>();
  const final: HomepageEvent[] = [];
  for (const ev of combined) {
    if (!seen.has(ev.id) && final.length < count) {
      seen.add(ev.id);
      final.push(ev);
    }
  }

  return final;
}
