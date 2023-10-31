import React from 'react';

export const Users = {
  path: '/users',
  title: 'Users',
  description: 'This is the users page. It contains a list of users of your application.',
  Index: React.lazy(() => import('./Index')),
  Details:  React.lazy(() => import('./Details'))
}
