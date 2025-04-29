import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { DeleteRoleMappingRequest } from "../../repositories/types/role/delete-role-mapping-request.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface DeleteRoleMappingUsecase {
  execute(
    userId: string,
    request: DeleteRoleMappingRequest
  ): Promise<Usecase<any>>;
}

export class DeleteRoleMappingUsecaseImpl implements DeleteRoleMappingUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(
    userId: string,
    request: DeleteRoleMappingRequest
  ): Promise<Usecase<any>> {
    try {
      const data = await this.authRepository.deleteRoleMapping(userId, request);
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
