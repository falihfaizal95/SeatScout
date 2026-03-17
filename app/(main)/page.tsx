import HeroSearch from "@/components/search/HeroSearch";
import { Search, BarChart3, Ticket, TrendingDown, SlidersHorizontal, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Search Your Event",
    desc: "Enter the team, game, or event you want to attend. We'll instantly find all available listings.",
  },
  {
    n: "02",
    icon: BarChart3,
    title: "Compare Prices",
    desc: "View side-by-side prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in real-time.",
  },
  {
    n: "03",
    icon: Ticket,
    title: "Get Best Deal",
    desc: "See the cheapest option highlighted in green. Click to purchase directly from the platform.",
  },
];

const STATS = [
  { value: "1M+", label: "Tickets Compared" },
  { value: "4", label: "Platforms" },
  { value: "$2.5M", label: "Total Saved" },
  { value: "50K+", label: "Happy Users" },
];

const MOCK_EVENTS = [
  {
    id: "tm_lakers_warriors",
    title: "Lakers vs Warriors",
    date: "March 25, 2026 · 7:30 PM",
    venue: "Crypto.com Arena",
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1640862101983-9f7ef7fd7cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwZ2FtZSUyMGFyZW5hJTIwY3Jvd2R8ZW58MXx8fHwxNzczNzA4OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prices: [
      { platform: "Ticketmaster", price: 189 },
      { platform: "StubHub", price: 165 },
      { platform: "SeatGeek", price: 172 },
      { platform: "Vivid Seats", price: 179 },
    ],
  },
  {
    id: "tm_cowboys_eagles",
    title: "Cowboys vs Eagles",
    date: "April 2, 2026 · 1:00 PM",
    venue: "AT&T Stadium",
    location: "Dallas, TX",
    imageUrl: "https://images.unsplash.com/photo-1663852914605-f5d7f50e7392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBzcG9ydHN8ZW58MXx8fHwxNzczNzE4NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    prices: [
      { platform: "Ticketmaster", price: 245 },
      { platform: "StubHub", price: 228 },
      { platform: "SeatGeek", price: 239 },
      { platform: "Vivid Seats", price: 235 },
    ],
  },
  {
    id: "tm_yankees_redsox",
    title: "Yankees vs Red Sox",
    date: "April 10, 2026 · 7:05 PM",
    venue: "Yankee Stadium",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1763246168695-36dc30e507ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMHN0YWRpdW0lMjBuaWdodCUyMGdhbWV8ZW58MXx8fHwxNzczNzE4NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    prices: [
      { platform: "Ticketmaster", price: 156 },
      { platform: "StubHub", price: 142 },
      { platform: "SeatGeek", price: 138 },
      { platform: "Vivid Seats", price: 149 },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--green)]/30 bg-[var(--green)]/[0.1] text-[var(--green)] text-[13px] font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
            Compare prices across 4+ platforms instantly
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.05] tracking-[-0.04em] mb-6">
            <span className="block text-[clamp(3rem,8vw,6rem)] text-white mb-1">
              Find the Best
            </span>
            <span className="block text-[clamp(3rem,8vw,6rem)]" style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #4ade80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Seat Deals
            </span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[var(--text-2)] max-w-2xl mx-auto leading-relaxed mb-10">
            Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place.
            Never overpay for seats again.
          </p>

          <HeroSearch />

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</div>
                <div className="text-sm text-[var(--text-2)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 animate-bounce">
          <div className="w-px h-8 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-5 bg-[var(--bg-1)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--green)]/30 bg-[var(--green)]/[0.08] text-[var(--green)] text-[11px] font-bold uppercase tracking-[0.15em] mb-5">
              How It Works
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-black tracking-tight text-white mb-3">
              Three Simple Steps to Save
            </h2>
            <p className="text-[var(--text-2)] text-base max-w-md mx-auto">
              Finding the best ticket prices has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {STEPS.map((s, index) => (
              <div key={s.n} className="relative">
                {/* Connector line between cards (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-[var(--green)]/30 to-transparent z-10" />
                )}

                <div className="relative p-8 rounded-2xl border border-white/[0.07] bg-[var(--bg)] hover:border-white/[0.13] hover:shadow-[0_0_30px_rgba(34,197,94,0.06)] transition-all overflow-hidden group">
                  {/* Large watermark number */}
                  <span className="text-[96px] font-black text-white/[0.04] absolute -top-2 right-4 leading-none select-none group-hover:text-white/[0.06] transition-colors">
                    {s.n}
                  </span>

                  {/* Solid green icon box */}
                  <div className="inline-flex p-4 bg-[var(--green)] rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <s.icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-[var(--text-2)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Average savings badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--green)]/20 bg-[var(--green)]/[0.08]">
              <span className="text-[var(--green)] font-semibold text-sm">💰 Average savings:</span>
              <span className="text-2xl font-black text-[var(--green)]">$47 per ticket</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────── */}
      <section id="results" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-1">Upcoming Events</h2>
              <p className="text-sm text-[var(--text-2)]">
                Showing <span className="font-semibold text-[var(--text-1)]">3 results</span> · Updated 2 min ago
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-[var(--text-1)] transition-all">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* 3-col event grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {MOCK_EVENTS.map((event) => {
              const lowestPrice = Math.min(...event.prices.map((p) => p.price));
              const highestPrice = Math.max(...event.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;

              return (
                <div
                  key={event.id}
                  className="group rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] hover:border-white/[0.15] hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Venue photo */}
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Save badge */}
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--green)] text-white text-sm font-bold shadow-lg">
                      <TrendingDown size={14} />
                      Save ${savings}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[var(--green)] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[var(--text-2)] mb-0.5">{event.date}</p>
                    <p className="text-xs text-[var(--text-3)] mb-5">{event.venue} · {event.location}</p>

                    {/* Platform price comparison */}
                    <div className="mt-auto space-y-2 mb-4">
                      {/* Header row */}
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-3)] uppercase tracking-widest font-semibold px-1 mb-1">
                        <span>Platform</span>
                        <span>Price</span>
                      </div>

                      {event.prices.map((p) => {
                        const isBest = p.price === lowestPrice;
                        return (
                          <div
                            key={p.platform}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                              isBest
                                ? "bg-[var(--green)]/10 border-2 border-[var(--green)]/40"
                                : "bg-white/[0.03] border border-white/[0.06]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold ${isBest ? "text-[var(--green)]" : "text-[var(--text-2)]"}`}>
                                {p.platform}
                              </span>
                              {isBest && (
                                <span className="px-1.5 py-0.5 bg-[var(--green)] text-white text-[10px] rounded-full font-bold">
                                  BEST
                                </span>
                              )}
                            </div>
                            <span className={`text-sm font-black ${isBest ? "text-[var(--green)]" : "text-[var(--text-1)]"}`}>
                              ${p.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* View Best Deal button */}
                    <Link
                      href={`/event/${event.id}`}
                      className="w-full py-3 rounded-xl bg-[var(--green)] hover:bg-[#16a34a] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      View Best Deal
                      <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load more */}
          <div className="flex justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-semibold text-[var(--text-1)] transition-all"
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
