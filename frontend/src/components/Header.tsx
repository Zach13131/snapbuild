import { useEffect, useRef, useState } from "react";
import { START_HREF, asset, nav, navNew, navNewDesktop } from "../content";
import { useLandingHash } from "../landingHash";

function navLinkClass(active: boolean, extra = "") {
  return `rounded-[9px] px-2.5 py-2 text-[12px] text-black no-underline transition-colors ${
    active ? "bg-black/[0.045]" : "hover:bg-black/[0.045]"
  } ${extra}`;
}

export function Header({ onMenuOpenChange }: { onMenuOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { id } = useLandingHash();
  const current = `#${id}`;
  const moreActive = navNewDesktop.some((item) => item.href === current);

  useEffect(() => {
    onMenuOpenChange?.(open);
  }, [open, onMenuOpenChange]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !more) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setMore(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, more]);

  useEffect(() => {
    if (!more) return;
    const onPointer = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMore(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [more]);

  return (
    <header className="sticky top-0 z-50 bg-transparent pt-3 pb-2 md:pt-4">
      <div className="relative mx-auto w-[calc(100%-24px)] max-w-[960px] md:w-[calc(100%-32px)]">
        <div
          className={`flex min-h-[50px] items-center gap-3 rounded-2xl border px-3.5 py-1.5 backdrop-blur-[10px] md:min-h-[52px] md:px-[14px] md:py-[7px] ${
            scrolled
              ? "border-black/[0.045] bg-white/80 shadow-[0_6px_22px_rgba(29,22,40,0.055)]"
              : "border-transparent bg-white/80"
          }`}
        >
          <a href="#hero" className="shrink-0" aria-label="Снэпбилд">
            <img src={asset("assets/images/582db07d8ccd60da.svg")} alt="Снэпбилд" className="h-[18px] w-auto md:h-5" />
          </a>
          <nav className="mx-auto hidden items-center md:flex" aria-label="Основная навигация">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={navLinkClass(item.href === current)}>
                {item.label}
              </a>
            ))}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                className={navLinkClass(moreActive, "flex items-center gap-1")}
                aria-expanded={more}
                aria-haspopup="menu"
                aria-controls="more-menu"
                onClick={() => setMore((value) => !value)}
              >
                Ещё
                <svg
                  viewBox="0 0 12 12"
                  className={`h-2.5 w-2.5 motion-safe:transition-transform motion-safe:duration-200 ${more ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div
                id="more-menu"
                role="menu"
                aria-hidden={!more}
                className={`absolute top-full right-0 z-50 mt-2 w-[240px] rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)] motion-safe:origin-top motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  more ? "visible opacity-100 scale-100" : "invisible pointer-events-none opacity-0 scale-[0.98]"
                }`}
              >
                {navNewDesktop.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-3 py-2.5 text-[13px] text-black no-underline ${
                      item.href === current ? "bg-black/[0.045]" : "hover:bg-black/[0.045]"
                    }`}
                    role="menuitem"
                    tabIndex={more ? 0 : -1}
                    onClick={() => setMore(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <a
              href={START_HREF}
              className="btn-press inline-flex min-h-9 items-center rounded-[11px] bg-black px-2.5 py-2 text-[11px] font-semibold text-white no-underline transition hover:-translate-y-px hover:bg-[#242424] sm:px-3.5 sm:text-[12px] md:min-h-0 md:rounded-xl md:px-5 md:py-2.5"
            >
              <span className="min-[380px]:hidden">Старт</span>
              <span className="hidden min-[380px]:inline">Начать сейчас</span>
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-[15px]">
                <span
                  className={`absolute inset-x-0 top-0 h-[1.5px] bg-black motion-safe:transition motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 top-[4.5px] h-[1.5px] bg-black motion-safe:transition motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-black motion-safe:transition motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
        <nav
          id="mobile-menu"
          className={`absolute inset-x-0 top-full z-50 mt-2 max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:hidden motion-safe:origin-top motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "visible opacity-100 scale-100" : "invisible pointer-events-none opacity-0 scale-[0.98]"
          }`}
          aria-hidden={!open}
          aria-label="Мобильная навигация"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={`block rounded-xl px-4 py-3 text-base text-black no-underline ${
                item.href === current ? "bg-black/[0.045]" : "hover:bg-black/[0.045]"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {navNew.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={`block rounded-xl px-4 py-3 text-base text-black no-underline ${
                item.href === current ? "bg-black/[0.045]" : "hover:bg-black/[0.045]"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={START_HREF}
            tabIndex={open ? 0 : -1}
            className="btn-press mt-2 flex items-center justify-center rounded-xl bg-black px-4 py-3 text-base font-semibold text-white no-underline"
            onClick={() => setOpen(false)}
          >
            Начать сейчас
          </a>
        </nav>
      </div>
    </header>
  );
}
