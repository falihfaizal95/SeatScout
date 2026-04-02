"use client";
import { useState, useEffect } from "react";

export default function RollingSavings() {
  const [amount, setAmount] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(Math.floor(Math.random() * (200 - 30 + 1)) + 30);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{ transition: "opacity 0.3s ease" }}
      key={amount}
    >
      ${amount}
    </span>
  );
}
