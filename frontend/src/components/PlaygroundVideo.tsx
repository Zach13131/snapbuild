import {
    productName,
    segmentWash,
    type PlaygroundCopy,
    type PlaygroundSegment,
} from "../playground";
import { DropTag, GovStamp, LiveMoney } from "./PlaygroundMotion";

const NAV = [
    "Главная",
    "Интерфейсы",
    "Изображения",
    "Видео",
    "Баннеры",
    "Ноды",
];

const TOOLS = ["Слои", "Цвет", "Звук", "Кадр"];
const RATIOS = ["16:9", "9:16", "1:1", "4:5"];

export function VideoDesk({ copy }: { copy: PlaygroundCopy }) {
    const clips = clipsFor(copy);
    const name = productName(copy);
    const active = clips[0];

    return (
        <div className="ed-grid absolute inset-0 flex overflow-hidden bg-[#101012] text-white">
            <DeskShapes kind={copy.kind} />

            <aside className="relative z-[1] hidden w-[52px] shrink-0 flex-col border-r border-white/8 bg-[#16161a]/90 px-1 py-2 min-[400px]:flex sm:w-[72px] sm:px-2 sm:py-3">
                <p className="truncate px-0.5 text-[8px] font-semibold tracking-[-0.03em] sm:text-[9px]">
                    снэпбилд
                </p>
                <p className="mt-2 hidden px-0.5 text-[7px] tracking-[0.12em] text-white/30 uppercase sm:block">
                    контент
                </p>
                <div className="mt-1 flex flex-col gap-0.5">
                    {NAV.map((item) => (
                        <span
                            key={item}
                            className={`truncate rounded-md px-1 py-1 text-[8px] sm:rounded-lg sm:px-1.5 sm:py-1.5 sm:text-[9px] ${
                                item === "Видео"
                                    ? "bg-white/10 text-white"
                                    : "text-white/40"
                            }`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
                <div className="mt-auto hidden flex-col gap-0.5 sm:flex">
                    {["Пресеты", "Шаблоны"].map((item) => (
                        <span
                            key={item}
                            className="truncate px-1.5 text-[8px] text-white/25"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </aside>

            <div className="relative z-[1] flex min-w-0 flex-1 flex-col">
                <header className="flex items-center justify-between gap-2 px-2 py-1.5 sm:px-3 sm:py-2">
                    <span className="truncate rounded-lg bg-white/8 px-2 py-1 text-[9px] sm:text-[10px]">
                        Промо · {name}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="hidden rounded-lg bg-white/8 px-2 py-1 text-[9px] text-white/50 sm:inline">
                            История
                        </span>
                        <span className="rounded-lg bg-white px-2 py-1 text-[9px] font-semibold text-black sm:px-2.5 sm:text-[10px]">
                            + Создать
                        </span>
                    </div>
                </header>

                <div className="flex min-h-0 flex-1 items-stretch gap-1.5 px-2 sm:gap-2 sm:px-3">
                    <div className="hidden w-9 shrink-0 flex-col justify-center gap-1 min-[520px]:flex">
                        {TOOLS.map((tool, i) => (
                            <span
                                key={tool}
                                className={`rounded-lg px-1 py-1.5 text-center text-[8px] leading-tight ${
                                    i === 0
                                        ? "bg-white/10 text-white"
                                        : "bg-white/5 text-white/40"
                                }`}
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
                        <div className="relative w-[min(100%,360px)] sm:w-[min(100%,420px)]">
                            <span className="ed-stack pointer-events-none absolute -top-2 -right-3 h-[72%] w-[70%] rounded-[12px] bg-white/6 ring-1 ring-white/10" />
                            <span className="ed-stack pointer-events-none absolute -bottom-1.5 -left-3 h-[64%] w-[58%] rounded-[12px] bg-white/4 ring-1 ring-white/8" />
                            <div className="relative aspect-video overflow-hidden rounded-[12px] ring-1 ring-white/12 sm:rounded-[14px]">
                                <ShotFace copy={copy} />
                                <span className="ed-play pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-[10px] ring-1 ring-white/20 sm:h-9 sm:w-9">
                                    ▶
                                </span>
                                <div className="absolute inset-x-2 bottom-1.5 z-10 sm:inset-x-3 sm:bottom-2">
                                    <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
                                        <span className="ed-scrub block h-full rounded-full bg-[#ff7ad1]" />
                                    </div>
                                    <div className="mt-0.5 flex justify-between font-mono text-[7px] text-white/45 sm:text-[8px]">
                                        <span>00:05</span>
                                        <span>00:10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-1.5 max-w-full truncate text-center text-[10px] leading-none text-white/70 sm:mt-2 sm:text-[11px]">
                            {active.title} · {name}
                        </p>
                        <div className="mt-1.5 flex flex-wrap justify-center gap-1 sm:mt-2 sm:gap-1.5">
                            {["Клинг 3.0", "Мультикадр", "16:9", "2K"].map(
                                (item, i) => (
                                    <span
                                        key={item}
                                        className={`rounded-full px-2 py-0.5 text-[8px] sm:px-2.5 sm:py-1 sm:text-[9px] ${
                                            i === 0
                                                ? "bg-white/12 text-white"
                                                : "bg-white/6 text-white/55"
                                        }`}
                                    >
                                        {item}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-1.5 overflow-x-auto px-2 pt-1 pb-1.5 sm:justify-center sm:gap-2 sm:px-3 sm:pb-2">
                    {clips.map((clip, i) => (
                        <div
                            key={clip.n}
                            className="w-[56px] shrink-0 sm:w-[72px]"
                        >
                            <div
                                className={`${clip.wash} relative h-9 overflow-hidden rounded-[8px] sm:h-11 sm:rounded-[10px] ${
                                    i === 0 ? "ring-1 ring-white/50" : ""
                                }`}
                            >
                                <span className="absolute top-0.5 left-0.5 rounded bg-black/45 px-1 text-[7px] sm:text-[8px]">
                                    {clip.n}
                                </span>
                                <span className="absolute right-0.5 bottom-0.5 rounded bg-black/45 px-1 font-mono text-[7px] sm:text-[8px]">
                                    {clip.dur}
                                </span>
                            </div>
                            <p className="mt-1 truncate text-center text-[7px] leading-none text-white/45 sm:text-[8px]">
                                {clip.title}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 border-t border-white/6 px-2 py-1.5 min-[520px]:hidden">
                    <span className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[8px] text-white/55">
                        1920×1080
                    </span>
                    <span className="rounded bg-white/8 px-1.5 py-0.5 text-[8px] text-white/55">
                        16:9
                    </span>
                    <span className="rounded bg-white/8 px-1.5 py-0.5 text-[8px] text-white/55">
                        2K · 10 с
                    </span>
                    <span className="ml-auto truncate text-[8px] text-white/35">
                        Собери ролик
                    </span>
                </div>
            </div>

            <aside className="relative z-[1] hidden w-[118px] shrink-0 flex-col border-l border-white/8 bg-[#16161a]/90 px-2 py-2 min-[520px]:flex lg:w-[140px] lg:px-2.5 lg:py-3">
                <div className="flex gap-1.5 text-[8px] text-white/35 lg:text-[9px]">
                    <span>Агент</span>
                    <span className="text-white">Редактор</span>
                    <span>Коммент.</span>
                </div>
                <p className="mt-2 text-[8px] font-semibold lg:mt-3 lg:text-[9px]">
                    Настройки видео
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-1">
                    <label className="text-[7px] text-white/35">
                        Ширина
                        <span className="mt-0.5 block rounded-md bg-white/8 px-1 py-1 text-[9px] text-white">
                            1920
                        </span>
                    </label>
                    <label className="text-[7px] text-white/35">
                        Высота
                        <span className="mt-0.5 block rounded-md bg-white/8 px-1 py-1 text-[9px] text-white">
                            1080
                        </span>
                    </label>
                </div>
                <p className="mt-1.5 text-[7px] text-white/35">Соотношение</p>
                <div className="mt-1 grid grid-cols-2 gap-1">
                    {RATIOS.map((ratio) => (
                        <span
                            key={ratio}
                            className={`rounded-md px-1 py-1 text-center text-[7px] ${
                                ratio === "16:9"
                                    ? "bg-white/12 ring-1 ring-white/30"
                                    : "bg-white/5 text-white/45"
                            }`}
                        >
                            {ratio}
                        </span>
                    ))}
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-1 text-[7px] text-white/35">
                    <span>
                        Качество
                        <span className="mt-0.5 block rounded-md bg-white/8 px-1 py-1 text-[9px] text-white">
                            2K
                        </span>
                    </span>
                    <span>
                        Длит.
                        <span className="mt-0.5 block rounded-md bg-white/8 px-1 py-1 text-[9px] text-white">
                            10 с
                        </span>
                    </span>
                </div>
                <p className="mt-auto rounded-[10px] bg-white/6 px-2 py-2 text-[8px] leading-snug text-white/40">
                    Собери ролик из брифа {name}
                </p>
            </aside>
        </div>
    );
}

function DeskShapes({ kind }: { kind: PlaygroundSegment }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <span className={`ed-orb ed-orb-a wash-${kind}`} />
            <span className={`ed-orb ed-orb-b wash-${kind}-2`} />
            <span className="ed-orb ed-orb-c" />
        </div>
    );
}

function ShotFace({ copy }: { copy: PlaygroundCopy }) {
    if (copy.kind === "retail") {
        return (
            <div className={`${segmentWash("retail")} relative h-full`}>
                <DropTag label={copy.world.drop} />
            </div>
        );
    }

    if (copy.kind === "fintech") {
        const acc = copy.world.accounts[0];
        return (
            <div
                className={`${segmentWash("fintech")} relative flex h-full items-center justify-center`}
            >
                <LiveMoney
                    base={acc?.base ?? 0}
                    swing={acc?.swing ?? 1}
                    className="font-mono text-[18px] font-medium sm:text-[22px]"
                />
            </div>
        );
    }

    if (copy.kind === "gov") {
        return (
            <div className={`${segmentWash("gov")} relative h-full`}>
                <div className="absolute right-2 bottom-6 scale-90 sm:right-3 sm:bottom-7 sm:scale-100">
                    <GovStamp label={copy.world.stamp} slam replay="video" />
                </div>
            </div>
        );
    }

    return <div className={`${segmentWash("b2b")} h-full`} />;
}

function clipsFor(copy: PlaygroundCopy) {
    const flavor: Record<
        PlaygroundSegment,
        { n: number; dur: string; title: string; wash: string }[]
    > = {
        b2b: [
            { n: 1, dur: "2с", title: "Интро", wash: segmentWash("b2b") },
            { n: 2, dur: "3с", title: "KPI", wash: segmentWash("b2b", 2) },
            { n: 3, dur: "2с", title: "Кабинет", wash: segmentWash("b2b") },
            { n: 4, dur: "2с", title: "Команда", wash: segmentWash("b2b", 2) },
            { n: 5, dur: "1с", title: "Аутро", wash: segmentWash("b2b") },
        ],
        retail: [
            { n: 1, dur: "2с", title: "Обложка", wash: segmentWash("retail") },
            { n: 2, dur: "2с", title: "Примерка", wash: segmentWash("retail", 2) },
            { n: 3, dur: "1с", title: "Деталь", wash: segmentWash("retail") },
            { n: 4, dur: "3с", title: "Цена", wash: segmentWash("retail", 2) },
            { n: 5, dur: "2с", title: copy.world.drop, wash: segmentWash("retail") },
        ],
        fintech: [
            { n: 1, dur: "2с", title: "Остаток", wash: segmentWash("fintech") },
            { n: 2, dur: "3с", title: "График", wash: segmentWash("fintech", 2) },
            { n: 3, dur: "2с", title: "Пара", wash: segmentWash("fintech") },
            { n: 4, dur: "2с", title: "Журнал", wash: segmentWash("fintech", 2) },
            { n: 5, dur: "1с", title: "Итог", wash: segmentWash("fintech") },
        ],
        gov: [
            { n: 1, dur: "2с", title: "Титул", wash: segmentWash("gov") },
            { n: 2, dur: "2с", title: "Реестр", wash: segmentWash("gov", 2) },
            { n: 3, dur: "3с", title: "Лист", wash: segmentWash("gov") },
            { n: 4, dur: "2с", title: copy.world.stamp, wash: segmentWash("gov", 2) },
            { n: 5, dur: "1с", title: "Выпуск", wash: segmentWash("gov") },
        ],
    };
    return flavor[copy.kind];
}
