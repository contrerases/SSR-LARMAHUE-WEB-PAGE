/**
 * Paginador cliente genérico y reutilizable.
 *
 * Divide `items` en páginas de `pageSize`, delega el dibujo de cada página en
 * `renderPage` (que debe limpiar y rellenar su contenedor) y construye los
 * controles (anterior · números · siguiente) dentro de `controls`, con clases
 * Tailwind del sistema de diseño. Si hay una sola página, oculta los controles.
 *
 *   createPager({
 *     items,
 *     pageSize: 9,
 *     controls: document.getElementById("galeria-pager")!,
 *     scrollTarget: document.getElementById("galeria")!,
 *     renderPage: (pageItems) => { grid.replaceChildren(...pageItems.map(card)); },
 *   });
 */
export interface PagerOptions<T> {
  items: T[];
  pageSize: number;
  controls: HTMLElement;
  renderPage: (pageItems: T[], page: number) => void;
  /** Si se indica, al cambiar de página se hace scroll suave hasta aquí. */
  scrollTarget?: HTMLElement | null;
}

const CHEVRON_LEFT =
  '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
const CHEVRON_RIGHT =
  '<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

const BTN_BASE =
  "grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-40";

export function createPager<T>(opts: PagerOptions<T>): void {
  const { items, pageSize, controls, renderPage, scrollTarget } = opts;
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  let current = 1;

  const slice = (page: number): T[] => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  };

  /** Ventana compacta de números con elipsis: 1 … 4 5 6 … 12 */
  const pageNumbers = (): (number | "…")[] => {
    const out: (number | "…")[] = [];
    for (let n = 1; n <= pages; n++) {
      if (n === 1 || n === pages || Math.abs(n - current) <= 1) out.push(n);
      else if (out[out.length - 1] !== "…") out.push("…");
    }
    return out;
  };

  const makeBtn = (
    html: string,
    o: { disabled?: boolean; active?: boolean; aria?: string; onClick?: () => void },
  ): HTMLButtonElement => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = html;
    b.className =
      BTN_BASE +
      (o.active
        ? " bg-primary text-white shadow-card"
        : " bg-secondary text-foreground hover:bg-primary/10");
    if (o.aria) b.setAttribute("aria-label", o.aria);
    if (o.active) b.setAttribute("aria-current", "page");
    if (o.disabled) b.disabled = true;
    if (o.onClick) b.addEventListener("click", o.onClick);
    return b;
  };

  const build = () => {
    controls.innerHTML = "";
    if (pages <= 1) {
      controls.style.display = "none"; // una sola página: sin controles
      return;
    }
    controls.style.display = "flex";

    controls.appendChild(
      makeBtn(CHEVRON_LEFT, {
        disabled: current === 1,
        aria: "Página anterior",
        onClick: () => go(current - 1, true),
      }),
    );

    for (const n of pageNumbers()) {
      if (n === "…") {
        const span = document.createElement("span");
        span.textContent = "…";
        span.className = "grid h-10 w-6 place-items-center text-muted-foreground";
        controls.appendChild(span);
      } else {
        controls.appendChild(
          makeBtn(String(n), {
            active: n === current,
            aria: `Página ${n}`,
            onClick: () => go(n, true),
          }),
        );
      }
    }

    controls.appendChild(
      makeBtn(CHEVRON_RIGHT, {
        disabled: current === pages,
        aria: "Página siguiente",
        onClick: () => go(current + 1, true),
      }),
    );
  };

  const go = (page: number, scroll = false) => {
    current = Math.max(1, Math.min(page, pages));
    renderPage(slice(current), current);
    build();
    if (scroll && scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  go(1); // render inicial sin scroll
}
