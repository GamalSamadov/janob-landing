import {
  Bolt,
  Book,
  Bot,
  Branch,
  Bug,
  Bulb,
  Card,
  Check,
  Cloud,
  Code,
  Gauge,
  Layers,
  Layout,
  Lens,
  Lock,
  Play,
  Spark,
  Tag,
  Target,
  Terminal,
  Trend,
  Users,
  Wave,
  Clock,
} from "@/components/Icons";

/**
 * Dars nomiga belgi tanlash.
 *
 * QO'LDA YOZILGAN RO'YXAT EMAS, KALIT SO'Z bo'yicha moslashtirish — va bu
 * ataylab. Darslar oltmish birta va ularning nomlari muallif hujjatidan
 * keladi, ya'ni o'zgarishi mumkin. Qo'lda tuzilgan "dars → belgi"
 * jadvalida bitta nom o'zgarsa, belgi jimgina yo'qolardi va buni hech kim
 * sezmasdi. Kalit so'z esa nomning O'ZIDAN o'qiydi: yangi dars qo'shilsa
 * ham u to'g'ri belgini oladi.
 *
 * TARTIB MUHIM. Ro'yxat yuqoridan pastga tekshiriladi va BIRINCHI mos
 * kelgani yutadi, chunki bitta nomda bir necha kalit so'z uchrashi mumkin
 * ("AI bilan matnni ovozlashtirish loyihasi" — ham "AI", ham "ovoz").
 * Aniqroq tushuncha yuqorida turadi: "ovozlashtirish" darsning MAVZUSI,
 * "AI" esa butun kursning umumiy so'zi va u deyarli hamma joyda bor.
 *
 * Solishtirish kichik harfda va lotin alifbosidagi apostroflar bilan:
 * matnda ham `'`, ham `'` uchraydi.
 */
type Icon = typeof Spark;

const RULES: [RegExp, Icon][] = [
  /* 1-DARAJA — dars nomidagi eng aniq, tor tushunchalar. */
  [/ovozlash|audio|tovush/, Wave],
  [/git|github/, Branch],
  [/terminal/, Terminal],
  [/debug|xato/, Bug],
  [/optimizatsiya|samarali|10x|5x tezroq/, Gauge],
  [/\.env|xavfsiz|authentication|authorization/, Lock],
  [/to'lov|narx/, Card],
  [/bot/, Bot],
  [/deploy|platforma|pwa|ci ?\/ ?cd/, Cloud],
  [/landing|portfolio|shablon|sahifa/, Layout],
  [/konspekt|qo'llanma|asoslari|yo'l xaritasi/, Book],
  [/vaqt|tartib/, Clock],
  [/test|tdd/, Check],
  [/suhbat|muqaddima|jonli/, Play],

  /* 2-DARAJA — soha tushunchalari.

     MO'LJAL va ODAMLAR ajratilgan. Ilgari ikkalasi bitta qoidada edi va
     4-modulda yettita darsning to'rttasi bir xil belgini olib, ro'yxat
     bir xil belgilar ustuniga aylanib qolgandi (o'lchandi). Ma'nosi ham
     boshqa: nishalashish va target — MO'LJALGA olish, mijoz va bozor
     esa ODAMLAR. */
  [/nishalash|target|instagram|algoritm/, Target],
  [/mijoz|raqobat|bozor|varonka|sessiya/, Users],
  [/offer|taklif|sotuv/, Tag],
  [/g'oya|startup|yechim|muammo/, Bulb],
  [/arxitektura|system design|tuzish|loyihani|modul|turlari/, Layers],
  [/topish|qidir|seo|geo|tekshir|ielts/, Lens],
  [/daromad|strategiya/, Trend],

  /* 3-DARAJA — MODULNING UMUMIY SO'ZLARI, eng oxirida.

     Tartib shu sababli: "avtomat" 3-modulning deyarli har bir darsida
     bor va yuqorida turganda yettita darsning BESHTASINI bitta belgiga
     yig'ib qo'ygandi (o'lchandi). Umumiy so'z faqat darsning o'z mavzusi
     topilmagandagina ishlatilishi kerak — "Konspekt yozishni
     avtomatlashtirish" avvalo KONSPEKT haqida, avtomatizatsiya esa butun
     modulning nomi. Xuddi shu sabab "ai" va "dastur" uchun ham. */
  [/avtomat|zavod/, Bolt],
  [/prompt|claude|codex|ai|subagent|openclaw|openhuman|obsidian/, Spark],
  [/dastur|kod|code/, Code],
];

/** Darsga mos belgi. Hech biri to'g'ri kelmasa — kursning umumiy belgisi. */
export function iconForLesson(lesson: string): Icon {
  const s = lesson.toLowerCase().replace(/’/g, "'");
  for (const [re, Icon] of RULES) if (re.test(s)) return Icon;
  return Spark;
}

/* LOYIHA BELGILARI — darsnikining ustidagi yupqa qatlam.

   Yuqoridagi "qo'lda jadval yozmaymiz" sababi bu yerda ISHLAMAYDI va farqi
   aniq: u yerda oltmish birta o'zgaruvchan dars nomi bor, bu yerda esa
   sakkizta qat'iy nom (`PROJECTS`) — ular muallif tanlagan qisqa ro'yxat.

   Jadval faqat TO'QNASHUVNI yechadi, belgini noldan tanlamaydi. "Telegram
   bot" ham, "Mijozlarga javob beruvchi AI bot" ham kalit so'z bo'yicha
   `Bot` ni olardi; sakkiztalik BITTA qatorda ikkita bir xil belgi esa xato
   bo'lib ko'rinadi. Ikkinchisining mavzusi — mijozlar, shuning uchun
   `Users`.

   Nom o'zgarsa belgi YO'QOLMAYDI: hisob avvalgidek kalit so'zga qaytadi. */
const PROJECT_ICONS: Record<string, Icon> = {
  "Mijozlarga javob beruvchi AI bot": Users,
};

/** Loyihaga mos belgi. */
export function iconForProject(project: string): Icon {
  return PROJECT_ICONS[project] ?? iconForLesson(project);
}
