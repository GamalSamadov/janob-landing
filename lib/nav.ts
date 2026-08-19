/**
 * Nav kapsulasi shu masofada (px) to'liq yig'iladi.
 *
 * Band sahifaning ENG TEPASIDA: [0, NAV_COLLAPSE]. Nav sahifa qimirlashi
 * bilan yig'ila boshlaydi va shu masofada tugaydi.
 *
 * Oraliqda band boshqa joylarga ko'chirilgan edi (qora qatlam headerga
 * tekkan nuqtaga, keyin undan NAV_COLLAPSE oldin), lekin muallif talabi
 * bilan eski holatga qaytarildi (2026-08-16): o'zgarish juda kech
 * sezilardi va sarlavha shaffof nav ostidan uzoq vaqt o'tib turardi.
 *
 * Avval shu faylda `navSettle` ham bor edi: skroll band ichida to'xtasa,
 * sahifani bandning bir chetiga olib borardi. U o'chirildi — o'quvchi
 * matn o'qib turganda sahifaning o'z-o'zidan surilishi xalaqit berardi.
 */
export const NAV_COLLAPSE = 120;
