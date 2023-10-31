import { useState, useEffect } from "react";
import { Observable, forkJoin } from "rxjs";

export function useData<T extends Record<string, Observable<any>>>(
  sources: T,
  successCallback?: (data: Record<keyof T, any>) => void
): {
  loading: boolean;
  loadingError: string | null;
  data: {
    [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
  }
} {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [data, setData] = useState<Record<keyof T, any>>({} as Record<keyof T, any>);

  useEffect(() => {
    const subscription = forkJoin(sources).subscribe({
      next: (response) => {
        setData(response);
        setLoading(false);
        successCallback && successCallback(response);
      },
      error: (err) => {
        setLoadingError(err);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { loading, loadingError, data };
}
