# UI Registry

Last updated: 2026-09-07

## Baseline

Light canvas site. Cards are borderless and use elevation. Dark selected state is `#111111`. Accents are amber. No pulsing dots. No em dashes in copy.

### Venture card

File: `src/components/sections/OraviaVenturesSection.tsx`
Last updated: 2026-09-07

| Property         | Class |
| ---------------- | ----- |
| Background       | `bg-white` idle, `bg-[#111111]` selected |
| Border           | none |
| Border radius    | `rounded-2xl` |
| Text — primary   | `text-[#111111]` / `text-white` |
| Text — secondary | `text-[#666666]` / `text-gray-300` |
| Spacing          | `p-6 sm:p-9` |
| Hover state      | `hover:shadow-2xl` |
| Shadow           | `shadow-lg shadow-neutral-200/60` idle, `shadow-2xl` selected |
| Accent usage     | `text-amber-700` idle, `text-amber-300` selected |

**Pattern notes:** Selected card inverts to obsidian. Sector labels are `font-mono` uppercase tracking.
