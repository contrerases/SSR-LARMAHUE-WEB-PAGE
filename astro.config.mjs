// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Dominio final del sitio (ajústalo si cambia).
  site: "https://www.ssrlarmahue.cl",

  // Genera sitemap-index.xml + sitemap-0.xml en el build.
  integrations: [sitemap()],

  // Variables de entorno tipadas y validadas (astro:env).
  // PUBLIC_ = accesible en el navegador (el contenido se lee en runtime).
  env: {
    schema: {
      // URL del Web App de Google Apps Script (contenido dinámico Sheets + Drive).
      PUBLIC_CONTENT_API: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      // Clave de acceso de Web3Forms para el formulario de contacto (pública).
      PUBLIC_WEB3FORMS_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },

  // Salida 100% estática: genera HTML/CSS/JS en `dist/`, sin runtime de Node.
  // Ideal para subir a un Apache (mismo servidor actual) o a Cloudflare/Netlify.
  output: "static",

  // URLs con barra final consistente (evita rutas rotas al desplegar en subcarpetas).
  trailingSlash: "ignore",

  // Tailwind v4 se integra como plugin de Vite (ya no vía @astrojs/tailwind).
  vite: {
    plugins: [tailwindcss()],
    // No incrustar assets pequeños como data URI (evita el subset de fuente
    // cirílico en el CSS crítico; se emite como archivo con unicode-range).
    build: { assetsInlineLimit: 0 },
  },
});
