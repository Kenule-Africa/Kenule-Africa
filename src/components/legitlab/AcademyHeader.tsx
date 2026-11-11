"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { applicationUrl } from "@/data/legitlab";

export default function AcademyHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setOpen(false); };
    window.addEventListener("keydown", close); media.addEventListener("change", resize);
    return () => { window.removeEventListener("keydown", close); media.removeEventListener("change", resize); };
  }, [open]);
  return <header className="academy-header"><div className="academy-shell header-row">
    <Link href="/" className="academy-brand" aria-label="Kenule Africa home"><Image src="/assets/logo.png" width={36} height={36} alt="" /><span>KENULE AFRICA<small>LEGITLAB ACADEMY</small></span></Link>
    <nav className="academy-desktop-nav" aria-label="Academy navigation"><Link href="/">Home</Link><Link href="/tomorrow">Tomorrow</Link><a href="#tracks">Learning tracks</a><a href="#experience">The experience</a><a href="#faq">FAQs</a></nav>
    <div className="header-actions"><a className="academy-button small" href={applicationUrl} target="_blank" rel="noopener noreferrer">Apply <ArrowUpRight size={15} /></a><button ref={trigger} className="academy-menu-button" aria-expanded={open} aria-controls="academy-mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={()=>setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div>{open && <nav id="academy-mobile-nav" className="academy-mobile-nav academy-shell" aria-label="Mobile academy navigation">{[["/","Kenule Africa home"],["/tomorrow","Tomorrow"],["#tracks","Learning tracks"],["#experience","The experience"],["#faq","FAQs"]].map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={16} /></Link>)}</nav>}</header>;
}
