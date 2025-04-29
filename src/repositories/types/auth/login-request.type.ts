export enum LoginResponseType {
  Code = "code",
  Console = "console",
}

export interface LoginRequest {
  username: string;
  password: string;
  // response_type: LoginResponseType;
}
