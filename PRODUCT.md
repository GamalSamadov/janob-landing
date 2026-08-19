# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + React + Tailwind CSS v4 + TypeScript — foydalanuvchi
tanlovi (2026-08-15 da so'raldi va tasdiqlandi).

Admin panel talab qilingan: narxlar, sanalar, chegirma bosqichi, taymer va
**barcha isbot materiallari** (daromad skrinshotlari, otzivlar, video otzivlar,
bitiruvchilar soni) brauzer orqali tahrirlanadi — kodga tegilmaydi.

Kontent `data/content.json` faylida saqlanadi, yozish server tomonda amalga
oshiriladi. **Shu sababli fayl tizimi yoziladigan xosting kerak** (VPS +
Dokploy / Docker). Vercel kabi read-only serverless muhitga chiqarilsa,
`lib/content.ts` ichidagi `getContent`/`saveContent` juftini bazaga
almashtirish kifoya — qolgan kod o'zgarmaydi.

## Users

O'zbek tilida so'zlashuvchi, asosan 20–40 yoshdagi kattalar. Katta qismi
Koreya, Rossiya, AQSh va Yevropada og'ir jismoniy mehnatda ishlaydi; kichikroq
guruh O'zbekistonda. Ular jismonan charchagan, aqliy mehnatga o'tishni,
onlayn daromad qilishni va oxir-oqibat oila bag'riga qaytib mashaqqatsiz
ishlashni xohlaydi.

Boshlang'ich holati:

- 70–90% qismi dasturlashdan umuman bexabar.
- ~95% hech qachon AI yoki IT orqali onlayn pul topishga urinib ko'rmagan.
- Eng ko'p to'sqinlik qiladigan narsa: aqliy mehnat qanday qilib pulga
  aylanishini tushunmaslik, ishni yo'lga qo'yishni bilmaslik va yo'l
  ko'rsatuvchi ustoz yo'qligi.
- Keng tarqalgan xato tushuncha: Upwork yoki hh.ru ga ro'yxatdan o'tib,
  mustaqil ravishda daromad qila boshlash mumkin.
- Rossiyada yashovchilar AI vositalari bloklanishidan va o'rgangan narsalari
  o'z davlatida yoki O'zbekistonda ish bermasligidan xavotirda.

Maqsadlari:

- ~95%: avval qo'shimcha daromad, keyin uni asosiy daromadga aylantirish.
  Qolgan ~5% o'z biznesi yoki startapiga AI ni integratsiya qilmoqchi.
- O'qishni tugatishi bilanoq birinchi pulni ko'rish: xorijdagilar uchun ilk
  $500, O'zbekistondagilar uchun har qanday birinchi sotuv.
- Ideal natija — shu ish orqali oyiga barqaror $2,000–$3,000.

O'qish uslubi: ish smenasiga mos kelgani uchun **video yozuv** asosiy format;
jadval imkon bersa jonli darslar ham ma'qul. Ular uchun eng muhim savol —
kurs haqiqatan daromad manbaini yaratib bera oladimi. Real natija ko'rsalar,
to'liq bag'ishlanishga tayyor.

## Product Purpose

"AI Dasturlash: 0-dan daromadgacha" — pullik onlayn kurs. Dasturlashdan
umuman bexabar odamni birinchi pullik sotuvgacha, so'ng takrorlanadigan
daromad oqimigacha olib chiqadi; AI leverage sifatida ishlatiladi.

Ochiq shart: kuniga taxminan 2 soat, qadamma-qadam.

Muvaffaqiyat mezoni — o'quvchining **birinchi real sotuvi**, keyin barqaror
oylik daromad. Sertifikat yoki ko'rilgan darslar soni emas.

## Positioning

Bu "dasturlashni o'rganish" ham, "AI vositalarini o'rganish" ham emas. Kurs
butun zanjirni sotadi: AI bilan qurish → uni xizmat sifatida paketlash →
mijoz topish → takroran sotish → mijozlar oqimini ushlab turish.

1-modul ataylab **avval daromad** haqida (birinchi mijoz topishning 30 ta aniq
usuli, ilk $200 lik sotuv strategiyasi), fundamental bilimlar esa 5-modulda —
daromad paydo bo'lgandan keyin keladi.

Muallif — 6 yillik tajribaga ega dasturchi, Instagramda AI bilan dasturlash
bo'yicha kontent yuritadi.

## Operating Context

- **Zapusk ritmi:** kurs boshlanishidan ~20–30 kun oldin bepul kansultatsiya
  yoki vebinar o'tkaziladi. **Eng katta chegirma** faqat unga qatnashganlarga
  beriladi va **1 kun ichida** qisman to'lov bilan band qilinishi shart.
- **Standard chegirma** odatda storis orqali, kurs boshlanishidan 10–7 kun
  oldingi oraliqda amal qiladi.
- Bu oynalardan tashqarida kurs asl narxida turadi.
- To'liq to'lov shart emas: qisman to'lov joyni bron qiladi, qolgani kurs
  boshlanguncha to'lanadi.
- **Yozilish Telegram manager orqali**, saytda to'lov tizimi yo'q.

## Capabilities and Constraints

Kurs tarkibi: **5 modul, 62 video dars**.

- 1-modul — AI bilan ilk daromad: AI dasturlash nima, birinchi mijoz topishning
  30 ta usuli, ilk $200 lik sotuv strategiyasi, muallif bilan jonli suhbat.
- 2-modul — AI dasturlash mutaxassisi: Claude Code va Codex bo'yicha to'liq
  qo'llanma, 10 ta tayyor arxitektura, 15 ta tayyor yechim, real loyihalar.
- 3-modul — Avtomatizatsiya: bizneslar nega to'laydi, real loyihalar, 20 ta
  daromadli g'oya omborxonasi.
- 4-modul — Doimiy sotuv strategiyasi: nishalashish, portfolio, bepul sessiya
  varonkasi, rad qilib bo'lmas offerlar, Instagram target algoritmlari.
- 5-modul — Top 1% mutaxassis: xavfsizlik, debugging, optimizatsiya,
  arxitektura, system design, CI/CD, TDD, dasturlash asoslari yo'l xaritasi.

Har bir modulning to'liq dars ro'yxati `lib/curriculum.ts` da — muallifning
o'z yo'l xaritasidan olingan, o'zgarmas fakt.

Paketlar va uch bosqichli narx (AQSH dollarida):

| Paket | Eng katta chegirma | Standard chegirma | Asl narx |
| --- | --- | --- | --- |
| MINI | $100 | $120 | $150 |
| START | $200 | $220 | $250 |
| PRO | $390 | $320 | $300 |

- MINI: 1 va 2-modul, 3 oy takroran ko'rish.
- START: to'liq kurs, 6 oy kirish.
- PRO: to'liq kurs, 6 oy kirish + 1-modul so'ngida muallif bilan jonli dars,
  portfolio tahlili, mijoz qidirish va sotuvda mentor/kurator yordami.

**PRO narxi haqida:** MINI va START mantiqida chegirma asl narxdan past, PRO da
esa teskari ($390 chegirma / $300 asl). Bu 2026-08-15 da muallifga
ko'rsatildi va u **shu holicha qoldirishni** tanladi, admin orqali istalgan
vaqtda to'g'rilanadi. Sahifada muallif bergan raqamlar chiqadi.

Tasdiqlangan mexanikalar:

- **Narx bosqichi vaqt bo'yicha avtomatik almashadi.** Admin uch oyna sanasini
  belgilaydi; joriy sana qaysi oynaga tushsa, o'sha narx ko'rinadi.
  Hozirgi holat: **eng katta chegirma**.
- **Taymer chegirma tugashiga qolgan vaqtni sanaydi.** Sana kiritilmaguncha
  taymer ko'rinmaydi — soxta sana o'ylab topilmaydi.
- **CTA:** har bir knopka `@managerjanob` bilan Telegram suhbatini ochadi,
  matn oldindan yozilgan holda: `Assalomu alaykum! [paket nomi] paketiga
  qo'shilmoqchiman!`
- Til: faqat **o'zbek (lotin)**. Ko'p tillilik talab qilinmagan.

## Brand Commitments

- Kurs nomi: **"AI Dasturlash: 0-dan daromadgacha"**.
- Brend: **janob_dasturchi**. Mentor: **Jamol Samadov**.
- Telegram manager: `@managerjanob`.
- Muallif offerning ko'rinadigan yuzi; o'z surati beriladi.
- **Vizual dunyo muallif tomonidan bog'lab qo'yilgan (2026-08-15):**
  Apple "liquid glass" — qalin shisha qirralari, refraksiya, iridessent
  gradient knopkalar, qorong'i fon. Manba: muallif bergan 4 ta referans surat.
- **FON YORUG'GA AYLANTIRILDI (muallif talabi, 2026-08-17):** "sayt da dark
  mode ko'payib ketgan, white mode qil hammasini". Bog'langan dunyoning
  qolgan hamma qismi — shisha materiali, qalin qirralar, olov spektri,
  tipografika — o'z kuchida qoladi; o'zgargan narsa faqat QUTB: yuza endi
  oqni to'playdi, soya faqat qirrada. Sahifadagi yagona quyuq jismlar —
  PRO kartasi va uning yonidagi ikki knopka.
- **Tipografika bog'langan:** matn formatlari va shriftlari `arinaalexx.ru`
  namunasidan — SF Pro Display xarakteri, katta og'ir display (w800,
  line-height ~0.93), UPPERCASE w900 paket sarlavhalari, ro'yxatlarda w300
  asosiy / w500 qo'shimcha bandlar farqi.
- **HERO uchun alohida referens bog'langan (2026-08-15, ikkinchi topshiriq):**
  qora yer, pastdan ko'tarilgan issiq to'q sariq olov, tepa-o'ngdan sovuq
  yorug'lik, ingichka o'lchov to'ri va yoritilgan zonalardagi dithered don;
  sarlavha BOSH HARF, w900, line-height ~0.88, mavzu qismida qizil→oq
  gradient. Manba: `pinterest.com/pin/808677676880647931`.
  Sarlavha ustidagi shisha orbitalar va "5 modul / 62 video dars" faktlar
  lentasi muallif talabi bilan **olib tashlandi**.
- **BUTUN SAHIFA shu dunyoga o'tkazildi (2026-08-16, muallif tanlovi
  "to'liq — sovuq dunyo ketadi"):** sovuq iridessent spektr (teal, blue,
  indigo, purple, pink) sahifadan chiqarildi va olov spektri bilan
  almashtirildi. Amalda o'zgargani: `.liquid` ambient foni, barcha `.field`
  yorug'lik dog'lari, Path yo'l relsi va bekatlari, Curriculum modul
  raqamlari, Proof va Packages aksentlari, Countdown ajratgichlari,
  Bestseller yorlig'i, eski narx ustidagi chiziq, hamda brauzer yuzalari
  (matn belgilash, fokus halqasi, kursor). Yorug'lik qonuni butun sahifada
  **180° tik** bo'ldi (ilgari kartochkalarda 148° diagonal edi). Bo'lim
  sarlavhalari `t-h2` endi BOSH HARF w800 — hero bilan bir ovozda, bir
  pog'ona pastda.
- **Ataylab saqlangan ikkita istisno:** nav'dagi storis halqasi ko'k→qizil
  bo'lib qoladi (muallif shu ikki rangni aniq tanlagan, ko'kligi suratning
  foniga bog'liq), va admin paneldagi xato matni `--pink` da qoladi — xato
  rangi brend rangi bilan bir xil bo'lsa, signal yo'qoladi.
- **KNOPKALAR uchun alohida referens bog'langan (2026-08-16):** butun sayt
  bo'ylab **rangsiz** shisha kapsulalar. Yuza deyarli ko'rinmaydi, knopkani
  qirra yorug'ligi yasaydi; yorug'lik TIKKASIGA tushadi (tepa yoyi eng
  yorug', yon o'rtalari qorong'i, past yoyi o'rtacha). Ierarxiya rang bilan
  emas, yorug'lik kuchi bilan: `.pill-primary` / `.pill-quiet`. Gradient
  doira ("chip") butunlay olib tashlandi — belgi endi yuzaning o'zida.
  Manba: `i.pinimg.com/736x/b2/9c/58/b29c586d27548ff3bf938ef9bd1ef44e.jpg`.
  Hero'dagi ikkinchi knopka ("Kurs dasturini ko'rish") muallif talabi bilan
  olib tashlandi — birinchi ekranda bitta harakat qoladi.
- Muallif talabi: **matn kam, vizual ko'p**; matn bo'lsa ham jozibali.
  Maqsadli auditoriya uchun hech nima chalkash bo'lmasligi kerak.

## Evidence on Hand

**Muallifda bor (2026-08-15 da tasdiqlangan) — hammasi admin orqali kiritiladi:**

- Talabalar daromad skrinshotlari
- Matnli otzivlar (ism + natija)
- Video otzivlar
- Bitiruvchilar soni
- Muallifning o'z surati (fayl beriladi)
- Muallif faktlari: 6 yillik dasturchilik tajribasi; AI dasturlash orqali
  shaxsiy daromad natijasi (aniq raqam hali berilmagan)

**⚠️ O'ylab topilmaydi:** birorta ham otziv, ism, daromad raqami, bitiruvchilar
soni, reyting, logotip yoki sana. Materiallar admin orqali kiritilmaguncha
tegishli bloklar **umuman ko'rinmaydi** — soxta ma'lumot bilan to'ldirilmaydi.

**Hali berilmagan:** chegirma tugash sanasi, kurs boshlanish sanasi,
Instagram havolasi va obunachilar soni, shaxsiy daromad raqami, domen.

## Product Principles

1. **Natija — birinchi daromad.** Har bir blok va CTA o'quvchini sertifikatga
   emas, birinchi pullik mijozga yaqinlashtirishi kerak.
2. **Hech narsa yashirilmaydi.** To'liq dastur, paketlar farqi va narxlar ochiq
   ko'rsatiladi — bu asosiy ishonch mexanizmi.
3. **Isbot o'ylab topilmaydi.** Bo'sh blok soxta blokdan yaxshi.
4. **Boshlovchi tushunadigan til.** Jargon o'rniga oddiy o'zbekcha; auditoriya
   texnik atamalarni bilmaydi.
5. **Telefon birinchi.** Auditoriyaning katta qismi mobil qurilmada — har
   qanday yechim avval telefonda ishlashi shart.

## Accessibility & Inclusion

Rasmiy WCAG darajasi kelishilmagan. Mahsulotdan kelib chiqadigan talablar:

- Matn sodda va aniq; auditoriya texnik emas.
- Asosiy qurilma — telefon; kichik ekranlarda to'liq ishlashi shart.
- Interfeys **yorug' fonda** (2026-08-17 dan; ilgari qorong'i edi). Shisha
  yuzalar ustidagi matn kontrasti shu rejimda tekshiriladi: past kontrastli
  xira kulrang matn qabul qilinmaydi. Eng nozik joy — hero: matn olovning
  eng zich nuqtasi ustida turadi va o'sha yerda o'lchandi (fon #fccdad,
  matn #1c1610, kontrast 11.4:1).
- Harakat sezgirligi: `prefers-reduced-motion` hurmat qilinadi — orbitalar va
  refraksiya animatsiyasi to'xtaydi, kontent to'liq ko'rinadi.
