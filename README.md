# SSR Larmahue · Sitio web institucional

Sitio web del **Servicio Sanitario Rural Larmahue** (Pichidegua, Región de O'Higgins,
Chile). Es una página **informativa** ("de solo lectura"): muestra información del
comité y enlaza a los sistemas externos de **Oficina Virtual** y **Pago en Línea**.

Está construido con **[Astro](https://astro.build)** (genera un sitio **estático**:
solo archivos HTML/CSS/JS, sin servidor propio) y **[Tailwind CSS v4](https://tailwindcss.com)**.
El diseño se llama **"El Agua nos Mueve"**.

Además tiene dos sistemas que permiten al comité gestionar cosas **sin tocar código**:

- 📸 **Contenido dinámico** (galería, videos, biblioteca, noticias) desde un Google Sheet → ver [`docs/config-content`](./docs/config-content/README.md).
- ✉️ **Formulario de contacto** que envía correos sin servidor → ver [`docs/web3`](./docs/web3/README.md).

---

## Índice

1. [Qué necesitas (requisitos)](#1-qué-necesitas-requisitos)
2. [Cómo levantar el proyecto (paso a paso)](#2-cómo-levantar-el-proyecto-paso-a-paso)
3. [Comandos disponibles](#3-comandos-disponibles)
4. [Variables de entorno (`.env`)](#4-variables-de-entorno-env)
5. [Cómo compilar y publicar el sitio](#5-cómo-compilar-y-publicar-el-sitio)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Convenciones de código](#7-convenciones-de-código)
8. [Documentación adicional](#8-documentación-adicional)

---

## 1. Qué necesitas (requisitos)

- **[Node.js](https://nodejs.org) versión 22 o superior** (el archivo `.nvmrc` indica la versión).
- **npm 10+** (viene incluido con Node.js).

Para comprobar que los tienes, en una terminal:

```bash
node --version
npm --version
```

---

## 2. Cómo levantar el proyecto (paso a paso)

1. **Instala las dependencias** (solo la primera vez, o cuando cambien):

   ```bash
   npm install
   ```

2. **Crea tu archivo de configuración** copiando la plantilla:

   ```bash
   cp .env.example .env
   ```

   Luego abre `.env` y completa los valores (ver [sección 4](#4-variables-de-entorno-env)).
   Sin esto, el contenido dinámico y el formulario de contacto no funcionarán, pero el
   resto del sitio sí.

3. **Arranca el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Abre en el navegador **http://localhost:4321**. Los cambios que hagas en el código se
   reflejan solos (recarga automática).

---

## 3. Comandos disponibles

| Comando            | Qué hace                                                    |
| ------------------ | ----------------------------------------------------------- |
| `npm install`      | Instala las dependencias del proyecto.                      |
| `npm run dev`      | Servidor de desarrollo en `http://localhost:4321`.          |
| `npm run build`    | **Compila** el sitio final a la carpeta `dist/`.            |
| `npm run preview`  | Muestra cómo quedó el `build` (como se verá publicado).     |
| `npm run check`    | Revisa que no haya errores de tipos (TypeScript / Astro).   |
| `npm run format`   | Ordena/formatea el código con Prettier.                     |

> Tras editar el archivo `.env`, **reinicia** `npm run dev` para que tome los cambios.

---

## 4. Variables de entorno (`.env`)

El archivo `.env` (en la raíz) guarda la configuración que **no** va escrita en el código.
**No se sube al repositorio** (está en `.gitignore`). Usa `.env.example` como plantilla.

| Variable | Para qué sirve | Guía |
| --- | --- | --- |
| `PUBLIC_CONTENT_API` | URL del Google Apps Script que entrega el contenido (galería, videos, biblioteca, noticias). | [`docs/config-content`](./docs/config-content/README.md) |
| `PUBLIC_WEB3FORMS_KEY` | Clave de Web3Forms para el formulario de contacto. | [`docs/web3`](./docs/web3/README.md) |

> El prefijo `PUBLIC_` significa que la variable se usa en el navegador. **No** guardes
> secretos ahí: ambas variables son públicas por diseño (ver las guías).

---

## 5. Cómo compilar y publicar el sitio

El sitio es **estático**, así que "publicar" es simplemente subir archivos a un servidor.

1. **Compila:**

   ```bash
   npm run build
   ```

   Esto genera la carpeta **`dist/`** con todo el sitio (HTML, CSS, JS, imágenes optimizadas).

   > ⚠️ El archivo `.env` debe existir **en la máquina donde compilas**, porque sus valores
   > se "hornean" dentro del sitio al compilar.

2. **Publica** el contenido de `dist/` en el servidor:
   - **Apache** (el hosting actual): sube el contenido de `dist/` a la carpeta pública,
     **sin tocar** la carpeta `/ov/` (la Oficina Virtual, que es un sistema aparte). El
     proyecto ya incluye un `public/.htaccess` que se copia al `dist/`.
   - O cualquier **hosting estático** (Cloudflare Pages, Netlify, Vercel), apuntando el
     comando de build a `npm run build` y la carpeta de salida a `dist/`.

---

## 6. Estructura del proyecto

```
.
├── docs/                      # 📚 Guías de configuración (leer estas)
│   ├── config-content/        #    Contenido dinámico (Sheets + Drive + Apps Script)
│   └── web3/                  #    Formulario de contacto (Web3Forms)
├── public/                    # Archivos que se copian tal cual (favicon, og-image, robots.txt, .htaccess)
├── src/
│   ├── pages/                 # Una página del sitio por archivo:
│   │   ├── index.astro        #    Inicio (arma las secciones)
│   │   ├── galeria.astro  videos.astro  biblioteca.astro  noticias.astro   # contenido dinámico
│   │   └── boleta.astro       #    "Conozca su boleta"
│   ├── layouts/               # Plantillas base de página (BaseLayout, PageLayout)
│   ├── components/
│   │   ├── ui/                # Sistema de diseño: piezas reutilizables
│   │   │   ├── Button/  Badge/  GlassCard/  Icon/  NoticeBar/     # con variantes (tailwind-variants)
│   │   │   ├── MediaLightbox.astro   # visor de imágenes/videos
│   │   │   ├── WaterLoader.astro     # cargador con temática de agua
│   │   │   └── …                     # Bubbles, WaveDivider, WhatsappButton, Accordion, …
│   │   ├── sections/          # Secciones de página (Hero, About, Gallery, ContactForm, …)
│   │   └── pages/             # Bloques grandes específicos (BillReceipt = la boleta)
│   ├── data/                  # 📝 FUENTE ÚNICA de textos y datos del sitio
│   │   ├── site.ts            #    datos del comité (contacto, enlaces, ubicación)
│   │   ├── navigation.ts  resources.ts  copy.ts    # menús, accesos, microcopia
│   │   ├── pages/             #    textos de páginas (nosotros, boleta)
│   │   └── index.ts           #    valida y exporta `content`  →  import { content } from "@/data"
│   ├── types/                 # Tipos TypeScript del contenido
│   ├── lib/                   # Utilidades
│   │   ├── content-api.ts     #    lee el contenido dinámico (Sheets/Drive) + caché
│   │   ├── pager.ts           #    paginación reutilizable
│   │   ├── cn.ts  formatters.ts       # clases CSS, formateo de teléfonos/enlaces
│   │   └── validators/        #    validación del contenido (rompe el build si algo está mal)
│   ├── config/               # Lectura de variables de entorno (env.ts)
│   ├── assets/images/        # Imágenes locales (optimizadas por Astro)
│   └── styles/global.css     # Tailwind v4 + colores/tokens del tema "Agua"
├── .env                       # configuración local (NO se versiona)
├── .env.example               # plantilla de .env
└── astro.config.mjs           # configuración de Astro
```

### Cómo se organizan los textos y datos

- El sitio tiene **dos tipos de contenido**:
  - **Fijo** (textos, menús, datos del comité): vive en `src/data/` y se importa con
    `import { content } from "@/data"`. Cambiar un texto = editar un solo archivo.
  - **Dinámico** (galería, videos, biblioteca, noticias): vive en un **Google Sheet** y
    se lee en tiempo real → [`docs/config-content`](./docs/config-content/README.md).

---

## 7. Convenciones de código

- **Textos y datos** nunca se escriben dentro de los componentes: van en `src/data/` (`@/data`).
- **Validación:** `src/data/index.ts` valida el contenido al compilar con validadores
  propios y ligeros (`src/lib/validators/`). Un dato inválido (email/URL mal escrito,
  campo vacío) **rompe el build**, no la web publicada.
- **Variantes de componentes:** los componentes con variaciones usan
  [`tailwind-variants`](https://www.tailwind-variants.org) en un archivo `*.variants.ts`
  junto al componente. Las clases se combinan con `cn()`.
- **Colores por tokens:** se usan clases semánticas (`bg-background`, `bg-primary`,
  `bg-card`, `text-muted-foreground`, `bg-action-ov`, `bg-action-pago`…), definidas en
  `src/styles/global.css`. El sitio tiene **un solo tema** (claro).
- **Atajo de importación:** `@/` equivale a `src/` (ej: `@/components/ui`).

---

## 8. Documentación adicional

| Guía | Contenido |
| --- | --- |
| 📸 [`docs/config-content`](./docs/config-content/README.md) | Cómo el comité publica **galería, videos, biblioteca y noticias** desde Google Sheets + Drive, y cómo el sitio lo consume. |
| ✉️ [`docs/web3`](./docs/web3/README.md) | Cómo funciona el **formulario de contacto** (Web3Forms), cómo configurarlo y cambiar el correo destino. |

---

## Créditos

Desarrollado para el Servicio Sanitario Rural Larmahue. Sistemas externos enlazados:
Oficina Virtual (mismo servidor, `/ov/`) y Pago en Línea (pasarela externa).
