import { RoleResponse } from "../role/role-response.type"

export interface UserResponse<Attributes = Record<string, string[]>> {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  email_verified: boolean
  enabled: boolean
  datasource: string
  created_at: string
  attributes: Attributes
  roles: RoleResponse[]
}


