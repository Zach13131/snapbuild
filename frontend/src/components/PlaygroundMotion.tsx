import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../motion";
import { money } from "../playground";

export { usePrefersReducedMotion } from "../motion";

export function LiveMoney({
    base,
    swing,
    className,
}: {
    base: number;
    swing: number;
    className?: string;
}) {
    const reduced = usePrefersReducedMotion();
    const [target, setTarget] = useState(base);
    const shown = useTween(target, reduced ? 0 : 720);
    const up = shown >= base;

    useEffect(() => {
        if (reduced) return;
        const id = window.setInterval(() => {
            const dir = Math.random() > 0.45 ? 1 : -1;
            setTarget(base + dir * (0.25 + Math.random()) * swing);
        }, 2200);
        return () => window.clearInterval(id);
    }, [base, reduced, swing]);

    return (
        <span className={className}>
            <span className={up ? "text-[#7dffa0]" : "text-[#ff8a8a]"}>
                {money(shown)}
            </span>
        </span>
    );
}

function useTween(target: number, ms: number) {
    const [shown, setShown] = useState(target);
    const current = useRef(target);

    useEffect(() => {
        if (ms <= 0) {
            current.current = target;
            setShown(target);
            return;
        }
        const start = current.current;
        const from = performance.now();
        let frame = 0;
        const tick = (now: number) => {
            const p = Math.min(1, (now - from) / ms);
            const ease = 1 - (1 - p) ** 3;
            const next = start + (target - start) * ease;
            current.current = next;
            setShown(next);
            if (p < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frame);
    }, [ms, target]);

    return shown;
}

export function DropTag({ label }: { label: string }) {
    return (
        <span className="retail-dangle pointer-events-none absolute top-0 right-4 z-10 origin-top">
            <span className="retail-dangle-string" />
            <span className="retail-stamp">{label}</span>
        </span>
    );
}

export function GovStamp({
    label,
    slam,
    replay,
}: {
    label: string;
    slam?: boolean;
    replay?: string;
}) {
    return (
        <span
            key={replay}
            className={`gov-stamp-on ${slam ? "gov-stamp-slam" : ""}`}
        >
            {label}
        </span>
    );
}

export function LiveClock({ className }: { className?: string }) {
    const reduced = usePrefersReducedMotion();
    const [time, setTime] = useState("10:14:08");

    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("ru-RU", { hour12: false }),
            );
        tick();
        if (reduced) return;
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, [reduced]);

    return <span className={className}>{time}</span>;
}

export function Spark({
    values,
    className,
    stroke = "#7dffa0",
}: {
    values: number[];
    className?: string;
    stroke?: string;
}) {
    const w = 160;
    const h = 42;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    const points = values.map((value, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - 3 - ((value - min) / span) * (h - 6);
        return `${x},${y}`;
    });
    const line = points.join(" ");
    const area = `0,${h} ${line} ${w},${h}`;

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            className={`block ${className ?? ""}`}
            aria-hidden
            preserveAspectRatio="none"
        >
            <polygon points={area} fill={stroke} opacity="0.16" />
            <polyline
                points={line}
                fill="none"
                stroke={stroke}
                strokeWidth="1.7"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function Bars({
    values,
    className,
}: {
    values: number[];
    className?: string;
}) {
    return (
        <div className={`flex items-end gap-1 ${className ?? "h-12"}`}>
            {values.map((value, i) => (
                <span
                    key={`${value}-${i}`}
                    className="fin-bar flex-1 rounded-sm bg-[#7dffa0]/70"
                    style={{ height: `${value}%` }}
                />
            ))}
        </div>
    );
}

export function Ring({
    pct,
    label,
    className,
    stack,
}: {
    pct: number;
    label: string;
    className?: string;
    stack?: boolean;
}) {
    const r = 16;
    const c = 2 * Math.PI * r;
    const dash = (Math.min(100, Math.max(0, pct)) / 100) * c;

    const svg = (
        <svg
            viewBox="0 0 40 40"
            className={`${stack ? "h-14 w-14 sm:h-16 sm:w-16" : "h-10 w-10"} -rotate-90`}
            aria-hidden
        >
            <circle
                cx="20"
                cy="20"
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3.5"
            />
            <circle
                cx="20"
                cy="20"
                r={r}
                fill="none"
                stroke="#7dffa0"
                strokeWidth="3.5"
                strokeDasharray={`${dash} ${c}`}
                strokeLinecap="round"
            />
        </svg>
    );

    if (stack) {
        return (
            <div
                className={`flex flex-col items-center gap-1 text-center ${className ?? ""}`}
            >
                {svg}
                <div>
                    <p className="font-mono text-[12px] leading-none">{pct}%</p>
                    <p className="mt-0.5 text-[8px] text-white/40">{label}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className ?? ""}`}>
            {svg}
            <div>
                <p className="font-mono text-[12px] leading-none">{pct}%</p>
                <p className="mt-0.5 text-[8px] text-white/40">{label}</p>
            </div>
        </div>
    );
}

export function LimitBar({
    label,
    used,
    cap,
}: {
    label: string;
    used: number;
    cap: string;
}) {
    return (
        <div>
            <div className="flex items-center justify-between font-mono text-[9px]">
                <span className="text-white/45">{label}</span>
                <span className="text-white/70">{cap}</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
                <span
                    className="block h-full rounded-full bg-[#7dffa0]/80"
                    style={{ width: `${used}%` }}
                />
            </div>
        </div>
    );
}

export function Chrome({ host }: { host: string }) {
    return (
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/70">
                {host}
            </span>
        </div>
    );
}
