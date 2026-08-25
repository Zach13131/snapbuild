import { useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type Pill = { x: number; y: number; w: number; h: number };

export function SlidingPills({
  value,
  className = "",
  children,
  ...rest
}: {
  value: string;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<Pill | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const active = root.querySelector<HTMLElement>(`[data-pill="${CSS.escape(value)}"]`);
      if (!active) return;
      setPill({
        x: active.offsetLeft,
        y: active.offsetTop,
        w: active.offsetWidth,
        h: active.offsetHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.querySelectorAll("[data-pill]").forEach((node) => observer.observe(node));
    root.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      root.removeEventListener("scroll", measure);
    };
  }, [value]);

  return (
    <div ref={rootRef} className={`relative ${className}`} {...rest}>
      <span
        aria-hidden
        className="sliding-pill"
        style={
          pill
            ? { width: pill.w, height: pill.h, transform: `translate3d(${pill.x}px, ${pill.y}px, 0)` }
            : { opacity: 0 }
        }
      />
      {children}
    </div>
  );
}
