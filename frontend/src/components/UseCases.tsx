import { useEffect, useState } from "react";
import { asset, useCaseTabs } from "../content";
import { parseFormat, useLandingHash } from "../landingHash";
import { playgroundFormats } from "../playground";
import { usePrefersReducedMotion } from "../motion";
import { SlidingPills } from "./SlidingPills";

const SLIDE_MS = 8000;

export function UseCases() {
  const reducedMotion = usePrefersReducedMotion();
  const { params, patch } = useLandingHash();
  const format = params.format ?? "sites";
  const tab = Math.max(
    0,
    useCaseTabs.findIndex((item) => item.id === format),
  );
  const current = useCaseTabs[tab] ?? useCaseTabs[0];
  const [point, setPoint] = useState(0);
  const active = current.cards[point] ?? current.cards[0];

  useEffect(() => {
    setPoint(0);
  }, [current.id]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setPoint((value) => (value + 1) % current.cards.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [current.id, current.cards.length, reducedMotion]);

  function goToTab(index: number) {
    const next = useCaseTabs[index];
    if (!next) return;
    const nextFormat = parseFormat(next.id) ?? playgroundFormats[0].id;
    patch({ id: "use-cases", params: { format: nextFormat } }, { scroll: false });
    setPoint(0);
  }

  return (
    <section id="use-cases" className="flex flex-col gap-8 px-4 py-12 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-[720px] text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[46px] md:leading-[1.1] lg:text-[52px] lg:leading-[1.23]">
          Любой контент в фирменном стиле за считанные минуты
        </h2>
        <SlidingPills
          value={current.id}
          className="no-scrollbar flex max-w-full gap-2 overflow-x-auto"
          role="tablist"
          aria-label="Форматы"
        >
          {useCaseTabs.map((item, index) => {
            const selected = index === tab;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                data-pill={item.id}
                aria-selected={selected}
                className={`relative z-10 shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors md:text-base ${
                  selected ? "text-white" : "text-black hover:bg-black/[0.045]"
                }`}
                onClick={() => goToTab(index)}
              >
                {item.label}
              </button>
            );
          })}
        </SlidingPills>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-10">
        <div className="order-1 min-w-0 lg:order-2">
          <div className="relative aspect-video overflow-hidden rounded-[6px] bg-[#111] lg:rounded-xl">
            {current.cards.map((card, index) => {
              const on = index === point;
              return (
                <img
                  key={card.image}
                  src={asset(card.image)}
                  alt={on ? `${current.label}: ${active.title}` : ""}
                  className={`absolute inset-0 h-full w-full object-contain object-center lg:object-cover motion-safe:transition-opacity motion-safe:duration-300 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center lg:order-1">
          {current.cards.map((card, index) => {
            const isActive = index === point;
            return (
              <button
                key={card.title}
                type="button"
                className="py-4 text-left first:pt-0 lg:py-5"
                onClick={() => setPoint(index)}
              >
                <h3
                  className={`text-[17px] leading-snug font-medium tracking-[-0.03em] transition-colors duration-300 lg:text-xl lg:leading-7 ${
                    isActive ? "text-black" : "text-black/40"
                  }`}
                >
                  {card.title}
                </h3>
                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ${
                    isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 overflow-hidden text-sm leading-relaxed text-mute">{card.desc}</p>
                </div>
                {index < current.cards.length - 1 ? (
                  <span className="relative mt-4 block h-px overflow-hidden bg-black/10 lg:mt-5">
                    {isActive && !reducedMotion ? (
                      <span
                        key={`${current.id}-${point}`}
                        className="usecase-progress absolute inset-0 bg-[linear-gradient(90deg,#ff6d3c,#ff6ba7_46%,#bb6dff)]"
                      />
                    ) : null}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
