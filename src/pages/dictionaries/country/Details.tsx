import { useEffect } from 'react';
import { useBreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';

export const Details = () => {
  const { setBreadcrumbs } = useBreadcrumbsContext();
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Country', path: '/countries' },
      { label: 'Details', path: '/countries/details' },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div>
      <h1>Country Details</h1>
    </div>
  );
};
