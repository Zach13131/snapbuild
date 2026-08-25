import { useEffect, useState } from "react";
import { AGREEMENT, PRIVACY } from "../content";

const KEY = "dds-cookie-consent";

export function CookieBanner({ menuOpen }: { menuOpen: boolean }) {
  const [needed, setNeeded] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    setNeeded(true);
    const id = window.setTimeout(() => setEntered(true), 800);
    return () => window.clearTimeout(id);
  }, []);

  if (!needed) return null;

  const open = entered && !menuOpen;

  return (
    <aside
      className={`fixed right-5 bottom-5 z-40 max-w-[400px] rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] max-md:inset-x-4 max-md:bottom-4 max-md:max-w-none motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      role="dialog"
      aria-hidden={!open}
      aria-label="Уведомление об использовании файлов cookie"
    >
      <p className="mb-4 text-sm leading-relaxed text-black">
        Мы используем файлы cookie, чтобы сделать наш сайт лучше. Используя сайт, вы принимаете нашу{" "}
        <a className="font-semibold underline underline-offset-2" href={PRIVACY} target="_blank" rel="noreferrer">
          политику конфиденциальности
        </a>{" "}
        и{" "}
        <a className="font-semibold underline underline-offset-2" href={AGREEMENT} target="_blank" rel="noreferrer">
          соглашение на обработку персональных данных
        </a>
        .
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          className="btn-press rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:-translate-y-px hover:bg-[#242424]"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setNeeded(false);
          }}
        >
          Принять
        </button>
      </div>
    </aside>
  );
}
