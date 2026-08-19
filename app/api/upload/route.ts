import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/** Ruxsat etilgan turlar va ularning fayl imzosi (magic bytes). */
const KINDS = {
  "image/jpeg": { ext: "jpg", magic: [0xff, 0xd8, 0xff] },
  "image/png": { ext: "png", magic: [0x89, 0x50, 0x4e, 0x47] },
  "image/webp": { ext: "webp", magic: [0x52, 0x49, 0x46, 0x46] },
} as const;

const FOLDERS: Record<string, string> = {
  portrait: "portrait",
  proof: "proof",
  poster: "poster",
};

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Ruxsat yo'q." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Fayl o'qib bo'lmadi." }, { status: 400 });
  }

  const file = form.get("file");
  const folder = FOLDERS[String(form.get("kind") ?? "proof")] ?? "proof";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fayl tanlanmadi." }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Fayl bo'sh." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Fayl 8 MB dan katta. Kichikroq rasm tanlang." },
      { status: 400 },
    );
  }

  const kind = KINDS[file.type as keyof typeof KINDS];
  if (!kind) {
    return NextResponse.json(
      { error: "Faqat JPG, PNG yoki WEBP rasm yuklash mumkin." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // Kengaytmaga emas, faylning o'ziga ishonamiz.
  const signed = kind.magic.every((b, i) => bytes[i] === b);
  if (!signed) {
    return NextResponse.json(
      { error: "Fayl haqiqiy rasm emas." },
      { status: 400 },
    );
  }

  // Nomni o'zimiz yaratamiz — foydalanuvchi bergan nomga ishonmaymiz.
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${kind.ext}`;
  const dir = path.join(process.cwd(), "public", "media", folder);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);

  return NextResponse.json({ path: `/media/${folder}/${name}` });
}
