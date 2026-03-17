"use client";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[var(--green)] p-2 rounded-lg">
              <Ticket className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SeatScout</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-[var(--text-2)] hover:text-white transition-colors text-sm">How It Works</a>
            <a href="/#results" className="text-[var(--text-2)] hover:text-white transition-colors text-sm">Compare Prices</a>
            <Link href="/search" className="text-[var(--text-2)] hover:text-white transition-colors text-sm">Find Tickets</Link>
          </div>

          <div>
            {isLoaded && isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-[var(--green)]/40",
                  },
                }}
              />
            ) : (
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-2 rounded-lg border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-white text-sm font-semibold transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
