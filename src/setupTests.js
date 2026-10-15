import "@testing-library/jest-dom/vitest";

// Di Node 22+ ada global `localStorage`/`sessionStorage` bawaan yang bernilai
// undefined kecuali Node dijalankan dengan --localstorage-file, dan jsdom pun
// tidak menyediakan penggantinya di environment ini. Akibatnya komponen & test
// yang memakai localStorage gagal dengan "Cannot read properties of undefined".
// Pasang Storage in-memory sederhana supaya test tidak bergantung pada versi
// Node/jsdom. Perilakunya mengikuti Web Storage API: nilai selalu string.
class MemoryStorage {
  #data = new Map();

  get length() {
    return this.#data.size;
  }

  key(index) {
    return [...this.#data.keys()][index] ?? null;
  }

  getItem(key) {
    const k = String(key);
    return this.#data.has(k) ? this.#data.get(k) : null;
  }

  setItem(key, value) {
    this.#data.set(String(key), String(value));
  }

  removeItem(key) {
    this.#data.delete(String(key));
  }

  clear() {
    this.#data.clear();
  }
}

for (const key of ["localStorage", "sessionStorage"]) {
  const target = typeof window !== "undefined" ? window : globalThis;
  if (!target[key]) {
    const storage = new MemoryStorage();
    const descriptor = { value: storage, configurable: true, writable: true };
    Object.defineProperty(globalThis, key, descriptor);
    if (typeof window !== "undefined" && window !== globalThis) {
      Object.defineProperty(window, key, descriptor);
    }
  }
}
