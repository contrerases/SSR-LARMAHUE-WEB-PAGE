/**
 * Punto de acceso ÚNICO a los datos ESTÁTICOS del sitio.
 * Valida al cargar (build-time) con los validadores de @/lib/validators: si un
 * dato no cumple, el build falla con un mensaje claro.
 *
 *   import { content } from "@/data";
 *   content.site.contact.email · content.copy.hero.eyebrow · content.resources ...
 *
 * El contenido DINÁMICO (galería, videos, biblioteca, noticias) NO vive aquí:
 * se lee en runtime desde la API (Google Sheets + Drive) vía @/lib/content-api.
 */
import { siteData } from "./site";
import { navigationData } from "./navigation";
import { resourcesData } from "./resources";
import { copyData } from "./copy";
import { pagesData } from "./pages/nosotros";
import { billData } from "./pages/boleta";
import {
  validateSite,
  validateNavigation,
  validateResources,
  validateCopy,
  validatePages,
  validateBill,
} from "@/lib/validators/content";

export const site = validateSite(siteData);
export const navigation = validateNavigation(navigationData);
export const resources = validateResources(resourcesData);
export const copy = validateCopy(copyData);
export const pages = validatePages(pagesData);
export const bill = validateBill(billData);

export const content = { site, navigation, resources, copy, pages, bill };

export type {
  SiteContent,
  Navigation,
  Resource,
  Copy,
  Pages,
  Bill,
  Link,
  NavItem,
} from "@/types/content";
