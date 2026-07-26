/**
 * Configuración de entorno del sitio.
 * Punto ÚNICO para leer variables de entorno (validadas y tipadas vía astro:env).
 * Los componentes NO leen import.meta.env directamente: importan desde aquí.
 *
 *   import { env, isContentApiConfigured } from "@/config";
 */
import { PUBLIC_CONTENT_API, PUBLIC_WEB3FORMS_KEY } from "astro:env/client";

const contentApiUrl = (PUBLIC_CONTENT_API ?? "").trim();
const web3formsKey = (PUBLIC_WEB3FORMS_KEY ?? "").trim();

/** ¿`value` es una URL absoluta válida? */
function isValidUrl(value: string): boolean {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export const env = {
  /**
   * URL del Web App de Google Apps Script que entrega el contenido dinámico
   * (galería, videos, biblioteca, noticias) desde Google Sheets + Drive.
   * Vacío si aún no se ha configurado.
   */
  contentApiUrl,

  /**
   * Clave de acceso de Web3Forms para el formulario de contacto. Es PÚBLICA por
   * diseño (viaja en el formulario del navegador); solo enruta los envíos al
   * correo asociado en https://web3forms.com. Vacía si aún no se ha configurado.
   */
  web3formsKey,
} as const;

/**
 * true solo si la fuente de contenido dinámico está configurada con una URL válida.
 * Úsalo para decidir si leer de la API o mostrar un estado de "sin configurar".
 */
export const isContentApiConfigured = isValidUrl(contentApiUrl);

/** true si el formulario de contacto tiene su clave de Web3Forms configurada. */
export const isContactFormConfigured = web3formsKey.length > 0;

// Aviso (solo en build/servidor, no en el navegador) si falta la clave.
if (import.meta.env.SSR && !isContactFormConfigured) {
  console.warn(
    "⚠️  Web3Forms: falta PUBLIC_WEB3FORMS_KEY en .env — el formulario de contacto NO enviará correos hasta configurarla.",
  );
}

export type Env = typeof env;
