/**
 * Registro central de imágenes LOCALES (astro:assets).
 *   import { images } from "@/assets/images";
 *   <Image src={images.logo} alt="..." />
 *
 * La gota (logo-drop) es SVG vectorial: se importa directamente donde se usa
 * (import LogoDrop from "@/assets/images/logo-drop.svg"), no vía este registro.
 */
import bannerSecundario from "./images/banner-secundario.jpg";
import galeria1 from "./images/gallery/galeria-1.jpg";
import galeria2 from "./images/gallery/galeria-2.jpg";
import galeria3 from "./images/gallery/galeria-3.jpg";
import galeria4 from "./images/gallery/galeria-4.jpg";
import galeria5 from "./images/gallery/galeria-5.jpg";
import galeria6 from "./images/gallery/galeria-6.jpg";

export const images = {
  bannerSecundario,
  // Galería de muestra en la home (6 imágenes). La galería completa es dinámica
  // (Google Drive), por eso aquí solo hay las 6 de la vista previa.
  galeria: [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6],
} as const;
