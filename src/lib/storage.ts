export function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocal(key: string) {
  localStorage.removeItem(key);
}
