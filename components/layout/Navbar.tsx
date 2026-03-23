"use client";
import { Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0a1628]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-green-500 p-2">
              <Ticket className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SeatScout</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#how-it-works" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">How It Works</Link>
            <Link href="/#results" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Compare Prices</Link>
            <Link href="/#results" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">FAQ</Link>
          </div>

          <div>
            {isLoaded && isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-green-500/40",
                  },
                }}
              />
            ) : (
              <button
                onClick={() => router.push("/sign-in")}
                className="rounded-xl border border-green-500 px-5 py-2 text-sm font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-white"
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
