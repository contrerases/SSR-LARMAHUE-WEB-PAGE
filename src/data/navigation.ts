/**
 * Estructura de navegación. Fiel al menú original:
 * "Nuestra Empresa" (Quiénes Somos, Misión y Visión) + Contacto.
 * Las anclas usan "/#..." para funcionar también desde páginas interiores.
 */
export const navigationData = {
  main: [
    { label: "Inicio", href: "/#inicio" },
    {
      label: "Nuestra Empresa",
      href: "/#quienes-somos",
      children: [
        { label: "Quiénes Somos", href: "/#quienes-somos" },
        { label: "Misión y Visión", href: "/#mision-vision" },
      ],
    },
    { label: "Servicios", href: "/#servicios" },
    { label: "Noticias", href: "/noticias" },
    { label: "Contacto", href: "/#contacto" },
  ],
} as const;
