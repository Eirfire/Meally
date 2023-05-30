class localStorageService {
  async setLocal(key: string, value: any) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  async readLocal<T>(key: string): Promise<T | any> {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(window.localStorage.getItem(key) as string);
      } catch {
        return window.localStorage.getItem(key);
      }
    }
  }

  async removeKey(key: string) {
    if (typeof window !== "undefined" && key) {
      window.localStorage.removeItem(key);
    }
  }

  async removeAllKey() {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  }
}

// Path: packages\libs\utils\localStorageService.ts
// eslint-disable-next-line import/no-anonymous-default-export
export default new localStorageService();