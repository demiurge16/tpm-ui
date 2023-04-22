export interface Expense {
  id: string,
  description: string,
  category: ExpenseCategory,
  amount: number,
  currency: Currency,
  date: Date,
  teamMemberId: string,
  projectId: string
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
