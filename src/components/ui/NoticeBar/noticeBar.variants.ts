import { tv, type VariantProps } from "tailwind-variants";

export const noticeBar = tv({
  base: "flex items-start gap-4 rounded-[var(--radius)] px-6 py-5",
  variants: {
    tone: {
      primary: "bg-primary text-primary-foreground shadow-card",
      pago: "bg-action-pago text-action-pago-foreground shadow-card",
      info: "bg-secondary text-secondary-foreground",
      soft: "border border-primary/20 bg-primary/5 text-foreground",
    },
  },
  defaultVariants: { tone: "primary" },
});

export type NoticeBarVariants = VariantProps<typeof noticeBar>;
