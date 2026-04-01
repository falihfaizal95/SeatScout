"use client";
import { useState, useEffect } from "react";

function format(n: number): string {
  if (n >= 1_000_000) {
    return "$" + (n / 1_000_000).toFixed(1) + "M";
  }
  return "$" + Math.round(n / 1_000) + "K";
}

export default function RollingCounter() {
  const [value, setValue] = useState(100_000);

  useEffect(() => {
    const tick = () => {
      const increment = Math.floor(Math.random() * (15_000 - 10_000 + 1)) + 10_000;
      setValue((prev) => prev + increment);
    };

    // fast initial roll up to 2.5M — runs every 60ms
    const interval = setInterval(tick, 60);
    return () => clearInterval(interval);
  }, []);

  return <span>{format(value)}</span>;
}
