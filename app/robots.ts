import type { MetadataRoute } from "next";

/**
 * `/robots.txt` — Next.js shu fayldan o'zi yasaydi.
 *
 * BOSHQARUV PANELI VA API YOPIQ. Ular parol bilan himoyalangan, lekin
 * "himoyalangan" bilan "indekslanmaydigan" bir narsa emas: robot manzilni
 * baribir topib, qidiruv natijasida ko'rsatib qo'yishi mumkin. `/admin`
 * sahifasida bundan tashqari `noindex` ham bor — ikkalasi bir-birini
 * dublyaj qiladi va bu ataylab.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://janob.io/sitemap.xml",
    host: "https://janob.io",
  };
}
