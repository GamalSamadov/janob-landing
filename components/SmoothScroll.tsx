"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Silliq skroll — Lenis (muallif tanlovi, 2026-08-16).
 *
 * MUHIMI: Lenis soxta konteyner yasamaydi, sahifani HAQIQATDAN suradi
 * (`wrapper.scrollTo({ behavior: "instant" })` har kadrda). Shu sababli
 * `position: fixed` nav, `.reveal` ning `animation-timeline: view()` i va
 * nav kapsulasining `--nav-p` i avvalgidek ishlashda davom etadi — ular
 * hammasi haqiqiy skroll holatiga bog'langan.
 *
 * `root`: instansiya global registrga yoziladi va uni daraxtning istalgan
 * joyidan `useLenis()` bilan olish mumkin. Shuning uchun bu komponent
 * hech narsani o'ramaydi — u sahifada oddiy qo'shni bo'lib turadi va
 * `Nav` undan bandni yopish uchun foydalanadi.
 */
export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        /* Nishonga har kadrda masofaning 10% i — Lenis ning o'z sukut
           qiymati. Pastroq: og'irroq va uzunroq; balandroq: quruqroq. */
        lerp: 0.1,

        /* Barmoqqa TEGILMAYDI: telefonda tizimning o'z inersiyasi to'g'ri
           ishlaydi va uni JS bilan takrorlash har doim yomonroq chiqadi.
           Auditoriyaning katta qismi telefonda (PRODUCT.md, 5-tamoyil). */
        syncTouch: false,

        /* Anker havolalar (`#paketlar`, `#dastur`, `#top`) ham Lenis
           qo'lida — bitta sahifada ikki xil silliq skroll bo'lmasligi
           uchun. */
        anchors: true,

        /* ATAYLAB `false` (muallif qarori, 2026-08-16).

           Sukut bo'yicha Lenis `prefers-reduced-motion` ni hurmat qiladi
           va bu ikki narsani anglatadi: silliqlash o'chadi HAMDA dasturiy
           skrollar bir zumda bajariladi (manbada: `if
           (this.prefersReducedMotion) if (programmatic) immediate = true`).
           Ya'ni tizimida "Reduce motion" yoqiq foydalanuvchi — muallifning
           o'zi ham — na silliq skrollni, na nav bandining yumshoq
           yopilishini ko'rardi: sahifa sakrab tushardi. Aynan shu xato
           qidirilgan edi.

           Muroso: sahifadagi O'Z-O'ZIDAN o'ynaydigan animatsiyalar
           (`globals.css` dagi olov nafasi, kontentning chiqishi) avvalgidek
           to'xtab turadi — ular foydalanuvchi so'ramagan harakat. Bu
           yerdagi harakat esa uning O'Z skrolli: u boshlaydi, u
           to'xtatadi. */
        respectReducedMotion: false,
      }}
    />
  );
}
