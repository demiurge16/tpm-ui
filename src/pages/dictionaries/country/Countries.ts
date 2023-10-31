import React from 'react';

export const Countries = {
  path: '/countries',
  title: 'Countries',
  description: 'Here you can see a list of all countries and their data.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details'))
}
