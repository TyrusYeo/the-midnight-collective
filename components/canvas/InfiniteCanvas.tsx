"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from "react";
import { usePan, PanOffset } from "./usePan";

export interface CanvasHandle {
  panTo: (x: number, y: number, animated?: boolean) => void;
}

interface InfiniteCanvasProps {
  children: (offset: PanOffset) => React.ReactNode;
  initialOffset?: PanOffset;
}

const GRID_SIZE = 40;

// Simple spring simulation — runs in a RAF loop so no library quirks.
// velX/velY are kept as mutable values outside React state.
function springAnimate(
  offsetRef: React.MutableRefObject<PanOffset>,
  setOffset: React.Dispatch<React.SetStateAction<PanOffset>>,
  targetX: number,
  targetY: number,
  rafRef: React.MutableRefObject<number | null>
) {
  if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

  let posX = offsetRef.current.x;
  let posY = offsetRef.current.y;
  let velX = 0;
  let velY = 0;

  // Tuning: stiffness controls how snappy, damping controls overshoot.
  // These values give a smooth ~450ms pan with a subtle ease-out.
  const stiffness = 0.025;
  const damping = 0.8;

  const tick = () => {
    velX = velX * damping + (targetX - posX) * stiffness;
    velY = velY * damping + (targetY - posY) * stiffness;
    posX += velX;
    posY += velY;

    offsetRef.current = { x: posX, y: posY };
    setOffset({ x: posX, y: posY });

    const settled =
      Math.abs(targetX - posX) < 0.3 &&
      Math.abs(targetY - posY) < 0.3 &&
      Math.abs(velX) < 0.3 &&
      Math.abs(velY) < 0.3;

    if (!settled) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      offsetRef.current = { x: targetX, y: targetY };
      setOffset({ x: targetX, y: targetY });
      rafRef.current = null;
    }
  };

  rafRef.current = requestAnimationFrame(tick);
}

const InfiniteCanvas = forwardRef<CanvasHandle, InfiniteCanvasProps>(
  ({ children, initialOffset = { x: 0, y: 0 } }, ref) => {
    const offsetRef = useRef<PanOffset>(initialOffset);
    const [offset, setOffset] = useState<PanOffset>(initialOffset);
    const rafRef = useRef<number | null>(null);

    const handlePan = useCallback((next: PanOffset) => {
      // Cancel any in-flight panTo animation when the user grabs the canvas
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setOffset(next);
    }, []);

    const { onPointerDown, onPointerMove, onPointerUp } = usePan({
      offsetRef,
      onPan: handlePan,
    });

    useImperativeHandle(ref, () => ({
      panTo: (x: number, y: number, animated = true) => {
        if (!animated) {
          if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
          offsetRef.current = { x, y };
          setOffset({ x, y });
          return;
        }
        springAnimate(offsetRef, setOffset, x, y, rafRef);
      },
    }));

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
        {/* Subtle vignette */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 60%, rgba(160,170,150,0.25) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Canvas world */}
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
);

InfiniteCanvas.displayName = "InfiniteCanvas";
export default InfiniteCanvas;
