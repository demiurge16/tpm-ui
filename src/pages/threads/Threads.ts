import React from 'react';

export const Threads = {
  path: '/threads',
  title: 'Threads',
  description: 'This is the threads page. There are all the threads from all the projects.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
