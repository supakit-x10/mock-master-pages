import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { PaginationResponse } from "../../repositories/types/pagination-response.type";
import { Query } from "../../repositories/types/query.type";
import { RoleResponse } from "../../repositories/types/role/role-response.type";

export interface GetRolesUsecase {
  execute(req: Query): Promise<PaginationResponse<RoleResponse[]>>;
}

export class GetRolesUsecaseImpl implements GetRolesUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(req: Query) {
    const result = await this.authRepository.getRoles({
      page: req.page,
      limit: req.limit,
    });
    return result;
  }
}
