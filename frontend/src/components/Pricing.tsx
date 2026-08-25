import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPlans } from "../api";
import { contactHref } from "../landingHash";
import { Reveal } from "./Reveal";
import { SlidingPills } from "./SlidingPills";

function formatPrice(value: number) {
  if (!value) return "по запросу";
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const query = useQuery({ queryKey: ["plans"], queryFn: fetchPlans });
  const items = query.data ?? [];
  const period = yearly ? "year" : "month";

  return (
    <section id="pricing" className="flex flex-col gap-5 px-4 py-8 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end lg:gap-6">
        <Reveal className="max-w-[720px]">
          <h2 className="text-[24px] leading-snug font-medium tracking-[-0.03em] text-black md:text-[32px] md:leading-[1.25] lg:text-[52px] lg:leading-[1.23]">
            Тарифы под пилот, команду и закрытый контур
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-relaxed text-mute md:mt-4 md:text-base">
            Цены — ориентир для пилота, команды или закрытого контура. Сравнение с Figma и no-code — в таблице выше; здесь только доступ.
          </p>
        </Reveal>
        <SlidingPills value={period} className="flex items-center gap-1 rounded-full bg-white p-1" role="group" aria-label="Период оплаты">
          <button
            type="button"
            data-pill="month"
            className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm ${
              yearly ? "text-mute" : "text-white"
            }`}
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            В месяц
          </button>
          <button
            type="button"
            data-pill="year"
            className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm ${
              yearly ? "text-white" : "text-mute"
            }`}
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            В год <span className={yearly ? "text-white/70" : "gradient-text"}>· −20%</span>
          </button>
        </SlidingPills>
      </div>
      {query.isError ? (
        <p className="rounded-[24px] bg-white px-6 py-8 text-sm text-mute">
          Не удалось загрузить тарифы. Обновите страницу.
        </p>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
        {query.isPending
          ? [0, 1, 2].map((key) => <div key={key} className="h-[280px] animate-pulse rounded-[20px] bg-white md:h-[420px] md:rounded-[24px]" />)
          : items.map((plan, index) => (
              <Reveal
                key={plan.id}
                as="article"
                delay={index * 50}
                className={`card-lift relative flex flex-col gap-4 rounded-[20px] bg-white p-4 md:gap-6 md:rounded-[24px] md:p-8 ${plan.featured ? "price-neon z-[1]" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">{plan.name}</h3>
                    {plan.featured ? <span className="gradient-text text-xs font-semibold md:text-sm">чаще выбирают</span> : null}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute md:mt-2">{plan.blurb}</p>
                </div>
                <p className="text-[24px] font-semibold tracking-[-0.03em] md:text-[40px]">
                  <span key={period} className="inline-block price-swap">
                    {formatPrice(yearly ? plan.yearly : plan.monthly)}
                  </span>
                  {plan.monthly ? <span className="text-sm font-medium text-mute md:text-base"> / мес</span> : null}
                </p>
                <ul className="flex flex-1 flex-col gap-2 md:gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-relaxed md:gap-3 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={contactHref({
                    plan: plan.id,
                    pack: plan.id === "start" ? "web" : "all",
                    contour: plan.id === "contour" ? "airgap" : "saas",
                    team: plan.id === "contour" ? "security" : plan.id === "start" ? "small" : "marketing",
                  })}
                  className={`btn-press inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold no-underline md:px-5 md:py-3 ${
                    plan.featured
                      ? "bg-black text-white hover:-translate-y-px hover:bg-[#242424]"
                      : "bg-canvas text-black hover:bg-black/[0.045]"
                  }`}
                >
                  {plan.cta}
                </a>
              </Reveal>
            ))}
      </div>
    </section>
  );
}
