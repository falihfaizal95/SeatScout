import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#6d6ae8",
          colorBackground: "#0d0d10",
          colorInputBackground: "#18181f",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#8b8ba7",
          colorNeutral: "#8b8ba7",
          borderRadius: "0.75rem",
          fontFamily: "inherit",
        },
        elements: {
          card: "bg-[#111118] border border-white/[0.08] shadow-2xl",
          headerTitle: "text-white font-black",
          headerSubtitle: "text-[#8b8ba7]",
          socialButtonsBlockButton: "border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white",
          formFieldInput: "bg-[#18181f] border-white/[0.1] text-white focus:border-[#6d6ae8]/60",
          formButtonPrimary: "bg-[#6d6ae8] hover:bg-[#7b79f0]",
          footerActionLink: "text-[#7b79f0] hover:text-white",
          dividerLine: "bg-white/[0.07]",
          dividerText: "text-[#4a4a6a]",
          formFieldLabel: "text-[#8b8ba7] text-xs uppercase tracking-wider font-semibold",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-[#7b79f0]",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="w-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
