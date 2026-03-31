import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
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
      <div className="h-[180px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>

      {/* Body */}
      <div className="p-[28px]">
        {/* Save badge */}
        <div className="mb-4 inline-block rounded-full border border-[rgba(34,197,94,0.2)] bg-[var(--green-dim)] px-3 py-[4px] text-[12px] font-[600] text-[var(--green)]">
          Save ${savings}
        </div>

        <h3 className="font-syne mb-2 text-[18px] font-[700] tracking-[-0.3px] text-[var(--text-1)]">
          {event.title}
        </h3>

        <div className="mb-6 text-[13px] leading-[1.7] text-[var(--text-2)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 shrink-0" />
            <LocalEventDate isoDate={event.isoDate} />
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Price table */}
        <table className="mb-6 w-full border-collapse text-[13px]">
          <tbody>
            {event.prices.map((p) => {
              const isBest = p.price === lowestPrice;
              return (
                <tr
                  key={p.platform}
                  className={`border-b border-[var(--card-border)] last:border-0 ${isBest ? "text-[var(--green)]" : ""}`}
                >
                  <td className="py-[10px]">
                    {p.platform}
                    {isBest && (
                      <span className="ml-1.5 rounded-[4px] bg-[var(--green-dim)] px-[7px] py-[2px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[var(--green)]">
                        Best
                      </span>
                    )}
                  </td>
                  <td className="py-[10px] text-right font-[500]">${p.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* View button */}
        {event.tmUrl ? (
          <a
            href={event.tmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-3 text-[14px] font-[600] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
          >
            View Best Deal
            <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <Link
            href={`/event/${event.id}`}
            className="block w-full rounded-[10px] border border-[rgba(124,106,247,0.25)] bg-[var(--brand-dim)] py-3 text-center text-[14px] font-[600] text-[var(--brand-light)] transition-all hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
          >
            View Best Deal
          </Link>
        )}
      </div>
    </div>
  );
}
