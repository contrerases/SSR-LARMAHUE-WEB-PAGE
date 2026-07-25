# SSR Larmahue · Sitio institucional

Landing **de solo lectura** del Servicio Sanitario Rural Larmahue, construida con
**Astro (estático) + Tailwind CSS v4**. Diseño **"El Agua nos Mueve"**. Sin backend:
HTML/CSS/JS compilado, con enlaces a Oficina Virtual y Pago en Línea.

## Requisitos

- Node.js 22+ (ver `.nvmrc`) · npm 10+

## Comandos

| Comando           | Acción                                            |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Instala dependencias                              |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build`   | Compila el sitio estático a `dist/`               |
| `npm run preview` | Previsualiza el build                             |
| `npm run check`   | Chequeo de tipos (astro check)                    |
| `npm run format`  | Formatea con Prettier                             |

## Arquitectura

```
src/
├── content/            # ← FUENTE ÚNICA de datos y textos (centralizado)
│   ├── site.ts         #    datos institucionales, contacto, enlaces
│   ├── navigation.ts   #    menús
│   ├── resources.ts    #    accesos (Galería, Videos, Biblioteca, Boleta)
│   ├── copy.ts         #    microcopia de la UI por sección
│   ├── schema.ts       #    esquemas zod (VALIDAN el contenido en build)
│   └── index.ts        #    valida y exporta `content` tipado  →  import { content } from "@/content"
├── lib/                # utilidades puras
│   ├── cn.ts           #    merge de clases (clsx + tailwind-merge)
│   ├── formatters.ts   #    teléfonos CL, tel/mailto/whatsapp, interpolación
│   └── index.ts
├── components/
│   ├── ui/             # DESIGN SYSTEM (primitivas)
│   │   ├── Button/     #    componentes con variantes → carpeta con *.variants.ts (tailwind-variants)
│   │   ├── Badge/  GlassCard/  NoticeBar/  Icon/
│   │   ├── Container.astro  Section.astro  ContactItem.astro  …  (primitivas simples)
│   │   └── index.ts    #    barril:  import { Button, GlassCard, Icon } from "@/components/ui"
│   └── sections/       # secciones compuestas de la página (consumen content + ui + lib)
│       ├── SiteHeader  Hero  ServicesGrid  Commitment  ContactSection  SiteFooter
│       └── index.ts
├── layouts/BaseLayout.astro
├── pages/index.astro   # composición de secciones
└── styles/global.css   # Tailwind v4 + tokens semánticos (tema Agua, claro/oscuro)
```

### Convenciones

- **Texto y datos**: nunca se escriben en los componentes. Todo vive en `src/content/`
  y se importa desde `@/content`. Cambiar un texto = editar un solo archivo.
- **Validación**: `content/index.ts` valida con zod al cargar → un dato inválido
  (email/URL mal formado, campo vacío) **rompe el build**, no producción.
- **Variantes**: los componentes con variaciones usan `tailwind-variants` en un
  archivo `*.variants.ts` co-localizado. Se combinan clases con `cn()`.
- **Tokens semánticos**: los componentes usan `bg-background`, `bg-primary`,
  `bg-card`, `bg-action-ov`, `bg-action-pago`, `text-muted-foreground`, etc.
  El tema claro/oscuro se resuelve sobreescribiendo variables en `global.css`.
- **Alias de importación**: `@/*` → `src/*`.

## Despliegue

Salida **estática**. Tras `npm run build`, subir `dist/` al Apache actual (sin tocar
`/ov/`) o a un hosting estático (Cloudflare Pages / Netlify / Vercel).

## Pendiente de contenido

Las páginas "Quiénes Somos" y "Misión y Visión" están **vacías en el sitio original**
(solo título). El comité debe aportar ese texto; se añadirá a `src/content/`.
