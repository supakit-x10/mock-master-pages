import { configure, makeAutoObservable, runInAction } from "mobx";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../../adapters/cookies.adapter";

interface Store {
  mode: string;
  isDarkMode: boolean;
  isReady: boolean;
}

configure({
  enforceActions: "always",
});

export class ThemeViewModel {
  mode = "Light";
  isDarkMode = true;
  isReady = false;

  constructor(
    private readonly cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
  ) {
    makeAutoObservable(this);
  }

  verifyMode(val: boolean) {
    if (val) {
      return "Dark";
    } else {
      return "Light";
    }
  }

  setDarkMode(val: boolean) {
    runInAction(() => {
      this.isDarkMode = val;
      this.cookiesAdapter.set(CookiesKey.DarkMode, String(val));
      console.log("🚀 ~ ThemeViewModel ~ runInAction ~ val:", val)
      this.mode = this.verifyMode(val);
      console.log("🚀 ~ ThemeViewModel ~ runInAction ~  this.mode:",  this.mode)
    });
  }

  initMode() {
    runInAction(() => {
      const darkMode = this.cookiesAdapter.get(CookiesKey.DarkMode);
      console.log("🚀 ~ initMode ThemeViewModel ~ runInAction ~ darkMode:", darkMode)
      this.isDarkMode = Boolean(darkMode);
      this.mode = this.verifyMode(darkMode);
      this.isReady = true;
    })
  }
}

const themeViewModel = new ThemeViewModel();

export default themeViewModel;
