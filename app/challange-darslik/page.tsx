import { DarslikPage, darslikMetadata } from "@/components/DarslikPage";

/* PULLIK TRAFIK OQIMI — Meta Ads reklamasidan kelganlar.

   Sahifaning o'zi `components/DarslikPage.tsx` da: u `/bepul-darslik`
   bilan aynan bir xil va nusxa qilinmasligi kerak (sabab o'sha faylda).
   Bu yerda faqat SHU marshrutga tegishli ikki narsa qoladi — kanonik
   manzil va botning boshlanish parametri.

   `?start=challange` — bot obunachini shu so'z bo'yicha reklama
   oqimiga yozadi. Reklama byudjetining hisobi shunga tayanadi, ya'ni
   uni o'zgartirish sanoqni buzadi.

   META PIKSELI BU YERDA EMAS, `app/layout.tsx` da — bir kun shu
   sahifada turgan edi va ko'chirildi (sababi o'sha faylda). Uni bu
   yerga qaytarish kerak emas: ildiz maketdagisi bu sahifaga ham
   tushadi, ikkinchi nusxa esa har bir ochilishni ikki marta
   sanardi. */

/* YOZILISHI MUALLIFNIKI: `challange` (`challenge` emas) — marshrutda
   ham, parametrda ham. Ikkalasi ham bot va reklama kabinetida
   allaqachon shu ko'rinishda; "to'g'rilash" ikki tomonni bir vaqtda
   o'zgartirishni talab qiladi va u ish bu yerdan boshlanmaydi. */

export const metadata = darslikMetadata("/challange-darslik");

export default function ChallangeDarslikPage() {
  return (
    <DarslikPage botUrl="https://t.me/janob_dasturchi_bot?start=challange" />
  );
}
