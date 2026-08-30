import type { Metadata } from "next";
import Script from "next/script";
import { getContent } from "@/lib/content";
import { SocialMini } from "@/components/SocialMini";

/* Ijtimoiy tarmoq havolalari boshqaruv panelidan o'zgartiriladi,
   shuning uchun sahifa har so'rovda qayta hisoblanadi — asosiy
   sahifadagi qoidaning aynan o'zi.

   Sahifa bir muddat STATIK bo'lib turgan edi (knopka olib tashlangach
   o'zgaruvchi ma'lumot qolmagandi); obuna qatori qo'shilishi bilan u
   yana dinamikga qaytdi. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videoni ko'ring",
  description:
    "Qisqa video — ko'rib chiqing, keyingi qadam videoning o'zida.",

  /* QIDIRUVGA TUSHMAYDI va bu ataylab. Bu sahifa ochiq katalog uchun
     emas — havolasi qo'lda yuboriladi. Indekslansa, u qidiruv
     natijalarida asosiy sahifa bilan bir joyni talashib qolardi va
     kimdir bu yerga videoning kontekstisiz kelib tushardi.

     QAYTARISH oson: shu blokni olib tashlash kifoya — `layout.tsx` dagi
     umumiy qoida (`index: true`) o'z-o'zidan kuchga kiradi. */
  robots: { index: false, follow: false },

  /* Sayt xaritasiga ham qo'shilmagan (`app/sitemap.ts`) — ikkalasi bitta
     qarorning ikki tomoni. */
  alternates: { canonical: "/challange" },
};

/* VIDALYTICS — sotuvchi bergan kod, qo'l tegmagan.

   Ikki qismdan iborat: ID si oldindan ma'lum bo'sh `div` va uni
   to'ldiradigan skript. Skript o'sha `div` ni `document` dan ID bo'yicha
   qidiradi, ya'ni u DOM da allaqachon turgan bo'lishi shart.

   `strategy` BERILMAGAN, ya'ni sukut bo'yicha `afterInteractive`
   (`node_modules/next/dist/docs` → components/script.md). Aynan shu
   kerak: kod gidratatsiyadan KEYIN ishga tushadi, demak `div` joyida
   bo'ladi. `beforeInteractive` bu yerda buzardi — u sahifa chizilishidan
   oldin ishlaydi va skript qidirgan `div` ni topmasdi.

   `id` MAJBURIY: hujjatning o'z ogohlantirishi — "An `id` property must
   be assigned for inline scripts in order for Next.js to track and
   optimize the script". U bir vaqtning o'zida ikki marta ishga
   tushishdan ham saqlaydi.

   `dangerouslySetInnerHTML` bu yerda YAGONA yo'l va u xavfsiz: matn
   o'zgarmas satr, unga foydalanuvchi kiritgan hech narsa qo'shilmaydi.
   React esa bola sifatida berilgan matnni HTML uchun ekranlab qo'yardi
   va skript buzilardi (aynan shu sabab `page.tsx` dagi JSON-LD da ham
   yozilgan). */
const VID_ID = "vidalytics_embed__iTkeRZNw0jSwdf7";
const VID_SRC =
  "(function (v, i, d, a, l, y, t, c, s) {\n" +
  "    y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';\n" +
  "    if (!vsl){vsl=function(u,cb){\n" +
  "        if(t){cb();return;}s=i.createElement(\"script\");s.type=\"text/javascript\";s.async=1;s.src=u;\n" +
  "        if(s.readyState){s.onreadystatechange=function(){if(s.readyState===\"loaded\"||s.readyState==\"complete\"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}\n" +
  "        i.getElementsByTagName(\"head\")[0].appendChild(s);\n" +
  "    };}\n" +
  "    vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});\n" +
  "})(window, document, 'Vidalytics', '" +
  VID_ID +
  "', 'https://fast.vidalytics.com/embeds/3rkrl5_r/_iTkeRZNw0jSwdf7/');";

export default async function ChallangePage() {
  const content = await getContent();

  return (
    <main className="chal">
      {/* HERO NING O'Z FONI, o'zgartirilmagan holda (muallif talabi:
          "huddi hozirgi saytning hero sectioni kabi dezaynda").

          To'rttala qatlam ham `Hero.tsx` dagi bilan bir xil va bir
          tartibda: yer + tepa-o'ngdan sovuq nur, pastdan ko'tarilgan
          olov, o'lchov to'ri va don. Ular `.hero` ga emas, `absolute`
          joylashuvga tayanadi — shuning uchun `.chal` ham `relative`
          (`globals.css`). */}
      <div aria-hidden className="hero-backdrop">
        <span className="hero-sky" />
        <span className="hero-ember" />
        <span className="hero-grid" />
        <span className="hero-grain" />
      </div>

      <div className="shell chal-shell">
        {/* Olovli qism MAVZUNI aytadi, quyuq qism NIMA QILISHNI — hero
            dagi bilan bir xil bo'linish. */}
        <h1 className="t-hero chal-title">
          <span className="t-flame">Videoni</span> pasda ko&apos;rishingiz
          mumkin
        </h1>

        <p className="t-lead chal-sub">
          Foydali bo&apos;ladi degan umiddaman :)
        </p>

        {/* O'lchovni O'RAM belgilaydi, sotuvchining `div` i emas: u
            `width: 100%` va `padding-top: 56.25%` bilan keladi, ya'ni
            o'ramning enidan 16:9 balandlik yasaydi. O'ram esa enini
            EKRAN BALANDLIGIDAN oladi (`globals.css`) — shu tufayli video
            hech qachon knopkani ekrandan itarib yubormaydi. */}
        <div className="chal-video">
          <div
            id={VID_ID}
            style={{ width: "100%", position: "relative", paddingTop: "56.25%" }}
          />
        </div>

        {/* VIDEODAN KEYIN IKKITA NARSA BOR EDI, IKKALASI HAM KETDI
            (muallif talabi, 2026-08-30).

            Birinchisi — KNOPKA ("pasdagi knopka kerak emas ekan").
            Sababi player ning o'zida: Vidalytics kerakli daqiqada
            videoning tagida O'Z knopkasini chiqaradi. Ya'ni sahifada
            ikkita harakat bo'lib qolgan va ikkalasi bir xil ishni
            qilardi — o'quvchi qaysi birini bosishni o'ylab qolardi.

            Ikkinchisi — IZOH MATNI ("kel shu text o'zi kerak emas").
            U "videoni to'liq ko'rib chiqing va PASDAGI knopkani bosing"
            deb turardi. Knopka ketgach ko'rsatkich noto'g'ri tomonga
            ishora qila boshlagan edi: player knopkasi videoning tagida,
            ya'ni o'sha matndan YUQORIDA chiqadi.

            Qolgani — sokin ilinma. U ataylab knopka EMAS: sahifadagi
            yagona harakat player ning ichida va diqqat o'sha yerda
            qolishi kerak. */}
        <p className="chal-follow">Menga obuna bo&apos;ling</p>

        {/* OBUNA QATORI (muallif talabi, 2026-08-30): Telegram kanali,
            Instagram va YouTube.

            Hero dagi AYNI komponent, faqat `row` ko'rinishida: u yerda
            qator suratning burchagiga yopishtirilgan va belgilari 15px,
            bu yerda esa u oqimning ichida, markazda va 22px. Farqning
            sababi vazifada — hero da bu suratning qo'shimchasi, bu yerda
            esa sahifadagi YAGONA havola.

            Uchalasi ham bo'sh bo'lsa qator umuman chizilmaydi va bu
            komponentning o'z qoidasi: hech qayerga olib bormaydigan
            belgi bezakdan ham yomon. */}
        <SocialMini
          variant="row"
          telegramChannelUrl={content.telegramChannelUrl}
          instagramUrl={content.instagramUrl}
          youtubeUrl={content.youtubeUrl}
        />
      </div>

      <Script id={VID_ID + "__loader"} dangerouslySetInnerHTML={{ __html: VID_SRC }} />
    </main>
  );
}
