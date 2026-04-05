"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";

export default function RefreshEventsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="font-syne inline-flex items-center gap-2 rounded-[10px] bg-[var(--brand)] px-8 py-4 text-[15px] font-[700] text-white transition-all hover:bg-[var(--brand-light)] hover:shadow-[0_8px_24px_rgba(124,106,247,0.35)] disabled:opacity-60"
    >
      <RefreshCw size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Loading..." : "Load More Events"}
    </button>
  );
}
