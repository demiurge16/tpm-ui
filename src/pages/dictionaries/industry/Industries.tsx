import React from 'react';

export const Industries = {
  path: '/industries',
  title: 'Industries',
  description: 'Here you can manage define and manage industries. Industries are used to categorize projects and tasks based on their subject matter',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
