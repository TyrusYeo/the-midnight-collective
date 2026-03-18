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

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(window.innerWidth < 768 ? 0.45 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function Home() {
  const canvasRef = useRef<CanvasHandle>(null);
  const drawingCanvasRef = useRef<DrawingCanvasHandle | null>(null);
  const [toolHeld, setToolHeld] = useState(false);
  const { w, h } = useViewport();
  const scale = useScale();

  const showHeaderInCampMidnight = true;

  // Header/footer appear viewport-aligned on load
  const headerX = 0;
  const headerY = 0;

  // TMC cluster center
  const cx = w / 2;
  const cy = h / 2;

  // Camp Midnight cluster origin (cards start here)
  const cmX = w + 900;
  const cmY = h;
  // Approximate visual center of the CM cluster
  const cmCenterX = cmX + 500;
  const cmCenterY = cmY;

  // On mount, instantly snap the canvas so the CM cluster is centered —
  // no animation so there's no flash of the TMC origin.
  useEffect(() => {
    canvasRef.current?.panTo(w / 2 - cmCenterX * scale, h / 2 - cmCenterY * scale, false);
  // Only run once real viewport dimensions and scale are available
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w, scale]);

  const handleNavClick = (section: string) => {
    if (section === "Camp Midnight") {
      canvasRef.current?.panTo(w / 2 - cmCenterX * scale, h / 2 - cmCenterY * scale);
    }
    if (section === "say hi!") {
      canvasRef.current?.panTo(0, 0);
    }
  };

  // More physical media (pencil that rolls when you hover over it, yellow paper pad with yellow lines, postcard more physical)

  return (
    <InfiniteCanvas ref={canvasRef} panEnabled={!toolHeld} scale={scale}>
      {(offset) => (
        <>
          {/* ═══ TMC SECTION ═══════════════════════════ */}
          <TMCSection cx={cx} cy={cy} offset={offset} drawingCanvasRef={drawingCanvasRef} setToolHeld={setToolHeld} handleNavClick={handleNavClick} showHeader={!showHeaderInCampMidnight} scale={scale} />

          {/* ═══ CAMP MIDNIGHT SECTION ═══════════════════════════ */}
          <CampMidnightSection cmX={cmX} cy={cmY} headerX={headerX} headerY={headerY} showHeader={showHeaderInCampMidnight} handleNavClick={handleNavClick} scale={scale} />
        </>
      )}
    </InfiniteCanvas>
  );
}
