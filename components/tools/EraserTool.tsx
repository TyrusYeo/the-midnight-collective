"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PanOffset } from "@/components/canvas/usePan";
import type { DrawingCanvasHandle } from "./DrawingCanvas";

const W = 160;
const H = 140;
// Erasing footprint — slightly smaller than the visual for accuracy
const ERASE_W = 110;
const ERASE_H = 110;

interface Props {
  initialX: number;
  initialY: number;
  canvasOffset: PanOffset;
  drawingCanvasRef: React.RefObject<DrawingCanvasHandle | null>;
  onHeldChange(held: boolean): void;
}

export default function EraserTool({
  initialX,
  initialY,
  canvasOffset,
  drawingCanvasRef,
  onHeldChange,
}: Props) {
  const posRef = useRef({ x: initialX, y: initialY });
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isHeld, setIsHeld] = useState(false);
  const isHeldRef = useRef(false);

  const offsetRef = useRef(canvasOffset);
  useEffect(() => { offsetRef.current = canvasOffset; }, [canvasOffset]);

  // Follow cursor and erase while held
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isHeldRef.current) return;
      const { x: ox, y: oy } = offsetRef.current;
      const wx = e.clientX - ox;
      const wy = e.clientY - oy;
      posRef.current = { x: wx - W / 2, y: wy - H / 2 };
      setPos({ ...posRef.current });
      drawingCanvasRef.current?.eraseAt(wx, wy, ERASE_W, ERASE_H);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [drawingCanvasRef]);

  // Release
  useEffect(() => {
    const onUp = () => {
      if (!isHeldRef.current) return;
      isHeldRef.current = false;
      setIsHeld(false);
      onHeldChange(false);
      document.body.style.cursor = "";
    };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [onHeldChange]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const { x: ox, y: oy } = offsetRef.current;
    const wx = e.clientX - ox;
    const wy = e.clientY - oy;

    isHeldRef.current = true;
    setIsHeld(true);
    onHeldChange(true);

    posRef.current = { x: wx - W / 2, y: wy - H / 2 };
    setPos({ ...posRef.current });

    // Erase at initial click position too
    drawingCanvasRef.current?.eraseAt(wx, wy, ERASE_W, ERASE_H);
    document.body.style.cursor = "none";
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        width: W,
        height: H,
        left: pos.x,
        top: pos.y,
        zIndex: isHeld ? 100 : 20,
        cursor: isHeld ? "none" : "grab",
        touchAction: "none",
      }}
      animate={{
        rotate: isHeld ? -8 : 0,
        scale: isHeld ? 1.1 : 1,
        filter: isHeld
          ? "drop-shadow(0 14px 22px rgba(55,50,42,0.30))"
          : "drop-shadow(0 3px 7px rgba(55,50,42,0.15))",
      }}
      transition={{
        rotate: { type: "spring", stiffness: 280, damping: 22 },
        scale: { type: "spring", stiffness: 380, damping: 24 },
        filter: { duration: 0.15 },
      }}
      onPointerDown={onPointerDown}
    >
      <img
        src="/canvas-elements/eraser.png"
        alt="Eraser"
        width={W}
        style={{ display: "block", pointerEvents: "none", userSelect: "none" }}
        draggable={false}
      />
    </motion.div>
  );
}
