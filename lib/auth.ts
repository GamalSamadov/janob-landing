import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 12; // 12 soat

function password(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) {
    throw new Error(
      "ADMIN_PASSWORD o'rnatilmagan. .env.local faylida belgilang.",
    );
  }
  return p;
}

function secret(): string {
  return process.env.ADMIN_SECRET || `liquid-glass::${password()}`;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function checkPassword(input: string): boolean {
  try {
    return safeEqual(input, password());
  } catch {
    return false;
  }
}

export function issueToken(): { value: string; maxAge: number } {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return { value: `${exp}.${sign(exp)}`, maxAge: MAX_AGE };
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  try {
    return safeEqual(sig, sign(exp));
  } catch {
    return false;
  }
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}
