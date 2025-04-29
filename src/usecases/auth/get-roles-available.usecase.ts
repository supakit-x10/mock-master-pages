import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { PaginationResponse } from "../../repositories/types/pagination-response.type";
import { Query } from "../../repositories/types/query.type";
import { RoleResponse } from "../../repositories/types/role/role-response.type";

export interface GetRolesAvailableUsecase {
  execute(
    userId: string,
    query: Query
  ): Promise<PaginationResponse<RoleResponse[]>>;
}

export class GetRolesAvailableUsecaseImpl implements GetRolesAvailableUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(userId: string, req: Query) {
    const result = await this.authRepository.getUserRolesAvailable(userId, {
      page: req.page,
      limit: req.limit,
    });
    return result;
  }
}
