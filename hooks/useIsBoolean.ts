import { useCallback, useState } from 'react';

export const useIsBoolean = (initialState = false): [state: boolean, setTrue: () => void, setFalse: () => void] => {
  const [state, setState] = useState(initialState);

  return [state, useCallback(() => setState(true), [setState]), useCallback(() => setState(false), [setState])];
};
