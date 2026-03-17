import HeroSearch from "@/components/search/HeroSearch";
import { Ticket, Zap, Shield, TrendingDown, Star, ChevronRight } from "lucide-react";
import { PLATFORM_INFO } from "@/types/ticket";

const PLATFORMS = Object.values(PLATFORM_INFO);

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time comparison",
    desc: "We scan every major ticketing platform simultaneously so you always see the freshest prices.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    icon: TrendingDown,
    title: "Always the lowest price",
    desc: "Our algorithm surfaces the cheapest available seat for any game, ranked from best deal to worst.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Shield,
    title: "Safe & transparent",
    desc: "We never mark up prices. You buy directly from the original platform — we just help you find the best deal.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
];

const TESTIMONIALS = [
  {
    text: "Saved $180 on Lakers tickets in 30 seconds. This is exactly what was missing.",
    author: "Marcus T.",
    sport: "NBA fan",
  },
  {
    text: "Found playoff tickets $60 cheaper than what I was about to pay on Ticketmaster.",
    author: "Sarah K.",
    sport: "NFL fan",
  },
  {
    text: "My go-to before buying any sports ticket. The comparison view is incredibly clean.",
    author: "Jordan M.",
    sport: "MLB fan",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6">
            <Ticket size={14} />
            Kayak, but for sports tickets
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Find the cheapest
            <br />
            <span className="gradient-text">seat in the house</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            We compare prices across every major ticketing platform — Ticketmaster, StubHub,
            SeatGeek, Vivid Seats, AXS, and more — and show you the best deal in seconds.
          </p>

          {/* Search */}
          <HeroSearch />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40">
          <div className="w-0.5 h-6 bg-[var(--text-muted)] rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-4 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest mb-8">
            Comparing prices across
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-soft"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {p.name}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] text-sm">
              + more coming
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Three steps to the best seat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Search any game", desc: "Type the team, event, or sport you're looking for. We'll find all upcoming games." },
              { step: "02", title: "Compare instantly", desc: "We pull listings from 7+ platforms simultaneously and rank them cheapest first." },
              { step: "03", title: "Buy directly", desc: "Click your preferred listing and you're taken straight to the official platform to purchase." },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                <span className="text-4xl font-black text-brand-100 dark:text-brand-900 absolute top-4 right-5">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">{parseInt(item.step)}</span>
                </div>
                <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-2">Why SeatScout</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Built for real fans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)]">
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">Fans save money every day</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.author}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t.sport}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-brand-lg">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to stop overpaying?
            </h2>
            <p className="text-brand-200 mb-8 text-lg">
              Search any game and see every ticket price side by side in seconds.
            </p>
            <a
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-bold text-lg hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl"
            >
              Find tickets now
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
