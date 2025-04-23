import { useState } from 'react';
import { HotState } from '../types/chat';

export const useHotFlow = () => {
  const [hotState, setHotState] = useState<HotState>({ isActive: false, currentText: '' });
  // TODO: Implement logic for activating/deactivating hot input, managing text
  return { hotState, setHotState };
}; 