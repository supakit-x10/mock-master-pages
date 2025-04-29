import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { SessionsResponse } from "../../repositories/types/auth/sessions-response.type";
import { PaginationResponse } from "../../repositories/types/pagination-response.type";
import { Query } from "../../repositories/types/query.type";

export interface GetSessionsUsecase {
  execute(
    userId: string,
    query: Query
  ): Promise<PaginationResponse<SessionsResponse[]>>;
}

export class GetSessionsUsecaseImpl implements GetSessionsUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(userId: string, query: Query) {
    const result = await this.authRepository.getListSessions(userId, {
      page: query.page,
      limit: query.limit,
    });
    return result;
  }
}
