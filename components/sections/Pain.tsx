import { Spark, Tag, Target, Trend, VideoCam } from "../Icons";

/* E'tirozlar — muallif talabi bilan qayta qurilgan (2026-08-16).

   G'oya: bular sahifaning gapi emas, O'QUVCHINING boshidagi gaplar.
   Shuning uchun ular ro'yxat emas, xabar bo'lib chiziladi — messenjerdagi
   kabi, sochilib yotgan holatda. Bo'limning javobi esa ularning ostida,
   bitta katta oq satrda turadi: e'tirozlar quyuq fonda yorug' orolchalar,
   javob esa fonning o'zida — ya'ni "ular aytdi / biz aytamiz" farqi
   ranglarning o'zidan o'qiladi.

   Bo'limdagi qolgan hamma narsa (sarlavha, o'ng tomondagi karta, raqamlar,
   knopka) muallif talabi bilan OLIB TASHLANDI. */

/* Har bir xabarning o'z holati: qaysi tomonda turishi, qancha ichkariga
   surilishi va necha gradus qiyshayishi. Sonlar teng emas — teng bo'lsa
   "sochilib yotgan" emas, saf tortgan bo'lib ko'rinadi.

   Matnda TINISH BELGISI YO'Q (muallif talabi, 2026-08-16): na qo'shtirnoq,
   na nuqta. Xabar shakli allaqachon "kimdir aytdi" deb turibdi — tirnoq
   uni ikkinchi marta aytardi, nuqta esa qisqa satrni og'irlashtirardi. */
const DOUBTS = [
  {
    text: "Dasturlash orqali pul topish juda qiyin",
    side: "left" as const,
    tilt: "-2.2deg",
    indent: "0%",
  },
  {
    text: "Bu ishni hamma ham qila olmaydi",
    side: "right" as const,
    tilt: "1.9deg",
    indent: "0%",
  },
  {
    text: "Menga yo'l ko'rsatuvchi ustoz yo'q",
    side: "left" as const,
    tilt: "-1.5deg",
    indent: "9%",
  },
  {
    text: "Men kech qolganman",
    side: "right" as const,
    tilt: "2.6deg",
    indent: "7%",
  },
];

/* Kurs NIMA berishi — javobning sanalgan qismi. To'rtinchi band muallif
   talabi bilan qo'shildi (2026-08-16): uchtasi ko'nikma edi, to'rtinchisi
   ularning NATIJASI. Shu sababli u oxirida turadi — ro'yxat endi
   "nimalarni bilasiz" emas, "qayerga chiqasiz" bilan tugaydi.

   Tartib ma'noli: instrument → mijoz → sotuv → daromad. Sanoq raqamlari
   muallif talabi bilan OLIB TASHLANDI (2026-08-16): plitalar endi 2×2
   bo'lib joylashadi va u yerda "01, 02, 03, 04" tik ustun hosil qilmaydi
   — ular ikki ustunga sochilib, tartibni ko'rsatish o'rniga o'zi
   chalkashtirardi. Tartibni endi IKONKA beradi: har bandning o'z belgisi
   bor va bandlar bir-biridan raqam bilan emas, ma'no bilan farqlanadi. */
const LEARN = [
  { text: "AI instrumentlarini", Icon: Spark },
  { text: "mijoz topishni", Icon: Target },
  { text: "sotuv qilishni", Icon: Tag },
  { text: "stabil daromadga chiqishni", Icon: Trend },
];

export function Pain() {
  return (
    /* `pain` — bo'limni QOTIRADIGAN sinf, bezak emas: hero kabi, bu bo'lim
       ham to'liq ko'rinib bo'lgach joyida to'xtaydi va keyingi varaq uning
       ustiga suriladi (qarang `globals.css` dagi `.pain` va `.over-pain`,
       qotish nuqtasi esa `Nav.tsx` da o'lchanadi). */
    <section className="section relative overflow-clip pain sheet-dark">
      {/* BO'LIMNING YAGONA YORUG'LIGI — pastda, katta va bilinar-bilinmas
          (muallif talabi, 2026-08-16).

          Ilgari bu yerda IKKITA yorug'lik bor edi: chap-tepada kichik olov
          va plitalar ortida ikkinchisi. Ular sahifaning umumiy suyuq foni
          ustiga qo'shilib turgan edi. Endi fon sof qora (`.over-hero`) va
          ikkita alohida dog' o'sha qorada ikkita YAMOQ bo'lib ko'rinardi —
          bittasi tugab, ikkinchisi boshlanadigan joyda chegara bilinardi.

          Shuning uchun ular bitta jismga birlashtirildi: bo'limning butun
          enidan keng, markazi pastki chekkaga yaqin. Ko'zga u yorug'lik
          MANBAI emas, bo'limning tagidan ko'tarilgan yorug'lik bo'lib
          ko'rinadi — chekkasi qayerda tugagani sezilmaydi.

          Markaz 88% da: yuqoriroq bo'lsa dog' bo'lib bilinadi, aynan
          100% da esa yorug'lik faqat eng pastki chetda qolib, javob
          plitalarigacha yetib bormaydi — ular esa SHISHA, ya'ni ortida
          yorug'liksiz qora lentaga aylanadi (o'lchab ko'rilgan). */}
      <div
        className="field"
        style={{
          /* Bo'lim enidan KENG (130vw). Chekkasi ekrandan tashqarida
             tugasin: aks holda uning yumaloq chegarasi qora fonda halqa
             bo'lib bilinib qolardi — aynan "bilinar-bilinmas" talabiga
             zid. */
          width: "130vw",
          height: "70vw",
          maxWidth: 1900,
          maxHeight: 900,
          /* 88% emas, 66% — va bu chiroyli tanlov emas, MAJBURIY.
             Bo'limda `overflow: hidden` bor, ya'ni yorug'lik bo'lim
             chekkasida QIRQILADI. 88% da qirqim aynan dog'ning eng yorug'
             yeriga tushib, qora fonda tik chiziq bo'lib ko'rindi. 66% da
             gradient chekkaga yetguncha nolga tushadi va qirqim bo'sh
             joyni kesadi — chok umuman bilinmaydi. */
          top: "66%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.85,
          /* KUCH FONGA BOG'LIQ. Talab hech qachon o'zgarmadi —
             "bilinar-bilinmas" — lekin uni bajaradigan son bo'lim qanday
             rangda ekaniga bog'liq: qora yerda 0.26 alfali to'q sariq
             zo'rg'a seziladigan nur, oq yerda esa o'sha son bo'limning
             butun pastini shaftoli rangga bo'yab qo'yadi. 2026-08-17 da
             sahifa oqarganda u yarmiga tushirilgan, 2026-08-18 da bo'lim
             `.sheet-dark` bilan qora rejimga qaytarilgach esa asl
             qiymatiga qaytdi. */
          background:
            "radial-gradient(ellipse, rgba(255,96,26,.26), rgba(255,58,8,.10) 40%, transparent 68%)",
        }}
      />

      <div className="shell relative" style={{ zIndex: 1 }}>
        <ul className="doubts">
          {DOUBTS.map((d) => (
            <li
              key={d.text}
              className={`bubble bubble-${d.side} reveal`}
              style={
                {
                  "--tilt": d.tilt,
                  "--indent": d.indent,
                } as React.CSSProperties
              }
            >
              {d.text}
              {/* Belgi MATNGA qo'shilmadi, alohida element bo'lib turibdi:
                  emoji o'z o'lchovida keladi (harf balandligidan katta) va
                  uni matn qatorining ichida kichraytirib, boshqa ritmda
                  tekislash kerak — buni faqat o'z selektori bilan qilib
                  bo'ladi. `aria-hidden` esa ekran o'quvchisi har bir
                  xabarni "…qiyin, X belgisi" deb o'qib bermasligi uchun:
                  belgi ma'noni takrorlaydi, qo'shmaydi. */}
              <span className="bubble-x" aria-hidden="true">
                ❌
              </span>
            </li>
          ))}
        </ul>

        {/* JAVOB — bir gap, ikki ovozda (muallif talabi, 2026-08-16).

            Gapning O'ZI o'zgarmadi, faqat u endi bitta uzun satr emas:
            NIMA o'rgatilishi sanab ko'rsatiladi, QANDAY o'rgatilishi esa
            ostida bitta jim satr bo'lib qoladi. Uzun satrda uchala narsa
            ham bir tezlikda o'qilib ketardi — ro'yxatda ular sanaladi.

            `<h2>` SAQLANDI va butun gapni o'z ichiga oladi: bo'limning
            yagona sarlavhasi shu va sahifadagi boshqa bo'limlar bilan bir
            xil (`Proof`, `Path`, `Curriculum` — hammasida bitta h2).
            Shuning uchun bandlar `<li>` emas, `<span>`: `<h2>` ichida
            ro'yxat elementi turolmaydi, raqamlar esa baribir bezak —
            ular CSS hisoblagichidan keladi, matndan emas. */}
        <h2 className="answer reveal">
          <span className="answer-list">
            {LEARN.map(({ text, Icon }) => (
              <span key={text} className="answer-item glass">
                {/* Doira yo'q (muallif talabi). Belgi 22px — matnning
                    kegilidan (21px) bir nuqta katta: bir xil o'lchamda
                    chiziqli belgi qalin harflar yonida kichik bo'lib
                    ko'rinadi, chunki uning ichi bo'sh. */}
                <span className="answer-ic">
                  <Icon size={25} />
                </span>
                {text}
              </span>
            ))}
          </span>
          <span className="answer-line">
            sodda{" "}
            {/* Belgi "i" harfining NUQTASI o'rnida turadi (muallif talabi).

                Shuning uchun "i" alohida o'ramga olindi va harfning o'zi
                MATNDA QOLDI — nuqtasiz "ı" (U+0131) bilan almashtirilmadi.
                Sabab: u boshqa harf; nusxa ko'chirilganda "vıdeo" chiqadi,
                qidiruv tizimi va ekran o'quvchisi ham boshqa so'z ko'radi.
                Nuqta esa CSS niqobi bilan KESIB tashlanadi — matn to'g'ri
                qoladi, ko'z esa faqat kamerani ko'radi (qarang
                `.vid-i-glyph`).

                Ikkita o'ram kerak, chunki niqob o'z bolalariga ham
                tushadi: agar belgi niqoblangan elementning ichida bo'lsa,
                u ham harf bilan birga kesilardi. */}
            <span className="vid">
              v
              <span className="vid-i">
                <span className="vid-i-glyph">i</span>
                <VideoCam className="vid-ic" size={13} />
              </span>
              deo
            </span>{" "}
            materiallar orqali <span className="zero">0</span>-dan
            o&apos;rganib olasiz
          </span>
        </h2>
      </div>
    </section>
  );
}
