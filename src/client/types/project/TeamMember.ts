export interface CreateTeamMember {
  userId: string;
  role: RoleCode
}

export type RoleCode = "PROJECT_MANAGER" | "TRANSLATOR" | "EDITOR" | "PROOFREADER" | "SUBJECT_MATTER_EXPERT" | "PUBLISHER" | "OBSERVER";

export interface TeamMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role,
  project: string;
}

export interface Role {
  role: RoleCode;
  title: string;
  description: string;
}

export interface ProjectShortView {
  id: string;
  title: string;
  status: ProjectStatus;
}

export type StatusCode = "DRAFT" | "READY_TO_START" | "ACTIVE" | "ON_HOLD" | "READY_TO_DELIVER" | "DELIVERED" | "CANCELLED" | "INVOICED" | "PAID";

export interface ProjectStatus {
  status: StatusCode;
  name: string;
  description: string;
}
