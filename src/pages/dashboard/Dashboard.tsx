import { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../contexts/BreadcrumbsContext";

export const Dashboard = () => {
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([]);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
