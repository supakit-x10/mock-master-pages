import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../../adapters/cookies.adapter";
import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { LoginResponseType } from "../../repositories/types/auth/login-request.type";
import { TwoFactorVerifyRequest } from "../../repositories/types/auth/two-factor-verify-request.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface TwoFactorVerifyUsecase {
  execute(code: string, responseType: LoginResponseType): Promise<Usecase<any>>;
}

export class TwoFactorVerifyUsecaseImpl implements TwoFactorVerifyUsecase {
  constructor(
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl(),
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(
    otp: string,
    responseType: LoginResponseType
  ): Promise<Usecase<any>> {
    try {
      const req: TwoFactorVerifyRequest = {
        otp,
        response_type: responseType,
      };

      const data = await this.authRepository.twoFactorVerify(req);

      this.cookiesAdapter.set(
        CookiesKey.AccessToken,
        data.access_token,
        data.expires_in
      );

      this.cookiesAdapter.set(
        CookiesKey.RefreshToken,
        data.refresh_token,
        data.refresh_expires_in
      );

      return { data, error: false, message: "", description: "" };
    } catch (error) {
      const { data, message, description } = axiosError(error);
      return {
        data,
        message,
        description,
        error: true,
      };
    }
  }
}
