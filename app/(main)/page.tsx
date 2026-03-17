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
      <section className="relative overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-[var(--green)]/14 blur-[120px]" />
          <div className="absolute right-[10%] top-16 h-96 w-96 rounded-full bg-[var(--brand)]/14 blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(20,33,58,0.94),rgba(11,16,30,0.98))] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-10 md:py-28">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--green)]/30 bg-[var(--green)]/12 px-5 py-3 text-sm font-semibold text-[var(--green)] shadow-[0_0_0_1px_rgba(34,197,94,0.08)]">
              <span className="size-2.5 rounded-full bg-[var(--green)]" />
              Compare prices across 4+ platforms instantly
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
              Find the Best
              <span className="mt-2 block text-gradient-green">Seat Deals</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[var(--text-2)] sm:text-xl">
              Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place. Never overpay for seats again.
            </p>

            <div className="mt-12">
              <HeroSearch />
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
              {[
                { value: "1M+", label: "Tickets Compared" },
                { value: "4", label: "Platforms" },
                { value: "$2.5M", label: "Total Saved" },
                { value: "50K+", label: "Happy Users" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-6 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-white md:text-4xl">{s.value}</div>
                  <div className="mt-2 text-sm text-[var(--text-2)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] rounded-[32px] border border-white/[0.06] bg-[var(--bg-1)]/88 px-6 py-16 shadow-[0_24px_64px_rgba(0,0,0,0.28)] sm:px-10">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[var(--green)]/25 bg-[var(--green)]/[0.08] px-4 py-2 text-sm font-semibold text-[var(--green)]">
              HOW IT WORKS
            </div>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
              Three Simple Steps to Save
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-2)] md:text-xl">
              Finding the best ticket prices has never been easier
            </p>
          </div>

          <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
            <div className="absolute left-[16.5%] right-[16.5%] top-24 hidden h-px bg-gradient-to-r from-transparent via-[var(--green)]/18 to-transparent lg:block" />
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                >
                  <div className="absolute right-6 top-2 text-[96px] font-bold leading-none tracking-[-0.06em] text-[var(--green)]/[0.08]">
                    {step.number}
                  </div>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="inline-flex size-22 items-center justify-center rounded-[24px] bg-[var(--green)] shadow-[0_18px_36px_rgba(34,197,94,0.2)]">
                      <Icon className="size-10 text-white" />
                    </div>
                    <h3 className="mt-10 text-3xl font-bold tracking-[-0.03em] text-white">{step.title}</h3>
                    <p className="mt-6 max-w-sm text-lg leading-9 text-[var(--text-2)]">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--green)]/30 bg-[var(--green)]/10 px-7 py-4">
              <span className="text-lg">💰</span>
              <span className="text-xl font-semibold text-[var(--green)]">Average savings:</span>
              <span className="text-3xl font-bold tracking-[-0.03em] text-[var(--green)]">$47 per ticket</span>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] rounded-[32px] border border-white/[0.06] bg-[var(--bg-1)]/92 px-6 py-14 shadow-[0_24px_64px_rgba(0,0,0,0.3)] sm:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">Upcoming Events</h2>
              <p className="mt-3 text-lg text-[var(--text-2)]">
                Showing <span className="font-semibold text-white">3 results</span> · Updated 2 min ago
              </p>
            </div>
            <button className="inline-flex h-11 items-center gap-2 self-start rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 text-sm font-semibold text-[var(--text-1)] transition-colors hover:bg-white/[0.07]">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-3">
            {MOCK_EVENTS.map((event) => {
              const lowestPrice = Math.min(...event.prices.map((p) => p.price));
              const highestPrice = Math.max(...event.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;

              return (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] shadow-[0_22px_50px_rgba(0,0,0,0.26)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_28px_60px_rgba(0,0,0,0.34)]"
                >
                  <div className="relative h-60 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,12,0.1)] to-transparent" />
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[var(--green)] px-4 py-2 text-base font-semibold text-white shadow-[0_16px_30px_rgba(34,197,94,0.22)]">
                      <TrendingDown className="size-4" />
                      Save ${savings}
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-[38px] font-bold tracking-[-0.04em] text-white transition-colors group-hover:text-[var(--green)] md:text-[42px] lg:text-[32px]">
                      {event.title}
                    </h3>

                    <div className="mt-4 space-y-3 text-[17px] text-[var(--text-2)]">
                      <div className="flex items-center gap-3">
                        <Calendar className="size-5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="size-5" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="mb-3 flex items-center justify-between px-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
                        <span>Platform</span>
                        <span>Price</span>
                      </div>
                      <div className="space-y-3">
                        {event.prices.map((p) => {
                          const isBest = p.price === lowestPrice;
                          return (
                            <div
                              key={p.platform}
                              className={`flex items-center justify-between rounded-2xl px-4 py-4 transition-colors ${
                                isBest
                                  ? "border border-[var(--green)] bg-[var(--green)]/12"
                                  : "border border-white/[0.08] bg-white/[0.03]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`text-[15px] font-semibold ${isBest ? "text-[var(--green)]" : "text-[var(--text-1)]"}`}>
                                  {p.platform}
                                </span>
                                {isBest && (
                                  <span className="rounded-full bg-[var(--green)] px-2.5 py-1 text-xs font-bold text-white">
                                    BEST
                                  </span>
                                )}
                              </div>
                              <div className={`text-2xl font-bold tracking-[-0.03em] ${isBest ? "text-[var(--green)]" : "text-white"}`}>
                                ${p.price}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Link
                      href={`/event/${event.id}`}
                      className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--green)] text-lg font-semibold text-white transition-colors hover:bg-[#16a34a]"
                    >
                      <span>View Best Deal</span>
                      <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/search"
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-6 text-base font-semibold text-[var(--text-1)] transition-colors hover:bg-white/[0.07]"
            >
              Load More Events
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
