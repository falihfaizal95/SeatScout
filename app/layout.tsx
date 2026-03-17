import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeatScout – Find the Cheapest Sports Tickets",
  description:
    "Compare ticket prices across Ticketmaster, StubHub, SeatGeek, Vivid Seats, AXS and more. Find the best seats for any game at the lowest price.",
  keywords: ["sports tickets", "cheap tickets", "ticketmaster", "stubhub", "seatgeek", "compare tickets"],
  openGraph: {
    title: "SeatScout – Find the Cheapest Sports Tickets",
    description: "The Kayak for sports tickets. Compare prices across every platform instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
