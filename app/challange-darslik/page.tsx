import Script from "next/script";
import { DarslikPage, darslikMetadata } from "@/components/DarslikPage";

/* PULLIK TRAFIK OQIMI — Meta Ads reklamasidan kelganlar.

   Sahifaning o'zi `components/DarslikPage.tsx` da: u `/bepul-darslik`
   bilan aynan bir xil va nusxa qilinmasligi kerak (sabab o'sha faylda).
   Bu yerda faqat SHU marshrutga tegishli narsalar qoladi — kanonik
   manzil, botning boshlanish parametri va Meta pikseli.

   `?start=challange` — bot obunachini shu so'z bo'yicha reklama
   oqimiga yozadi. Reklama byudjetining hisobi shunga tayanadi, ya'ni
   uni o'zgartirish sanoqni buzadi.

   YOZILISHI MUALLIFNIKI: `challange` (`challenge` emas) — marshrutda
   ham, parametrda ham. Ikkalasi ham bot va reklama kabinetida
   allaqachon shu ko'rinishda; "to'g'rilash" ikki tomonni bir vaqtda
   o'zgartirishni talab qiladi va u ish bu yerdan boshlanmaydi. */

export const metadata = darslikMetadata("/challange-darslik");

/* META PIKSELI — reklama kabinetidan olingan kod (muallif, 2026-09-07).

   FAQAT SHU SAHIFADA va bu butun ikki marshrutli tuzilmaning maqsadi:
   `/bepul-darslik` ga Reels dan bepul trafik keladi, bu yerga esa
   pullik reklama. Piksel ildiz maketga qo'yilsa, ikkala oqim bitta
   sanoqqa qo'shilib ketardi va reklamaning o'z natijasini ajratib
   bo'lmasdi. `layout.tsx` dagi domen tasdig'i esa aksincha — u
   saytniki, ya'ni hamma sahifada turadi.

   `IDENTIFIKATOR IKKI JOYDA` kelgani uchun u alohida o'zgaruvchida:
   skriptda va JavaScriptsiz brauzer uchun qo'yilgan rasmda. Ular bir
   xil bo'lishi shart, aks holda hodisalarning bir qismi begona
   hisobga tushardi.

   `strategy` BERILMAGAN, ya'ni sukut bo'yicha `afterInteractive`
   (`node_modules/next/dist/docs` → components/script.md). Meta uchun
   aynan shu tavsiya etiladi: `PageView` sahifa ochilishi bilanoq
   yuboriladi, lekin skript sahifaning chizilishini kutib turmaydi.
   `beforeInteractive` bu yerda ortiqcha — piksel sahifa ishlashi uchun
   kerak emas, u faqat sanaydi.

   `id` MAJBURIY: hujjatning o'z ogohlantirishi — "An `id` property must
   be assigned for inline scripts in order for Next.js to track and
   optimize the script". U bir vaqtning o'zida ikki marta ishga
   tushishdan ham saqlaydi (piksel ikki marta yuklansa, har bir
   ochilish ikkita `PageView` bo'lib sanalardi).

   `dangerouslySetInnerHTML` bu yerda YAGONA yo'l va u xavfsiz: matn
   o'zgarmas satr, unga foydalanuvchi kiritgan hech narsa qo'shilmaydi.
   React esa bola sifatida berilgan matnni HTML uchun ekranlab qo'yardi
   va skript buzilardi. */
const PIXEL_ID = "2155323465015470";

const PIXEL_SRC = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`;

/* JAVASCRIPTSIZ BRAUZER UCHUN — Meta bergan kodning ikkinchi qismi.
   Skript ishlamaganda ochilish shu 1x1 rasm orqali sanaladi.

   AMALDA U DEYARLI HECH QACHON ISHLAMAYDI va buni bilib qo'ygan
   ma'qul: sahifaning o'zagi YouTube `iframe` i, ya'ni JavaScriptsiz
   brauzerda ko'radigan narsa qolmaydi. Kod baribir qoldirildi —
   muallif bergan kod to'liq o'rnatilsin, keyinchalik kabinetdagi
   ko'rsatkich bilan taqqoslaganda "nimadir tushib qolgandir" degan
   savol tug'ilmasin. */
const PIXEL_NOSCRIPT = `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1"/>`;

export default function ChallangeDarslikPage() {
  return (
    <>
      <DarslikPage botUrl="https://t.me/janob_dasturchi_bot?start=challange" />

      <Script id="meta-pixel" dangerouslySetInnerHTML={{ __html: PIXEL_SRC }} />
      <noscript dangerouslySetInnerHTML={{ __html: PIXEL_NOSCRIPT }} />
    </>
  );
}
