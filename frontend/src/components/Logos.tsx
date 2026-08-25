import { asset, logoFiles } from "../content";

const loop = [...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles];

export function Logos() {
  return (
    <section id="logos" className="mt-4 overflow-hidden py-6 md:mt-8 md:py-8">
      <p className="px-4 text-center text-sm text-mute md:text-base">
        С платформой работают команды, для которых бренд — закон
      </p>
      <div className="marquee-shell mt-6 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-group" aria-hidden={copy === 1}>
              {loop.map((logo, index) => (
                <img
                  key={`${copy}-${logo.src}-${index}`}
                  src={asset(logo.src)}
                  alt={copy === 1 || index >= logoFiles.length ? "" : logo.alt}
                  className="marquee-logo"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
