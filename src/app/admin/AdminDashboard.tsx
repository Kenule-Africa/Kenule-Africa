"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpDown, ArrowUpRight, Search, ShieldCheck, X } from "lucide-react";
import s from "./admin.module.css";

type Subscriber = { id: string; email: string; event: string; created_at: string };
type Stats = { total: number; today: number; lastSevenDays: number; mostRecentAt: string | null; timezone: string };
type SubscriberResponse = {
  subscribers: Subscriber[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

const dateTime = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [records, setRecords] = useState<SubscriberResponse | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  const requireSession = useCallback(() => {
    window.location.assign("/admin");
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/stats", { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const body = await response.json().catch(() => null);
        if (response.status === 401) return requireSession();
        if (!response.ok) throw new Error(body?.error ?? "Dashboard statistics are unavailable.");
        setStats(body.stats as Stats);
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== "AbortError") setError(reason.message);
      });
    return () => controller.abort();
  }, [requireSession]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), pageSize: "25", sort });
    if (search) params.set("search", search);
    setLoading(true);
    setError("");
    fetch(`/api/admin/subscribers?${params.toString()}`, {
      credentials: "same-origin",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const body = await response.json().catch(() => null);
        if (response.status === 401) return requireSession();
        if (!response.ok) throw new Error(body?.error ?? "Subscribers could not be loaded.");
        setRecords(body as SubscriberResponse);
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== "AbortError") setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [page, search, sort, requireSession]);

  function applySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function exportCsv() {
    const params = new URLSearchParams({ sort });
    if (search) params.set("search", search);
    window.location.assign(`/api/admin/export?${params.toString()}`);
  }

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      window.location.assign("/admin");
    }
  }

  const totalPages = records?.pagination.totalPages ?? 0;
  const startItem = records && records.pagination.total > 0 ? (page - 1) * records.pagination.pageSize + 1 : 0;
  const endItem = records ? Math.min(page * records.pagination.pageSize, records.pagination.total) : 0;

  return (
    <div className={s.dashboardShell}>
      <header className={s.dashboardHeader}>
        <Link href="/tomorrow" className={s.adminBrand}>
          <Image src="/assets/logo.png" width={34} height={34} alt="" />
          <span>KENULE AFRICA<small>TOMORROW / ADMIN</small></span>
        </Link>
        <div className={s.dashboardHeaderActions}>
          <span className={s.sessionBadge}><ShieldCheck size={14} aria-hidden="true" /> ADMIN SESSION</span>
          <button className={s.signOutButton} onClick={signOut} disabled={signingOut} type="button">{signingOut ? "SIGNING OUT" : "SIGN OUT"}</button>
        </div>
      </header>

      <section className={s.dashboardIntro}>
        <div><p className={s.adminEyebrow}>TOMORROW / WAITLIST</p><h1>Guest <em>list.</em></h1></div>
        <p>Private registration overview<br />All times shown in West Africa Time</p>
      </section>

      {error && <div className={s.dashboardAlert} role="alert"><span>{error}</span><button onClick={() => setError("")} type="button" aria-label="Dismiss"><X size={16} /></button></div>}

      <section className={s.statGrid} aria-label="Waitlist overview">
        <article className={s.statCard}><span>TOTAL REGISTERED</span><strong>{stats ? stats.total.toLocaleString("en-NG") : "—"}</strong><small>Across all TOMORROW registrations</small></article>
        <article className={s.statCard}><span>RECEIVED TODAY</span><strong>{stats ? stats.today.toLocaleString("en-NG") : "—"}</strong><small>Since midnight WAT</small></article>
        <article className={s.statCard}><span>LAST 7 DAYS</span><strong>{stats ? stats.lastSevenDays.toLocaleString("en-NG") : "—"}</strong><small>Rolling seven-day window</small></article>
        <article className={s.statCard}><span>MOST RECENT</span><strong className={s.recentDate}>{stats?.mostRecentAt ? dateTime.format(new Date(stats.mostRecentAt)) : stats ? "No entries yet" : "—"}</strong><small>Latest registration received</small></article>
      </section>

      <section className={s.subscriberSection} aria-labelledby="subscriber-list-heading">
        <div className={s.subscriberHeading}>
          <div><p className={s.adminEyebrow}>REGISTRATION RECORDS</p><h2 id="subscriber-list-heading">Subscribers</h2></div>
          <button type="button" className={s.exportButton} onClick={exportCsv} disabled={!records || records.pagination.total === 0}>
            <ArrowDownToLine size={16} aria-hidden="true" /> Export CSV
          </button>
        </div>

        <div className={s.tableToolbar}>
          <form className={s.searchForm} onSubmit={applySearch} role="search">
            <Search size={17} aria-hidden="true" />
            <label className={s.srOnly} htmlFor="subscriber-search">Search email addresses</label>
            <input id="subscriber-search" type="search" maxLength={120} placeholder="Search email addresses" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
            {searchInput && <button type="button" onClick={() => { setSearchInput(""); setSearch(""); setPage(1); }} aria-label="Clear search"><X size={15} /></button>}
          </form>
          <label className={s.sortControl}><ArrowUpDown size={15} aria-hidden="true" /><span>DATE</span>
            <select aria-label="Sort registration date" value={sort} onChange={(event) => { setSort(event.target.value as "asc" | "desc"); setPage(1); }}>
              <option value="desc">Newest first</option><option value="asc">Oldest first</option>
            </select>
          </label>
        </div>

        <div className={s.tableViewport}>
          <table className={s.subscriberTable}>
            <thead><tr><th scope="col">EMAIL ADDRESS</th><th scope="col">REGISTERED</th><th scope="col">SOURCE</th></tr></thead>
            <tbody>
              {loading ? <tr><td className={s.tableMessage} colSpan={3}>Loading registrations…</td></tr> : null}
              {!loading && records?.subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td>{subscriber.email}</td>
                  <td>{dateTime.format(new Date(subscriber.created_at))}</td>
                  <td><span className={s.eventTag}>{subscriber.event}</span></td>
                </tr>
              ))}
              {!loading && records?.subscribers.length === 0 ? <tr><td className={s.tableMessage} colSpan={3}>{search ? "No matching email addresses." : "No registrations yet."}</td></tr> : null}
              {!records && !loading && !error ? <tr><td className={s.tableMessage} colSpan={3}>No registration data available.</td></tr> : null}
            </tbody>
          </table>
        </div>

        <div className={s.tableFooter}>
          <span>{records ? `Showing ${startItem}–${endItem} of ${records.pagination.total}` : "Waiting for registration data"}</span>
          <div className={s.pagination}>
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={loading || page <= 1} aria-label="Previous page"><ArrowLeft size={16} /></button>
            <span>{totalPages ? `${page} / ${totalPages}` : "0 / 0"}</span>
            <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={loading || page >= totalPages} aria-label="Next page"><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <footer className={s.dashboardFooter}><span>KENULE AFRICA / TOMORROW</span><Link href="/tomorrow">Return to the experience <ArrowUpRight size={12} aria-hidden="true" /></Link></footer>
    </div>
  );
}
