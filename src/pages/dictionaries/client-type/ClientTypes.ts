import React from 'react';

export const ClientTypes = {
  path: '/client-types',
  title: 'Client Types',
  description: 'Here you can define a client type. For example, you can define a client type as "Individual" or "Company". Use this feature to categorize your clients.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
