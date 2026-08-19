/**
 * Chizilgan ikonkalar — bitta chiziq qalinligi (1.75), bitta 24×24 to'r.
 * Emoji yoki unicode belgilar ishlatilmaydi.
 */

type P = { className?: string; size?: number };

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const Check = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const Plus = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </svg>
);

export const Play = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

/* YAGONA TO'LDIRILGAN IKONKA va bu ataylab. Qolgan hammasi chiziq — bu esa
   BAHO belgisi: bo'sh yulduz "baholanmagan" degan ma'no beradi, ya'ni bu
   yerda to'ldirish bezak emas, mazmun. Chiziq esa saqlanadi (`strokeLinejoin`
   yumaloq), shuning uchun u kichik kegilda ham qolgan ikonkalar bilan bir
   qo'ldan chiqqandek o'qiladi. */
export const Star = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path
      fill="currentColor"
      d="m12 3.9 2.52 5.11 5.64.82-4.08 3.98.96 5.61L12 16.77l-5.04 2.65.96-5.61-4.08-3.98 5.64-.82z"
    />
  </svg>
);

export const Lens = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
    <path d="M8.6 9.2a3.4 3.4 0 0 1 2.6-1.9" opacity="0.55" />
  </svg>
);

export const Clock = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.4V12l3 1.8" />
  </svg>
);

export const Layers = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m12 3.5 8 4.2-8 4.2-8-4.2 8-4.2Z" />
    <path d="m4 12.4 8 4.2 8-4.2" />
    <path d="m4 16.6 8 4.2 8-4.2" opacity="0.5" />
  </svg>
);

export const Spark = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13l-5.6-2 5.6-2 1.9-5.5Z" />
  </svg>
);

/* NISHON — "mijoz topish". Qidirish oynasi emas, aynan nishon: mijozni
   topish tasodifan ko'zga tushish emas, mo'ljalga olish. */
export const Target = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/* YORLIQ — "sotuv". Qo'l siqish yoki savat emas: ikkalasi ham 24px li
   to'rda chiziqlar chalkashib, tanib bo'lmas dog'ga aylanadi. Narx
   yorlig'i esa shu o'lchamda ham bir qarashda o'qiladi. */
export const Tag = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20.5 13.3 13.3 20.5a1.6 1.6 0 0 1-2.26 0l-7.3-7.3A1.6 1.6 0 0 1 3.28 12V4.9c0-.9.72-1.62 1.62-1.62H12c.43 0 .84.17 1.14.47l7.36 7.36a1.6 1.6 0 0 1 0 2.26Z" />
    <circle cx="8.2" cy="8.2" r="1.3" />
  </svg>
);

/* O'SISH — "stabil daromad". Chiziq tekis ko'tarilmaydi, bir joyda
   pastga tushib yana ko'tariladi: daromad ham shunday o'sadi va
   ikkinchi cho'qqi birinchisidan baland bo'lgani muhim. */
export const Trend = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3.5 17.5 9.5 11l4 4 7-7" />
    <path d="M15.5 7.5h5v5" />
  </svg>
);

/* KINOKAMERA — muallif referensi (2026-08-16).

   Faylning umumiy qoidasidan (chiziqli, `stroke` 1.75) chetga chiqadi va
   TO'LDIRILGAN chiziladi. Sabab o'lchamda: bu belgi 13px da turadi, u
   yerda 1.75px lik chiziq belgining yarmini egallab, g'altaklar va
   obyektiv bir-biriga qo'shilib ketardi. To'ldirilgan siluet esa kichrayib
   ham tanib olinadi. To'r va `currentColor` esa o'sha — belgi baribir shu
   oilaning a'zosi.

   Teshiklar (g'altak ichi va "play" uchburchagi) `fill-rule="evenodd"`
   bilan O'YIB olinadi, ustiga oq shakl qo'yib emas: ostida shisha turibdi,
   ya'ni teshik haqiqatan shaffof bo'lishi kerak.

   Har bo'lak ALOHIDA `<path>`: bitta `d` ichida bo'lsa, ustma-ust tushgan
   joylar (korpus bilan obyektiv) evenodd qoidasi bo'yicha bir-birini
   o'chirib, o'sha yerda teshik ochilardi. */
export const VideoCam = ({ className, size = 18 }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.8 6.9a3.3 3.3 0 1 0 6.6 0 3.3 3.3 0 1 0-6.6 0Zm2.05 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0-2.5 0Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.8 6.1a4.6 4.6 0 1 0 9.2 0 4.6 4.6 0 1 0-9.2 0Zm2.7 0a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 1 0-3.8 0Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.4 10.9h13.1a2.4 2.4 0 0 1 2.4 2.4v7.8a2.4 2.4 0 0 1-2.4 2.4H3.4A2.4 2.4 0 0 1 1 21.1v-7.8a2.4 2.4 0 0 1 2.4-2.4Zm3.9 3.1v6.4l5.5-3.2-5.5-3.2Z"
    />
    <path d="M18.6 14.6 22.6 12.5a.7.7 0 0 1 1 .62v7.16a.7.7 0 0 1-1 .62l-4-2.1v-4.22Z" />
  </svg>
);

export const Telegram = ({ className, size = 18 }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M21.6 4.3 18.5 19c-.23 1.03-.85 1.28-1.72.8l-4.75-3.5-2.3 2.2c-.25.26-.47.48-.96.48l.34-4.84 8.8-7.95c.38-.34-.08-.53-.6-.19L6.44 12.9l-4.68-1.46c-1.02-.32-1.04-1.02.21-1.5l18.3-7.06c.85-.31 1.6.2 1.33 1.42Z" />
  </svg>
);

export const Instagram = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/* ---------------------------------------------------------------------------
   DARS BELGILARI — yo'l xaritasi bo'limi uchun (2026-08-17).

   Oltmish bir dars bor va har biriga o'z belgisi kerak. Ular alohida
   TUSHUNCHALARNI ko'rsatadi (kod, xavfsizlik, avtomatizatsiya…), dars
   nomlarini emas: shu sababli belgi soni darsdan ancha kam va bittasi
   bir necha darsga to'g'ri keladi. Moslashtirish `lib/lesson-icons.ts`
   da, kalit so'z bo'yicha.

   Hammasi faylning umumiy qoidasida: 24×24 to'r, `stroke` 1.75.
   ------------------------------------------------------------------------- */

/** Kod — dasturlash, asoslar, System design, TDD. */
export const Code = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m9 8-4.5 4L9 16" />
    <path d="m15 8 4.5 4L15 16" />
  </svg>
);

/** Terminal — buyruq qatori, debugging. */
export const Terminal = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4.5" width="18" height="15" rx="3" />
    <path d="m7.5 10 2.5 2-2.5 2" />
    <path d="M13 14h3.5" />
  </svg>
);

/** Bulut — deploy, platformalar, PWA. */
export const Cloud = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 18.5a4 4 0 0 1-.3-8A5.5 5.5 0 0 1 17.4 9.6a3.9 3.9 0 0 1 .6 8.9" />
    <path d="M12 20.5v-7" />
    <path d="m9.4 15.6 2.6-2.6 2.6 2.6" />
  </svg>
);

/** Qulf — `.env`, autentifikatsiya, xavfsizlik. */
export const Lock = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/** Chaqmoq — avtomatizatsiya. */
export const Bolt = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M13.2 2.5 5.5 13.2h5.6l-.8 8.3 8-10.9h-5.7l.6-8.1Z" />
  </svg>
);

/** Odamlar — mijozlar, bozor, raqobat. */
export const Users = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="9.5" cy="8" r="3.4" />
    <path d="M3.5 19.5a6 6 0 0 1 12 0" />
    <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6" opacity="0.6" />
    <path d="M18 14.4a5.6 5.6 0 0 1 3 5.1" opacity="0.6" />
  </svg>
);

/** Kitob — qo'llanma, konspekt, yo'l xaritasi. */
export const Book = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 5.2A2 2 0 0 1 6 3.2h13v15.6H6a2 2 0 0 0-2 2V5.2Z" />
    <path d="M4 18.8a2 2 0 0 0 2 2h13" />
    <path d="M8 7.6h7" opacity="0.55" />
  </svg>
);

/** Lampa — g'oya, startup, yechim. */
export const Bulb = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M9 17.2a6 6 0 1 1 6 0v1.3H9v-1.3Z" />
    <path d="M10 21.2h4" />
  </svg>
);

/** Tovush to'lqini — ovozlashtirish. */
export const Wave = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 10.5v3" />
    <path d="M8 7.5v9" />
    <path d="M12 4.5v15" />
    <path d="M16 8.5v7" />
    <path d="M20 10.5v3" />
  </svg>
);

/** Shox — Git va GitHub. */
export const Branch = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="7" cy="5.5" r="2.3" />
    <circle cx="7" cy="18.5" r="2.3" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M7 7.8v8.4" />
    <path d="M17 11.8a4.4 4.4 0 0 1-4.4 4.4H9.3" />
  </svg>
);

/** Sahifa tuzilishi — landing, portfolio, shablon. */
export const Layout = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="4" width="17" height="16" rx="3" />
    <path d="M3.5 9.5h17" />
    <path d="M9.5 9.5V20" opacity="0.6" />
  </svg>
);

/** Karta — to'lov tizimlari. */
export const Card = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
    <path d="M2.5 10h19" />
    <path d="M6.5 14.5h3.5" opacity="0.6" />
  </svg>
);

/** Qo'ng'iz — xatolarni topish. */
export const Bug = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="7.5" y="7.5" width="9" height="12" rx="4.5" />
    <path d="M9.5 6.2a2.5 2.5 0 0 1 5 0" />
    <path d="M4.5 11h3M16.5 11h3M4.5 16h3M16.5 16h3" opacity="0.7" />
  </svg>
);

/** O'lchagich — optimizatsiya, samaradorlik. */
export const Gauge = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 17.5a8.5 8.5 0 1 1 16 0" />
    <path d="m12 13.5 4-4" />
    <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

/** Robot — Telegram bot, AI bot. */
export const Bot = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="8" width="16" height="11" rx="3.5" />
    <path d="M12 8V4.5" />
    <circle cx="12" cy="3.4" r="1.2" />
    <circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
