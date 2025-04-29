import {
  AuthRepository,
  AuthRepositoryImpl,
} from "@/repositories/auth.repository";
import { CreateRoleRequest } from "../../repositories/types/role/create-role-request.type";
import { Usecase } from "@/types/usecase.type";
import { axiosError } from "../../utils/axios-error.utils";

export interface CreateRoleUsecase {
  execute(req: CreateRoleRequest): Promise<Usecase<any>>;
}

export class CreateRoleUsecaseImpl implements CreateRoleUsecase {
  constructor(
    private readonly authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(req: CreateRoleRequest): Promise<Usecase<any>> {
    try {
      const result = await this.authRepository.createRole(req);
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
