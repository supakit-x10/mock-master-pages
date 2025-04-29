import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../../adapters/cookies.adapter";
import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { LoginRequest } from "../../repositories/types/auth/login-request.type";
import { LoginResponse } from "../../repositories/types/auth/login-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface LoginUsecase {
  execute(req: LoginRequest): Promise<Usecase<LoginResponse>>;
}

export class LoginUsecaseImpl implements LoginUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl(),
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
  ) {}

  async execute(req: LoginRequest): Promise<Usecase<LoginResponse>> {
    try {
      const data = await this.authRepository.login(req);

      this.cookiesAdapter.set(CookiesKey.AccessToken, data.access_token);

      if (data?.refresh_token) {
        this.cookiesAdapter.set(CookiesKey.RefreshToken, data.refresh_token);
      }

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
