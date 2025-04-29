import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";

export interface LogoutUsecase {
  execute(): Promise<void>;
}

export class LogoutUsecaseImpl implements LogoutUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(): Promise<void> {
    return await this.authRepository.logout();
  }
}
