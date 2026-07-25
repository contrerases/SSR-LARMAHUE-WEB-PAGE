import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium leading-none",
    "rounded-[var(--radius-button)] transition duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "active:translate-y-0 active:brightness-100 disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:brightness-95",
      outline:
        "border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted hover:text-primary hover:shadow-md",
      ghost: "bg-transparent text-foreground hover:bg-muted hover:text-primary",
      link: "bg-transparent text-primary underline-offset-4 hover:underline hover:brightness-110",
      ov: "bg-action-ov text-action-ov-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110",
      pago: "bg-action-pago text-action-pago-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110",
    },
    size: {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-5 text-[0.95rem]",
      lg: "h-12 px-7 text-base",
      icon: "size-11",
    },
    fullWidth: { true: "w-full" },
  },
  compoundVariants: [{ variant: "link", class: "h-auto px-0" }],
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonVariants = VariantProps<typeof button>;
