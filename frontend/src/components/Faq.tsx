import { useState } from "react";
import { faqItems } from "../content";
import { Reveal } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const left = faqItems.slice(0, 4);
  const right = faqItems.slice(4);

  return (
    <section id="faq" className="flex flex-col gap-10 px-4 py-12 md:gap-12 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <Reveal className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[52px] md:leading-[1.23]">
          Часто задаваемые вопросы
        </h2>
        <p className="max-w-[420px] text-sm leading-relaxed text-mute md:text-base">
          Ответы, которые помогут вам принять решение уверенно — без рисков для бренда и безопасности
        </p>
      </Reveal>
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-x-8">
        {[left, right].map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((item, indexInCol) => {
              const index = colIndex * 4 + indexInCol;
              const isOpen = open === index;
              return (
                <Reveal key={item.q} delay={indexInCol * 40}>
                  <button
                    type="button"
                    className="card-lift w-full rounded-[20px] bg-white p-4 text-left md:p-5"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className="flex w-full items-start justify-between gap-5">
                      <span className="text-sm font-medium leading-relaxed text-black md:text-base">{item.q}</span>
                      <span className="relative mt-0.5 h-5 w-5 shrink-0 text-mute md:h-6 md:w-6" aria-hidden>
                        <span className="absolute top-1/2 left-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute top-1/2 left-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition ${
                            isOpen ? "scale-y-0" : ""
                          }`}
                        />
                      </span>
                    </span>
                    <span className={`grid transition-[grid-template-rows,margin] duration-300 ${isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <span className="min-h-0 overflow-hidden">
                        <span className="block text-sm leading-relaxed whitespace-pre-line text-mute">{item.a}</span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
