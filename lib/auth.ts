import { cookies } from "next/headers";

export function requireAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [id, username] = decoded.split(":");
    return { id, username };
  } catch {
    return null;
  }
}
