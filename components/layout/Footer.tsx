import Link from "next/link";
import { Ticket, Twitter, Instagram, Facebook } from "lucide-react";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Compare Prices", href: "/search" },
      { label: "Price Alerts", href: "/account/alerts" },
      { label: "Sign Up Free", href: "/sign-up" },
    ],
  },
  {
    heading: "Sports",
    links: [
      { label: "NBA", href: "/search?sport=NBA" },
      { label: "NFL", href: "/search?sport=NFL" },
      { label: "MLB", href: "/search?sport=MLB" },
      { label: "NHL", href: "/search?sport=NHL" },
      { label: "MLS", href: "/search?sport=MLS" },
      { label: "UFC", href: "/search?sport=UFC" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--bg-1)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[var(--green)] flex items-center justify-center">
                <Ticket size={15} className="text-white" />
              </div>
              <span className="font-bold text-base text-white">SeatScout</span>
            </Link>
            <p className="text-sm text-[var(--text-2)] leading-relaxed max-w-[210px] mb-5">
              Compare ticket prices across all major platforms and never overpay for seats again.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[var(--text-2)] hover:text-white transition-all"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-bold text-white mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--text-2)] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-3)]">
            © {new Date().getFullYear()} SeatScout. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-3)]">
            Prices are updated in real-time from official ticket platforms
          </p>
        </div>
      </div>
    </footer>
  );
}
