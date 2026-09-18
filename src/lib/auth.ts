export type InterviewUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

const USER_KEY = 'prepkite-user';

function makeId(email: string) {
  const safe = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '').slice(0, 24) || 'user';
  return `user-${safe}`;
}

export function getCurrentUser(): InterviewUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<InterviewUser>;
    if (!parsed.id || !parsed.email || !parsed.name || !parsed.createdAt) return null;
    if (typeof parsed.id !== 'string' || typeof parsed.email !== 'string' || typeof parsed.name !== 'string' || typeof parsed.createdAt !== 'string') return null;
    return parsed as InterviewUser;
  } catch {
    return null;
  }
}

export function signIn(email: string, name?: string): InterviewUser {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = getCurrentUser();
  const user: InterviewUser = {
    id: makeId(normalizedEmail),
    email: normalizedEmail,
    name: (name?.trim() || normalizedEmail.split('@')[0] || 'Interview User').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    createdAt: existing?.email === normalizedEmail ? existing.createdAt : new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  localStorage.removeItem(USER_KEY);
}
