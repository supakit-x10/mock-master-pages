import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { ResetPasswordRequest } from "../../repositories/types/auth/reset-password-request.type";
import { ResetPasswordResponse } from "../../repositories/types/auth/reset-password-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface ResetPasswordUsecase {
  execute(
    request: ResetPasswordRequest
  ): Promise<Usecase<ResetPasswordResponse>>;
}

export class ResetPasswordUsecaseImpl implements ResetPasswordUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(
    request: ResetPasswordRequest
  ): Promise<Usecase<ResetPasswordResponse>> {
    try {
      const data = await this.authRepository.resetPassword(request);
      return { data, message: "", description: "", error: false };
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
