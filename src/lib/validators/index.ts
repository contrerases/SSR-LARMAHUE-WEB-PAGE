/**
 * Validadores de datos ligeros (solo build, sin dependencias).
 * Sustituyen a zod para el chequeo del contenido: un dato mal formado detiene
 * la compilación con un mensaje claro, en vez de publicarse en silencio.
 *
 * Son funciones de aserción: si fallan, lanzan; si pasan, TypeScript estrecha el tipo.
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(`Contenido inválido: ${message}`);
    this.name = "ValidationError";
  }
}

/** Lanza ValidationError con `message` si `condition` es falsa. */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new ValidationError(message);
}

/** Cadena no vacía (ignorando espacios). */
export function nonEmpty(value: unknown, field: string): asserts value is string {
  assert(typeof value === "string" && value.trim().length > 0, `${field} no puede estar vacío`);
}

/** Cadena con longitud mínima. */
export function minLength(value: unknown, min: number, field: string): asserts value is string {
  assert(
    typeof value === "string" && value.trim().length >= min,
    `${field} debe tener al menos ${min} caracteres`,
  );
}

/** Email con formato válido. */
export function email(value: unknown, field: string): asserts value is string {
  assert(
    typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
    `${field} no es un email válido`,
  );
}

/** URL absoluta válida. */
export function url(value: unknown, field: string): asserts value is string {
  let ok = false;
  if (typeof value === "string") {
    try {
      new URL(value);
      ok = true;
    } catch {
      ok = false;
    }
  }
  assert(ok, `${field} no es una URL válida`);
}

/** Entero mayor o igual que `min`. */
export function integerMin(value: unknown, min: number, field: string): asserts value is number {
  assert(
    typeof value === "number" && Number.isInteger(value) && value >= min,
    `${field} debe ser un entero ≥ ${min}`,
  );
}

/** Valor dentro de un conjunto permitido (p. ej. un catálogo de iconos). */
export function oneOf(
  value: unknown,
  allowed: readonly string[],
  field: string,
): asserts value is string {
  assert(
    typeof value === "string" && allowed.includes(value),
    `${field}="${String(value)}" no es válido (permitidos: ${allowed.join(", ")})`,
  );
}

/** Array no vacío. */
export function nonEmptyArray<T>(value: unknown, field: string): asserts value is T[] {
  assert(Array.isArray(value) && value.length > 0, `${field} debe ser una lista no vacía`);
}
