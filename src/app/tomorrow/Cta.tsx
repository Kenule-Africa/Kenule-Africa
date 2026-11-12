"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle, X } from "lucide-react";
import s from "./tomorrow.module.css";

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";

export default function Cta({ label, prominent = false }: { label: string; prominent?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const cls = s.cta + (prominent ? " " + s.prominent : "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setState("loading");
    setMessage("");

    if (website.trim()) {
      setState("success");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => null) as { error?: string; message?: string } | null;
      if (response.status === 409) {
        setState("duplicate");
        setMessage(result?.error ?? "This email is already on the waitlist.");
      } else if (!response.ok) {
        setState("error");
        setMessage(result?.error ?? "We could not complete your registration. Please try again.");
      } else {
        setState("success");
        setMessage(result?.message ?? "You're on the list! We'll be in touch when TOMORROW goes live.");
      }
    } catch {
      setState("error");
      setMessage("Connection failed. Please check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function openDialog() {
    setEmail("");
    setWebsite("");
    setState("idle");
    setMessage("");
    dialog.current?.showModal();
  }

  return (
    <>
      <button type="button" className={cls} onClick={openDialog}>{label}<ArrowUpRight size={16} aria-hidden="true" /></button>
      <dialog
        ref={dialog}
        className={s.waitlistDialog}
        aria-labelledby="waitlist-dialog-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className={s.waitlistDialogPanel}>
          <button className={s.waitlistDialogClose} type="button" onClick={() => dialog.current?.close()} aria-label="Close waitlist form"><X size={18} aria-hidden="true" /></button>
          <p className={s.eyebrow}>TOMORROW / EARLY ACCESS</p>
          <h2 id="waitlist-dialog-title">Stay close<br /><em>to what&apos;s next.</em></h2>
          <p className={s.waitlistDialogIntro}>Leave your email and we&apos;ll let you know when TOMORROW details are released.</p>

          {state === "success" ? (
            <div className={s.waitlistDialogResult} role="status"><span><Check size={18} aria-hidden="true" /></span><p>{message || "You're on the list! We'll be in touch when TOMORROW goes live."}</p></div>
          ) : state === "duplicate" ? (
            <div className={s.waitlistDialogResult} role="status"><span><Check size={18} aria-hidden="true" /></span><p>{message}</p></div>
          ) : (
            <form className={s.waitlistDialogForm} onSubmit={handleSubmit}>
              <label htmlFor="tomorrow-waitlist-email">EMAIL ADDRESS</label>
              <input
                id="tomorrow-waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                maxLength={254}
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={submitting}
              />
              <div className={s.waitlistHoneypot} aria-hidden="true">
                <label htmlFor="tomorrow-company-website">Leave this field empty</label>
                <input id="tomorrow-company-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
              </div>
              {state === "error" && <p className={s.waitlistDialogError} role="alert">{message}</p>}
              <button className={s.waitlistDialogSubmit} type="submit" disabled={submitting}>
                <span>{submitting ? "ADDING YOU TO THE LIST" : "JOIN THE WAITLIST"}</span>
                {submitting ? <LoaderCircle className={s.waitlistSpinner} size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
              </button>
              <small>Your email is only used for TOMORROW updates.</small>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
