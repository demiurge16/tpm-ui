export interface UpdateTask {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  accuracyId: string;
  industryId: string;
  unitId: string;
  serviceTypeId: string;
  amount: number;
  budget: number;
  currencyCode: string;
}

export interface TaskMoveStart {
  start: Date;
}

export interface TaskMoveDeadline {
  deadline: Date;
}

export interface Assign {
  userId: string;
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
  serviceType: ServiceType;
  amount: number;
  expectedStart: Date;
  deadline: Date;
  budget: number;
  currency: Currency;
  status: TaskStatus;
  priority: Priority;
  assignee: Assignee | null;
  project: ProjectShortView;
}

export interface Accuracy {
  id: string;
  name: string;
  description: string;
}

export interface Assignee {
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

export interface ServiceType {
  id: string;
  name: string;
  description: string;
}

export type StatusCode = "DRAFT" | "ASSIGNED" | "IN_PROGRESS" | "IN_REVIEW" | "ON_HOLD" | "READY_TO_DELIVER" | "COMPLETED" | "CANCELLED";

export interface TaskStatus {
  status: StatusCode;
  title: string;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
}

export interface ProjectShortView {
  id: string;
  title: string;
  status: ProjectStatus;
}

export type ProjectStatusCode = "DRAFT" | "READY_TO_START" | "ACTIVE" | "ON_HOLD" | "READY_TO_DELIVER" | "DELIVERED" | "CANCELLED" | "INVOICED" | "PAID";

export interface ProjectStatus {
  status: ProjectStatusCode;
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
  newAssignee: Assignee;
}

export interface PriorityChanged {
  id: string;
  priority: Priority;
}

export interface TaskNewStatus {
  id: string;
  status: TaskStatus;
}

export interface CreateTimeEntry {
  userId: string;
  date: Date;
  timeSpent: number;
  timeUnit: TimeUnitSymbol;
  description: string;
}

export type TimeUnitSymbol = 'MINUTES' | 'HOURS' | 'DAYS';
