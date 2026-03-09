"use client";

import { useRef, useState, useCallback } from "react";
import { usePan, PanOffset } from "./usePan";

interface InfiniteCanvasProps {
  children: (offset: PanOffset) => React.ReactNode;
}

const GRID_SIZE = 40; // px between grid lines

export default function InfiniteCanvas({ children }: InfiniteCanvasProps) {
  const [offset, setOffset] = useState<PanOffset>({ x: 0, y: 0 });

  const handlePan = useCallback((newOffset: PanOffset) => {
    setOffset(newOffset);
  }, []);

  const { onPointerDown, onPointerMove, onPointerUp } = usePan({
    onPan: handlePan,
    initialOffset: { x: 0, y: 0 },
  });

  // Background pattern shifts with pan to create infinite tiling effect
  const bgX = ((offset.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
  const bgY = ((offset.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        inset: 0,
        cursor: "grab",
        // Cutting board grid background
        background: `
          linear-gradient(var(--board-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--board-grid) 1px, transparent 1px),
          var(--board-base)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Subtle vignette for depth */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(160,170,150,0.25) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* The canvas world — everything positioned absolutely inside */}
      <div
        style={{
          position: "absolute",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: "0 0",
          willChange: "transform",
        }}
      >
        {children(offset)}
      </div>
    </div>
  );
}
