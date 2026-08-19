import { CountUp } from "../CountUp";
import { ProofRail, type RailItem } from "../ProofRail";
import type { Content } from "@/lib/types";

/**
 * Sotsial isbot. HAMMASI admin panelidan keladi.
 * Material kiritilmagan bo'lsa — blok umuman chizilmaydi.
 * Soxta otziv, soxta raqam yoki namuna matn hech qachon ko'rsatilmaydi.
 *
 * MATNLI OTZIVLAR OLIB TASHLANDI (muallif talabi, 2026-08-17):
 * "skrinshotsiz shunchaki matnlarning o'zi kerak emas". Ya'ni bu bo'limda
 * endi faqat KO'RSATSA BO'LADIGAN dalil bor — daromad skrinshoti yoki
 * video otziv. Admin panelidagi matnli otzivlar maydoni joyida turibdi,
 * lekin sahifada chizilmaydi.
 *
 * Bo'lim SERVERDA qoladi; harakat va bosilganda ochiladigan oyna
 * `ProofRail` da — bo'lim faqat ma'lumotni tayyorlab beradi.
 */
export function Proof({ content }: { content: Content }) {
  const { shots, videos } = content.proof;
  const graduates = content.stats.graduates.trim();

  /* Raqamdan FAQAT sonning o'zi olinadi. Admin panelida "120" ham, "340+"
     ham yozilishi mumkin — sanoqqa esa butun son kerak, "+" ni sahifa
     o'zi qo'yadi. */
  const digits = graduates.match(/\d+/)?.[0];
  const target = digits ? Number(digits) : null;

  const items: RailItem[] = [
    ...shots.map((s) => ({ key: s.id, src: s.src, title: s.caption })),
    ...videos.map((v) => ({
      key: v.id,
      src: v.poster,
      title: v.name,
      href: v.url,
    })),
  ];

  if (target === null && items.length === 0) return null;

  return (
    <section id="natijalar" className="section relative overflow-clip">
      <div
        className="field float-field"
        style={{
          width: "46vw",
          height: "46vw",
          maxWidth: 600,
          maxHeight: 600,
          top: "18%",
          left: "-14%",
          opacity: 0.55,
          animationDelay: "-14s",
          /* Yashil YORUG' REJIMDA yarmiga tushdi (.12 → .06, 2026-08-17).
             Qora yerda u ko'zga rang bo'lib emas, YORUG'LIK bo'lib
             tushardi; oq yerda esa aynan o'sha qiymat bo'limning chap
             tomonini yashil dog'ga aylantirib, sahifaning issiq
             palitrasidan chiqib ketardi. */
          background:
            "radial-gradient(circle, rgba(48,209,88,.06), transparent 68%)",
        }}
      />

      <div className="shell relative" style={{ zIndex: 1 }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="t-h2" style={{ maxWidth: "15ch" }}>
            Kursimiz bitiruvchilari
          </h2>

          {target !== null && (
            <div className="glass glass-quiet rounded-[22px] px-7 py-5">
              <span
                className="t-num block leading-none"
                style={{
                  fontSize: "clamp(2.25rem, 5.5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                +<CountUp to={target} />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* LENTA `.shell` DAN TASHQARIDA va bu ataylab: u ekranning bir
          chetidan ikkinchisiga o'tadi. Konteyner ichida qolsa, kartalar
          ko'rinmas devorga urilib to'xtardi — cheksiz lentaning butun
          ma'nosi esa aynan chetdan chiqib ketishida. */}
      {items.length > 0 && <ProofRail items={items} />}
    </section>
  );
}
