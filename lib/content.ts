import { promises as fs } from "node:fs";
import path from "node:path";
import type { Content, PriceMode, Prices } from "./types";

const FILE = path.join(process.cwd(), "data", "content.json");

/**
 * Yagona ma'lumot manbai.
 * Bu ikki funksiyani almashtirish orqali fayl o'rniga istalgan bazaga
 * (Postgres, KV, Supabase) o'tish mumkin — qolgan kod umuman o'zgarmaydi.
 */
export async function getContent(): Promise<Content> {
  const raw = await fs.readFile(FILE, "utf8");
  const c = JSON.parse(raw) as Content;

  /* Fayl KODDAN ESKIROQ bo'lishi mumkin: `content.json` serverda turadi va
     yangi maydon qo'shilgan chiqarilish unga o'z-o'zidan yozilmaydi.
     Yo'q maydon `undefined` bo'lib keladi va `.trim()` da butun sahifani
     yiqitardi; boshqaruv panelida esa React "uncontrolled input" ga
     shikoyat qilardi. Shuning uchun keyin qo'shilgan matn maydonlari
     shu yerda bo'sh satrga tenglashtiriladi — bo'sh satr esa "belgi
     ko'rinmaydi" degani, ya'ni xavfsiz sukut. */
  c.telegramChannelUrl ??= "";
  c.instagramUrl ??= "";
  c.youtubeUrl ??= "";
  /* Savol-javob keyin qo'shilgan (2026-08-17), ya'ni serverdagi faylda u
     bo'lmasligi mumkin. Bo'sh RO'YXAT xavfsiz sukut: bo'lim shu holatda
     umuman chizilmaydi, boshqaruv panelida esa `.map()` yiqilmaydi. */
  c.faq ??= [];

  return c;
}

export async function saveContent(next: Content): Promise<void> {
  await fs.writeFile(FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}

/** Faqat yuklash yo'li ruxsat etiladi — `content.json` dan kelgan matn
 *  hech qachon `public/` dan tashqariga chiqa olmasligi kerak. */
const MEDIA_PATH = /^\/media\/[a-z]+\/[\w.-]+$/i;

async function exists(publicPath: string): Promise<boolean> {
  try {
    await fs.access(path.join(process.cwd(), "public", publicPath.slice(1)));
    return true;
  } catch {
    return false;
  }
}

/**
 * Muallif portretining HAQIQATDAN mavjud yo'li.
 *
 * Ikki manba, shu tartibda:
 *   1. `about.photo` — admin panelidan yuklangani;
 *   2. `public/media/portrait/` ichidagi fayl — rasm papkaga qo'lda
 *      tashlangan bo'lsa, admin panelisiz ham darhol chiqadi.
 *
 * Fayl mavjudligi tekshiriladi: yo'l qolib, fayl o'chirilgan holatda
 * sahifada singan rasm emas, bo'sh o'rin qoladi (PRODUCT.md, 3-tamoyil).
 */
export async function resolvePortrait(content: Content): Promise<string | null> {
  const set = content.about.photo?.trim();
  if (set && MEDIA_PATH.test(set) && (await exists(set))) return set;

  try {
    const files = (await fs.readdir(path.join(process.cwd(), "public", "media", "portrait")))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();
    const latest = files.at(-1);
    return latest ? `/media/portrait/${latest}` : null;
  } catch {
    return null;
  }
}

export interface ActivePricing {
  mode: PriceMode;
  /** Taymer shu vaqtga qarab sanaydi. null — taymer ko'rsatilmaydi. */
  endsAt: string | null;
  label: string;
}

/**
 * Amaldagi narx bosqichi — VAQT BO'YICHA AVTOMATIK.
 * Kampaniya tugash vaqti o'tib ketsa, sahifa o'zi asl narxga qaytadi;
 * hech kim kodga tegmaydi.
 */
export function resolvePricing(content: Content, now = Date.now()): ActivePricing {
  const c = content.campaign;
  if (!c) return { mode: "original", endsAt: null, label: "" };

  if (c.endsAt) {
    const ends = new Date(c.endsAt).getTime();
    if (Number.isNaN(ends) || ends <= now) {
      return { mode: "original", endsAt: null, label: "" };
    }
    return { mode: c.mode, endsAt: c.endsAt, label: c.label };
  }

  // Sana kiritilmagan: chegirma amal qiladi, taymer ko'rinmaydi.
  return { mode: c.mode, endsAt: null, label: c.label };
}

/** Ko'rsatiladigan narx va ustidan chizilgan narx. */
export function priceFor(
  prices: Prices,
  mode: PriceMode,
): { now: number; was: number | null } {
  if (mode === "original") return { now: prices.original, was: null };
  const now = mode === "max" ? prices.max : prices.standard;
  // Chegirma asl narxdan past bo'lgandagina ustidan chizilgan narx chiqadi.
  return { now, was: now < prices.original ? prices.original : null };
}

/** Paket nomi bilan tayyor xabar yoziladigan Telegram havolasi. */
export function telegramLink(username: string, packageName?: string): string {
  const user = username.replace(/^@/, "");
  const text = packageName
    ? `Assalomu alaykum! ${packageName} paketiga qo'shilmoqchiman!`
    : "Assalomu alaykum! AI Dasturlash kursiga qo'shilmoqchiman!";
  return `https://t.me/${user}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
