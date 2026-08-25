import { asset, securityCards } from "../content";
import { Reveal } from "./Reveal";

export function Security() {
  return (
    <section id="features" className="flex flex-col gap-8 px-4 py-8 md:px-5 lg:px-10">
      <Reveal className="flex min-h-[220px] flex-col items-center justify-center overflow-visible rounded-[24px] bg-white px-6 py-16 text-center">
        <h2 className="overflow-visible py-[0.12em] text-[28px] leading-[1.35] font-semibold tracking-[-0.03em] md:text-[40px] lg:text-[48px] lg:leading-[1.4]">
          <span>Безопасность без </span>
          <span className="gradient-text">компромиссов</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8">
        {securityCards.map((card, index) => (
          <Reveal key={card.title} as="article" delay={index * 50} className="group flex min-w-0 flex-col gap-2 md:gap-4">
            <picture>
              <source media="(max-width: 767px)" srcSet={asset(card.imageMobile)} />
              <img
                src={asset(card.image)}
                alt=""
                className="aspect-square w-full rounded-[6px] object-cover md:rounded-xl lg:h-[min(280px,22vw)] lg:aspect-auto lg:rounded-[20px] motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-0.5"
              />
            </picture>
            <div className="flex flex-col gap-1">
              <h3 className="text-[clamp(10px,1.5vw+6px,24px)] leading-snug font-semibold tracking-[-0.02em] text-black">
                {card.title}
              </h3>
              <p className="text-[clamp(9px,1.1vw+5px,16px)] leading-snug text-mute md:leading-relaxed">{card.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
