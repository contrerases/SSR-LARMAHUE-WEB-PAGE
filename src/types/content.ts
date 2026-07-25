/**
 * Tipos del contenido del sitio (antes inferidos por zod).
 * Los arrays anidados son de solo lectura porque el contenido solo se recorre.
 */

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem extends Link {
  children?: readonly Link[];
}

export interface Navigation {
  main: readonly NavItem[];
}

export interface Contact {
  officePhone: string;
  emergencyPhone: string;
  email: string;
}

export interface Location {
  address: string;
  commune: string;
  region: string;
  country: string;
}

export interface SiteContent {
  name: string;
  fullName: string;
  slogan: string;
  mission: string;
  location: Location;
  contact: Contact;
  services: { oficinaVirtual: string; pagoEnLinea: string };
  credits: { developer: string; year: number };
  forms: { web3formsAccessKey: string };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface Copy {
  hero: { eyebrow: string; titleLines: readonly string[] };
  services: { eyebrow: string; title: string };
  commitment: { eyebrow: string };
  leak: { title: string; body: string; cta: string };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      phone: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: { rights: string };
  whatsapp: { defaultMessage: string };
}

export interface Pages {
  quienesSomos: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    stats: readonly { value: string; label: string }[];
  };
  mision: {
    eyebrow: string;
    title: string;
    mision: { title: string; body: string };
    vision: { title: string; body: string };
  };
}

export interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
}

export interface Doc {
  id: string;
  title: string;
  description: string;
  category: string;
  format: string;
  size: string;
  href: string;
}

export interface Bill {
  intro: string;
  parts: readonly {
    id: string;
    title: string;
    description: string;
    items?: readonly { term: string; desc: string }[];
  }[];
}
