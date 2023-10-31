import React from 'react';

export const ServiceTypes = {
  path: '/service-types',
  title: 'Service types',
  description: 'Here you can define and manage service types',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
