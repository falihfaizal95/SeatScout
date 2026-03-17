import HeroSearch from "@/components/search/HeroSearch";
import { Zap, Shield, TrendingDown, Star, ArrowRight } from "lucide-react";
import { PLATFORM_INFO } from "@/types/ticket";
import Link from "next/link";

const PLATFORMS = Object.values(PLATFORM_INFO);

const FEATURES = [
  {
    icon: Zap,
    title: "Real-time comparison",
    desc: "Every major platform scanned simultaneously. You always see the most current prices.",
    accent: "#f59e0b",
  },
  {
    icon: TrendingDown,
    title: "Always the lowest price",
    desc: "Listings ranked cheapest first. The best seat at the best price — instantly surfaced.",
    accent: "#22c55e",
  },
  {
    icon: Shield,
    title: "Zero markup. Ever.",
    desc: "We never touch the price. Click through to buy directly on the original platform.",
    accent: "#6d6ae8",
  },
];

const TESTIMONIALS = [
  {
    text: "Saved $180 on Lakers tickets in under 30 seconds. This is exactly what was missing.",
    author: "Marcus T.",
    sport: "NBA fan",
    saved: "$180",
  },
  {
    text: "Found playoff tickets $60 cheaper than what I was about to pay on Ticketmaster.",
    author: "Sarah K.",
    sport: "NFL fan",
    saved: "$60",
  },
  {
    text: "My go-to before buying any sports ticket. The comparison view is incredibly clean.",
    author: "Jordan M.",
    sport: "MLB fan",
    saved: "$95",
  },
];

const STEPS = [
  { n: "01", title: "Search any game", desc: "Type a team, event, or sport. We find everything." },
  { n: "02", title: "Compare all prices", desc: "7+ platforms pulled in parallel, ranked cheapest first." },
  { n: "03", title: "Buy on the original site", desc: "Click through. You pay the platform directly." },
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

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[var(--bg)] pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[var(--text-2)] text-[13px] font-medium mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            Live prices from 7+ platforms
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.0] tracking-[-0.04em] mb-6">
            <span className="block text-[clamp(3rem,8vw,6rem)] text-white mb-1">
              Find the cheapest
            </span>
            <span className="block text-[clamp(3rem,8vw,6rem)] text-chrome">
              seat in the house.
            </span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[var(--text-2)] max-w-xl mx-auto leading-relaxed mb-10">
            We compare Ticketmaster, StubHub, SeatGeek, Vivid Seats, AXS and more —
            and surface the best deal in seconds.
          </p>

          <HeroSearch />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 animate-bounce">
          <div className="w-px h-8 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </section>

      {/* ── Platforms ticker ─────────────────────────────────────── */}
      <section className="py-14 border-y border-white/[0.06] overflow-hidden">
        <p className="text-center text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-[0.2em] mb-8">
          Comparing prices across
        </p>
        <div className="flex flex-wrap justify-center gap-3 px-5 max-w-4xl mx-auto">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.12] transition-all"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-sm font-semibold text-[var(--text-1)]">{p.name}</span>
            </div>
          ))}
          <div className="flex items-center px-4 py-2 rounded-xl border border-dashed border-white/[0.07] text-[var(--text-3)] text-sm">
            + more
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold text-[var(--brand-light)] uppercase tracking-[0.2em] mb-3">
              How it works
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white">
              Three steps to the best seat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="relative p-8 bg-[var(--bg-1)] hover:bg-[var(--bg-2)] transition-colors"
              >
                <span className="text-[80px] font-black text-white/[0.03] absolute top-4 right-6 leading-none select-none">
                  {s.n}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[var(--brand)]/10 border border-[var(--brand)]/20 flex items-center justify-center mb-5">
                  <span className="text-sm font-bold text-[var(--brand-light)]">{parseInt(s.n)}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section className="py-24 px-5 bg-[var(--bg-1)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold text-[var(--brand-light)] uppercase tracking-[0.2em] mb-3">
              Why SeatScout
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white">
              Built for real fans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group p-7 rounded-2xl border border-white/[0.07] bg-[var(--bg)] hover:border-white/[0.12] transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}30` }}
                >
                  <f.icon size={20} style={{ color: f.accent }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-white">
              Fans save every day
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-white/[0.07] bg-[var(--bg-1)] hover:border-white/[0.12] transition-all"
              >
                {/* Savings badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--green)]/10 border border-[var(--green)]/20 text-[var(--green)] text-xs font-bold mb-4">
                  Saved {t.saved}
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-2)] leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-[var(--text-3)]">{t.sport}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-white/[0.1] overflow-hidden p-12 text-center">
            {/* Background */}
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
