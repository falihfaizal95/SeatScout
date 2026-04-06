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

  const btn =
    "font-syne mx-auto mb-5 flex w-[80%] items-center justify-center rounded-[30px] bg-[rgba(99,91,199,0.18)] py-[14px] text-[15px] font-[700] text-[var(--brand-light)] transition-all hover:bg-[var(--brand)] hover:text-white";

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--card-border)] bg-[var(--card)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(124,106,247,0.25)]">

      {/* Image — fixed height */}
      <div className="h-[200px] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>

      {/* Body — grows to fill space */}
      <div className="flex flex-1 flex-col px-5 pt-4">

        {/* Save badge */}
        <span className="mb-3 inline-block self-start rounded-[6px] border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-[10px] py-[3px] text-[12px] font-[700] text-[var(--green)]">
          Save ${savings}
        </span>

        {/* Title — fixed min-height so 1-line titles don't collapse */}
        <h3 className="font-syne mb-3 min-h-[52px] text-[19px] font-[800] leading-[1.3] tracking-[-0.3px] text-[var(--text-1)]">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="mb-4 flex flex-col gap-[5px] text-[13px] text-[var(--text-2)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 shrink-0" />
            <LocalEventDate isoDate={event.isoDate} />
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[var(--card-border)]" />

        {/* Price rows — always 4 rows, fixed height */}
        <div className="mt-3 mb-4 w-full">
          {event.prices.map((p) => {
            const isBest = p.price === lowestPrice;
            return (
              <div
                key={p.platform}
                className={`flex items-center justify-between py-[6px] text-[13.5px] ${
                  isBest ? "text-[var(--text-1)]" : "text-[var(--text-2)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isBest ? "font-syne font-[700]" : ""}>{p.platform}</span>
                  {isBest && (
                    <span className="rounded-[4px] bg-[var(--green-dim)] px-[6px] py-[2px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[var(--green)]">
                      BEST
                    </span>
                  )}
                </span>
                <span className={`font-[600] tabular-nums ${isBest ? "text-[var(--green)]" : ""}`}>
                  ${p.price}
                </span>
              </div>
            );
          })}
        </div>

        {/* Spacer pushes button to bottom */}
        <div className="flex-1" />
      </div>

      {/* Button — always at the bottom */}
      {event.tmUrl ? (
        <a href={event.tmUrl} target="_blank" rel="noopener noreferrer" className={btn}>
          View Best Deal
        </a>
      ) : (
        <Link href={`/event/${event.id}`} className={btn}>
          View Best Deal
        </Link>
      )}

    </div>
  );
}
