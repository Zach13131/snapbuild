import { START_HREF, asset } from "../content";

export function Hero() {
  return (
    <section id="hero" className="bg-canvas px-0 pb-4 pt-0 md:px-3 md:pb-12 md:pt-3">
      <div className="hero-wash overflow-hidden rounded-[15px] md:rounded-[20px] lg:rounded-[32px]">
        <div className="flex flex-col items-center px-4 pt-12 md:px-10 md:pt-20 lg:px-16 lg:pt-[108px]">
          <div className="hero-enter flex max-w-[984px] flex-col items-center gap-4 text-center md:gap-5">
            <h1 className="max-w-[984px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-black md:text-[56px] md:leading-[1.1] lg:text-[clamp(48px,5.28vw,76px)] lg:leading-[1.13]">
              Платформа, где все создается в рамках вашего бренда и дизайн-системы
            </h1>
            <p className="max-w-[760px] text-[14px] leading-[1.43] font-medium text-black/60 md:text-[18px] md:leading-[1.33]">
              Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные
              материалы в фирменном стиле за минуты, а не дни.
            </p>
            <a
              href={START_HREF}
              className="hero-enter btn-press inline-flex items-center rounded-full bg-white px-3.5 py-2.5 text-[13px] font-semibold no-underline shadow-sm transition hover:-translate-y-px md:px-[22px] md:py-3.5 md:text-sm"
              style={{ animationDelay: "420ms" }}
            >
              <span className="gradient-text">Начать сейчас</span>
            </a>
          </div>
          <div className="hero-media-enter mt-8 w-full max-w-[1190px] md:mt-5">
            <img
              src={asset("assets/images/hero-snapbuild-2026-08-07-v2.webp")}
              alt="Интерфейс Снэпбилда"
              className="block w-full rounded-t-2xl object-cover object-top md:aspect-[2632/1386] md:rounded-t-[24px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
