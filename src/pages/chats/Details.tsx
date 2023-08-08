import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import { UnderConstruction } from '../utils/UnderConstruction';

export const Details = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Chats', path: '/chats' },
      { label: 'Details', path: '/chats/details' },
    ]);
  }, []);

  return (
    <UnderConstruction />
  );
};
