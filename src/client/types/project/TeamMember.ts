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
  projectId: string;
}

export interface Role {
  role: RoleCode;
  title: string;
  description: string;
}
