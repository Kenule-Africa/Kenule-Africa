"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import s from "./admin.module.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setError(result?.error ?? "Sign in could not be completed. Try again.");
        return;
      }
      window.location.assign("/admin/dashboard");
    } catch {
      setError("Connection failed. Check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={s.loginCard} aria-labelledby="admin-login-title">
      <aside className={s.loginVisual}>
        <Link href="/tomorrow" className={s.adminBrand}>
          <Image src="/assets/logo.png" width={38} height={38} alt="" />
          <span>KENULE AFRICA<small>TOMORROW / ADMIN</small></span>
        </Link>
        <p className={s.visualOverline}>PRIVATE ADMINISTRATION</p>
        <div className={s.visualTitle} aria-hidden="true"><span>Tomorrow</span><em>starts here.</em></div>
        <div className={s.visualBottom}><span>PORT HARCOURT, NIGERIA</span></div>
      </aside>

      <div className={s.loginPanel}>
        <div className={s.loginPanelTop}>
          <span className={s.secureMark}><LockKeyhole size={14} aria-hidden="true" /> SECURE ACCESS</span>
          <Link className={s.backLink} href="/tomorrow"><ArrowLeft size={14} aria-hidden="true" /> PUBLIC SITE</Link>
        </div>

        <div className={s.loginBody}>
          <p className={s.adminEyebrow}>ADMIN CONSOLE</p>
          <h1 id="admin-login-title">Sign in.</h1>
          <p className={s.loginDescription}>Manage the TOMORROW guest list.</p>
        <form className={s.loginForm} onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            required
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="admin-password">Password</label>
          <div className={s.passwordField}>
            <input
              className={s.passwordInput}
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              maxLength={256}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className={s.passwordToggle}
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
            </button>
          </div>
          {error && <p className={s.formError} role="alert">{error}</p>}
          <button className={s.primaryAction} type="submit" disabled={submitting}>
            {submitting ? <LoaderCircle size={17} className={s.spinner} aria-hidden="true" /> : null}
            <span>{submitting ? "SIGNING IN" : "SIGN IN"}</span>
            {!submitting && <ArrowUpRight size={17} aria-hidden="true" />}
          </button>
        </form>
        </div>
        <div className={s.loginFoot}><span>KENULE AFRICA</span><span>AUTHORIZED USERS ONLY</span></div>
      </div>
    </section>
  );
}
