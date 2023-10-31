import React from 'react';

export const ExpenseCategories = {
  path: '/expense-categories',
  title: 'Expense Categories',
  description: 'Here you can manage define and manage expense categories for categorizing additional project costs',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
