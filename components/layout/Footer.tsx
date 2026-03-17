import Link from "next/link";
import { Ticket, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-white/[0.08] bg-[var(--bg-1)] px-6 py-12 sm:px-10">
        <div className="mb-10 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--green)] p-3">
                <Ticket className="size-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-[-0.03em] text-white">SeatScout</span>
            </div>
            <p className="mb-5 max-w-xs text-base leading-8 text-[var(--text-2)]">
              Compare ticket prices across all major platforms and never overpay for seats again.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-xl bg-white/[0.05] p-2.5 transition-colors hover:bg-white/[0.1]">
                <Twitter className="size-4 text-[var(--text-2)]" />
              </a>
              <a href="#" className="rounded-xl bg-white/[0.05] p-2.5 transition-colors hover:bg-white/[0.1]">
                <Instagram className="size-4 text-[var(--text-2)]" />
              </a>
              <a href="#" className="rounded-xl bg-white/[0.05] p-2.5 transition-colors hover:bg-white/[0.1]">
                <Facebook className="size-4 text-[var(--text-2)]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-2xl font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">How It Works</Link></li>
              <li><Link href="/search" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">Compare Prices</Link></li>
              <li><a href="#" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-2xl font-semibold text-white">Sports</h4>
            <ul className="space-y-2">
              <li><Link href="/search?sport=NBA" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">NBA</Link></li>
              <li><Link href="/search?sport=NFL" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">NFL</Link></li>
              <li><Link href="/search?sport=MLB" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">MLB</Link></li>
              <li><Link href="/search?sport=NHL" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">NHL</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-2xl font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">About Us</a></li>
              <li><a href="#" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">Contact</a></li>
              <li><a href="#" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-lg text-[var(--text-2)] transition-colors hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm text-[var(--text-2)]">© {new Date().getFullYear()} SeatScout. All rights reserved.</p>
            <p className="text-sm text-[var(--text-3)]">Prices are updated in real-time from official ticket platforms</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
