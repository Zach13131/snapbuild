import type { ReactNode } from "react";
import {
    productName,
    segmentWash,
    type PlaygroundCopy,
    type PlaygroundFormat,
} from "../playground";
import {
    Bars,
    Chrome,
    DropTag,
    GovStamp,
    LimitBar,
    LiveClock,
    LiveMoney,
    Ring,
    Spark,
} from "./PlaygroundMotion";
import { VideoDesk } from "./PlaygroundVideo";

const FLOW = [28, 34, 30, 48, 41, 62, 55, 70, 64, 78];
const WEEK = [42, 58, 49, 72, 63, 84, 56];
const FORMATS = ["Сайт", "Баннер", "Слайды", "Постер"];

export function SegmentStage({
    copy,
    format,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
}) {
    if (format === "video") return <VideoDesk copy={copy} />;
    if (copy.kind === "b2b") return <B2B copy={copy} format={format} />;
    if (copy.kind === "retail") return <Retail copy={copy} format={format} />;
    if (copy.kind === "fintech") return <Fintech copy={copy} format={format} />;
    return <Gov copy={copy} format={format} />;
}

function B2B({
    copy,
    format,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
}) {
    const name = productName(copy);

    if (format === "images") {
        return (
            <div className="absolute inset-0 bg-[#eceef2] p-2 sm:p-4 md:p-5">
                <article className="flex h-full overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                    <div className="relative hidden w-[40%] flex-col justify-between p-4 sm:flex">
                        <div className={`${segmentWash("b2b")} absolute inset-0`} />
                        <p className="relative text-[10px] text-black/55">
                            {copy.kicker}
                        </p>
                        <div className="relative">
                            <p className="text-[22px] leading-[1.1] font-medium tracking-[-0.03em] md:text-[26px]">
                                {copy.poster}
                            </p>
                            <p className="mt-2 text-[11px] text-black/55">
                                один бриф → весь набор
                            </p>
                        </div>
                        <div className="relative flex flex-wrap gap-1.5">
                            {FORMATS.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full bg-black px-2 py-1 text-[9px] text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col px-4 py-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] text-mute">
                                    кабинет / Q3
                                </p>
                                <p className="text-[15px] font-semibold tracking-[-0.03em]">
                                    {name}
                                </p>
                            </div>
                            <span className="rounded-lg bg-black px-2 py-1 text-[9px] text-white">
                                {copy.cta}
                            </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {copy.world.kpis.map((kpi) => (
                                <div
                                    key={kpi.label}
                                    className="rounded-[14px] bg-canvas px-2.5 py-2"
                                >
                                    <p className="text-[16px] font-semibold">
                                        {kpi.value}
                                    </p>
                                    <p className="text-[9px] text-mute">
                                        {kpi.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-[14px] bg-canvas">
                            {copy.world.campaigns.map((row) => (
                                <div
                                    key={row.name}
                                    className="flex items-center justify-between border-b border-black/5 px-3 py-2 last:border-0"
                                >
                                    <div>
                                        <p className="text-[11px] font-medium">
                                            {row.name}
                                        </p>
                                        <p className="text-[9px] text-mute">
                                            {row.formats}
                                        </p>
                                    </div>
                                    <span className="text-[9px] text-mute">
                                        {row.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex -space-x-1.5">
                                {copy.world.team.map((person) => (
                                    <span
                                        key={person}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[8px] text-white"
                                    >
                                        {person
                                            .split(" ")
                                            .map((part) => part[0])
                                            .join("")}
                                    </span>
                                ))}
                            </div>
                            <p className="text-[10px] text-mute">
                                {copy.world.activity[0]}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    if (format === "banners") {
        return (
            <div className="absolute inset-0 flex flex-col bg-white">
                <div className={`${segmentWash("b2b")} relative flex-1 px-5 pt-5 pb-4 md:px-7 md:pt-7`}>
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] text-black/50">
                            {name} · кабинет
                        </p>
                        <span className="rounded-full bg-black px-2.5 py-0.5 text-[9px] text-white">
                            Q3 · 1080
                        </span>
                    </div>
                    <h3 className="mt-6 max-w-[14ch] text-[30px] leading-[1.05] font-medium tracking-[-0.03em] md:text-[40px]">
                        4 формата из одного брифа
                    </h3>
                    <p className="mt-2 max-w-[36ch] text-[12px] text-black/55 md:text-[14px]">
                        {copy.sub}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {copy.world.team.map((person) => (
                            <span
                                key={person}
                                className="rounded-full bg-white/70 px-2 py-1 text-[9px]"
                            >
                                {person}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 px-5 py-4 md:px-7">
                    {FORMATS.map((item, i) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-[14px] bg-canvas"
                        >
                            <div
                                className={`h-12 md:h-16 ${segmentWash("b2b", i % 2 ? 2 : 1)}`}
                            />
                            <p className="px-1.5 py-1.5 text-center text-[9px] font-medium">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between border-t border-black/6 px-5 py-3 md:px-7">
                    <div className="flex gap-4">
                        {copy.world.kpis.slice(0, 3).map((kpi) => (
                            <div key={kpi.label}>
                                <p className="text-[14px] font-semibold">
                                    {kpi.value}
                                </p>
                                <p className="text-[8px] text-mute">
                                    {kpi.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <span className="rounded-xl bg-black px-3 py-1.5 text-[11px] font-semibold text-white">
                        {copy.cta}
                    </span>
                </div>
            </div>
        );
    }

    if (format === "presentations") {
        return (
            <Frame>
                <article className="flex aspect-video w-full max-w-[580px] overflow-hidden rounded-[20px] bg-white">
                    <div className="hidden w-[88px] shrink-0 flex-col gap-1.5 bg-canvas p-2 min-[420px]:flex">
                        {["KPI", "Кампании", "План"].map((thumb, i) => (
                            <div
                                key={thumb}
                                className={`flex h-12 items-end rounded-md p-1 text-[8px] ${i === 0 ? "bg-black text-white" : "bg-white"}`}
                            >
                                {thumb}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                        <p className="gradient-text text-[10px] font-semibold">
                            16:9 · слайд 01
                        </p>
                        <h3 className="max-w-[16ch] text-[22px] font-medium tracking-[-0.03em]">
                            {copy.headline}
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {copy.world.kpis.map((kpi) => (
                                <div
                                    key={kpi.label}
                                    className="rounded-[12px] bg-canvas px-2 py-2"
                                >
                                    <p className="text-[14px] font-semibold">
                                        {kpi.value}
                                    </p>
                                    <p className="text-[9px] text-mute">
                                        {kpi.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {FORMATS.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full bg-black px-2 py-0.5 text-[9px] text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            </Frame>
        );
    }

    return (
        <div className="absolute inset-0 flex bg-[#eceef2] text-black">
            <aside className="hidden w-[132px] shrink-0 flex-col gap-1.5 border-r border-black/6 bg-[#1b1c20] px-2.5 py-3 text-white sm:flex md:w-[148px]">
                <p className="truncate px-1.5 text-[10px] font-semibold tracking-[-0.02em]">
                    {name}
                </p>
                {copy.nav.map((item, i) => (
                    <span
                        key={item}
                        className={`rounded-lg px-2 py-2 text-[10px] ${i === 0 ? "bg-white text-black" : "text-white/50"}`}
                    >
                        {item}
                    </span>
                ))}
            </aside>
            <div className="no-scrollbar min-w-0 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between gap-2 px-3 py-3 min-[400px]:px-4">
                    <div className="min-w-0">
                        <p className="text-[10px] text-mute">кабинет / кампании</p>
                        <p className="truncate text-[15px] font-semibold tracking-[-0.03em]">
                            {copy.headline}
                        </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                        {copy.cta}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-4">
                    {copy.world.kpis.map((kpi) => (
                        <div
                            key={kpi.label}
                            className="rounded-[16px] bg-white px-2.5 py-2.5"
                        >
                            <p className="text-[16px] font-semibold tracking-[-0.03em]">
                                {kpi.value}
                            </p>
                            <p className="text-[9px] text-mute">{kpi.label}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 px-4 sm:grid-cols-4">
                    {FORMATS.map((item, i) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-[14px] bg-white"
                        >
                            <div
                                className={`h-10 ${segmentWash("b2b", i % 2 ? 2 : 1)}`}
                            />
                            <p className="px-2 py-1.5 text-[9px] font-medium">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-3 overflow-hidden rounded-[16px] bg-white mx-4">
                    <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr] px-3 py-2 text-[9px] text-mute">
                        <span>кампания</span>
                        <span>владелец</span>
                        <span>статус</span>
                    </div>
                    {copy.world.campaigns.map((row) => (
                        <div
                            key={row.name}
                            className="grid grid-cols-[1.2fr_0.7fr_0.6fr] border-t border-black/6 px-3 py-2.5"
                        >
                            <div>
                                <p className="text-[11px] font-medium">{row.name}</p>
                                <p className="text-[9px] text-mute">
                                    {row.formats}
                                </p>
                            </div>
                            <p className="self-center text-[10px]">{row.owner}</p>
                            <p className="self-center text-[10px] text-mute">
                                {row.status}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-3 mb-4 grid grid-cols-2 gap-3 px-4">
                    <div className="rounded-[16px] bg-white p-3">
                        <p className="text-[10px] font-semibold">Активность</p>
                        <ul className="mt-2 space-y-1.5">
                            {copy.world.activity.map((line) => (
                                <li
                                    key={line}
                                    className="text-[10px] leading-snug text-mute"
                                >
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[16px] bg-white p-3">
                        <p className="text-[10px] font-semibold">Команда</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {copy.world.team.map((person) => (
                                <span
                                    key={person}
                                    className="rounded-full bg-canvas px-2 py-1 text-[10px]"
                                >
                                    {person}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Retail({
    copy,
    format,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
}) {
    const hero = copy.world.products[0];

    if (format === "images") {
        return (
            <Frame light>
                <article className="relative flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.1)] sm:rounded-[24px]">
                    <div className="relative min-h-0 flex-[1.15] overflow-hidden">
                        <div className={`${segmentWash("retail")} h-full`} />
                        <DropTag label={copy.world.drop} />
                        <div className="absolute bottom-2 left-2 flex gap-1 sm:bottom-3 sm:left-3">
                            {["XS", "S", "M", "L"].map((size) => (
                                <span
                                    key={size}
                                    className={`rounded-full px-2 py-0.5 text-[8px] ${size === "M" ? "bg-black text-white" : "bg-white/80"}`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col justify-between gap-2 p-3 sm:p-5">
                        <div>
                            <p className="text-[9px] tracking-[0.12em] text-mute uppercase sm:text-[10px]">
                                {hero?.tag} недели
                            </p>
                            <h3 className="mt-0.5 text-[18px] leading-[1.1] font-medium sm:text-[24px]">
                                {copy.poster}
                            </h3>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[16px] font-semibold sm:text-[18px]">
                                    {hero?.price}
                                </p>
                                <p className="text-[10px] text-mute line-through sm:text-[11px]">
                                    {hero?.was}
                                </p>
                            </div>
                            <span className="rounded-xl bg-black px-3 py-1.5 text-[10px] text-white">
                                {copy.cta}
                            </span>
                        </div>
                    </div>
                </article>
            </Frame>
        );
    }

    if (format === "banners") {
        return (
            <Frame light>
                <article className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] bg-black text-white">
                    <div className={`${segmentWash("retail", 2)} relative h-36`}>
                        <DropTag label={copy.world.drop} />
                        <p className="absolute bottom-3 left-4 text-[11px] tracking-[0.14em] uppercase">
                            {copy.kicker}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <h3 className="text-[28px] leading-[1.05] font-medium">
                            −21% на дроп
                        </h3>
                        <p className="mt-1 text-[14px]">{hero?.price}</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {copy.world.products.map((item) => (
                                <div
                                    key={item.name}
                                    className="rounded-[12px] bg-white/8 px-2 py-2"
                                >
                                    <p className="truncate text-[9px] text-white/60">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px]">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </Frame>
        );
    }

    if (format === "presentations") {
        return (
            <div className="absolute inset-0 bg-[#eceef2] p-2 sm:p-4 md:p-6">
                <article className="flex h-full flex-col overflow-hidden rounded-[18px] bg-[#fff6f1] sm:rounded-[22px]">
                    <div className="flex items-start justify-between gap-3 px-3 pt-3 sm:px-5 sm:pt-4">
                        <div className="min-w-0">
                            <p className="text-[9px] tracking-[0.14em] text-mute uppercase">
                                16:9 · look 01
                            </p>
                            <h3 className="mt-1 truncate text-[16px] leading-tight font-medium tracking-[-0.03em] sm:text-[22px]">
                                {copy.headline}
                            </h3>
                            <p className="mt-0.5 text-[10px] text-mute sm:text-[11px]">
                                {hero?.price} · {copy.world.places[0]}
                            </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-black px-2.5 py-1 text-[9px] text-white">
                            {copy.world.drop}
                        </span>
                    </div>
                    <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 gap-1.5 px-3 pb-3 sm:mt-4 sm:gap-3 sm:px-5 sm:pb-5">
                        {copy.world.products.map((item, i) => (
                            <div
                                key={item.name}
                                className="flex min-h-0 flex-col overflow-hidden rounded-[12px] bg-white sm:rounded-[16px]"
                            >
                                <div
                                    className={`min-h-0 flex-1 ${segmentWash("retail", i % 2 ? 2 : 1)}`}
                                />
                                <div className="shrink-0 px-1.5 py-1.5 sm:px-2 sm:py-2">
                                    <p className="truncate text-[9px] font-semibold sm:text-[10px]">
                                        {item.name}
                                    </p>
                                    <p className="text-[9px] sm:text-[10px]">
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex flex-col bg-white text-black">
            <div className="bg-black px-4 py-1.5 text-center text-[10px] text-white">
                Бесплатная доставка от 8 000 ₽ · {copy.world.places[0]}
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="text-[13px] font-semibold tracking-[-0.03em]">
                    {productName(copy)}
                </span>
                <span className="hidden flex-1 rounded-full bg-canvas px-3 py-1.5 text-[10px] text-mute sm:block">
                    поиск по дропу
                </span>
                <span className="text-[10px]">сумка · 0</span>
            </div>
            <div className="flex gap-1.5 overflow-hidden px-4 pb-2">
                {copy.nav.map((item, i) => (
                    <span
                        key={item}
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${i === 0 ? "bg-black text-white" : "bg-canvas"}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
                <div className="relative mx-4 mt-1 overflow-hidden rounded-[22px]">
                    <div className={`${segmentWash("retail")} relative h-40 md:h-48`}>
                        <DropTag label={copy.world.drop} />
                    </div>
                    <div className="bg-[#fff6f1] px-4 py-4">
                        <p className="text-[10px] tracking-[0.12em] text-mute uppercase">
                            {hero?.tag} недели
                        </p>
                        <h3 className="mt-1 text-[22px] leading-[1.15] font-medium tracking-[-0.03em] md:text-[26px]">
                            {copy.headline}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-[20px] font-semibold">
                                {hero?.price}
                            </span>
                            <span className="text-[12px] text-mute line-through">
                                {hero?.was}
                            </span>
                        </div>
                        <div className="mt-3 flex gap-1.5">
                            {["XS", "S", "M", "L"].map((size) => (
                                <span
                                    key={size}
                                    className={`rounded-full px-2.5 py-1 text-[10px] ${size === "M" ? "bg-black text-white" : "bg-white"}`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="px-4 pt-4 text-[11px] font-semibold">
                    Ещё из дропа
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2 px-4">
                    {copy.world.products.map((item, i) => (
                        <article
                            key={item.name}
                            className="overflow-hidden rounded-[16px] bg-[#fff6f1]"
                        >
                            <div className={`${segmentWash("retail", i % 2 ? 2 : 1)} h-14`} />
                            <div className="px-2 py-2">
                                <p className="text-[10px] leading-tight font-medium">
                                    {item.name}
                                </p>
                                <p className="mt-0.5 text-[10px]">{item.price}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mx-4 mt-3 rounded-[16px] bg-canvas px-3 py-2.5">
                    <p className="text-[10px] font-semibold">Отзыв недели</p>
                    <p className="mt-1 text-[10px] leading-snug text-mute">
                        Села с первого раза. Цвет как на витрине — забрала в{" "}
                        {copy.world.places[0]}.
                    </p>
                </div>
                <div className="flex gap-1.5 overflow-hidden px-4 py-3">
                    {copy.world.places.map((place) => (
                        <span
                            key={place}
                            className="shrink-0 rounded-full bg-canvas px-2.5 py-1 text-[10px]"
                        >
                            {place}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Fintech({
    copy,
    format,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
}) {
    const name = productName(copy);
    const total = copy.world.accounts.reduce((sum, acc) => sum + acc.base, 0);
    const share = total
        ? Math.round(((copy.world.accounts[0]?.base ?? 0) / total) * 100)
        : 68;

    if (format === "images") {
        return (
            <div className={`${segmentWash("fintech")} absolute inset-0 flex items-center justify-center p-2 sm:p-5 md:p-8`}>
                <article className="flex h-full w-full max-w-[360px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#121318]/90 p-3 text-white ring-1 ring-white/8 sm:rounded-[24px] sm:p-5">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-[10px] text-white/40">
                            {copy.kicker}
                        </p>
                        <span className="rounded-full bg-[#7dffa0]/15 px-2 py-0.5 font-mono text-[8px] text-[#7dffa0]">
                            live
                        </span>
                    </div>
                    <div>
                        <p className="text-[11px] text-white/50">доступно</p>
                        <LiveMoney
                            base={copy.world.accounts[0]?.base ?? 0}
                            swing={copy.world.accounts[0]?.swing ?? 1}
                            className="font-mono text-[22px] font-medium sm:text-[28px]"
                        />
                    </div>
                    <Spark values={FLOW} className="h-10 w-full sm:h-12" />
                    <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-2 py-2">
                        <Ring pct={share} label="расчётный" />
                        <LiveClock className="font-mono text-[10px] text-white/30" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                        {copy.world.pairs.map((pair) => (
                            <div
                                key={pair.symbol}
                                className="rounded-[12px] bg-white/5 px-1.5 py-1.5"
                            >
                                <p className="font-mono text-[8px] text-white/40">
                                    {pair.symbol}
                                </p>
                                <p className="font-mono text-[10px] sm:text-[11px]">
                                    {pair.rate}
                                </p>
                                <p
                                    className={`font-mono text-[8px] ${pair.dir === "up" ? "text-[#7dffa0]" : "text-[#ff8a8a]"}`}
                                >
                                    {pair.delta}
                                </p>
                            </div>
                        ))}
                    </div>
                    <LimitBar label="лимит дня" used={62} cap="1.24 / 2.0 млн" />
                </article>
            </div>
        );
    }

    if (format === "banners") {
        return (
            <div className={`${segmentWash("fintech", 2)} absolute inset-0 flex items-center justify-center overflow-hidden p-4 md:p-8`}>
                <article className="flex aspect-square h-full max-h-[380px] w-auto max-w-full flex-col justify-between rounded-[24px] bg-[#121318]/80 p-5 text-white ring-1 ring-white/10">
                    <div className="flex items-start justify-between">
                        <p className="font-mono text-[10px] text-white/40">
                            {name} · остаток дня
                        </p>
                        <LiveClock className="font-mono text-[10px] text-white/30" />
                    </div>
                    <LiveMoney
                        base={copy.world.accounts[0]?.base ?? 0}
                        swing={copy.world.accounts[0]?.swing ?? 1}
                        className="font-mono text-[30px] leading-none"
                    />
                    <Spark values={FLOW} className="h-10 w-full" />
                    <Bars values={WEEK} className="h-9" />
                    <div className="grid grid-cols-3 gap-1.5">
                        {copy.world.pairs.map((pair) => (
                            <div
                                key={pair.symbol}
                                className="rounded-[10px] bg-white/5 px-1.5 py-1.5"
                            >
                                <p className="font-mono text-[8px] text-white/40">
                                    {pair.symbol}
                                </p>
                                <p className="font-mono text-[10px]">{pair.rate}</p>
                                <p
                                    className={`font-mono text-[8px] ${pair.dir === "up" ? "text-[#7dffa0]" : "text-[#ff8a8a]"}`}
                                >
                                    {pair.delta}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <LimitBar label="лимит дня" used={62} cap="2.0 млн" />
                        </div>
                        <span className="shrink-0 font-mono text-[8px] text-[#7dffa0]/80">
                            152-ФЗ
                        </span>
                    </div>
                </article>
            </div>
        );
    }

    if (format === "presentations") {
        return (
            <div className="absolute inset-0 overflow-hidden bg-[#0a0a0c] p-2 sm:p-4 md:p-5">
                <article className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-[18px] bg-[#121318] p-3 text-white sm:gap-2.5 sm:rounded-[20px] sm:p-4">
                    <div className="flex shrink-0 items-start justify-between gap-3">
                        <div>
                            <p className="gradient-text text-[10px] font-semibold">
                                16:9 · операционный день
                            </p>
                            <h3 className="mt-0.5 text-[15px] font-medium tracking-[-0.03em] sm:text-[18px]">
                                {copy.headline}
                            </h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-white/8 px-2 py-1 font-mono text-[9px] text-white/50">
                            внутри контура
                        </span>
                    </div>
                    <div className="grid shrink-0 grid-cols-3 gap-2">
                        {copy.world.accounts.map((acc) => (
                            <div
                                key={acc.name}
                                className="rounded-[12px] bg-white/5 px-2 py-2"
                            >
                                <p className="text-[9px] text-white/40">{acc.name}</p>
                                <LiveMoney
                                    base={acc.base}
                                    swing={acc.swing}
                                    className="font-mono text-[12px] sm:text-[14px]"
                                />
                                <Spark
                                    values={FLOW.map((v, i) => v + (acc.base % 7) + i)}
                                    className="mt-1 h-5 w-full sm:h-6"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid min-h-0 flex-1 grid-cols-[1.2fr_1fr] gap-2">
                        <div className="flex h-full min-h-0 flex-col rounded-[12px] bg-white/5 p-2.5">
                            <p className="shrink-0 text-[9px] text-white/40">
                                оборот · пн–вс
                            </p>
                            <Spark
                                values={FLOW}
                                className="mt-1 min-h-0 w-full flex-1"
                            />
                            <Bars values={WEEK} className="mt-2 h-7 shrink-0" />
                        </div>
                        <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden rounded-[12px] bg-white/5 p-2.5">
                            <Ring pct={share} label="расчётный" />
                            <ul className="space-y-1">
                                {copy.world.pairs.map((pair) => (
                                    <li
                                        key={pair.symbol}
                                        className="flex justify-between font-mono text-[9px]"
                                    >
                                        <span className="text-white/40">{pair.symbol}</span>
                                        <span>{pair.rate}</span>
                                        <span
                                            className={
                                                pair.dir === "up"
                                                    ? "text-[#7dffa0]"
                                                    : "text-[#ff8a8a]"
                                            }
                                        >
                                            {pair.delta}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Spark
                                values={FLOW.map((v) => v * 0.72)}
                                className="min-h-0 w-full flex-1"
                            />
                            <LimitBar label="лимит дня" used={62} cap="2.0 млн" />
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex overflow-hidden bg-[#0c0d10] text-white">
            <aside className="hidden w-[128px] shrink-0 flex-col gap-1 border-r border-white/8 bg-[#101114] px-2 py-2 sm:flex md:w-[144px]">
                <p className="truncate px-1.5 font-mono text-[10px] font-semibold">
                    {name}
                </p>
                {copy.nav.map((item, i) => (
                    <span
                        key={item}
                        className={`rounded-lg px-2 py-2 text-[10px] ${
                            i === 0 ? "bg-white/10 text-white" : "text-white/40"
                        }`}
                    >
                        {item}
                    </span>
                ))}
                <span className="mt-auto px-1.5 font-mono text-[8px] text-[#7dffa0]/80">
                    ● контур
                </span>
            </aside>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                <Chrome host={copy.host} />
                <div className="flex items-center justify-between gap-2 bg-[#121318] px-3 py-1.5">
                    <p className="min-w-0 truncate font-mono text-[11px]">
                        {copy.headline}
                    </p>
                    <div className="flex shrink-0 items-center gap-2 font-mono text-[9px] text-white/40">
                        <span className="hidden text-[#7dffa0] sm:inline">
                            квитовка · 2
                        </span>
                        <span className="hidden rounded-full bg-[#7dffa0]/12 px-2 py-0.5 text-[#7dffa0] sm:inline">
                            152-ФЗ
                        </span>
                        <LiveClock />
                    </div>
                </div>
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-1.5">
                    <div className="grid shrink-0 grid-cols-3 gap-1.5">
                        {copy.world.accounts.map((acc) => (
                            <article
                                key={acc.name}
                                className="rounded-[12px] bg-[#16171c] px-2 py-1.5 ring-1 ring-white/6"
                            >
                                <p className="text-[9px] text-white/40">
                                    {acc.name} {acc.mask}
                                </p>
                                <LiveMoney
                                    base={acc.base}
                                    swing={acc.swing}
                                    className="mt-0.5 block font-mono text-[12px] font-medium sm:text-[14px]"
                                />
                                <Spark
                                    values={FLOW.map(
                                        (v, i) => v + (acc.base % 9) + i,
                                    )}
                                    className="mt-1 h-4 w-full"
                                />
                            </article>
                        ))}
                    </div>
                    <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-2 overflow-hidden">
                        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[14px] bg-[#16171c] p-2 ring-1 ring-white/6">
                            <div className="flex shrink-0 items-center justify-between">
                                <p className="text-[10px] font-semibold">оборот дня</p>
                                <p className="font-mono text-[9px] text-white/30">
                                    пн–вс
                                </p>
                            </div>
                            <Spark
                                values={FLOW}
                                className="mt-1 min-h-0 w-full flex-1"
                            />
                            <Bars values={WEEK} className="mt-1 h-5 shrink-0" />
                        </div>
                        <div className="flex h-full min-h-0 flex-col gap-2 overflow-hidden rounded-[14px] bg-[#16171c] p-2 ring-1 ring-white/6">
                            <ul className="shrink-0 space-y-1">
                                {copy.world.pairs.map((pair) => (
                                    <li
                                        key={pair.symbol}
                                        className="flex items-center justify-between font-mono text-[10px]"
                                    >
                                        <span className="text-white/50">
                                            {pair.symbol}
                                        </span>
                                        <span>{pair.rate}</span>
                                        <span
                                            className={
                                                pair.dir === "up"
                                                    ? "text-[#7dffa0]"
                                                    : "text-[#ff8a8a]"
                                            }
                                        >
                                            {pair.delta}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="grid min-h-0 flex-1 grid-cols-3 content-center items-center gap-x-2 gap-y-3 py-1">
                                <Ring stack pct={share} label="расчётный" />
                                <Ring stack pct={48} label="эквайринг" />
                                <Ring stack pct={31} label="резерв" />
                                <Ring stack pct={62} label="лимит дня" />
                                <Ring stack pct={80} label="квитовка" />
                                <Ring stack pct={94} label="контур" />
                            </div>
                            <LimitBar
                                label="день"
                                used={62}
                                cap="1.24 / 2.0 млн"
                            />
                        </div>
                    </div>
                    <ul className="mt-1.5 shrink-0 overflow-hidden rounded-[14px] bg-[#16171c]">
                        {copy.world.ledger.slice(0, 3).map((row, i) => (
                            <li
                                key={row.time}
                                className={`flex items-center justify-between px-2.5 py-1 font-mono text-[10px] ${i > 0 ? "border-t border-white/6" : ""}`}
                            >
                                <span className="text-white/35">{row.time}</span>
                                <span className="flex-1 truncate px-2 text-white/70">
                                    {row.title}
                                </span>
                                <span
                                    className={
                                        row.dir === "in"
                                            ? "text-[#7dffa0]"
                                            : "text-white/55"
                                    }
                                >
                                    {row.amount}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Gov({
    copy,
    format,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
}) {
    const slam = format !== "sites";

    if (format === "images") {
        return (
            <div className={`${segmentWash("gov")} absolute inset-0 flex items-center justify-center p-2 sm:p-5 md:p-8`}>
                <article className="relative flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-[16px] bg-white px-3 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:rounded-[20px] sm:px-5 sm:py-5">
                    <span className="accent-line h-1 w-full rounded-full" />
                    <p className="mt-3 text-[9px] tracking-[0.16em] text-mute uppercase sm:mt-4 sm:text-[10px]">
                        документ {copy.poster}
                    </p>
                    <h3 className="mt-1.5 text-[16px] leading-snug font-medium sm:mt-2 sm:text-[20px]">
                        {copy.headline}
                    </h3>
                    <dl className="mt-3 space-y-1.5 text-[10px] sm:mt-4 sm:space-y-2 sm:text-[11px]">
                        <div className="flex justify-between">
                            <dt className="text-mute">орган</dt>
                            <dd>пресс-служба</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-mute">дата</dt>
                            <dd>23.08.2026</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-mute">статус</dt>
                            <dd className="gradient-text font-semibold">
                                согласовано
                            </dd>
                        </div>
                    </dl>
                    <div className="mt-3 rounded-[14px] bg-canvas px-3 py-2">
                        <p className="text-[10px] text-mute">состав комплекта</p>
                        <p className="mt-1 text-[11px]">
                            сайт · баннер · слайды · изображение
                        </p>
                    </div>
                    <div className="mt-auto flex justify-end pt-3 sm:pt-6">
                        <GovStamp
                            label={copy.world.stamp}
                            slam={slam}
                            replay={format}
                        />
                    </div>
                </article>
            </div>
        );
    }

    if (format === "banners") {
        return (
            <div className={`${segmentWash("gov", 2)} absolute inset-0 flex items-center justify-center p-5 md:p-8`}>
                <article className="relative flex aspect-square w-full max-w-[380px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#111] p-5 text-white">
                    <span className="accent-line h-1 w-24 rounded-full" />
                    <div>
                        <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                            официальный выпуск
                        </p>
                        <h3 className="mt-2 max-w-[14ch] text-[24px] leading-[1.15] font-medium">
                            {copy.headline}
                        </h3>
                        <p className="mt-2 text-[11px] text-white/50">
                            {copy.poster} · реестр допущен
                        </p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex gap-2">
                            {copy.world.docs.slice(0, 2).map((doc) => (
                                <span
                                    key={doc.id}
                                    className="rounded-lg bg-white/8 px-2 py-1 text-[9px] text-white/70"
                                >
                                    {doc.id}
                                </span>
                            ))}
                        </div>
                        <GovStamp
                            label={copy.world.stamp}
                            slam
                            replay={format}
                        />
                    </div>
                </article>
            </div>
        );
    }

    if (format === "presentations") {
        return (
            <Frame light>
                <article className="relative flex aspect-video w-full max-w-[580px] overflow-hidden rounded-[20px] bg-white">
                    <div className="accent-line w-1.5" />
                    <div className="flex flex-1 flex-col justify-between p-6">
                        <p className="text-[10px] tracking-[0.14em] text-mute uppercase">
                            слайд 01 · реестр
                        </p>
                        <h3 className="max-w-[18ch] text-[22px] font-medium">
                            {copy.headline}
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {copy.world.docs.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="rounded-[12px] bg-canvas px-2 py-2"
                                >
                                    <p className="text-[9px] text-mute">{doc.id}</p>
                                    <p className="mt-1 text-[10px] leading-tight font-medium">
                                        {doc.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-[11px] text-mute">{copy.cta}</p>
                            <GovStamp
                                label={copy.world.stamp}
                                slam
                                replay={format}
                            />
                        </div>
                    </div>
                </article>
            </Frame>
        );
    }

    return (
        <div className="absolute inset-0 flex flex-col overflow-hidden bg-white text-black">
            <div className="bg-[#111] text-white">
                <span className="accent-line block h-1" />
                <div className="flex items-center justify-between px-4 py-2.5">
                    <div>
                        <p className="text-[9px] tracking-[0.14em] text-white/45 uppercase">
                            официальный портал
                        </p>
                        <p className="text-[13px] font-semibold">
                            {productName(copy)}
                        </p>
                    </div>
                    <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                        {copy.cta}
                    </span>
                </div>
                <div className="flex items-center gap-3 px-4 pb-3">
                    <span className="flex-1 rounded-lg bg-white/8 px-3 py-1.5 text-[10px] text-white/40">
                        поиск по реестру
                    </span>
                    <div className="hidden gap-3 text-[10px] text-white/55 sm:flex">
                        {copy.nav.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="no-scrollbar min-h-0 flex-1 overflow-hidden px-4 py-3">
                <div className="relative rounded-[16px] bg-canvas px-4 py-3">
                    <p className="text-[10px] text-mute">{copy.kicker}</p>
                    <h3 className="mt-1 max-w-[28ch] text-[18px] leading-snug font-medium tracking-[-0.02em] md:text-[22px]">
                        {copy.headline}
                    </h3>
                    <p className="mt-1 text-[11px] text-mute">{copy.sub}</p>
                    <div className="absolute top-3 right-3">
                        <GovStamp label={copy.world.stamp} />
                    </div>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[1.3fr_1fr]">
                    <div>
                        <p className="text-[10px] font-semibold tracking-[0.08em] text-mute uppercase">
                            Документы
                        </p>
                        <ul className="mt-1 overflow-hidden rounded-[16px] bg-canvas">
                            {copy.world.docs.map((doc, i) => (
                                <li
                                    key={doc.id}
                                    className={`flex items-center justify-between px-3 py-2.5 text-[11px] ${i > 0 ? "border-t border-black/6" : ""}`}
                                >
                                    <div>
                                        <p className="font-medium">{doc.title}</p>
                                        <p className="text-[10px] text-mute">
                                            {doc.id} · {doc.date}
                                        </p>
                                    </div>
                                    <span
                                        className={
                                            doc.state === "согласовано"
                                                ? "gradient-text text-[10px] font-semibold"
                                                : "text-[10px] text-mute"
                                        }
                                    >
                                        {doc.state}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative rounded-[16px] bg-canvas px-4 py-4">
                        <p className="text-[10px] tracking-[0.12em] text-mute uppercase">
                            лист выпуска
                        </p>
                        <p className="mt-1 text-[14px] font-medium">
                            {copy.poster}
                        </p>
                        <p className="mt-1 text-[10px] text-mute">
                            сайт · баннер · слайды · изображение
                        </p>
                        <div className="mt-3 flex justify-end">
                            <GovStamp label={copy.world.stamp} />
                        </div>
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {copy.world.services.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-[16px] bg-canvas px-2 py-2"
                        >
                            <p className="text-[10px] leading-snug font-medium">
                                {item.title}
                            </p>
                            <p className="mt-1 text-[9px] text-mute">
                                {item.hint}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="shrink-0 bg-[#111] px-4 py-2">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-[9px] tracking-[0.12em] text-white/40 uppercase">
                        официальный портал
                    </p>
                    <p className="truncate font-mono text-[9px] text-white/35">
                        пресс-служба · 2026
                    </p>
                </div>
            </footer>
        </div>
    );
}

function Frame({
    children,
    dark,
    light,
}: {
    children: ReactNode;
    dark?: boolean;
    light?: boolean;
}) {
    const wash = light ? "bg-[#eceef2]" : dark ? "bg-[#0a0a0c]" : "bg-[#111]";
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 ${wash}`}
        >
            {children}
        </div>
    );
}
