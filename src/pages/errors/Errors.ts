import React from 'react';

export const Errors = {
  Forbidden: React.lazy(() => import('./Forbidden')),
  NotFound: React.lazy(() => import('./NotFound')),
  InternalServerError: React.lazy(() => import('./InternalServerError'))
}
