export interface CreateUserRequest {
  datasource: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  enabled: boolean;
  emailVerified: boolean;
}
