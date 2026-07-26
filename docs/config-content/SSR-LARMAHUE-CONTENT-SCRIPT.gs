/**
 * SSR-LARMAHUE-CONTENT-SCRIPT
 * API de contenido del sitio SSR Larmahue (Google Apps Script).
 *
 * Lee las pestañas de un Google Sheet y las devuelve como JSON, para que el sitio
 * (Astro) muestre galería, videos, biblioteca y noticias sin tocar código.
 *
 * Despliegue paso a paso: ver config-content/README.md.
 */

// ⚙️ ID del Sheet: cópialo de la URL  .../spreadsheets/d/ESTE_ID/edit
const SHEET_ID = "REEMPLAZA_CON_EL_ID_DE_TU_SHEET";

// Clave en el JSON (minúscula)  ->  nombre real de la pestaña en el Sheet (MAYÚSCULA).
const TABS = {
  galeria: "GALERIA",
  videos: "VIDEOS",
  biblioteca: "BIBLIOTECA",
  noticias: "NOTICIAS",
};

/** Punto de entrada del Web App (GET). Devuelve todo el contenido en JSON. */
function doGet() {
  const output = {};
  for (const key in TABS) output[key] = readSheet(TABS[key]);

  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * Lee una pestaña y devuelve un array de objetos {columna: valor}.
 * - La fila 1 (encabezados en MAYÚSCULA) se pasa a minúsculas para las claves JSON.
 * - Ignora filas cuya columna PUBLICADO no sea verdadera.
 */
function readSheet(name) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h).trim().toLowerCase());

  return values
    .slice(1)
    .map((row) => {
      const item = {};
      headers.forEach((h, i) => {
        if (h) item[h] = typeof row[i] === "string" ? row[i].trim() : row[i];
      });
      return item;
    })
    .filter(isPublished)
    .filter((item) => Object.values(item).some((v) => v !== "" && v != null));
}

/** ¿La fila está publicada? (columna PUBLICADO = TRUE/SÍ/1/X, o sin esa columna). */
function isPublished(item) {
  if (!("publicado" in item)) return true;
  if (item.publicado === true) return true;
  const s = String(item.publicado).trim().toUpperCase();
  return s === "TRUE" || s === "SI" || s === "SÍ" || s === "1" || s === "X";
}

/* ------------------------------------------------------------------ *
 * (OPCIONAL) Auto-listar una carpeta de Drive en lugar de columnas.
 * Comparte la carpeta como "Cualquiera con el enlace" y usa su ID.
 * Devuelve [{ id, name, url }]. Puedes llamarlo desde readSheet/doGet.
 * ------------------------------------------------------------------ */
function listFolder(folderId) {
  const files = DriveApp.getFolderById(folderId).getFiles();
  const out = [];
  while (files.hasNext()) {
    const f = files.next();
    out.push({ id: f.getId(), name: f.getName(), url: f.getUrl() });
  }
  return out;
}
