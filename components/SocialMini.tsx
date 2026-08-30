/* ---------------------------------------------------------------------------
   IJTIMOIY TARMOQ BELGILARI — surat ostidagi ikkita kichik havola.

   BULAR SOTUV HAVOLASI EMAS. Sahifadagi qolgan Telegram knopkalari
   menejerga tayyor xabar bilan o'tadi (`telegramLink`); bu ikkisi esa
   MUALLIF PROFILIGA olib boradi — bu yerda odam yozmaydi, obuna bo'ladi.
   Shuning uchun ular `telegramUsername` ni emas, `telegramChannelUrl` va
   `instagramUrl` ni oladi.

   MATERIAL: sayqallangan kumush (muallif referensi, 2026-08-16 — qora fonda
   xromlangan metall ikonka). Metall tuyg'usini beradigan narsa rang emas,
   RANGLARNING TARTIBI: yorug' → quyuq → yana yorug'. Yassi kulrang yoki
   yuqoridan pastga oddiy o'tish plastmassa bo'lib ko'rinadi; o'rtadagi
   quyuq band esa aks etayotgan ufqni taqlid qiladi va aynan shu narsa
   ko'zga "bu metall" deb aytadi.

   NEGA `Icons.tsx` dagi belgilar EMAS: ulardagi rang `currentColor` orqali
   keladi, ya'ni bitta tekis tus. Gradient bilan bo'yash uchun `fill` da
   gradientga havola turishi kerak, shuning uchun bu ikkisi shu yerda,
   o'z gradientlari bilan yoziladi. Qolgan sahifa avvalgi belgilardan
   foydalanaveradi — pastdagi footer ham shular bilan.
   ------------------------------------------------------------------------- */

/* Xrom nurlanishi. To'xtashlar teng emas: tepadagi yorug' yo'l tor va
   o'tkir (to'g'ridan tushgan nur), o'rtadagi quyuq band keng, pastdagisi
   esa yumshoq qaytgan nur.

   METALL QORAYTIRILDI (2026-08-17, sahifa yorug' rejimga o'tganda).
   RANGLARNING TARTIBI — materialning yagona sharti, yuqoridagi izohga
   qarang — TO'LIQ SAQLANDI: yorug' → quyuq → yorug' → quyuq. O'zgargani
   faqat butun shkalaning o'rni: ilgari u sof oqdan boshlanardi, chunki
   ortida qora fon turardi. Oq qog'ozda esa aynan o'sha yorug' to'xtashlar
   fonga qo'shilib ketib, belgidan faqat sinig'i qolardi — ya'ni belgi
   yo'qolmasdi, TESHIK bo'lib ko'rinardi. Endi shkala po'lat oralig'ida:
   eng yorug' nuqtasi ham qog'ozdan quyuqroq. */
function MetalGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" stopColor="#94a0ac" />
        <stop offset="16%" stopColor="#5d6874" />
        <stop offset="38%" stopColor="#262d36" />
        <stop offset="52%" stopColor="#545f6b" />
        <stop offset="72%" stopColor="#9fabb7" />
        <stop offset="88%" stopColor="#39424c" />
        <stop offset="100%" stopColor="#6a7480" />
      </linearGradient>
    </defs>
  );
}

const SIZE = 15;

function TelegramMetal({ size = SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <MetalGradient id="sm-tg" />
      <path
        fill="url(#sm-tg)"
        d="M21.6 4.3 18.5 19c-.23 1.03-.85 1.28-1.72.8l-4.75-3.5-2.3 2.2c-.25.26-.47.48-.96.48l.34-4.84 8.8-7.95c.38-.34-.08-.53-.6-.19L6.44 12.9l-4.68-1.46c-1.02-.32-1.04-1.02.21-1.5l18.3-7.06c.85-.31 1.6.2 1.33 1.42Z"
      />
    </svg>
  );
}

/* Instagram konturli qoladi (brend belgisi shunday), lekin chizig'i
   qalinroq — yonidagi Telegram to'la to'ldirilgan va ingichka kontur
   uning yonida ikkinchi darajali bo'lib ko'rinardi. Gradient chiziqqa
   ham tushadi: SVG da `stroke` gradient bilan bo'yalishi mumkin. */
function InstagramMetal({ size = SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <MetalGradient id="sm-ig" />
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5.4"
        fill="none"
        stroke="url(#sm-ig)"
        strokeWidth="2.2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.3"
        fill="none"
        stroke="url(#sm-ig)"
        strokeWidth="2.2"
      />
      <circle cx="17.4" cy="6.6" r="1.35" fill="url(#sm-ig)" />
    </svg>
  );
}

/* YouTube — TESHIKLI belgi. Uchburchak ustidan chizilmaydi, korpusdan
   KESIB olinadi (`fillRule="evenodd"`, bitta yo'lda ikkita kontur).

   Sababi materialda: uchburchakni rang bilan chizish uchun sahifaning
   yer rangini bilish kerak, bu belgi esa ikki xil fonda turadi — hero da
   iliq oq, `/challange` da esa olov nuri ustida. Teshik hech narsa
   bilmasligi kerak: u ortidagi fon nima bo'lsa, o'shani ko'rsatadi.

   Korpus Telegram kabi TO'LDIRILGAN (kontur emas): qatorda ikkita
   to'ldirilgan va bitta konturli belgi bo'lib, og'irlik teng taqsimlanadi. */
function YoutubeMetal({ size = SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <MetalGradient id="sm-yt" />
      <path
        fill="url(#sm-yt)"
        fillRule="evenodd"
        d="M6 4.6h12a4.4 4.4 0 0 1 4.4 4.4v6a4.4 4.4 0 0 1-4.4 4.4H6a4.4 4.4 0 0 1-4.4-4.4V9A4.4 4.4 0 0 1 6 4.6ZM10 8.6l6.2 3.4-6.2 3.4V8.6Z"
      />
    </svg>
  );
}

interface Props {
  /* Har biri bo'sh bo'lishi mumkin va bo'sh bo'lsa o'z belgisi
     CHIZILMAYDI — `Footer` dagi bilan bir xil qoida va boshqaruv
     panelidagi va'da ("Bo'sh qoldirsangiz ko'rinmaydi"). Hech qayerga
     olib bormaydigan belgi bezakdan ham yomon: u bosiladi va
     foydalanuvchini bo'sh joyga olib tushadi. */
  telegramChannelUrl: string;
  instagramUrl: string;

  /* YouTube IXTIYORIY va bu ataylab (2026-08-30). Hero uni BERMAYDI:
     surat ostidagi ikkita belgi 2026-08-16 da qotirilgan tartib va
     unga tegilmadi. `/challange` esa uchalasini beradi. */
  youtubeUrl?: string;

  /**
   * `pin`  — hero: suratning o'ng pastki burchagiga yopishtirilgan,
   *          `position: absolute` (`.smini`).
   * `row`  — `/challange`: matn ostidagi markazga tekislangan qator,
   *          oqimning ichida va belgilari yirikroq. Sabab: u yerda bu
   *          qator sahifadagi YAGONA havola, hero da esa u suratning
   *          qo'shimchasi.
   */
  variant?: "pin" | "row";
}

export function SocialMini({
  telegramChannelUrl,
  instagramUrl,
  youtubeUrl = "",
  variant = "pin",
}: Props) {
  const tg = telegramChannelUrl.trim();
  const ig = instagramUrl.trim();
  const yt = youtubeUrl.trim();

  // Hammasi bo'sh bo'lsa qator umuman chizilmaydi — aks holda sababsiz
  // bo'sh joy qolardi.
  if (!tg && !ig && !yt) return null;

  const row = variant === "row";
  const size = row ? 22 : SIZE;

  return (
    <div className={row ? "smini smini-row" : "smini"}>
      {tg && (
        <a
          href={tg}
          target="_blank"
          rel="noopener noreferrer"
          className="smini-link"
          aria-label="Telegram kanal"
        >
          <TelegramMetal size={size} />
        </a>
      )}

      {ig && (
        <a
          href={ig}
          target="_blank"
          rel="noopener noreferrer"
          className="smini-link"
          aria-label="Instagram"
        >
          <InstagramMetal size={size} />
        </a>
      )}

      {yt && (
        <a
          href={yt}
          target="_blank"
          rel="noopener noreferrer"
          className="smini-link"
          aria-label="YouTube kanal"
        >
          <YoutubeMetal size={size} />
        </a>
      )}
    </div>
  );
}
