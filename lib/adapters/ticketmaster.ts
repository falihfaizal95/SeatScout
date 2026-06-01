import type { TicketAdapter, NormalizedEvent, EventSearchParams, TicketListing } from "./types";
import { generateEventId } from "@/lib/utils";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

// API key is server-only — never referenced on the client
function getApiKey(): string {
  return process.env.TICKETMASTER_API_KEY ?? "";
}

interface TMEvent {
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string; dateTime?: string } };
  images: Array<{ url: string; ratio?: string; width: number; height: number }>;
  priceRanges?: Array<{ type: string; min: number; max: number; currency: string }>;
  url: string;
  _embedded?: {
    venues?: Array<{
      name: string;
      city: { name: string };
      state?: { name: string; stateCode: string };
      country: { name: string; countryCode: string };
    }>;
    attractions?: Array<{ name: string; images?: Array<{ url: string; width: number; height: number }> }>;
  };
  classifications?: Array<{
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }>;
}

function mapCategory(classification?: TMEvent["classifications"]): string {
  const segment = classification?.[0]?.segment?.name ?? "";
  const genre   = classification?.[0]?.genre?.name   ?? "";
  const sub     = classification?.[0]?.subGenre?.name ?? "";
  const g = genre.toLowerCase();
  const s = segment.toLowerCase();

  // Sports
  if (g.includes("football") && !g.includes("soccer")) return "NFL";
  if (g.includes("basketball"))  return "NBA";
  if (g.includes("baseball"))    return "MLB";
  if (g.includes("hockey"))      return "NHL";
  if (g.includes("soccer") || g.includes("football") && g.includes("soccer")) return "Soccer";
  if (g.includes("mls"))         return "MLS";
  if (genre === "Football")      return "NFL";
  if (g.includes("ufc") || g.includes("mixed martial") || g.includes("mma")) return "UFC";
  if (g.includes("boxing"))      return "Boxing";
  if (g.includes("wrestling") || g.includes("wwe") || g.includes("aew"))     return "Wrestling";
  if (g.includes("tennis"))      return "Tennis";
  if (g.includes("golf"))        return "Golf";
  if (g.includes("esport") || g.includes("e-sport")) return "Esports";
  if (g.includes("college") && g.includes("basketball")) return "NCAAB";
  if (g.includes("college") && g.includes("football"))   return "NCAAF";

  // Music / Concerts
  if (s === "music")        return "Concert";
  if (g.includes("rock") || g.includes("pop") || g.includes("hip-hop") ||
      g.includes("r&b") || g.includes("country") || g.includes("jazz") ||
      g.includes("classical") || g.includes("electronic") || g.includes("latin")) return "Concert";
  if (g.includes("festival")) return "Festival";

  // Arts & Theatre
  if (s === "arts & theatre") {
    if (g.includes("comedy") || sub.includes("comedy")) return "Comedy";
    if (g.includes("family") || sub.includes("family")) return "Family";
    return "Theatre";
  }
  if (g.includes("comedy") || g.includes("stand-up")) return "Comedy";
  if (g.includes("theatre") || g.includes("theater") || g.includes("musical") ||
      g.includes("broadway") || g.includes("opera") || g.includes("ballet")) return "Theatre";
  if (g.includes("family") || g.includes("circus") || g.includes("ice show")) return "Family";

  if (s === "sports") return genre || "Other";
  return genre || sub || "Other";
}

function getBestImage(images: TMEvent["images"]): string | undefined {
  const sorted = [...images]
    .filter((i) => i.ratio === "16_9" && i.width > 500)
    .sort((a, b) => b.width * b.height - a.width * a.height);
  if (sorted.length) return sorted[0].url;
  return [...images].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;
}

function buildEventUrl(params: EventSearchParams): URL {
  const url = new URL(`${BASE_URL}/events.json`);
  url.searchParams.set("apikey", getApiKey());
  url.searchParams.set("keyword", params.query);
  url.searchParams.set("size", String(params.limit ?? 20));
  url.searchParams.set("sort", "date,asc");

  if (params.dateFrom) url.searchParams.set("startDateTime", `${params.dateFrom}T00:00:00Z`);
  if (params.dateTo)   url.searchParams.set("endDateTime",   `${params.dateTo}T23:59:59Z`);
  if (params.city)     url.searchParams.set("city", params.city);

  // Scope by segment when category is specified
  const cat = (params.category ?? "").toLowerCase();
  if (cat === "sports") {
    url.searchParams.set("segmentName", "Sports");
  } else if (cat === "music" || cat === "concert") {
    url.searchParams.set("segmentName", "Music");
  } else if (cat === "arts" || cat === "theatre") {
    url.searchParams.set("segmentName", "Arts & Theatre");
  }
  // "all" or no category → no segment filter, returns everything

  return url;
}

export const ticketmasterAdapter: TicketAdapter = {
  platform: "ticketmaster",

  async searchEvents(params: EventSearchParams): Promise<NormalizedEvent[]> {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("[Ticketmaster] No API key configured");
      return [];
    }

    const url = buildEventUrl(params);

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`Ticketmaster API error: ${res.status}`);
      const data = await res.json();
      const events: TMEvent[] = data._embedded?.events ?? [];

      return events.map((e) => {
        const venue       = e._embedded?.venues?.[0];
        const attractions = e._embedded?.attractions ?? [];
        const priceRange  = e.priceRanges?.[0];
        const cl          = e.classifications?.[0];
        const segment     = cl?.segment?.name ?? "";
        const genre       = cl?.genre?.name   ?? "";
        const isSport     = segment === "Sports";
        const dateStr     = e.dates.start.dateTime ?? `${e.dates.start.localDate}T${e.dates.start.localTime ?? "19:00:00"}`;

        return {
          id:            generateEventId("tm", e.id),
          name:          e.name,
          sport:         mapCategory(e.classifications),
          segment,
          genre,
          league:        genre,
          homeTeam:      isSport ? attractions[0]?.name  : undefined,
          awayTeam:      isSport ? attractions[1]?.name  : undefined,
          homeTeamLogo:  isSport ? attractions[0]?.images?.sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url : undefined,
          awayTeamLogo:  isSport ? attractions[1]?.images?.sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url : undefined,
          venue:         venue?.name ?? "TBD",
          city:          venue?.city?.name ?? "",
          state:         venue?.state?.stateCode,
          country:       venue?.country?.countryCode ?? "US",
          eventDate:     dateStr,
          imageUrl:      getBestImage(e.images),
          lowestPrice:   priceRange?.min,
          averagePrice:  priceRange ? (priceRange.min + priceRange.max) / 2 : undefined,
          url:           e.url,
          source:        "ticketmaster",
          externalIds:   { ticketmaster: e.id },
        };
      });
    } catch (err) {
      console.error("[Ticketmaster] searchEvents error:", err);
      return [];
    }
  },

  async getTickets(externalEventId: string): Promise<TicketListing[]> {
    const apiKey = getApiKey();
    if (!apiKey) return [];

    const url = new URL(`${BASE_URL}/events/${externalEventId}.json`);
    url.searchParams.set("apikey", apiKey);

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`Ticketmaster event fetch error: ${res.status}`);
      const e: TMEvent = await res.json();

      if (!e.priceRanges?.length) return [];

      return e.priceRanges.map((range, i) => ({
        id:              `tm_${externalEventId}_${i}`,
        platform:        "ticketmaster" as const,
        eventId:         generateEventId("tm", externalEventId),
        externalEventId,
        section:         range.type === "resale" ? "Resale – Various" : "Official – Various",
        row:             null,
        quantity:        2,
        pricePerTicket:  range.min,
        totalPrice:      range.min * 2,
        currency:        range.currency ?? "USD",
        buyUrl:          e.url,
        listingFetchedAt: new Date(),
        isVerified:      true,
        isMock:          false,
      }));
    } catch (err) {
      console.error("[Ticketmaster] getTickets error:", err);
      return [];
    }
  },
};
