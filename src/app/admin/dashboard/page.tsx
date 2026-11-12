import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@backend/lib/session";
import AdminDashboard from "../AdminDashboard";
import s from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) redirect("/admin");
  return <main className={s.dashboardPage}><AdminDashboard /></main>;
}
