"use client";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[var(--green)] p-2 rounded-lg">
              <Ticket className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SeatScout</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-[var(--text-2)] hover:text-white transition-colors">
              How It Works
            </a>
            <a href="/#results" className="text-[var(--text-2)] hover:text-white transition-colors">
              Compare Prices
            </a>
            <Link href="/search" className="text-[var(--text-2)] hover:text-white transition-colors">
              Find Tickets
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center">
            {isLoaded && isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-[var(--green)]/40",
                    userButtonPopoverCard: "bg-[var(--bg-1)] border border-white/[0.08]",
                    userButtonPopoverActionButton: "text-[var(--text-1)] hover:bg-white/[0.06]",
                    userButtonPopoverFooter: "hidden",
                  },
                }}
              />
            ) : isLoaded ? (
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-2 rounded-lg border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-white text-sm font-semibold transition-all"
              >
                Sign In
              </button>
            ) : (
              <div className="w-20 h-8 rounded-lg bg-white/[0.06] animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
