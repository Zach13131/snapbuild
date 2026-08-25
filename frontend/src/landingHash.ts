import { playgroundFormats, playgroundSegments, type PlaygroundFormat, type PlaygroundSegment } from "./playground";
import { useCallback, useEffect, useState } from "react";

export type LandingParams = {
  format?: PlaygroundFormat;
  segment?: PlaygroundSegment;
  contour?: string;
  pack?: string;
  team?: string;
  plan?: string;
};

export type LandingHash = {
  id: string;
  params: LandingParams;
};

const formatIds = new Set<string>(playgroundFormats.map((item) => item.id));
const segmentIds = new Set<string>(playgroundSegments.map((item) => item.id));
const formatAliases: Record<string, PlaygroundFormat> = {
  site: "sites",
  banner: "banners",
  image: "images",
  presentation: "presentations",
};

export function parseFormat(value: string | null | undefined): PlaygroundFormat | undefined {
  if (!value) return undefined;
  if (formatIds.has(value)) return value as PlaygroundFormat;
  return formatAliases[value];
}

export function parseSegment(value: string | null | undefined): PlaygroundSegment | undefined {
  return value && segmentIds.has(value) ? (value as PlaygroundSegment) : undefined;
}

export function parseLandingHash(raw: string): LandingHash {
  const value = raw.replace(/^#/, "");
  const qIndex = value.indexOf("?");
  const id = (qIndex === -1 ? value : value.slice(0, qIndex)).trim();
  const search = qIndex === -1 ? "" : value.slice(qIndex + 1);
  const query = new URLSearchParams(search);
  const params: LandingParams = {};
  const format = parseFormat(query.get("format"));
  const segment = parseSegment(query.get("segment"));
  const contour = query.get("contour") ?? undefined;
  const pack = query.get("pack") ?? undefined;
  const team = query.get("team") ?? undefined;
  const plan = query.get("plan") ?? undefined;
  if (format) params.format = format;
  if (segment) params.segment = segment;
  if (contour) params.contour = contour;
  if (pack) params.pack = pack;
  if (team) params.team = team;
  if (plan) params.plan = plan;
  return { id, params };
}

export function readLandingHash(): LandingHash {
  return parseLandingHash(window.location.hash);
}

export function scrollToLandingId(id: string) {
  if (!id) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = () => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
}

function serialize(params: LandingParams) {
  const query = new URLSearchParams();
  (["format", "segment", "contour", "pack", "team", "plan"] as const).forEach((key) => {
    const value = params[key];
    if (value) query.set(key, value);
  });
  return query.toString();
}

export function writeLandingHash(
  next: { id?: string; params?: LandingParams },
  options?: { scroll?: boolean },
) {
  const current = readLandingHash();
  const id = next.id ?? current.id;
  const params = next.params ?? current.params;
  const qs = serialize(params);
  const hash = `#${id}${qs ? `?${qs}` : ""}`;
  if (hash === window.location.hash) {
    if (options?.scroll) scrollToLandingId(id);
    return;
  }
  if (options?.scroll) {
    window.location.hash = hash;
    scrollToLandingId(id);
    return;
  }
  const url = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function contactHref(params: LandingParams) {
  const qs = serialize(params);
  return `#contact${qs ? `?${qs}` : ""}`;
}

export function useLandingHash() {
  const [state, setState] = useState<LandingHash>(() =>
    typeof window === "undefined" ? { id: "", params: {} } : readLandingHash(),
  );

  useEffect(() => {
    const sync = () => setState(readLandingHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const patch = useCallback((next: { id?: string; params?: LandingParams }, options?: { scroll?: boolean }) => {
    const current = readLandingHash();
    writeLandingHash(
      {
        id: next.id ?? current.id,
        params: { ...current.params, ...next.params },
      },
      options,
    );
  }, []);

  return { ...state, patch };
}

/** Native scroll only matches a clean `#id`. Hashes like `#contact?plan=team` need this. */
export function useLandingScroll() {
  useEffect(() => {
    const maybeScroll = () => {
      if (!window.location.hash.includes("?")) return;
      scrollToLandingId(readLandingHash().id);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href");
      if (!href || !href.includes("?")) return;
      event.preventDefault();
      const parsed = parseLandingHash(href);
      const current = readLandingHash();
      writeLandingHash(
        { id: parsed.id || current.id, params: { ...current.params, ...parsed.params } },
        { scroll: true },
      );
    };

    const onHash = (event: HashChangeEvent) => {
      if (!event.isTrusted) return;
      maybeScroll();
    };

    maybeScroll();
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
}
