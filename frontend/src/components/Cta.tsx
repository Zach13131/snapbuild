import { START_HREF, asset } from "../content";
import { Reveal } from "./Reveal";

export function Cta() {
  return (
    <section id="cta" className="px-3 pb-6 md:px-5 lg:px-10">
      <Reveal className="cta-wash relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[15px] opacity-20" style={{ mixBlendMode: "plus-lighter" }}>
          <img src={asset("assets/images/c3714c375a04149c.webp")} alt="" className="hidden h-full w-full object-cover lg:block" />
          <img src={asset("assets/images/f38670cf14e4b7dd.webp")} alt="" className="hidden h-full w-full object-cover md:block lg:hidden" />
          <img src={asset("assets/images/a4285c4b0717be2b.webp")} alt="" className="h-full w-full object-cover md:hidden" />
        </div>
        <div className="relative mx-auto flex max-w-[898px] flex-col items-center gap-8">
          <h2 className="text-[32px] leading-[1.25] font-semibold tracking-[-0.03em] text-black md:text-[52px] md:leading-[1.23]">
            Профессиональные материалы в фирменном стиле за минуты, а не дни
          </h2>
          <p className="max-w-[640px] text-sm font-medium text-black md:text-base">
            Выстройте маркетинг в единый поток — от первой идеи до финального взаимодействия с клиентом.
          </p>
          <a
            href={START_HREF}
            className="btn-press inline-flex items-center rounded-full bg-white px-5 py-3.5 text-sm font-semibold no-underline shadow-sm transition hover:-translate-y-px"
          >
            <span className="gradient-text">Начать сейчас</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
