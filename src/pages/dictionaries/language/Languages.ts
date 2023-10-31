import React from 'react';

export const Languages = {
  path: '/languages',
  title: 'Languages',
  description: 'Here you can see a list of all languages and their data.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details'))
}
