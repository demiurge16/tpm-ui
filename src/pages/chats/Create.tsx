import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';

export const Create = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Chats', path: '/chats' },
      { label: 'Create', path: '/chats/create' },
    ]);
  }, [breadcrumbsContext]);

  return (
    <div>
      <h1>Create Chat</h1>
    </div>
  );
};
