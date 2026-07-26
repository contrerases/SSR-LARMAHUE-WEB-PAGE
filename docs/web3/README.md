# Formulario de contacto · Web3Forms

Esta guía explica cómo funciona el **formulario de contacto** del sitio, cómo
configurarlo y cómo cambiar el correo que recibe los mensajes. Está pensada para que
**cualquiera pueda entenderlo**, aunque al final hay una sección técnica para mantención.

> **En una frase:** el visitante llena el formulario, y su mensaje llega a un correo
> del comité, **sin necesidad de un servidor propio**.

---

## 1. ¿Qué es Web3Forms y por qué se usa?

El sitio es **estático** (solo archivos HTML/CSS/JS, sin servidor propio que reciba
datos). Para poder recibir mensajes igualmente, usamos **[Web3Forms](https://web3forms.com)**,
un servicio gratuito que hace de intermediario: recibe el formulario y lo reenvía como
correo al comité.

```
  ┌────────────────┐        ┌────────────────────┐        ┌───────────────────────┐
  │  VISITANTE     │        │    WEB3FORMS       │        │   CORREO DEL COMITÉ   │
  │  llena el      │ ─────▶ │  recibe el envío   │ ─────▶ │  llega el mensaje al  │
  │  formulario    │        │  (api.web3forms)   │        │  buzón (Gmail, etc.)  │
  └────────────────┘        └────────────────────┘        └───────────────────────┘
```

Ventajas: gratis (hasta 250 mensajes al mes), sin base de datos, sin mantención de servidor.

---

## 2. La "clave de acceso" (access key)

Web3Forms identifica **a quién enviar los mensajes** mediante una **clave de acceso**
(un código como `00000000-0000-0000-0000-000000000000`). Esa clave está asociada a un
**correo destino**.

> **Importante:** esta clave es **pública por diseño**. Viaja dentro del formulario en el
> navegador, así que **no es un secreto** — cualquiera que mire el código de la página
> puede verla. Lo único que permite es *enviar mensajes a ese correo*, nada más. Por eso
> en el proyecto se guarda como variable `PUBLIC_…`.

### Dónde se guarda la clave

En el archivo **`.env`** de la raíz del proyecto:

```bash
PUBLIC_WEB3FORMS_KEY=00000000-0000-0000-0000-000000000000
```

Así se puede **cambiar el correo destino sin tocar el código**: basta reemplazar la
clave por otra (asociada a otro correo) y volver a compilar.

---

## 3. Cómo obtener o cambiar la clave

1. Entra a **[web3forms.com](https://web3forms.com)**.
2. Escribe el **correo del comité** (ej: `comitelarmahue@gmail.com`) donde quieres recibir los mensajes.
3. Web3Forms te enviará la **clave de acceso** a ese correo (revisa también spam).
4. Pega esa clave en `.env`, en `PUBLIC_WEB3FORMS_KEY`.
5. Reinicia `npm run dev` (o vuelve a compilar con `npm run build`).

> Para **cambiar el correo que recibe los mensajes**, genera una clave nueva con el
> correo nuevo y reemplázala en `.env`. Eso es todo.

---

## 4. Qué conviene configurar en Web3Forms

**Mínimo para que funcione ya:**

- **Confirma el correo destino.** El primer mensaje puede pedir verificación o caer en
  **spam** — revísalo.

**Recomendado antes de publicar el sitio (producción):**

- **Dominios permitidos** *(Allowed Domains)*: restringe la clave a `ssrlarmahue.cl`
  para que nadie más la use. ⚠️ Si activas esto, agrega también `localhost` mientras
  hagas pruebas, o los envíos de prueba fallarán.
- **Protección anti-spam:** el formulario ya trae un "honeypot" (una trampa invisible
  para robots). Si aun así llega spam, activa **hCaptcha** en el panel de Web3Forms
  (habría que añadir el widget al formulario).
- **Autorespuesta** *(Autoresponder)*, opcional: enviar un correo automático de
  "recibimos tu mensaje" al visitante.

**Datos útiles:**

- **Reply-To automático:** cuando el comité responda el correo recibido, la respuesta
  irá directo al correo del visitante (Web3Forms lo toma del campo *email* del formulario).
- **Límite gratis:** 250 mensajes al mes.

---

## 5. Cómo probar que funciona

1. Con la clave puesta en `.env`, levanta el sitio: `npm run dev`.
2. Abre `http://localhost:4321/#contacto`.
3. Llena el formulario y envíalo.
4. Debe aparecer el mensaje de **"mensaje enviado"** y llegar el correo a la cuenta de tu clave.

Mientras Web3Forms no tenga **dominios restringidos**, esto funciona desde `localhost` sin configurar nada más.

---

## 6. Cómo interactúa con el código (para quien da mantención)

### El recorrido de la clave

```
.env                        →  astro.config.mjs      →  src/config/env.ts             →  ContactForm.astro
PUBLIC_WEB3FORMS_KEY=…          (valida la variable      (expone env.web3formsKey e         (la inserta en el
                               con astro:env)            isContactFormConfigured)          formulario)
```

### El formulario: `src/components/sections/ContactForm.astro`

- Lee la clave desde `env.web3formsKey` (no está escrita en el código, viene del `.env`).
- Si la clave **está configurada**, muestra el formulario. Si **falta**, muestra un
  aviso con el **correo directo** (`mailto:`) en lugar de un formulario roto.
- Campos que envía a Web3Forms:
  - `access_key` (la clave), `subject` (asunto fijo), `from_name` (nombre del comité) — campos ocultos.
  - `name`, `email`, `phone`, `subject_user`, `message` — lo que llena el visitante.
  - `botcheck` — el honeypot anti-spam (invisible para personas).
- **Cómo envía:** por JavaScript (`fetch`) a `https://api.web3forms.com/submit`, y muestra
  estados *enviando / enviado / error* sin recargar la página. Si el JavaScript fallara,
  el formulario también funciona con el envío normal del navegador (mejora progresiva).

### Aviso automático

Si al compilar falta `PUBLIC_WEB3FORMS_KEY`, aparece en la terminal:

```
⚠️  Web3Forms: falta PUBLIC_WEB3FORMS_KEY en .env — el formulario de contacto NO enviará correos…
```

---

## 7. Solución de problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| No llega el correo | Cayó en **spam**, o el correo de la clave es otro | Revisa spam; confirma a qué correo apunta la clave. |
| Error "domain not allowed" | Restringiste dominios y falta el actual | Agrega `localhost` (pruebas) y `ssrlarmahue.cl` (producción). |
| Aparece el aviso `mailto` en vez del formulario | Falta `PUBLIC_WEB3FORMS_KEY` en `.env` | Agrega la clave y reinicia/recompila. |
| Llega mucho spam | Bots saltándose el honeypot | Activa hCaptcha en el panel de Web3Forms. |

---

## 8. Al pasar a producción

- La clave se **hornea en el sitio al compilar** (`npm run build`). Por eso el archivo
  `.env` con `PUBLIC_WEB3FORMS_KEY` debe existir **en la máquina que hace el build**
  (quien despliegue el sitio).
- Usa una clave asociada al **correo oficial del comité** y restringe el dominio a `ssrlarmahue.cl`.

---

Para el resto del proyecto (cómo levantarlo, compilar, desplegar), ver el
[README principal](../../README.md). Para el contenido dinámico (galería, videos,
biblioteca, noticias), ver [`docs/config-content`](../config-content/README.md).
