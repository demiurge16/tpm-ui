
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: Role[];
}

export type RoleCode = "ADMIN"
  | "PROJECT_MANAGER"
  | "TRANSLATOR"
  | "EDITOR"
  | "PROOFREADER"
  | "SUBJECT_MATTER_EXPERT"
  | "PUBLISHER"
  | "OBSERVER"
  | "USER";

export interface Role {
  role: RoleCode;
  tag: string;
  title: string;
  description: string;
}
