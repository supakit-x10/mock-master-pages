interface RoleRequest {
  description?: string;
  attributes?: Record<string, any>;
}

export interface CreateRoleRequest extends RoleRequest {
  name: string;
}

export interface UpdateRoleRequest extends RoleRequest {}
