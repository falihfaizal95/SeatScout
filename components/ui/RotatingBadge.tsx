"use client";
import { useState, useEffect } from "react";

const PHRASES = [
  "Compare prices across 4+ platforms instantly",
  "Like Kayak, but for sports tickets",
  "Stop overpaying — find the best seat deal",
  "Ticketmaster, StubHub, SeatGeek — all in one place",
  "Save an average of $47 per ticket",
  "Never get ripped off on tickets again",
];

export default function RotatingBadge() {
  const [index, setIndex]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out → swap text → fade in
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[rgba(124,106,247,0.3)] bg-[var(--brand-dim)] px-4 py-[7px] text-[13px] font-[500] tracking-[0.3px] text-[var(--brand-light)]">
      <span className="text-[10px]">✦</span>
      <span
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          display: "inline-block",
        }}
      >
        {PHRASES[index]}
      </span>
    </div>
  );
}
