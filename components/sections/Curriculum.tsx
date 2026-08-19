"use client";

import { useState } from "react";
import { MODULES, PROJECTS } from "@/lib/curriculum";
import { iconForLesson, iconForProject } from "@/lib/lesson-icons";
import { useInView } from "@/lib/use-in-view";
import { ArrowDown, Check } from "../Icons";

/**
 * DARSLARIMIZ KETMA-KETLIGI — qadamli yo'l xaritasi.
 *
 * Tuzilishi muallif bergan referensdan (2026-08-17): tepada raqamli
 * qadamlar chiziq bilan bog'langan, pastida esa tanlangan qadamning
 * ichidagilari shisha panelda ochiladi.
 *
 * BO'LIM ATAYLAB YALANG'OCH (muallif talabi: "boshqa umuman keraksiz
 * elementlar kerak emas"). Ilgari bu yerda tavsif gapi, ochiladigan
 * akkordeonlar va oxirida loyihalar ro'yxati turardi — hammasi olib
 * tashlandi. Qolgani uchta narsa: sarlavha, qadamlar va ro'yxat.
 *
 * RANG REFERENSDAN OLINMADI (muallif talabi): u yerda ko'k, bizda esa
 * sahifaning o'z olov rangi — `--flame`. Referensdan faqat TUZILISH
 * olindi.
 *
 * O'TILGAN QADAMLAR BELGILANADI (referensdagidek): tanlangandan
 * oldingilari "bajarilgan" bo'lib, raqami o'rniga belgi qo'yiladi va
 * ularni bog'lagan chiziq yonadi. Bu bo'limni RO'YXAT emas, YO'L qilib
 * o'qitadi — modullar ketma-ket o'tiladi va o'quvchi qayerdaligini
 * ko'rib turadi.
 */
export function Curriculum() {
  const [active, setActive] = useState(0);
  /* Ro'yxat yig'ilgan holatda ochiladi va faqat besh qatori ko'rinadi
     (muallif talabi, 2026-08-17). NECHTA DARS ko'rinishini bu yer emas,
     CSS hal qiladi: ustunlar soni ekran eniga qarab o'zgaradi (telefonda
     bitta, kompyuterda ikkita), ya'ni besh QATOR telefonda besh, kompyuterda
     o'nta dars degani. Buni JS da hisoblash uchun ekran enini o'lchash
     kerak bo'lardi — server bilan mijozning birinchi chizmasi ajralib,
     ro'yxat bir zumda sakrab qolardi. CSS esa buni o'lchovsiz, media
     so'rovining o'zi bilan qiladi (qarang `globals.css` → `.rm-list`). */
  const [expanded, setExpanded] = useState(false);
  const current = MODULES[active];
  /* Loyihalar lentasi ekrandan chiqqanda to'xtaydi — sabab `use-in-view.ts`
     da yozilgan. */
  const [projRef, projInView] = useInView<HTMLDivElement>();

  /* Modul almashsa ro'yxat yana yig'iladi: yangi modul o'z boshidan
     ko'rsatilishi kerak, oldingisining ochilgan holati unga tegishli
     emas. */
  const pick = (i: number) => {
    setActive(i);
    setExpanded(false);
  };

  return (
    <section id="dastur" className="section">
      <div className="shell">
        <h2 className="t-h2 text-center">Darslarimiz ketma-ketligi</h2>

        {/* QADAMLAR. `ol` — bu tartiblangan ro'yxat: modullar ketma-ket
            o'tiladi, ya'ni tartib ma'no tashiydi. */}
        <ol className="rm-steps">
          {MODULES.map((m, i) => (
            <li
              key={m.n}
              className="rm-step"
              data-state={i < active ? "done" : i === active ? "now" : "next"}
            >
              <button
                type="button"
                className="rm-dot"
                onClick={() => pick(i)}
                aria-current={i === active ? "step" : undefined}
                aria-label={`${m.n}-modul: ${m.title}`}
              >
                {/* Bajarilgan qadamda raqam o'rniga belgi — referensdagidek.
                    Raqam baribir yozuvda qoladi (`aria-label`), ya'ni ekran
                    o'quvchisi uchun ma'lumot yo'qolmaydi. */}
                {i < active ? <Check size={20} /> : m.n}
              </button>

              <span className="rm-label" aria-hidden>
                <span className="rm-kicker">Modul {m.n}</span>
                <span className="rm-title">{m.title}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* TELEFONDAGI YORLIQ — faqat tanlangan modulniki, qator ostida.

            Nusxa bo'lib ko'rinadi, lekin emas: yuqoridagi yorliqlar
            telefonda umuman chizilmaydi (`globals.css` → `.rm-label`), bu
            esa faqat telefonda chiziladi — ya'ni ekranda har doim bittasi
            turadi.

            Alohida element bo'lgani ham majburiy. Yorliqni qadamning
            ichida qoldirib, uni qator ostiga markazlashtirib bo'lmasdi:
            u o'z qadamiga nisbatan joylashadi (chiziq shuni talab
            qiladi), ya'ni birinchi qadamda ekranning chap chetidan
            chiqib ketardi (o'lchandi).

            `aria-hidden` — ma'lumot yo'qolmaydi: modul raqami ham, nomi
            ham qadam knopkasining `aria-label` ida yozilgan. */}
        <p className="rm-now" aria-hidden>
          <span className="rm-kicker">Modul {current.n}</span>
          <span className="rm-title">{current.title}</span>
        </p>

        {/* PANEL — tanlangan modulning darslari.

            Material SAHIFANIKI (`glass`), o'ziniki emas: shu sinf butun
            sahifada bir xil yuzani beradi va uning ichida qora qatlam
            uchun qo'yilgan cheklovlar ham hisobga olingan. */}
        <div className="glass rm-panel">
          <ul className="rm-list" data-collapsed={!expanded}>
            {current.lessons.map((l) => {
              const Icon = iconForLesson(l);
              return (
                <li key={l} className="rm-lesson">
                  <span aria-hidden className="rm-lic">
                    <Icon size={17} />
                  </span>
                  <span>{l}</span>
                </li>
              );
            })}
          </ul>

          {/* KNOPKA SAHIFANING O'Z TIZIMIDAN (`pill`) — bu bo'lim uchun
              yangi uslub o'ylab topilmadi.

              U qachon KERAKLIGINI ham CSS hal qiladi (`:has()` bilan,
              qarang `globals.css` → `.rm-more`): yashiringan dars bo'lsa
              chiqadi, bo'lmasa umuman chizilmaydi. Sabab ro'yxatnikiga
              o'xshash — nechta dars yashiringani ustunlar soniga, ya'ni
              ekran eniga bog'liq, va JS uni bilmaydi. Yetti darsli modul
              telefonda knopka oladi (beshtasi ko'rinadi), kompyuterda
              esa olmaydi — yettalasi ham to'rt qatorga sig'adi. */}
          <button
            type="button"
            className="pill pill-quiet pill-sm rm-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Yopish" : "Yana ko'rsatish"}</span>
            <ArrowDown size={16} className="pill-icon rm-more-ic" />
          </button>
        </div>

        {/* KURSDA QURILADIGAN LOYIHALAR (muallif talabi, 2026-08-17).

            Darslar ro'yxatidan KEYIN va bu joy ataylab: o'quvchi avval
            nima o'rganishini ko'radi, keyin o'sha bilim nimaga
            aylanishini. Ro'yxat yangi ma'lumot emas — `PROJECTS`
            allaqachon `lib/curriculum.ts` da turgan va dars nomlaridan
            olingan, ya'ni bu yerda va'da qilinayotgan har bir loyihaning
            o'z darsi bor.

            YORLIQ QISQA va u kerak: yorliqsiz sakkizta kapsula darslar
            ro'yxatidan keyin nima ekani noma'lum bo'lib turardi. */}
        <p className="proj-kicker">Kursda mana bu loyihalarni yasaymiz</p>
      </div>

      {/* LENTA `.shell` DAN TASHQARIDA — natijalar lentasi bilan bir
          sababdan: cheksiz oqim ekranning bir chetidan ikkinchisiga
          o'tishi kerak, konteyner ichida esa u ko'rinmas devorga urilib
          to'xtardi. */}
      <div
        ref={projRef}
        className={`proj-row${projInView ? "" : " is-idle"}`}
        /* Tezlik loyiha soniga bog'liq — lentaga qo'shilgan har bir
           kapsula o'z vaqtini olib keladi, ya'ni ro'yxat uzaysa lenta
           tezlashib ketmaydi. */
        style={{ "--proj-dur": `${PROJECTS.length * 4}s` } as React.CSSProperties}
      >
        <div className="proj-track">
          <ul className="proj-group">
            {PROJECTS.map((p) => {
              const Icon = iconForProject(p);
              return (
                <li key={p} className="proj">
                  <span aria-hidden className="proj-ic">
                    <Icon size={16} />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>

          {/* Halqani ulaydigan nusxa — ko'z uchun bor, ekran o'quvchi
              uchun yo'q. */}
          <ul className="proj-group" aria-hidden>
            {PROJECTS.map((p) => {
              const Icon = iconForProject(p);
              return (
                <li key={`${p}-clone`} className="proj">
                  <span aria-hidden className="proj-ic">
                    <Icon size={16} />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
