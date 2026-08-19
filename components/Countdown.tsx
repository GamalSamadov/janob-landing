"use client";

import { useEffect, useState } from "react";

interface Props {
  /** ISO sana. */
  endsAt: string;
  /**
   * Soat ustidagi satr.
   *
   * NARX BOSQICHINING NOMI BU YERGA TUSHMAYDI (muallif talabi,
   * 2026-08-17). Ilgari matn `label` propidan — "Standard chegirma
   * tugashiga" deb — yasalardi va paketlar bo'limida aynan shunday
   * turardi. Endi ikkala joyda ham "Chegirma muddati cheklangan":
   * o'quvchiga bosqichning NOMI emas, shoshilish sababi kerak.
   *
   * Shu bilan `label` va `labelOutside` proplari ham ketdi — birinchisini
   * hech kim o'qimay qoldi, ikkinchisi esa ikkala chaqiruvda ham bir xil
   * qiymat bilan berilardi, ya'ni tanlov emas edi.
   */
  title: string;
}

const UNITS = [
  { key: "d", name: "kun" },
  { key: "h", name: "soat" },
  { key: "m", name: "daq" },
  { key: "s", name: "son" },
] as const;

function remaining(endsAt: string, now: number) {
  const ms = new Date(endsAt).getTime() - now;
  if (!Number.isFinite(ms) || ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

/**
 * Chegirma tugashiga qolgan vaqt.
 * Vaqt tugagach o'zi yo'qoladi — sahifa asl narxga qaytadi.
 */
export function Countdown({ endsAt, title }: Props) {
  // Server va mijoz vaqti farq qilmasligi uchun birinchi render bo'sh.
  const [left, setLeft] = useState<ReturnType<typeof remaining>>(null);

  useEffect(() => {
    const update = () => setLeft(remaining(endsAt, Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!left) return null;

  const digits = (
    <div className="flex items-end gap-1.5">
        {UNITS.map((u, i) => (
          <div key={u.key} className="flex items-end gap-1.5">
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="t-num tabular-nums leading-none"
                style={{
                  fontSize: "clamp(1.5rem, 4.2vw, 2.1rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                {String(left[u.key]).padStart(2, "0")}
              </span>
              <span
                className="uppercase"
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "var(--text-3)",
                }}
              >
                {u.name}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span
                aria-hidden
                className="pb-4 leading-none"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 300,
                  color: "var(--text-3)",
                }}
              >
                :
              </span>
            )}
          </div>
        ))}
    </div>
  );

  /* SARLAVHA TASHQARIDA. Ular orasidagi bo'shliq ataylab kichik (6px):
     matn shishadan CHIQQAN bo'lishi kerak, lekin undan uzilib qolmasligi —
     ko'zga ikkalasi bitta jism bo'lib o'qilsin.

     Sarlavha OQIMDAN CHIQARILGAN (`absolute`) va bu tekislash uchun
     majburiy. Oqimda turganda u blokning balandligiga qo'shilib ketardi,
     ya'ni yonidagi knopka blokning — sarlavha bilan qutining — umumiy
     o'rtasiga tenglashardi va qizil qutining o'rtasidan 14px yuqorida
     qolardi (o'lchandi). Ko'z esa sarlavhani emas, QUTINI jism deb
     o'qiydi. Endi blokning balandligi = qutining balandligi, demak
     `items-center` ikkala jismning o'rtasini aniq bir chiziqqa qo'yadi.

     `whitespace-nowrap` — matn qutidan bir oz uzunroq bo'lgani uchun tor
     ekranda ikki qatorga bo'linib, tepasidagi paragrafga tegib ketardi.

     MARKAZGA `left-1/2` + `-translate-x-1/2` bilan qo'yiladi, `inset-x-0`
     va `text-center` bilan EMAS (muallif talabi, 2026-08-17). Farqi
     chetdagi holatda: matn qutidan uzunroq bo'lsa, `inset-x-0` uning enini
     quti eniga bog'lab qo'yadi va ortiqcha qism bir tomonga chiqib ketadi.
     `translate` esa matnning O'Z enidan qat'i nazar uning o'rtasini
     qutining o'rtasiga qo'yadi — ikkalasi ham o'zgarganda ham.

     SARLAVHADA NUQTA YO'Q (muallif talabi, 2026-08-17). Ilgari shisha
     ICHIDA turgan variant ham bor edi va u yerdagi kichkina, xira satrda
     nuqta belgi vazifasini bajarardi — ko'z avval unga tushib, keyin
     matnni o'qirdi. Tashqarida esa matnning o'zi yetarlicha katta va
     yorug': nuqta endi yo'l ko'rsatmaydi, faqat ortiqcha bezak. */
  /* `w-fit` — MARKAZLASH uchun majburiy (o'lchandi, 2026-08-17).

     Sarlavha o'z o'rnini SHU o'ramdan oladi (`left-1/2`), ya'ni o'ram
     qutidan kengroq bo'lsa, matn qutining emas, bo'sh joyning o'rtasiga
     tushadi. Ustun tartibidagi ota-onada aynan shu sodir bo'lardi:
     `align-items: stretch` o'ramni butun kenglikka cho'zib, sarlavhani
     soatdan 69px o'ngga surib yuborgandi (telefonda o'lchandi).

     `inline-flex` buni o'zi hal qilmaydi — u ichki tartibni belgilaydi,
     enini esa ota-ona cho'zishi mumkin. `width: fit-content` esa
     cho'zilishni to'xtatadi va cross o'qdagi tekislashga TEGMAYDI
     (`self-start` teksa, hero dagi `items-center` buzilardi). */
  return (
    <div className="relative inline-flex w-fit">
      <span className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap">
        <span className="cd-label">{title}</span>
      </span>
      <div className="glass glass-quiet inline-flex rounded-[22px] px-5 py-3.5">
        {digits}
      </div>
    </div>
  );
}
