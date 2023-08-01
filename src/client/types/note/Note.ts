export interface Note {
  id: string,
  content: string,
  author: Author,
  createdAt: Date,
  project: ProjectShortView
}

export interface Author {
  teamMemberId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
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
