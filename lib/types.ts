/** Narx bosqichlari. */
export type PriceMode = "max" | "standard" | "original";

export interface Prices {
  /** Eng katta chegirma — kansultatsiya / vebinar qatnashchilariga. */
  max: number;
  /** Standard chegirma — storis orqali, cheklangan muddat. */
  standard: number;
  /** Asl narx — zapusk oynasidan tashqarida. */
  original: number;
}

export interface Package {
  id: string;
  name: string;
  /** Bir qatorlik izoh: kimga mo'ljallangan. */
  tagline: string;
  prices: Prices;
  /** "1 va 2-modul" kabi qamrov. */
  scope: string;
  /** "3 oy kirish" kabi muddat. */
  access: string;
  /** Asosiy bandlar — yengil shriftda ko'rinadi. */
  base: string[];
  /** Qo'shimcha bandlar — "+" bilan, quyuqroq shriftda. */
  extras: string[];
  /** Ajratib ko'rsatiladigan paket (bestseller). Faqat bittasi. */
  featured: boolean;
}

/**
 * Amaldagi chegirma kampaniyasi.
 * `endsAt` o'tib ketsa sahifa avtomatik asl narxga qaytadi.
 * `endsAt: null` — chegirma amal qiladi, lekin taymer ko'rsatilmaydi.
 */
export interface Campaign {
  mode: Exclude<PriceMode, "original">;
  endsAt: string | null;
  /** Taymer tepasidagi izoh. */
  label: string;
}

export interface ProofShot {
  id: string;
  src: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  /** "1-oyda $250" kabi aniq natija. */
  result: string;
  text: string;
}

export interface VideoTestimonial {
  id: string;
  /** Instagram / YouTube havolasi yoki yuklangan video yo'li. */
  url: string;
  name: string;
  result: string;
  /** Ko'rinadigan surat (ixtiyoriy). */
  poster: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Content {
  /** null bo'lsa — asl narx, chegirmasiz. */
  campaign: Campaign | null;
  /** Kurs boshlanish sanasi. null — hali e'lon qilinmagan. */
  courseStart: string | null;

  /** SOTUV havolasi — knopkalar shu hisobga tayyor xabar bilan o'tadi.
      Bu MENEJER, muallifning o'zi emas. */
  telegramUsername: string;

  /* Quyidagi UCHTASI — MUALLIF PROFILLARI, sotuv emas. Ulardan odam
     xabar yozmaydi, OBUNA bo'ladi. Har biri bo'sh qoldirilsa o'z belgisi
     umuman chizilmaydi.

     Ikki joyda ishlatiladi va ro'yxati har joyda BIR XIL EMAS:
       hero — surat ostidagi ikkita kichik belgi (Telegram, Instagram);
       `/challange` — "Menga obuna bo'ling" ostidagi qator (uchalasi).
     Farq ataylab: hero ning tartibi 2026-08-16 da qotirilgan va unga
     tegilmadi. */
  telegramChannelUrl: string;
  instagramUrl: string;
  youtubeUrl: string;

  packages: Package[];

  /** Sahifadagi raqamlar. Bo'sh qoldirilsa ko'rinmaydi. */
  stats: {
    /** Bitiruvchilar soni, masalan "340+". Bo'sh — blok ko'rinmaydi. */
    graduates: string;
    /** Umumiy dars soni. */
    lessons: string;
  };

  proof: {
    shots: ProofShot[];
    testimonials: Testimonial[];
    videos: VideoTestimonial[];
  };

  /** Eng ko'p uchraydigan savollar. Bo'sh — bo'lim umuman chizilmaydi. */
  faq: FaqItem[];

  about: {
    /** Portret rasm yo'li. null — o'rni bo'sh qoladi. */
    photo: string | null;
    /** "6 yil" kabi tajriba. */
    experience: string;
    /** Shaxsiy daromad natijasi. Bo'sh — ko'rinmaydi. */
    income: string;
    bio: string;
  };
}
