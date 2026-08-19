"use client";

import { useEffect, useState } from "react";
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
  /* BARMOQLI QURILMADA UMUMAN ISHGA TUSHMAYDI (muallif shikoyati: "juda
     qotayabdi, silliq scroll bo'lmayabdi", 2026-08-19).

     YO'QOTILADIGAN NARSA YO'Q va buni ochiq aytish kerak: quyidagi
     `syncTouch: false` allaqachon "barmoqqa tegilmaydi" degani, ya'ni
     telefonda skrollni boshidan beri brauzerning O'ZI qilib kelgan.
     Lenis esa shunga qaramay har kadrda uyg'onib, o'z nishoniga qarab
     sahifani surishga urinardi — foydasi bo'lmagan, narxi esa bor ish.

     Buning ustiga u barmoq inersiyasi bilan BIR VAQTDA ishlaydi: brauzer
     sahifani o'z qonuni bilan suradi, Lenis esa o'z hisobini yozadi.
     Aynan shu ikkilanish "silliq emas" bo'lib his qilinadi.

     `(pointer: coarse)` — sichqoncha yo'q, barmoq bor degani. Tekshiruv
     O'RNASHUVDAN KEYIN qilinadi: server qaysi qurilma ekanini bilmaydi,
     shuning uchun birinchi chizmada Lenis baribir yo'q — u har doim
     o'rnashuvdan keyin ishga tushadi. */
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setSmooth(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!smooth) return null;

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
