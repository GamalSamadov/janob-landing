"use client";

import { useEffect, useState } from "react";

/* TAKLIF TAYMERI — HAR BIR O'QUVCHINING O'ZINIKI (muallif talabi,
   2026-09-09).

   Sahifadagi taymer bilan ADASHTIRMANG: asosiy sahifadagi `Countdown`
   chegirma kampaniyasining UMUMIY sanasiga qaraydi (`content.json` dagi
   `endsAt`) va u hamma uchun bitta. Bu yerdagisi esa odamning O'Z
   soatidan boshlanadi — u sahifani birinchi marta ochgan daqiqadan.
   Shuning uchun uni serverdan berib bo'lmaydi: server hamma so'rovga bir
   xil javob beradi, "birinchi kelish" esa har kimda boshqa payt.

   BOSHLANISH NUQTASI BRAUZERDA SAQLANADI (`localStorage`). Ya'ni odam
   sahifani yopib, bir soatdan keyin qaytsa, taymer noldan boshlanmaydi —
   qolgan vaqtni ko'rsatadi. Bu ataylab: aks holda taymer shunchaki bezak
   bo'lib qolardi, muddat esa hech qachon tugamasdi.

   TUGAGACH SHUNCHAKI YO'QOLADI (muallif talabi) — o'rniga "muddat
   tugadi" degan yozuv ham, boshqa hech narsa ham chiqmaydi. Sahifaning
   qolgan qismi — video va knopka — o'z ishini davom ettiradi.

   SAQLANGANI TOZALANSA (boshqa brauzer, insko'gnito, tarix tozalash)
   hisob yangidan boshlanadi. Bu taymerning tabiati, kamchiligi emas:
   uning vazifasi — shoshilish sababini ko'rsatish, hisobni himoya qilish
   emas. Pul yoki kirish huquqi shu taymerga bog'lanmaydi. */

/** Saqlash kaliti. O'zgartirilsa, hammaning hisobi noldan boshlanadi. */
const KEY = "janob.taklif.tugash";

interface Props {
  /** Taklif necha soat amal qiladi. */
  hours: number;
  /** Raqamlar oldidagi izoh. */
  title: string;
}

/**
 * Muddatning tugash payti (ms). Birinchi chaqiruvda yoziladi, keyingi
 * chaqiruvlarda o'sha qaytadi — O'TIB KETGAN bo'lsa ham: "muddat tugagan"
 * ham javob va u yangi hisobga aylanmasligi kerak.
 *
 * `localStorage` YOPIQ bo'lishi mumkin (inkognito, brauzer sozlamasi) va
 * u yerda o'qish ham, yozish ham XATO OTADI — shuning uchun ikkalasi ham
 * `try` ichida. Bunday holatda taymer shu ochilish uchun ishlaydi.
 */
function deadline(hours: number): number {
  const fresh = Date.now() + hours * 3600_000;
  try {
    const saved = Number(localStorage.getItem(KEY));
    if (Number.isFinite(saved) && saved > 0) return saved;
    localStorage.setItem(KEY, String(fresh));
  } catch {
    /* Saqlash yopiq — taymer faqat shu ochilish davomida yashaydi. */
  }
  return fresh;
}

/** `08:07:13`. Kun ko'rsatilmaydi — muddat sutkadan qisqa. */
function clock(ms: number): string {
  const total = Math.floor(ms / 1000);
  return [
    Math.floor(total / 3600),
    Math.floor((total % 3600) / 60),
    total % 60,
  ]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function OfferTimer({ hours, title }: Props) {
  /* Server va mijoz vaqti farq qilmasligi uchun birinchi render bo'sh —
     `Countdown` dagi bilan bir qoida. Server o'qigan `localStorage` yo'q,
     ya'ni u qolgan vaqtni BILMAYDI va uni chizishga urinsa, gidratatsiya
     paytida raqamlar to'qnashardi. */
  const [left, setLeft] = useState<string | null>(null);

  useEffect(() => {
    const endsAt = deadline(hours);
    /* Muddat allaqachon tugagan — soat umuman ishga tushmaydi. */
    if (endsAt - Date.now() <= 0) return;

    let id = 0;
    const update = () => {
      const ms = endsAt - Date.now();
      if (ms > 0) {
        setLeft(clock(ms));
        return;
      }
      setLeft(null);
      clearInterval(id);
    };

    /* BIRINCHI HISOB MIKROVAZIFADA, effektning tanasida emas.

       Ikki sabab bor va ikkalasi ham bir tomonga ishlaydi. React
       effektning tanasidagi to'g'ridan-to'g'ri `setState` ni kaskadli
       render deb belgilaydi (`react-hooks/set-state-in-effect`).
       Mikrovazifa esa brauzer sahifani CHIZISHDAN OLDIN ishlaydi, ya'ni
       birinchi soniya bo'sh o'tmaydi — taymer darrov raqam bilan
       ko'rinadi. */
    queueMicrotask(update);
    id = window.setInterval(update, 1000);

    return () => clearInterval(id);
  }, [hours]);

  if (!left) return null;

  return (
    <div className="chal-timer glass glass-quiet">
      <span className="chal-timer-label">{title}</span>
      {/* `t-num` — raqamlar bir xil enda, ya'ni soat tikillaganda satr
          o'ngga-chapga sakramaydi. */}
      <span className="chal-timer-value t-num">{left}</span>
    </div>
  );
}
