import { DarslikPage, darslikMetadata } from "@/components/DarslikPage";

/* BEPUL TRAFIK OQIMI — Reels dan kelganlar.

   Sahifaning o'zi `components/DarslikPage.tsx` da: u `/challange-darslik`
   bilan aynan bir xil va nusxa qilinmasligi kerak (sabab o'sha faylda).
   Bu yerda faqat SHU marshrutga tegishli ikki narsa qoladi — kanonik
   manzil va botning boshlanish parametri.

   `?start=kurs` — bot obunachini shu so'z bo'yicha bepul oqimga
   yozadi. Uni o'zgartirish botdagi sanoqni buzadi. */

export const metadata = darslikMetadata("/bepul-darslik");

export default function BepulDarslikPage() {
  return <DarslikPage botUrl="https://t.me/janob_dasturchi_bot?start=kurs" />;
}
