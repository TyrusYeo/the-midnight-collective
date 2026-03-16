"use client";

import { useEffect, useRef, useState } from "react";
import InfiniteCanvas, { CanvasHandle } from "@/components/canvas/InfiniteCanvas";
import CampMidnightSection from "@/sections/campMidnight/CampMidnightSection";
import TMCSection from "@/sections/tmc/TMCSection";
import { DrawingCanvasHandle } from "@/components/tools/DrawingCanvas";

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
  }, []);
  return vp;
}

export default function Home() {
  const canvasRef = useRef<CanvasHandle>(null);
  const drawingCanvasRef = useRef<DrawingCanvasHandle | null>(null);
  const [toolHeld, setToolHeld] = useState(false);
  const { w, h } = useViewport();

  // Header/footer appear viewport-aligned on load
  const headerX = 0;
  const headerY = 0;

  // TMC cluster center
  const cx = w / 2;
  const cy = h / 2;

  // Camp Midnight cluster origin (cards start here)
  const cmX = w + 900;
  const cmY = h + 200;
  // Approximate visual center of the CM cluster
  const cmCenterX = cmX + 500;
  const cmCenterY = cmY;

  const handleNavClick = (section: string) => {
    if (section === "Camp Midnight") {
      // Pan so the CM cluster center lands at viewport center
      canvasRef.current?.panTo(w / 2 - cmCenterX, h / 2 - cmCenterY);
    }
    if (section === "say hi!") {
      // Pan back to TMC origin
      canvasRef.current?.panTo(0, 0);
    }
  };

  // More physical media (pencil that rolls when you hover over it, yellow paper pad with yellow lines, postcard more physical)

  return (
    <InfiniteCanvas ref={canvasRef} panEnabled={!toolHeld}>
      {(offset) => (
        <>
          {/* ═══ TMC SECTION ═══════════════════════════ */}
          <TMCSection cx={cx} cy={cy} offset={offset} drawingCanvasRef={drawingCanvasRef} setToolHeld={setToolHeld} handleNavClick={handleNavClick} />

          {/* ═══ CAMP MIDNIGHT SECTION ═══════════════════════════ */}
          <CampMidnightSection cmX={cmX} cy={cmY} headerX={headerX} headerY={headerY} handleNavClick={handleNavClick} />
        </>
      )}
    </InfiniteCanvas>
  );
}
