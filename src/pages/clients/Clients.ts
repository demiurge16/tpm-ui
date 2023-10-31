import React from 'react';

export const Clients = {
  path: '/clients',
  title: 'Clients',
  description: 'Here you can manage all your clients.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
