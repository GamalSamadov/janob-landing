import { getContent, resolvePricing, resolvePortrait } from "@/lib/content";
import { courseJsonLd, faqJsonLd } from "@/lib/seo";
import { Liquid } from "@/components/Liquid";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Path } from "@/components/sections/Path";
import { Curriculum } from "@/components/sections/Curriculum";
import { Proof } from "@/components/sections/Proof";
import { Packages } from "@/components/sections/Packages";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

// Narx bosqichi vaqtga bog'liq — sahifa har so'rovda qayta hisoblanadi.
export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getContent();
  const pricing = resolvePricing(content);
  // Bir joyda hal qilinadi — hero va "Men haqimda" bir xil suratni ko'rsatadi.
  const portrait = await resolvePortrait(content);

  const hasProof =
    content.stats.graduates.trim() !== "" ||
    content.proof.shots.length > 0 ||
    content.proof.testimonials.length > 0 ||
    content.proof.videos.length > 0;

  const jsonLd = [courseJsonLd(content, pricing), faqJsonLd(content)].filter(
    Boolean,
  );

  return (
    <>
      {/* TUZILMALI MA'LUMOT — qidiruv tizimlari uchun (2026-08-19).

          `dangerouslySetInnerHTML` bu yerda YAGONA yo'l va u xavfsiz:
          JSON-LD `<script>` ning ichida turishi kerak, React esa bola
          sifatida berilgan matnni HTML uchun ekranlab qo'yadi va JSON
          buzilardi. Matn `JSON.stringify` dan chiqadi, ya'ni foydalanuvchi
          kiritgan matn ham (savol-javob) to'g'ri qochiriladi; `<` belgisi
          esa alohida almashtiriladi — usiz kontentga yozilgan "</script>"
          teglarni erta yopib yuborishi mumkin edi. */}
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      {/* Faqat SHU sahifada. Boshqaruv panelida (`/admin`) forma maydonlari
          bor — u yerda g'ildirakni ushlab qolish faqat halaqit berardi. */}
      <SmoothScroll />
      <Liquid />
      <Nav showResults={hasProof} />

      <main id="top" className="relative flex-1" style={{ zIndex: 1 }}>
        <Hero
          pricing={pricing}
          photo={portrait}
          social={{
            telegramChannelUrl: content.telegramChannelUrl,
            instagramUrl: content.instagramUrl,
          }}
        />
        {/* HERO USTIDAN SURILADIGAN QATLAM (muallif talabi, 2026-08-16).

            Hero endi joyida QOTIB turadi (`position: sticky`), qolgan
            hamma narsa esa uning ustidan ko'tarilib o'tadi. Buning
            ishlashi uchun ikkita shart bor va ikkalasi ham shu o'ramda:

            1. Qatlam QUYUQ bo'lishi kerak. Hero ortida turgani uchun,
               ozgina shaffoflik ham uni ko'rsatib qo'yadi — bo'limlar
               orasidan hero suzib o'tayotgandek ko'rinardi.
            2. Bitta o'ram bo'lishi kerak. Har bir bo'limga alohida fon
               berilsa, ular orasidagi chokdan hero yiltirab turardi.

            Shu sababli bu yerda faqat `Pain` emas, undan keyingi hamma
            bo'lim turibdi: hero butun sahifa davomida ortda qoladi,
            demak uni butun sahifa davomida yopish kerak.

            O'ram ODDIY `div` (muallif talabi, 2026-08-16). Bir muddat bu
            yerda `Stack` turgan edi — har bir bo'limni `sticky` qilib,
            keyingisini oldingisining ustiga taxlaydigan mijoz komponenti
            ("taxlangan qog'oz"). U olib tashlandi: bo'limlar yana oddiy
            skroll bilan yuradi va o'ram faqat bitta ish qiladi — hero ni
            yopadi. */}
        <div className="over-hero">
          <Pain />
          {/* IKKINCHI POG'ONA (muallif talabi, 2026-08-17).

              Hero bilan bo'lgan ish aynan bir pog'ona pastda takrorlanadi:
              endi `Pain` ham joyida QOTADI va krem varaqdan boshlab qolgan
              hamma narsa uning ustiga surilib chiqadi.

              Shu sababli bu o'ram KERAK va u yuqoridagi bilan bir sababdan
              kerak: suriladigan narsa BITTA quyuq yuza bo'lishi shart. Har
              bo'lim alohida surilsa, ular orasidagi chokdan ortda qotib
              turgan `Pain` yiltirab turardi.

              Ichkaridagi tartib va bo'limlarning o'zaro qoidalari
              o'zgarmaydi: `Path` va `Curriculum` shu yerda ham qo'shni,
              ya'ni `.sheet-light + *` avvalgidek ishlaydi. */}
          <div className="over-pain">
            <Path />
            {/* UCHINCHI POG'ONA (muallif talabi, 2026-08-17): krem varaq ham
                qotadi, dastur bo'limidan boshlab qolgani uning ustiga
                chiqadi. Uyalash qoidasi bir xil — har pog'onada qotadigan
                bo'lim va undan keyingi BITTA o'ram. */}
            <div className="over-path">
              {/* `lessons` PROPI OLINDI: bo'lim endi dars sonini aytmaydi
                  (muallif talabi — bo'limda faqat sarlavha, qadamlar va
                  ro'yxat qoldi). Admin panelidagi maydonning o'zi joyida
                  turibdi va yo'qolmadi. */}
              <Curriculum />
              <Proof content={content} />
              {/* "MEN HAQIMDA" OLIB TASHLANDI (muallif talabi, 2026-08-17).

                  U bilan birga TO'RTINCHI POG'ONA ham ketdi: bo'lim qotib
                  turar, paketlar varag'i esa uning ustiga surilib chiqardi.
                  Qotadigan narsa qolmagach, o'sha o'ram (`.over-about`) ham
                  ma'nosini yo'qotdi — paketlar endi shu yerda, natijalardan
                  keyin, oddiy skroll bilan keladi.

                  Varaq ko'rinishi BUZILMAYDI va buni bilib qo'ygan ma'qul:
                  yumaloq tepa ham, varaq soyasi ham o'ramdan emas, bo'limning
                  o'z sinfidan (`.sheet-light`) keladi. */}
              <Packages content={content} pricing={pricing} />
              {/* SAVOLLAR PAKETLARDAN KEYIN (muallif talabi, 2026-08-17):
                  o'quvchi narxni ko'rgach, qaror oldidagi oxirgi
                  to'siqlari shu yerda yechiladi.

                  Yumaloq tepa va varaq soyasi ALOHIDA yozilmaydi — bo'lim
                  `.sheet-light` (paketlar) dan keyin turgani uchun ularni
                  `.sheet-light + *` qoidasidan oladi. Ya'ni quyuq bo'lim
                  oq varaqning ustiga surilgandek o'qiladi, xuddi krem
                  varaqdan keyingi qatlam kabi. */}
              <Faq content={content} />
            </div>
          </div>
        </div>
      </main>

      <Footer content={content} />
    </>
  );
}
