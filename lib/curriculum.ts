/**
 * Kurs yo'l xaritasi — muallifning o'z hujjatidan olingan, o'zgarmas fakt.
 * Dars nomlari aynan muallif yozgan holicha.
 */

export interface Module {
  n: number;
  title: string;
  /** Modul nima beradi — bir jumla. */
  promise: string;
  lessons: string[];
}

export const MODULES: Module[] = [
  {
    n: 1,
    title: "AI bilan ilk daromad",
    promise: "Birinchi mijoz va ilk $200 lik sotuv — kursning boshida.",
    lessons: [
      "Mening ilk daromadim",
      "AI dasturlash nima?",
      "AI turlari va platformalari",
      "Claude Code bilan qisqacha tanishuv",
      "Prompt engineering",
      "Landing sahifa",
      "Sotuvga olib keladigan 5 ta shablon",
      "Telegram bot",
      "Tekinga deploy qilish usullari",
      "Mijoz topishning sinalgan usuli",
      "Birinchi mijoz topishning 30 ta usuli",
      "Mijoz rad eta olmaydigan taklif berish usuli",
      "Jamol Samadov bilan jonli suhbat",
    ],
  },
  {
    n: 2,
    title: "AI dasturlash mutaxassisi",
    promise: "Tayyor arxitekturalar va real loyihalar — qo'lingizda ishlaydigan mahsulot.",
    lessons: [
      "Modul haqida muqaddima",
      "Claude Code haqida to'liq qo'llanma",
      "Codex haqida to'liq qo'llanma",
      "Arzon platformalar",
      "Dasturlar turlari va farqlari",
      "Tayyor 10 ta dastur arxitekturasi",
      "Muammoga yechim topish — har bir dasturning yuragi",
      "Tayyor 15 ta yechim",
      "Git va GitHub",
      "AI bilan matnni ovozlashtirish loyihasi",
      "IELTS darajani tekshiruvchi loyiha",
      "Deploy qilishning eng samarali usuli",
      "Authentication va Authorization",
      "To'lov tizimlari",
      "PWA foydalari va kamchiliklari",
      "JanobAI loyihasi",
      "Startup g'oyalari orqali daromad strategiyasi",
      "AI dasturlash orqali daromad strategiyasi",
    ],
  },
  {
    n: 3,
    title: "Avtomatizatsiya: eng kuchli qurol",
    promise: "Bizneslar aynan shu ish uchun eng yaxshi to'laydi.",
    lessons: [
      "Avtomatizatsiya o'zi nima?",
      "Konspekt yozishni avtomatlashtirish",
      "Vaqt tartibini avtomatlashtirish",
      "Mijozlarga jonli javob beradigan AI bot",
      "$9000 lik Kontent zavod loyihasi",
      "20 ta g'oya omborxonasi",
      "Avtomatizatsiya orqali daromad strategiyasi",
    ],
  },
  {
    n: 4,
    title: "Doimiy sotuv qilish strategiyasi",
    promise: "Bir martalik sotuv emas — to'xtamaydigan mijozlar oqimi.",
    lessons: [
      "Nishalashish ahamiyati",
      "Raqobat kuchlimi? Demak bozor yirik",
      "Portfolio tuzish ahamiyati",
      "Jozibali portfolio shabloni",
      "Bepul sessiya varonkasi",
      "Rad qilib bo'lmas 3 ta offer misoli",
      "Instagram target uchun 3 ta algoritm",
    ],
  },
  {
    n: 5,
    title: "Top 1% mutaxassis",
    promise: "Daromad paydo bo'lgach — sizni boshqalardan ajratadigan chuqur bilim.",
    lessons: [
      'Muhim qiymatlarni xavfsiz saqlash: ".env"',
      "Terminal orqali 10x samarali ishlash",
      'Xatolarni 5x tezroq topish: "Debugging"',
      "Dasturni 5x xavfsiz tuzish usuli",
      "Loyihani tushunarli tarzda tuzish",
      "Loyihani optimizatsiya qilish",
      "SEO va GEO olamiga ilk qadamlar",
      "OpenClaw haqida qo'llanma",
      "OpenHuman haqida qo'llanma",
      "Claude subagentlari",
      "Claude va Obsidian bilan ikkinchi aql tuzish",
      "Dasturlash asoslari ahamiyati",
      "Dasturlash asoslari yo'l xaritasi",
      "System design haqida",
      "CI / CD haqida",
      'TDD "Test Driven Development" haqida',
    ],
  },
];

/** Kursda quriladigan real loyihalar — dars ro'yxatidan olingan. */
export const PROJECTS = [
  "Landing sahifa",
  "Telegram bot",
  "Matnni ovozlashtirish",
  "IELTS darajani tekshiruvchi",
  "JanobAI",
  "Kontent zavod",
  "Mijozlarga javob beruvchi AI bot",
  "Konspekt avtomatikasi",
] as const;

export const LESSON_COUNT = MODULES.reduce(
  (n, m) => n + m.lessons.length,
  0,
);
