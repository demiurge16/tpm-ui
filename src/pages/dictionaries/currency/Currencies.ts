import React from 'react';

export const Currencies = {
  path: '/currencies',
  title: 'Currencies',
  description: 'Here you can see a list of all currencies and their exchange rates.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details'))
}
