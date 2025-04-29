import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { UserResponse } from "../../repositories/types/user/user-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface GetUserUsecase {
  execute(id: string): Promise<Usecase<UserResponse>>;
}

export class GetUserUsecaseImpl implements GetUserUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(id: string): Promise<Usecase<UserResponse>> {
    try {
      const data = await this.authRepository.getUser(id);
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
