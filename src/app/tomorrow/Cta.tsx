"use client";
import { ArrowUpRight } from "lucide-react";
import s from "./tomorrow.module.css";

export default function Cta({ href, label, prominent = false }: { href?: string; label: string; prominent?: boolean }) {
  const cls = s.cta + (prominent ? " " + s.prominent : "");
  const icon = <ArrowUpRight size={16} aria-hidden="true" />;
  if (!href) return <button type="button" className={cls} disabled aria-disabled="true">{label}{icon}</button>;
  return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{label}{icon}</a>;
}
