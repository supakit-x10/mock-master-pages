import { CryptoJsAdapter, CryptoJsAdapterImpl } from "./crypto-js.adapter";

export enum LocalStorageKey {
  Username = "UMS_USERNAME",
}

export interface LocalStorageAdapter {
  get(key: LocalStorageKey): string | null;
  set(key: LocalStorageKey, value: string, secret: string): void;
  delete(key: LocalStorageKey): void;
}

export class LocalStorageAdapterImpl implements LocalStorageAdapter {
  constructor(
    private cryptoJsAdapter: CryptoJsAdapter = new CryptoJsAdapterImpl()
  ) {}

  get(key: LocalStorageKey): string | null {
    return localStorage.getItem(key);
  }

  set(key: LocalStorageKey, value: string, secret: string): void {
    const encrypt = this.cryptoJsAdapter.encrypt(value, secret);
    localStorage.setItem(key, encrypt);
  }

  delete(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}
