"use client";

import { useEffect, useState, type ReactNode } from "react";

/* KNOPKA VIDEONING O'RTASIDA OCHILADI (muallif talabi, 2026-09-09).

   FAQAT REKLAMA OQIMIDA (`/challange-darslik`). Bepul oqim
   (`/bepul-darslik`) o'zgarmadi — u yerda knopka avvalgidek darrov
   turadi.

   HISOB VIDEONING O'ZIDAN OLINADI, sahifada o'tkazilgan vaqtdan emas
   (muallif tanlovi): sanoqqa faqat video HAQIQATAN o'ynagan daqiqalar
   tushadi. Ochib qo'yib ketilgan varaq knopkani ochmaydi.

   O'LCHASH USULI — POZITSIYA FARQI, hodisalar emas. Har soniyada
   pleerdan `getCurrentTime()` so'raladi va oldingi o'lchov bilan farqi
   qo'shiladi:

     farq = 0        -> pauza yoki reklama; hech narsa qo'shilmaydi
     0 < farq <= 4   -> ko'rildi (2x tezlikda ham shu oraliqda qoladi)
     farq > 4        -> OLDINGA SURILGAN; sanoqqa tushmaydi

   Ya'ni videoni kerakli daqiqaga surib qo'yish knopkani ochmaydi — buning
   uchun uni ko'rish kerak. Orqaga surilsa farq manfiy bo'ladi va u ham
   qo'shilmaydi (ikkinchi marta ko'rilgan joy ikki marta sanalmaydi).

   HISOB BRAUZERDA SAQLANADI: 50 daqiqalik darsni bir o'tirishda
   ko'rmaydiganlar ko'p. Varaq yopilib qayta ochilsa, sanoq to'plangan
   joydan davom etadi va yig'ilgan vaqt yetgan bo'lsa, knopka darrov
   ochiq keladi. Saqlangani tozalansa (inkognito, boshqa brauzer) hisob
   noldan boshlanadi — bu himoya emas, qulaylik.

   ZAXIRA YO'L. Agar YouTube ning boshqaruv skripti umuman yuklanmasa
   (reklama bloklovchisi, tarmoq), pleer bilan gaplashib bo'lmaydi va
   knopka HECH QACHON ochilmasdi — ya'ni odam knopkasiz qolardi. Shuning
   uchun 8 soniyadan keyin ham pleer ulanmasa, sanoq varaq OCHIQ va
   ko'rinib turgan vaqt bo'yicha yuradi. U aniqroq emas, lekin knopkasiz
   qolishdan yaxshiroq. */

interface YtPlayer {
  getCurrentTime(): number;
}

interface YtPlayerCtor {
  new (
    frameId: string,
    options: { events: { onReady: () => void } },
  ): YtPlayer;
}

declare global {
  interface Window {
    YT?: { Player?: YtPlayerCtor };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Yig'ilgan ko'rish vaqti (soniya). */
const KEY = "janob.dars.korilgan";

/** Pleer ulanmasa shu vaqtdan keyin zaxira yo'lga o'tiladi (ms). */
const FALLBACK_AFTER = 8000;

let api: Promise<void> | null = null;

/**
 * YouTube boshqaruv skriptini bir marta yuklaydi.
 *
 * Skript tayyor bo'lganini FAQAT global `onYouTubeIframeAPIReady` orqali
 * aytadi — boshqa yo'li yo'q. Shuning uchun avvalgi qiymati saqlanib,
 * ustidan chaqiriladi: kelajakda sahifada boshqa YouTube kodi paydo
 * bo'lsa, u indamay o'chib qolmasin.
 */
function loadApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!api) {
    api = new Promise<void>((resolve) => {
      const before = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        before?.();
        resolve();
      };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    });
  }
  return api;
}

/* Ramka uchun BITTA pleer. React ishlab chiqish rejimida effektni ikki
   marta ishga tushiradi va usiz bitta `iframe` ga ikkita boshqaruv
   ulanardi. Saqlanadigani va'da (`Promise`), pleerning o'zi emas:
   ikkinchi chaqiruv birinchisi tayyor bo'lishini kutadi. */
const players = new Map<string, Promise<YtPlayer>>();

function attach(frameId: string): Promise<YtPlayer> {
  const known = players.get(frameId);
  if (known) return known;

  const created = loadApi().then(
    () =>
      new Promise<YtPlayer>((resolve, reject) => {
        const Player = window.YT?.Player;
        if (!Player) {
          reject(new Error("YouTube boshqaruvi topilmadi"));
          return;
        }
        /* Pleer O'ZI tayyor bo'lganda javob beradi: undan oldin
           `getCurrentTime()` so'ralsa, javob bo'lmaydi. */
        const player = new Player(frameId, {
          events: { onReady: () => resolve(player) },
        });
      }),
  );

  players.set(frameId, created);
  return created;
}

function readWatched(): number {
  try {
    const saved = Number(localStorage.getItem(KEY));
    return Number.isFinite(saved) && saved > 0 ? saved : 0;
  } catch {
    /* Saqlash yopiq — sanoq shu ochilishning o'zida yuradi. */
    return 0;
  }
}

/**
 * Hisobni yozadi — LEKIN HECH QACHON KAMAYTIRMAYDI.
 *
 * Sahifa ikkita varaqda ochiq bo'lishi mumkin. Har bir varaq o'z
 * hisobini yuritadi va yopilayotganda uni yozadi; oddiy yozuvda kechroq
 * yopilgan, lekin kamroq ko'rilgan varaq ikkinchisining hisobini
 * o'chirib yuborardi (o'lchandi: ochilgan-yopilgan varaq 2100 ni 0 ga
 * tushirdi). Shuning uchun yozishdan oldin saqlangani bilan taqqoslanadi
 * va kattasi qoladi.
 */
function saveWatched(seconds: number) {
  const next = Math.max(Math.round(seconds), readWatched());
  try {
    localStorage.setItem(KEY, String(next));
  } catch {
    /* Saqlash yopiq — yozadigan joy yo'q, sanoq baribir davom etadi. */
  }
}

interface Props {
  /** `LessonVideo` ga berilgan ramka nomi. */
  frameId: string;
  /** Knopka ochilishi uchun ko'rilishi kerak bo'lgan daqiqa. */
  minutes: number;
  /** Knopka yopiq turganda uning o'rnidagi satr. */
  hint: string;
  /** Ochilganda ko'rinadigan knopka. */
  children: ReactNode;
}

export function WatchGate({ frameId, minutes, hint, children }: Props) {
  /* Birinchi render HAR DOIM yopiq holat — server ham shuni chizadi.
     Yig'ilgan vaqt faqat brauzerda ma'lum, ya'ni ochiq holatdan
     boshlansa gidratatsiyada ikki xil razmetka to'qnashardi. */
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const need = minutes * 60;
    let watched = readWatched();

    /* ALLAQACHON YETARLI KO'RILGAN — knopka darrov ochiladi.

       Holat MIKROVAZIFADA beriladi, effektning tanasida emas: React
       tanadagi to'g'ridan-to'g'ri `setState` ni kaskadli render deb
       belgilaydi (`react-hooks/set-state-in-effect`), mikrovazifa esa
       brauzer sahifani CHIZISHDAN OLDIN ishlaydi — ya'ni qaytib kelgan
       o'quvchiga yopiq holat bir lahzaga ham ko'rinib qolmaydi. */
    if (watched >= need) {
      queueMicrotask(() => setOpen(true));
      return;
    }

    /* Pleer OBYEKT ichida saqlanadi, oddiy o'zgaruvchida emas: unga
       qiymat keyinroq, boshqa funksiya ichida beriladi. */
    const held: { player: YtPlayer | null } = { player: null };
    let mark = 0;
    let stored = watched;
    const from = Date.now();

    attach(frameId)
      .then((player) => {
        held.player = player;
        mark = player.getCurrentTime();
      })
      .catch(() => {
        /* Boshqaruv ulanmadi — quyidagi zaxira yo'l o'zi ishlaydi. */
      });

    const add = (seconds: number) => {
      watched += seconds;
      if (watched >= need) {
        setOpen(true);
        saveWatched(watched);
        clearInterval(tick);
        return;
      }
      /* Har soniyada emas, har 5 soniyada yoziladi: bu qator soatiga
         bir marta emas, minglab marta takrorlanadi. */
      if (watched - stored >= 5) {
        saveWatched(watched);
        stored = watched;
      }
    };

    const tick = window.setInterval(() => {
      const player = held.player;
      if (player) {
        const at = player.getCurrentTime();
        const step = at - mark;
        mark = at;
        if (step > 0 && step <= 4) add(step);
        return;
      }
      if (
        Date.now() - from > FALLBACK_AFTER &&
        document.visibilityState === "visible"
      ) {
        add(1);
      }
    }, 1000);

    /* Varaq yopilishi — yig'ilgan vaqtni yo'qotmaslikning oxirgi payti.
       `pagehide` telefonda ham ishlaydi, `beforeunload` esa yo'q. */
    const keep = () => saveWatched(watched);
    window.addEventListener("pagehide", keep);

    return () => {
      clearInterval(tick);
      window.removeEventListener("pagehide", keep);
      saveWatched(watched);
    };
  }, [frameId, minutes]);

  /* O'ram HAR DOIM turadi va balandligi knopkanikiga teng
     (`globals.css`): knopka ochilganda video sakrab yuqoriga ketmaydi.
     `aria-live` — ekran o'quvchi knopkaning paydo bo'lganini aytadi,
     aks holda o'zgarish faqat ko'z bilan ko'rinardi. */
  return (
    <div className="chal-gate" aria-live="polite">
      {open ? children : <p className="chal-locked t-micro">{hint}</p>}
    </div>
  );
}
