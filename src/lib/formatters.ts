/**
 * Formateadores y constructores de enlaces (puros, testeables).
 * Centralizan el formato de teléfonos chilenos y los href de contacto para que
 * ningún componente arme cadenas a mano.
 */

/** Deja solo dígitos. */
export function onlyDigits(value: string): string {
  return value.replace(/\D+/g, "");
}

/** Normaliza a formato internacional chileno sin símbolos: 56XXXXXXXXX. */
export function toChileanE164Digits(phone: string): string {
  let d = onlyDigits(phone);
  if (d.startsWith("56")) return d;
  return "56" + d;
}

/**
 * Formatea un número chileno para mostrar.
 *  "938646480"      -> "+56 9 3864 6480"
 *  "+56 992261976"  -> "+56 9 9226 1976"
 */
export function formatChileanPhone(phone: string): string {
  let d = onlyDigits(phone);
  if (d.startsWith("56")) d = d.slice(2);
  if (d.length === 9 && d.startsWith("9")) {
    return `+56 9 ${d.slice(1, 5)} ${d.slice(5)}`;
  }
  if (d.length === 8) {
    return `+56 ${d.slice(0, 4)} ${d.slice(4)}`;
  }
  return phone;
}

/** href para marcar (tel:). */
export function telHref(phone: string): string {
  return `tel:+${toChileanE164Digits(phone)}`;
}

/** href para correo (mailto:). */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

/** href de WhatsApp con mensaje opcional. */
export function whatsappHref(phone: string, message?: string): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${toChileanE164Digits(phone)}${query}`;
}

/** Interpola plantillas del tipo "Fono {officePhone}". */
export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
