import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { RoleMappingRequest } from "../../repositories/types/role/role-mapping-request.type";
import { Usecase } from "../../types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface RoleMappingUsecase {
  execute(userId: string, request: RoleMappingRequest): Promise<Usecase<any>>;
}

export class RoleMappingUsecaseImpl implements RoleMappingUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(
    userId: string,
    request: RoleMappingRequest
  ): Promise<Usecase<any>> {
    try {
      const data = await this.authRepository.roleMapping(userId, request);
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
