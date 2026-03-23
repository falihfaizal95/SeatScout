"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[var(--card-border)] bg-[rgba(10,11,20,0.85)] px-6 py-5 backdrop-blur-[16px] sm:px-[60px]">
      <Link href="/" className="font-syne text-[22px] font-[800] tracking-[-0.5px] text-[var(--text-1)]">
        Seat<span className="text-[var(--brand)]">Scout</span>
      </Link>

      <ul className="hidden items-center gap-9 md:flex">
        <li>
          <Link href="/#how-it-works" className="text-[14px] font-[500] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
            How It Works
          </Link>
        </li>
        <li>
          <Link href="/#results" className="text-[14px] font-[500] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
            Compare Prices
          </Link>
        </li>
        <li>
          <Link href="/#results" className="text-[14px] font-[500] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]">
            FAQ
          </Link>
        </li>
      </ul>

      <div>
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
            className="rounded-[8px] bg-[var(--brand)] px-[22px] py-[10px] text-[14px] font-[600] text-white transition-all hover:bg-[var(--brand-light)] hover:-translate-y-px"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
