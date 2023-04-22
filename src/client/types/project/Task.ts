export interface CreateTask {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  accuracy: string;
  industry: string;
  unit: string;
  amount: number;
  expectedStart: Date;
  deadline: Date;
  budget: number;
  currency: string;
  priorityId: string;
  projectId: string;
}
