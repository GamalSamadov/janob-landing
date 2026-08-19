import { isAuthed } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { Liquid } from "@/components/Liquid";
import { Login } from "./Login";
import { AdminForm } from "./AdminForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Boshqaruv paneli",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Shisha panellar ortida ham yorug'lik maydoni bo'lishi shart — aks holda
  // boshqaruv paneli qora fonda ramkaga aylanib qoladi.
  if (!(await isAuthed()))
    return (
      <>
        <Liquid />
        <Login />
      </>
    );

  const content = await getContent();
  return (
    <>
      <Liquid />
      <AdminForm initial={content} />
    </>
  );
}
