import React from 'react';

export const Accuracies = {
  path: '/accuracies',
  title: 'Accuracies',
  description: 'Here you can define a translation accuracy. Accuracies are used to tell the translator how accurate the translation should be',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
