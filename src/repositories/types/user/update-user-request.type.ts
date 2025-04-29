export interface UpdateUserRequest {
  enabled?: boolean;
  first_name?: string;
  last_name?: string;
  email_verified?: boolean;
  attributes?: Record<string, any>;
}
