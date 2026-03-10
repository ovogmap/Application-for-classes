import { UserRole } from "../signup/type";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: "Bearer";
  user: LoginUser;
};
