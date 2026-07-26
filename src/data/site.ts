/**
 * Datos institucionales del Servicio Sanitario Rural Larmahue.
 * FUENTE ÚNICA de datos de la organización (contacto, enlaces, ubicación).
 * Fiel al sitio original (ssrlarmahue.cl).
 */
export const siteData = {
  name: "SSR Larmahue",
  fullName: "Servicio Sanitario Rural Larmahue",
  slogan: "El agua nos mueve",
  mission:
    "Integrar el consumo responsable del agua con comportamientos respetuosos hacia el medioambiente y a las personas.",

  location: {
    address: "Larmahue s/n",
    commune: "Pichidegua",
    region: "Región de O'Higgins",
    country: "Chile",
  },

  contact: {
    officePhone: "938646480",
    emergencyPhone: "+56 992261976",
    email: "comitelarmahue@gmail.com",
  },

  /**
   * Sistemas externos. El token es de EMPRESA (público) y solo abre la pantalla
   * de acceso; no expone datos de usuarios.
   *  - oficinaVirtual: app PHP en el MISMO servidor (/ov/). No se toca, solo se enlaza.
   *  - pagoEnLinea: pasarela EXTERNA (gestionelectronica.cl / Webpay).
   */
  services: {
    oficinaVirtual:
      "https://www.ssrlarmahue.cl/ov/index.php?token=1534b76d325a8f591b52d302e7181331",
    pagoEnLinea:
      "https://www.gestionelectronica.cl/ingreso_emp4/consulta/form-contrato.php?token=1534b76d325a8f591b52d302e7181331",
  },

  credits: {
    developer: "Asesora SpA",
    year: 2026,
  },
} as const;
