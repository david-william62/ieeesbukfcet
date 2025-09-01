import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const username = "ieeesbukfcet";
  const password = "ieeeukfcet2025";

  const existing = await prisma.user.findUnique({ where: { username } });
  if (!existing) {
    await prisma.user.create({ data: { username, password } });
  }

  return NextResponse.json({ ok: true });
}
