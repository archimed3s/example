import { useLayoutEffect, useRef, useState } from 'react';

export const useFullscreenState = <T extends HTMLElement>() => {
  const [fullscreen, setFullscreen] = useState(false);
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    if (fullscreen) {
      elementRef.current?.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [fullscreen]);

  return {
    fullscreen,
    setFullscreen,
    elementRef,
  };
};
