import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";

export interface VerifyUsecase {
  execute(): Promise<boolean>;
}

export class VerifyUsecaseImpl implements VerifyUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(): Promise<boolean> {
    try {
      await this.authRepository.verify();
      return true;
    } catch (error) {
      return false;
    }
  }
}
