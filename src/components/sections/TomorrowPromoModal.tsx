"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import styles from "./TomorrowPromoModal.module.css";

const DISMISSED_KEY = "kenule-tomorrow-promo-dismissed";

export default function TomorrowPromoModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  function remindLater() {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    dialogRef.current?.close();
  }

  function dismissOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) remindLater();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="tomorrow-promo-title"
      aria-describedby="tomorrow-promo-description"
      onClick={dismissOnBackdrop}
      onClose={() => window.sessionStorage.setItem(DISMISSED_KEY, "true")}
    >
      <div className={styles.panel}>
        <button className={styles.close} type="button" onClick={remindLater} aria-label="Close TOMORROW invitation">
          <X size={18} aria-hidden="true" />
        </button>
        <p className={styles.eyebrow}>A KENULE AFRICA EXPERIENCE</p>
        <h2 id="tomorrow-promo-title">Make room<br /><em>for tomorrow.</em></h2>
        <p id="tomorrow-promo-description" className={styles.description}>
          Join the TOMORROW waitlist for updates.
        </p>
        <div className={styles.actions}>
          <Link
            className={styles.primary}
            href="/tomorrow"
            onClick={() => window.sessionStorage.setItem(DISMISSED_KEY, "true")}
          >
            <span>Explore TOMORROW</span><ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button className={styles.secondary} type="button" onClick={remindLater}>
            Remind me later
          </button>
        </div>
      </div>
    </dialog>
  );
}
