export type UserRole = "STUDENT" | "INSTRUCTOR";

export type SignupParams = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type SignupResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  message: string;
};
