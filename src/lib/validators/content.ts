/**
 * Validación del contenido del sitio (build-time), usando los validadores
 * ligeros de @/lib/validators. Cada función recibe el dato crudo, comprueba lo
 * que importa (emails, URLs, campos vacíos, iconos del catálogo) y lo devuelve
 * ya tipado. Si algo falla, lanza y detiene la compilación.
 */
import {
  assert,
  nonEmpty,
  minLength,
  email,
  url,
  integerMin,
  oneOf,
  nonEmptyArray,
} from "@/lib/validators";
import { icons } from "@/components/ui/Icon/icon-paths";
import type { SiteContent, Navigation, Resource, Copy, Pages, Video, Doc, Bill } from "@/types/content";

const ICON_NAMES = Object.keys(icons);

export function validateSite(data: unknown): SiteContent {
  const d = data as SiteContent;
  nonEmpty(d.name, "site.name");
  nonEmpty(d.fullName, "site.fullName");
  nonEmpty(d.slogan, "site.slogan");
  nonEmpty(d.mission, "site.mission");
  nonEmpty(d.location.address, "site.location.address");
  nonEmpty(d.location.commune, "site.location.commune");
  nonEmpty(d.location.region, "site.location.region");
  email(d.contact.email, "site.contact.email");
  minLength(d.contact.officePhone, 6, "site.contact.officePhone");
  minLength(d.contact.emergencyPhone, 6, "site.contact.emergencyPhone");
  url(d.services.oficinaVirtual, "site.services.oficinaVirtual");
  url(d.services.pagoEnLinea, "site.services.pagoEnLinea");
  integerMin(d.credits.year, 2000, "site.credits.year");
  nonEmpty(d.forms.web3formsAccessKey, "site.forms.web3formsAccessKey");
  return d;
}

export function validateNavigation(data: unknown): Navigation {
  const d = data as Navigation;
  nonEmptyArray(d.main, "navigation.main");
  d.main.forEach((item, i) => {
    nonEmpty(item.label, `navigation.main[${i}].label`);
    nonEmpty(item.href, `navigation.main[${i}].href`);
  });
  return d;
}

export function validateResources(data: unknown): Resource[] {
  const arr = data as Resource[];
  nonEmptyArray(arr, "resources");
  arr.forEach((r, i) => {
    nonEmpty(r.title, `resources[${i}].title`);
    nonEmpty(r.description, `resources[${i}].description`);
    nonEmpty(r.href, `resources[${i}].href`);
    oneOf(r.icon, ICON_NAMES, `resources[${i}].icon`);
  });
  return arr;
}

export function validateCopy(data: unknown): Copy {
  const d = data as Copy;
  nonEmptyArray(d.hero.titleLines, "copy.hero.titleLines");
  nonEmpty(d.services.title, "copy.services.title");
  nonEmpty(d.leak.title, "copy.leak.title");
  nonEmpty(d.leak.body, "copy.leak.body");
  nonEmpty(d.contact.title, "copy.contact.title");
  nonEmpty(d.contact.form.submit, "copy.contact.form.submit");
  nonEmpty(d.whatsapp.defaultMessage, "copy.whatsapp.defaultMessage");
  return d;
}

export function validatePages(data: unknown): Pages {
  const d = data as Pages;
  nonEmpty(d.quienesSomos.title, "pages.quienesSomos.title");
  nonEmptyArray(d.quienesSomos.paragraphs, "pages.quienesSomos.paragraphs");
  nonEmptyArray(d.quienesSomos.stats, "pages.quienesSomos.stats");
  nonEmpty(d.mision.mision.body, "pages.mision.mision.body");
  nonEmpty(d.mision.vision.body, "pages.mision.vision.body");
  return d;
}

export function validateVideos(data: unknown): Video[] {
  const arr = data as Video[];
  nonEmptyArray(arr, "videos");
  arr.forEach((v, i) => {
    nonEmpty(v.title, `videos[${i}].title`);
    nonEmpty(v.description, `videos[${i}].description`);
    url(v.src, `videos[${i}].src`);
    url(v.poster, `videos[${i}].poster`);
  });
  return arr;
}

export function validateLibrary(data: unknown): Doc[] {
  const arr = data as Doc[];
  nonEmptyArray(arr, "library");
  arr.forEach((doc, i) => {
    nonEmpty(doc.title, `library[${i}].title`);
    nonEmpty(doc.description, `library[${i}].description`);
    nonEmpty(doc.category, `library[${i}].category`);
    nonEmpty(doc.href, `library[${i}].href`);
  });
  return arr;
}

export function validateBill(data: unknown): Bill {
  const d = data as Bill;
  nonEmpty(d.intro, "bill.intro");
  nonEmptyArray(d.parts, "bill.parts");
  d.parts.forEach((p, i) => {
    nonEmpty(p.id, `bill.parts[${i}].id`);
    nonEmpty(p.title, `bill.parts[${i}].title`);
    nonEmpty(p.description, `bill.parts[${i}].description`);
  });
  return d;
}
