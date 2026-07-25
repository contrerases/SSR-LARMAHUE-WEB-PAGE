import { tv, type VariantProps } from "tailwind-variants";

export const glassCard = tv({
  base: "backdrop-blur-sm",
  variants: {
    variant: {
      surface: "border border-border bg-card text-card-foreground shadow-card",
      onGradient:
        "border border-white/25 bg-white/15 text-white shadow-2xl backdrop-blur-2xl",
      soft: "bg-white/10 text-white backdrop-blur-xl",
    },
    radius: {
      md: "rounded-[1.25rem]",
      lg: "rounded-[1.75rem]",
      xl: "rounded-[2.25rem]",
    },
    interactive: {
      true: "transition-transform duration-300 hover:-translate-y-2",
    },
  },
  defaultVariants: { variant: "surface", radius: "lg" },
});

export type GlassCardVariants = VariantProps<typeof glassCard>;
