import type { TicketAdapter, NormalizedEvent, EventSearchParams, TicketListing } from "./types";
import { generateEventId } from "@/lib/utils";

const BASE_URL = "https://api.seatgeek.com/2";

function getClientId(): string {
  return process.env.SEATGEEK_CLIENT_ID ?? "";
}

interface SGPerformer {
  name: string;
  image?: string;
  short_name?: string;
  type?: string;
}

interface SGVenue {
  name: string;
  city: string;
  state: string;
  country: string;
  display_location: string;
}

interface SGEvent {
  id: number;
  title: string;
  type: string;
  datetime_utc: string;
  performers: SGPerformer[];
  venue: SGVenue;
  stats: {
    lowest_price?: number;
    average_price?: number;
    highest_price?: number;
    listing_count?: number;
  };
  url: string;
  taxonomies?: Array<{ name: string; parent_id?: number; id?: number }>;
}

function mapSGCategory(event: SGEvent): string {
  const taxNames = event.taxonomies?.map((t) => t.name.toLowerCase()) ?? [];
  const type = event.type?.toLowerCase() ?? "";

  // Sports — specific leagues first
  if (taxNames.some((t) => t === "nfl" || t === "american-football")) return "NFL";
  if (taxNames.some((t) => t === "nba" || t === "basketball"))        return "NBA";
  if (taxNames.some((t) => t === "mlb" || t === "baseball"))          return "MLB";
  if (taxNames.some((t) => t === "nhl" || t === "hockey"))            return "NHL";
  if (taxNames.some((t) => t === "mls"))                               return "MLS";
  if (taxNames.some((t) => t.includes("soccer") || t.includes("fifa") || t.includes("world cup") || t === "football")) return "Soccer";
  if (taxNames.some((t) => t.includes("ufc") || t.includes("mma")))  return "UFC";
  if (taxNames.some((t) => t.includes("boxing")))                     return "Boxing";
  if (taxNames.some((t) => t.includes("wrestling") || t.includes("wwe"))) return "Wrestling";
  if (taxNames.some((t) => t.includes("tennis")))                     return "Tennis";
  if (taxNames.some((t) => t.includes("golf")))                       return "Golf";
  if (taxNames.some((t) => t.includes("esport") || t.includes("e-sport"))) return "Esports";
  if (taxNames.some((t) => t.includes("ncaa") && t.includes("basket")))   return "NCAAB";
  if (taxNames.some((t) => t.includes("ncaa") && t.includes("football"))) return "NCAAF";

  // Music / concerts
  if (type === "concert" || taxNames.some((t) => t === "concert" || t === "music")) return "Concert";
  if (taxNames.some((t) => t.includes("festival")))  return "Festival";

  // Arts & entertainment
  if (type === "theater" || taxNames.some((t) => t.includes("theater") || t.includes("theatre") || t.includes("broadway") || t.includes("musical"))) return "Theatre";
  if (type === "comedy" || taxNames.some((t) => t.includes("comedy"))) return "Comedy";
  if (taxNames.some((t) => t.includes("family") || t.includes("circus"))) return "Family";

  if (taxNames.some((t) => t.includes("sport"))) return "Other";
  return "Other";
}

export const seatgeekAdapter: TicketAdapter = {
  platform: "seatgeek",

  async searchEvents(params: EventSearchParams): Promise<NormalizedEvent[]> {
    const clientId = getClientId();
    if (!clientId) {
      console.warn("[SeatGeek] No client ID configured");
      return [];
    }

    const url = new URL(`${BASE_URL}/events`);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("q", params.query);
    url.searchParams.set("per_page", String(params.limit ?? 20));
    url.searchParams.set("sort", "datetime_utc.asc");

    if (params.dateFrom) url.searchParams.set("datetime_utc.gte", `${params.dateFrom}T00:00:00`);
    if (params.dateTo)   url.searchParams.set("datetime_utc.lte", `${params.dateTo}T23:59:59`);
    if (params.city)     url.searchParams.set("venue.city", params.city);

    // Scope by category when specified
    const cat = (params.category ?? "").toLowerCase();
    if (cat === "sports") {
      url.searchParams.set("taxonomies.name", "sports");
    } else if (cat === "music" || cat === "concert") {
      url.searchParams.set("type", "concert");
    } else if (cat === "arts" || cat === "theatre") {
      url.searchParams.set("type", "theater");
    }

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`SeatGeek API error: ${res.status}`);
      const data = await res.json();
      const events: SGEvent[] = data.events ?? [];

      return events.map((e) => {
        const isSport = e.type === "sports" || (e.taxonomies ?? []).some((t) => t.name.toLowerCase().includes("sport"));
        return {
          id:            generateEventId("sg", String(e.id)),
          name:          e.title,
          sport:         mapSGCategory(e),
          segment:       e.type,
          homeTeam:      isSport ? e.performers[0]?.name : undefined,
          awayTeam:      isSport ? e.performers[1]?.name : undefined,
          homeTeamLogo:  isSport ? e.performers[0]?.image : undefined,
          awayTeamLogo:  isSport ? e.performers[1]?.image : undefined,
          venue:         e.venue.name,
          city:          e.venue.city,
          state:         e.venue.state,
          country:       e.venue.country ?? "US",
          eventDate:     e.datetime_utc,
          imageUrl:      e.performers[0]?.image ?? undefined,
          lowestPrice:   e.stats.lowest_price,
          averagePrice:  e.stats.average_price,
          url:           e.url,
          source:        "seatgeek",
          externalIds:   { seatgeek: String(e.id) },
        };
      });
    } catch (err) {
      console.error("[SeatGeek] searchEvents error:", err);
      return [];
    }
  },

  async getTickets(externalEventId: string): Promise<TicketListing[]> {
    const clientId = getClientId();
    if (!clientId) return [];

    const url = new URL(`${BASE_URL}/listings`);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("event_id", externalEventId);
    url.searchParams.set("per_page", "50");

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      if (!res.ok) {
        const eventUrl = new URL(`${BASE_URL}/events/${externalEventId}`);
        eventUrl.searchParams.set("client_id", clientId);
        const eventRes = await fetch(eventUrl.toString(), { next: { revalidate: 300 } });
        if (!eventRes.ok) return [];
        const e: SGEvent = await eventRes.json();
        if (!e.stats.lowest_price) return [];
        return [{
          id:              `sg_${externalEventId}_0`,
          platform:        "seatgeek" as const,
          eventId:         generateEventId("sg", externalEventId),
          externalEventId,
          section:         "Various",
          row:             null,
          quantity:        2,
          pricePerTicket:  e.stats.lowest_price,
          totalPrice:      e.stats.lowest_price * 2,
          currency:        "USD",
          buyUrl:          e.url,
          listingFetchedAt: new Date(),
          isVerified:      true,
          isMock:          false,
        }];
      }

      const data = await res.json();
      const listings = data.listings ?? [];

      return listings.slice(0, 30).map(
        (l: { id: number; section: string; row?: string; quantity: number; price: { amount: number } }, i: number) => ({
          id:              `sg_${externalEventId}_${i}`,
          platform:        "seatgeek" as const,
          eventId:         generateEventId("sg", externalEventId),
          externalEventId,
          section:         l.section ?? "General",
          row:             l.row ?? null,
          quantity:        l.quantity ?? 2,
          pricePerTicket:  l.price?.amount ?? 0,
          totalPrice:      (l.price?.amount ?? 0) * (l.quantity ?? 2),
          currency:        "USD",
          buyUrl:          `https://seatgeek.com/e/${externalEventId}`,
          listingFetchedAt: new Date(),
          isVerified:      true,
          isMock:          false,
        })
      );
    } catch (err) {
      console.error("[SeatGeek] getTickets error:", err);
      return [];
    }
  },
};
