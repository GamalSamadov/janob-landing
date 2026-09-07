import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

/* META PIKSELI — reklama kabinetidan olingan kod, ID muallifniki.

   AVVAL FAQAT `/challange-darslik` DA EDI (2026-09-07) va o'sha kuni
   ko'chirildi. Fikr shunday edi: reklama shu sahifaga tushadi, ya'ni
   piksel ham faqat shu yerda tursin — u holda `/bepul-darslik` ga
   Reels dan kelgan bepul trafik sanoqqa aralashmaydi.

   AMALDA BU XATO BO'LDI. Muallifning targetologi pikselni topa
   olmadi: u bosh sahifani ochib qaradi (odatdagi tekshiruv aynan
   shunday boshlanadi va Meta Pixel Helper ham shu yerda ishga
   tushadi) va u yerda hech narsa yo'q edi. Piksel bir sahifaga
   berkitilgan bo'lsa, u ishlayotgani ham, ishlamayotgani ham
   bilinmaydi.

   OQIMLARNI AJRATISH BUNDAN ZARAR KO'RMAYDI va shuni bilib qo'yish
   muhim: bo'linish pikselda emas, BOTNING boshlanish parametrida
   (`?start=kurs` / `?start=challange`). Piksel esa har bir hodisaga
   sahifaning to'liq manzilini qo'shib yuboradi, ya'ni kabinetning
   o'zida manzil bo'yicha ajratsa bo'ladi. Ya'ni sahifaga berkitish
   hech narsa yutmasdi, yo'qotardi.

   `beforeInteractive` — ATAYLAB, garchi hujjat bu darajani analitika
   uchun emas, "eng kerakli" skriptlar uchun tavsiya qilsa ham
   (`node_modules/next/dist/docs` → components/script.md). Ikki sabab:

   1) Shu daraja skriptni HUJJATNING `head` IGA qo'yadi ("Scripts with
      `beforeInteractive` will always be injected inside the `head` of
      the HTML document regardless of where it's placed in the
      component"). Meta ning yo'riqnomasi ham aynan shuni so'raydi va
      targetolog sahifa manbasini shu joydan qidiradi.
   2) `PageView` gidratatsiyani kutmaydi. Reklama trafigida odam
      sahifani bir necha soniyada tashlab ketishi odatiy hol — kech
      yuborilgan hodisa umuman yuborilmagan hodisadir.

   Hujjat `beforeInteractive` ni faqat ILDIZ MAKETGA qo'yishni talab
   qiladi — shu sababli u shu yerda.

   `id` MAJBURIY (hujjatning o'z ogohlantirishi) va u pikselning ikki
   marta yuklanishidan saqlaydi: aks holda har bir ochilish ikkita
   `PageView` bo'lib sanalardi.

   `dangerouslySetInnerHTML` bu yerda YAGONA yo'l va u xavfsiz: matn
   o'zgarmas satr, unga foydalanuvchi kiritgan hech narsa qo'shilmaydi.
   React esa bola sifatida berilgan matnni HTML uchun ekranlab qo'yardi
   va skript buzilardi. */
const PIXEL_ID = "2155323465015470";

const PIXEL_SRC = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`;

/* JAVASCRIPTSIZ BRAUZER UCHUN — Meta bergan kodning ikkinchi qismi.
   Skript ishlamaganda ochilish shu 1x1 rasm orqali sanaladi.

   ID IKKALASIDA BIR XIL bo'lishi shart, shuning uchun u yuqorida
   alohida o'zgaruvchida turadi — aks holda hodisalarning bir qismi
   begona hisobga tushardi. */
const PIXEL_NOSCRIPT = `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1"/>`;

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
        {/* Joylashuvi shartli: `beforeInteractive` skriptni baribir
            `head` ga ko'chiradi (yuqoridagi izoh). `noscript` esa
            aynan shu yerda qoladi — u `body` ga tegishli element. */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PIXEL_SRC }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: PIXEL_NOSCRIPT }} />

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
