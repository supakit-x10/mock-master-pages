export interface VerifyResponse {
  roles: Role[];
  attributes: Attributes;
  sub: string;
  aid: string;
  sid: string;
  username: string;
  enabled: boolean;
  iat: number;
  exp: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface Attributes {
  enabled2Factor: boolean;
  secret: string;
  [key: string]: any;
}
