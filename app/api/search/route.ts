import { NextRequest, NextResponse } from "next/server";

const TM_BASE = "https://app.ticketmaster.com/discovery/v2";

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

function bestAttrImage(attr: TMAttr | undefined): string | undefined {
  if (!attr?.images?.length) return undefined;
  return [...attr.images].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q               = searchParams.get("q")                  ?? "";
  const page            = searchParams.get("page")               ?? "0";
  const classificationName = searchParams.get("classificationName") ?? "";

  if (!q.trim()) {
    return NextResponse.json({ events: [], total: 0 }, { status: 400 });
  }

  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Ticketmaster API key not configured" }, { status: 500 });
  }

  const url = new URL(`${TM_BASE}/events.json`);
  url.searchParams.set("keyword", q);
  url.searchParams.set("size",    "20");
  url.searchParams.set("page",        page);
  url.searchParams.set("apikey",      apiKey);
  if (classificationName) url.searchParams.set("classificationName", classificationName);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 120 } });
    if (!res.ok) throw new Error(`Ticketmaster API error: ${res.status}`);
    const data = await res.json();

    const rawEvents: TMRawEvent[] = data._embedded?.events ?? [];

    const events = rawEvents.map((e) => {
      const venue       = e._embedded?.venues?.[0];
      const attractions = e._embedded?.attractions ?? [];
      const cl          = e.classifications?.[0];
      const segment     = cl?.segment?.name ?? "Other";
      const genre       = cl?.genre?.name   ?? "";
      const isSpor      = segment === "Sports";

      // Best 16:9 image wider than 500px, fallback to largest available
      const image =
        e.images?.find((i) => i.ratio === "16_9" && i.width > 500)?.url ??
        [...(e.images ?? [])].sort((a, b) => b.width * b.height - a.width * a.height)[0]?.url;

      const dateStr =
        e.dates.start.dateTime ??
        `${e.dates.start.localDate}T${e.dates.start.localTime ?? "19:00:00"}`;

      // TM returns away team first in attractions array for sports
      const awayAttr = isSpor ? attractions[0] : undefined;
      const homeAttr = isSpor ? attractions[1] : undefined;

      return {
        id:            `tm_${e.id}`,
        name:          e.name,
        sport:         genre || segment,
        segment,
        league:        genre,
        homeTeam:      homeAttr?.name,
        awayTeam:      awayAttr?.name,
        homeTeamLogo:  bestAttrImage(homeAttr),
        awayTeamLogo:  bestAttrImage(awayAttr),
        venue:         venue?.name         ?? "TBD",
        city:          venue?.city?.name   ?? "",
        state:         venue?.state?.stateCode,
        country:       venue?.country?.countryCode ?? "US",
        eventDate:     dateStr,
        imageUrl:      image,
        lowestPrice:   e.priceRanges?.[0]?.min,
        averagePrice:  e.priceRanges?.[0]
          ? (e.priceRanges[0].min + e.priceRanges[0].max) / 2
          : undefined,
        url:           e.url,
        source:        "ticketmaster",
        externalIds:   { ticketmaster: e.id },
      };
    });

    return NextResponse.json({
      events,
      total:      data.page?.totalElements ?? events.length,
      page:       data.page?.number        ?? 0,
      totalPages: data.page?.totalPages    ?? 1,
    });
  } catch (err) {
    console.error("[/api/search] error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
