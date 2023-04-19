export interface Project {
  id: string;
  title: string;
  description: string;
  sourceLanguage: {
    code: string;
    name: string;
  };
  targetLanguages: {
    code: string;
    name: string;
  }[];
  accuracy: {
    id: string;
    name: string;
    description: string;
  };
  industry: {
    id: string;
    name: string;
    description: string;
  };
  unit: {
    id: string;
    name: string;
    description: string;
  };
  amount: number;
  expectedStart: Date;
  internalDeadline: Date;
  externalDeadline: Date;
  budget: number;
  currency: {
    code: string;
    name: string;
  };
  status: {
    status: ProjectStatus;
    name: string;
    description: string;
  };
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: {
      code: string;
      name: string;
      nativeNames: string[];
      currencies: {
        code: string;
        name: string;
      }[];
      languages: {
        code: string;
        name: string;
      }[];
      emoji: string;
    };
    vat: string;
    notes: string;
    type: {
      id: string;
      name: string;
      description: string;
      corporate: boolean;
    };
  };
}

export interface StartMoved {
  id: string;
  expectedStart: Date;
}

export interface DeadlineMoved {
  id: string;
  internalDeadline: Date;
  externalDeadline: Date;
}

export interface NewStatus {
  projectId: string,
  status: {
    status: ProjectStatus,
    name: string,
    description: string
  }
}

export enum ProjectStatus {
  DRAFT,
  READY_TO_START,
  ACTIVE,
  ON_HOLD,
  READY_TO_DELIVER,
  DELIVERED,
  CANCELLED,
  INVOICED,
  PAID,
}
