"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { NAV_COLLAPSE } from "@/lib/nav";
import { Pill } from "../Pill";

/* "Men haqimda" havolasi 2026-08-16 da nav'dan olib tashlangan edi; bo'limning
   o'zi ham 2026-08-17 da butunlay olib tashlandi (muallif talabi). */
const LINKS = [
  { href: "#dastur", label: "Dastur" },
  { href: "#natijalar", label: "Natijalar" },
];

export function Nav({ showResults }: { showResults: boolean }) {
  const links = LINKS.filter((l) => showResults || l.href !== "#natijalar");
  const ref = useRef<HTMLElement>(null);

  /* Bosqichni SKROLLNING O'ZI boshqaradi: `--nav-p` har bir skroll
     hodisasida scrollY dan qayta hisoblanadi. Ya'ni bu bir marta o'ynab
     tugaydigan animatsiya emas — barmoq orqaga qaytsa, kapsula ham
     teskari yoyiladi. Butun ko'rinish (eni, ichki bo'shliq, material,
     matn rangi va soyasi) shu bitta sondan chiqadi; qarang `globals.css`
     dagi NAV bo'limi. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let last = -1;

    /* BAND SAHIFANING ENG TEPASIDA — [0, NAV_COLLAPSE] (muallif talabi,
       2026-08-16, eski holatga qaytarildi).

       Ya'ni nav ekran o'lchamiga ham, hero balandligiga ham, qora
       qatlamning qayerdaligiga ham qaramaydi: sahifa qimirlashi bilan
       yig'ila boshlaydi va 120 pikselda tugaydi.

       Oraliqda band boshqa joylarda sinab ko'rilgan edi — qatlam headerga
       tekkan nuqtada, keyin undan 120px oldin. Ikkalasi ham rad etildi:
       o'zgarish juda kech sezilardi va sarlavha shaffof nav ostidan
       uzoq vaqt o'tib turardi.

       Shu sababli bu yerda `start` degan o'zgaruvchi ham yo'q — hisob
       to'g'ridan-to'g'ri `scrollY` dan boradi. */
    /* QOTADIGAN VARAQLAR. Uchta va ular bitta qonunga bo'ysunadi: hero
       ustiga `Pain`, `Pain` ustiga krem varaq, krem varaq ustiga esa dastur
       bo'limidan boshlangan qolgan hamma narsa (muallif talabi, 2026-08-17).

       Ro'yxat ATAYLAB qo'lda sanalgan, `.section` lar bo'ylab aylanma emas:
       qotish sanoqli va ongli tanlov, sahifa taxlanmaydi. Yangi pog'ona
       qo'shishning to'liq tartibi `globals.css` dagi "POG'ONALAR" izohida —
       bu ro'yxat o'sha uch qadamdan bittasi, xolos. */
    const SHEETS = [
      { sel: ".hero", cssVar: "--hero-top" },
      { sel: ".pain", cssVar: "--pain-top" },
      { sel: ".path", cssVar: "--path-top" },
    ]
      .map((s) => ({
        el: document.querySelector<HTMLElement>(s.sel),
        cssVar: s.cssVar,
      }))
      .filter((s): s is { el: HTMLElement; cssVar: string } => s.el !== null);

    const lastTops = new Map<string, number>();

    /* EKRAN BALANDLIGI — BARQAROR QIYMAT (tuzatilgan xato, 2026-08-19).

       Muallif ko'rgan holat: telefonda sahifa skroll paytida "jinnisirab"
       ketardi — bo'limlar bir-birining ustiga noto'g'ri joyda chiqib,
       yarim chizilgan holda qotib qolardi.

       Sabab quyidagi hisobda edi. Qotish nuqtasi `min(0, ekran − varaq)`
       va u HAR SKROLL KADRIDA qayta yoziladi. Kompyuterda `innerHeight`
       o'zgarmaydi, ya'ni qiymat ham o'zgarmaydi va hech narsa yozilmaydi.
       TELEFONDA esa manzil qatori skroll paytida yashirinadi va qaytadi —
       `innerHeight` 60-100 pikselga sakraydi. Natijada `--hero-top` va
       qolgan ikkitasi skroll davomida uzluksiz o'zgarib turardi, ya'ni
       brauzer har kadrda uchta `sticky` bo'limning qotish shartini qaytadan
       hisoblashga majbur bo'lardi. Kompozitor bunga ulgurmay, eski
       plitkalarni ekranda qoldirib ketardi — surattagi yirtiq aynan shu.

       Yechim: URL qatoridan kelgan o'zgarishni HISOBGA OLMASLIK. Eni
       o'zgarmagan bo'lsa, balandlikning o'zgarishi faqat o'sha qatordan
       bo'lishi mumkin — bunday holatda eng KATTA ko'rilgan qiymat
       saqlanadi (qatori yashiringan holat, ya'ni skrollning barqaror
       holati). Eni o'zgarsa — bu haqiqiy o'zgarish (burilish yoki oyna
       o'lchami) va o'lchov noldan boshlanadi.

       Varaqning O'Z balandligi avvalgidek har kadrda o'lchanadi: u surat
       kelganda yoki shrift oqib ketganda o'zgaradi va o'sha xato uchun
       yozilgan izoh quyida, `write` da turibdi. */
    let stableH = window.innerHeight;
    let lastW = window.innerWidth;

    const viewportH = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w !== lastW) {
        lastW = w;
        stableH = h;
      } else if (h > stableH) {
        stableH = h;
      }
      return stableH;
    };

    /* O'lchov faqat BITTA ish uchun qoldi: varaqlar qayerda qotishini
       hisoblash. U navning bandiga umuman aloqador emas. */
    const measure = () => {
      for (const { el, cssVar } of SHEETS) {
        /* Varaq qayerda qotishi SHU YERDA hisoblanadi, CSS da emas.

           Kerakli qiymat `min(0, ekran − varaq)`: varaq ekrandan baland
           bo'lsa, u avval to'liq ko'rinib bo'ladi, keyin qotadi.

           Avval bu hisob CSS da `100dvh` bilan qilingan edi va aynan shu
           xato bo'ldi: o'lchandi, `100dvh` = 812px, `innerHeight` esa
           834px. Telefonda farq yanada yomon — `dvh` manzil qatori
           yashiringanda o'zgaradi, skroll geometriyasi esa o'zgarmaydi.
           Endi ikkala son ham shu bitta chaqiruvdan chiqadi, ya'ni ular
           kelishmay qolishi mumkin emas. */
        const top = Math.min(0, viewportH() - el.getBoundingClientRect().height);
        if (lastTops.get(cssVar) !== top) {
          lastTops.set(cssVar, top);
          document.documentElement.style.setProperty(cssVar, `${top}px`);
        }
      }
    };
    measure();

    /* ATAYLAB requestAnimationFrame'siz. Skroll hodisasi brauzerda
       allaqachon kadrga bog'langan, rAF esa qiymatni bir kadr KEYINGA
       suradi — o'sha bitta kadr kapsulani barmoqdan orqada sudralayotgandek
       ko'rsatadi. Bu yerda bitta CSS o'zgaruvchisi yoziladi, xolos. */
    const write = () => {
      /* Har kadrda QAYTA O'LCHANADI va bu ataylab.

         Avval o'lchov faqat `ResizeObserver` ga tayangan edi va aynan
         shu xato bo'ldi: telefonda hero balandligi 1131px bo'lgani holda
         `--hero-h` da 713px turib qoldi, natijada hero to'liq ko'rinmay
         qotib qolgan va surat yarmida kesilgan holda uning ustiga qora
         qatlam chiqib kelgan edi (o'lchandi).

         Sabab — kuzatuvchining yetkazilishi kadr chizilishiga bog'liq:
         sahifa fonda bo'lsa yoki brauzer chizishni sekinlashtirsa, u
         kechikadi yoki umuman kelmaydi. Bu yerda esa xato KO'ZGA
         KO'RINADI — hero noto'g'ri joyda qotadi.

         Bitta elementning o'lchamini o'qish arzon, skroll ishlovchisi esa
         allaqachon kadrga bog'langan. Avval O'QIYMIZ, keyin YOZAMIZ —
         bitta kadr ichida layout ikki marta hisoblanmaydi. */
      measure();

      const t = Math.min(1, Math.max(0, window.scrollY / NAV_COLLAPSE));
      /* smoothstep — ikkala chekkada tekis. Chiziqli bo'lganda kapsula
         boshida ham, oxirida ham devorga urilgandek keskin to'xtaydi. */
      const p = Math.round(t * t * (3 - 2 * t) * 1000) / 1000;
      // Uchinchi raqamgacha yaxlitlangani uchun bir xil qiymat qayta-qayta
      // yozilmaydi — sahifa oxirigacha skroll qilinganda ish bo'lmaydi.
      if (p === last) return;
      last = p;
      el.style.setProperty("--nav-p", String(p));
    };

    /* BANDNI YOPISH — O'CHIRILDI (2026-08-16).

       Ilgari skroll band ichida to'xtasa, sahifa o'zi bandning bir
       chetiga borardi: nav yarim holatda qotib qolmasin degan g'oya.
       O'shanda band sahifaning eng tepasida — [0, 120px] da — turgan edi
       va u yerda 120px lik avtomatik harakat sezilmasdi ham.

       Endi band sahifaning O'RTASIDA: u qora qatlam headerga tekkan
       nuqtada boshlanadi. O'sha joyda o'quvchi kontentni o'qib turgan
       bo'ladi va sahifaning o'z-o'zidan 120px surilishi tuzatish emas,
       XALAQIT bo'ladi — matn ko'z ostidan siljib ketadi.

       Yarim holatning o'zi esa muammo emas: `--nav-p` uzluksiz qiymat,
       oraliqdagi har bir bosqich to'liq chizilgan ko'rinish. */

    const onScroll = write;

    // Sahifa allaqachon surilgan holatda ochilishi mumkin (yangilash,
    // anker havola) — birinchi qiymat shu yerda qo'yiladi.
    write();

    /* Skrolldan TASHQARIDAGI o'zgarishlar uchun. Skroll paytida o'lchov
       `write` ning o'zida yangilanadi (yuqoriga qarang); bular esa
       foydalanuvchi umuman skroll qilmagan holatlar:
         `resize` — oyna o'lchami yoki telefon burilishi;
         `load`   — surat kelib, hero balandligini o'zgartirishi;
         shriftlar — matn qayta oqib, balandlikni surishi.
       Uchalasi ham bitta ishni qiladi, shuning uchun bitta ishlovchi. */
    const remeasure = () => {
      measure();
      write();
    };
    const ro = new ResizeObserver(remeasure);
    for (const { el } of SHEETS) ro.observe(el);
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      ro.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 sm:top-4" style={{ zIndex: 50 }}>
      <div className="shell">
        <nav
          ref={ref}
          className="nav-bar flex items-center justify-between gap-4"
        >
          {/* Shisha ALOHIDA qatlamda turadi. Sabab: so'lish bitta
              kompozitsiya xususiyati (`opacity`) bilan chiziladi va matn
              bunga umuman qo'shilmaydi — u har bosqichda to'liq quyuq. */}
          <span aria-hidden className="nav-skin glass" />

          <a
            href="#top"
            className="relative -my-2 flex items-center gap-2.5 py-2"
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              minHeight: 44,
            }}
          >
            {/* Storis halqasi. `aria-hidden`: yonidagi matn allaqachon kim
                ekanini aytadi, ekran o'quvchi uni ikki marta o'qimasligi
                kerak. */}
            <span aria-hidden className="story">
              <span className="story-ring" />
              <span className="story-face">
                <Image
                  src="/media/portrait/jamal-blue.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                  style={{ objectPosition: "50% 42%" }}
                  /* `priority` Next 16 da bekor qilindi (batafsil izoh
                     `Hero.tsx` da, LCP suratining yonida). Bu yerda o'rniga
                     `loading` qo'yildi, `preload` emas: hujjatning o'z
                     maslahati shu ("In most cases, you should use
                     `loading="eager"` ... instead of `preload`"), chunki
                     `preload` LCP nomzodi uchun saqlanadi — bu 54px lik
                     avatar esa u emas.

                     AMALDA ikkalasi bir xil natija beradi va buni bilib
                     qo'ygan ma'qul: o'lchandi, `loading="eager"` da ham
                     Next `<head>` ga preload havolasini qo'yadi. Ya'ni bu
                     tanlov tezlikni emas, NIYATni bildiradi. 64px lik
                     surat uchun narxi ham shunga yarasha. */
                  loading="eager"
                />
              </span>
            </span>
            <span className="brand-name">janob_dasturchi</span>
          </a>

          <div className="relative flex items-center gap-1">
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="nav-link block rounded-full px-3.5 py-2"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <Pill href="#paketlar" size="sm">
              Kursga yozilish
            </Pill>
          </div>
        </nav>
      </div>
    </header>
  );
}
