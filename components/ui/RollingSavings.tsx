"use client";
import { useState, useEffect, useRef } from "react";

function randomTarget() {
  return Math.floor(Math.random() * (200 - 30 + 1)) + 30;
}

export default function RollingSavings() {
  const [display, setDisplay] = useState(47);
  const target = useRef(randomTarget());
  const current = useRef(47);

  useEffect(() => {
    const tick = setInterval(() => {
      const cur = current.current;
      const tgt = target.current;

      if (cur === tgt) {
        // Reached target — pause then pick a new one
        setTimeout(() => {
          target.current = randomTarget();
        }, 800);
        return;
      }

      // Step toward target by 1
      const next = cur < tgt ? cur + 1 : cur - 1;
      current.current = next;
      setDisplay(next);
    }, 30); // ~33 steps/sec — fast enough to look like rolling digits

    return () => clearInterval(tick);
  }, []);

  return (
    <span className="font-syne font-[800]" style={{ fontSize: "inherit" }}>
      ${display}
    </span>
  );
}
