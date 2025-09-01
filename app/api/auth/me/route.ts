import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return NextResponse.json({ authenticated: false });

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [id, username] = decoded.split(":");
    if (!id || !username) return NextResponse.json({ authenticated: false });
    return NextResponse.json({ authenticated: true, id, username });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
