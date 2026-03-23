"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { PENCIL_STROKE_COLOR } from "./PencilTool";

export interface DrawingCanvasHandle {
  startStroke(worldX: number, worldY: number): void;
  continueStroke(worldX: number, worldY: number, strokeColor?: string, lineWidth?: number): void;
  endStroke(): void;
  eraseAt(worldX: number, worldY: number, w?: number, h?: number): void;
}

// Large canvas centered on world origin.
// Canvas pixel (OX, OY) maps to world (0, 0).
const CW = 10000;
const CH = 8000;
const OX = 4000;
const OY = 3000;

const DrawingCanvas = forwardRef<DrawingCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  function ctx() {
    return canvasRef.current?.getContext("2d") ?? null;
  }

  useImperativeHandle(ref, () => ({
    startStroke(wx, wy) {
      const c = ctx();
      if (!c) return;
      const px = wx + OX;
      const py = wy + OY;
      lastPt.current = { x: px, y: py };
      c.beginPath();
      c.moveTo(px, py);
    },

    continueStroke(wx, wy, strokeColor = PENCIL_STROKE_COLOR, lineWidth = 1.7) {
      const c = ctx();
      if (!c) return;
      const px = wx + OX;
      const py = wy + OY;
      const last = lastPt.current;

      c.strokeStyle = strokeColor;
      c.lineWidth = lineWidth;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.globalAlpha = 0.80;

      if (last) {
        // Quadratic curve through midpoint for smooth strokes
        const mx = (last.x + px) / 2;
        const my = (last.y + py) / 2;
        c.beginPath();
        c.moveTo(last.x, last.y);
        c.quadraticCurveTo(last.x, last.y, mx, my);
        c.stroke();
      }

      lastPt.current = { x: px, y: py };
    },

    endStroke() {
      lastPt.current = null;
    },

    eraseAt(wx, wy, w = 36, h = 22) {
      const c = ctx();
      if (!c) return;
      c.clearRect(wx + OX - w / 2, wy + OY - h / 2, w, h);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      width={CW}
      height={CH}
      style={{
        position: "absolute",
        left: -OX,
        top: -OY,
        pointerEvents: "none",
        // Below cards (cards are z-index 5+) but above the board
        zIndex: 3,
      }}
    />
  );
});

DrawingCanvas.displayName = "DrawingCanvas";
export default DrawingCanvas;
