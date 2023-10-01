export interface CreateTeamMember {
  userId: string;
  role: ProjectRoleCode
}

export type ProjectRoleCode = "PROJECT_MANAGER" | "TRANSLATOR" | "EDITOR" | "PROOFREADER" | "SUBJECT_MATTER_EXPERT" | "PUBLISHER" | "OBSERVER";

export interface TeamMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: TeamMemberProjectRole[],
  project: ProjectShortView;
}

export interface TeamMemberProjectRole {
  projectRoleId: string;
  role: ProjectRoleCode;
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

export interface ProjectRole {
  role: ProjectRoleCode;
  title: string;
  description: string;
}
