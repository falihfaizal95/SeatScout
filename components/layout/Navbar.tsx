"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Ticket } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--card-border)] bg-[rgba(10,11,20,0.85)] backdrop-blur-[16px]">
      <div className="relative flex w-full items-center justify-between px-6 py-5 sm:px-[60px]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--brand)]">
            <Ticket className="size-5 text-white" />
          </div>
          <span className="font-syne text-[22px] font-[800] tracking-[-0.5px] text-[var(--text-1)]">
            Seat<span className="text-[var(--brand)]">Scout</span>
          </span>
        </Link>

        {/* Nav links — absolutely centered between logo and CTA */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          <li>
            <Link href="/#how-it-works" className="font-syne text-[14px] font-[600] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/#results" className="font-syne text-[14px] font-[600] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
              Compare Prices
            </Link>
          </li>
          <li>
            <Link href="/#results" className="font-syne text-[14px] font-[600] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
              FAQ
            </Link>
          </li>
        </ul>

        <div className="ml-auto">
          {isLoaded && isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-[var(--brand)]/40",
                },
              }}
            />
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="font-syne rounded-[10px] bg-[var(--brand)] px-[40px] py-[16px] text-[18px] font-[800] text-white transition-all hover:bg-[var(--brand-light)] hover:-translate-y-px"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
