"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is SeatScout?",
    a: "SeatScout is a ticket price comparison platform that aggregates listings from multiple resale marketplaces — including StubHub, SeatGeek, Ticketmaster, and more — so you can instantly find the best deal for any event without bouncing between tabs.",
  },
  {
    q: "Is SeatScout free to use?",
    a: "Yes — SeatScout is completely free. You never pay us anything. We make money through referral partnerships with ticket platforms, not by charging you.",
  },
  {
    q: "How does SeatScout find prices so fast?",
    a: "We query multiple ticket marketplace APIs simultaneously and return results in real time. Our caching layer ensures popular events load instantly while keeping prices up to date.",
  },
  {
    q: "Which platforms does SeatScout compare?",
    a: "Currently we compare StubHub, SeatGeek, Ticketmaster Resale, Vivid Seats, and Gametime. We're actively adding more partners — check back often.",
  },
  {
    q: "What sports and events are covered?",
    a: "NFL, NBA, MLB, NHL, MLS, college sports, concerts, comedy shows, theater, and more. If it's on a major resale platform, SeatScout can find it.",
  },
  {
    q: "Do I buy the ticket through SeatScout?",
    a: "No — SeatScout is a comparison engine. When you click a listing, you're taken directly to the partner platform to complete your purchase. Your payment info stays between you and them.",
  },
  {
    q: "Are the prices shown all-in, including fees?",
    a: "We display all-in pricing wherever the platform supports it. Some platforms don't expose full fee breakdowns via API, so we'll always flag when a displayed price may not include service fees.",
  },
  {
    q: "How much can I actually save using SeatScout?",
    a: "On average, users find savings of 15–30% versus buying from the first platform they check. For high-demand events the gap between platforms can be much larger.",
  },
  {
    q: "Do I need an account to use SeatScout?",
    a: "Not at all. You can search and compare prices instantly without signing up. Creating an account unlocks price alerts and saved searches.",
  },
  {
    q: "Are the tickets on SeatScout guaranteed to be legitimate?",
    a: "We only surface listings from established, buyer-guaranteed marketplaces. Each partner platform carries their own guarantee — SeatScout links you to the platform's own guarantee page so you know exactly what you're covered for before you buy.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: isOpen ? "#1a1830" : "#13121f",
        border: `1px solid ${isOpen ? "rgba(124,108,255,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        marginBottom: "6px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "22px 28px",
          color: isOpen ? "#a99fff" : "#ffffff",
          fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
          fontSize: "1.05rem",
          fontWeight: 600,
          letterSpacing: "0.01em",
          transition: "color 0.2s",
        }}
      >
        <span>{q}</span>
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            color: "#7c6cff",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>
      <div
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          style={{
            padding: "0 28px 22px",
            color: "#8b89a8",
            fontSize: "0.97rem",
            lineHeight: 1.7,
            fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div style={{ background: "#0e0d18", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div
        style={{
          padding: "160px 48px 80px",
          textAlign: "center",
          position: "relative",
          animation: "fadeUp 0.6s ease both",
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(124,108,255,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(72px, 12vw, 140px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
          }}
        >
          Frequently
          <br />
          Asked
          <br />
          Questions
        </h1>

        <p
          style={{
            marginTop: "24px",
            color: "#8b89a8",
            fontSize: "1.05rem",
            fontWeight: 400,
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
          }}
        >
          Everything you need to know about comparing ticket prices with SeatScout.
        </p>
      </div>

      {/* ── FAQ list ── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 40px",
          animation: "fadeUp 0.6s 0.15s ease both",
        }}
      >
        {FAQS.map((item, i) => (
          <FAQItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>

      {/* ── CTA card ── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "12px auto 100px",
          padding: "0 24px",
          animation: "fadeUp 0.6s 0.25s ease both",
        }}
      >
        <div
          style={{
            padding: "48px 40px",
            background: "linear-gradient(135deg, #1a1838 0%, #151330 100%)",
            border: "1px solid rgba(124,108,255,0.25)",
            borderRadius: "16px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(124,108,255,0.12) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "2rem",
              letterSpacing: "-0.01em",
              color: "#ffffff",
              textTransform: "uppercase",
              position: "relative",
            }}
          >
            Still have questions?
          </h2>
          <p
            style={{
              marginTop: "10px",
              color: "#8b89a8",
              fontSize: "0.95rem",
              position: "relative",
              fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
            }}
          >
            Can&apos;t find the answer you&apos;re looking for? Reach out and we&apos;ll get back to you.
          </p>
          <a
            href="mailto:hello@seatscout.com"
            style={{
              display: "inline-block",
              marginTop: "24px",
              padding: "13px 32px",
              background: "#7c6cff",
              color: "#ffffff",
              fontFamily: "var(--font-barlow), 'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "30px",
              letterSpacing: "0.03em",
              textDecoration: "none",
              position: "relative",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#6a5ae0";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(124,108,255,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#7c6cff";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Contact Us
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
