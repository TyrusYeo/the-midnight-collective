"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
  const [zIndex, setZIndex] = useState(zIndexBase);

  const handleDragStart = () => {
    setIsDragging(true);
    globalZ += 1;
    setZIndex(globalZ);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.06}
      dragTransition={{
        power: 0.3,
        timeConstant: 220,
        bounceStiffness: 160,
        bounceDamping: 18,
      }}
      initial={{
        x: initialX,
        y: initialY,
        rotate: initialRotation,
      }}
      whileDrag={{
        scale: 1.025,
        rotate: initialRotation * 0.4, // flatten rotation slightly when held
      }}
      animate={{
        boxShadow: isDragging
          ? "0 28px 56px rgba(55, 50, 42, 0.22), 0 8px 16px rgba(55, 50, 42, 0.12)"
          : "0 4px 16px rgba(55, 50, 42, 0.10), 0 1px 4px rgba(55, 50, 42, 0.06)",
      }}
      transition={{
        boxShadow: { duration: 0.2 },
        scale: { type: "spring", stiffness: 300, damping: 25 },
        rotate: { type: "spring", stiffness: 200, damping: 20 },
      }}
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
      onPointerDown={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}
