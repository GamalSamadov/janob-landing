import { CardFan } from "../CardFan";

/**
 * Kursning natijalari — yoyilgan kartalar bo'lib cheksiz aylanadi.
 *
 * JOYLASHUV muallif bergan referens dizayndan olingan (2026-08-17):
 * yelpig'ich TEPADA, savol esa uning OSTIDA. Bu oddiy "sarlavha + ro'yxat"
 * tartibining teskarisi va ataylab shunday: kartalar avval ko'zni tortadi,
 * savol esa ular nima ekanini keyin aytadi — o'quvchi javoblarni ko'rib
 * turgan holda savolni o'qiydi.
 *
 * Referens QORA rejimda edi, undan faqat joylashuv olindi. Varaq oq
 * qolaveradi — `.sheet-light` rang tokenlarini almashtiradi (qarang
 * `globals.css`), shuning uchun kartalar, matn va shisha o'z-o'zidan
 * yorug' rejimda chiziladi.
 *
 * ILGARI BU YERDA RAQAMLI "YO'L" RO'YXATI TURGAN EDI (2026-08-16) — chapda
 * sarlavha, o'ngda esa relsga tizilgan olti bosqich. U muallif talabi bilan
 * to'liq almashtirildi; matnlar ham qayta yozildi (endi ular "erishasiz"
 * savoliga javob bo'lib turadi, qarang `CardFan.tsx`).
 */
export function Path() {
  return (
    /* `path` — bo'limni QOTIRADIGAN sinf (qarang `globals.css` dagi
       "POG'ONALAR"): varaq to'liq ko'rinib bo'lgach joyida to'xtaydi va
       dastur bo'limi uning ustiga suriladi. */
    <section className="section sheet-light relative path">
      <div className="shell flex flex-col items-center">
        <CardFan />

        {/* Savol — yelpig'ich ostida, markazda. `t-h2` bo'lim sarlavhalari
            bilan bir kegilda: bu bo'limning sarlavhasi, izoh emas.

            Oraliq QISQARTIRILDI (`mt-11` → `mt-4`, muallif ko'rgan holat):
            savol kartalarga tegishli, uzoqlashsa ular bir-biriga aloqasiz
            ikki blok bo'lib ko'rinardi. Qolgan bo'shliqni yelpig'ichning
            o'z balandligi beradi (qarang `globals.css` → `.fan`). */}
        <h2 className="t-h2 mt-4 text-center" style={{ maxWidth: "22ch" }}>
          Kursni bitirib nimalarga erishasiz?
        </h2>
      </div>
    </section>
  );
}
