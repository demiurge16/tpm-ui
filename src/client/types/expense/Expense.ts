
export interface Expense {
  id: string,
  description: string,
  category: ExpenseCategory,
  amount: number,
  currency: Currency,
  date: Date,
  teamMember: TeamMember,
  project: ProjectShortView
}

export interface ExpenseCategory {
  id: string,
  name: string,
  description: string
}

export interface Currency {
  name: string,
  code: string,
}

export interface TeamMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role
}

export type RoleCode = "PROJECT_MANAGER" | "TRANSLATOR" | "EDITOR" | "PROOFREADER" | "SUBJECT_MATTER_EXPERT" | "PUBLISHER" | "OBSERVER";

export interface Role {
  role: RoleCode,
  title: String,
  description: String
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
