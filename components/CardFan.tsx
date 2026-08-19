"use client";

import { useEffect, useState } from "react";
import { Layers, Lens, Spark, Tag, Target, Trend } from "./Icons";

/* KARTALAR — kursning javoblari.
   ===========================================================================

   SURAT YO'Q (muallif talabi, 2026-08-17). Kartada bir muddat AI bilan
   chizilgan suratlar turgan edi; ular olib tashlandi va kartaning ma'nosini
   endi UCH narsa aytadi: rang, ikonka va sarlavha.

   HAR KARTADA O'Z GRADIENTI va u o'ylab topilgan rang emas — sahifaning
   o'z palitrasidan (`:root` dagi `--flame`, `--orange`, `--green`, `--teal`,
   `--blue`, `--purple` tokenlari) olingan. Oltitasi birga spektr bo'ylab
   bir marta aylanadi: olov → sariq → yashil → moviy → ko'k → siyohrang.
   Shuning uchun kartalar bir-biridan farq qiladi, lekin bittasi ham
   sahifadan tashqarida turmaydi.

   `a` — gradientning TEPA rangi (yorug', kartaning tusini aytadi),
   `b` — PASTKI rangi va u ataylab QUYUQ: matn aynan shu yerda turadi va
   oq harflarning o'qilishi shu qiymatga bog'liq. Yorug' pastki rang
   tanlansa, karta chiroyli bo'lardi-yu, matni yo'qolardi.

   Birinchi karta ATAYLAB olov rangida: u sahifaning asosiy va'dasi
   ("ilk daromad") va sahifaning qolgan hamma joyi shu rangda. */
const CARDS = [
  {
    h: "Ilk $200",
    t: "Ilk $200 lik xizmatingizni sotasiz",
    Icon: Tag,
    a: "#ff7a1a",
    b: "#8c1400",
  },
  {
    h: "AI instrumentlari",
    t: "Zamonaviy AI instrumentlarini to'liq o'zlashtirasiz",
    Icon: Spark,
    a: "#a97cf5",
    b: "#34177a",
  },
  {
    h: "3+ loyiha",
    t: "O'zingiz qurgan 3+ ta loyiha portfoliosi",
    Icon: Layers,
    a: "#3aa0ff",
    b: "#0b3a80",
  },
  {
    h: "Mijozlar oqimi",
    t: "Barqaror mijozlar oqimini taminlab olasiz",
    Icon: Lens,
    a: "#5fd8f0",
    b: "#084a63",
  },
  {
    h: "Sotuv usuli",
    t: "Mijozlarga sotuv qilish usulini olasiz",
    Icon: Target,
    a: "#ffb020",
    b: "#8a4400",
  },
  {
    h: "Barqaror daromad",
    t: "Barqaror daromad strategiyasini olasiz",
    Icon: Trend,
    a: "#45e07a",
    b: "#08532b",
  },
];

/* YELPIG'ICHNING UYALARI. Har bir karta shu uyalardan birida turadi va
   uyalar orasida sekin ko'chib yuradi — aylanish shundan chiqadi.

   `x` — PIKSEL EMAS, `--fan-x` ning karrasi. Yelpig'ich telefonda ham
   ochilishi kerak, o'lchov esa faqat bitta joyda — konteynerda — turadi.

   OXIRGI UYA (-3) MARKAZIY MEXANIZM va u ataylab `+2` BILAN AYNAN BIR XIL
   joyda turadi, farqi faqat ko'rinmasligida.

   Sababi cheksiz aylanishning o'z tabiatida: kartalar halqa bo'ylab yursa,
   aylanada BITTA joy bo'ladi — oxirgi uyadan birinchisiga qaytish — va u
   sakrash bo'lib ko'rinadi. Agar kutish uyasi chapda bo'lsa, karta chap
   chetdan o'ng chetga butun yelpig'ich bo'ylab uchib o'tardi.
   Ikkalasi bir joyda bo'lsa, "qaytish" da karta umuman qimirlamaydi —
   faqat ko'rinadigan bo'ladi. Ya'ni sakrash yo'q, chunki masofa yo'q. */
const SLOTS: Record<
  number,
  { x: number; y: number; r: number; s: number; z: number }
> = {
  "-3": { x: 2.02, y: 2.5, r: 13, s: 0.83, z: 1 },
  "-2": { x: -2.02, y: 2.5, r: -13, s: 0.83, z: 2 },
  "-1": { x: -1.05, y: 0.72, r: -6.5, s: 0.93, z: 3 },
  "0": { x: 0, y: 0, r: 0, s: 1, z: 4 },
  "1": { x: 1.05, y: 0.72, r: 6.5, s: 0.93, z: 3 },
  "2": { x: 2.02, y: 2.5, r: 13, s: 0.83, z: 2 },
};

const STEP_MS = 2200;

/* BOSILGANDA O'TISH TEZROQ (muallif talabi, 2026-08-17).

   O'z-o'zidan aylanishda karta 0.9s da ko'chadi va bu to'g'ri: harakat
   fonda ketyapti, ko'z uni kuzatmaydi. Bosish esa BUYRUQ — foydalanuvchi
   natijani kutib turadi, 0.9s da esa karta sudralib kelayotgandek
   tuyuladi. 0.42s "darhol" bo'lib his qilinadi, lekin sakrash ham emas. */
const CLICK_MS = 420;

/** Kartaning hozirgi uyasi: [-3 … +2] oralig'ida. */
function slotOf(i: number, active: number, n: number) {
  const d = (((i - active) % n) + n) % n;
  return d > 2 ? d - n : d;
}

/**
 * Yoyilgan kartalar — bo'limning javoblari cheksiz aylanadi.
 *
 * Tuzilishi referens dizayndan (muallif bergan, 2026-08-17): markazdagi
 * karta tik va eng katta, chetdagilari kichrayib, qiyshayib ortga ketadi,
 * matn esa yelpig'ichning OSTIDA turadi.
 */
export function CardFan() {
  const n = CARDS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Bosishdan keyingi tez o'tish. Bir qadamgina yashaydi va o'zi
     o'chadi — keyingi avtomatik qadam yana sokin tezlikda ketishi
     kerak. */
  const [rushing, setRushing] = useState(false);

  /* `active` HAM BOG'LIQLIKDA va bu bosish uchun kerak: karta bosilganda
     soat NOLDAN boshlanadi, ya'ni tanlangan karta markazga kelib, darrov
     keyingisiga almashib ketmaydi. Usiz bosish oldingi qadamning
     qoldig'iga tushib qolardi. */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => clearInterval(id);
  }, [paused, n, active]);

  useEffect(() => {
    if (!rushing) return;
    const id = setTimeout(() => setRushing(false), CLICK_MS);
    return () => clearTimeout(id);
  }, [rushing]);

  return (
    <div
      className="fan"
      /* Kursor ustida TO'XTAYDI. Kartada gap bor, uni o'qib bo'lish kerak —
         3.2 soniya esa uzun gapga yetmasligi mumkin. Bu bezak emas: aylanma
         karusel o'qishga xalaqit bermasligi kerak. */
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {CARDS.map(({ h, t, Icon, a, b }, i) => {
        const d = slotOf(i, active, n);
        const p = SLOTS[d];

        /* Kutish uyasiga (-3) O'TISH — O'TISHSIZ. Halqadagi yagona
           "qaytish" qadami aynan shu va u bir zumda bajarilishi kerak:
           karta chap chetdan o'ng chetga ko'chadi, ya'ni o'tish yoqilgan
           bo'lsa u butun yelpig'ich bo'ylab sudralib o'tardi. Karta o'sha
           uyada ko'rinmaydi (o'shshaflik 0), demak bir zumdagi ko'chish
           umuman sezilmaydi. */
        const jumping = d === -3;

        /* MARKAZDAGI KARTA BOSILMAYDI: u allaqachon markazda va bosish
           hech narsa qilmasdi. Shu sababli `role`, `tabIndex` va kursor
           ham unga berilmaydi — ko'rinishida ham, klaviaturada ham u
           bosiladigan jism bo'lib turmaydi. */
        const clickable = d !== 0;
        const bring = () => {
          setActive(i);
          setRushing(true);
        };

        return (
          <article
            key={t}
            className="fan-card"
            data-slot={d}
            {...(clickable && {
              role: "button",
              tabIndex: 0,
              "aria-label": `${h} kartasini markazga chiqarish`,
              onClick: bring,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  bring();
                }
              },
            })}
            style={
              {
                zIndex: p.z,
                transform: `translate(calc(var(--fan-x) * ${p.x}), calc(var(--fan-y) * ${p.y})) rotate(${p.r}deg) scale(${p.s})`,
                transition: jumping
                  ? "none"
                  : rushing
                    ? `transform ${CLICK_MS}ms var(--ease-out), opacity ${CLICK_MS}ms var(--ease-out)`
                    : undefined,
                /* Kartaning ikki rangi BITTA joydan tarqaladi: gradient,
                   ikonka kafeli va tashqi nur — hammasi shu ikkovidan
                   hisoblanadi (qarang `globals.css` → `.fan-card`). */
                "--ca": a,
                "--cb": b,
              } as React.CSSProperties
            }
          >
            {/* KARTANING YUZASI — gradientning o'zi. */}
            <span aria-hidden className="fan-art" />

            {/* PARDA — matn ostidagi yumshoq quyuqlik. Gradientdan KEYIN
                yoziladi, chunki ikkalasi ham `absolute` va bir xil
                qatlamda: bunday jismlar markupdagi tartibda chiziladi. */}
            <span aria-hidden className="fan-veil" />

            {/* IKONKA — kartaning belgisi, matn ustidagi bo'sh joyning
                o'rtasida. `margin: auto` uni qolgan bo'shliqqa markazlaydi
                (qarang `globals.css` → `.fan-ic`). */}
            {/* Belgi kafelning ~52% i. Nisbat o'lchandi: 46% da belgi
                kafelning ichida yo'qolib, kafel bo'sh yuza bo'lib
                ko'rinardi; 60% dan oshsa esa kafelning chekkasi qolmay,
                ikkisi bitta dog'ga aylanadi. */}
            <span aria-hidden className="fan-ic">
              <Icon size={38} />
            </span>

            <div className="fan-plate">
              <p className="fan-h">{h}</p>
              <p className="fan-t">{t}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
