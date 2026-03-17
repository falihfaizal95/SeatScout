import Link from "next/link";
import { Ticket, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-1)] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--green)] p-2 rounded-lg">
                <Ticket className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SeatScout</span>
            </div>
            <p className="text-[var(--text-2)] text-sm mb-4">
              Compare ticket prices across all major platforms and never overpay for seats again.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors">
                <Twitter className="size-4 text-[var(--text-2)]" />
              </a>
              <a href="#" className="p-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors">
                <Instagram className="size-4 text-[var(--text-2)]" />
              </a>
              <a href="#" className="p-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors">
                <Facebook className="size-4 text-[var(--text-2)]" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">How It Works</Link></li>
              <li><Link href="/search" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">Compare Prices</Link></li>
              <li><Link href="/account/alerts" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">Price Alerts</Link></li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sports</h4>
            <ul className="space-y-2">
              <li><Link href="/search?sport=NBA" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">NBA</Link></li>
              <li><Link href="/search?sport=NFL" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">NFL</Link></li>
              <li><Link href="/search?sport=MLB" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">MLB</Link></li>
              <li><Link href="/search?sport=NHL" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">NHL</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[var(--text-2)] hover:text-white text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-2)] text-sm">
              © {new Date().getFullYear()} SeatScout. All rights reserved.
            </p>
            <p className="text-[var(--text-3)] text-xs">
              Prices are updated in real-time from official ticket platforms
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
