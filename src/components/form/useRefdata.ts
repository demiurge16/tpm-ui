import { useState, useEffect } from "react";
import { Observable, forkJoin } from "rxjs";

export function useRefdata<T extends Record<string, Observable<any>>>(
  sources: T,
  successCallback?: (refdata: Record<keyof T, any>) => void,
): {
  loading: boolean;
  refdataError: string | null;
  refdata: {
    [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
  }
} {
  const [loading, setLoading] = useState(true);
  const [refdataError, setRefdataError] = useState<string | null>(null);
  const [refdata, setRefdata] = useState<Record<keyof T, any>>({} as Record<keyof T, any>);

  useEffect(() => {
    const subscription = forkJoin(sources).subscribe({
      next: (response) => {
        setRefdata(response);
        setLoading(false);
        successCallback && successCallback(response);
      },
      error: (err) => {
        setRefdataError(err);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe()
  }, []);

  return { loading, refdataError, refdata };
}