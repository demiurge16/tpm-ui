import React from 'react';

export const Units = {
  path: '/units',
  title: 'Translation Units',
  description: 'Here you can define a translation unit. This will help you measure the volume of your tasks an projects. For example, a translation unit can be a word, a sentence, a paragraph, a page, a chapter, a book, etc.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
