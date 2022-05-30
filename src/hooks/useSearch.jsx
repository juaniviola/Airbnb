import { useCallback, useState } from 'react';

export default function useSearch (initialState) {
  const [state, setState] = useState(initialState);
  const handleSetState = useCallback((newValue) => setState(newValue), []);

  return [state, handleSetState];
};
