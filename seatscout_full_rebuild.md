# SeatScout — Complete Homepage Rebuild to Match Figma Design

I need you to completely rebuild my homepage so it matches my Figma design exactly in terms of layout, structure, and functionality. 

**THE ONLY RULE: Do NOT change any existing colors in my codebase. Keep every color value exactly as it currently is. Only update layout, structure, spacing, component organization, and functionality.**

My current live site (seatscout-build.vercel.app) has the wrong layout. The Figma design is the source of truth. Below is the exact code for every component. Replace each file completely.

---

## STEP 1 — Update `src/app/App.tsx`

The page order must be exactly:
1. Navbar
2. Hero  
3. HowItWorks
4. Results (Upcoming Events with EventCards)
5. Footer

Remove ALL other sections (testimonials, "Why SeatScout", CTA banner, platform logos scroller).

```tsx
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Results } from './components/Results';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Results />
      <Footer />
    </div>
  );
}
```

---

## STEP 2 — Replace `src/app/components/Navbar.tsx`

**What changes from current site:**
- Remove "Find Tickets" and "Account" links
- Remove "Get started" button
- Add green Ticket icon square to logo
- Center nav links: How It Works, Compare Prices, FAQ
- Single "Sign In" button with green outline

```tsx
import { Ticket } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Ticket className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SeatScout</span>
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm">
              How It Works
            </a>
            <a href="#results" className="text-gray-300 hover:text-white transition-colors text-sm">
              Compare Prices
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm">
              FAQ
            </a>
          </div>

          {/* Sign In */}
          <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
```

---

## STEP 3 — Replace `src/app/components/Hero.tsx`

**What changes from current site:**
- Remove sport emoji chips (NFL, NBA, MLB, etc.)
- Remove "Trending:" section
- Remove platform logos scrolling section
- Remove "Live prices from 7+ platforms" badge
- Add animated green pill badge: "Compare prices across 4+ platforms instantly"
- New headline: "Find the Best" + "Seat Deals" (two lines, large)
- New subtext
- Taller search bar (h-14) inside frosted glass container
- Popular chips: Lakers, Yankees, Cowboys, Warriors (not sport types)
- Add 4-stat row at bottom: 1M+ Tickets Compared, 4 Platforms, $2.5M Total Saved, 50K+ Happy Users
- Search should navigate to /search route with query param

```tsx
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handlePopularSearch = (team: string) => {
    window.location.href = `/search?q=${encodeURIComponent(team)}`;
  };

  return (
    <div className="relative pt-16 bg-gradient-to-br from-[#0a1628] via-[#112240] to-[#0a1628] overflow-hidden min-h-screen flex items-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-8">
            <span className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Compare prices across 4+ platforms instantly
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the Best
            <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Seat Deals
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Compare ticket prices from Ticketmaster, StubHub, SeatGeek, and Vivid Seats in one place. Never overpay for seats again.
          </p>

          {/* Search bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for teams, games, or events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-12 h-14 bg-white border-0 text-gray-900 placeholder:text-gray-500 rounded-xl text-lg"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg font-semibold"
                >
                  Search Deals
                </Button>
              </div>
            </div>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <span className="text-gray-400 text-sm">Popular:</span>
            {['Lakers', 'Yankees', 'Cowboys', 'Warriors'].map((team) => (
              <button
                key={team}
                onClick={() => handlePopularSearch(team)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-all cursor-pointer"
              >
                {team}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            {[
              { value: '1M+', label: 'Tickets Compared' },
              { value: '7+', label: 'Platforms' },
              { value: '$2.5M', label: 'Total Saved' },
              { value: '50K+', label: 'Happy Users' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
```

---

## STEP 4 — Replace `src/app/components/HowItWorks.tsx`

**What changes from current site:**
- Remove horizontal step layout (number circles + text side by side)
- Replace with 3 vertical cards in a grid
- Add "HOW IT WORKS" pill label at top
- New heading: "Three Simple Steps to Save"
- Each card: green icon square, large faded step number as background watermark, bold title, description
- Add "Average savings: $47 per ticket" callout at bottom
- Remove "Why SeatScout / Built for real fans" section entirely

```tsx
import { Search, BarChart3, Ticket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Search Your Event',
      description: "Enter the team, game, or event you want to attend. We'll instantly find all available listings across every major platform.",
    },
    {
      icon: BarChart3,
      number: '02',
      title: 'Compare Prices',
      description: 'View side-by-side prices from Ticketmaster, StubHub, SeatGeek, Vivid Seats and more — all in real-time.',
    },
    {
      icon: Ticket,
      number: '03',
      title: 'Get Best Deal',
      description: 'See the cheapest option highlighted instantly. Click through to purchase directly from the platform — we never touch the price.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-4">
            <span className="text-green-600 text-sm font-semibold tracking-wide">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three Simple Steps to Save
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Finding the best ticket prices has never been easier
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connector line between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-green-200 to-transparent z-10" />
                )}

                <div className="relative bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  {/* Watermark number */}
                  <div className="absolute -top-2 -right-2 text-8xl font-bold text-green-100 group-hover:text-green-200 transition-colors select-none leading-none">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="inline-flex p-4 bg-green-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-8 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed relative">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Savings callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-2xl">
            <span className="text-2xl">💰</span>
            <div className="text-left">
              <span className="text-green-700 font-semibold text-lg">Average savings: </span>
              <span className="text-2xl font-bold text-green-600">$47 per ticket</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
```

---

## STEP 5 — Create `src/app/components/EventCard.tsx`

This is a new component. Create this file:

```tsx
import { Calendar, MapPin, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface PriceComparison {
  platform: string;
  price: number;
}

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  prices: PriceComparison[];
}

export function EventCard({ title, date, location, imageUrl, prices }: EventCardProps) {
  const lowestPrice = Math.min(...prices.map((p) => p.price));
  const highestPrice = Math.max(...prices.map((p) => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Save badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-green-500 text-white rounded-full flex items-center gap-1.5 text-sm font-semibold shadow-lg">
          <TrendingDown className="size-3.5" />
          Save ${savings}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="size-4 flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="size-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Price comparison */}
        <div className="space-y-2 mb-5 flex-1">
          <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-semibold px-1">
            <span>Platform</span>
            <span>Price</span>
          </div>

          {prices.map((price) => {
            const isLowest = price.price === lowestPrice;
            return (
              <div
                key={price.platform}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  isLowest
                    ? 'bg-green-50 border-2 border-green-400'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${isLowest ? 'text-green-700' : 'text-gray-700'}`}>
                    {price.platform}
                  </span>
                  {isLowest && (
                    <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full font-bold">
                      BEST
                    </span>
                  )}
                </div>
                <span className={`text-base font-bold ${isLowest ? 'text-green-600' : 'text-gray-800'}`}>
                  ${price.price}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <Button className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group/btn">
          View Best Deal
          <ExternalLink className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
```

---

## STEP 6 — Replace `src/app/components/Results.tsx`

**What changes from current site:**
- This section may not exist or show testimonials/CTA — replace entirely
- "Upcoming Events" heading left-aligned
- "Showing 3 results · Updated 2 min ago" subtitle
- "Filters" button top right
- 3-column event card grid
- "Load More Events" button centered at bottom
- bg-gray-50 background

```tsx
import { SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { EventCard } from './EventCard';

const mockEvents = [
  {
    title: 'Lakers vs Warriors',
    date: 'March 25, 2026 • 7:30 PM',
    location: 'Crypto.com Arena, Los Angeles',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80',
    prices: [
      { platform: 'Ticketmaster', price: 189 },
      { platform: 'StubHub', price: 165 },
      { platform: 'SeatGeek', price: 172 },
      { platform: 'Vivid Seats', price: 179 },
    ],
  },
  {
    title: 'Cowboys vs Eagles',
    date: 'April 2, 2026 • 1:00 PM',
    location: 'AT&T Stadium, Dallas',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c643e7485?w=800&q=80',
    prices: [
      { platform: 'Ticketmaster', price: 245 },
      { platform: 'StubHub', price: 228 },
      { platform: 'SeatGeek', price: 239 },
      { platform: 'Vivid Seats', price: 235 },
    ],
  },
  {
    title: 'Yankees vs Red Sox',
    date: 'April 10, 2026 • 7:05 PM',
    location: 'Yankee Stadium, New York',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
    prices: [
      { platform: 'Ticketmaster', price: 156 },
      { platform: 'StubHub', price: 142 },
      { platform: 'SeatGeek', price: 138 },
      { platform: 'Vivid Seats', price: 149 },
    ],
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-1">Upcoming Events</h2>
            <p className="text-gray-500 text-sm">
              Showing <span className="font-semibold text-gray-700">3 results</span> · Updated 2 min ago
            </p>
          </div>
          <Button variant="outline" className="self-start sm:self-auto flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </div>

        {/* Event cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="px-10 h-12 text-sm font-medium">
            Load More Events
          </Button>
        </div>

      </div>
    </section>
  );
}
```

---

## STEP 7 — Replace `src/app/components/Footer.tsx`

**What changes from current site:**
- Add green Ticket icon square to logo
- Add tagline under logo
- Add social icons: Twitter, Instagram, Facebook
- Change "Platforms" column to "Sports" column (NBA, NFL, MLB, NHL)
- Change "Company" links to: About Us, Contact, Privacy Policy, Terms of Service
- Add "Prices are updated in real-time from official ticket platforms" on right side of bottom bar

```tsx
import { Ticket, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a1628] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <Ticket className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SeatScout</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Compare ticket prices across all major platforms and never overpay for seats again.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Icon className="size-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Product</h4>
            <ul className="space-y-3">
              {['How It Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Sports</h4>
            <ul className="space-y-3">
              {['NBA', 'NFL', 'MLB', 'NHL', 'MLS'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">© 2026 SeatScout. All rights reserved.</p>
          <p className="text-gray-600 text-xs">
            Prices are updated in real-time from official ticket platforms
          </p>
        </div>

      </div>
    </footer>
  );
}
```

---

## STEP 8 — Delete these sections/components entirely

Remove any of the following if they exist as separate components or are inlined in a page file:
- `WhySeatScout` or "Built for real fans" section
- `Testimonials` or "Fans save every day" section  
- `CTABanner` or "Stop overpaying for tickets" section
- Any platform logo ticker/scroller component
- Any "Trending searches" section
- Sport emoji pill chips from Hero

---

## SUMMARY OF CHANGES

| Section | Action |
|---|---|
| App.tsx | Update order: Navbar → Hero → HowItWorks → Results → Footer |
| Navbar | New: Ticket icon logo, centered nav, single Sign In button |
| Hero | New: pill badge, two-line headline, tall search bar, Popular chips, stats row |
| HowItWorks | New: card grid layout with watermark numbers, savings callout |
| EventCard | CREATE NEW: venue photo card with platform price comparison rows |
| Results | New: Upcoming Events grid with EventCards and Load More button |
| Footer | New: icon logo, tagline, social icons, Sports column, bottom bar note |
| Removed | Testimonials, WhySeatScout, CTA section, platform logos, sport chips |

**Do NOT change any color values anywhere in the project.**
