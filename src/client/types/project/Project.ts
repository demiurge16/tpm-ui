import { Client } from "../client/Client";

export interface CreateProject {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguages: string[];
  accuracyId: string;
  industryId: string;
  unitId: string;
  serviceTypeIds: string[];
  amount: number;
  expectedStart: Date;
  internalDeadline: Date;
  externalDeadline: Date;
  budget: number;
  currencyCode: string;
  clientId: string;
}

export interface UpdateProject {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguages: string[];
  accuracyId: string;
  industryId: string;
  unitId: string;
  serviceTypeIds: string[];
  amount: number;
  budget: number;
  currencyCode: string;
  clientId: string;
}

export interface ProjectMoveStart {
  expectedStart: Date;
}

export interface ProjectMoveDeadline {
  internalDeadline: Date;
  externalDeadline: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  sourceLanguage: Language;
  targetLanguages: Language[];
  accuracy: Accuracy;
  industry: Industry;
  unit: Unit;
  serviceTypes: ServiceType[];
  amount: number;
  expectedStart: Date;
  internalDeadline: Date;
  externalDeadline: Date;
  budget: number;
  currency: Currency;
  status: ProjectStatus;
  client: Client
}

export interface ProjectStartMoved {
  id: string;
  expectedStart: Date;
}

export interface ProjectDeadlineMoved {
  id: string;
  internalDeadline: Date;
  externalDeadline: Date;
}

export interface Accuracy {
  id: string;
  name: string;
  description: string;
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

export interface ProjectStatus {
  status: StatusCode;
  title: string;
  description: string;
}

export type StatusCode = "DRAFT" | "READY_TO_START" | "ACTIVE" | "ON_HOLD" | "REVIEW" | "READY_TO_DELIVER" | "DELIVERED" | "CANCELLED" | "INVOICED" | "PAID";

export interface ServiceType {
  id: string;
  name: string;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
}

export interface ProjectNewStatus {
  id: string;
  status: ProjectStatus;
}
