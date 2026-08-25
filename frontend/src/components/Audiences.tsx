import { audiences } from "../content";
import { Reveal } from "./Reveal";

export function Audiences() {
  return (
    <section id="audiences" className="flex flex-col gap-8 px-4 py-12 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <Reveal className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <h2 className="max-w-[760px] text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[52px] md:leading-[1.23]">
          Сценарии, с которых команды обычно начинают
        </h2>
        <p className="max-w-[320px] text-sm leading-relaxed text-mute md:text-base">
          Не шаблоны «для всех», а рабочие контуры маркетинга, дизайна, продаж и продукта — внутри одной дизайн-системы.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {audiences.map((item, index) => (
          <Reveal key={item.role} as="article" delay={index * 50} className="card-lift flex flex-col gap-5 rounded-[24px] bg-white p-5 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="gradient-text text-sm font-semibold">{item.role}</span>
              <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-black/8 text-sm font-medium text-mute">
                0{index + 1}
              </span>
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-black">{item.title}</h3>
            <ul className="flex flex-col gap-3">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-mute md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
