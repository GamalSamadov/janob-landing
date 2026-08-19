import { Plus } from "../Icons";
import type { Content } from "@/lib/types";

/**
 * ENG KO'P UCHRAYDIGAN SAVOLLAR (muallif talabi, 2026-08-17).
 *
 * Tuzilishi muallif bergan referensdan: markazlashgan sarlavha va uning
 * ostida tor ustunda yig'ilgan qatorlar; har qatorning chap tomonida savol,
 * o'ngida esa `+` belgisi.
 *
 * HAMMASI ADMIN PANELIDAN keladi. Sahifada birorta ham namuna savol
 * yozilmagan va bu ataylab — sahifaning qolgan hamma joyi shu qoidaga
 * bo'ysunadi (qarang `Proof.tsx`): material kiritilmagan bo'lsa, blok
 * chizilmaydi, soxta matn esa hech qachon ko'rsatilmaydi.
 *
 * `details` — SAHIFANING O'Z ELEMENTI, yasalgan akkordeon emas. Uch narsa
 * tekin keladi va uchalasini ham qo'lda yozish xato manbai bo'lardi:
 * klaviatura bilan ochish-yopish, ekran o'quvchisi uchun holat
 * ("yig'ilgan"/"yoyilgan") va JS umuman ishlamaganda ham kontentning
 * ochilishi. Balandlik bo'yicha yumshoq harakat ham allaqachon yozilgan
 * (`globals.css` → `details::details-content`) va u shu yerda o'z-o'zidan
 * ishlaydi.
 */
export function Faq({ content }: { content: Content }) {
  /* Yarim to'ldirilgan qator CHIZILMAYDI: savol yozilib, javob
     yozilmagan bo'lsa, o'quvchi bosadi va bo'sh joy ochiladi. Ikkalasi
     ham bo'lgani — qatorning mavjud bo'lish sharti. */
  const items = content.faq.filter(
    (f) => f.question.trim() !== "" && f.answer.trim() !== "",
  );

  if (items.length === 0) return null;

  return (
    <section id="savollar" className="section relative overflow-clip sheet-dark">
      <div
        className="field float-field"
        style={{
          width: "52vw",
          height: "52vw",
          maxWidth: 680,
          maxHeight: 680,
          top: "6%",
          right: "-16%",
          opacity: 0.5,
          animationDelay: "-8s",
          background:
            "radial-gradient(circle, rgba(255,90,26,.12), transparent 68%)",
        }}
      />

      <div className="shell relative" style={{ zIndex: 1 }}>
        <h2 className="t-h2 text-center">Eng ko&apos;p uchraydigan savollar</h2>

        {/* USTUN TOR va bu o'lchov o'qish uchun: javob matni uzun bo'lishi
            mumkin, butun kenglikka yoyilgan qator esa ko'zni bir chetdan
            ikkinchisiga tashlatadi. Referensda ham ustun sahifaning
            o'rtasida, atrofida keng havo bilan turadi. */}
        <div className="faq-list">
          {items.map((f) => (
            <details key={f.id} className="glass glass-quiet faq-item">
              <summary className="faq-q">
                <span>{f.question}</span>
                {/* Belgi BITTA va u aylanadi: `+` ochilganda 45° burilib
                    `×` bo'ladi. Ikkita alohida belgi almashtirilsa,
                    o'tish sakrash bo'lib ko'rinardi. */}
                <span aria-hidden className="faq-ic">
                  <Plus size={18} />
                </span>
              </summary>
              <p className="faq-a">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
