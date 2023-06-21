import { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../../contexts/BreadcrumbsContext";

export const Details = () => {

  const breadcrumbsContext = useContext(BreadcrumbsContext);
  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([
      { label: 'Client type', path: 'client-types' },
      { label: 'Details', path: 'client-types/details' },
    ]);
  }, [breadcrumbsContext]);

  return (
    <div>
      <h1>Client type Details</h1>
    </div>
  );
};
