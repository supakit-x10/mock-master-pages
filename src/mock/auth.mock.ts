import { ApiPath } from "@/types/api-path.enum";
import { LoginResponse } from "@/repositories/types/auth/login-response.type";
import MockAdapter from "axios-mock-adapter";
import { VerifyResponse } from "@/repositories/types/auth/verify-response.type";

export const authMocks = (mock: MockAdapter) => {
  const MOCK_JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2sgVXNlciIsInJvbGUiOiJhZG1pbiJ9." +
    "dummysignature";

  mock.onPost(ApiPath.Login).reply(200, {
    access_token: MOCK_JWT_TOKEN,
    refresh_token: "mock_refresh_token_45 6",
    enabled_otp: false,
    expires_in: 3600, // 1 hour
    refresh_expires_in: 86400, // 24 hours
    token_type: "Bearer",
    session_id: "mock_session_id_789",
    created_at: new Date().toISOString(),
  } as LoginResponse);

  mock.onGet(ApiPath.Verify).reply(200, {
    roles: [
      { id: "admin", name: "Admin", description: "Administrator role" },
      { id: "user", name: "User", description: "Standard user role" },
    ],
    attributes: {
      enabled2Factor: true,
      secret: "my-secret-key",
      department: "IT",
    },
    sub: "user123",
    aid: "account456",
    sid: "session789",
    username: "testUser",
    enabled: true,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  } as VerifyResponse);
};
