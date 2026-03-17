import { BookmarkIcon, Bell, History, ChevronRight, Ticket } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  // In production this would use Clerk's currentUser()
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-2xl text-white font-bold shadow-brand">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Account</h1>
              <p className="text-[var(--text-muted)] text-sm">Manage your saved events and price alerts</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Saved events", value: "0", icon: BookmarkIcon, color: "text-brand-500" },
            { label: "Active alerts", value: "0", icon: Bell, color: "text-green-500" },
            { label: "Searches", value: "0", icon: History, color: "text-amber-500" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] text-center">
              <s.icon size={20} className={`${s.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          {[
            { href: "/account/saved", icon: BookmarkIcon, label: "Saved Events", desc: "Events you've bookmarked", color: "bg-brand-50 dark:bg-brand-950/20 text-brand-600" },
            { href: "/account/alerts", icon: Bell, label: "Price Alerts", desc: "Get notified when prices drop", color: "bg-green-50 dark:bg-green-950/20 text-green-600" },
            { href: "/search", icon: Ticket, label: "Find Tickets", desc: "Search for upcoming events", color: "bg-amber-50 dark:bg-amber-950/20 text-amber-600" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-brand-200 dark:hover:border-brand-800 hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

        {/* Sign in notice */}
        <div className="mt-8 p-5 rounded-2xl border border-dashed border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/10 text-center">
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Sign in to save events and set price alerts across devices.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
