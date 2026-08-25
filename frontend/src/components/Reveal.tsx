import { createElement, type CSSProperties, type ReactNode } from "react";
import { useOnceInView } from "../motion";

type RevealTag = "div" | "article" | "li";

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useOnceInView();
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return createElement(
    as,
    {
      ref,
      className: `reveal${shown ? " reveal-in" : ""} ${className}`.trim(),
      style,
    },
    children,
  );
}
