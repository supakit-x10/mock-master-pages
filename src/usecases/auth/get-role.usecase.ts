import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { RoleResponse } from "../../repositories/types/role/role-response.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface GetRoleUsecase {
  execute(id: string): Promise<Usecase<RoleResponse>>;
}

export class GetRoleUsecaseImpl implements GetRoleUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(id: string): Promise<Usecase<RoleResponse>> {
    try {
      const data = await this.authRepository.getRole(id);
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
