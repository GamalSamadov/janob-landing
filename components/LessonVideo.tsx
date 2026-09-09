/* DARS VIDEOSI — ikkala oqim uchun BITTA razmetka.

   `iframe` ilgari `DarslikPage` ning ichida turardi. U shu yerga ko'chdi,
   chunki reklama oqimida (`/challange-darslik`) ramkaning ikkita farqi
   bor: manzilga `enablejsapi=1` qo'shiladi va ramkaga nom (`id`)
   beriladi — usiz `WatchGate` pleer bilan gaplasha olmaydi.

   RAZMETKANING O'ZI ESA IKKALA OQIMDA HAM BIR XIL BO'LISHI SHART:
   o'lchov, ramka va yumaloq burchak `globals.css` dagi `.chal-video`
   qo'lida va u sahifaning balandlik byudjetiga bog'langan (o'sha faylda
   batafsil). Ikki nusxa qilinsa, byudjet bir kuni bitta oqimda
   yangilanib, ikkinchisida qolib ketardi. */

interface Props {
  /** To'liq manzil — oqimga qarab `enablejsapi` bilan yoki usiz. */
  src: string;
  /** Pleer bilan gaplashish uchun ramkaning nomi. Bepul oqimda kerak emas. */
  frameId?: string;
}

export function LessonVideo({ src, frameId }: Props) {
  /* O'lchovni O'RAM belgilaydi, `iframe` emas: `iframe` o'ramni to'liq
     qoplaydi, o'ram esa enini EKRAN BALANDLIGIDAN oladi (`globals.css`) —
     shu tufayli video hech qachon knopkani ekrandan itarib yubormaydi.

     `title` MAJBURIY: `iframe` ning o'zi ekran o'quvchi uchun nomsiz
     ramka, ya'ni "nima bu?" degan savol javobsiz qolardi.

     `allow` dagi ro'yxat YouTube niki — undan faqat `autoplay` olib
     tashlangan: bu sahifada video o'z-o'zidan boshlanmaydi (tovush bilan
     boshlansa brauzer baribir to'xtatadi, ovozsiz boshlansa esa o'quvchi
     videoning boshini o'tkazib yuboradi). `allowFullScreen` esa 50
     daqiqalik dars uchun shart. */
  return (
    <div className="chal-video">
      <iframe
        id={frameId}
        src={src}
        title="AI bilan telegram bot yasab, birinchi $200 ni ishlash"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
