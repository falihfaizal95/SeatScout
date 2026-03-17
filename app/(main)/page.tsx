import HeroSearch from "@/components/search/HeroSearch";
import { Search, TrendingDown, Tag, SlidersHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Search Any Event",
    desc: "Type a team name, artist, or event. We instantly search across all major ticket platforms.",
  },
  {
    n: "02",
    icon: TrendingDown,
    title: "Compare All Prices",
    desc: "See prices from Ticketmaster, StubHub, SeatGeek, and more — all side by side.",
  },
  {
    n: "03",
    icon: Tag,
    title: "Buy at the Best Price",
    desc: "Click through to purchase directly on the platform with the lowest price. Zero markup.",
  },
];

const MOCK_EVENTS = [
  {
    id: "tm_lakers_celtics",
    title: "Los Angeles Lakers vs Boston Celtics",
    date: "Sat, Mar 22 · 7:30 PM",
    venue: "Crypto.com Arena",
    city: "Los Angeles, CA",
    save: "$47",
    gradient: "from-[#5452c8] to-[#1a1a3e]",
    prices: [
      { platform: "TickPick", price: "$89", best: true },
      { platform: "SeatGeek", price: "$112" },
      { platform: "StubHub", price: "$136" },
    ],
  },
  {
    id: "tm_yankees_redsox",
    title: "New York Yankees vs Boston Red Sox",
    date: "Sun, Mar 23 · 1:05 PM",
    venue: "Yankee Stadium",
    city: "New York, NY",
    save: "$31",
    gradient: "from-[#1a3a5c] to-[#0d1f30]",
    prices: [
      { platform: "Gametime", price: "$64", best: true },
      { platform: "Ticketmaster", price: "$79" },
      { platform: "Vivid Seats", price: "$95" },
    ],
  },
  {
    id: "tm_chiefs_ravens",
    title: "Kansas City Chiefs vs Baltimore Ravens",
    date: "Mon, Mar 24 · 8:15 PM",
    venue: "Arrowhead Stadium",
    city: "Kansas City, MO",
    save: "$62",
    gradient: "from-[#5c1a1a] to-[#2a0d0d]",
    prices: [
      { platform: "TickPick", price: "$118", best: true },
      { platform: "SeatGeek", price: "$145" },
      { platform: "StubHub", price: "$180" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center hero-grid overflow-hidden px-5 pt-24 pb-16">
        {/* Ambient glow orbs */}
        <div className="orb w-[700px] h-[700px] bg-[var(--brand)] opacity-[0.07] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="orb w-[400px] h-[400px] bg-purple-500 opacity-[0.04] top-1/4 left-1/3" />
        <div className="orb w-[300px] h-[300px] bg-indigo-400 opacity-[0.04] bottom-1/4 right-1/4" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[var(--bg)] pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[var(--text-2)] text-[13px] font-medium mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            Compare prices across 4+ platforms instantly
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.0] tracking-[-0.04em] mb-6">
            <span className="block text-[clamp(3rem,8vw,6rem)] text-white mb-1">
              Find the Best
            </span>
            <span className="block text-[clamp(3rem,8vw,6rem)] text-chrome">
              Seat Deals
            </span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.15rem)] text-[var(--text-2)] max-w-xl mx-auto leading-relaxed mb-10">
            Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place.
            Never overpay for seats again.
          </p>

          <HeroSearch />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 animate-bounce">
          <div className="w-px h-8 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="py-24 px-5 bg-[var(--bg-1)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Section pill */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] text-[var(--brand-light)] text-[11px] font-bold uppercase tracking-[0.15em] mb-5">
              How It Works
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-black tracking-tight text-white mb-3">
              Three Simple Steps to Save
            </h2>
            <p className="text-[var(--text-2)] text-base max-w-md mx-auto">
              Finding the best ticket prices has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative p-8 rounded-2xl border border-white/[0.07] bg-[var(--bg)] hover:border-white/[0.13] transition-all overflow-hidden"
              >
                {/* Large watermark number */}
                <span className="text-[96px] font-black text-white/[0.04] absolute -top-2 right-4 leading-none select-none">
                  {s.n}
                </span>

                {/* Green icon */}
                <div className="w-12 h-12 rounded-xl bg-[var(--green)]/10 border border-[var(--green)]/20 flex items-center justify-center mb-6">
                  <s.icon size={22} className="text-[var(--green)]" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white mb-1">Upcoming Events</h2>
              <p className="text-sm text-[var(--text-2)]">
                Showing {MOCK_EVENTS.length} results · Updated 2 min ago
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-[var(--text-1)] transition-all">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* 3-col event grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {MOCK_EVENTS.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="group rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] hover:border-white/[0.15] transition-all overflow-hidden flex flex-col"
              >
                {/* Venue photo / gradient */}
                <div className={`relative h-40 bg-gradient-to-br ${event.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Save badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--green)] text-white text-xs font-bold shadow-lg">
                    Save {event.save}
                  </div>
                </div>

                {/* Event info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-white leading-snug mb-1 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[var(--text-2)] mb-0.5">{event.date}</p>
                  <p className="text-xs text-[var(--text-3)] mb-4">{event.venue} · {event.city}</p>

                  {/* Platform price rows */}
                  <div className="mt-auto space-y-1.5">
                    {event.prices.map((p) => (
                      <div
                        key={p.platform}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
                          p.best
                            ? "bg-[var(--green)]/10 border border-[var(--green)]/20"
                            : "bg-white/[0.03] border border-white/[0.05]"
                        }`}
                      >
                        <span className={p.best ? "text-[var(--green)] font-semibold" : "text-[var(--text-2)]"}>
                          {p.platform}
                          {p.best && <span className="ml-1.5 text-[10px] opacity-70">Best</span>}
                        </span>
                        <span className={`font-bold ${p.best ? "text-[var(--green)]" : "text-[var(--text-1)]"}`}>
                          {p.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-semibold text-[var(--text-1)] transition-all"
            >
              Load More Events
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-white/[0.1] overflow-hidden p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-2)] via-[var(--bg-1)] to-[var(--bg)]" />
            <div className="orb w-80 h-80 bg-[var(--brand)] opacity-[0.12] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight text-white mb-4">
                Stop overpaying for tickets.
              </h2>
              <p className="text-[var(--text-2)] mb-8 text-base max-w-md mx-auto">
                Search any game and compare every price across every platform — in seconds.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white font-bold text-base transition-all glow-brand"
              >
                Find tickets now
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
