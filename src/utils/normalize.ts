export function normalizeEmailAddress(email: string): string {
  return email ? email.trim().toLowerCase() : '';
}

export function normalizeStr(text: string): string {
  return text ? text.trim().toLowerCase() : '';
}

export function normalizePassword(text: string): string {
  return text;
}

export function normalizeBoolean(bool: string | boolean | undefined): boolean {
  return Boolean(bool);
}
