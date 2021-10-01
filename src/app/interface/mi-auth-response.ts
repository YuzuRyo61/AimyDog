import { User } from "./user";

export interface MiAuthResponse {
  ok: boolean;
  token?: string;
  user?: User;
}
