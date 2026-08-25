import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "../api";
import { asset, type Testimonial } from "../content";
import { usePrefersReducedMotion } from "../motion";
import { Reveal } from "./Reveal";

const SLIDE_MS = 8000;

export function Testimonials() {
  const query = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
  const stories = query.data ?? [];
  const count = stories.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const current = stories[index] ?? stories[0];

  useEffect(() => {
    if (count > 0 && index >= count) setIndex(0);
  }, [count, index]);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, count, index]);

  function go(next: number) {
    if (!count) return;
    setIndex((next + count) % count);
  }

  return (
    <section id="reviews" className="flex flex-col gap-5 px-4 py-8 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <Reveal className="flex flex-col gap-2 md:gap-3">
          <p className="gradient-text text-sm font-semibold">Кейсы</p>
          <h2 className="max-w-[720px] text-[24px] leading-snug font-medium tracking-[-0.03em] text-black md:text-[32px] md:leading-[1.25] lg:text-[52px] lg:leading-[1.23]">
            Команды, для которых бренд — закон
          </h2>
        </Reveal>
        {count > 1 ? (
          <div className="flex gap-2">
            <SlideButton label="Предыдущий отзыв" onClick={() => go(index - 1)}>
              <path d="M7.5 2.5 4 6l3.5 3.5" />
            </SlideButton>
            <SlideButton label="Следующий отзыв" onClick={() => go(index + 1)}>
              <path d="M4.5 2.5 8 6 4.5 9.5" />
            </SlideButton>
          </div>
        ) : null}
      </div>
      {query.isError ? (
        <p className="rounded-[24px] bg-white px-6 py-8 text-sm text-mute">
          Не удалось загрузить кейсы. Обновите страницу.
        </p>
      ) : query.isPending || !current ? (
        <div className="h-[280px] animate-pulse rounded-[24px] bg-white md:h-[320px]" />
      ) : (
        <div
          className="flex flex-col gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
          }}
        >
          <div
            className="grid"
            role="region"
            aria-roledescription="carousel"
            aria-label="Отзывы"
            aria-live="polite"
          >
            {stories.map((story, itemIndex) => {
              const on = itemIndex === index;
              return (
                <div
                  key={story.id}
                  className={`review-pane col-start-1 row-start-1 ${on ? "review-pane-on" : "review-pane-off"}`}
                  aria-hidden={!on}
                >
                  <FeaturedCase story={story} />
                </div>
              );
            })}
          </div>
          {count > 1 ? (
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" role="tablist" aria-label="Выбор отзыва">
                {stories.map((story, itemIndex) => {
                  const on = itemIndex === index;
                  return (
                    <button
                      key={story.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-label={`${story.name}, ${story.company}`}
                      className={`h-1.5 rounded-full transition-all ${on ? "w-6 bg-black" : "w-1.5 bg-black/20 hover:bg-black/35"}`}
                      onClick={() => setIndex(itemIndex)}
                    />
                  );
                })}
              </div>
              {reduced || paused ? (
                <span className="h-px flex-1 bg-black/10" />
              ) : (
                <span className="relative h-px flex-1 overflow-hidden bg-black/10">
                  <span
                    key={current.id}
                    className="usecase-progress absolute inset-0 bg-[linear-gradient(90deg,#ff6d3c,#ff6ba7_46%,#bb6dff)]"
                  />
                </span>
              )}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function SlideButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="btn-press flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-black/[0.045]"
      aria-label={label}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}

function FeaturedCase({ story }: { story: Testimonial }) {
  return (
    <article className="card-lift grid gap-4 rounded-[20px] bg-white p-4 md:gap-6 md:rounded-[24px] md:p-10 lg:grid-cols-[1fr_240px]">
      <div>
        {story.constraint ? (
          <p className="text-xs font-semibold tracking-[-0.02em] text-mute md:text-sm">{story.constraint}</p>
        ) : null}
        <p className="mt-3 text-base leading-snug font-medium tracking-[-0.03em] text-black md:mt-4 md:text-[28px] md:leading-[1.35]">
          «{story.quote}»
        </p>
        <p className="mt-4 text-sm font-semibold md:mt-8 md:text-base">{story.name}</p>
        <p className="text-xs text-mute md:text-sm">
          {story.role}, {story.company}
        </p>
        <p className="mt-4 lg:hidden">
          <span className="text-xs text-mute md:text-sm">Результат</span>
          <span
            key={story.id}
            className="gradient-text mt-0.5 block text-lg font-semibold tracking-[-0.03em] output-pop md:mt-1 md:text-xl"
          >
            {story.result}
          </span>
        </p>
      </div>
      <div className="reviews-result-tile relative hidden h-[240px] w-[240px] justify-self-end overflow-visible rounded-[20px] lg:block">
        <img
          src={asset("assets/images/reviews.png")}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full rounded-[20px] object-cover object-center"
        />
        <p className="absolute top-5 left-5 z-10 text-sm text-mute">Результат</p>
        <p className="reviews-result-plate absolute right-5 bottom-5 left-5 z-10 w-fit max-w-[calc(100%-40px)] px-2.5 py-2">
          <span key={story.id} className="gradient-text relative z-10 block text-xl font-semibold tracking-[-0.03em] output-pop">
            {story.result}
          </span>
        </p>
      </div>
    </article>
  );
}
