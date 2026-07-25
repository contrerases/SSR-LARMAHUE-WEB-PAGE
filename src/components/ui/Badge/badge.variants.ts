import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
  base: "inline-flex items-center gap-1.5 rounded-full font-semibold",
  variants: {
    tone: {
      primary: "bg-secondary text-secondary-foreground",
      muted: "bg-muted text-muted-foreground",
      ov: "bg-action-ov/15 text-action-ov",
      pago: "bg-action-pago/15 text-action-pago",
      outline: "border border-border text-foreground",
      onGradient: "bg-white/15 text-white backdrop-blur",
    },
    size: {
      sm: "px-2.5 py-0.5 text-[11px]",
      md: "px-3 py-1 text-xs",
    },
  },
  defaultVariants: { tone: "primary", size: "md" },
});

export type BadgeVariants = VariantProps<typeof badge>;
