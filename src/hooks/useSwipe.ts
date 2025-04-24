import { useRef } from 'react';

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  // Touch events
  function handleTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    startX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -50) onSwipeLeft();
    if (dx > 50) onSwipeRight();
    startX.current = null;
  }

  // Mouse events
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    isMouseDown.current = true;
    startX.current = e.clientX;
    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('mouseup', handleMouseUp as any);
  }
  function handleMouseMove(e: MouseEvent) {
    // Only track if mouse is down
    if (!isMouseDown.current || startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (dx < -50) {
      onSwipeLeft();
      cleanup();
    }
    if (dx > 50) {
      onSwipeRight();
      cleanup();
    }
  }
  function handleMouseUp() {
    cleanup();
  }
  function cleanup() {
    isMouseDown.current = false;
    startX.current = null;
    window.removeEventListener('mousemove', handleMouseMove as any);
    window.removeEventListener('mouseup', handleMouseUp as any);
  }

  return {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
  };
}
