import { useEffect, useState } from "react";
import { Measurement } from "../../../../client/types/dictionaries/Unit";
import { applicationClient } from "../../../../client/ApplicationClient";

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    applicationClient.units()
      .refdata()
      .measurements()
      .subscribe({
        next: (data) => {
          setMeasurements(data);
          setLoading(false);
        },
        error: (error) => setLoadingError(error.message),
      });
  }, []);

  return {
    measurements,
    loading,
    loadingError
  };
};