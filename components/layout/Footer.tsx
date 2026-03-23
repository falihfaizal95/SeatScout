import Link from "next/link";
import { Ticket, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a1628]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-green-500 p-2">
                <Ticket className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SeatScout</span>
            </div>
            <p className="mb-5 max-w-xs text-sm leading-6 text-gray-400">
              Compare ticket prices across all major platforms and never overpay for seats again.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10">
                <Twitter className="size-4 text-gray-400" />
              </a>
              <a href="#" className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10">
                <Instagram className="size-4 text-gray-400" />
              </a>
              <a href="#" className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10">
                <Facebook className="size-4 text-gray-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-sm text-gray-400 transition-colors hover:text-white">How It Works</Link></li>
              <li><Link href="/search" className="text-sm text-gray-400 transition-colors hover:text-white">Compare Prices</Link></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Sports</h4>
            <ul className="space-y-2">
              <li><Link href="/search?sport=NBA" className="text-sm text-gray-400 transition-colors hover:text-white">NBA</Link></li>
              <li><Link href="/search?sport=NFL" className="text-sm text-gray-400 transition-colors hover:text-white">NFL</Link></li>
              <li><Link href="/search?sport=MLB" className="text-sm text-gray-400 transition-colors hover:text-white">MLB</Link></li>
              <li><Link href="/search?sport=NHL" className="text-sm text-gray-400 transition-colors hover:text-white">NHL</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} SeatScout. All rights reserved.</p>
            <p className="text-xs text-gray-500">Prices are updated in real-time from official ticket platforms</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
