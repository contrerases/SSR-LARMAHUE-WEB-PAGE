/**
 * Configuración central del sitio.
 * Un único lugar para textos institucionales, datos de contacto y los enlaces
 * externos (Oficina Virtual y Pago en Línea). Cambiar aquí = cambia en todo el sitio.
 */

export interface NavLink {
  label: string;
  href: string;
  /** true si abre un sistema externo (nueva pestaña + rel de seguridad). */
  external?: boolean;
}

export const site = {
  name: "SSR Larmahue",
  fullName: "Servicio Sanitario Rural Larmahue",
  slogan: "El agua nos mueve",
  mission:
    "Integrar el consumo responsable del agua con comportamientos respetuosos hacia el medioambiente y a las personas.",
  location: "Larmahue s/n, Pichidegua, Región de O'Higgins, Chile",

  contact: {
    officePhone: "938646480",
    emergencyPhone: "+56 992261976",
    email: "comitelarmahue@gmail.com",
  },

  /**
   * Enlaces a los sistemas existentes. El `token` es de EMPRESA (público) y solo
   * abre la pantalla de acceso de cada sistema; no expone datos de usuarios.
   *  - Oficina Virtual: app PHP en el MISMO servidor (carpeta /ov/). No se toca, solo se enlaza.
   *  - Pago en Línea: pasarela EXTERNA (gestionelectronica.cl / Webpay).
   */
  services: {
    oficinaVirtual:
      "https://www.ssrlarmahue.cl/ov/index.php?token=1534b76d325a8f591b52d302e7181331",
    pagoEnLinea:
      "https://www.gestionelectronica.cl/ingreso_emp4/consulta/form-contrato.php?token=1534b76d325a8f591b52d302e7181331",
  },
} as const;

/** Navegación principal (se ajustará al definir la estructura en la Fase 2). */
export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Misión y Visión", href: "#mision-vision" },
  { label: "Contacto", href: "#contacto" },
];

export type Site = typeof site;
