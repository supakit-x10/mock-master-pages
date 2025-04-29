import Cookies, { CookieGetOptions } from "universal-cookie";

export enum CookiesKey {
  AccessToken = "ACCESS_TOKEN",
  RefreshToken = "REFRESH_TOKEN",
  DarkMode = "DARK_MODE",
  ClientId = "CLIENT_ID",
  ClientSecret = "CLIENT_SECRET",
  AppId = "APP_ID",
  AppNameId = "APP_NAME_ID",
  GroupId = "GROUP_ID",
  RedirectMainPage = "REDIRECT_MAIN_PAGE",
}

export interface CookiesAdapter {
  get(key: CookiesKey, options?: CookieGetOptions): any;
  set(key: CookiesKey, value: string, seconds?: number): void;
  delete(key: CookiesKey): void;
  deleteAll(): void;
}

export class CookiesAdapterImpl implements CookiesAdapter {
  cookieStore = new Cookies(null, { path: "/" });

  get(key: CookiesKey, options?: CookieGetOptions) {
    const val = this.cookieStore.get(key, options);
    return val ?? null;
  }

  set(key: CookiesKey, value: string, seconds: number = 259200) {
    this.cookieStore.set(key, value, {
      ...(seconds && { expires: new Date(Date.now() + 1000 * seconds) }),
    });
  }

  delete(key: CookiesKey) {
    this.cookieStore.remove(key);
  }

  deleteAll() {
    const keys = Object.values(CookiesKey);
    keys.forEach((key) => {
      this.delete(key);
    });
  }
}
