import {
  AuthRepository,
  AuthRepositoryImpl,
} from "../../repositories/auth.repository";
import { TwoFactorQrcodeResponse } from "../../repositories/types/auth/two-factor-qrcode-response.type";

export interface TwoFactorQrUsecase {
  execute(): Promise<TwoFactorQrcodeResponse>;
}

export class TwoFactorQrUsecaseImpl implements TwoFactorQrUsecase {
  constructor(
    private authRepository: AuthRepository = new AuthRepositoryImpl()
  ) {}

  async execute(): Promise<TwoFactorQrcodeResponse> {
    return await this.authRepository.twoFactorQrcode();
  }
}
