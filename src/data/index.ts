/**
 * Punto de acceso ÚNICO a los datos del sitio.
 * Valida al cargar (build-time) con los validadores de @/lib/validators: si un
 * dato no cumple, el build falla con un mensaje claro.
 *
 *   import { content } from "@/data";
 *   content.site.contact.email · content.copy.hero.eyebrow · content.videos ...
 */
import { siteData } from "./site";
import { navigationData } from "./navigation";
import { resourcesData } from "./resources";
import { copyData } from "./copy";
import { pagesData } from "./pages/nosotros";
import { billData } from "./pages/boleta";
import { videosData } from "./collections/videos";
import { libraryData } from "./collections/library";
import {
  validateSite,
  validateNavigation,
  validateResources,
  validateCopy,
  validatePages,
  validateVideos,
  validateLibrary,
  validateBill,
} from "@/lib/validators/content";

export const site = validateSite(siteData);
export const navigation = validateNavigation(navigationData);
export const resources = validateResources(resourcesData);
export const copy = validateCopy(copyData);
export const pages = validatePages(pagesData);
export const videos = validateVideos(videosData);
export const library = validateLibrary(libraryData);
export const bill = validateBill(billData);

// Aviso (no bloqueante) si el formulario de contacto no está configurado.
if (site.forms.web3formsAccessKey.startsWith("PENDIENTE")) {
  console.warn(
    "⚠️  Web3Forms: falta la access key real en data/site.ts — el formulario de contacto NO enviará correos hasta configurarla.",
  );
}

export const content = { site, navigation, resources, copy, pages, videos, library, bill };

export type {
  SiteContent,
  Navigation,
  Resource,
  Copy,
  Pages,
  Video,
  Doc,
  Bill,
  Link,
  NavItem,
} from "@/types/content";
