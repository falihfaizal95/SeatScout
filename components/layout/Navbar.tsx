"use client";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[var(--bg)]/88 backdrop-blur-xl">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-[var(--green)] p-3 shadow-[0_18px_36px_rgba(34,197,94,0.18)]">
              <Ticket className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-[-0.03em] text-white">SeatScout</span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <Link href="/#how-it-works" className="text-lg font-medium text-[var(--text-2)] transition-colors hover:text-white">How It Works</Link>
            <Link href="/#results" className="text-lg font-medium text-[var(--text-2)] transition-colors hover:text-white">Compare Prices</Link>
            <Link href="/#results" className="text-lg font-medium text-[var(--text-2)] transition-colors hover:text-white">FAQ</Link>
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
                className="rounded-2xl border border-[var(--green)] bg-white px-6 py-3 text-lg font-semibold text-[var(--green)] transition-colors hover:bg-[var(--green)] hover:text-white"
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
