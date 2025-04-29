import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface DeleteRoleUsecase {
  execute(roleId: string): Promise<Usecase<any>>;
}

export class DeleteRoleUsecaseImpl implements DeleteRoleUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(roleId: string): Promise<Usecase<any>> {
    try {
      const data = await this.authRepository.deleteRole(roleId);
      return {
        data,
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
