import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Clerk webhook handler — syncs users to our DB
// In production, verify the webhook signature using svix
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    if (type === "user.created" || type === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = data;
      const email = email_addresses?.[0]?.email_address;
      if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

      const meta = (unsafe_metadata ?? {}) as Record<string, unknown>;

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          name:        [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl:    image_url || null,
          dateOfBirth: meta.dateOfBirth ? new Date(meta.dateOfBirth as string) : undefined,
          country:     (meta.country  as string) || undefined,
          zipCode:     (meta.zipCode  as string) || undefined,
        },
        create: {
          clerkId:     id,
          email,
          name:        [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl:    image_url || null,
          dateOfBirth: meta.dateOfBirth ? new Date(meta.dateOfBirth as string) : null,
          country:     (meta.country  as string) || null,
          zipCode:     (meta.zipCode  as string) || null,
        },
      });
    }

    if (type === "user.deleted") {
      await prisma.user.deleteMany({ where: { clerkId: data.id } });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Webhook] Clerk webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
