import { asset, processCards } from "../content";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="process" className="flex flex-col gap-5 px-4 py-8 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <Reveal className="flex flex-col gap-3 md:gap-4">
        <h2 className="max-w-full text-[28px] leading-[1.25] font-medium tracking-[-0.03em] text-black sm:text-[32px] min-[700px]:text-[40px] lg:text-[52px] lg:leading-[1.23]">
          Одна платформа — <br className="min-[700px]:hidden" />
          весь маркетинг
        </h2>
        <p className="max-w-[520px] text-sm leading-relaxed text-mute md:text-base">
          Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-3 min-[700px]:gap-4 md:gap-6 lg:gap-8">
        {processCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 50} className="h-full">
            <article className="card-lift flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] bg-white">
              <img
                src={asset(card.image)}
                alt=""
                className="block aspect-[4/3] w-full object-cover min-[700px]:aspect-square lg:aspect-auto lg:h-[min(432px,30vw)]"
              />
              <div className="flex flex-col gap-2 px-5 pt-4 pb-6 min-[700px]:gap-1 min-[700px]:px-3 min-[700px]:pt-3 min-[700px]:pb-4 md:gap-2 md:px-8 md:pt-8 md:pb-8">
                <h3 className="text-xl leading-snug font-medium tracking-[-0.03em] text-black min-[700px]:text-[clamp(10px,1.5vw+6px,24px)] md:leading-[1.33]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute min-[700px]:text-[clamp(9px,1.1vw+5px,16px)] min-[700px]:leading-snug md:leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
