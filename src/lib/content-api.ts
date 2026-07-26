/**
 * Adaptador de contenido dinámico (Google Sheets + Drive vía Apps Script).
 * Se ejecuta en el navegador (runtime): descarga el JSON de `env.contentApiUrl`
 * y construye las URLs de Drive. Así el comité agrega contenido sin recompilar.
 */
import { env } from "@/config";

export interface GalleryItem {
  titulo: string;
  descripcion?: string;
  driveid: string;
  fecha?: string;
}
export interface VideoItem {
  titulo: string;
  descripcion?: string;
  youtubeurl: string;
  fecha?: string;
}
export interface DocItem {
  titulo: string;
  descripcion?: string;
  categoria?: string;
  formato?: string;
  driveid: string;
  fecha?: string;
}
export interface NewsItem {
  titulo: string;
  slug: string;
  resumen?: string;
  cuerpo?: string;
  imagendriveid?: string;
  fecha?: string;
}

export interface DynamicContent {
  galeria: GalleryItem[];
  videos: VideoItem[];
  biblioteca: DocItem[];
  noticias: NewsItem[];
}

/**
 * URL de imagen de Drive redimensionable. Usa el endpoint `thumbnail`, que es
 * el que sirve archivos públicos de forma fiable (el antiguo
 * `lh3.googleusercontent.com/d/…` dejó de funcionar sin sesión de Google).
 * El archivo debe estar compartido como "Cualquier persona con el enlace".
 */
export function driveImage(driveId: string, width = 1000): string {
  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`;
}

/**
 * Asigna una imagen de Drive a un <img> con reintentos y fundido de entrada.
 * Drive a veces devuelve (y cachea) un error cuando la miniatura todavía no se
 * ha generado; reintentamos con un parámetro anti-caché y un retardo creciente,
 * de modo que la imagen aparezca en cuanto Drive la tenga lista.
 */
export function setDriveImage(
  img: HTMLImageElement,
  driveId: string,
  width = 1000,
  retries = 3,
): void {
  img.style.opacity = "0";
  img.style.transition = "opacity .5s ease";
  let attempt = 0;
  const load = () => {
    const base = driveImage(driveId, width);
    img.src = attempt === 0 ? base : `${base}&r=${attempt}`;
  };
  img.addEventListener("load", () => {
    img.style.opacity = "1";
  });
  img.addEventListener("error", () => {
    if (attempt >= retries) {
      img.style.opacity = "1"; // agota reintentos: deja visible el texto alt
      return;
    }
    attempt += 1;
    setTimeout(load, attempt * 700);
  });
  load();
}

/** URL para VER un archivo de Drive (PDF, Word, Excel…). */
export function driveView(driveId: string): string {
  return `https://drive.google.com/file/d/${driveId}/view`;
}

/** URL para DESCARGAR un archivo de Drive. */
export function driveDownload(driveId: string): string {
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
}

/** Extrae el ID de un video de YouTube desde cualquier formato de URL. */
export function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m ? m[1] : null;
}

/** Miniatura (póster) de un video de YouTube. */
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** URL de inserción (embed) de un video de YouTube (sin cookies). */
export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

// --- Caché de la respuesta de la API -----------------------------------------
// El endpoint de Apps Script es lento (arranque en frío de varios segundos).
// Guardamos el JSON en sessionStorage para que, dentro de una misma visita,
// navegar entre páginas o abrir/volver de una noticia sea instantáneo. El TTL
// evita servir contenido viejo: al vencer, se vuelve a pedir a la API. El caché
// se borra solo al cerrar la pestaña (naturaleza de sessionStorage).
const CACHE_KEY = "ssr:contenido";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/** Caché en memoria del propio request en curso: evita llamadas duplicadas. */
let inFlight: Promise<DynamicContent> | null = null;

function readCache(): DynamicContent | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { t, data } = JSON.parse(raw) as { t: number; data: DynamicContent };
    if (Date.now() - t > CACHE_TTL_MS) return null; // vencido
    return data;
  } catch {
    return null; // sessionStorage no disponible o JSON corrupto
  }
}

function writeCache(data: DynamicContent): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* modo privado / almacenamiento lleno: seguir sin caché */
  }
}

/** Borra el caché para forzar una lectura fresca en la próxima llamada. */
export function clearContentCache(): void {
  inFlight = null;
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    /* nada que hacer */
  }
}

/**
 * Descarga el contenido dinámico desde la API (Apps Script), con caché de
 * sesión. Pasa `{ force: true }` para saltarse el caché y releer.
 */
export async function fetchDynamicContent(
  options: { force?: boolean } = {},
): Promise<DynamicContent> {
  if (!options.force) {
    const cached = readCache();
    if (cached) return cached;
    if (inFlight) return inFlight; // ya hay una petición en curso: reutilízala
  }

  if (!env.contentApiUrl) {
    throw new Error("PUBLIC_CONTENT_API no está configurada en el .env");
  }

  inFlight = (async () => {
    const res = await fetch(env.contentApiUrl!, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Error ${res.status} al leer el contenido`);
    const data = (await res.json()) as Partial<DynamicContent>;
    const content: DynamicContent = {
      galeria: data.galeria ?? [],
      videos: data.videos ?? [],
      biblioteca: data.biblioteca ?? [],
      noticias: data.noticias ?? [],
    };
    writeCache(content);
    return content;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}
