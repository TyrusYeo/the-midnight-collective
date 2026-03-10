"use client";

import { useRef, useCallback } from "react";

export interface PanOffset {
  x: number;
  y: number;
}

interface UsePanOptions {
  // External ref owned by InfiniteCanvas so panTo() and pan gestures
  // share the same single source of truth.
  offsetRef: React.MutableRefObject<PanOffset>;
  onPan: (offset: PanOffset) => void;
}

export function usePan({ offsetRef, onPan }: UsePanOptions) {
  const isPanning = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startOffset = useRef<PanOffset>({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      isPanning.current = true;
      startPointer.current = { x: e.clientX, y: e.clientY };
      startOffset.current = { ...offsetRef.current };
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      document.body.style.cursor = "grabbing";
    },
    [offsetRef]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isPanning.current) return;
      const dx = e.clientX - startPointer.current.x;
      const dy = e.clientY - startPointer.current.y;
      const next = {
        x: startOffset.current.x + dx,
        y: startOffset.current.y + dy,
      };
      offsetRef.current = next;
      onPan(next);
    },
    [offsetRef, onPan]
  );

  const onPointerUp = useCallback(() => {
    isPanning.current = false;
    document.body.style.cursor = "default";
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
