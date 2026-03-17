import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 hero-grid">
      {/* Ambient glow */}
      <div className="orb w-96 h-96 bg-[var(--brand)] opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7b79f0] to-[#5452c8] flex items-center justify-center shadow-[0_0_20px_rgba(109,106,232,0.4)]">
            <Ticket size={17} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white">
            Seat<span className="text-gradient">Scout</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-1)] p-8">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1 text-center">Welcome back</h1>
          <p className="text-sm text-[var(--text-2)] text-center mb-7">Sign in to your account</p>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] text-sm font-medium text-[var(--text-1)] transition-all mb-5">
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[11px] text-[var(--text-3)]">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[var(--text-2)] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-[var(--bg-2)] text-white placeholder:text-[var(--text-3)] text-sm outline-none focus:border-[var(--brand)]/60 focus:shadow-[0_0_0_3px_rgba(109,106,232,0.12)] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[var(--text-2)] uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-[var(--bg-2)] text-white placeholder:text-[var(--text-3)] text-sm outline-none focus:border-[var(--brand)]/60 focus:shadow-[0_0_0_3px_rgba(109,106,232,0.12)] transition-all"
              />
            </div>
          </div>

          <button className="w-full mt-5 py-3 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white font-semibold text-sm transition-all glow-brand flex items-center justify-center gap-2">
            Sign in
            <ArrowRight size={15} />
          </button>

          <p className="text-center text-xs text-[var(--text-3)] mt-5">
            No account?{" "}
            <Link href="/sign-up" className="text-[var(--brand-light)] hover:text-white font-semibold transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
