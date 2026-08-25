import {
    useEffect,
    useId,
    useReducer,
    useRef,
    useState,
    type FormEvent,
    type ReactNode,
    type RefObject,
} from "react";
import { useLandingHash } from "../landingHash";
import {
    assessPlayground,
    composePlayground,
    playgroundFormats,
    playgroundSegments,
    samplePlaygroundBrief,
    segmentWash,
    validatePlayground,
    type PlaygroundBrief,
    type PlaygroundCopy,
    type PlaygroundFormat,
    type PlaygroundSegment,
} from "../playground";
import { FormatPreview } from "./PlaygroundPreviews";
import { SlidingPills } from "./SlidingPills";
import { usePrefersReducedMotion } from "./PlaygroundMotion";

const SLIDE_MS = 7000;
const COMPOSE_MS = 750;

type Status = "idle" | "composing" | "ready";

type State = {
    name: string;
    offer: string;
    url: string;
    status: Status;
    brief: PlaygroundBrief | null;
    errors: Partial<Record<"name" | "url" | "offer", string>>;
};

type Action =
    | { type: "field"; key: "name" | "offer" | "url"; value: string }
    | { type: "submit" }
    | { type: "composed" };

const initial: State = {
    name: samplePlaygroundBrief.name,
    offer: samplePlaygroundBrief.offer,
    url: samplePlaygroundBrief.url,
    status: "ready",
    brief: samplePlaygroundBrief,
    errors: {},
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.key]: action.value,
                errors: { ...state.errors, [action.key]: undefined },
            };
        case "submit": {
            const brief = {
                name: state.name,
                offer: state.offer,
                url: state.url,
            };
            const errors = validatePlayground(brief);
            if (Object.keys(errors).length) return { ...state, errors };
            return {
                ...state,
                errors: {},
                brief,
                status: "composing",
            };
        }
        case "composed":
            return state.status === "composing" ? { ...state, status: "ready" } : state;
        default:
            return state;
    }
}

export function Playground() {
    const [state, dispatch] = useReducer(reducer, initial);
    const reducedMotion = usePrefersReducedMotion();
    const { id: hashId, params, patch } = useLandingHash();
    const format = params.format ?? "sites";
    const segment = params.segment ?? "b2b";
    const sectionRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const offerRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const inView = useSectionInView(sectionRef);

    const liveBrief = { name: state.name, offer: state.offer, url: state.url };
    const gate = assessPlayground(liveBrief);

    useEffect(() => {
        if (state.status !== "composing") return;
        if (reducedMotion) {
            dispatch({ type: "composed" });
            return;
        }
        const id = window.setTimeout(() => dispatch({ type: "composed" }), COMPOSE_MS);
        return () => window.clearTimeout(id);
    }, [state.status, reducedMotion]);

    useEffect(() => {
        if (state.status !== "ready" || reducedMotion || gate.state !== "ready") return;
        if (hashId !== "playground" || !inView) return;
        const id = window.setInterval(() => {
            const index = playgroundFormats.findIndex((item) => item.id === format);
            const next = playgroundFormats[(index + 1) % playgroundFormats.length].id;
            patch({ id: "playground", params: { format: next } }, { scroll: false });
        }, SLIDE_MS);
        return () => window.clearInterval(id);
    }, [state.status, reducedMotion, gate.state, format, hashId, inView, patch]);

    const copy = gate.state === "ready" ? composePlayground(liveBrief, segment) : null;

    function setFormat(next: PlaygroundFormat) {
        patch({ id: "playground", params: { format: next, segment } }, { scroll: false });
    }

    function setSegment(next: PlaygroundSegment) {
        patch({ id: "playground", params: { format, segment: next } }, { scroll: false });
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        if (state.status === "composing") return;
        const errors = validatePlayground(liveBrief);
        dispatch({ type: "submit" });
        const first = errors.name ? nameRef : errors.offer ? offerRef : errors.url ? urlRef : null;
        first?.current?.focus();
    }

    return (
        <section
            id="playground"
            ref={sectionRef}
            className="flex min-w-0 flex-col gap-8 overflow-x-clip px-3 py-12 min-[400px]:px-4 md:gap-10 md:px-5 md:py-[60px] lg:px-10 lg:py-24"
        >
            <div className="flex max-w-[760px] flex-col gap-3 md:gap-4">
                <p className="gradient-text text-sm font-semibold">Одна идея — весь набор</p>
                <h2 className="text-[28px] leading-[1.25] font-medium tracking-[-0.03em] text-black min-[400px]:text-[32px] md:text-[52px] md:leading-[1.23]">
                    Соберите пять форматов в вашей системе
                </h2>
                <p className="max-w-[560px] text-sm leading-relaxed text-mute md:text-base">
                    Заполните бриф — сегмент меняет тон, все пять форматов собираются в одной дизайн-системе.
                </p>
            </div>

            <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-10">
                <form
                    className="order-2 flex flex-col gap-4 rounded-[24px] bg-white p-5 md:p-7 lg:order-1"
                    onSubmit={onSubmit}
                    noValidate
                >
                    <Field label="Продукт" error={state.errors.name} fieldId="playground-name">
                        <input
                            ref={nameRef}
                            id="playground-name"
                            className={inputClass(state.errors.name)}
                            value={state.name}
                            placeholder="Снэпбилд"
                            maxLength={60}
                            aria-invalid={state.errors.name ? true : undefined}
                            aria-describedby={state.errors.name ? "playground-name-error" : undefined}
                            onChange={(event) =>
                                dispatch({ type: "field", key: "name", value: event.target.value })
                            }
                        />
                    </Field>
                    <Field label="Оффер или одна фраза" error={state.errors.offer} fieldId="playground-offer">
                        <input
                            ref={offerRef}
                            id="playground-offer"
                            className={inputClass(state.errors.offer)}
                            value={state.offer}
                            placeholder="Маркетинг в фирменном стиле за минуты"
                            maxLength={140}
                            aria-invalid={state.errors.offer ? true : undefined}
                            aria-describedby={state.errors.offer ? "playground-offer-error" : undefined}
                            onChange={(event) =>
                                dispatch({ type: "field", key: "offer", value: event.target.value })
                            }
                        />
                    </Field>
                    <Field label="Сайт (необязательно)" error={state.errors.url} fieldId="playground-url">
                        <input
                            ref={urlRef}
                            id="playground-url"
                            className={inputClass(state.errors.url)}
                            value={state.url}
                            placeholder="https://snapbuild.ru"
                            inputMode="url"
                            aria-invalid={state.errors.url ? true : undefined}
                            aria-describedby={state.errors.url ? "playground-url-error" : undefined}
                            onChange={(event) =>
                                dispatch({ type: "field", key: "url", value: event.target.value })
                            }
                        />
                    </Field>
                    <fieldset>
                        <legend className="mb-2 text-sm font-medium text-black">Сегмент</legend>
                        <SlidingPills value={segment} className="flex flex-wrap gap-2">
                            {playgroundSegments.map((item) => {
                                const selected = item.id === segment;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        data-pill={item.id}
                                        className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                            selected ? "text-white" : "text-black hover:bg-black/[0.045]"
                                        }`}
                                        aria-pressed={selected}
                                        onClick={() => setSegment(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </SlidingPills>
                    </fieldset>
                    <button
                        type="submit"
                        className="btn-press mt-2 inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:bg-[#242424] disabled:opacity-60"
                        disabled={state.status === "composing"}
                    >
                        {state.status === "composing" ? "Собираем набор…" : "Собрать набор"}
                    </button>
                </form>

                <div className="order-1 flex min-w-0 flex-col gap-4 lg:order-2">
                    <PreviewStage
                        copy={copy}
                        format={format}
                        composing={state.status === "composing"}
                        segment={segment}
                        gate={gate}
                        reducedMotion={reducedMotion}
                    />
                    <SlidingPills
                        value={format}
                        className="no-scrollbar flex max-w-full gap-2 overflow-x-auto"
                        role="tablist"
                        aria-label="Форматы набора"
                    >
                        {playgroundFormats.map((item) => {
                            const selected = item.id === format;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    data-pill={item.id}
                                    aria-selected={selected}
                                    className={`relative z-10 shrink-0 rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:py-2.5 sm:text-sm md:text-base ${
                                        selected ? "text-white" : "text-black hover:bg-black/[0.045]"
                                    }`}
                                    onClick={() => setFormat(item.id)}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </SlidingPills>
                    {state.status === "ready" && gate.state === "ready" && !reducedMotion ? (
                        <span className="relative block h-px overflow-hidden bg-black/10">
                            <span
                                key={`${format}-${segment}-${state.brief?.name}`}
                                className="playground-progress absolute inset-0 bg-[linear-gradient(90deg,#ff6d3c,#ff6ba7_46%,#bb6dff)]"
                            />
                        </span>
                    ) : (
                        <span className="block h-px bg-black/10" />
                    )}
                </div>
            </div>
        </section>
    );
}

function useSectionInView(ref: RefObject<HTMLElement | null>) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref]);

    return inView;
}

function Field({
    label,
    error,
    fieldId,
    children,
}: {
    label: string;
    error?: string;
    fieldId: string;
    children: ReactNode;
}) {
    const errorId = `${fieldId}-error`;
    return (
        <label className="flex flex-col gap-2 text-sm font-medium text-black">
            {label}
            {children}
            <span
                id={errorId}
                className={`field-error font-normal text-[#c43d3d] ${error ? "field-error-on" : ""}`}
                aria-hidden={!error || undefined}
            >
                <span className="min-h-0 overflow-hidden">{error ?? "\u00a0"}</span>
            </span>
        </label>
    );
}

function inputClass(error?: string) {
    return `w-full rounded-xl border bg-canvas px-4 py-3 text-base font-normal text-black outline-none transition ${
        error ? "border-[#c43d3d]" : "border-transparent focus:border-black/20"
    }`;
}

function PreviewStage({
    copy,
    format,
    composing,
    segment,
    gate,
    reducedMotion,
}: {
    copy: PlaygroundCopy | null;
    format: PlaygroundFormat;
    composing: boolean;
    segment: PlaygroundSegment;
    gate: ReturnType<typeof assessPlayground>;
    reducedMotion: boolean;
}) {
    const labelId = useId();
    return (
        <div className="relative min-h-[240px] min-w-0 overflow-hidden rounded-[20px] bg-[#111] ring-1 ring-black/10 sm:min-h-[440px] sm:rounded-[24px] md:min-h-[520px] lg:min-h-[640px]">
            {composing ? (
                <ComposeOverlay reduced={reducedMotion} segment={segment} />
            ) : gate.state !== "ready" ? (
                <div
                    className="absolute inset-0 flex flex-col justify-end bg-[#161616] p-6 md:p-10"
                    role="status"
                    aria-labelledby={labelId}
                >
                    <p className="gradient-text text-sm font-semibold">
                        {gate.state === "rejected" ? "Дизайн-система" : "Бриф"}
                    </p>
                    <h3 id={labelId} className="mt-2 text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                        {gate.title}
                    </h3>
                    <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-white/55 md:text-base">
                        {gate.detail}
                    </p>
                </div>
            ) : copy ? (
                <FormatPreview copy={copy} format={format} segment={segment} />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                    <p className="max-w-[280px] text-sm leading-relaxed text-white/55 md:text-base">
                        Введите продукт — соберём набор в вашей системе
                    </p>
                </div>
            )}
        </div>
    );
}

function ComposeOverlay({ reduced, segment }: { reduced: boolean; segment: PlaygroundSegment }) {
    const [ready, setReady] = useState(reduced);

    useEffect(() => {
        if (reduced) return;
        const id = window.setTimeout(() => setReady(true), 420);
        return () => window.clearTimeout(id);
    }, [reduced]);

    return (
        <div className={`absolute inset-0 ${segmentWash(segment)}`}>
            <div className="absolute inset-0 bg-[#111]/55" />
            {ready ? (
                <div className="relative flex h-full items-center justify-center p-6">
                    <p className={`inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white ${reduced ? "" : "output-pop"}`}>
                        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" aria-hidden>
                            <path d="M2 6.2 4.8 9 10 3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Набор собран
                    </p>
                </div>
            ) : (
                <div className={`relative h-full p-5 ${reduced ? "" : "animate-pulse"}`}>
                    <div className="h-8 rounded-lg bg-white/10" />
                    <div className="mt-8 h-16 max-w-[70%] rounded-xl bg-white/12" />
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="h-24 rounded-2xl bg-white/8" />
                        <div className="h-24 rounded-2xl bg-white/8" />
                        <div className="h-24 rounded-2xl bg-white/8" />
                    </div>
                </div>
            )}
        </div>
    );
}
