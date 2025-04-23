import { useState } from 'react';
import { HorizonState } from '../types/chat';

export const useHorizonPosition = () => {
  const [horizonState, setHorizonState] = useState<HorizonState>({ positionY: 0, visibleBubbles: [] });
  // TODO: Implement logic for calculating horizon position, managing visible bubbles
  return { horizonState, setHorizonState };
}; 