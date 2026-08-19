"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1500;

/**
 * Raqam noldan o'z qiymatigacha sanaladi — bo'lim EKRANGA KIRGANDA
 * (muallif talabi, 2026-08-17).
 *
 * SERVER RAQAMNING O'ZINI CHIZADI, nolni emas, va bu ataylab: sahifa
 * manbasida "+120" turadi, ya'ni qidiruv tizimi ham, JS o'chirilgan brauzer
 * ham to'g'ri sonni ko'radi. Nol faqat MIJOZDA, o'rnashuvdan keyin qo'yiladi.
 *
 * Nol qo'yilishi ko'zga tashlanmaydi, chunki bo'lim sahifaning O'RTASIDA:
 * o'rnashuv paytida u ekrandan tashqarida bo'ladi va sanoq boshlanguncha
 * uni hech kim ko'rmaydi. Ekranga kirgan holatda ochilsa (`#natijalar`
 * havolasi) kuzatuvchi darhol ishga tushadi — ya'ni raqam o'sha zahoti
 * sanala boshlaydi.
 *
 * "Reduce motion" bu yerda TEKSHIRILMAYDI. Muallifning o'z tizimida u
 * yoqilgan (qarang `globals.css` dagi istisnolar ro'yxati), animatsiya esa
 * aynan u so'ragan narsa. Qoidaning maqsadi — sahifa bo'ylab siljish va
 * parallaks; bu yerda esa hech narsa qimirlamaydi, faqat raqamning o'zi
 * o'zgaradi.
 */
export function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setN(0);

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        /* Oxiriga borib SEKINLASHADI. Chiziqli sanoq oxirgi raqamda
           devorga urilgandek to'xtaydi; kub so'nishi esa raqamni
           joyiga qo'yib qo'ygandek his qildiradi. */
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        // Bir marta sanaladi: qayta-qayta skroll qilinganda raqam
        // nolga tushib turmaydi.
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{n}</span>;
}
