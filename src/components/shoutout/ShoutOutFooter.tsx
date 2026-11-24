import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contact, kenuleLinks, sectionLinks, socialLinks } from "@/data/shoutout";
import s from "./shoutout.module.css";

const heading = "text-[13px] font-semibold text-white";
const item = "text-[14px] text-(--so-muted-dark) transition-colors hover:text-white";

export default function ShoutOutFooter() {
  return (
    <footer id="contact" className={`${s.dark} scroll-mt-14 bg-black text-white`}>
      <div className="mx-auto max-w-[1120px] px-6 pt-20 pb-10 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/assets/shoutout/shoutout-logo-white.png"
              alt="ShoutOut"
              width={1098}
              height={271}
              sizes="130px"
              className="h-[30px] w-auto"
            />
            <p className="mt-6 max-w-[300px] text-[15px] leading-[1.6] text-(--so-muted-dark)">
              The creative agency where creators and brands grow together. A Kenule Africa company.
            </p>
          </div>

          <nav aria-label="ShoutOut">
            <h3 className={heading}>ShoutOut</h3>
            <ul className="mt-5 space-y-3">
              {sectionLinks
                .filter((link) => link.href !== "#contact")
                .map((link) => (
                  <li key={link.href}>
                    <a className={item} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Kenule Africa">
            <h3 className={heading}>Kenule Africa</h3>
            <ul className="mt-5 space-y-3">
              {kenuleLinks.map((link) => (
                <li key={link.href}>
                  <Link className={item} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h3 className={heading}>Contact</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a className={item} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a className={`${item} inline-flex items-center gap-1`} href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contact.whatsappLabel} <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a className={`${item} inline-flex items-center gap-1`} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-(--so-hairline-dark) pt-6 text-[12px] text-(--so-muted-dark) sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Kenule Africa Ltd. All rights reserved.</p>
          <p>ShoutOut is a Kenule Africa company.</p>
        </div>
      </div>
    </footer>
  );
}
