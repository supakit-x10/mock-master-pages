export interface RoleResponse {
  id: string;
  name: string;
  clientRole: boolean;
  composite: boolean;
  containerId: string;
  description: string;
  attributes?: Record<string, any>;
}
