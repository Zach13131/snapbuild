import { implementationSteps } from "../content";
import { Reveal } from "./Reveal";

export function Implementation() {
  return (
    <section id="implementation" className="flex flex-col gap-5 px-4 py-8 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <Reveal className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start lg:gap-4">
        <h2 className="max-w-[720px] text-[24px] leading-snug font-medium tracking-[-0.03em] text-black md:text-[32px] md:leading-[1.25] lg:text-[52px] lg:leading-[1.23]">
          Как платформу подключают к бренду
        </h2>
        <p className="max-w-[320px] text-sm leading-relaxed text-mute md:text-base">
          Короткий контур внедрения: от разбора дизайн-системы до ежедневного выпуска материалов командой.
        </p>
      </Reveal>
      <ol className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {implementationSteps.map((step, index) => (
          <Reveal
            key={step.n}
            as="li"
            delay={index * 50}
            className="card-lift relative flex flex-col gap-2 rounded-[20px] bg-white p-4 md:gap-4 md:rounded-[24px] md:p-7"
          >
            {index < implementationSteps.length - 1 ? (
              <span className="pointer-events-none absolute top-10 right-[-12px] hidden h-px w-6 bg-black/10 lg:block" />
            ) : null}
            <span className="gradient-text text-lg font-semibold md:text-2xl">{step.n}</span>
            <h3 className="text-base font-semibold tracking-[-0.03em] text-black md:text-xl">{step.title}</h3>
            <p className="text-sm leading-relaxed text-mute">{step.desc}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
