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

  const btnClass =
    "mx-4 mb-4 flex w-[calc(100%-32px)] items-center justify-center rounded-[30px] bg-[rgba(99,91,199,0.18)] py-[15px] text-[15px] font-syne font-[700] text-[var(--brand-light)] transition-all hover:bg-[var(--brand)] hover:text-white";

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

      {/* Body */}
      <div className="px-5 pb-3 pt-4">

        {/* Save badge */}
        <span className="mb-3 inline-block rounded-[6px] border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-[10px] py-[4px] text-[12px] font-[700] text-[var(--green)]">
          Save ${savings}
        </span>

        {/* Title */}
        <h3 className="font-syne mb-3 text-[21px] font-[800] leading-[1.15] tracking-[-0.3px] text-[var(--text-1)]">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-[5px] text-[13px] text-[var(--text-2)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 shrink-0" />
            <LocalEventDate isoDate={event.isoDate} />
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-[var(--card-border)]" />

        {/* Price rows */}
        <div className="mb-4 w-full">
          {event.prices.map((p) => {
            const isBest = p.price === lowestPrice;
            return (
              <div
                key={p.platform}
                className={`flex items-center justify-between py-[7px] text-[14px] ${
                  isBest ? "text-[var(--text-1)]" : "text-[var(--text-2)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isBest ? "font-syne font-[700]" : ""}>{p.platform}</span>
                  {isBest && (
                    <span className="rounded-[4px] bg-[var(--green-dim)] px-[7px] py-[2px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[var(--green)]">
                      BEST
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
        <a href={event.tmUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
          View Best Deal
        </a>
      ) : (
        <Link href={`/event/${event.id}`} className={btnClass}>
          View Best Deal
        </Link>
      )}

    </div>
  );
}
