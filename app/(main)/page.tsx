import HeroSearch from "@/components/search/HeroSearch";
import { Search, BarChart3, Ticket, TrendingDown, SlidersHorizontal, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getUpcomingPopularEvents } from "@/lib/upcomingEvents";

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

export default async function HomePage() {
  const upcomingEvents = await getUpcomingPopularEvents(3);

  return (
    <div className="w-full flex flex-col min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#112240] to-[#0a1628]">
          {/* decorative orbs */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-green-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 text-center sm:px-6 sm:pb-32 sm:pt-44 lg:px-8">
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-5 py-2.5">
              <span className="size-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-400">Compare prices across 4+ platforms instantly</span>
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Find the Best
              <span className="mt-2 block text-gradient-green">Seat Deals</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place. Never overpay for seats again.
            </p>

            <div className="mt-12">
              <HeroSearch />
            </div>

            {/* stats */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "1M+", label: "Tickets Compared" },
                { value: "4", label: "Platforms" },
                { value: "$2.5M", label: "Total Saved" },
                { value: "50K+", label: "Happy Users" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-white md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="w-full bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-block rounded-full border border-green-200 bg-green-50 px-4 py-2 mb-4">
              <span className="text-sm font-semibold text-green-600">HOW IT WORKS</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Three Simple Steps to Save
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Finding the best ticket prices has never been easier
            </p>
          </div>

          <div className="relative grid gap-8 lg:grid-cols-3">
            {/* connector line */}
            <div className="absolute left-[16.5%] right-[16.5%] top-[52px] hidden h-px bg-gradient-to-r from-green-200 via-green-300 to-transparent lg:block" />

            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="group relative">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 transition-all duration-300 hover:shadow-xl">
                    <div className="absolute -right-4 -top-4 text-[80px] font-bold leading-none text-green-50 transition-colors group-hover:text-green-100">
                      {step.number}
                    </div>
                    <div className="relative">
                      <div className="mb-6 inline-flex rounded-2xl bg-green-500 p-4 transition-transform group-hover:scale-110">
                        <Icon className="size-8 text-white" />
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="leading-relaxed text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-6 py-3">
              <span className="font-semibold text-green-600">💰 Average savings:</span>
              <span className="text-2xl font-bold text-green-600">$47 per ticket</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <section id="results" className="w-full bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">Upcoming Events</h2>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold text-gray-900">{upcomingEvents.length} popular events</span> in the next 2 days · Live prices
              </p>
            </div>
            <button className="inline-flex h-11 items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const lowestPrice = Math.min(...event.prices.map((p) => p.price));
              const highestPrice = Math.max(...event.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;

              return (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {event.sport}
                    </div>
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      <TrendingDown className="size-3" />
                      Save ${savings}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-green-600">
                      {event.title}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                        <span>Platform</span>
                        <span>Price</span>
                      </div>
                      <div className="space-y-1.5">
                        {event.prices.map((p) => {
                          const isBest = p.price === lowestPrice;
                          return (
                            <div
                              key={p.platform}
                              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                                isBest
                                  ? "border border-green-500 bg-green-50"
                                  : "border border-gray-100 bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${isBest ? "text-green-600" : "text-gray-700"}`}>
                                  {p.platform}
                                </span>
                                {isBest && (
                                  <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                    BEST
                                  </span>
                                )}
                              </div>
                              <div className={`text-base font-bold tracking-tight ${isBest ? "text-green-600" : "text-gray-900"}`}>
                                ${p.price}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {event.tmUrl ? (
                      <a
                        href={event.tmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-500 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                      >
                        <span>View Best Deal</span>
                        <ExternalLink className="size-4" />
                      </a>
                    ) : (
                      <Link
                        href={`/event/${event.id}`}
                        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-500 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                      >
                        <span>View Best Deal</span>
                        <ExternalLink className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/search"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
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
