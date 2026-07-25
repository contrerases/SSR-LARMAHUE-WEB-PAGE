/**
 * Contenido de secciones institucionales.
 * ⚠️ PLACEHOLDER: "Quiénes Somos" y "Misión y Visión" están VACÍAS en el sitio
 * original. El texto siguiente es LOREM IPSUM temporal — reemplazar cuando el
 * comité entregue los textos definitivos.
 */
export const pagesData = {
  quienesSomos: {
    eyebrow: "Quiénes Somos",
    title: "Un comité al servicio de la comunidad",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nisi vel consectetur euismod, nisl nunc aliquam nisi, eget aliquam nisl nunc vel nisi. Sed euismod, nisi vel consectetur euismod.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    ],
    stats: [
      { value: "1985", label: "Al servicio de Larmahue" },
      { value: "+800", label: "Socios y socias (placeholder)" },
      { value: "24/7", label: "Atención de emergencias" },
    ],
  },
  mision: {
    eyebrow: "Misión y Visión",
    title: "Hacia dónde vamos",
    mision: {
      title: "Misión",
      // Fiel: es el "compromiso" declarado en el sitio original.
      body: "Integrar el consumo responsable del agua con comportamientos respetuosos hacia el medioambiente y a las personas.",
    },
    vision: {
      title: "Visión",
      // PLACEHOLDER lorem ipsum — falta el texto real.
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
  },
} as const;
