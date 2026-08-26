"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/use-in-view";
import { Close, Play, Star } from "./Icons";
import { Pill } from "./Pill";

/** Lentaning bitta kartasi — skrinshot ham, video ham shu shaklga keladi. */
export interface RailItem {
  key: string;
  /** Skrinshot yoki video posteri. `null` — faqat videoda bo'ladi. */
  src: string | null;
  /** Karta ustidagi yirik matn: skrinshotda natija, videoda ism. */
  title: string;
  /** Faqat videoda: tashqi havola yoki yuklangan fayl yo'li. */
  href?: string;
}

/* KARTA BOSILGANDA NIMA OCHILADI.
   ===========================================================================

   Talab bitta: bosilganda o'sha rasm yoki video EKRANDA ochilsin (muallif
   talabi, 2026-08-17). Skrinshot bilan hammasi oson — u bizniki. Video esa
   turlicha bo'lishi mumkin va aynan shu yerda hal qilinadi.

   TO'RT HOLAT, va oxirgisi eng muhimi:

     `image` — daromad skrinshoti, to'liq holida (kesilmagan);
     `file`  — admin panelidan YUKLANGAN video, o'z serverimizdan;
     `embed` — YouTube yoki Vimeo, o'yingich oynasi ichida;
     `link`  — QOLGAN HAMMASI.

   `link` — bu taslim bo'lish emas, ONGLI tanlov. Instagram, TikTok va
   ko'pchilik boshqa xizmat o'z videosini begona sahifada ijro etishga
   ruxsat bermaydi: `iframe` ochiladi-yu, ichida bo'sh oq maydon yoki
   "login" devori chiqadi. Bu havolani yangi oynada ochishdan YOMONROQ,
   chunki foydalanuvchi buzilgan deb o'ylaydi. Shu sababli bunday havolada
   oyna baribir ochiladi (bosish har doim bir xil ishlaydi), ichida esa
   poster va videoga o'tadigan aniq knopka turadi.

   Yangi xizmat qo'shish uchun shu funksiyaga bitta qator yetadi. */
type Media =
  | { kind: "image"; src: string }
  | { kind: "file"; src: string }
  | { kind: "embed"; src: string; portrait: boolean }
  | { kind: "link"; href: string; poster: string | null };

function mediaOf(item: RailItem): Media {
  const url = item.href;
  if (!url) return { kind: "image", src: item.src as string };

  // Yuklangan fayl — yo'l `/media/...` dan boshlanadi, ya'ni o'zimizniki.
  if (/^\/.+\.(mp4|webm|mov|m4v)$/i.test(url)) return { kind: "file", src: url };

  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|live\/|watch\?(?:.*&)?v=))([\w-]{6,})/,
  );
  if (yt) {
    return {
      kind: "embed",
      src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`,
      /* Shorts — TIK kadr. Nisbatni havolaning o'zi aytib turibdi va uni
         to'g'ri olish kerak: 16:9 oynaga tik video solinsa, ikki yonida
         keng qora yo'l qolib, videoning o'zi kichrayib ketadi. */
      portrait: url.includes("/shorts/"),
    };
  }

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return {
      kind: "embed",
      src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`,
      portrait: false,
    };
  }

  return { kind: "link", href: url, poster: item.src };
}

function RailCard({
  item,
  clone,
  onOpen,
}: {
  item: RailItem;
  clone?: boolean;
  onOpen: (i: RailItem) => void;
}) {
  const body = (
    <>
      {item.src && (
        <>
          <Image
            src={item.src}
            alt={clone ? "" : item.title}
            fill
            sizes="(max-width: 640px) 62vw, 18rem"
            className="rail-img"
          />
          {/* MUZLI NUSXA — matn ostidagi shisha. Izohi `globals.css`
              dagi `.rail-frost` da: bu yerda `backdrop-filter` ishlatib
              bo'lmaydi, shuning uchun suratning O'ZI xiralashtiriladi. */}
          <Image
            src={item.src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 62vw, 18rem"
            className="rail-frost"
          />
        </>
      )}

      <span aria-hidden className="rail-glare" />

      <div className="rail-plate">
        <p className="rail-cap">{item.title}</p>
        {/* Baho HAR KARTADA bir xil — 5.0. U admin panelidan kelmaydi va
            kelmasligi ham kerak: bu alohida o'lchov emas, bitiruvchining
            otzivi ostidagi belgi (muallif talabi, 2026-08-17). */}
        <p className="rail-rate">
          5.0 <Star size={17} />
        </p>
      </div>

      {item.href && (
        <span aria-hidden className="rail-play">
          <Play size={20} />
        </span>
      )}
    </>
  );

  /* VIDEO — `a`, SKRINSHOT — `button`, va bu farq ataylab.
     Ikkalasi ham oynani ochadi, lekin videoning ORTIDA haqiqiy manzil
     bor: havola bo'lib qolgani uchun uni o'rta tugma bilan yangi oynada
     ochish ham, nusxalash ham mumkin, JS yuklanmagan holatda esa
     avvalgidek o'z sahifasiga olib boradi. Skrinshotda esa boradigan
     manzil yo'q — u faqat shu sahifadagi amal, ya'ni knopka. */
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rail-card"
        onClick={(e) => {
          // Foydalanuvchining o'z niyati ustun: Cmd/Ctrl bosilgan yoki
          // o'rta tugma bilan bosilgan bo'lsa, brauzer o'z ishini qiladi.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          onOpen(item);
        }}
        {...(clone && { tabIndex: -1 })}
      >
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="rail-card"
      aria-label={`${item.title} — skrinshotni ochish`}
      onClick={() => onOpen(item)}
      {...(clone && { tabIndex: -1 })}
    >
      {body}
    </button>
  );
}

export function ProofRail({ items }: { items: RailItem[] }) {
  const [open, setOpen] = useState<RailItem | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  /* Lenta ekrandan chiqqanda TO'XTAYDI. U sahifaning o'rtasida turadi va
     o'quvchi hero ni o'qib turganda ham aylanaverardi — o'lchandi, bu
     sahifadagi eng yirik uzluksiz qatlam (1.15 MPx). */
  const [railRef, railInView] = useInView<HTMLDivElement>();

  /* `showModal()` — `open` atributini qo'lda qo'yish EMAS, va bu farq
     hal qiluvchi. Faqat modal holatda `dialog` "top layer" ga chiqadi:
     ya'ni u sahifadagi hamma `overflow: clip`, `isolation: isolate`,
     `z-index` va qotgan (`sticky`) qatlamlardan TASHQARIDA chiziladi.
     Bu sahifada esa o'sha qatlamlar juda ko'p — oddiy `position: fixed`
     bilan oyna lentaning ichida qirqilib qolardi.

     Ustiga u tekin qilib beradigan narsalar ham bor va ularni qayta
     yozish shart emas: Esc bilan yopilish, fokusning oyna ichida
     qolishi va ortdagi sahifaning `inert` bo'lishi. */
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  /* OYNA OCHIQDA SAHIFA QOTADI.

     Ilgari bu yerda ikki qism bor edi va birinchisi `lenis.stop()` —
     silliq skroll sahifani HAQIQATDAN surardi, ya'ni uni to'xtatmasak,
     u modal oyna ostida ham o'z ishini qilaverardi. Lenis 2026-08-25 da
     butunlay olib tashlandi (izohi `page.tsx` da), shu bilan o'sha qism
     ham ketdi.

     IKKINCHI QISM QOLADI va u allaqachon asosiy ish qilardi (o'lchandi,
     2026-08-17): `lenis.stop()` YOLG'IZ YETMAGAN edi — `lenis-stopped`
     sinfi qo'yilgan holda ham haqiqiy g'ildirak sahifani 500px surib
     yubordi. Sabab Lenis da emas: modal `dialog` ochiq bo'lsa ham
     brauzer ortdagi hujjatni skroll qilaveradi (spetsifikatsiyada
     shunday). Ya'ni bu qism Lenis borligidan qat'i nazar kerak edi.

     Hodisa MANBADA to'xtatiladi. Oynaning ICHIDAGI skroll o'tkaziladi
     (uzun matn baribir o'qilishi kerak), sahifaga chiqib ketmasligini
     esa `.lb` dagi `overscroll-behavior: contain` ushlaydi. */
  useEffect(() => {
    if (!open) return;

    const block = (e: Event) => {
      if (ref.current?.contains(e.target as Node)) return;
      if (e.cancelable) e.preventDefault();
    };
    // `passive: false` — usiz `preventDefault()` e'tiborsiz qoldiriladi;
    // `capture` — hodisa boshqa ishlovchilarga yetib borgunicha ushlanadi.
    const opts = { passive: false, capture: true } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);

    return () => {
      window.removeEventListener("wheel", block, { capture: true });
      window.removeEventListener("touchmove", block, { capture: true });
    };
  }, [open]);

  const media = open ? mediaOf(open) : null;

  return (
    <>
      <div
        ref={railRef}
        className={`rail${open ? " rail-hold" : ""}${railInView ? "" : " is-idle"}`}
        /* Tezlik KARTA SONIGA bog'liq: davomiylik bitta o'ramning enini
           bosib o'tish vaqti, ya'ni karta qo'shilganda lenta tezlashib
           ketmasligi uchun u ham o'sishi kerak. Kartaga 5 soniya —
           o'rtacha, o'qishga ham ulguriladi. */
        style={{ "--rail-dur": `${items.length * 5}s` } as React.CSSProperties}
      >
        <div className="rail-track">
          <div className="rail-group">
            {items.map((it) => (
              <RailCard key={it.key} item={it} onOpen={setOpen} />
            ))}
          </div>
          {/* IKKINCHI O'RAM — halqani ulaydigan nusxa. Ko'z uchun bor,
              ekran o'quvchi uchun yo'q: bir xil ro'yxat ikki marta
              o'qilmasligi kerak. */}
          <div className="rail-group" aria-hidden>
            {items.map((it) => (
              <RailCard
                key={`${it.key}-clone`}
                item={it}
                clone
                onOpen={setOpen}
              />
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={ref}
        className="lb"
        aria-label={open ? open.title : undefined}
        /* Esc ham, `close()` ham shu yerdan o'tadi — holat oynaning
           haqiqiy holatidan ORQADA qolib ketmaydi. */
        onClose={() => setOpen(null)}
        /* Fon bosilganda yopiladi: bosish `dialog` ning O'ZIGA tushsa,
           demak u ichkaridagi ramkaga tushmagan. */
        onClick={(e) => {
          if (e.target === ref.current) setOpen(null);
        }}
      >
        {/* Ichki qismi FAQAT ochiq holatda chiziladi va bu majburiy:
            `iframe` yoki `video` markupda qolib ketsa, oyna yopilgach
            ham ovoz chalinib turardi. Yopilish = uzilish. */}
        {open && media && (
          <div className="lb-box">
            <div className="lb-frame">
              {media.kind === "image" && (
                /* eslint-disable-next-line @next/next/no-img-element --
                   `next/image` ga o'lchov kerak, bu yerda esa u YO'Q:
                   skrinshotlar admin panelidan keladi va har biri boshqa
                   nisbatda. Oyna asl suratni butunicha ko'rsatishi kerak,
                   kesilgan yoki cho'zilgan holda emas. Surat allaqachon
                   kartada yuklangan, ya'ni keshdan darrov chiqadi. */
                <img className="lb-img" src={media.src} alt={open.title} />
              )}

              {media.kind === "file" && (
                <video
                  className="lb-video"
                  src={media.src}
                  poster={open.src ?? undefined}
                  controls
                  autoPlay
                  playsInline
                />
              )}

              {media.kind === "embed" && (
                <iframe
                  className={`lb-embed${media.portrait ? " lb-embed-tall" : ""}`}
                  src={media.src}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {media.kind === "link" && (
                <div className="lb-out">
                  {media.poster && (
                    /* eslint-disable-next-line @next/next/no-img-element --
                       yuqoridagi bilan bir sabab. */
                    <img className="lb-img" src={media.poster} alt="" />
                  )}
                  <p className="t-item" style={{ color: "var(--text-2)" }}>
                    Bu videoni faqat o&apos;z sahifasida ko&apos;rish mumkin.
                  </p>
                  <Pill href={media.href} external>
                    Videoni ochish
                  </Pill>
                </div>
              )}

              <button
                type="button"
                className="lb-x"
                aria-label="Yopish"
                onClick={() => setOpen(null)}
              >
                <Close size={18} />
              </button>
            </div>

            <div className="lb-bar">
              <p className="lb-cap">{open.title}</p>
              <p className="rail-rate" style={{ marginTop: 0 }}>
                5.0 <Star size={16} />
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
