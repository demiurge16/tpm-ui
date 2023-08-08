import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { UnderConstruction } from '../utils/UnderConstruction';

export const Create = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Chats', path: '/chats' },
      { label: 'Create', path: '/chats/create' },
    ]);
  }, []);

  return (
    <UnderConstruction />
  );
};
