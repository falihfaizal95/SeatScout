"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/search", label: "Find Tickets" },
    { href: "/account", label: "Account" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || !isHome
          ? "glass border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-xl bg-[var(--brand)] opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#7b79f0] to-[#5452c8] flex items-center justify-center">
                <Ticket size={15} className="text-white" />
              </div>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white">
              Seat<span className="text-gradient">Scout</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-white bg-white/[0.08]"
                    : "text-[var(--text-2)] hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => router.push("/sign-in")}
              className="px-4 py-2 text-sm font-medium text-[var(--text-2)] hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white transition-all glow-brand"
            >
              Get started
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-2)] hover:text-white hover:bg-white/[0.06] transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 pt-4 border-t border-white/[0.06] flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-2)] hover:text-white hover:bg-white/[0.05] transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => { router.push("/sign-in"); setMobileOpen(false); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-white/[0.1] text-[var(--text-2)] hover:text-white transition-all"
              >
                Sign in
              </button>
              <button
                onClick={() => { router.push("/sign-up"); setMobileOpen(false); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-[var(--brand)] text-white transition-all"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
