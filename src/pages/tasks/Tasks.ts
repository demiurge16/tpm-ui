import React from 'react';

export const Tasks = {
  path: '/tasks',
  title: 'Tasks',
  description: 'This is the tasks page. There are all of the tasks that you have inflicted upon yourself.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
