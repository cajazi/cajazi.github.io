import { useEffect, useState, type DependencyList } from "react";
import type { DataResult } from "../data/sources";

function isPromise<T>(value: DataResult<T>): value is Promise<T> {
  return value instanceof Promise;
}

export function useDataSource<T>(
  load: () => DataResult<T>,
  fallback: T,
  deps: DependencyList = []
) {
  const [state, setState] = useState<T>(() => {
    const initial = load();
    return isPromise(initial) ? fallback : initial;
  });

  useEffect(() => {
    let active = true;
    const result = load();

    if (isPromise(result)) {
      result.then((value) => {
        if (active) {
          setState(value);
        }
      });
    } else {
      setState(result);
    }

    return () => {
      active = false;
    };
  }, deps);

  return state;
}
