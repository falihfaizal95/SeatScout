import { NextRequest, NextResponse } from "next/server";

const TM_BASE = "https://app.ticketmaster.com/discovery/v2";

// ── Category keyword mapping ─────────────────────────────────────────────────

const SPORTS_KEYWORDS: Record<string, string> = {
  // NBA
  hawks: "Basketball", lakers: "Basketball", warriors: "Basketball", celtics: "Basketball",
  bulls: "Basketball", heat: "Basketball", knicks: "Basketball", nets: "Basketball",
  spurs: "Basketball", suns: "Basketball", nuggets: "Basketball", bucks: "Basketball",
  raptors: "Basketball", cavaliers: "Basketball", sixers: "Basketball",
  "76ers": "Basketball", pistons: "Basketball", pacers: "Basketball",
  hornets: "Basketball", wizards: "Basketball", magic: "Basketball",
  pelicans: "Basketball", grizzlies: "Basketball", thunder: "Basketball",
  blazers: "Basketball", kings: "Basketball", timberwolves: "Basketball",
  jazz: "Basketball", rockets: "Basketball", mavericks: "Basketball",
  mavs: "Basketball", clippers: "Basketball",
  // NFL
  cowboys: "American Football", patriots: "American Football", chiefs: "American Football",
  eagles: "American Football", packers: "American Football", steelers: "American Football",
  ravens: "American Football", broncos: "American Football", seahawks: "American Football",
  "49ers": "American Football", rams: "American Football", saints: "American Football",
  bears: "American Football", giants: "American Football", jets: "American Football",
  bills: "American Football", dolphins: "American Football", colts: "American Football",
  titans: "American Football", texans: "American Football", jaguars: "American Football",
  bengals: "American Football", browns: "American Football", raiders: "American Football",
  chargers: "American Football", vikings: "American Football", lions: "American Football",
  falcons: "American Football", panthers: "American Football", buccaneers: "American Football",
  cardinals: "American Football", commanders: "American Football",
  // MLB
  yankees: "Baseball", dodgers: "Baseball", "red sox": "Baseball", cubs: "Baseball",
  mets: "Baseball", braves: "Baseball", astros: "Baseball", phillies: "Baseball",
  padres: "Baseball", brewers: "Baseball", mariners: "Baseball", athletics: "Baseball",
  rangers: "Baseball", angels: "Baseball", tigers: "Baseball", twins: "Baseball",
  royals: "Baseball", guardians: "Baseball", orioles: "Baseball", "blue jays": "Baseball",
  rays: "Baseball", "white sox": "Baseball", reds: "Baseball", rockies: "Baseball",
  diamondbacks: "Baseball", marlins: "Baseball", pirates: "Baseball", nationals: "Baseball",
  // NHL
  bruins: "Ice Hockey", blackhawks: "Ice Hockey", penguins: "Ice Hockey",
  lightning: "Ice Hockey", avalanche: "Ice Hockey", canadiens: "Ice Hockey",
  "maple leafs": "Ice Hockey", oilers: "Ice Hockey", flames: "Ice Hockey",
  canucks: "Ice Hockey", senators: "Ice Hockey", sabres: "Ice Hockey",
  hurricanes: "Ice Hockey", capitals: "Ice Hockey", flyers: "Ice Hockey",
  devils: "Ice Hockey", islanders: "Ice Hockey", wild: "Ice Hockey",
  predators: "Ice Hockey", blues: "Ice Hockey", ducks: "Ice Hockey", sharks: "Ice Hockey",
  // Soccer
  "manchester united": "Soccer", "man utd": "Soccer", "man united": "Soccer",
  "manchester city": "Soccer", "man city": "Soccer",
  "real madrid": "Soccer", barcelona: "Soccer", "fc barcelona": "Soccer",
  liverpool: "Soccer", arsenal: "Soccer", chelsea: "Soccer", tottenham: "Soccer",
  "inter miami": "Soccer", "la galaxy": "Soccer", sounders: "Soccer",
  usmnt: "Soccer", uswnt: "Soccer",
  "world cup": "Soccer", fifa: "Soccer", "champions league": "Soccer",
  "premier league": "Soccer", "la liga": "Soccer", "serie a": "Soccer",
  bundesliga: "Soccer", "ligue 1": "Soccer",
  "copa america": "Soccer", concacaf: "Soccer",
  // Combat / wrestling
  ufc: "MMA", boxing: "Boxing", wwe: "Wrestling", aew: "Wrestling",
  // Individual
  tennis: "Tennis", wimbledon: "Tennis", golf: "Golf", pga: "Golf",
};

const CONCERT_KEYWORDS = new Set([
  "concert", " tour", "live music", "festival", "lollapalooza",
  "coachella", "bonnaroo", "acl fest", "outside lands",
]);

const COMEDY_KEYWORDS = new Set(["comedy", "stand-up", "standup", "comedian"]);

const THEATRE_KEYWORDS = new Set([
  "theatre", "theater", "musical", "broadway", "opera", "ballet",
  "hamilton", "wicked", "lion king",
]);

const FAMILY_KEYWORDS = new Set([
  "disney on ice", "sesame street", "paw patrol", "frozen", "bluey",
  "monster truck", "monster jam", "harlem globetrotters",
]);

type SegmentHint = "Sports" | "Music" | "Arts & Theatre" | null;

function detectSegment(query: string): { classification: string | null; segment: SegmentHint } {
  const q = query.toLowerCase();
  for (const [kw, cls] of Object.entries(SPORTS_KEYWORDS)) {
    if (q.includes(kw)) return { classification: cls, segment: "Sports" };
  }
  for (const kw of CONCERT_KEYWORDS)  { if (q.includes(kw)) return { classification: null, segment: "Music" }; }
  for (const kw of COMEDY_KEYWORDS)   { if (q.includes(kw)) return { classification: null, segment: "Arts & Theatre" }; }
  for (const kw of THEATRE_KEYWORDS)  { if (q.includes(kw)) return { classification: null, segment: "Arts & Theatre" }; }
  for (const kw of FAMILY_KEYWORDS)   { if (q.includes(kw)) return { classification: null, segment: "Arts & Theatre" }; }
  return { classification: null, segment: null };
}

// ── TM types ─────────────────────────────────────────────────────────────────

interface TMAttr {
  name: string;
  images?: Array<{ url: string; width: number; height: number }>;
}

interface TMRawEvent {
  id: string;
  name: string;
  url: string;
  dates: { start: { localDate: string; localTime?: string; dateTime?: string } };
  images: Array<{ url: string; ratio?: string; width: number; height: number }>;
  priceRanges?: Array<{ min: number; max: number }>;
  classifications?: Array<{
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }>;
  _embedded?: {
    venues?: Array<{
      name: string;
      city: { name: string };
      state?: { stateCode: string };
      country?: { countryCode: string };
    }>;
    attractions?: TMAttr[];
  };
}

function bestImage(images: TMRawEvent["images"]): string | undefined {
  const hi = images?.filter((i) => i.ratio === "16_9" && i.width > 500)
    .sort((a, b) => b.width * b.height - a.width * a.height)[0];
  return hi?.url ?? [...(images ?? [])].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;
}

function bestAttrImage(attr: TMAttr | undefined): string | undefined {
  if (!attr?.images?.length) return undefined;
  return [...attr.images].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;
}

function mapTMCategory(cl: TMRawEvent["classifications"]): string {
  const segment = cl?.[0]?.segment?.name ?? "";
  const genre   = cl?.[0]?.genre?.name   ?? "";
  const g = genre.toLowerCase();
  const s = segment.toLowerCase();

  if (s === "sports") {
    if (g.includes("football") && !g.includes("soccer")) return "NFL";
    if (g.includes("basketball"))  return "NBA";
    if (g.includes("baseball"))    return "MLB";
    if (g.includes("hockey"))      return "NHL";
    if (g.includes("soccer"))      return "Soccer";
    if (g.includes("mma") || g.includes("mixed martial")) return "UFC";
    if (g.includes("boxing"))      return "Boxing";
    if (g.includes("wrestling"))   return "Wrestling";
    if (g.includes("tennis"))      return "Tennis";
    if (g.includes("golf"))        return "Golf";
    return genre || "Other";
  }
  if (s === "music")          return "Concert";
  if (s === "arts & theatre") {
    if (g.includes("comedy")) return "Comedy";
    if (g.includes("family")) return "Family";
    return "Theatre";
  }
  return genre || segment || "Other";
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q               = searchParams.get("q")       ?? "";
  const page            = searchParams.get("page")    ?? "0";
  const segmentOverride = searchParams.get("segment") ?? "";

  if (!q.trim() && !segmentOverride) {
    return NextResponse.json({ events: [], total: 0 }, { status: 400 });
  }

  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }

  const { classification: detectedClass, segment: detectedSegment } = detectSegment(q);
  const effectiveSegment = segmentOverride || detectedSegment || "";
  const effectiveClass   = detectedClass   ?? "";

  const url = new URL(`${TM_BASE}/events.json`);
  if (q.trim()) url.searchParams.set("keyword", q);
  url.searchParams.set("size",   q.trim() ? "20" : "50");
  url.searchParams.set("page",   page);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("sort",   "date,asc");
  if (effectiveSegment) url.searchParams.set("segmentName",        effectiveSegment);
  if (effectiveClass)   url.searchParams.set("classificationName", effectiveClass);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`Ticketmaster API error: ${res.status}`);
    const data = await res.json();
    const rawEvents: TMRawEvent[] = data._embedded?.events ?? [];

    const events = rawEvents.map((e) => {
      const venue       = e._embedded?.venues?.[0];
      const attractions = e._embedded?.attractions ?? [];
      const cl          = e.classifications?.[0];
      const segment     = cl?.segment?.name ?? "";
      const isSport     = segment === "Sports";
      const dateStr     = e.dates.start.dateTime ?? `${e.dates.start.localDate}T${e.dates.start.localTime ?? "19:00:00"}`;

      return {
        id:           `tm_${e.id}`,
        name:         e.name,
        sport:        mapTMCategory(e.classifications),
        segment,
        genre:        cl?.genre?.name ?? "",
        league:       cl?.genre?.name ?? "",
        homeTeam:     isSport ? attractions[0]?.name : undefined,
        awayTeam:     isSport ? attractions[1]?.name : undefined,
        homeTeamLogo: isSport ? bestAttrImage(attractions[0]) : undefined,
        awayTeamLogo: isSport ? bestAttrImage(attractions[1]) : undefined,
        venue:        venue?.name ?? "TBD",
        city:         venue?.city?.name ?? "",
        state:        venue?.state?.stateCode,
        country:      venue?.country?.countryCode ?? "US",
        eventDate:    dateStr,
        imageUrl:     bestImage(e.images),
        lowestPrice:  e.priceRanges?.[0]?.min,
        averagePrice: e.priceRanges?.[0]
          ? (e.priceRanges[0].min + e.priceRanges[0].max) / 2
          : undefined,
        url:          e.url,
        source:       "ticketmaster",
        externalIds:  { ticketmaster: e.id },
      };
    });

    // When classification hint was detected, drop unrelated results
    const filtered = detectedClass
      ? events.filter((e) => e.segment === "Sports")
      : events;

    // Dedup: same matchup + date = same event
    const seen = new Set<string>();
    const deduped = filtered.filter((e) => {
      const day  = e.eventDate?.slice(0, 10) ?? "";
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const key  = e.homeTeam && e.awayTeam
        ? `${norm(e.homeTeam)}|${norm(e.awayTeam)}|${day}`
        : `${norm(e.name)}|${day}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 20);

    return NextResponse.json(
      { events: deduped, total: deduped.length, page: data.page?.number ?? 0, totalPages: data.page?.totalPages ?? 1 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[/api/search] error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
