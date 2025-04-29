import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { LoginResponse } from "../../repositories/types/auth/login-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface VerifyCodeUsecase {
  execute(): Promise<Usecase<LoginResponse>>;
}

export class VerifyCodeUsecaseImpl implements VerifyCodeUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(): Promise<Usecase<LoginResponse>> {
    try {
      const data = await this.authRepository.verifyCode();
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
