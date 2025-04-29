import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface DeleteUserUsecase {
  execute(userId: string): Promise<Usecase<any>>;
}

export class DeleteUserUsecaseImpl implements DeleteUserUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(userId: string): Promise<Usecase<any>> {
    try {
      const result = await this.authRepository.deleteUser(userId);
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
