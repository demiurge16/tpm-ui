import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';

export const Details = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Chats', path: '/chats' },
      { label: 'Details', path: '/chats/details' },
    ]);
  }, [breadcrumbsContext]);

  return (
    <div>
      <h1>Chat Details</h1>
    </div>
  );
};
