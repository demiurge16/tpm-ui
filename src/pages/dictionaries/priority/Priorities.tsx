import React from 'react';

export const Priorities = {
  path: '/priorities',
  title: 'Priorities',
  description: 'Here you can manage define and manage task priorities',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
