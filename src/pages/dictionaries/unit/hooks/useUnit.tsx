import { useEffect, useState } from "react";
import { Unit } from "../../../../client/types/dictionaries/Unit";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import { applicationClient } from "../../../../client/ApplicationClient";

export const useUnit = (id: string, callback?: (unit: Unit) => void) => {
  const { showError } = useSnackbarContext();

  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>({} as Unit);

  useEffect(() => {
    setLoading(true);
    applicationClient.units()
      .withId(id)
      .get()
      .subscribe({
        next: (response) => {
          setUnit(response);
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
    applicationClient.units()
      .withId(id)
      .activate()
      .subscribe({
        next: (response) => setUnit(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error activating unit ${id}`, error.message)
      });

  const deactivate = () => 
    applicationClient.units()
      .withId(id)
      .deactivate()
      .subscribe({
        next: (response) => setUnit(prev => ({ ...prev, active: response.active })),
        error: (error) => showError(`Error deactivating unit ${id}`, error.message)
      });

  return {
    loading,
    loadingError,
    unit,
    activate,
    deactivate
  };
}