export interface UpdateTask {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  accuracy: string;
  industry: string;
  unit: string;
  amount: number;
  budget: number;
  currency: string;
}

export interface TaskMoveStart {
  start: Date;
}

export interface TaskMoveDeadline {
  deadline: Date;
}

export interface Assign {
  teamMemberId: string;
}

export interface ChangePriority {
  priority: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  sourceLanguage: Language;
  targetLanguage: Language;
  accuracy: Accuracy;
  industry: Industry;
  unit: Unit;
  amount: number;
  expectedStart: Date;
  deadline: Date;
  budget: number;
  currency: Currency;
  status: TaskStatus;
  priority: Priority;
  assignee: Assignee | null;
  projectId: string;
}

export interface Accuracy {
  id: string;
  name: string;
  description: string;
}

export interface Assignee {
  teamMemberId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Currency {
  code: string;
  name: string
}

export interface Industry {
  id: string;
  name: string;
  description: string;
}

export interface Language {
  code: string;
  name: string
}

export interface Priority {
  id: string;
  name: string;
  description: string;
  emoji: string;
  value: number
}

export type StatusCode = "DRAFT" | "ASSIGNED" | "IN_PROGRESS" | "NEEDS_REVIEW" | "REVISIONS_NEEDED" | "COMPLETED" | "CANCELLED";

export interface TaskStatus {
  status: StatusCode;
  name: string;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
}

export interface TaskStartMoved {
  id: string;
  start: Date;
}

export interface TaskDeadlineMoved {
  id: string;
  deadline: Date;
}

export interface Assigned {
  id: string;
  assignee: Assignee;
}

export interface PriorityChanged {
  id: string;
  priority: Priority;
}

export interface TaskNewStatus {
  id: string;
  status: TaskStatus;
}
