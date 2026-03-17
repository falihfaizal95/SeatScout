import HeroSearch from "@/components/search/HeroSearch";
import { Search, BarChart3, Ticket, TrendingDown, SlidersHorizontal, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Search Your Event",
    description: "Enter the team, game, or event you want to attend. We'll instantly find all available listings.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Compare Prices",
    description: "View side-by-side prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in real-time.",
  },
  {
    icon: Ticket,
    number: "03",
    title: "Get Best Deal",
    description: "See the cheapest option highlighted in green. Click to purchase directly from the platform.",
  },
];

const MOCK_EVENTS = [
  {
    id: "tm_lakers_warriors",
    title: "Lakers vs Warriors",
    date: "March 25, 2026 · 7:30 PM",
    location: "Crypto.com Arena, Los Angeles",
    imageUrl: "https://images.unsplash.com/photo-1640862101983-9f7ef7fd7cc9?w=800&q=80",
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
    location: "AT&T Stadium, Dallas",
    imageUrl: "https://images.unsplash.com/photo-1663852914605-f5d7f50e7392?w=800&q=80",
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
    location: "Yankee Stadium, New York",
    imageUrl: "https://images.unsplash.com/photo-1763246168695-36dc30e507ab?w=800&q=80",
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

      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <div className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--green)] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--brand)] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--green)]/20 border border-[var(--green)]/30 rounded-full mb-6">
              <span className="size-2 bg-[var(--green)] rounded-full animate-pulse" />
              <span className="text-[var(--green)] text-sm font-medium">Compare prices across 4+ platforms instantly</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find the Best
              <span className="block bg-gradient-to-r from-[var(--green)] to-emerald-400 bg-clip-text text-transparent">
                Seat Deals
              </span>
            </h1>

            <p className="text-xl text-[var(--text-2)] mb-12 max-w-2xl mx-auto">
              Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place. Never overpay for seats again.
            </p>

            <HeroSearch />

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "1M+", label: "Tickets Compared" },
                { value: "4", label: "Platforms" },
                { value: "$2.5M", label: "Total Saved" },
                { value: "50K+", label: "Happy Users" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-[var(--text-2)] text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. HOW IT WORKS ───────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[var(--bg-1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[var(--green)]/[0.08] border border-[var(--green)]/25 rounded-full mb-4">
              <span className="text-[var(--green)] text-sm font-semibold">HOW IT WORKS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three Simple Steps to Save
            </h2>
            <p className="text-xl text-[var(--text-2)] max-w-2xl mx-auto">
              Finding the best ticket prices has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-[var(--green)]/30 to-transparent z-10" />
                  )}
                  <div className="relative bg-[var(--bg)] p-8 rounded-2xl border border-white/[0.07] hover:shadow-xl hover:border-white/[0.14] transition-all duration-300 group overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-8xl font-bold text-[var(--green)]/[0.07] group-hover:text-[var(--green)]/[0.12] transition-colors select-none leading-none">
                      {step.number}
                    </div>
                    <div className="relative">
                      <div className="inline-flex p-4 bg-[var(--green)] rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="size-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-[var(--text-2)] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--green)]/[0.08] border border-[var(--green)]/25 rounded-xl">
              <span className="text-[var(--green)] font-semibold">💰 Average savings:</span>
              <span className="text-2xl font-bold text-[var(--green)]">$47 per ticket</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. UPCOMING EVENTS ────────────────────────────────────── */}
      <section id="results" className="py-24 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Upcoming Events</h2>
              <p className="text-[var(--text-2)]">
                Showing <span className="font-semibold text-white">3 results</span> · Updated 2 min ago
              </p>
            </div>
            <button className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-medium text-[var(--text-1)] transition-all">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_EVENTS.map((event) => {
              const lowestPrice = Math.min(...event.prices.map((p) => p.price));
              const highestPrice = Math.max(...event.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;

              return (
                <div
                  key={event.id}
                  className="bg-[var(--bg-1)] rounded-2xl border border-white/[0.07] overflow-hidden hover:shadow-2xl hover:shadow-black/40 hover:border-white/[0.14] transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--green)] text-white rounded-full flex items-center gap-1 text-sm font-semibold">
                      <TrendingDown className="size-4" />
                      Save ${savings}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--green)] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center gap-2 text-[var(--text-2)] text-sm">
                        <Calendar className="size-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-2)] text-sm">
                        <MapPin className="size-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-xs text-[var(--text-3)] uppercase tracking-wide font-semibold px-2">
                        <span>Platform</span>
                        <span>Price</span>
                      </div>
                      {event.prices.map((p) => {
                        const isBest = p.price === lowestPrice;
                        return (
                          <div
                            key={p.platform}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                              isBest
                                ? "bg-[var(--green)]/10 border-2 border-[var(--green)]"
                                : "bg-white/[0.03] border border-white/[0.07]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${isBest ? "text-[var(--green)]" : "text-[var(--text-2)]"}`}>
                                {p.platform}
                              </span>
                              {isBest && (
                                <span className="px-2 py-0.5 bg-[var(--green)] text-white text-xs rounded-full font-semibold">
                                  BEST
                                </span>
                              )}
                            </div>
                            <div className={`text-lg font-bold ${isBest ? "text-[var(--green)]" : "text-white"}`}>
                              ${p.price}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Link
                      href={`/event/${event.id}`}
                      className="w-full h-12 bg-[var(--green)] hover:bg-[#16a34a] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Best Deal</span>
                      <ExternalLink className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 h-12 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-sm font-semibold text-[var(--text-1)] transition-all"
            >
              Load More Events
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
