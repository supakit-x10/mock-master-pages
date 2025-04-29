import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { CredentialsResponse } from "../../repositories/types/auth/credentials-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface GetCredentialsUsecase {
  execute(id: string): Promise<Usecase<CredentialsResponse[]>>;
}

export class GetCredentialsUsecaseImpl implements GetCredentialsUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(userId: string): Promise<Usecase<CredentialsResponse[]>> {
    try {
      const data = await this.authRepository.getCredentials(userId);
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
