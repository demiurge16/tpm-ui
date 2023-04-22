export interface CreateExpense {
  description: string,
  category: string,
  amount: number,
  currency: string,
  date: Date,
  teamMemberId: string
}