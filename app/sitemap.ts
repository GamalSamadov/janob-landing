import type { MetadataRoute } from "next";

/**
 * `/sitemap.xml`.
 *
 * Sayt BIR SAHIFALIK, shuning uchun ro'yxatda bitta manzil bor va bu
 * to'g'ri: bo'limlar (`#dastur`, `#natijalar`, `#paketlar`, `#savollar`)
 * alohida sahifa emas, o'sha sahifaning ichidagi lange. Ularni sayt
 * xaritasiga qo'shish qidiruv tizimini bir xil sahifani bir necha marta
 * indekslashga undardi.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://janob.io",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
