import { useEffect, useState } from 'react';

export const useDebounceValue = <T>(value: T, timeout: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(handler);
    };
  }, [value, timeout]);

  return debouncedValue;
};
