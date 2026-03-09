"use client";

import { useRef, useCallback, useEffect } from "react";

export interface PanOffset {
  x: number;
  y: number;
}

interface UsePanOptions {
  onPan: (offset: PanOffset) => void;
  initialOffset?: PanOffset;
}

export function usePan({ onPan, initialOffset = { x: 0, y: 0 } }: UsePanOptions) {
  const offset = useRef<PanOffset>(initialOffset);
  const isPanning = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startOffset = useRef<PanOffset>(initialOffset);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only pan on the background (not on cards — cards call stopPropagation)
    if (e.target !== e.currentTarget) return;
    isPanning.current = true;
    startPointer.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset.current };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanning.current) return;
      const dx = e.clientX - startPointer.current.x;
      const dy = e.clientY - startPointer.current.y;
      offset.current = {
        x: startOffset.current.x + dx,
        y: startOffset.current.y + dy,
      };
      onPan({ ...offset.current });
    },
    [onPan]
  );

  const onPointerUp = useCallback(() => {
    isPanning.current = false;
    document.body.style.cursor = "default";
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
