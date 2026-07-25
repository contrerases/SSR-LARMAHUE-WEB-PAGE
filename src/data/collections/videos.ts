/**
 * Videos (EJEMPLO). Multimedia de recursos gratuitos:
 *  - src: videos de muestra públicos (Google sample bucket).
 *  - poster: imágenes de picsum.photos (placeholder).
 * Reemplazar por el material audiovisual real del comité.
 */
const SAMPLE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

export const videosData = [
  {
    id: "consumo-responsable",
    title: "Consumo responsable del agua",
    description: "Consejos prácticos para un consumo consciente en el hogar.",
    src: `${SAMPLE}/BigBuckBunny.mp4`,
    poster: "https://picsum.photos/seed/video-agua/800/450",
  },
  {
    id: "nuestras-obras",
    title: "Nuestras obras",
    description: "Recorrido por la infraestructura del servicio sanitario rural.",
    src: `${SAMPLE}/ElephantsDream.mp4`,
    poster: "https://picsum.photos/seed/video-obras/800/450",
  },
  {
    id: "leer-medidor",
    title: "Cómo leer tu medidor",
    description: "Guía paso a paso para leer correctamente tu medidor de agua.",
    src: `${SAMPLE}/ForBiggerBlazes.mp4`,
    poster: "https://picsum.photos/seed/video-medidor/800/450",
  },
  {
    id: "asamblea",
    title: "Asamblea de socios",
    description: "Resumen de la última asamblea de la comunidad de Larmahue.",
    src: `${SAMPLE}/ForBiggerJoyrides.mp4`,
    poster: "https://picsum.photos/seed/video-asamblea/800/450",
  },
] as const;
