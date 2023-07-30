export interface CreateTask {
  title: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  accuracyId: string;
  industryId: string;
  unitId: string;
  amount: number;
  expectedStart: Date;
  deadline: Date;
  budget: number;
  currencyCode: string;
  priorityId: string;
}
