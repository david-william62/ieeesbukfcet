import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const speakers = await prisma.speaker.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(speakers);
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const created = await prisma.speaker.create({ data });
  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  const admin = requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const { id, ...rest } = data;
  const updated = await prisma.speaker.update({ where: { id }, data: rest });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const admin = requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.speaker.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
