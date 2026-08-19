/**
 * SUYUQ FON — shishaning MAVJUD BO'LISH sharti.
 *
 * Referens suratlarda shisha go'zal ko'rinishining sababi qirra emas:
 * uning ORTIDA rangli, yorqin, oqib turgan jism bor. `backdrop-filter`
 * o'sha jismni xiralashtiradi va shisha ichida rang dog'lari paydo bo'ladi.
 *
 * Oldingi holatda fon SOF QORA edi — qoraning xiralashgani ham qora.
 * Shu sababli shisha ko'rinmas edi va uning o'rniga qattiq oq ramka
 * chizilgandi. Ramka olib tashlandi, o'rniga mana shu maydon qo'yildi.
 *
 * Yorug'lik darajasi ATAYLAB past: eng yorqin nuqtada ham fon chuqur
 * tungi ko'k bo'lib qoladi (oq matn kontrasti 15:1 dan yuqori).
 * Shisha o'sha past yorug'likni `saturate` bilan TO'PLAB ko'rsatadi —
 * shuning uchun panel atrofidan yorqinroq chiqadi, xuddi referensdagidek.
 */
export function Liquid() {
  return (
    <div aria-hidden className="liquid">
      <span className="liquid-form liquid-a" />
      <span className="liquid-form liquid-b" />
      <span className="liquid-form liquid-c" />
      <span className="liquid-grain" />
    </div>
  );
}
