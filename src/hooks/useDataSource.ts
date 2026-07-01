import { useEffect, useState, type DependencyList } from "react";

interface DataSourceState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDataSource<T>(
  load: () => Promise<T>,
  fallback: T | null = null,
  deps: DependencyList = []
): DataSourceState<T> {
  const [state, setState] = useState<DataSourceState<T>>({
    data: fallback,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    setState((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    Promise.resolve()
      .then(load)
      .then((value) => {
        if (active) {
          setState({
            data: value,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            data: fallback,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });

    return () => {
      active = false;
    };
  }, deps);

  return state;
}
