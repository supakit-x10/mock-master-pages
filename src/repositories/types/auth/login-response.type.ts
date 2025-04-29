export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  enabled_otp: boolean;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  session_id: string;
  created_at: string;
}
