import { priceFor, type ActivePricing } from "./content";
import { MODULES, LESSON_COUNT } from "./curriculum";
import type { Content } from "./types";

export const SITE_URL = "https://janob.io";

/**
 * Qidiruv tizimlari uchun tuzilmali ma'lumot (JSON-LD).
 *
 * HAMMASI HAQIQIY MA'LUMOTDAN yig'iladi — paket nomlari, amaldagi narxlar,
 * modul va dars soni. Bu qat'iy talab, did emas: schema.org ma'lumoti
 * sahifada ko'rinib turgan narsaga MOS bo'lishi kerak. Mos kelmasa,
 * Google buni "spammy structured data" deb sanaydi va boy natijani
 * butunlay o'chirib qo'yishi mumkin.
 *
 * Aynan shu sababli bu yerda "o'rtacha baho 5.0" yoki "1200 o'quvchi" kabi
 * maydonlar YO'Q: ular sahifada tasdiqlangan o'lchov emas, va soxta
 * `aggregateRating` — qoidabuzarlikning eng ko'p uchraydigan turi.
 */
export function courseJsonLd(content: Content, pricing: ActivePricing) {
  const social = [content.instagramUrl, content.telegramChannelUrl]
    .map((u) => u.trim())
    .filter(Boolean);

  const author = {
    "@type": "Person",
    name: "Jamol Samadov",
    url: SITE_URL,
    ...(social.length > 0 && { sameAs: social }),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI Dasturlash: 0-dan daromadgacha",
    description:
      "Zamonaviy AI instrumentlaridan foydalanib barqaror onlayn daromad qilishni 0-dan o'rganish kursi. Birinchi mijozdan barqaror daromadgacha qadamma-qadam.",
    url: SITE_URL,
    inLanguage: "uz",
    provider: author,
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "online",
        inLanguage: "uz",
        instructor: author,
      },
    ],
    /* Modul va dars soni — `lib/curriculum.ts` dagi haqiqiy ro'yxatdan
       sanaladi, qo'lda yozilmaydi. */
    numberOfCredits: MODULES.length,
    syllabusSections: MODULES.map((m) => ({
      "@type": "Syllabus",
      name: `${m.n}-modul: ${m.title}`,
      description: m.promise,
    })),
    teaches: `${LESSON_COUNT} ta darsda AI yordamida dasturlash va onlayn daromad`,
    offers: content.packages.map((p) => {
      const { now } = priceFor(p.prices, pricing.mode);
      return {
        "@type": "Offer",
        name: p.name,
        description: p.tagline,
        price: now,
        priceCurrency: "USD",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#paketlar`,
      };
    }),
  };
}

/**
 * Savol-javob bo'limi uchun alohida sxema.
 *
 * `null` qaytishi MUMKIN va bu muhim: savol kiritilmagan bo'lsa, bo'sh
 * `FAQPage` yozib qo'yish sahifada yo'q narsani e'lon qilish bo'lardi.
 */
export function faqJsonLd(content: Content) {
  const items = content.faq.filter(
    (f) => f.question.trim() !== "" && f.answer.trim() !== "",
  );
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
