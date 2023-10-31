import React from 'react';

export const Expenses = {
  path: '/expenses',
  title: 'Expenses',
  description: 'This is the expenses page. It contains a list of expenses that happened while working on a projects.',
  Index: React.lazy(() => import('./Index')),
  Create: React.lazy(() => import('./Create'))
}
