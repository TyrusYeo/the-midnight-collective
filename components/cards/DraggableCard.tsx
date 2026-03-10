"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface DraggableCardProps {
  initialX: number;
  initialY: number;
  initialRotation?: number;
  zIndexBase?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

let globalZ = 10;

export default function DraggableCard({
  initialX,
  initialY,
  initialRotation = 0,
  zIndexBase = 10,
  children,
  className = "",
  style = {},
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [zIndex, setZIndex] = useState(zIndexBase);

  // New random tilt angle generated on each press — gives each pick-up
  // a slightly different feel so it doesn't feel mechanical.
  const tiltRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    // ±3 degrees, biased away from zero so there's always a visible tilt
    const sign = Math.random() < 0.5 ? -1 : 1;
    const maxDeg = 5.6;
    const minDeg = 1.3;
    const randomDeg = minDeg + Math.floor(Math.random() * (maxDeg - minDeg + 1));
    tiltRef.current = sign * randomDeg;
    setIsPressed(true);
    globalZ += 1;
    setZIndex(globalZ);
  };

  const handlePointerUp = () => {
    // Only clear pressed state if drag never started — otherwise
    // onDragEnd handles the cleanup so the lifted state persists while dragging.
    if (!isDragging) setIsPressed(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsPressed(false);
  };

  const active = isDragging || isPressed;

  // Pressed: shift slightly toward the random tilt on top of the resting angle.
  // Dragging: flatten toward neutral with the tilt still present.
  const targetRotation = active
    ? initialRotation * 0.45 + tiltRef.current
    : initialRotation;

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.06}
      dragTransition={{
        power: 0.12,
        timeConstant: 300,
        bounceStiffness: 160,
        bounceDamping: 20,
      }}
      initial={{
        x: initialX,
        y: initialY,
        rotate: initialRotation,
        scale: 1,
      }}
      animate={{
        scale: isDragging ? 1.03 : isPressed ? 1.015 : 1,
        rotate: targetRotation,
        boxShadow: isDragging
          ? "0 32px 60px rgba(55, 50, 42, 0.24), 0 10px 20px rgba(55, 50, 42, 0.14)"
          : isPressed
          ? "0 18px 36px rgba(55, 50, 42, 0.17), 0 5px 10px rgba(55, 50, 42, 0.10)"
          : "0 4px 16px rgba(55, 50, 42, 0.10), 0 1px 4px rgba(55, 50, 42, 0.06)",
      }}
      transition={{
        scale: { type: "spring", stiffness: 420, damping: 26 },
        rotate: { type: "spring", stiffness: 320, damping: 22 },
        boxShadow: { duration: 0.15 },
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        position: "absolute",
        zIndex,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
