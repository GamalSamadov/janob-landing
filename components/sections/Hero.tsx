import Image from "next/image";
import { Pill } from "../Pill";
import { Countdown } from "../Countdown";
import { SocialMini } from "../SocialMini";
import type { ActivePricing } from "@/lib/content";

interface Props {
  pricing: ActivePricing;
  /** Surat ostidagi ikkita kichik belgi uchun — butun `Content` emas, faqat
      shu ikki satr. Hero qolgan maydonlarga bog'lanmaydi. */
  social: { telegramChannelUrl: string; instagramUrl: string };
  /**
   * Muallif portreti. null bo'lsa ramka UMUMAN chizilmaydi va sarlavha
   * butun kenglikni oladi — bo'sh o'rin qolmaydi (PRODUCT.md, 3-tamoyil:
   * bo'sh blok soxta blokdan yaxshi).
   */
  photo: string | null;
}

/* Ikkala <Image> bir xil `sizes` bilan chaqiriladi — brauzer srcset dan
   AYNAN bitta faylni tanlaydi va uni ikkinchi marta yuklab o'tirmaydi.
   Shu tufayli ortdagi yorug'lik tekin tushadi. */
const PHOTO_SIZES = "(max-width: 1023px) 92vw, 30rem";

/* Lentadagi matn. Oxiridagi ajratgich bilan birga — ikki nusxa ulanganda
   so'zlar bir-biriga yopishmasligi uchun. */
const TAPE = "Jamol Samadov · Janob Dasturchi · ";

export function Hero({ pricing, photo, social }: Props) {
  // `overflow-hidden` ATAYLAB yo'q: fon bo'lim chegarasidan pastga chiqib
  // so'nishi kerak (qarang `.hero-backdrop`). Kesish o'sha fonning o'z
  // ichida — `.hero-backdrop` da.
  return (
    <section className="hero pt-32 pb-24 sm:pt-36 md:pb-28">
      <div aria-hidden className="hero-backdrop">
        <span className="hero-sky" />
        <span className="hero-ember" />
        <span className="hero-grid" />
        <span className="hero-grain" />
      </div>

      <div className="shell relative" style={{ zIndex: 1 }}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className={photo ? "lg:col-span-7" : "lg:col-span-12"}>
            {/* Gradient MAVZUDA, harakat esa oq — referensdagi tuzilish:
                issiq qism nima haqida ekanini aytadi, oq qism nima
                qilishni. */}
            <h1 className="t-hero">
              <span className="t-flame">AI bilan daromadga</span> chiqing
            </h1>

            <p className="t-lead mt-7 md:mt-9">
              Zamonaviy AI instrumentlari bilan stabil onlayn daromad qilishni{" "}
              {/* Brauzer defisdan keyin qator uzadi va "0-" qator oxirida
                  yolg'iz qolardi. "0-dan" — bitta so'z, bo'linmaydi. */}
              <span className="whitespace-nowrap">0-dan</span>{" "}
              o&apos;rganing!
            </p>

            {/* KNOPKA VA SOAT BIR QATORDA (muallif talabi, 2026-08-17).
                Ilgari soat knopkaning TAGIDA turardi va hero uch qavat
                bo'lib cho'zilardi.

                `items-center` — O'RTASI bo'yicha tekislanadi (muallif talabi,
                2026-08-17). Ilgari bu yerda `items-end` turgan va ikkalasi
                pastki cheti bilan bir chiziqda o'tirardi.

                `flex-wrap` — tor ekranda ular avvalgidek ustma-ust tushadi;
                yonma-yon 443px joy kerak, telefonda esa buncha yo'q.

                YUQORIDAGI VA QATORLAR ORASIDAGI BO'SHLIQ soatning
                sarlavhasiga joy qoldiradi: u oqimdan chiqarilgan (qarang
                `Countdown.tsx`), ya'ni o'z joyini o'zi egallamaydi va uni
                shu yerda hisobga olish kerak — 26px (matn + oraliq). Shu
                sababli `mt-8` emas `mt-14`, `gap-y-6` emas `gap-y-11`:
                usiz sarlavha tepadagi paragrafga, telefonda esa
                knopkaning o'ziga tegib turardi. */}
            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-11">
              {/* `pill-white` — faqat SHU knopkada (muallif talabi,
                  2026-08-17). Sahifadagi birinchi harakat oq yuzada
                  turadi; hover esa avvalgidek qoladi, izohi
                  `globals.css` da. */}
              <Pill href="#paketlar" className="pill-white">
                0-dan boshlash
              </Pill>

              {pricing.endsAt && (
                <Countdown
                  endsAt={pricing.endsAt}
                  /* Matn narx bosqichini ATAYLAB aytmaydi (muallif talabi,
                     2026-08-17). O'quvchiga bosqichning NOMI emas,
                     shoshilish sababi kerak. Paketlar bo'limidagi soat ham
                     endi AYNAN shu matnni ko'rsatadi. */
                  title="Chegirma muddati cheklangan"
                />
              )}
            </div>
          </div>

          {photo && (
            <figure className="portrait portrait-right lg:col-span-5">
              {/* Suratning xiralashtirilgan nusxasi — hero yorug'ligi shu
                  yerdan tarqaladi. `alt=""`: bu bezak, mazmun emas. */}
              <span className="portrait-spill">
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes={PHOTO_SIZES}
                  className="object-cover"
                  /* Bu ramkadagi surat bilan AYNAN bir xil fayl (qarang
                     yuqorida, `PHOTO_SIZES`), shuning uchun bu yerda `preload`
                     ni takrorlashning ma'nosi yo'q — kerakligi bittagina: u
                     kechiktirilmasin, chunki hero yorug'ligi shundan chiqadi.
                     `<head>` ga ortiqcha narsa qo'shilmaydi: o'lchandi, ikkala
                     chaqiruv bitta preload havolasiga yig'iladi, chunki manba
                     ham, `sizes` ham bir xil. */
                  loading="eager"
                />
              </span>

              <div className="portrait-frame">
                <div className="portrait-crop">
                  <Image
                    src={photo}
                    alt="Jamol Samadov"
                    fill
                    sizes={PHOTO_SIZES}
                    /* Manba 9:16, kadr 4/5 — balandlikning ~30% i kesiladi.
                       62% yuzni kadrning yuqori uchdan biriga olib chiqadi:
                       past qiymat suratning TEPASINI ko'proq ko'rsatadi,
                       ya'ni yuz pastga siljiydi. */
                    style={{ objectPosition: "50% 62%" }}
                    className="object-cover"
                    /* SAHIFANING LCP ELEMENTI — o'lchandi, taxmin emas:
                       `next dev` uni aynan shunday deb belgilaydi.

                       Ilgari bu yerda `priority` turgan edi va u Next 16 da
                       BEKOR QILINGAN (`node_modules/next/dist/docs` →
                       image.md: "v16.0.0 — `preload` prop added, `priority`
                       prop deprecated"). Bekor qilinishi jimjit o'tgan:
                       xatolik chiqmagan, lekin ish ham bajarilmay qolgan —
                       tekshirildi, brauzerga yetib borgan `<img>` da
                       `loading="auto"`, `fetchpriority="auto"` turardi va
                       `<head>` da hech qanday preload yo'q edi. Ya'ni
                       sahifaning eng katta surati navbatda umumiy asosda
                       turgan.

                       O'RNIGA `preload` EMAS, `loading` — garchi hujjatda
                       `preload` aynan "LCP elementi, hero surati" uchun
                       deyilgan bo'lsa ham. Sabab o'lchovdan chiqdi:
                       `preload` bilan Next ning o'z ogohlantirishi
                       ("detected as the Largest Contentful Paint") KETMADI.
                       Manbaga qaraldi (`shared/lib/get-img-props.js`):
                       tekshiruv `lcpImage.loading === 'lazy'` ga qaraydi,
                       `preload` esa bu qiymatga umuman tegmaydi — ya'ni
                       surat oldindan yuklansa ham, Next uchun u "lazy"
                       bo'lib qolaverardi. `loading="eager"` esa ikkalasini
                       ham beradi: ogohlantirish yo'q va `<head>` ga preload
                       havolasi baribir qo'yiladi (tekshirildi). Hujjatning
                       o'z xulosasi ham shu: "In most cases, you should use
                       `loading="eager"` ... instead of `preload`". */
                    loading="eager"
                  />
                  <span aria-hidden className="portrait-vignette" />
                  <span aria-hidden className="portrait-sheen" />

                  {/* Ogohlantirish lentasi burchakni kesib o'tadi.
                      `aria-hidden`: nom yonidagi matnlarda allaqachon bor,
                      ekran o'quvchi uni cheksiz takrorlab o'qimasligi kerak.
                      Ikkita bir xil nusxa — birinchisi chapga chiqib
                      ketganda ikkinchisi o'rnini egallaydi, shuning uchun
                      halqa uzilmaydi. */}
                  <span aria-hidden className="tape">
                    <span className="tape-track">
                      <span className="tape-run">{TAPE}</span>
                      <span className="tape-run">{TAPE}</span>
                    </span>
                  </span>
                </div>
              </div>

              {/* Belgilar ramkaning ICHIDA emas, ostida va o'ng chekkasida —
                  surat bilan bir chiziqda tugaydi. Ular hero ning eng
                  oxirgi elementi: bu yerda ular hech narsani bo'lmaydi va
                  qidirgan odam ularni aynan shu yerdan topadi. */}
              <SocialMini
                telegramChannelUrl={social.telegramChannelUrl}
                instagramUrl={social.instagramUrl}
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
