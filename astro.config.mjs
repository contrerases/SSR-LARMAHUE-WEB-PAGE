// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Dominio final del sitio (ajústalo si cambia).
  site: "https://www.ssrlarmahue.cl",

  // Salida 100% estática: genera HTML/CSS/JS en `dist/`, sin runtime de Node.
  // Ideal para subir a un Apache (mismo servidor actual) o a Cloudflare/Netlify.
  output: "static",

  // URLs con barra final consistente (evita rutas rotas al desplegar en subcarpetas).
  trailingSlash: "ignore",

  // Tailwind v4 se integra como plugin de Vite (ya no vía @astrojs/tailwind).
  vite: {
    plugins: [tailwindcss()],
  },
});
