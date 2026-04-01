import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import LocalEventDate from "@/components/ui/LocalEventDate";
import type { HomepageEvent } from "@/lib/upcomingEvents";

interface Props {
  event: HomepageEvent;
}

export default function HomepageEventCard({ event }: Props) {
  const lowestPrice  = Math.min(...event.prices.map((p) => p.price));
  const highestPrice = Math.max(...event.prices.map((p) => p.price));
  const savings      = highestPrice - lowestPrice;

  return (
    <div className="group overflow-hidden rounded-[20px] border border-[var(--card-border)] bg-[var(--card)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(124,106,247,0.25)]">

      {/* Image */}
      <div className="h-[190px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>

      {/* Save badge — between image and body */}
      <div className="px-4 pt-3">
        <span className="inline-block rounded-[6px] border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-[10px] py-[4px] text-[13px] font-[700] text-[var(--green)]">
          Save ${savings}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 pt-2">
        <h3 className="font-syne mb-2 text-[19px] font-[700] tracking-[-0.3px] text-[var(--text-1)]">
          {event.title}
        </h3>

        <div className="mb-4 flex flex-col gap-[3px] text-[13px] text-[var(--text-2)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 shrink-0" />
            <LocalEventDate isoDate={event.isoDate} />
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Price rows */}
        <div className="mb-2 w-full">
          {event.prices.map((p) => {
            const isBest = p.price === lowestPrice;
            return (
              <div
                key={p.platform}
                className={`flex items-center justify-between border-b border-[var(--card-border)] py-[6px] text-[14px] last:border-0 ${
                  isBest ? "text-[var(--text-1)]" : "text-[var(--text-2)]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {p.platform}
                  {isBest && (
                    <span className="rounded-[4px] bg-[var(--green-dim)] px-[6px] py-[2px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[var(--green)]">
                      Best
                    </span>
                  )}
                </span>
                <span className={`font-[600] ${isBest ? "text-[var(--green)]" : ""}`}>
                  ${p.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Best Deal button */}
      {event.tmUrl ? (
        <a
          href={event.tmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mb-4 flex w-[calc(100%-32px)] items-center justify-center rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-[14px] text-[14px] font-[700] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
        >
          View Best Deal
        </a>
      ) : (
        <Link
          href={`/event/${event.id}`}
          className="mx-4 mb-4 flex w-[calc(100%-32px)] items-center justify-center rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-[14px] text-[14px] font-[700] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
        >
          View Best Deal
        </Link>
      )}

    </div>
  );
}
