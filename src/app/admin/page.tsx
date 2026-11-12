import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@backend/lib/session";
import AdminLogin from "./AdminLogin";
import s from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) redirect("/admin/dashboard");
  return <main className={s.adminPage}><AdminLogin /></main>;
}
