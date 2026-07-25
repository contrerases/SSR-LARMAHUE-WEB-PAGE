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
import galeria7 from "./images/gallery/galeria-7.jpg";
import galeria8 from "./images/gallery/galeria-8.jpg";
import galeria9 from "./images/gallery/galeria-9.jpg";

export const images = {
  bannerSecundario,
  // Galería: placeholders (descargados de picsum) — reemplazar por fotos reales.
  galeria: [
    galeria1, galeria2, galeria3, galeria4, galeria5,
    galeria6, galeria7, galeria8, galeria9,
  ],
} as const;
