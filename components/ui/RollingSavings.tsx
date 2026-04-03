"use client";
import { useState, useEffect } from "react";

export default function RollingSavings() {
  const [display, setDisplay] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay((prev) => {
        const bump = Math.floor(Math.random() * 3) + 1; // +1, +2, or +3
        const next = prev + bump;
        return next > 200 ? 30 : next; // reset to $30 after hitting $200
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-syne font-[800]" style={{ fontSize: "inherit" }}>
      ${display}
    </span>
  );
}
