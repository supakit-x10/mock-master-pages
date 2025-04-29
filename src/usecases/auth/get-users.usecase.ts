import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { PaginationResponse } from "../../repositories/types/pagination-response.type";
import { Query } from "../../repositories/types/query.type";
import { UserResponse } from "../../repositories/types/user/user-response.type";

export interface GetUsersUsecase {
  execute(req: Query): Promise<PaginationResponse<UserResponse[]>>;
}

export class GetUsersUsecaseImpl implements GetUsersUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(req: Query) {
    const result = await this.authRepository.getUsers({
      page: req.page,
      limit: req.limit,
      search: req.search,
    });
    return result;
  }
}
