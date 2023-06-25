import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../../contexts/BreadcrumbsContext';

export const Details = () => {
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Country', path: '/countries' },
      { label: 'Details', path: '/countries/details' },
    ]);
  }, []);

  return (
    <div>
      <h1>Country Details</h1>
    </div>
  );
};
