/**
 * Biblioteca de documentos (EJEMPLO). Los enlaces apuntan a un PDF de muestra
 * público; reemplazar `href` por los documentos reales del comité.
 */
const SAMPLE_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const libraryData = [
  {
    id: "reglamento",
    title: "Reglamento interno",
    description: "Normas de uso y convivencia del servicio de agua potable rural.",
    category: "Reglamentos",
    format: "PDF",
    size: "320 KB",
    href: SAMPLE_PDF,
  },
  {
    id: "estatutos",
    title: "Estatutos del comité",
    description: "Estatutos que rigen la organización del comité de agua potable.",
    category: "Reglamentos",
    format: "PDF",
    size: "410 KB",
    href: SAMPLE_PDF,
  },
  {
    id: "tarifas-2026",
    title: "Tarifas vigentes 2026",
    description: "Detalle de cargos fijos y valor del metro cúbico para el año en curso.",
    category: "Tarifas",
    format: "PDF",
    size: "180 KB",
    href: SAMPLE_PDF,
  },
  {
    id: "acta-asamblea",
    title: "Acta última asamblea",
    description: "Acuerdos y resoluciones de la última asamblea de socios.",
    category: "Actas",
    format: "PDF",
    size: "260 KB",
    href: SAMPLE_PDF,
  },
  {
    id: "solicitud-arranque",
    title: "Solicitud de nuevo arranque",
    description: "Formulario para solicitar una nueva conexión al servicio.",
    category: "Formularios",
    format: "PDF",
    size: "95 KB",
    href: SAMPLE_PDF,
  },
] as const;
