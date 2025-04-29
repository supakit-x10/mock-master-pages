import { LoginResponseType } from "./login-request.type";

export interface TwoFactorVerifyRequest {
  otp: string;
  response_type: LoginResponseType;
}
