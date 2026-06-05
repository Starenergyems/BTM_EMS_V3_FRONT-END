'use client';

import { useCallback, useMemo, useState } from 'react';

// ----------------------------------------------------------------------

export function useBoolean(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setValue(false);
  }, []);

  const onToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      onFalse,
      onToggle,
      onTrue,
      setValue,
      value,
    }),
    [value, onTrue, onFalse, onToggle, setValue],
  );

  return memoizedValue;
}
