import React from 'react';

export const Projects = {
  path: '/projects',
  title: 'Projects',
  description: 'This is the heart of your business. Here you can see and manage all your projects.',
  Index: React.lazy(() => import('./Index')),
  Details: React.lazy(() => import('./Details')),
  Create: React.lazy(() => import('./Create')),
  Edit: React.lazy(() => import('./Edit'))
}
