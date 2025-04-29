import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { CreateUserRequest } from "../../repositories/types/user/create-user-request.type";
import { UserResponse } from "../../repositories/types/user/user-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface CreateUserUsecase {
  execute(req: CreateUserRequest): Promise<Usecase<UserResponse>>;
}

export class CreateUserUsecaseImpl implements CreateUserUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(req: CreateUserRequest): Promise<Usecase<UserResponse>> {
    try {
      const result = await this.authRepository.createUser(req);
      return {
        data: result,
        error: false,
        message: "",
        description: "",
      };
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
