export const playgroundFormats = [
    { id: "sites", label: "Сайт" },
    { id: "images", label: "Изображение" },
    { id: "video", label: "Видео" },
    { id: "banners", label: "Баннер" },
    { id: "presentations", label: "Презентация" },
] as const;

export const playgroundSegments = [
    { id: "b2b", label: "B2B" },
    { id: "retail", label: "ритейл" },
    { id: "fintech", label: "финтех" },
    { id: "gov", label: "госсектор" },
] as const;

export type PlaygroundFormat = (typeof playgroundFormats)[number]["id"];
export type PlaygroundSegment = (typeof playgroundSegments)[number]["id"];

export type PlaygroundBrief = {
    name: string;
    offer: string;
    url: string;
};

export const samplePlaygroundBrief: PlaygroundBrief = {
    name: "Снэпбилд",
    offer: "Маркетинг в фирменном стиле за минуты",
    url: "https://snapbuild.ru",
};

export type Account = {
    name: string;
    mask: string;
    base: number;
    swing: number;
};

export type LedgerRow = {
    time: string;
    title: string;
    amount: string;
    dir: "in" | "out";
};

export type Product = {
    name: string;
    price: string;
    was: string;
    tag: string;
};

export type Campaign = {
    name: string;
    owner: string;
    status: string;
    formats: string;
};

export type PortalDoc = {
    id: string;
    title: string;
    date: string;
    state: string;
};

export type Pair = {
    symbol: string;
    rate: string;
    delta: string;
    dir: "up" | "down";
};

export type World = {
    drop: string;
    stamp: string;
    kpis: { value: string; label: string }[];
    campaigns: Campaign[];
    activity: string[];
    team: string[];
    products: Product[];
    places: string[];
    accounts: Account[];
    ledger: LedgerRow[];
    pairs: Pair[];
    docs: PortalDoc[];
    services: { title: string; hint: string }[];
};

export type PlaygroundCopy = {
    kind: PlaygroundSegment;
    kicker: string;
    headline: string;
    sub: string;
    cta: string;
    poster: string;
    host: string;
    nav: string[];
    world: World;
};

type FieldErrors = Partial<Record<"name" | "url" | "offer", string>>;

export type BriefGate =
    | { state: "ready" }
    | { state: "incomplete"; title: string; detail: string }
    | { state: "rejected"; title: string; detail: string };

const rejectedBrief =
    /сток|unsplash|shutterstock|canva|midjourney|chatgpt|dall-?e|figma community|без бренда|любой стиль/i;

export function validatePlayground(brief: PlaygroundBrief): FieldErrors {
    const errors: FieldErrors = {};
    const name = brief.name.trim();
    const offer = brief.offer.trim();
    const url = brief.url.trim();

    if (name.length < 2) errors.name = "Укажите продукт — минимум 2 символа";
    if (name.length > 60) errors.name = "Название слишком длинное";
    if (offer.length > 140) errors.offer = "Оффер слишком длинный";
    if (url && !/^https?:\/\/[^\s]+$/i.test(url))
        errors.url = "Укажите ссылку вида https://…";
    if (!errors.offer && rejectedBrief.test(offer)) {
        errors.offer = "Стоковые и внешние генераторы не проходят дизайн-систему";
    }
    if (!errors.url && rejectedBrief.test(url)) {
        errors.url = "Ссылка вне контура бренда";
    }
    return errors;
}

export function assessPlayground(brief: PlaygroundBrief): BriefGate {
    const name = brief.name.trim();
    const offer = brief.offer.trim();
    const url = brief.url.trim();
    if (name.length < 2) {
        return {
            state: "incomplete",
            title: "Бриф неполный",
            detail: "Укажите продукт — без имени не к чему привязать сетку, цвет и компоненты.",
        };
    }
    if (url && !/^https?:\/\/[^\s]+$/i.test(url)) {
        return {
            state: "incomplete",
            title: "Ссылка не разбирается",
            detail: "Оставьте поле пустым или укажите адрес вида https://…",
        };
    }
    if (rejectedBrief.test(`${offer} ${url}`)) {
        return {
            state: "rejected",
            title: "Отклонено дизайн-системой",
            detail: "Стоковые библиотеки и внешние генераторы не проходят контур бренда. Соберите набор из своего продукта.",
        };
    }
    return { state: "ready" };
}

export function composePlayground(
    brief: PlaygroundBrief,
    segment: PlaygroundSegment,
): PlaygroundCopy {
    const name = brief.name.trim() || "Бренд";
    const offer = brief.offer.trim();
    const host = hostFrom(brief.url, name);
    return { ...profiles[segment](name, offer), host };
}

const profiles: Record<
    PlaygroundSegment,
    (name: string, offer: string) => Omit<PlaygroundCopy, "host">
> = {
    b2b: (name, offer) => ({
        kind: "b2b",
        kicker: "Кабинет маркетинга",
        headline: `${name}: один бриф — весь набор`,
        sub:
            offer ||
            "Кампания, статусы и четыре формата в одном кабинете — без новой постановки.",
        cta: "Открыть кабинет",
        poster: `${name}. Q3 кампания`,
        nav: ["Кампании", "Материалы", "Команда", "Отчёты"],
        world: baseWorld(name, {
            campaigns: [
                {
                    name: `${name} / запуск`,
                    owner: "Маркетинг",
                    status: "в работе",
                    formats: "сайт · баннер",
                },
                {
                    name: `${name} / пилот`,
                    owner: "Продукт",
                    status: "ревью",
                    formats: "презентация",
                },
                {
                    name: `${name} / найм`,
                    owner: "HR",
                    status: "готово",
                    formats: "изображение",
                },
            ],
            activity: [
                "Сайт собран из брифа",
                "Баннер 1080 отправлен на ревью",
                "Презентация экспортирована",
            ],
            team: ["И. Волков", "М. Орлова", "А. Белов"],
            kpis: [
                { value: "4", label: "формата" },
                { value: "12", label: "материалов" },
                { value: "3", label: "кампании" },
                { value: "1", label: "бриф" },
            ],
        }),
    }),
    retail: (name, offer) => ({
        kind: "retail",
        kicker: "Новая коллекция",
        headline: `${name}. Дроп недели`,
        sub:
            offer ||
            "Витрина, цена и ресайзы — из одной карточки, в цвете бренда.",
        cta: "В корзину",
        poster: `${name} · дроп`,
        nav: ["Новое", "Одежда", "Аксессуары", "Sale"],
        world: baseWorld(name, {
            drop: "Дроп",
            products: [
                {
                    name: `${name} топ`,
                    price: "12 900 ₽",
                    was: "16 400 ₽",
                    tag: "хит",
                },
                {
                    name: `${name} шоппер`,
                    price: "4 200 ₽",
                    was: "5 100 ₽",
                    tag: "new",
                },
                {
                    name: `${name} кепка`,
                    price: "3 400 ₽",
                    was: "3 900 ₽",
                    tag: "sale",
                },
            ],
            places: ["Москва", "СПб", "Казань", "Онлайн"],
        }),
    }),
    fintech: (name, offer) => ({
        kind: "fintech",
        kicker: "Контур счетов",
        headline: `${name} · операционный день`,
        sub:
            offer ||
            "Остатки, журнал и лимиты внутри периметра — без внешних вызовов.",
        cta: "Выписка",
        poster: `${name}. Остатки`,
        nav: ["Счета", "Журнал", "Лимиты", "Отчёты"],
        world: baseWorld(name, {
            accounts: [
                {
                    name: "Расчётный",
                    mask: "· 4412",
                    base: 18490200,
                    swing: 42000,
                },
                {
                    name: "Резерв",
                    mask: "· 1180",
                    base: 6423000,
                    swing: 18000,
                },
                {
                    name: "К выплате",
                    mask: "· 9033",
                    base: 2194500,
                    swing: 26000,
                },
            ],
            ledger: [
                {
                    time: "09:41",
                    title: "Эквайринг · витрина",
                    amount: "+ 128 400",
                    dir: "in",
                },
                {
                    time: "09:44",
                    title: `Бюджет · ${name}`,
                    amount: "− 64 200",
                    dir: "out",
                },
                {
                    time: "09:51",
                    title: "Комиссия контура",
                    amount: "− 890",
                    dir: "out",
                },
                {
                    time: "10:02",
                    title: "Возврат по реестру",
                    amount: "+ 12 600",
                    dir: "in",
                },
            ],
            pairs: [
                {
                    symbol: "USD/RUB",
                    rate: "91,42",
                    delta: "+0,18",
                    dir: "up",
                },
                {
                    symbol: "EUR/RUB",
                    rate: "99,10",
                    delta: "−0,24",
                    dir: "down",
                },
                {
                    symbol: "CNY/RUB",
                    rate: "12,61",
                    delta: "+0,04",
                    dir: "up",
                },
            ],
        }),
    }),
    gov: (name, offer) => ({
        kind: "gov",
        kicker: "Официальный портал",
        headline: `${name}. Материалы к выпуску`,
        sub:
            offer ||
            "Реестр, номер документа и согласование — как на ведомственном портале.",
        cta: "В реестр",
        poster: `№ 14-07/${name.slice(0, 8)}`,
        nav: ["Новости", "Документы", "Услуги", "Контакты"],
        world: baseWorld(name, {
            stamp: "Согласовано",
            docs: [
                {
                    id: "14-07/01",
                    title: "Гайдлайн визуального стиля",
                    date: "12.08.2026",
                    state: "утв.",
                },
                {
                    id: "14-07/02",
                    title: "Реестр допущенных моделей",
                    date: "18.08.2026",
                    state: "актуален",
                },
                {
                    id: "14-07/03",
                    title: "Лист выпуска комплекта",
                    date: "23.08.2026",
                    state: "согласовано",
                },
            ],
            services: [
                { title: "Запись на ревью", hint: "слот 15 мин" },
                { title: "Справка из реестра", hint: "PDF" },
                { title: "Статус выпуска", hint: "онлайн" },
            ],
        }),
    }),
};

function baseWorld(name: string, patch: Partial<World>): World {
    return {
        drop: "Дроп",
        stamp: "Согласовано",
        kpis: [],
        campaigns: [],
        activity: [],
        team: [],
        places: [],
        accounts: [],
        ledger: [],
        pairs: [],
        docs: [],
        services: [],
        ...patch,
        products: patch.products ?? [
            {
                name: `${name} · дроп`,
                price: "12 900 ₽",
                was: "16 400 ₽",
                tag: "хит",
            },
        ],
    };
}

function hostFrom(url: string, name: string) {
    try {
        if (url.trim()) return new URL(url.trim()).host.replace(/^www\./, "");
    } catch {
        // keep a brand host when the URL cannot be parsed
    }
    const slug = name
        .toLowerCase()
        .replace(/[^a-zа-я0-9]+/gi, "-")
        .replace(/^-|-$/g, "");
    return `${slug || "brand"}.ru`;
}

export function productName(copy: PlaygroundCopy) {
    return copy.headline.split(/[\s—:.]/)[0] || "Бренд";
}

export function segmentWash(kind: PlaygroundSegment, tone: 1 | 2 = 1) {
    return tone === 2 ? `wash-${kind}-2` : `wash-${kind}`;
}

export function money(value: number) {
    return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}
