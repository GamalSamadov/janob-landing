import { Countdown } from "../Countdown";
import { Check, Clock, Layers, Plus, Telegram } from "../Icons";
import {
  priceFor,
  telegramLink,
  formatPrice,
  type ActivePricing,
} from "@/lib/content";
import type { Content, Package } from "@/lib/types";

interface Props {
  content: Content;
  pricing: ActivePricing;
}

/**
 * Paket oldingisining ustiga qurilganmi?
 *
 * TAKRORLASH O'RNIGA HAVOLA (muallif talabi, 2026-08-17): PRO ning bandlari
 * START nikini so'zma-so'z takrorlar edi va uchala ustunni yonma-yon
 * qo'yganda ko'z o'sha beshta qatorni ikki marta o'qishga majbur bo'lardi —
 * paketlar orasidagi HAQIQIY farq (to'rtta "+" band) esa o'sha takrorning
 * ostida ko'rinmay qolardi.
 *
 * Tekshiruv MA'LUMOTDAN boradi, paket nomidan emas. "PRO bo'lsa yig'ib
 * qo'y" deb yozish osonroq edi, lekin u admin panelida bandlar
 * o'zgartirilishi bilan yolg'onga aylanardi: PRO dan bir band olib
 * tashlansa ham sahifa baribir "START dagi hammasi" deb turaverardi.
 * Bu yerda esa shart aniq — oldingi paketning HAR BIR bandi shu paketda
 * ham bo'lsa, ular bitta qatorga yig'iladi.
 */
function inheritsFrom(p: Package, prev: Package | null): prev is Package {
  return (
    prev !== null && prev.base.length > 0 && prev.base.every((b) => p.base.includes(b))
  );
}

export function Packages({ content, pricing }: Props) {
  return (
    /* YORUG' VARAQ (muallif talabi, 2026-08-17): bo'lim oq fonda, ustiga
       mayin qizil gradient tushgan holda chiziladi.

       IKKITA sinf va ikkalasi ham kerak. `sheet-light` — mexanizm: rang
       tokenlarini yorug' rejimga o'tkazadi va shisha, yorliq, knopka kabi
       hamma material shundan keyin o'z-o'zidan yorug' fonga moslashadi
       (qarang `globals.css` → `.sheet-light .glass` va boshqalar).
       `sheet-white` esa faqat FONNI almashtiradi: krem qog'oz o'rniga oq
       varaq. Ya'ni bu yerda yangi tizim yasalmadi — krem varaqning tizimi
       ishlatildi, ustidan boshqa rang qo'yildi. */
    <section
      id="paketlar"
      className="section relative overflow-clip sheet-light sheet-white"
    >
      <div
        className="field float-field"
        style={{
          width: "62vw",
          height: "62vw",
          maxWidth: 820,
          maxHeight: 820,
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.55,
          background:
            "radial-gradient(circle, rgba(255,74,28,.15), rgba(255,159,10,.06) 46%, transparent 72%)",
        }}
      />

      <div className="shell relative" style={{ zIndex: 1 }}>
        {/* TELEFONDA BO'SHLIQ KATTAROQ (`gap-11`) va sababi soatning
            sarlavhasida: u oqimdan chiqarilgan, ya'ni o'z joyini
            egallamaydi va uni shu yerda hisobga olish kerak — 26px
            (matn + oraliq). `gap-8` da yuqoridagi paragrafgacha atigi
            4px qolardi (o'lchandi). Kompyuterda tartib QATOR bo'lib
            qoladi, ya'ni oraliq yon tomonga o'tadi va u yerda 26px
            muammosi umuman yo'q — shuning uchun `md:gap-8` qaytariladi. */}
        <div className="flex flex-col gap-11 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            {/* IKKI QATOR (muallif talabi, 2026-08-17). Kenglik shu bitta
                ish uchun: 13ch da sarlavha uch qatorga bo'linardi. 19ch —
                "O'ZINGIZGA MUNOSIB" sig'adigan, lekin butun gap bir
                qatorga chiqib ketmaydigan eng tor o'lchov; qolganini
                `.t-h2` dagi `text-wrap: balance` tenglashtiradi. */}
            <h2 className="t-h2" style={{ maxWidth: "19ch" }}>
              O&apos;zingizga munosib paketni tanlang
            </h2>
            {/* BOSQICH NOMI AYTILMAYDI (muallif talabi, 2026-08-17).
                Ilgari bu yerda "Hozir standard chegirma amal qilmoqda"
                deb yozilardi — ya'ni sahifa o'quvchiga chegirmaning ICHKI
                nomini aytardi. Unga esa faqat bitta narsa muhim: chegirma
                bor. Qaysi turdagi ekani sotuvchining hisobi, xaridorniki
                emas. Nuqta ham olib tashlandi. */}
            {pricing.mode !== "original" && (
              <p className="t-lead mt-5">Hozirda chegirma amal qilmoqda</p>
            )}
          </div>

          {/* Sarlavha soatning USTIDA — hero dagidek (muallif talabi,
              2026-08-17). Ilgari u shishaning ichida, raqamlar tepasida
              turardi. */}
          {pricing.endsAt && (
            <Countdown
              endsAt={pricing.endsAt}
              title="Chegirma muddati cheklangan"
            />
          )}
        </div>

        {/* `items-start` OLIB TASHLANDI (muallif talabi, 2026-08-17):
            kartalar endi bir xil bo'yda. To'rning sukut holati aynan shu
            (`stretch`), ya'ni hamma karta eng balandiga tenglashadi;
            ichkarida esa pastki blok `mt-auto` bilan tagga qadalgan, ya'ni
            bandlar soni har xil bo'lsa ham knopkalar bitta chiziqda
            turadi. */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {content.packages.map((p, i) => {
            const { now, was } = priceFor(p.prices, pricing.mode);
            const hot = p.featured;

            /* Oldingi paket — "…dagi hammasi" qatorining manbai. */
            const prev = i > 0 ? content.packages[i - 1] : null;
            const inherits = inheritsFrom(p, prev);
            // Yig'ilgan bo'lsa, faqat O'ZINIKI qoladi (hozircha bo'sh,
            // lekin admin panelida PRO ga band qo'shilsa shu yerda chiqadi).
            const own = inherits
              ? p.base.filter((b) => !prev.base.includes(b))
              : p.base;

            return (
              <div
                key={p.id}
                /* PRO kartaning issiq yuzasi CSS DA (`.pkg-hot`), bu yerda
                   emas. Ilgari u shu joyda `style` bo'lib turgan edi va
                   bo'lim yorug' rejimga o'tganda aynan shu narsa yo'l
                   bermadi: ichki uslubni hech qanday sinf yenga olmaydi,
                   ya'ni PRO qora fonga sozlangan holicha oq varaqda qolib
                   ketardi. Qiymatlar o'zgargani yo'q — faqat joyi
                   o'zgardi, endi ular yorug' variant bilan yonma-yon
                   turibdi (qarang `globals.css` → `.pkg-hot`). */
                className={`glass reveal relative flex flex-col overflow-hidden rounded-[30px] ${
                  hot ? "pkg-hot" : "glass-quiet"
                }`}
              >
                {hot && (
                  <span
                    className="absolute right-5 top-5 rounded-full px-3 py-1.5"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#0a0b0f",
                      background:
                        "linear-gradient(120deg, var(--orange), #fff 46%, var(--flame))",
                      boxShadow: "0 5px 16px -4px rgba(255,110,20,.6)",
                    }}
                  >
                    TOP
                  </span>
                )}

                <div className="px-7 pt-8 sm:px-8">
                  <h3 className="t-tier">{p.name}</h3>
                  <p
                    className="mt-2.5 t-item"
                    style={{ color: "var(--text-3)", maxWidth: "26ch" }}
                  >
                    {p.tagline}
                  </p>

                  {/* Narx */}
                  <div className="mt-7 flex items-end gap-3">
                    <span
                      className="t-num leading-none"
                      style={{
                        fontSize: "clamp(2.6rem, 6vw, 3.4rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.045em",
                      }}
                    >
                      {formatPrice(now)}
                    </span>
                    {/* TEKISLASH BO'SHLIG'I O'RAMDA, `.strike` DA EMAS
                        (tuzatilgan xato, 2026-08-17).

                        Ilgari `pb-2` ning o'zi chizilgan matnda turardi va
                        chiziq shu sababli PASTGA tushib qolgandi: u
                        elementning O'RTASIGA qo'yiladi (`top: 52%`),
                        o'rta esa 8px bo'shliq qo'shilgach matndan
                        pastroqqa siljib ketardi (o'lchandi: ~5px).

                        Endi bo'shliq tashqarida — `.strike` ning qutisi
                        aynan matnning o'zi, ya'ni chiziq har qanday kegil
                        va har qanday tekislashda ham joyida qoladi. */}
                    {was !== null && (
                      <span className="pb-2">
                        <span
                          className="strike t-num"
                          style={{ fontSize: "1.25rem", fontWeight: 500 }}
                        >
                          {formatPrice(was)}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <hr className="rule my-7" />

                <ul className="flex flex-col gap-3 px-7 sm:px-8">
                  {/* YIG'ILGAN QATOR — oldingi paketning butun ro'yxati
                      o'rnida. Qolgan bandlardan QALINROQ va yorug'roq:
                      bu band emas, ro'yxatning sarlavhasi. */}
                  {inherits && (
                    <li className="flex items-start gap-3">
                      <span
                        className="mt-[3px] flex-none"
                        style={{ color: "var(--flame-3)" }}
                      >
                        <Check size={17} />
                      </span>
                      <span className="t-item-plus">
                        {prev.name} paketidagi hammasi
                      </span>
                    </li>
                  )}

                  {own.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        className="mt-[3px] flex-none"
                        style={{ color: "var(--flame-3)" }}
                      >
                        <Check size={17} />
                      </span>
                      <span className="t-item" style={{ color: "var(--text-2)" }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {p.extras.length > 0 && (
                  <ul className="mt-5 flex flex-col gap-3 px-7 sm:px-8">
                    {p.extras.map((e) => (
                      <li key={e} className="flex items-start gap-3">
                        <span
                          className="mt-[2px] flex-none"
                          style={{ color: "var(--orange)" }}
                        >
                          <Plus size={17} />
                        </span>
                        <span className="t-item-plus">{e}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* PASTKI BLOK. Yorliqlar shu yerga TUSHDI (muallif talabi,
                    2026-08-17) — ilgari ular narxning ostida turardi.
                    Sababi tartibda: narx va bandlar — VA'DA, qamrov bilan
                    muddat esa uning SHARTI, ya'ni ular gapning oxirida,
                    knopkaning yonida o'qilishi kerak. */}
                <div className="mt-auto px-7 pb-8 pt-9 sm:px-8">
                  <div className="mb-6 flex flex-wrap gap-2.5">
                    <span className="chip chip-scope">
                      <span aria-hidden className="chip-ic">
                        <Layers size={13} />
                      </span>
                      {p.scope}
                    </span>
                    <span className="chip chip-access">
                      <span aria-hidden className="chip-ic">
                        <Clock size={13} />
                      </span>
                      {p.access}
                    </span>
                  </div>

                  <a
                    href={telegramLink(content.telegramUsername, p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    /* MINI va START — QORA (muallif talabi, 2026-08-17).
                       Ilgari ular oq shisha edi va oq kartada deyarli
                       ko'rinmasdi; endi PRO ning olov rangi bilan
                       raqobatlashmagan holda o'z og'irligiga ega. */
                    className={`pill w-full justify-between ${
                      hot ? "pill-primary" : "pill-ink"
                    }`}
                  >
                    <span>{p.name} paketini olish</span>
                    <Telegram size={16} className="pill-icon" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
