import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitLead, validateLead, LeadValidationError, type FieldErrors, type LeadPayload } from "../api";
import {
  AGREEMENT,
  PRIVACY,
  asset,
  composePilotMessage,
  pilotContours,
  pilotPacks,
  pilotTeams,
  type PilotContour,
  type PilotPack,
  type PilotTeam,
} from "../content";
import { useLandingHash } from "../landingHash";
import { usePrefersReducedMotion } from "./PlaygroundMotion";

const initial: LeadPayload = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
  consent: false,
};

function asContour(value?: string): PilotContour {
  return pilotContours.some((item) => item.id === value) ? (value as PilotContour) : "saas";
}
function asPack(value?: string): PilotPack {
  return pilotPacks.some((item) => item.id === value) ? (value as PilotPack) : "all";
}
function asTeam(value?: string): PilotTeam {
  return pilotTeams.some((item) => item.id === value) ? (value as PilotTeam) : "marketing";
}

export function Contact() {
  const { params, patch } = useLandingHash();
  const contour = asContour(params.contour);
  const pack = asPack(params.pack);
  const team = asTeam(params.team);
  const plan = params.plan;
  const generated = composePilotMessage({ contour, pack, team, plan });

  const scoped = Boolean(plan || params.contour || params.pack || params.team);
  const [values, setValues] = useState<LeadPayload>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [advancedOpen, setAdvancedOpen] = useState(scoped);
  const mutation = useMutation({ mutationFn: submitLead });
  const reducedMotion = usePrefersReducedMotion();
  const extraRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const sent = mutation.isSuccess;

  useEffect(() => {
    if (sent) setAdvancedOpen(false);
    else if (scoped) setAdvancedOpen(true);
  }, [scoped, sent]);

  useEffect(() => {
    if (!advancedOpen) return;
    function onPointer(event: MouseEvent) {
      const root = extraRef.current;
      if (!root) return;
      const target = event.target;
      if (target instanceof Node && root.contains(target)) return;
      const active = document.activeElement;
      if (active instanceof HTMLSelectElement && root.contains(active)) return;
      setAdvancedOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setAdvancedOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [advancedOpen]);

  useEffect(() => {
    if (!plan) return;
    const nextPack = params.pack ?? (plan === "start" ? "web" : "all");
    const nextContour = params.contour ?? (plan === "contour" ? "airgap" : "saas");
    const nextTeam = params.team ?? (plan === "contour" ? "security" : plan === "start" ? "small" : "marketing");
    if (nextPack === params.pack && nextContour === params.contour && nextTeam === params.team) return;
    patch({ params: { pack: nextPack, contour: nextContour, team: nextTeam } });
  }, [plan, params.pack, params.contour, params.team, patch]);

  useEffect(() => {
    if (!sent) return;
    successRef.current?.focus({ preventScroll: true });
  }, [sent]);

  function update<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function payload(): LeadPayload {
    const note = values.message.trim();
    return { ...values, message: note ? `${generated} ${note}` : generated };
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (mutation.isPending) return;
    const nextValues = payload();
    const next = validateLead(values);
    setErrors(next);
    const focus =
      next.name ? nameRef : next.email ? emailRef : next.company ? companyRef : next.role ? roleRef : next.message ? messageRef : next.consent ? consentRef : null;
    focus?.current?.focus();
    if (Object.keys(next).length) return;
    mutation.mutate(nextValues, {
      onError: (error) => {
        if (error instanceof LeadValidationError) setErrors(error.fields);
      },
    });
  }

  return (
    <section id="contact" className="px-4 py-12 md:px-5 md:py-[60px] lg:px-10 lg:py-24">
      <div className="grid overflow-hidden rounded-[24px] bg-white min-[1000px]:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
        <BookDemoStage />
        <div className="@container relative flex flex-col p-6 md:p-8 lg:p-12">
          <div inert={sent || undefined} aria-hidden={sent || undefined}>
            <h2 className="text-[32px] leading-[1.25] font-medium tracking-[-0.03em] text-black md:text-[40px] md:leading-[1.2] lg:text-[52px] lg:leading-[1.23]">
              Заявка на пилот
            </h2>
            <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-mute">
              Расскажите о задаче — подберём формат пилота и контур.
            </p>
          <div ref={extraRef} className="relative mt-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mute hover:text-black"
              aria-expanded={advancedOpen}
              aria-controls="pilot-scope"
              onClick={() => setAdvancedOpen((open) => !open)}
            >
              Дополнительно
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 motion-safe:transition-transform motion-safe:duration-200 ${advancedOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div
              id="pilot-scope"
              className={`grid overflow-hidden motion-safe:transition-[grid-template-rows,opacity,margin,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                advancedOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              } min-[1000px]:absolute min-[1000px]:inset-x-0 min-[1000px]:top-full min-[1000px]:z-20 min-[1000px]:mt-2 min-[1000px]:grid-rows-[1fr] min-[1000px]:origin-top min-[1000px]:overflow-visible min-[1000px]:rounded-2xl min-[1000px]:bg-white min-[1000px]:p-4 min-[1000px]:shadow-[0_18px_50px_rgba(0,0,0,0.14)] min-[1000px]:ring-1 min-[1000px]:ring-black/8 ${
                advancedOpen
                  ? "min-[1000px]:visible min-[1000px]:scale-100 min-[1000px]:opacity-100"
                  : "min-[1000px]:invisible min-[1000px]:pointer-events-none min-[1000px]:scale-[0.98] min-[1000px]:opacity-0"
              }`}
              inert={!advancedOpen || undefined}
            >
              <div className="min-h-0 overflow-hidden min-[1000px]:overflow-visible">
                <div className="grid gap-3 @xl:grid-cols-2">
              <ScopeSelect
                label="Контур"
                options={pilotContours}
                value={contour}
                onChange={(id) => patch({ id: "contact", params: { contour: id } })}
              />
              <ScopeSelect
                label="Форматы"
                options={pilotPacks}
                value={pack}
                onChange={(id) => patch({ id: "contact", params: { pack: id } })}
              />
              <ScopeSelect
                label="Команда"
                options={pilotTeams}
                value={team}
                onChange={(id) => patch({ id: "contact", params: { team: id } })}
                className="@xl:col-span-2"
              />
                </div>
              </div>
            </div>
          </div>

          <form className="mt-5 flex flex-col gap-3" onSubmit={onSubmit} noValidate aria-busy={mutation.isPending}>
            <Field label="Имя" error={errors.name} fieldId="lead-name">
              <input
                ref={nameRef}
                id="lead-name"
                className={inputClass(errors.name)}
                value={values.name}
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "lead-name-error" : undefined}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>
            <Field label="Рабочий email" error={errors.email} fieldId="lead-email">
              <input
                ref={emailRef}
                id="lead-email"
                className={inputClass(errors.email)}
                type="email"
                value={values.email}
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "lead-email-error" : undefined}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Компания" error={errors.company} fieldId="lead-company">
                <input
                  ref={companyRef}
                  id="lead-company"
                  className={inputClass(errors.company)}
                  value={values.company}
                  aria-invalid={errors.company ? true : undefined}
                  aria-describedby={errors.company ? "lead-company-error" : undefined}
                  onChange={(e) => update("company", e.target.value)}
                />
              </Field>
              <Field label="Роль" error={errors.role} fieldId="lead-role">
                <input
                  ref={roleRef}
                  id="lead-role"
                  className={inputClass(errors.role)}
                  value={values.role}
                  aria-invalid={errors.role ? true : undefined}
                  aria-describedby={errors.role ? "lead-role-error" : undefined}
                  onChange={(e) => update("role", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Задача" error={errors.message} fieldId="lead-message">
              <textarea
                ref={messageRef}
                id="lead-message"
                rows={2}
                className={`${inputClass(errors.message)} min-h-[72px] resize-none py-2.5`}
                value={values.message}
                placeholder="Что проверить на пилоте"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "lead-message-error" : undefined}
                onChange={(e) => update("message", e.target.value)}
              />
            </Field>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-mute">
              <input
                ref={consentRef}
                type="checkbox"
                className="mt-1 h-4 w-4 accent-black"
                checked={values.consent}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "lead-consent-error" : undefined}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span>
                Соглашаюсь с{" "}
                <a className="font-semibold text-black underline underline-offset-2" href={PRIVACY} target="_blank" rel="noreferrer">
                  политикой конфиденциальности
                </a>{" "}
                и{" "}
                <a className="font-semibold text-black underline underline-offset-2" href={AGREEMENT} target="_blank" rel="noreferrer">
                  соглашением на обработку персональных данных
                </a>
                .
              </span>
            </label>
            {errors.consent ? (
              <p id="lead-consent-error" className="field-error field-error-on text-sm text-[#c43d3d]">
                <span className="min-h-0 overflow-hidden">{errors.consent}</span>
              </p>
            ) : (
              <p id="lead-consent-error" className="field-error text-sm text-[#c43d3d]" aria-hidden>
                <span className="min-h-0 overflow-hidden">&nbsp;</span>
              </p>
            )}
            <button
              type="submit"
              className="btn-press mt-1 inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:bg-[#242424] disabled:opacity-60"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Отправляем…" : "Отправить заявку"}
            </button>
          </form>
          </div>
          {sent ? (
            <div
              className={`absolute inset-0 z-30 bg-white/80 backdrop-blur-md ${reducedMotion ? "" : "contact-success-in"}`}
              role="status"
            >
              <div className="sticky top-24 px-6 py-10 md:px-8 lg:px-12">
                <p className="gradient-text text-sm font-semibold">Заявка отправлена</p>
                <h2
                  ref={successRef}
                  tabIndex={-1}
                  className="mt-3 text-[32px] font-medium tracking-[-0.03em] text-black outline-none md:text-[40px]"
                >
                  Мы свяжемся с вами
                </h2>
                <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-mute md:text-base">
                  Обычно отвечаем в тот же день и предлагаем контур под ваш периметр.
                </p>
                <button
                  type="button"
                  className="btn-press mt-8 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:-translate-y-px hover:bg-[#242424]"
                  onClick={() => {
                    mutation.reset();
                    setValues(initial);
                    setErrors({});
                  }}
                >
                  Отправить ещё одну
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ScopeSelect<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: readonly { id: T; label: string; hint?: string }[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <label className={`flex min-w-0 flex-col gap-2 text-sm font-medium text-black ${className}`}>
      {label}
      <select
        className={`${inputClass()} min-w-0 max-w-full pr-9`}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function BookDemoStage() {
  const reduced = usePrefersReducedMotion();
  const poster = asset("assets/images/book-demo.png");
  const mediaClass = `pointer-events-none absolute inset-0 h-full w-full object-cover object-center ${reduced ? "" : "contact-media-float"}`;

  return (
    <div className="relative hidden min-h-0 self-stretch overflow-hidden bg-canvas min-[1000px]:block">
      {reduced ? (
        <img src={poster} alt="" className={mediaClass} />
      ) : (
        <video
          className={mediaClass}
          src={asset("assets/images/book-demo-video.mp4")}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          aria-hidden
        />
      )}
    </div>
  );
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
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-black">
      {label}
      {children}
      <span
        id={`${fieldId}-error`}
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
