export const USER_INFO_STORAGE_KEY = "user-info";

export function getLocalStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
