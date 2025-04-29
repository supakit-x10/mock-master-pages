import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { UserRoleResponse } from "../../repositories/types/user/user-role-response.type";

export interface GetUserRolesUsecase {
  execute(userId: string): Promise<UserRoleResponse>;
}

export class GetUserRolesUsecaseImpl implements GetUserRolesUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(userId: string) {
    const result = await this.authRepository.getUserRoles(userId);
    return result;
  }
}
