import { NextResponse } from "next/server";
import { checkPassword, issueToken, COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "So'rov noto'g'ri." }, { status: 400 });
  }

  if (!body.password || !checkPassword(body.password)) {
    return NextResponse.json({ error: "Parol noto'g'ri." }, { status: 401 });
  }

  const token = issueToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: token.maxAge,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
