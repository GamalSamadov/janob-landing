import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { isAuthed } from "@/lib/auth";
import type { Content } from "@/lib/types";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Ruxsat yo'q." }, { status: 401 });
  }
  return NextResponse.json(await getContent());
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Ruxsat yo'q." }, { status: 401 });
  }

  let next: Content;
  try {
    next = (await req.json()) as Content;
  } catch {
    return NextResponse.json({ error: "JSON o'qib bo'lmadi." }, { status: 400 });
  }

  const problem = validate(next);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  await saveContent(next);
  return NextResponse.json({ ok: true });
}

function validate(c: Content): string | null {
  if (!c || typeof c !== "object") return "Ma'lumot bo'sh.";

  if (c.campaign) {
    if (!["max", "standard"].includes(c.campaign.mode)) {
      return "Chegirma turi noto'g'ri.";
    }
    if (
      c.campaign.endsAt !== null &&
      Number.isNaN(new Date(c.campaign.endsAt).getTime())
    ) {
      return "Chegirma tugash vaqti noto'g'ri.";
    }
  }

  if (
    c.courseStart !== null &&
    Number.isNaN(new Date(c.courseStart).getTime())
  ) {
    return "Kurs boshlanish sanasi noto'g'ri.";
  }

  if (!c.telegramUsername?.trim()) {
    return "Telegram username bo'sh bo'lmasligi kerak.";
  }

  if (!Array.isArray(c.packages) || c.packages.length === 0) {
    return "Kamida bitta paket bo'lishi kerak.";
  }

  for (const p of c.packages) {
    if (!p.name?.trim()) return "Paket nomi bo'sh.";
    for (const key of ["max", "standard", "original"] as const) {
      const v = p.prices?.[key];
      if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
        return `${p.name} paketining narxi noto'g'ri.`;
      }
    }
  }

  if (c.packages.filter((p) => p.featured).length > 1) {
    return "Faqat bitta paket \"Bestseller\" bo'lishi mumkin.";
  }

  if (!c.proof || !Array.isArray(c.proof.shots)) {
    return "Isbot bo'limi noto'g'ri.";
  }

  return null;
}
