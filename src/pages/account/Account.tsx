import { useContext, useEffect } from 'react';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';

export const Account = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Account', path: '/account' },
    ]);
  }, []);

  return (
    <div>
      <h1>Account</h1>
    </div>
  );
}
