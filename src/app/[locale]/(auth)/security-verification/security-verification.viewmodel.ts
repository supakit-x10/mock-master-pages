import { configure, makeAutoObservable } from "mobx";
import { LoginResponseType } from "../../../../repositories/types/auth/login-request.type";
import { SearchParams } from "../../../../types/params.type";
import { Path } from "../../../../types/path.enum";
import {
  TwoFactorQrUsecase,
  TwoFactorQrUsecaseImpl,
} from "../../../../usecases/auth/two-factor-qr.usecase";
import {
  TwoFactorVerifyUsecase,
  TwoFactorVerifyUsecaseImpl,
} from "../../../../usecases/auth/two-factor-verify.usecase copy";

configure({
  enforceActions: "never",
});

export class SecurityVerificationViewModel {
  isLoading = false;
  isQrcode = false;
  error = false;
  message = "";
  qrcode = "";
  isAuth = false;

  constructor(
    private twoFactorQrUsecase: TwoFactorQrUsecase = new TwoFactorQrUsecaseImpl(),
    private twoFactorVerifyUsecase: TwoFactorVerifyUsecase = new TwoFactorVerifyUsecaseImpl()
  ) {
    makeAutoObservable(this);
  }

  async generateQrcode() {
    const result = await this.getQrcode();

    if (!result) {
      return false;
    }

    this.isQrcode = !result.sotp;
    this.qrcode = result.otpAuthUrl;
    return true;
  }

  async verify(otp: string, searchParams: SearchParams) {
    this.isLoading = true;
    this.error = false;

    const { data, error, description } =
      await this.twoFactorVerifyUsecase.execute(
        otp,
        searchParams.response_type as LoginResponseType
      );
    this.isLoading = false;

    if (error) {
      this.error = true;
      this.message = description;
      return { invalid: false, redirect: "" };
    }

    if (searchParams.response_type === LoginResponseType.Code) {
      const params = new URLSearchParams();
      params.set(LoginResponseType.Code, data.access_token);
      return {
        invalid: true,
        redirect: `${searchParams.redirect_uri}?${params}`,
      };
    } else {
      return { invalid: true, redirect: Path.Datasource };
    }
  }

  private async getQrcode() {
    try {
      const result = await this.twoFactorQrUsecase.execute();
      return result;
    } catch (error) {
      return;
    }
  }
}

const securityVerificationViewModel = new SecurityVerificationViewModel();

export default securityVerificationViewModel;
