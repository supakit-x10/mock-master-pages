import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { UpdateUserRequest } from "../../repositories/types/user/update-user-request.type";
import { UserResponse } from "../../repositories/types/user/user-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface UpdateUserUsecase {
  execute(id: string, req: UpdateUserRequest): Promise<Usecase<UserResponse>>;
}

export class UpdateUserUsecaseImpl implements UpdateUserUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(
    id: string,
    req: UpdateUserRequest
  ): Promise<Usecase<UserResponse>> {
    try {
      const data = await this.authRepository.updateUser(id, req);
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
