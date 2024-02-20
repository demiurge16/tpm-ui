export interface TimeEntry {
  id: string;
  user: User;
  date: string;
  timeSpent: number;
  timeUnit: TimeUnit;
  status: TimeEntryStatus;
  description: string;
  taskId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: Role;
}

export interface Role {
  role: UserRole;
  tag: string;
  title: string;
  description: string;
}

export type UserRole = 'ADMIN'
  | 'PROJECT_MANAGER'
  | 'TRANSLATOR'
  | 'EDITOR'
  | 'PROOFREADER'
  | 'SUBJECT_MATTER_EXPERT'
  | 'PUBLISHER'
  | 'OBSERVER'
  | 'USER';

export interface TimeUnit {
  unit: TimeUnitSymbol;
  title: string;
  description: string;
}

export type TimeUnitSymbol = 'MINUTES' | 'HOURS' | 'DAYS';

export interface TimeEntryStatus {
  status: TimeEntryStatusCode;
  title: string;
  description: string;
}

export type TimeEntryStatusCode = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface TimeEntryNewStatus {
  status: TimeEntryStatus;
  timeEntryId: string;
}

export interface UpdateTimeEntry {
  userId: string;
  date: Date;
  timeSpent: number;
  timeUnit: TimeUnitSymbol;
  description: string;
}
