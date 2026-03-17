import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#7b79f0] to-[#5452c8] flex items-center justify-center">
                <Ticket size={13} className="text-white" />
              </div>
              <span className="font-bold text-sm text-white">
                Seat<span className="text-gradient">Scout</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-2)] leading-relaxed max-w-[220px]">
              The smartest way to find the lowest ticket price across every platform.
            </p>
          </div>

          {[
            {
              heading: "Product",
              links: ["Find Tickets", "Price Alerts", "Sports", "Venues"],
            },
            {
              heading: "Platforms",
              links: ["Ticketmaster", "SeatGeek", "StubHub", "Vivid Seats", "AXS"],
            },
            {
              heading: "Company",
              links: ["About", "Privacy", "Terms", "Contact"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--text-2)] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-3)]">
            © {new Date().getFullYear()} SeatScout. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-3)]">
            Not affiliated with any ticketing platform. Prices may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
