import { AxiosRequestConfig } from "axios";
import axiosAdapter from "../adapters/axios.adapter";
import { requestConfig } from "./request.config";
import { ApiPath } from "./types/api-path.type";
import { CredentialsResponse } from "./types/auth/credentials-response.type";
import { LoginRequest } from "./types/auth/login-request.type";
import { LoginResponse } from "./types/auth/login-response.type";
import { ResetPasswordRequest } from "./types/auth/reset-password-request.type";
import { ResetPasswordResponse } from "./types/auth/reset-password-response.type";
import { SessionsResponse } from "./types/auth/sessions-response.type";
import { TwoFactorQrcodeResponse } from "./types/auth/two-factor-qrcode-response.type";
import { TwoFactorVerifyRequest } from "./types/auth/two-factor-verify-request.type";
import { VerifyResponse } from "./types/auth/verify-response.type";
import { PaginationResponse } from "./types/pagination-response.type";
import { Query } from "./types/query.type";
import {
  CreateRoleRequest,
  UpdateRoleRequest,
} from "./types/role/create-role-request.type";
import { DeleteRoleMappingRequest } from "./types/role/delete-role-mapping-request.type";
import { RoleMappingRequest } from "./types/role/role-mapping-request.type";
import { RoleResponse } from "./types/role/role-response.type";
import { CreateUserRequest } from "./types/user/create-user-request.type";
import { UpdateUserRequest } from "./types/user/update-user-request.type";
import { UserResponse } from "./types/user/user-response.type";
import { UserRoleResponse } from "./types/user/user-role-response.type";

export interface AuthRepository {
  login(data: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  verify(): Promise<VerifyResponse>;
  twoFactorQrcode(): Promise<TwoFactorQrcodeResponse>;
  twoFactorVerify(data: TwoFactorVerifyRequest): Promise<LoginResponse>;
  getUsers(query: Query): Promise<PaginationResponse<UserResponse[]>>;
  getUser(id: string): Promise<UserResponse>;
  createUser(data: CreateUserRequest): Promise<UserResponse>;
  updateUser(id: string, data: UpdateUserRequest): Promise<UserResponse>;
  getCredentials(userId: string): Promise<CredentialsResponse[]>;
  resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse>;
  deleteUser(userId: string): Promise<any>;
  getRoles(query: Query): Promise<PaginationResponse<RoleResponse[]>>;
  getUserRoles(userId: string): Promise<UserRoleResponse>;
  getRole(roleId: string): Promise<RoleResponse>;
  getUserRolesAvailable(
    userId: string,
    query: Query
  ): Promise<PaginationResponse<RoleResponse[]>>;
  createRole(data: CreateRoleRequest): Promise<CreateRoleRequest>;
  updateRole(
    roleId: string,
    data: UpdateRoleRequest
  ): Promise<UpdateRoleRequest>;
  roleMapping(userId: string, data: RoleMappingRequest): Promise<any>;
  deleteRoleMapping(
    userId: string,
    data: DeleteRoleMappingRequest
  ): Promise<any>;
  deleteRole(roleId: string): Promise<any>;
  getListSessions(
    userId: string,
    query: Query
  ): Promise<PaginationResponse<SessionsResponse[]>>;
  getUsersInRole(
    roleId: string,
    query: Query
  ): Promise<PaginationResponse<UserResponse[]>>;
  verifyCode(): Promise<LoginResponse>;
}

export class AuthRepositoryImpl implements AuthRepository {
  get headers(): AxiosRequestConfig {
    return requestConfig();
  }

  async login(data: LoginRequest) {
    const path = ApiPath.Login;
    const res = await axiosAdapter.post<LoginResponse>(
      path,
      data,
      this.headers
    );
    return res.data;
  }

  async logout() {
    const path = ApiPath.Logout;
    await axiosAdapter.post<LoginResponse>(path, null, this.headers);
  }

  async twoFactorQrcode() {
    const path = ApiPath.TwoFactorGrcode;
    const res = await axiosAdapter.get<TwoFactorQrcodeResponse>(
      path,
      this.headers
    );
    return res.data;
  }

  async twoFactorVerify(data: TwoFactorVerifyRequest) {
    const path = ApiPath.TwoFactorVerify;
    const res = await axiosAdapter.post<LoginResponse>(
      path,
      data,
      this.headers
    );
    return res.data;
  }

  async verify(): Promise<VerifyResponse> {
    const path = ApiPath.Verify;
    const res = await axiosAdapter.get<VerifyResponse>(path, this.headers);
    return res.data;
  }

  async getUsers(query: Query) {
    const path = ApiPath.Users;

    const urlSearchParams = new URLSearchParams({
      page: query?.page ?? "1",
      limit: query?.limit ?? "10",
      ...(query?.search && { search: query.search }),
    }).toString();

    const res = await axiosAdapter.get<PaginationResponse<UserResponse[]>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  async getUsersInRole(roleId: string, query: Query) {
    const path = ApiPath.UsersInRole.replace("{role_id}", roleId);

    const urlSearchParams = new URLSearchParams({
      page: query?.page ?? "1",
      limit: query?.limit ?? "10",
      ...(query?.search && { search: query.search }),
    }).toString();

    const res = await axiosAdapter.get<PaginationResponse<UserResponse[]>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  async getUser(userId: string) {
    const path = ApiPath.UsersId.replace("{user_id}", userId);

    const res = await axiosAdapter.get<UserResponse>(path, this.headers);

    return res.data;
  }

  async createUser(data: CreateUserRequest) {
    const path = ApiPath.Users;

    const res = await axiosAdapter.post<UserResponse>(path, data, this.headers);

    return res.data;
  }

  async getCredentials(userId: string) {
    const path = ApiPath.Credentials.replace("{user_id}", userId);

    const res = await axiosAdapter.get<CredentialsResponse[]>(
      path,
      this.headers
    );

    return res.data;
  }

  async updateUser(userId: string, data: UpdateUserRequest) {
    const path = ApiPath.UsersId.replace("{user_id}", userId);

    const res = await axiosAdapter.put<UserResponse>(path, data, this.headers);

    return res.data;
  }

  async resetPassword(data: ResetPasswordRequest) {
    const path = ApiPath.ResetPassword;

    const res = await axiosAdapter.put<ResetPasswordResponse>(
      path,
      data,
      this.headers
    );

    return res.data;
  }

  async deleteUser(userId: string) {
    const path = ApiPath.UsersId.replace("{user_id}", userId);

    const res = await axiosAdapter.delete(path, this.headers);

    return res.data;
  }

  async getRoles(query: Query) {
    const path = ApiPath.Roles;

    const urlSearchParams = new URLSearchParams({
      page: query?.page ?? "1",
      limit: query?.limit ?? "10",
      ...(query?.search && { search: query.search }),
    }).toString();

    const res = await axiosAdapter.get<PaginationResponse<RoleResponse[]>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  async getRole(roleId: string) {
    const path = ApiPath.RolesId.replace("{role_id}", roleId);

    const res = await axiosAdapter.get<RoleResponse>(path, this.headers);

    return res.data;
  }

  async getUserRoles(userId: string) {
    const path = ApiPath.RoleMappings.replace("{user_id}", userId);

    const res = await axiosAdapter.get<UserRoleResponse>(path, this.headers);

    return res.data;
  }

  async getUserRolesAvailable(userId: string, query: Query) {
    const path = ApiPath.UsersRoleAvailable.replace("{user_id}", userId);

    const urlSearchParams = new URLSearchParams({
      page: query?.page ?? "1",
      limit: query?.limit ?? "10",
      ...(query?.search && { search: query.search }),
    }).toString();

    const res = await axiosAdapter.get<PaginationResponse<RoleResponse[]>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  async createRole(data: CreateRoleRequest) {
    const path = ApiPath.Roles;

    const res = await axiosAdapter.post<CreateRoleRequest>(
      path,
      data,
      this.headers
    );

    return res.data;
  }

  async updateRole(roleId: string, data: UpdateRoleRequest) {
    const path = ApiPath.RolesId.replace("{role_id}", roleId);

    const res = await axiosAdapter.put<UpdateRoleRequest>(
      path,
      data,
      this.headers
    );

    return res.data;
  }

  async roleMapping(userId: string, data: RoleMappingRequest) {
    const path = ApiPath.RoleMappings.replace("{user_id}", userId);

    const res = await axiosAdapter.post(path, data, this.headers);

    return res.data;
  }

  async deleteRoleMapping(userId: string, data: DeleteRoleMappingRequest) {
    const path = ApiPath.RoleMappings.replace("{user_id}", userId);

    const res = await axiosAdapter.delete(path, {
      ...this.headers,
      data,
    });

    return res.data;
  }

  async deleteRole(roleId: string) {
    const path = ApiPath.RolesId.replace("{role_id}", roleId);

    const res = await axiosAdapter.delete(path, this.headers);

    return res.data;
  }

  async getListSessions(userId: string, query: Query) {
    const path = ApiPath.Session.replace("{user_id}", userId);

    const urlSearchParams = new URLSearchParams({
      page: query?.page ?? "1",
      limit: query?.limit ?? "10",
      ...(query?.search && { search: query.search }),
    }).toString();

    const res = await axiosAdapter.get<PaginationResponse<SessionsResponse[]>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  async verifyCode() {
    const path = ApiPath.Oauth2VerifyCode;

    const res = await axiosAdapter.get<LoginResponse>(path, this.headers);

    return res.data;
  }
}
