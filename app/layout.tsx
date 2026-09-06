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

/* SAYT MANZILI BITTA JOYDA. `metadataBase` bo'lmasa, nisbiy yo'l bilan
   berilgan har qanday rasm (OG kartochkasi ham) build paytida xato
   beradi — ijtimoiy tarmoqlar mutlaq manzilni talab qiladi. */
const SITE = new URL("https://janob.io");

const TITLE = "AI Dasturlash: 0-dan daromadgacha";
const DESC =
  "Zamonaviy AI instrumentlaridan foydalanib barqaror onlayn daromad qilishni 0-dan o'rganing. 5 modul, kuniga 2 soat, birinchi mijozgacha aniq yo'riqnoma.";

export const metadata: Metadata = {
  metadataBase: SITE,
  title: {
    default: TITLE,
    /* Ichki sahifalar o'z nomini oldiga qo'yadi. Hozir bitta sahifa bor,
       lekin qoida sahifa qo'shilganda o'z-o'zidan ishlaydi. */
    template: `%s — ${TITLE}`,
  },
  description: DESC,
  applicationName: TITLE,
  authors: [{ name: "Jamol Samadov" }],
  creator: "Jamol Samadov",
  publisher: "Jamol Samadov",

  /* KALIT SO'ZLAR o'ylab topilmagan — hammasi sahifada haqiqatan yozilgan
     gaplardan olingan. Qidiruv tizimlari uchun ular endi og'ir omil emas,
     lekin ijtimoiy tarmoq va katalog robotlari baribir o'qiydi. */
  keywords: [
    "AI dasturlash",
    "AI bilan daromad",
    "onlayn daromad",
    "dasturlash kursi",
    "Claude Code",
    "prompt engineering",
    "Telegram bot yasash",
    "freelance",
    "Jamol Samadov",
    "janob_dasturchi",
  ],

  /* Bir sahifali sayt — kanonik manzil doim shu. Reklama havolalari
     (`?utm_...`) bilan kelgan nusxalar alohida sahifa deb sanalmaydi. */
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "/",
    siteName: TITLE,
    title: TITLE,
    description:
      "Dasturlashni bilmasangiz ham. Kuniga 2 soat. Birinchi $200 lik sotuvgacha aniq yo'riqnoma.",
    /* Rasmning O'ZI `app/opengraph-image.png` da va uni Next.js
       avtomatik ulaydi — bu yerda faqat matn qoladi. */
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Dasturlashni bilmasangiz ham. Kuniga 2 soat. Birinchi $200 lik sotuvgacha aniq yo'riqnoma.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Qidiruv natijasida rasm va matn parchasi to'liq ko'rsatilsin —
         cheklov qo'yilmasa Google o'zi qisqartirib yuborishi mumkin. */
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* FACEBOOK DOMEN TASDIQI (muallif talabi, 2026-09-06) — reklama
     kabinetidan olingan kod. Meta bu belgini domenning EGASI kimligini
     bilish uchun so'raydi: tasdiqsiz domenga reklama yuritish, piksel
     hodisalarini sozlash va havolaning ko'rinishini boshqarish
     yopiladi.

     `other` ATAYLAB: Next.js `verification` da Google, Yandex va Yahoo
     uchun tayyor kalitlar beradi, Facebook uchun esa yo'q
     (`node_modules/next/dist/docs` → functions/generate-metadata.md).
     `other` dagi kalit `<meta name="...">` ga aynan o'zi bo'lib
     tushadi, ya'ni natija Meta so'ragan qatorning aynan o'zi.

     ILDIZ MAKETDA turgani ham ataylab: bu yerdan u sahifalarning
     HAMMASIGA tarqaladi. Meta tekshiruvni odatda bosh sahifada
     o'tkazadi, lekin reklama havolasi qaysi sahifaga tushishini
     oldindan bilib bo'lmaydi.

     KOD MAXFIY EMAS: u sahifa manbasida ochiq turadi va shundayligicha
     ishlaydi — tasdiq kodning o'zi bilan emas, uni SHU domenga qo'ya
     olganing bilan isbotlanadi. */
  verification: {
    other: {
      "facebook-domain-verification": "6tr3uoy4nfq1a78adwjxfxxdydj3tc",
    },
  },

  /* Telefon raqami bo'lmagan sonlarni iOS o'z-o'zidan havolaga
     aylantiradi — narxlar va taymer raqamlari shundan aziyat chekardi. */
  formatDetection: { telephone: false, address: false, email: false },
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
