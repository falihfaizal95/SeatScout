# SeatScout

**The Kayak for sports tickets.** Compare prices across Ticketmaster, StubHub, SeatGeek, Vivid Seats, AXS, Gametime, and TickPick — and instantly find the cheapest seat for any game.

🌐 **Live:** [seatscout-build.vercel.app](https://seatscout-build.vercel.app)

---

## What it does

- **Search any game** — type a team, sport, or event and get results from all major platforms
- **Compare all prices** — 7+ ticket platforms aggregated and ranked cheapest first
- **Buy directly** — click any listing to go straight to the original platform, no markup
- **Price alerts** — get notified when a ticket drops below your target price *(coming soon)*
- **Save events** — bookmark games to track over time *(coming soon)*

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4, custom dark design system |
| Auth | Clerk (ready to wire) |
| Database | PostgreSQL via Supabase + Prisma ORM |
| Caching | Upstash Redis (in-memory fallback for dev) |
| Deployment | Vercel |
| Real APIs | Ticketmaster Discovery API, SeatGeek API |
| Mock adapters | StubHub, Vivid Seats, AXS, Gametime, TickPick |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/falihfaizal95/SeatScout.git
cd SeatScout
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Ticketmaster Discovery API — developer.ticketmaster.com
TICKETMASTER_API_KEY=

# SeatGeek API — seatgeek.com/account/develop
SEATGEEK_CLIENT_ID=

# PostgreSQL (Supabase, Railway, Neon, etc.)
DATABASE_URL=

# Redis cache — console.upstash.com (optional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Clerk auth — dashboard.clerk.com (optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### 3. Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
├── (main)/
│   ├── page.tsx              # Landing page
│   ├── search/               # Search results
│   ├── event/[eventId]/      # Event detail + ticket comparison
│   └── account/              # User dashboard
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
└── api/
    ├── events/search/        # GET — search events (TM + SeatGeek)
    ├── tickets/[eventId]/    # GET — aggregated ticket listings
    └── webhooks/clerk/       # Clerk user sync

lib/
├── adapters/
│   ├── ticketmaster.ts       # Real Ticketmaster Discovery API
│   ├── seatgeek.ts           # Real SeatGeek API
│   └── mocks.ts              # StubHub, Vivid Seats, AXS, Gametime, TickPick
├── aggregator.ts             # Promise.allSettled across all adapters
├── cache.ts                  # Redis + in-memory fallback
└── utils.ts
```

---

## How the aggregator works

```
User searches → /api/events/search
                      ↓
          Ticketmaster + SeatGeek (parallel)
                      ↓
              Merged, deduped, sorted by date

User opens event → /api/tickets/[eventId]
                          ↓
              Check Redis cache (5-min TTL)
                          ↓
         Promise.allSettled([
           ticketmaster, seatgeek,
           stubhub*, vividseats*, axs*,     (* = mock)
           gametime*, tickpick*
         ])
                          ↓
         Normalize → sort cheapest first → cache → return
```

---

## Roadmap

- [ ] Clerk authentication (DB schema ready)
- [ ] Save events / watchlist
- [ ] Price drop email alerts
- [ ] Real StubHub / Vivid Seats API
- [ ] Price history charts
- [ ] Mobile app

---

## License

MIT
