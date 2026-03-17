import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center">
                <Ticket size={14} className="text-white" />
              </div>
              <span className="font-bold text-base text-[var(--text-primary)]">
                Seat<span className="gradient-text">Scout</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The smartest way to find the best ticket prices across every platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Product</h4>
            <ul className="space-y-2">
              {["Find Tickets", "Price Alerts", "Sports", "Venues"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Platforms</h4>
            <ul className="space-y-2">
              {["Ticketmaster", "SeatGeek", "StubHub", "Vivid Seats", "AXS"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--text-muted)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Company</h4>
            <ul className="space-y-2">
              {["About", "Privacy", "Terms", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} SeatScout. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Not affiliated with any ticketing platform. Prices may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
