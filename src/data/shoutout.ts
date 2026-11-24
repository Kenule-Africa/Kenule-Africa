// Single source of truth for the ShoutOut page: copy, links and contact details.

// Destinations for the two primary calls to action. Leave a value empty and its
// buttons render an honest "opening soon" state instead of a dead link.
// Set each to the real form URL (for example a Google Form) to enable it.
export const creatorApplicationUrl = "";
export const campaignRequestUrl = "";

export const pillars = [
  "Digital Marketing",
  "Influencer Management",
  "Talent Development",
  "Brand Partnerships",
] as const;

export const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#creators", label: "Creators" },
  { href: "#brands", label: "Brands" },
  { href: "#contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "digital-marketing",
    number: "01",
    title: "Digital Marketing",
    description: "Strategy, content and paid media that grow brands online.",
    capabilities: ["Campaign strategy", "Content production", "Performance and analytics"],
  },
  {
    id: "influencer-management",
    number: "02",
    title: "Influencer Management",
    description: "Representation and day-to-day management for creators.",
    capabilities: ["Brand deals", "Negotiation and contracts", "Career planning"],
  },
  {
    id: "talent-development",
    number: "03",
    title: "Talent Development",
    description: "Training and mentorship for emerging creators.",
    capabilities: ["Content craft", "Personal brand", "Growth coaching"],
  },
  {
    id: "brand-partnerships",
    number: "04",
    title: "Brand Partnerships",
    description: "Matching brands with the voices their audiences trust.",
    capabilities: ["Creator matching", "Campaign management", "Reporting"],
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const creatorBenefits = [
  {
    number: "01",
    title: "Opportunities",
    description: "Get matched with brand campaigns that fit your voice and your audience.",
  },
  {
    number: "02",
    title: "Representation",
    description: "Negotiation, contracts and day-to-day management, handled with care.",
  },
  {
    number: "03",
    title: "Growth",
    description: "Training and mentorship to sharpen your craft and build a lasting career.",
  },
] as const;

export const brandSteps = [
  { number: "01", title: "Brief", description: "Share your goals, your audience and your budget." },
  { number: "02", title: "Match", description: "We pair you with creators who genuinely fit your brand." },
  { number: "03", title: "Launch", description: "We manage the campaign from first post to final delivery." },
  { number: "04", title: "Measure", description: "Clear reporting on reach, engagement and results." },
] as const;

// ShoutOut does not have its own contact channels or social accounts yet, so these are
// Kenule Africa's. Replace them, or add ShoutOut handles here, and the footer updates.
export const contact = {
  email: "admin@kenuleafrica.xyz",
  whatsappLabel: "+234 901 967 2049",
  whatsappUrl: "https://wa.me/2349019672049",
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/kenuleafrica" },
  { label: "X (Twitter)", href: "https://x.com/kenuleafrica" },
] as const;

export const kenuleLinks = [
  { href: "/", label: "Kenule Africa" },
  { href: "/legitlab-academy", label: "LegitLab Academy" },
  { href: "/tomorrow", label: "TOMORROW" },
] as const;
