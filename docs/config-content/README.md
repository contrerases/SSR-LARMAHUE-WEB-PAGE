# Contenido dinámico · Google Sheets + Drive + Apps Script

Esta guía explica, **paso a paso y sin dar nada por sabido**, cómo el comité publica
**galería, videos, biblioteca de documentos y noticias** desde un Google Sheet, sin
tocar el código del sitio. Al final se explica también **cómo el sitio usa esos datos**
por dentro, por si alguien técnico necesita darle mantención.

> **En una frase:** tú escribes en un Google Sheet, el sitio lo lee solo y lo muestra.

---

## Contenido de esta carpeta

| Archivo | Para qué sirve |
| --- | --- |
| [`plantilla-contenido.xlsx`](./plantilla-contenido.xlsx) | Excel base (con pestañas y menús ya listos) para subir a Google Drive y abrir como Sheet. |
| [`SSR-LARMAHUE-CONTENT-SCRIPT.gs`](./SSR-LARMAHUE-CONTENT-SCRIPT.gs) | Código del Google Apps Script que convierte el Sheet en datos que el sitio entiende (JSON). |
| `README.md` | Esta guía. |

---

## 1. La idea general (cómo encajan las piezas)

Son **tres piezas** trabajando juntas:

```
  ┌───────────────┐      ┌───────────────┐      ┌──────────────────┐      ┌────────────┐
  │  GOOGLE SHEET │      │  GOOGLE DRIVE │      │   APPS SCRIPT    │      │  EL SITIO  │
  │  (la lista)   │      │ (los archivos)│      │  (el traductor)  │      │  (la web)  │
  ├───────────────┤      ├───────────────┤      ├──────────────────┤      ├────────────┤
  │ 1 fila =      │      │ fotos, PDF,   │      │ lee el Sheet y   │      │ pide el    │
  │ 1 elemento    │─────▶│ Word, Excel   │◀─────│ lo entrega como  │─────▶│ JSON y lo  │
  │ (título,      │      │ (compartidos  │      │ JSON en una URL  │      │ muestra en │
  │  fecha, ...)  │      │  públicamente)│      │ (…/exec)         │      │ pantalla   │
  └───────────────┘      └───────────────┘      └──────────────────┘      └────────────┘
```

- **Google Sheet** = la "base de datos". Cada fila es un elemento (una foto, un video, un documento o una noticia).
- **Google Drive** = donde viven los archivos pesados (fotos, PDFs). En el Sheet solo pones su **identificador**, no el archivo.
- **Apps Script** = un pequeño programa de Google que lee el Sheet y lo publica como **JSON** (un formato de datos) en una dirección web que termina en `/exec`.
- **El sitio** = pide ese JSON cada vez que alguien entra a Galería, Videos, Biblioteca o Noticias, y lo dibuja.

> **Mayúsculas / minúsculas:** en el Sheet las pestañas y columnas van en **MAYÚSCULA**
> (se ven ordenadas). El script las entrega en **minúscula** para el código
> (`titulo`, `driveid`…). Tú solo te preocupas del Sheet.

---

## 2. Crear el Sheet desde la plantilla

1. Sube [`plantilla-contenido.xlsx`](./plantilla-contenido.xlsx) a tu Google Drive.
2. Ábrelo con **Hojas de cálculo de Google** (clic derecho → *Abrir con → Hojas de cálculo de Google*).
3. Verás 5 pestañas abajo: `INSTRUCCIONES`, `GALERIA`, `VIDEOS`, `BIBLIOTECA`, `NOTICIAS`.
4. **No cambies** los nombres de las pestañas ni el texto de la **fila 1** (los títulos de columna). El script los busca por ese nombre exacto.
5. Copia el **ID del Sheet** desde la barra de direcciones — es el trozo entre `/d/` y `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`

### Qué columna va en cada pestaña

| Pestaña | Columnas (fila 1, en MAYÚSCULA) |
| --- | --- |
| `GALERIA` | `TITULO`, `DESCRIPCION`, `DRIVEID`, `FECHA`, `PUBLICADO` |
| `VIDEOS` | `TITULO`, `DESCRIPCION`, `YOUTUBEURL`, `FECHA`, `PUBLICADO` |
| `BIBLIOTECA` | `TITULO`, `DESCRIPCION`, `CATEGORIA`, `FORMATO`, `DRIVEID`, `FECHA`, `PUBLICADO` |
| `NOTICIAS` | `TITULO`, `SLUG`, `RESUMEN`, `CUERPO`, `IMAGENDRIVEID`, `FECHA`, `PUBLICADO` |

Reglas de las columnas:

- **`PUBLICADO`** → `TRUE` = se muestra, `FALSE` = se oculta. En la plantilla es un menú desplegable. Si escribes en una fila nueva sin el menú, escribe a mano `TRUE` (también valen `SI`, `1` o `X`).
- **`DRIVEID` / `IMAGENDRIVEID`** → el identificador del archivo en Drive (ver paso 3). **No** es el enlace completo, solo el trozo del ID.
- **`FORMATO`** (solo `BIBLIOTECA`) → `PDF`, `Word`, `Excel` u `Otro` (menú desplegable).
- **`YOUTUBEURL`** (solo `VIDEOS`) → el enlace normal de YouTube (`https://www.youtube.com/watch?v=…` o `https://youtu.be/…`).
- **`SLUG`** (solo `NOTICIAS`) → un nombre corto sin espacios ni tildes que identifica la noticia en la dirección web (ej: `corte-programado-enero`). Debe ser **único**.
- **`FECHA`** → formato `AAAA-MM-DD` (ej: `2026-01-20`).

> **¿Cuántas filas puedo tener?** Las que quieras. El script lee **todas** las filas
> con datos, tengan o no el menú desplegable. La fila 101, 500 o 1000 se leen igual.

---

## 3. Subir y **compartir** los archivos en Drive

1. Sube tus fotos y documentos (PDF, Word, Excel) a Google Drive.
2. Por **cada archivo**: clic derecho → *Compartir* → cambia el acceso a
   **"Cualquiera con el enlace"** (rol: *Lector*). **Esto es obligatorio**, o el
   navegador de los visitantes no podrá mostrar la imagen ni abrir el documento.
3. Para obtener el **DRIVEID**: abre el archivo, mira la dirección
   `https://drive.google.com/file/d/`**`ESTE_ES_EL_DRIVEID`**`/view` y copia ese trozo
   a la columna `DRIVEID` (o `IMAGENDRIVEID` en noticias).
4. **Videos:** no se suben a Drive. Súbelos a **YouTube** y pega su enlace en `YOUTUBEURL`.

> El **Sheet** no necesita ser público (el script lo lee "como tú"). Los **archivos de
> Drive sí** deben ser públicos.

---

## 4. Crear el Apps Script (el traductor)

1. Dentro del Sheet: menú **Extensiones → Apps Script**.
2. Ponle nombre al proyecto arriba a la izquierda: **`SSR-LARMAHUE-CONTENT-SCRIPT`**.
3. Borra el código de ejemplo y **pega** el de
   [`SSR-LARMAHUE-CONTENT-SCRIPT.gs`](./SSR-LARMAHUE-CONTENT-SCRIPT.gs).
4. En la línea `const SHEET_ID = "…"`, reemplaza el texto por el **ID del Sheet** (paso 2).
5. Guarda con el icono 💾.

## 5. Publicarlo como aplicación web

1. Botón **Implementar → Nueva implementación**.
2. En el engranaje ⚙️ elige el tipo: **Aplicación web**.
3. Configura: *Ejecutar como:* **Yo** · *Quién tiene acceso:* **Cualquier usuario**.
4. **Implementar** → Google pedirá **autorizar permisos**: acepta con tu cuenta (*Permitir*).
5. Copia la **URL de la aplicación web** (termina en `/exec`). La necesitas en el paso 6.

## 6. Conectarlo al sitio

En la **raíz del proyecto** hay un archivo `.env`. Pega ahí la URL:

```bash
PUBLIC_CONTENT_API=https://script.google.com/macros/s/AKfycb.../exec
```

Reinicia el servidor (`npm run dev`) o vuelve a compilar (`npm run build`).
Para comprobar que funciona, abre esa URL `/exec` en el navegador: debe devolver un
texto JSON con `galeria`, `videos`, `biblioteca` y `noticias`.

---

## 7. Día a día: publicar contenido nuevo

1. Sube el archivo a Drive y **compártelo** como "Cualquiera con el enlace".
2. Copia su **DRIVEID** y agrega una **fila nueva** en la pestaña correspondiente.
3. Pon `PUBLICADO = TRUE`.
4. Listo. El sitio lo tomará solo (ver la nota de la caché abajo). **No hace falta
   tocar código ni volver a desplegar el Apps Script.**

> **Caché de 5 minutos:** para que el sitio sea rápido, guarda la respuesta durante
> unos minutos en el navegador de cada visitante. Si acabas de publicar algo y no
> aparece al instante, espera unos minutos o abre el sitio en una pestaña nueva.

---

## 8. Cómo interactúa con el código (para quien da mantención)

Esta parte es **técnica**. Explica el recorrido del dato desde el Sheet hasta la pantalla.

### El recorrido de la variable de entorno

```
.env                      →  astro.config.mjs        →  src/config/env.ts       →  src/lib/content-api.ts
PUBLIC_CONTENT_API=…         (valida la variable con     (expone env.contentApiUrl)   (la usa para pedir el JSON)
                             astro:env)
```

- **`.env`** guarda `PUBLIC_CONTENT_API`. El prefijo `PUBLIC_` significa que la
  variable es visible en el navegador (el sitio la lee en tiempo de ejecución).
- **`astro.config.mjs`** la declara en `env.schema` para que esté tipada y validada.
- **`src/config/env.ts`** es el **único** lugar que lee variables de entorno; expone
  `env.contentApiUrl` e `isContentApiConfigured`.

### El adaptador: `src/lib/content-api.ts`

Es el corazón del sistema. Funciones principales:

| Función | Qué hace |
| --- | --- |
| `fetchDynamicContent()` | Pide el JSON a la API y devuelve `{ galeria, videos, biblioteca, noticias }`. **Cachea** la respuesta en `sessionStorage` (clave `ssr:contenido`) durante **5 minutos** para que navegar sea instantáneo. Acepta `{ force: true }` para saltarse la caché. |
| `clearContentCache()` | Borra la caché (por si se quiere un botón de "recargar"). |
| `driveImage(id, ancho)` | Construye la URL de una imagen de Drive: `https://drive.google.com/thumbnail?id=…&sz=w<ancho>`. Drive entrega una versión **reducida** a ese ancho (nunca el original), y **no** agranda más allá del tamaño real. |
| `setDriveImage(img, id, ancho)` | Asigna la imagen a un `<img>` con **reintentos** (Drive a veces tarda en generar la miniatura recién subida) y un **fundido de entrada**. |
| `driveView(id)` / `driveDownload(id)` | URLs para **ver** o **descargar** un documento de Drive (los usa la Biblioteca). |
| `youtubeId(url)` / `youtubeThumb(id)` / `youtubeEmbed(id)` | Extraen el ID de un enlace de YouTube, su miniatura y su URL de reproducción sin cookies. |

### Las páginas que lo consumen

Cada página pide los datos en el navegador y los dibuja. Todas muestran un
**cargador con temática de agua** ([`WaterLoader.astro`](../../src/components/ui/WaterLoader.astro))
mientras llega la respuesta, y un mensaje "Aún no hay…" si la lista viene vacía.

| Página | Archivo | Qué muestra |
| --- | --- | --- |
| Galería | `src/pages/galeria.astro` | Rejilla de imágenes con **paginación** (9 por página) y **visor** al hacer clic ([`MediaLightbox`](../../src/components/ui/MediaLightbox.astro)). |
| Videos | `src/pages/videos.astro` | Miniaturas de YouTube; al hacer clic se abre el video en el visor. Paginación de 6. |
| Biblioteca | `src/pages/biblioteca.astro` | Documentos **agrupados por `CATEGORIA`**, con enlace para ver/descargar. |
| Noticias | `src/pages/noticias.astro` | Lista paginada (9). Al abrir una noticia, muestra el detalle en la misma página usando `?articulo=<SLUG>` de la dirección. |

La **paginación** la genera [`src/lib/pager.ts`](../../src/lib/pager.ts) (`createPager`), reutilizable en todas.

### Tabla: columna del Sheet → clave en el código → dónde se usa

| Columna (Sheet) | Clave (código) | Se usa en |
| --- | --- | --- |
| `TITULO` | `titulo` | Título de la imagen/video/documento/noticia |
| `DESCRIPCION` | `descripcion` | Texto bajo el título |
| `DRIVEID` | `driveid` | `driveImage()` (galería) · `driveView()` (biblioteca) |
| `IMAGENDRIVEID` | `imagendriveid` | Imagen de la noticia |
| `YOUTUBEURL` | `youtubeurl` | `youtubeId()` → miniatura y reproductor |
| `CATEGORIA` | `categoria` | Agrupa los documentos de la Biblioteca |
| `FORMATO` | `formato` | Etiqueta del documento (PDF/Word/Excel) |
| `SLUG` | `slug` | Dirección de la noticia (`/noticias?articulo=<slug>`) |
| `RESUMEN` | `resumen` | Texto corto en la tarjeta de noticia |
| `CUERPO` | `cuerpo` | Texto completo del detalle de la noticia |
| `FECHA` | `fecha` | Ordena y muestra la fecha |
| `PUBLICADO` | `publicado` | El script filtra: solo pasa las filas publicadas |

### Qué hace el Apps Script por dentro

En [`SSR-LARMAHUE-CONTENT-SCRIPT.gs`](./SSR-LARMAHUE-CONTENT-SCRIPT.gs):

- `doGet()` — se ejecuta cuando el sitio pide la URL `/exec`; arma el JSON con las 4 pestañas.
- `readSheet(nombre)` — lee **todas** las filas con datos (`getDataRange()`), pasa los
  títulos de columna a minúscula y descarta filas vacías o no publicadas.
- `isPublished(fila)` — considera publicada si `PUBLICADO` es `TRUE` (o el texto `SI`, `SÍ`, `1`, `X`).

---

## 9. Solución de problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| La imagen no se ve (aparece rota) | El archivo de Drive **no es público** | Compártelo como "Cualquiera con el enlace". |
| Publiqué algo y no aparece | La **caché de 5 min** aún no expira | Espera unos minutos o abre en una pestaña nueva. |
| Una fila no aparece nunca | `PUBLICADO` no es `TRUE` (o hay un error de tipeo) | Revisa esa celda; usa `TRUE`. |
| La página dice "No se pudo cargar" | La URL `/exec` está mal en `.env` o el Apps Script no está desplegado | Revisa el paso 5 y 6; abre la URL `/exec` en el navegador. |
| Una foto recién subida tarda en salir | Drive aún no generó la miniatura | El sitio reintenta solo; suele resolverse en segundos. |

## 10. Actualizar el Apps Script más adelante

Si editas [`SSR-LARMAHUE-CONTENT-SCRIPT.gs`](./SSR-LARMAHUE-CONTENT-SCRIPT.gs):
**Implementar → Gestionar implementaciones → ✏️ (editar) → Versión: Nueva versión →
Implementar**. Así la URL `/exec` **se mantiene igual** y no hay que tocar el `.env`.

---

Para el resto del proyecto (cómo levantarlo, compilar, desplegar), ver el
[README principal](../../README.md). Para el formulario de contacto, ver
[`docs/web3`](../web3/README.md).
