import { ExpiredTypes } from "../../../types/expired-types.enum";

export interface SessionsResponse {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  type: string;
  user_agent: UserAgent;
  ip: string;
  expires_in: string;
  expired_type: ExpiredTypes;
}

export interface UserAgent {
  ua: string;
  browser: Browser;
  engine: Engine;
  os: Os;
  device: Device;
  cpu: Cpu;
}

export interface Browser {
  name: string;
  version: string;
  major: string;
}

export interface Engine {
  name: string;
  version: string;
}

export interface Os {
  name: string;
  version: string;
}

export interface Device {
  vendor: string;
  model: string;
}

export interface Cpu {}
