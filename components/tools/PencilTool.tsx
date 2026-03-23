"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PanOffset } from "@/components/canvas/usePan";
import type { DrawingCanvasHandle } from "./DrawingCanvas";

// Rendered size — tip is on the LEFT end of the image
const W = 400;
const H = 300;
const PROXIMITY = 150; // screen px radius that triggers rolling
export const PENCIL_STROKE_COLOR = '#c9c9c9';

interface Props {
  initialX: number;
  initialY: number;
  canvasOffset: PanOffset;
  drawingCanvasRef: React.RefObject<DrawingCanvasHandle | null>;
  onHeldChange(held: boolean): void;
  scale?: number;
}

export default function PencilTool({
  initialX,
  initialY,
  canvasOffset,
  drawingCanvasRef,
  onHeldChange,
  scale = 1,
}: Props) {
  const posRef = useRef({ x: initialX, y: initialY });
  const [pos, setPos] = useState({ x: initialX, y: initialY });

  // Accumulated roll angle from proximity passes
  const rollRef = useRef(0);
  const [roll, setRoll] = useState(0);

  const [isHeld, setIsHeld] = useState(false);
  const isHeldRef = useRef(false);

  // Nudge velocity from proximity pushes, decays over time
  const nudgeVel = useRef({ x: 0, y: 0 });

  // Always-current canvas offset and scale for coord conversion in event handlers
  const offsetRef = useRef(canvasOffset);
  useEffect(() => { offsetRef.current = canvasOffset; }, [canvasOffset]);
  const scaleRef = useRef(scale);
  useEffect(() => { scaleRef.current = scale; }, [scale]);

  const rafRef = useRef<number | null>(null);
  const prevMouse = useRef({ x: 0, y: 0 });

  // Physics decay loop — slowly bleeds off nudge velocity when pencil isn't held
  useEffect(() => {
    const tick = () => {
      if (!isHeldRef.current) {
        nudgeVel.current.x *= 0.88;
        nudgeVel.current.y *= 0.88;
        if (
          Math.abs(nudgeVel.current.x) > 0.05 ||
          Math.abs(nudgeVel.current.y) > 0.05
        ) {
          posRef.current = {
            x: posRef.current.x + nudgeVel.current.x,
            y: posRef.current.y + nudgeVel.current.y,
          };
          setPos({ ...posRef.current });
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Global mousemove: handles both proximity rolling and drawing
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { x: ox, y: oy } = offsetRef.current;

      if (isHeldRef.current) {
        // Convert screen cursor → world coords (divide by scale for CSS scale() transform)
        const s = scaleRef.current;
        const wx = (e.clientX - ox) / s;
        const wy = (e.clientY - oy) / s;
        // Tip (left edge) stays at cursor.
        // transformOrigin: "0% 50%" means rotation is anchored to left-center,
        // so left = cursorWorldX, top = cursorWorldY - H/2 keeps the tip pinned.
        posRef.current = { x: wx, y: wy - H / 2 };
        setPos({ ...posRef.current });
        drawingCanvasRef.current?.continueStroke(wx, wy, PENCIL_STROKE_COLOR, 4);
        prevMouse.current = { x: e.clientX, y: e.clientY };
        return;
      }

      // Proximity rolling ─────────────────────────────────────────────────────
      const { x: ox2, y: oy2 } = offsetRef.current;
      const s2 = scaleRef.current;
      const scx = posRef.current.x * s2 + W * s2 / 2 + ox2;
      const scy = posRef.current.y * s2 + H * s2 / 2 + oy2;
      const dx = e.clientX - scx;
      const dy = e.clientY - scy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < PROXIMITY) {
        const strength = 1 - dist / PROXIMITY;
        const deltaX = e.clientX - prevMouse.current.x;

        // Roll proportional to cursor horizontal speed × proximity strength
        rollRef.current += deltaX * strength * 0.9;
        setRoll(rollRef.current);

        // Nudge away from cursor
        if (dist > 1) {
          nudgeVel.current.x -= (dx / dist) * strength * 0.45;
          nudgeVel.current.y -= (dy / dist) * strength * 0.45;
        }
      }

      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [drawingCanvasRef]);

  // Global pointerup: release pencil from drawing mode
  useEffect(() => {
    const onUp = () => {
      if (!isHeldRef.current) return;
      isHeldRef.current = false;
      setIsHeld(false);
      onHeldChange(false);
      drawingCanvasRef.current?.endStroke();
      document.body.style.cursor = "";
    };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [drawingCanvasRef, onHeldChange]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const { x: ox, y: oy } = offsetRef.current;
    const s = scaleRef.current;
    const wx = (e.clientX - ox) / s;
    const wy = (e.clientY - oy) / s;

    isHeldRef.current = true;
    setIsHeld(true);
    onHeldChange(true);

    // Immediately snap pencil tip to cursor
    posRef.current = { x: wx, y: wy - H / 2 };
    setPos({ ...posRef.current });

    drawingCanvasRef.current?.startStroke(wx, wy);
    document.body.style.cursor = "crosshair";
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: W,
        height: H,
        zIndex: isHeld ? 100 : 50,
        cursor: isHeld ? "crosshair" : "grab",
        touchAction: "none",
        // Anchor rotation to left-center (the tip) when held,
        // center when rolling so it spins naturally in place
        transformOrigin: isHeld ? "0% 50%" : "50% 50%",
      }}
      animate={{
        // Writing angle when held; free-rolling value when on the board
        rotate: isHeld ? -22 : roll,
        scale: isHeld ? 1.06 : 1,
        filter: isHeld
          ? "drop-shadow(0 18px 26px rgba(55,50,42,0.36))"
          : "drop-shadow(0 3px 9px rgba(55,50,42,0.18))",
      }}
      transition={{
        rotate: isHeld
          ? { type: "spring", stiffness: 200, damping: 20 }
          : { duration: 0 }, // instant during proximity roll
        scale: { type: "spring", stiffness: 380, damping: 24 },
        filter: { duration: 0.15 },
      }}
      onPointerDown={onPointerDown}
    >
        <img
          src="/canvas-elements/pencil.png"
          alt="Pencil"
          style={{
            position: "relative",
            left: 0,
            top: 0,
            width: W,
            height: H,
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            display: "block",
          }}
          draggable={false}
        />
    </motion.div>
  );
}
