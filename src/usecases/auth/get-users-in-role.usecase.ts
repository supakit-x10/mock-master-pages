import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { PaginationResponse } from "../../repositories/types/pagination-response.type";
import { Query } from "../../repositories/types/query.type";
import { UserResponse } from "../../repositories/types/user/user-response.type";

export interface GetUserInRoleUsecase {
  execute(
    roleId: string,
    query: Query
  ): Promise<PaginationResponse<UserResponse[]>>;
}

export class GetUserInRoleUsecaseImpl implements GetUserInRoleUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(roleId: string, query: Query) {
    const result = await this.authRepository.getUsersInRole(roleId, query);
    return result;
  }
}
