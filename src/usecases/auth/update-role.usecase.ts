import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { UpdateRoleRequest } from "../../repositories/types/role/create-role-request.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface UpdateRoleUsecase {
  execute(id: string, req: UpdateRoleRequest): Promise<Usecase<any>>;
}

export class UpdateRoleUsecaseImpl implements UpdateRoleUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(id: string, req: UpdateRoleRequest): Promise<Usecase<any>> {
    try {
      const data = await this.authRepository.updateRole(id, req);
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
