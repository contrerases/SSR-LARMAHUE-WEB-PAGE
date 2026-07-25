/**
 * Accesos de contenido de la home (tarjetas). Fiel al sitio original:
 * Galería, Videos, Biblioteca y "Conozca su Boleta".
 * `icon` referencia una clave del sistema de iconos (ui/Icon).
 */
export const resourcesData = [
  {
    id: "galeria",
    title: "Galería",
    description: "Imágenes de nuestras obras y actividades.",
    href: "/galeria",
    icon: "image",
  },
  {
    id: "videos",
    title: "Videos",
    description: "Material audiovisual del servicio.",
    href: "/videos",
    icon: "video",
  },
  {
    id: "biblioteca",
    title: "Biblioteca",
    description: "Reglamentos, estatutos y documentos.",
    href: "/biblioteca",
    icon: "book",
  },
  {
    id: "boleta",
    title: "Conozca su Boleta",
    description: "Aprenda a leer y entender su boleta.",
    href: "/boleta",
    icon: "receipt",
  },
] as const;
