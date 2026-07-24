# SSR Larmahue · Sitio institucional

Landing de **solo lectura** del Servicio Sanitario Rural Larmahue, construida con
**Astro (salida estática) + Tailwind CSS v4**. No tiene backend: es HTML/CSS/JS
compilado, con enlaces a los dos sistemas existentes (Oficina Virtual y Pago en Línea).

## Requisitos

- Node.js 22+ (ver `.nvmrc`)
- npm 10+

## Comandos

| Comando            | Acción                                             |
| ------------------ | -------------------------------------------------- |
| `npm install`      | Instala dependencias                               |
| `npm run dev`      | Servidor de desarrollo en `http://localhost:4321`  |
| `npm run build`    | Compila el sitio estático a `dist/`                |
| `npm run preview`  | Previsualiza el build de `dist/` localmente        |
| `npm run check`    | Chequeo de tipos/diagnósticos de Astro             |
| `npm run format`   | Formatea el código con Prettier                    |

## Estructura

```
src/
├── assets/       # imágenes procesadas por astro:assets (optimización automática)
├── components/   # componentes .astro reutilizables
├── config/
│   └── site.ts   # textos, contacto y enlaces (Oficina Virtual / Pago en Línea)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css  # Tailwind v4 + tokens de diseño
public/            # archivos servidos tal cual (favicon, robots, etc.)
```

## Despliegue

La salida es **estática** (`output: "static"`). Tras `npm run build`, el contenido de
`dist/` se puede subir tal cual a:

- **El Apache actual** (mismo servidor de Asesora) — sin tocar la carpeta `/ov/`
  (Oficina Virtual) ni la pasarela de pago externa.
- O un hosting estático (Cloudflare Pages, Netlify, Vercel) si se controla el DNS.

## Enlaces a sistemas externos

Definidos en [`src/config/site.ts`](src/config/site.ts):

- **Oficina Virtual** → `ssrlarmahue.cl/ov/` (app PHP, mismo servidor).
- **Pago en Línea** → `gestionelectronica.cl` (pasarela externa / Webpay).

Ambos usan un token de **empresa** (público) que solo abre la pantalla de acceso.

## Hoja de ruta

1. ✅ **Base del proyecto** (Astro + Tailwind + config)
2. ⬜ Estructura y patrones de diseño (componentes, secciones)
3. ⬜ Estilo UI/UX (paleta, tipografía, sistema visual)
4. ⬜ Construcción de los módulos
