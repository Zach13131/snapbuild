import type { ReactNode } from "react";
import { MAIL, PRIVACY, TELEGRAM, TELEGRAM_DEMO, asset } from "../content";

export function Footer() {
  return (
    <footer id="footer" className="flex flex-col gap-8 px-4 py-8 md:px-5 lg:px-10 lg:pt-16">
      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        <div className="max-w-[297px]">
          <a href="#hero" aria-label="Снэпбилд">
            <img src={asset("assets/images/582db07d8ccd60da.svg")} alt="Снэпбилд" className="h-[22px] w-[153px]" />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            Платформа, где все создается в рамках вашего бренда и дизайн-системы
          </p>
        </div>
        <nav className="grid gap-8 sm:grid-cols-3" aria-label="Подвал">
          <FooterCol title="Навигация">
            <a href="#process">Продукт</a>
            <a href="#use-cases">Возможности</a>
            <a href="#playground" className="max-[799px]:hidden">
              Набор из идеи
            </a>
            <a href="#audiences">Сценарии</a>
            <a href="#compare">Преимущества</a>
            <a href="#features">Безопасность</a>
            <a href="#implementation">Внедрение</a>
            <a href="#roadmap">Роадмап</a>
            <a href="#pricing">Тарифы</a>
            <a href="#reviews">Отзывы</a>
            <a href="#faq">Частые вопросы</a>
            <a href="#contact">Заявка</a>
          </FooterCol>
          <FooterCol title="Документация">
            <a href={PRIVACY} target="_blank" rel="noreferrer">
              Политика конфиденциальности
            </a>
            <a href="#faq">FAQ</a>
          </FooterCol>
          <FooterCol title="Контакты">
            <a href={TELEGRAM_DEMO} target="_blank" rel="noreferrer">
              Запросить демо
            </a>
            <a href={TELEGRAM} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={`mailto:${MAIL}`} className="md:hidden">
              {MAIL}
            </a>
          </FooterCol>
        </nav>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-black/6 pt-6 text-sm font-medium text-mute md:flex-row">
        <p>© Сгенерировано в Снэпбилде. Все права защищены.</p>
        <a href={`mailto:${MAIL}`} className="hidden text-inherit no-underline md:inline">
          {MAIL}
        </a>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-black">{title}</p>
      <div className="flex flex-col gap-2 text-sm text-mute [&_a]:text-inherit [&_a]:no-underline hover:[&_a]:text-black">{children}</div>
    </div>
  );
}
