import { useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { ServiceType } from "../../../../client/types/dictionaries/ServiceType";
import { applicationClient } from "../../../../client/ApplicationClient";

export const useServiceType = (id: string, callback?: (serviceType: ServiceType) => void) => {
  const { showError } = useSnackbarContext();

  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>({} as ServiceType);

  useEffect(() => {
    setLoading(true);
    applicationClient.serviceTypes()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setServiceType(response);
          setLoading(false);
          callback && callback(response);
        },
        error: (error) => {
          setLoadingError(error.message);
          setLoading(false);
        }
      });
  }, []);

  const activate = () => 
    applicationClient.serviceTypes()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setServiceType(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error activating service type ${id}`, error.message)
      });

  const deactivate = () => 
    applicationClient.serviceTypes()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setServiceType(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error deactivating service type ${id}`, error.message)
      });

  return {
    loading,
    loadingError,
    serviceType,
    activate,
    deactivate
  };
}
