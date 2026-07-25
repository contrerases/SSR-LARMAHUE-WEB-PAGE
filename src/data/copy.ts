/**
 * TEXTOS de la interfaz, centralizados por sección.
 * Aquí se edita toda la microcopia del sitio. Soporta plantillas con {variable}
 * (se interpolan con lib/formatters → interpolate). Fiel al sitio original.
 */
export const copyData = {
  hero: {
    eyebrow: "El agua nos mueve",
    titleLines: ["El agua", "nos mueve"],
  },
  services: {
    eyebrow: "Accesos",
    title: "Todo fluye desde aquí",
  },
  commitment: {
    eyebrow: "Nuestro compromiso",
  },
  leak: {
    title: "¿Detectaste una fuga o desperfecto?",
    body: "Infórmanos al fono {officePhone} y pasaremos a revisar.",
    cta: "Avisar ahora",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos",
    subtitle:
      "Escríbenos con el formulario o comunícate con la oficina. En caso de emergencia, usa el WhatsApp.",
    form: {
      name: "Nombre",
      phone: "Teléfono",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: "¡Gracias! Tu mensaje fue enviado. Te responderemos a la brevedad.",
      error: "No se pudo enviar. Inténtalo de nuevo o escríbenos a nuestro correo.",
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
  },
  whatsapp: {
    defaultMessage:
      "Hola, necesito ayuda con el servicio de agua potable de Larmahue.",
  },
} as const;
