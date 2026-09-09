import Script from "next/script";
import { DarslikPage, darslikMetadata } from "@/components/DarslikPage";

/* PULLIK TRAFIK OQIMI — Meta Ads reklamasidan kelganlar.

   Sahifaning o'zi `components/DarslikPage.tsx` da: u `/bepul-darslik`
   bilan aynan bir xil va nusxa qilinmasligi kerak (sabab o'sha faylda).
   Bu yerda faqat SHU marshrutga tegishli narsalar qoladi.

   `?start=challange` — bot obunachini shu so'z bo'yicha reklama
   oqimiga yozadi. Reklama byudjetining hisobi shunga tayanadi, ya'ni
   uni o'zgartirish sanoqni buzadi.

   YOZILISHI MUALLIFNIKI: `challange` (`challenge` emas) — marshrutda
   ham, parametrda ham. Ikkalasi ham bot va reklama kabinetida
   allaqachon shu ko'rinishda; "to'g'rilash" ikki tomonni bir vaqtda
   o'zgartirishni talab qiladi va u ish bu yerdan boshlanmaydi. */

export const metadata = darslikMetadata("/challange-darslik");

/* REKLAMA OQIMINING O'Z HODISASI (muallif talabi, 2026-09-07).

   PIKSELNING O'ZI SAHIFADA EMAS, `app/layout.tsx` da — ya'ni butun
   saytda. Bu ataylab va uning sababi o'sha faylda. Lekin undan bitta
   noqulaylik kelib chiqdi: `PageView` endi `/bepul-darslik` da ham
   yuboriladi, u yerga esa Reels dan BEPUL trafik keladi. Muallifning
   talabi aniq — reklamaning sanog'iga bepul trafik qo'shilmasin.

   YECHIM — SANOQNI `PageView` DAN AJRATISH. `ViewContent` faqat shu
   sahifada yuboriladi, ya'ni unga bepul trafik jismonan tusha
   olmaydi: `/bepul-darslik` bu kodni umuman yuklamaydi. Reklama
   kabinetida optimizatsiya va hisobot `PageView` ga emas, shu
   hodisaga qo'yiladi.

   NEGA `ViewContent` VA NEGA O'Z NOMI EMAS: bu Meta ning tayyor
   ("standart") hodisasi va uni reklama to'plamining sozlamasida
   ro'yxatdan tanlab qo'yish kifoya. O'ylab topilgan nom ham ishlardi,
   lekin uning uchun kabinetda alohida "custom conversion" yasash
   kerak bo'lardi — targetolog uchun ortiqcha qadam.

   NEGA `Lead` EMAS: `Lead` — ariza qoldirgan odam. Sahifa ochilishini
   `Lead` deb sanash kabinetdagi arizalar sonini yolg'on ko'rsatardi.
   Botga o'tish uchun `Lead` kelajakda knopkaning O'ZIGA qo'yilishi
   mumkin — u yerda u haqiqatan ham to'g'ri bo'ladi.

   `window.fbq &&` TEKSHIRUVI KERAK: piksel reklama bloklovchisi
   tomonidan to'xtatilgan bo'lsa, `fbq` umuman mavjud bo'lmaydi va
   bu qator konsolda xato berardi. Sahifa buzilmaydi, lekin xato
   keyingi tekshiruvlarda chalg'itadi.

   `strategy` BERILMAGAN, ya'ni `afterInteractive` — bu MUHIM: piksel
   `layout.tsx` da `beforeInteractive` bilan yuklanadi, ya'ni shu kod
   ishga tushganda `fbq` allaqachon tayyor. Teskari tartibda hodisa
   yo'qolardi. */
const VIEW_CONTENT = `window.fbq && fbq('track', 'ViewContent');`;

/* TAKLIF MUDDATI VA KNOPKANING OCHILISHI (muallif talabi, 2026-09-09).

   IKKALA SON HAM SHU YERDA, sahifaning ichida emas — ular MARSHRUTGA
   tegishli. `/bepul-darslik` da gate umuman yo'q va bo'lmasligi kerak:
   u yerga Reels dan bepul trafik keladi, ya'ni ushlab turishning narxi
   ham, sababi ham yo'q.

   12 SOAT — video ochiq turadigan muddat. Hisob har bir odamning O'ZI
   birinchi kirgan paytidan boshlanadi (umumiy sana emas) va tugagach
   taymer shunchaki yo'qoladi.

   4 DAQIQA — knopka ochilishi uchun ko'rilishi kerak bo'lgan vaqt
   (muallif talabi, 2026-09-09; ilgari 34 daqiqa edi). Sanoq video
   HAQIQATAN o'ynagan daqiqalarni oladi — oldinga surish yordam
   bermaydi.

   SONNI O'ZGARTIRISH shu ikki qatordan nariga o'tmaydi. Lekin sonni
   KO'TARISH allaqachon yig'ilgan hisoblarni ham qayta yopadi:
   brauzerda ko'rilgan vaqt saqlanadi, ochilish esa har safar shu son
   bilan solishtiriladi. Tushirilganda esa aksincha — kerakli vaqtni
   allaqachon yig'ganlarga knopka darrov ochiladi. */
export default function ChallangeDarslikPage() {
  return (
    <>
      <DarslikPage
        botUrl="https://t.me/janob_dasturchi_bot?start=challange"
        gate={{ offerHours: 12, watchMinutes: 4 }}
      />

      <Script
        id="meta-pixel-viewcontent"
        dangerouslySetInnerHTML={{ __html: VIEW_CONTENT }}
      />
    </>
  );
}
