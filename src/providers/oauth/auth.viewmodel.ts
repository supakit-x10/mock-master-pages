import { configure, makeAutoObservable, toJS } from "mobx";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../../adapters/cookies.adapter";
import { JwtAdapter, JwtAdapterImpl } from "../../adapters/jwt.adapter";
import {
  LogoutUsecase,
  LogoutUsecaseImpl,
} from "../../usecases/auth/logout.usecase";
import {
  VerifyUsecase,
  VerifyUsecaseImpl,
} from "../../usecases/auth/verify.usecase";
// import {
//   OpenidConfigUsecase,
//   OpenidConfigUsecaseImpl,
// } from "../../usecases/openid/openid-config.usecase";

configure({
  enforceActions: "never",
});

interface JwtPayload {
  sub?: string;
  aid?: string;
  sid?: string;
  username?: string;
  email?: string;
  attributes?: Record<string, any>;
  roles?: Record<string, any>[];
  enabled?: boolean;
}

export class AuthViewModel {
  private jwtPayload: JwtPayload = {};
  expired = false;
  closable = false;
  open = false;
  isReady = false;
  isLogout = false;

  constructor(
    private logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl(),
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl(),
    private jwtAdapter: JwtAdapter = new JwtAdapterImpl(),
    private verifyUsecase: VerifyUsecase = new VerifyUsecaseImpl(),
    // private openidConfigUsecase: OpenidConfigUsecase = new OpenidConfigUsecaseImpl()
  ) {
    makeAutoObservable(this);
  }

  getToken(): string {
    return this.cookiesAdapter.get(CookiesKey.AccessToken);
  }

  getClientId(): string {
    return this.cookiesAdapter.get(CookiesKey.ClientId);
  }

  getClientSecret(): string {
    return this.cookiesAdapter.get(CookiesKey.ClientSecret);
  }

  get payload() {
    return toJS(this.jwtPayload);
  }

  get username() {
    return toJS(this.jwtPayload).username || "U";
  }

  reset() {
    this.jwtPayload = {};
    this.expired = false;
    this.closable = false;
    this.open = false;
    this.isReady = false;
  }

  getAccessToken() {
    const token = this.cookiesAdapter.get(CookiesKey.AccessToken);
    console.log("🚀 ~ AuthViewModel ~ getAccessToken ~ token:", token)
    if (token) {
      const resultPayload = this.jwtAdapter.decode(token);
      this.jwtPayload = resultPayload;
    } else {
      this.jwtPayload = {};
    }
  }

  checkTokenExpired() {
    const token = this.cookiesAdapter.get(CookiesKey.AccessToken);
    if (!token) {
      if (!this.isLogout) {
        this.expired = true;
      }
      return;
    }
    const resultPayload = this.jwtAdapter.decode(token);
    if (resultPayload.exp) {
      if (this.isTokenExpired(resultPayload.exp)) {
        this.expired = true;
      }
    }
  }

  isTokenExpired(exp: number) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime > exp;
  }

  async verify() {
    const verify = await this.verifyUsecase.execute();
    this.isReady = verify;
    return verify;
  }

  async logout() {
    try {
      this.isLogout = true;
      await this.deleteSession();
      this.resetCookies();
      this.reset();
    } catch (error) {}
  }

  resetCookies() {
    this.cookiesAdapter.delete(CookiesKey.AccessToken);
    this.cookiesAdapter.delete(CookiesKey.RefreshToken);
  }

  async getConfig() {
    // const { error, data } = await this.openidConfigUsecase.execute();
    // if (error) return;

    // this.cookiesAdapter.set(CookiesKey.ClientId, data.client_id);
    // this.cookiesAdapter.set(CookiesKey.ClientSecret, data.client_secret);
  }

  private async deleteSession() {
    try {
      await this.logoutUsecase.execute();
      return;
    } catch (error) {
      return;
    }
  }
}

const authViewModel = new AuthViewModel();

export default authViewModel;
