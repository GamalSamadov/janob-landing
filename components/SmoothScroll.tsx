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
  /* BITTA HOLAT, uchta qiymat — va bu ataylab ikkita `useState` emas.
     `smooth` va `off` alohida turganda effekt ichida ikkita `setState`
     chaqiruvi paydo bo'lardi; bittasi esa avvalgidek `apply()` orqali
     bir joydan yoziladi. */
  const [mode, setMode] = useState<"pending" | "lenis" | "native" | "off">(
    "pending",
  );

  useEffect(() => {
    /* VAQTINCHALIK O'CHIRGICH — `?lenis=0` (2026-08-25).

       NIMA UCHUN KERAK: qolgan qotishning sababi Lenis mi degan savolga
       faqat O'LCHOV javob bera oladi, o'lchovni esa faqat muallif qila
       oladi — sahifa qanchalik silliq ekanini HIS QILISH kerak. Bu ish
       qilinayotgan muhitda brauzer oynasi doim fonda turadi, ya'ni
       `requestAnimationFrame` bo'g'ilgan va FPS umuman o'lchanmaydi.

       GUMON ANIQ: Lenis har kadrda sahifani KASR piksel qiymatiga
       suradi. Butun sonli siljishda brauzer allaqachon chizilgan
       plitkalarni shunchaki surib qo'yadi; kasr sonda esa matn va
       qirralar piksel oralig'iga tushib, plitkalar QAYTA rastrlanadi.
       Bu sahifada rastrlash qimmat (qotgan varaqlar, aralashtirish va
       xiralik yuzalari), ya'ni farq katta bo'lishi mumkin.

       QANDAY ISHLATILADI: `https://janob.io/?lenis=0` va oddiy manzilni
       yonma-yon solishtiring. Burchakdagi yorliq qaysi holatda
       ekaningizni aytib turadi.

       BU JAVOB OLINGACH O'CHIRILADI — parametrsiz kelgan hech kimga
       ta'sir qilmaydi, lekin baribir tashxis uchun qo'yilgan ilgak. */
    const disabled =
      new URLSearchParams(window.location.search).get("lenis") === "0";

    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () =>
      setMode(disabled ? "off" : mq.matches ? "native" : "lenis");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Yorliq FAQAT parametr berilganda chiqadi — oddiy tashrifchi uni hech
     qachon ko'rmaydi. Ataylab eng arzon ko'rinish: na soya, na xiralik,
     na aralashtirish — aks holda o'lchanayotgan narsaga o'zi qo'shilib
     ketardi. */
  const badge =
    mode === "off" ? (
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 8,
          left: 8,
          zIndex: 2147483647,
          pointerEvents: "none",
          background: "#1c1610",
          color: "#fbf7f1",
          font: "600 11px/1 ui-monospace, monospace",
          padding: "6px 8px",
          borderRadius: 6,
        }}
      >
        LENIS: OFF
      </div>
    ) : null;

  if (mode !== "lenis") return badge;

  return (
    <>
      {badge}
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
    </>
  );
}
