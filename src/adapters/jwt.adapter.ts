import { JwtPayload, jwtDecode } from "jwt-decode";

export interface JwtAdapter {
  decode(token: string): JwtPayload;
}

export class JwtAdapterImpl implements JwtAdapter {
  decode(token: string) {
    return jwtDecode(token);
  }
}
