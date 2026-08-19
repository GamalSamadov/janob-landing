"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Element ekranda ko'rinib turibdimi?
 *
 * NIMA UCHUN KERAK (o'lchov asosida, 2026-08-19): sahifaning eng tepasida
 * turganda ham 16 ta animatsiya ishlab turardi va ularning 11 tasi
 * EKRANDAN TASHQARIDA edi — eng yirigi natijalar lentasi, 1.15 megapiksel
 * lik qatlam. Ya'ni brauzer hech kim ko'rmayotgan narsani soatlab
 * kompozitsiya qilardi; muallif kompyuterining qizishi shundan.
 *
 * BOSHLANG'ICH QIYMAT `true` va bu ataylab: kuzatuvchi birinchi javobini
 * bergunicha animatsiya ishlab tursin. Aks holda ekranda turgan lenta
 * bir zumga qotib, keyin yurib ketardi — bu tuzatishdan ko'ra ko'proq
 * ko'zga tashlanadi.
 *
 * `rootMargin` — ekranga kirishidan bir oz OLDIN uyg'onadi, ya'ni
 * o'quvchi lentaga yetib kelganda u allaqachon yurib turgan bo'ladi.
 */
export function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
