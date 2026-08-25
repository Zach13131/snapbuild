import { asset, compareColumns, compareRows } from "../content";

function cellValue(value: string) {
  if (value === "+ ИИ") {
    return (
      <span className="inline-flex items-center gap-1">
        <img src={asset("assets/images/a4ce0581ce7807b6.svg")} alt="" className="compare-check" />
        ИИ
      </span>
    );
  }
  return <span className="whitespace-pre-line">{value}</span>;
}

export function Compare() {
  return (
    <section id="compare" className="flex flex-col gap-8 py-8 md:gap-10 md:px-5 lg:px-10 lg:py-8">
      <header className="flex max-w-[720px] flex-col gap-2 px-4 md:gap-4 md:px-0">
        <h2 className="text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[46px] md:leading-[1.1] lg:text-[52px] lg:leading-[1.23]">
          Почему команды выбирают Снэпбилд
        </h2>
        <p className="text-[15px] leading-relaxed text-black/60 md:text-base">
          Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками
        </p>
      </header>
      <div className="compare-scroll no-scrollbar">
        <div className="compare-table" role="table">
          <div className="compare-brand-border" aria-hidden />
          <div className="compare-row compare-row-head" role="row">
            <div className="compare-cell compare-cell-label" role="columnheader">
              <span>Особенности</span>
            </div>
            {compareColumns.map((col, index) => (
              <div key={col} className="compare-cell" role="columnheader">
                {index === 0 ? <span className="compare-brandname">снэпбилд</span> : col}
              </div>
            ))}
          </div>
          {compareRows.map((row, rowIndex) => (
            <div key={row.label} className={`compare-row compare-row-${rowIndex + 1}`} role="row">
              <div className="compare-cell compare-cell-label" role="rowheader">
                {row.label}
              </div>
              {row.values.map((value, index) => (
                <div key={`${row.label}-${index}`} className="compare-cell" role="cell">
                  {cellValue(value)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
