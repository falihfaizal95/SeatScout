import HeroSearch from "@/components/search/HeroSearch";
import LocalEventDate from "@/components/ui/LocalEventDate";
import { Search, BarChart3, Ticket, SlidersHorizontal, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getUpcomingPopularEvents } from "@/lib/upcomingEvents";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Search Your Event",
    description: "Enter the team, game, or event you want to attend. We'll instantly find all available listings across every major platform.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Compare Prices",
    description: "View side-by-side prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in real-time — all in one place.",
  },
  {
    icon: Ticket,
    number: "03",
    title: "Get Best Deal",
    description: "See the cheapest option highlighted in green. Click to purchase directly from the platform with confidence.",
  },
];

const STATS = [
  { value: "1M+",  label: "Tickets Compared" },
  { value: "4",    label: "Platforms" },
  { value: "$2.5M", label: "Total Saved" },
  { value: "50K+", label: "Happy Users" },
];

export default async function HomePage() {
  const upcomingEvents = await getUpcomingPopularEvents(3);

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-[100px] pt-[140px] text-center">
        {/* Animated floating purple orb */}
        <div
          className="orb-float pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,106,247,0.22) 0%, transparent 65%)", zIndex: 0 }}
        />

        {/* Centered content column — max 1200px */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 sm:px-[60px]">

          {/* Badge */}
          <div className="fade-up-0 mb-9 inline-flex items-center gap-2 rounded-full border border-[rgba(124,106,247,0.3)] bg-[var(--brand-dim)] px-4 py-[7px] text-[13px] font-[500] tracking-[0.3px] text-[var(--brand-light)]">
            <span className="text-[10px]">✦</span>
            Compare prices across 4+ platforms instantly
          </div>

          {/* H1 */}
          <h1 className="font-syne fade-up-1 mx-auto mb-7 max-w-[900px] text-[clamp(48px,7vw,88px)] font-[800] leading-[1.05] tracking-[-2px]">
            Find the <em className="not-italic text-[var(--brand-light)]">Best</em><br />
            Seat Deals
          </h1>

          {/* Subtext */}
          <p className="fade-up-2 mx-auto mb-[52px] max-w-[520px] text-[18px] leading-[1.7] text-[var(--text-2)]">
            Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place. Never overpay for seats again.
          </p>

          {/* Search + popular tags (centered, max 560px) */}
          <div className="fade-up-3 flex w-full flex-col items-center">
            <HeroSearch />
          </div>

          {/* Stats bar — 40px below popular tags */}
          <div className="mx-auto mt-[48px] flex w-full max-w-[900px]">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-1 flex-col items-center justify-center border border-[var(--card-border)] bg-[var(--card)] px-8 py-10 text-center
                  ${i === 0 ? "rounded-l-2xl" : "border-l-0"}
                  ${i === STATS.length - 1 ? "rounded-r-2xl" : ""}`}
              >
                <div className="font-syne mb-1.5 text-[36px] font-[800] leading-none text-[var(--text-1)]">
                  {stat.value}
                </div>
                <div className="text-[13px] text-[var(--text-2)]">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-[var(--bg-1)] py-[100px]">
        {/* Centered content — max 1200px */}
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 sm:px-[60px]">

          <div className="section-tag w-full text-center">HOW IT WORKS</div>
          <h2 className="section-title mx-auto w-full max-w-[700px] text-center" style={{ fontSize: "clamp(35px,4.4vw,55px)" }}>Three Simple Steps to Save</h2>
          <p className="section-sub mx-auto w-full text-center" style={{ marginBottom: "72px" }}>
            Finding the best ticket prices has never been easier
          </p>

          <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-8 lg:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative overflow-hidden rounded-[20px] border border-[var(--card-border)] bg-[var(--card)] p-[48px_36px] text-left transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(124,106,247,0.3)]"
                >
                  {/* Ghost number watermark */}
                  <div className="font-syne pointer-events-none absolute bottom-5 right-6 select-none text-[72px] font-[800] leading-none text-[rgba(124,106,247,0.08)]">
                    {step.number}
                  </div>

                  {/* Icon — centered */}
                  <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-[14px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)]">
                    <Icon className="size-6 text-[var(--brand-light)]" />
                  </div>

                  <h3 className="font-syne relative mb-4 text-[20px] font-[700] tracking-[-0.3px] text-[var(--text-1)]">
                    {step.title}
                  </h3>
                  <p className="relative text-[14px] leading-[1.75] text-[var(--text-2)]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Savings pill */}
          <div className="mt-[60px] inline-flex items-center gap-[10px] rounded-full border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-6 py-3 text-[15px] font-[600] text-[var(--green)]">
            💰 Average savings: <strong>$47 per ticket</strong>
          </div>

        </div>
      </section>

      {/* ── Events ───────────────────────────────────────────────────── */}
      <section id="results" className="bg-[var(--bg)] py-[100px]">
        {/* Centered content — max 1200px */}
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-[60px]">

          {/* Header */}
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="section-tag">UPCOMING EVENTS</div>
              <h2 className="section-title">Popular Events Near You</h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>
                {upcomingEvents.length} popular events in the next 2 days · Live prices
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-[8px] border border-[var(--card-border)] bg-[var(--card)] px-5 py-[10px] text-[14px] text-[var(--text-2)] transition-all hover:border-[rgba(255,255,255,0.15)] hover:text-[var(--text-1)]">
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>

          {/* Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const lowestPrice = Math.min(...event.prices.map((p) => p.price));
              const highestPrice = Math.max(...event.prices.map((p) => p.price));
              const savings = highestPrice - lowestPrice;

              return (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-[20px] border border-[var(--card-border)] bg-[var(--card)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(124,106,247,0.25)]"
                >
                  {/* Image */}
                  <div className="h-[180px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-[28px]">
                    {/* Save badge */}
                    <div className="mb-4 inline-block rounded-full border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-3 py-[4px] text-[12px] font-[600] text-[var(--green)]">
                      Save ${savings}
                    </div>

                    <h3 className="font-syne mb-2 text-[18px] font-[700] tracking-[-0.3px] text-[var(--text-1)]">
                      {event.title}
                    </h3>

                    <div className="mb-6 text-[13px] leading-[1.7] text-[var(--text-2)]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 shrink-0" />
                        <LocalEventDate isoDate={event.isoDate} />
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <MapPin className="size-3.5 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Price table */}
                    <table className="mb-6 w-full border-collapse text-[13px]">
                      <tbody>
                        {event.prices.map((p) => {
                          const isBest = p.price === lowestPrice;
                          return (
                            <tr
                              key={p.platform}
                              className={`border-b border-[var(--card-border)] last:border-0 ${isBest ? "text-[var(--green)]" : ""}`}
                            >
                              <td className="py-[10px]">
                                {p.platform}
                                {isBest && (
                                  <span className="ml-1.5 rounded-[4px] bg-[var(--green-dim)] px-[7px] py-[2px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[var(--green)]">
                                    Best
                                  </span>
                                )}
                              </td>
                              <td className="py-[10px] text-right font-[500]">${p.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* View button */}
                    {event.tmUrl ? (
                      <a
                        href={event.tmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-3 text-center text-[14px] font-[600] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
                      >
                        View Best Deal
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={`/event/${event.id}`}
                        className="block w-full rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-3 text-center text-[14px] font-[600] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
                      >
                        View Best Deal
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load more */}
          <div className="mt-10 text-center">
            <Link
              href="/search"
              className="inline-flex h-12 items-center gap-2 rounded-[8px] border border-[var(--card-border)] bg-[var(--card)] px-6 text-[14px] font-[600] text-[var(--text-2)] transition-all hover:border-[rgba(255,255,255,0.15)] hover:text-[var(--text-1)]"
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
