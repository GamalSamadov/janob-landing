import type { Metadata } from "next";
import { LessonVideo } from "./LessonVideo";
import { OfferTimer } from "./OfferTimer";
import { Pill } from "./Pill";
import { WatchGate } from "./WatchGate";

/* BITTA SAHIFA, IKKI MARSHRUT (muallif talabi, 2026-09-07).

   `/bepul-darslik` va `/challange-darslik` — bir-biriga aynan o'xshash
   ikki sahifa. Birinchi farqi knopkaning havolasida:

     /bepul-darslik      -> ?start=kurs
     /challange-darslik  -> ?start=challange

   VA BU FARQ O'LCHOV UCHUN. Muallifga trafik ikki oqimdan keladi va
   ular bir xil emas: `challange` — pullik reklama (Meta Ads), `kurs` —
   Reels dan kelgan bepul trafik. Bot boshlanish parametrini eslab
   qoladi, ya'ni har bir obunachi qaysi oqimdan kelgani ma'lum bo'ladi.
   Reklama byudjetini shu bo'linishsiz baholab bo'lmaydi.

   SAHIFA SHU YERDA, MARSHRUTLARDA EMAS — ataylab. Ikki nusxa qilinsa,
   ular BIR MUDDAT bir xil turardi, keyin esa biri o'zgarib, ikkinchisi
   qolib ketardi (odatda bittasini tuzatib, ikkinchisi esdan chiqadi).
   Talab esa "точь-в-точь", ya'ni farq faqat bitta joyda — `botUrl` da
   bo'lishi kerak. Marshrut fayllarida shuning uchun ikki qator qoldi:
   o'z metadatasi va shu komponent.

   IKKINCHI FARQ — `gate` (muallif talabi, 2026-09-09) va u FAQAT
   reklama oqimida bor:

     /bepul-darslik      -> gate yo'q: knopka darrov turadi, taymer yo'q
     /challange-darslik  -> gate bor: taklif taymeri va kechikkan knopka

   Sabab oqimlarning narxida. Reklamadan kelgan odam pulga kelgan va u
   videoni ko'rmasdan botga o'tib ketsa, byudjet ko'rilmagan darsga
   sarflanadi. Reels dan kelgan bepul trafikda bunday narx yo'q, ya'ni
   uni ushlab turishning ham ma'nosi yo'q — o'sha sahifa avvalgidek
   qoladi.

   FARQ SHU YERDA HAL BO'LADI, sahifa ikkiga bo'linmaydi: `gate`
   berilmasa, razmetka 2026-09-09 gacha qanday bo'lsa, shundayligicha
   chiziladi — mijoz tomonda ishlaydigan kod ham yuklanmaydi.

   YANGI OQIM QO'SHISH — uch qadam: `app/<nom>/page.tsx` yasash,
   `darslikMetadata("/<nom>")` ni chaqirish va `botUrl` ga yangi
   `?start=...` ni berish. Bu faylga tegilmaydi. */

/* METADATA HAM SHU YERDA va sababi yuqoridagi bilan bir xil: nom,
   izoh va qidiruvdan yashirish ikkala marshrutda ham bir xil bo'lishi
   kerak. Faqat kanonik manzil har birida o'zi — u sahifaning o'z
   manzili, ya'ni umumiy bo'lolmaydi.

   `Metadata` ni marshrut faylining O'ZI eksport qilishi shart (Next.js
   uni komponentdan o'qimaydi), shuning uchun bu yerda tayyor obyekt
   emas, uni yasaydigan funksiya turadi. */
export function darslikMetadata(canonical: string): Metadata {
  return {
    title: "Videoni ko'ring",
    description:
      "Qisqa video — ko'rib chiqing, keyingi qadam videoning o'zida.",

    /* QIDIRUVGA TUSHMAYDI va bu ataylab. Bu sahifalar ochiq katalog
       uchun emas — havolasi qo'lda yoki reklamada yuboriladi.
       Indekslansa, ular qidiruv natijalarida asosiy sahifa bilan bir
       joyni talashib qolardi va kimdir bu yerga videoning kontekstisiz
       kelib tushardi.

       IKKI SAHIFA BO'LGACH bu qoidaning ikkinchi vazifasi ham paydo
       bo'ldi: ular bir xil matnli ikki manzil, ya'ni indekslansa
       qidiruv tizimi uchun nusxa (`duplicate content`) bo'lardi.

       QAYTARISH oson: shu bandni olib tashlash kifoya — `layout.tsx`
       dagi umumiy qoida (`index: true`) o'z-o'zidan kuchga kiradi. */
    robots: { index: false, follow: false },

    /* Sayt xaritasiga ham qo'shilmagan (`app/sitemap.ts`) — ikkalasi
       bitta qarorning ikki tomoni. */
    alternates: { canonical },
  };
}

/* VIDEO YOUTUBE DA (muallif talabi, 2026-09-05).

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
   logotipni so'ndiradi.

   VIDEO IKKALA MARSHRUTDA HAM BITTA: oqimlar bir xil darsga keladi,
   ular faqat sanoqda ajraladi. */
const YT_ID = "W5hlz5L4vQ8";
const YT_SRC = `https://www.youtube.com/embed/${YT_ID}?rel=0&playsinline=1&modestbranding=1`;

/* `enablejsapi=1` — pleerdan tashqaridan so'rash uchun YAGONA shart:
   usiz `getCurrentTime()` javob bermaydi va knopka hech qachon
   ochilmasdi. Faqat gate rejimida qo'shiladi — bepul oqimdagi ramka
   avvalgidek, hech qanday boshqaruvsiz qoladi. */
const YT_SRC_API = `${YT_SRC}&enablejsapi=1`;

/** Pleer ramkasining nomi — `WatchGate` uni shu nom bilan topadi. */
const FRAME = "chal-player";

interface Props {
  /* Sahifadagi YAGONA harakat. Uni marshrut beradi — yuqoridagi
     izohga qarang. */
  botUrl: string;
  /**
   * Reklama oqimining qo'shimchasi. Berilmasa — sahifa avvalgidek.
   *
   * `offerHours` — taklif taymeri necha soatdan boshlanadi (har bir
   * o'quvchiga o'zi, birinchi kirgan paytidan; qarang `OfferTimer`).
   * `watchMinutes` — knopka ochilishi uchun ko'rilishi kerak bo'lgan
   * daqiqa (qarang `WatchGate`).
   */
  gate?: { offerHours: number; watchMinutes: number };
}

export function DarslikPage({ botUrl, gate }: Props) {
  /* `pill-white` — sahifadagi YAGONA harakat, shuning uchun u hero dagi
     birinchi knopka bilan bir xil olovli yuzada. `external`: bot yangi
     varaqda ochiladi va o'quvchi videoga qaytib kela oladi — dars 50
     daqiqa, ya'ni knopka ko'pincha videoning o'rtasida bosiladi.

     MATN IKKALA MARSHRUTDA HAM BIR XIL: o'quvchi qaysi havoladan
     kelganini bilmaydi va bilishi ham shart emas — bo'linish faqat sanoq
     uchun.

     KNOPKA SHU YERDA YASALADI va ikkala holatda ham AYNAN SHU ketadi:
     gate uni faqat KEYINROQ ko'rsatadi, boshqasini yasamaydi. Aks holda
     ikkita knopka bo'lardi va biri ikkinchisidan orqada qolardi. */
  const cta = (
    <Pill href={botUrl} external className="pill-white chal-cta">
      Bu yerga bosing
    </Pill>
  );

  return (
    <main className={gate ? "chal chal-gated" : "chal"}>
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

        {/* TAKLIF TAYMERI VIDEONING USTIDA (muallif talabi, 2026-09-09):
            u sahifa ochilgan zahoti, video ko'rilmasdan OLDIN ko'rinishi
            kerak — shoshilish sababi darsning o'zidan burun aytiladi.

            Joyi bo'sh joydan emas, VIDEONING byudjetidan olinadi:
            `.chal-gated` o'sha byudjetni taymer va uning oralig'i
            qadar kichraytiradi (`globals.css`). Aks holda sahifa
            "hammasi bitta ekranda" qoidasini buzardi. */}
        {gate && (
          <OfferTimer hours={gate.offerHours} title="Taklif tugashiga" />
        )}

        <LessonVideo
          src={gate ? YT_SRC_API : YT_SRC}
          frameId={gate ? FRAME : undefined}
        />

        {/* Gate bo'lmasa knopka TO'G'RIDAN-TO'G'RI, hech qanday o'ramsiz
            chiziladi — bepul oqimdagi razmetka 2026-09-09 dan oldingiday
            qoladi. */}
        {gate ? (
          <WatchGate
            frameId={FRAME}
            minutes={gate.watchMinutes}
            hint="Havola video davomida ochiladi — ko'rishda davom eting"
          >
            {cta}
          </WatchGate>
        ) : (
          cta
        )}
      </div>
    </main>
  );
}
