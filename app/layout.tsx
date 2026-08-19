import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Dasturlash: 0-dan daromadgacha",
  description:
    "Zamonaviy AI instrumentlaridan foydalanib barqaror onlayn daromad qilishni 0-dan o'rganing. 5 modul, kuniga 2 soat, birinchi mijozgacha aniq yo'riqnoma.",
  openGraph: {
    title: "AI Dasturlash: 0-dan daromadgacha",
    description:
      "Dasturlashni bilmasangiz ham. Kuniga 2 soat. Birinchi $200 lik sotuvgacha aniq yo'riqnoma.",
    locale: "uz_UZ",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/* Telefonda brauzerning o'z paneli shu rangga bo'yaladi. U sahifaning eng
   tepasidagi rang bilan bir xil bo'lishi kerak — aks holda panel bilan
   hero orasida chok paydo bo'ladi. Sahifa yorug' rejimga o'tgach ikkala
   qiymat ham shunga ergashdi (`dark` qolib ketsa, brauzer forma
   maydonlari va skroll chizig'ini quyuq chizishda davom etardi). */
export const viewport: Viewport = {
  themeColor: "#fbf7f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          THESIS: AI — linza. U bor narsani kattalashtiradi, yo'q narsani emas.
          Shisha sharlar sarlavha harflarini haqiqatdan kattalashtiradi. Rad
          etilgani: kurs landinglarining standart hero + ikonkali kartochka to'ri.
          FON QUTBI 2026-08-17 DA AYLANTIRILDI (muallif talabi: "white mode
          qil hammasini"). Quyidagi yozuv o'sha kungacha bo'lgan yo'nalishni
          saqlaydi va ATAYLAB o'zgartirilmadi — u nima qilingani emas,
          qanday niyat bilan boshlangani haqidagi yozuv. Bugungi holat:
          #fbf7f1 iliq oq yer, matn #1c1610, shisha oqni to'playdi, sahifada
          faqat ikkita quyuq jism (PRO kartasi va uning knopkalari). Batafsil
          izoh `globals.css` boshida.
          OWN-WORLD: #050507 qora yer; Apple system-color spektri (teal→blue→
          indigo→purple→pink→orange); qalin qirrali shisha — gradient border,
          ichki bevel, spekulyar yaltirash; iridessent kapsula knopkalar;
          w800/lh .93/-.038em display, w900 UPPERCASE paket nomlari, ro'yxatlarda
          w300 asosiy / w500 qo'shimcha.
          STORY: Xorijda og'ir mehnatdagi odam bir ekranda tushunadi — bu
          birinchi pullik mijozgacha qadamma-qadam yo'l; butun dasturni
          yashirmasdan ko'radi; isbotni tekshiradi; paket tanlab Telegram ochadi.
          FIRST VIEWPORT: To'liq qora maydon, ikki ambient yorug'lik; ingichka
          shisha navigatsiya; ulkan chapga tekislangan sarlavha va uning ustida
          suzuvchi uchta shisha shar — harflarni kattalashtirib rangga ajratadi;
          yengil ost-sarlavha; iridessent "0-dan boshlash" kapsulasi; faktlar
          shisha lentasi.
          FORM: Liquid glass — muallif tomonidan bog'langan (4 referans surat);
          pinned-direction qoidasiga ko'ra tanlov o'yini o'tkazilmadi.
          FINISH: unreviewed and undocumented is unfinished; this build ends with
          the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
