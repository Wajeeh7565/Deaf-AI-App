// Browsers may disable storage. Preferences must never prevent using the app.
export const storage = {
  getItem(key: string): string | null { try { return window.localStorage.getItem(key); } catch { return null; } },
  setItem(key: string, value: string) { try { window.localStorage.setItem(key, value); } catch {} },
  removeItem(key: string) { try { window.localStorage.removeItem(key); } catch {} },
};
