"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is SeatScout?",
    a: "SeatScout is a ticket price comparison platform that searches across Ticketmaster, StubHub, SeatGeek, Vivid Seats, and more — all at once. Instead of checking each site individually, you get every available listing side by side so you can find the best deal in seconds.",
  },
  {
    q: "Is SeatScout free to use?",
    a: "Yes, completely free. We never charge you to compare prices. You only pay the ticket price (plus any fees) directly to the platform you choose to buy from. We don't add any markups or hidden charges.",
  },
  {
    q: "How does SeatScout find prices so fast?",
    a: "We connect in real-time to the major ticket marketplaces and pull live listings the moment you search. Prices on SeatScout reflect what's actually available right now — not cached data from hours ago.",
  },
  {
    q: "Which platforms does SeatScout compare?",
    a: "Currently we compare Ticketmaster, StubHub, SeatGeek, and Vivid Seats. We're actively adding more platforms — the goal is to have every major resale and primary market covered in one place.",
  },
  {
    q: "What sports and events are covered?",
    a: "We cover NBA, NFL, MLB, NHL, MLS, and major concert and entertainment events. If it's on the big ticket platforms, SeatScout can find it. Search by team, artist, or venue to see what's available.",
  },
  {
    q: "Do I buy the ticket through SeatScout?",
    a: "No — SeatScout shows you the best price and then sends you directly to the platform that has it. You complete the purchase on their site, so you're protected by their buyer guarantees and refund policies.",
  },
  {
    q: "Are the prices shown all-in, including fees?",
    a: "We display the base listed price from each platform. Final checkout prices may include service fees and delivery charges, which vary by platform. We always recommend clicking through to confirm the total before buying.",
  },
  {
    q: "How much can I actually save using SeatScout?",
    a: "On average, SeatScout users save around $47 per ticket compared to buying from the first platform they check. For popular events with high demand, the price difference between platforms can be $80 or more for the same seat.",
  },
  {
    q: "Do I need an account to use SeatScout?",
    a: "You can search and compare prices without an account. Creating a free account lets you save your favorite teams, get price drop alerts, and track events you're watching.",
  },
  {
    q: "Are the tickets on SeatScout guaranteed to be legitimate?",
    a: "SeatScout only surfaces listings from established, reputable ticket platforms that have their own buyer protection and guarantee programs. We don't list tickets from unverified third parties.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-[var(--card-border)] last:border-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-syne text-[17px] font-[700] leading-snug text-[var(--text-1)]">
          {q}
        </span>
        <ChevronDown
          size={20}
          className="shrink-0 text-[var(--brand-light)] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p className="pb-6 text-[15px] leading-[1.8] text-[var(--text-2)]">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pb-[80px] pt-[160px] text-center sm:px-[60px]">
        <div className="section-tag">FAQ</div>
        <h1 className="font-syne mx-auto mb-5 max-w-[700px] text-[clamp(40px,5vw,64px)] font-[800] leading-[1.05] tracking-[-2px] text-[var(--text-1)]">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-[520px] text-[16px] leading-[1.75] text-[var(--text-2)]">
          Everything you need to know about comparing ticket prices with SeatScout.
        </p>
      </section>

      {/* FAQ accordion */}
      <section className="mx-auto w-full max-w-[760px] px-6 pb-[120px] sm:px-[60px]">
        <div className="rounded-[16px] border border-[var(--card-border)] bg-[var(--card)] px-8 py-2">
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-[16px] border border-[var(--border-brand)] bg-[var(--brand-dim)] px-8 py-10 text-center">
          <h2 className="font-syne mb-3 text-[22px] font-[800] tracking-[-0.5px] text-[var(--text-1)]">
            Still have questions?
          </h2>
          <p className="mb-6 text-[14px] text-[var(--text-2)]">
            Can't find the answer you're looking for? Reach out and we'll get back to you.
          </p>
          <a
            href="mailto:hello@seatscout.com"
            className="font-syne inline-flex items-center rounded-[10px] bg-[var(--brand)] px-7 py-[13px] text-[15px] font-[700] text-white transition-opacity hover:opacity-80"
          >
            Contact Us
          </a>
        </div>
      </section>

    </div>
  );
}
