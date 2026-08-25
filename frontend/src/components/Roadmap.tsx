import { useEffect, useState } from "react";
import { roadmap } from "../content";
import { useOnceInView } from "../motion";

const reachedUntil = 8;

export function Roadmap() {
  const { ref, shown, reduced } = useOnceInView<HTMLElement>(0.22);
  const [play, setPlay] = useState(reduced);

  useEffect(() => {
    if (!shown) return;
    if (reduced) {
      setPlay(true);
      return;
    }
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPlay(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [shown, reduced]);

  return (
    <section id="roadmap" ref={ref} className="flex flex-col gap-10 py-8 md:gap-14 md:pt-[77px] md:pb-5">
      <header className="flex max-w-[720px] flex-col gap-3 px-4 md:px-5 lg:px-10">
        <h2 className="text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[52px] md:leading-[1.23]">
          Каждый день — новый релиз
        </h2>
        <p className="text-sm leading-relaxed text-mute md:text-base">Приоритизируем бэклог для ваших целей</p>
      </header>
      <div className="no-scrollbar overflow-x-auto px-4 md:px-5 lg:px-10">
        <div className="relative flex min-w-max">
          <div className="pointer-events-none absolute top-[15px] right-0 left-[15px] h-px bg-black/10" />
          <div
            className={`roadmap-progress pointer-events-none absolute top-[15px] left-[15px] h-px bg-[#ff68a4] ${play ? "roadmap-progress-in" : ""}`}
            style={{ width: `calc(${(reachedUntil - 0.5) / roadmap.length} * 100%)` }}
          />
          {roadmap.map((item, index) => {
            const reached = index < reachedUntil;
            return (
              <article key={item.date} className="relative w-[240px] shrink-0 pr-8 md:w-[280px] md:pr-12">
                <div
                  className={`roadmap-dot relative mb-10 flex h-8 w-8 items-center justify-center ${play ? "roadmap-dot-in" : ""}`}
                  style={{ transitionDelay: play ? `${80 + index * 90}ms` : "0ms" }}
                >
                  <span
                    className="absolute h-5 w-5 rounded-full"
                    style={
                      reached
                        ? {
                            background: "linear-gradient(91.76deg, #ff6d3d 1.5%, #ff6ca7 56.4%, #bb6dff 103.9%)",
                            opacity: 0.22,
                          }
                        : { background: "rgba(0,0,0,0.12)" }
                    }
                  />
                  <span
                    className="relative h-1.5 w-1.5 rounded-full"
                    style={
                      reached
                        ? { background: "linear-gradient(91.76deg, #ff6d3d 1.5%, #ff6ca7 56.4%, #bb6dff 103.9%)" }
                        : { background: "rgba(0,0,0,0.55)" }
                    }
                  />
                </div>
                <h3 className="text-sm font-semibold tracking-[-0.03em] text-black md:text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-mute md:text-sm">{item.desc}</p>
                <p className="mt-3 text-xs font-medium text-black md:text-sm">{item.date}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
