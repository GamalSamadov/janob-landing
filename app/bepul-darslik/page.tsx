import type { Metadata } from "next";
import { Pill } from "@/components/Pill";

/* SAHIFA STATIK. Unda o'zgaruvchi ma'lumot yo'q — matn ham, video ham,
   havola ham koddan keladi va `content.json` ga umuman murojaat
   qilinmaydi.

   TARIXI IKKI MARTA AYLANDI: avval statik edi, obuna qatori
   qo'shilishi bilan `force-dynamic` ga o'tdi (havolalar boshqaruv
   panelidan kelardi), qator olib tashlangach esa yana statikga qaytdi
   (muallif talabi, 2026-08-31).

   Boshqaruv panelidan boshqariladigan biror narsa QAYTSA —
   `export const dynamic = "force-dynamic"` ni ham tiklash kerak. */

export const metadata: Metadata = {
  title: "Videoni ko'ring",
  description:
    "Qisqa video — ko'rib chiqing, keyingi qadam videoning o'zida.",

  /* QIDIRUVGA TUSHMAYDI va bu ataylab. Bu sahifa ochiq katalog uchun
     emas — havolasi qo'lda yuboriladi. Indekslansa, u qidiruv
     natijalarida asosiy sahifa bilan bir joyni talashib qolardi va
     kimdir bu yerga videoning kontekstisiz kelib tushardi.

     QAYTARISH oson: shu blokni olib tashlash kifoya — `layout.tsx` dagi
     umumiy qoida (`index: true`) o'z-o'zidan kuchga kiradi. */
  robots: { index: false, follow: false },

  /* Sayt xaritasiga ham qo'shilmagan (`app/sitemap.ts`) — ikkalasi bitta
     qarorning ikki tomoni. */
  alternates: { canonical: "/bepul-darslik" },
};

/* VIDEO ENDI YOUTUBE DA (muallif talabi, 2026-09-05).

   Ilgari bu yerda Vidalytics turgan edi: sotuvchining bo'sh `div` i va
   uni to'ldiradigan inline skript (`next/script`). U ikki sababga ko'ra
   ketdi va ikkalasi ham bir kunda ko'rindi — xizmatning limiti tugab,
   player o'rniga "This video can't be played right now" chiqib qoldi,
   ya'ni sahifa tirik bo'lsa-da, o'zining yagona vazifasini bajarmay
   qo'ygandi. Ikkinchisi — dars allaqachon YouTube da yotibdi, ya'ni
   pullik xizmat shu yerda hech narsa qo'shmasdi.

   YOUTUBE `IFRAME` NING TARKI: uchinchi tomon skripti ham, `next/script`
   ham endi kerak emas — brauzerning o'z elementi kifoya. Shu sababli
   sahifada `use client` ham, gidratatsiyadan keyin ishlaydigan kod ham
   qolmadi.

   `rel=0` — video tugagach chetdan kelgan tavsiyalar chiqmasin (YouTube
   uni butunlay o'chirmaydi, lekin shu kanalning o'zi bilan cheklaydi).
   `playsinline=1` — iPhone videoni butun ekranga otib yubormasin, sahifa
   ko'rinib tursin: knopka aynan videoning tagida va u ko'zdan
   yo'qolmasligi kerak. `modestbranding=1` esa yuqori burchakdagi
   logotipni so'ndiradi. */
const YT_ID = "W5hlz5L4vQ8";
const YT_SRC = `https://www.youtube.com/embed/${YT_ID}?rel=0&playsinline=1&modestbranding=1`;

/* SAHIFADAGI YAGONA HARAKAT — Telegram bot (muallif bergan havola,
   2026-09-05).

   Ilgari knopka player ning ICHIDA edi: Vidalytics kerakli daqiqada
   videoning tagida o'z knopkasini chiqarardi va sahifada o'zining
   knopkasi bo'lishi shart emasdi. YouTube da bunday narsa yo'q —
   demak knopka sahifaga qaytadi. */
const BOT_URL = "https://t.me/janob_dasturchi_bot?start=kurs";

export default function BepulDarslikPage() {
  return (
    <main className="chal">
      {/* HERO NING O'Z FONI, o'zgartirilmagan holda (muallif talabi:
          "huddi hozirgi saytning hero sectioni kabi dezaynda").

          To'rttala qatlam ham `Hero.tsx` dagi bilan bir xil va bir
          tartibda: yer + tepa-o'ngdan sovuq nur, pastdan ko'tarilgan
          olov, o'lchov to'ri va don. Ular `.hero` ga emas, `absolute`
          joylashuvga tayanadi — shuning uchun `.chal` ham `relative`
          (`globals.css`). */}
      <div aria-hidden className="hero-backdrop">
        <span className="hero-sky" />
        <span className="hero-ember" />
        <span className="hero-grid" />
        <span className="hero-grain" />
      </div>

      <div className="shell chal-shell">
        {/* Olovli qism MAVZUNI aytadi, quyuq qism NIMA QILISHNI — hero
            dagi bilan bir xil bo'linish. */}
        <h1 className="t-hero chal-title">
          <span className="t-flame">AI bilan telegram bot yasab,</span> birinchi
          $200 ni ishlash
        </h1>

        <p className="t-lead chal-sub">
          50 daqiqa. Oxirigacha ko&apos;ring — men ishlatgan promptni video
          oxirida beraman.
        </p>

        {/* O'lchovni O'RAM belgilaydi, `iframe` emas: `iframe` o'ramni
            to'liq qoplaydi, o'ram esa enini EKRAN BALANDLIGIDAN oladi
            (`globals.css`) — shu tufayli video hech qachon knopkani
            ekrandan itarib yubormaydi.

            `title` MAJBURIY: `iframe` ning o'zi ekran o'quvchi uchun
            nomsiz ramka, ya'ni "nima bu?" degan savol javobsiz qolardi.

            `allow` dagi ro'yxat YouTube niki — undan faqat `autoplay`
            olib tashlangan: bu sahifada video o'z-o'zidan boshlanmaydi
            (tovush bilan boshlansa brauzer baribir to'xtatadi, ovozsiz
            boshlansa esa o'quvchi videoning boshini o'tkazib yuboradi).
            `allowFullScreen` esa 50 daqiqalik dars uchun shart. */}
        <div className="chal-video">
          <iframe
            src={YT_SRC}
            title="AI bilan telegram bot yasab, birinchi $200 ni ishlash"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* `pill-white` — sahifadagi YAGONA harakat, shuning uchun u
            hero dagi birinchi knopka bilan bir xil olovli yuzada.
            `external`: bot yangi varaqda ochiladi va o'quvchi videoga
            qaytib kela oladi — dars 50 daqiqa, ya'ni knopka ko'pincha
            videoning o'rtasida bosiladi. */}
        <Pill href={BOT_URL} external className="pill-white chal-cta">
          Bu yerga bosing
        </Pill>
      </div>
    </main>
  );
}
