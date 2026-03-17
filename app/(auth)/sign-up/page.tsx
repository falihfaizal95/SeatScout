import Link from "next/link";
import { Ticket, Check } from "lucide-react";

const PERKS = [
  "Save events and track prices",
  "Get alerts when prices drop",
  "Access to all platforms in one place",
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg-primary)]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform">
          <Ticket size={18} className="text-white" />
        </div>
        <span className="font-bold text-xl text-[var(--text-primary)]">
          Seat<span className="gradient-text">Scout</span>
        </span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border)] p-8 shadow-soft">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Create your account</h1>
            <p className="text-sm text-[var(--text-muted)]">Start finding the best ticket prices today</p>
          </div>

          {/* Perks */}
          <div className="bg-brand-50 dark:bg-brand-950/20 rounded-xl p-4 mb-6 space-y-2">
            {PERKS.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={14} className="text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span className="text-xs text-[var(--text-secondary)]">{p}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] font-medium text-sm text-[var(--text-primary)] transition-all">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-muted)]">or</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">First name</label>
                  <input type="text" placeholder="John" className="w-full px-3 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Last name</label>
                  <input type="text" placeholder="Smith" className="w-full px-3 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Email address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">Password</label>
                <input type="password" placeholder="At least 8 characters" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all" />
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-brand hover:shadow-brand-lg">
              Create account
            </button>

            <p className="text-center text-xs text-[var(--text-muted)]">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-brand-500 hover:text-brand-700 font-semibold">
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-[var(--text-muted)]">
              By signing up you agree to our{" "}
              <Link href="#" className="underline hover:text-[var(--text-secondary)]">Terms</Link>
              {" "}and{" "}
              <Link href="#" className="underline hover:text-[var(--text-secondary)]">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
