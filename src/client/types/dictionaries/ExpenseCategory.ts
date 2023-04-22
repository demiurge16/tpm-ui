export interface CreateExpenseCategory {
  name: string,
  description: string,
}

export interface UpdateExpenseCategory {
  name: string,
  description: string,
}

export interface ExpenseCategory {
  id: string,
  name: string,
  description: string,
  active: boolean
}

export interface ExpenseCategoryStatus {
  id: string,
  active: boolean
}
