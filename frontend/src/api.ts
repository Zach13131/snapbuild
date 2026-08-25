import type { Plan, Testimonial } from "./content";

type MockList<T> = {
  mocked: boolean;
  data: T[];
};

export function apiUrl(file: string) {
  const remote = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
  const name = file.replace(/^\//, "");
  if (remote) return `${remote}/${name}`;
  const base = import.meta.env.BASE_URL || "./";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}api/${name}`;
}

async function fetchMockList<T>(file: string): Promise<T[]> {
  const response = await fetch(apiUrl(file));
  if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
  const body = (await response.json()) as MockList<T>;
  if (!Array.isArray(body.data)) throw new Error(`${file}: expected data[]`);
  return body.data;
}

export function fetchPlans() {
  return fetchMockList<Plan>("plans.json");
}

export function fetchTestimonials() {
  return fetchMockList<Testimonial>("testimonials.json");
}

export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  consent: boolean;
};

export type LeadResult = {
  ok: true;
  id: string;
  mocked: true;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

export class LeadValidationError extends Error {
  fields: FieldErrors;
  constructor(fields: FieldErrors) {
    super("validation");
    this.name = "LeadValidationError";
    this.fields = fields;
  }
}

export function validateLead(payload: LeadPayload): FieldErrors {
  const errors: FieldErrors = {};
  const name = payload.name.trim();
  const email = payload.email.trim();
  const company = payload.company.trim();
  const message = payload.message.trim();

  if (name.length < 2) errors.name = "Укажите имя — минимум 2 символа";
  if (name.length > 80) errors.name = "Имя слишком длинное";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Укажите корректный email";
  if (company.length < 2) errors.company = "Укажите компанию";
  if (company.length > 120) errors.company = "Название компании слишком длинное";
  if (payload.role.length > 80) errors.role = "Должность слишком длинная";
  if (message.length < 10) errors.message = "Опишите задачу — минимум 10 символов";
  if (message.length > 2000) errors.message = "Сообщение слишком длинное";
  if (!payload.consent) errors.consent = "Нужно согласие на обработку данных";
  return errors;
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const clientErrors = validateLead(payload);
  if (Object.keys(clientErrors).length) throw new LeadValidationError(clientErrors);

  await new Promise((resolve) => setTimeout(resolve, 450));
  return { ok: true, id: `mock-${Date.now()}`, mocked: true };
}
