import { configure, makeAutoObservable } from "mobx";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "@/adapters/cookies.adapter";
import {
  LocalStorageAdapter,
  LocalStorageAdapterImpl,
  LocalStorageKey,
} from "@/adapters/local-storage.adapter";
import {
  LoginRequest,
  LoginResponseType,
} from "@/repositories/types/auth/login-request.type";
// import { OpenidVerifyQuery } from "../../../../repositories/types/openid/openid-verify-query.type";
// import { OpenidVerifyResponse } from "../../../../repositories/types/openid/openid-verify-reponse.type";
import { SearchParams } from "../../../../types/params.type";
import { Path } from "@/types/path.enum";
import {
  LoginUsecase,
  LoginUsecaseImpl,
} from "@/usecases/auth/login.usecase";
// import {
//   OpenidVerifyUsecase,
//   OpenidVerifyUsecaseImpl,
// } from "../../../../usecases/openid/openid-verify.usecase";
import { Login } from "./types";

configure({
  enforceActions: "never",
});

export class LoginViewModel {
  isLoading = false;
  error = false;
  description = "";
  application: any = {
    name: "",
    description: "",
    enabled: false,
    enabled_otp: false,
    verify_email: false,
    token_type: "",
    expires_in: 0,
    refresh_expires_in: 0,
    expired_type: "",
    refresh_expired_type: "",
  };

  constructor(
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl(),
    private localStorageAdapter: LocalStorageAdapter = new LocalStorageAdapterImpl(),
    private loginUsecaseImpl: LoginUsecase = new LoginUsecaseImpl(),
    // private openidVerifyUsecase: OpenidVerifyUsecase = new OpenidVerifyUsecaseImpl()
  ) {
    makeAutoObservable(this);
  }

  async login(val: Login, searchParams: SearchParams) {
    this.isLoading = true;
    this.error = false;

    // if (searchParams.client_id) {
    //   this.cookiesAdapter.set(CookiesKey.ClientId, searchParams.client_id);
    //   this.cookiesAdapter.set(
    //     CookiesKey.ClientSecret,
    //     searchParams.client_secret
    //   );
    // } else {
    //   this.cookiesAdapter.delete(CookiesKey.ClientId);
    //   this.cookiesAdapter.delete(CookiesKey.ClientSecret);
    // }

    const req: LoginRequest = {
      username: val.username,
      password: val.password,
      // response_type: searchParams.response_type as LoginResponseType,
    };

    const { data, error, description } =
      await this.loginUsecaseImpl.execute(req);
    this.isLoading = false;

    if (error) {
      this.error = true;
      this.description = description;
      return;
    }

    if (val.remember) {
      this.localStorageAdapter.set(
        LocalStorageKey.Username,
        val.username,
        data.session_id
      );
    }

    if (data.enabled_otp) {
      const params = new URLSearchParams(searchParams as any);
      return {
        enabled_otp: data.enabled_otp,
        redirect: `${Path.SecurityVerification}?${params}`,
      };
    }

    // if (searchParams.response_type === LoginResponseType.Code) {
    //   const params = new URLSearchParams();
    //   params.set(LoginResponseType.Code, data.access_token);
    //   return {
    //     enabled_otp: data.enabled_otp,
    //     redirect: `${searchParams.redirect_uri}?${params}`,
    //   };
    // } else {
    //   return {
    //     enabled_otp: data.enabled_otp,
    //     redirect: Path.Datasource,
    //   };
    // }

    return {
      redirect: Path.Album,
    };
  }

  // async verify(req: OpenidVerifyQuery) {
  //   const result = await this.openidVerifyUsecase.execute(req);
  //   if (!result.error) {
  //     this.application = result.data;
  //   }
  //   return result;
  // }

  
}

const loginViewModel = new LoginViewModel();

export default loginViewModel;
