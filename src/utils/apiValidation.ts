import type { CVData } from './cvTypes';

export type ValidationResult<T> =
  { ok: true; data: T } | { ok: false; error: string };

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface CvOptimiserRequest {
  jobDescription: string;
  currentCV: CVData;
}

const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const JOB_DESCRIPTION_LIMIT = 20000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const requiredText = (
  value: unknown,
  field: string,
  maxLength: number
): ValidationResult<string> => {
  if (typeof value !== 'string' || value.trim() === '') {
    return { ok: false, error: `${field} is required` };
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    return {
      ok: false,
      error: `${field} must be at most ${maxLength} characters`,
    };
  }
  return { ok: true, data: trimmed };
};

export const parseContactMessage = (
  body: unknown
): ValidationResult<ContactMessage> => {
  if (!isRecord(body)) {
    return { ok: false, error: 'Request body must be a JSON object' };
  }

  const name = requiredText(body.name, 'name', CONTACT_LIMITS.name);
  if (!name.ok) return name;

  const email = requiredText(body.email, 'email', CONTACT_LIMITS.email);
  if (!email.ok) return email;
  if (!EMAIL_PATTERN.test(email.data)) {
    return { ok: false, error: 'email must be a valid email address' };
  }

  const message = requiredText(body.message, 'message', CONTACT_LIMITS.message);
  if (!message.ok) return message;

  return {
    ok: true,
    data: { name: name.data, email: email.data, message: message.data },
  };
};

const isCvData = (value: unknown): value is CVData =>
  isRecord(value) &&
  isRecord(value.personalInfo) &&
  typeof value.summary === 'string' &&
  isStringArray(value.skills) &&
  Array.isArray(value.experience) &&
  value.experience.every(
    (entry) =>
      isRecord(entry) &&
      typeof entry.company === 'string' &&
      isStringArray(entry.responsibilities)
  ) &&
  Array.isArray(value.education);

export const parseCvOptimiserRequest = (
  body: unknown
): ValidationResult<CvOptimiserRequest> => {
  if (!isRecord(body)) {
    return { ok: false, error: 'Request body must be a JSON object' };
  }

  const jobDescription = requiredText(
    body.jobDescription,
    'jobDescription',
    JOB_DESCRIPTION_LIMIT
  );
  if (!jobDescription.ok) return jobDescription;

  if (!isCvData(body.currentCV)) {
    return { ok: false, error: 'currentCV is missing or malformed' };
  }

  return {
    ok: true,
    data: { jobDescription: jobDescription.data, currentCV: body.currentCV },
  };
};

export const readJsonBody = async (request: Request): Promise<unknown> => {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
};

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
