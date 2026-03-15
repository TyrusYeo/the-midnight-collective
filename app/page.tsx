"use client";

import { useEffect, useRef, useState } from "react";
import InfiniteCanvas, { CanvasHandle } from "@/components/canvas/InfiniteCanvas";
import HeaderCard from "@/components/cards/HeaderCard";
import FooterCard from "@/components/cards/FooterCard";
import PaperCard from "@/components/cards/PaperCard";
import VideoCard from "@/components/cards/VideoCard";
import PostcardCard from "@/components/cards/PostcardCard";
import CampMidnightSection from "./campMidnight/CampMidnightSection";
import DrawingCanvas, { DrawingCanvasHandle } from "@/components/tools/DrawingCanvas";
import PencilTool from "@/components/tools/PencilTool";
import EraserTool from "@/components/tools/EraserTool";

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
  const footerY = h - 56;

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
          {/* ── DRAWING SURFACE (below all cards, z-index 3) ─────*/}
          <DrawingCanvas ref={drawingCanvasRef} />

          {/* ── PENCIL ───────────────────────────────────────────*/}
          <PencilTool
            initialX={cx - 60}
            initialY={cy + 320}
            canvasOffset={offset}
            drawingCanvasRef={drawingCanvasRef}
            onHeldChange={setToolHeld}
          />

          {/* ── ERASER ───────────────────────────────────────────*/}
          <EraserTool
            initialX={cx + 220}
            initialY={cy + 330}
            canvasOffset={offset}
            drawingCanvasRef={drawingCanvasRef}
            onHeldChange={setToolHeld}
          />

          {/* ── HEADER ─────────────────────────────────────────── */}
          <HeaderCard
            initialX={headerX}
            initialY={headerY}
            wordmark="The Midnight Collective"
            logoSrc="/TMC_logo.png"
            onNavClick={handleNavClick}
          />

          {/* ── PAPER CARD 1: Hero tagline ───────────────────────*/}
          <PaperCard
            initialX={cx - 380}
            initialY={cy - 200}
            initialRotation={-2}
            width={440}
          >
            <p
              style={{
                margin: "0 0 14px",
              }}
              className="header"
            >
              A space to explore and play. With a community.
            </p>
            {/* <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
              The Midnight Collective is a third space for curious makers, thinkers, and builders in the US — a community that gathers around craft, creativity, and conversation.
            </p> */}
          </PaperCard>

          {/* ── PAPER CARD 2: What it is ─────────────────────────*/}
          <PaperCard
            initialX={cx - 220}
            initialY={cy - 140}
            initialRotation={1.5}
            width={390}
          >
            <p className="subheader mb-2">
              What we do
            </p>
            <p className="body">
              We create a space for artisians to gather, collaborate, and explore their craft bravely.
            </p>
            <p className="body">
              Think: coworking sessions, random heated discussions, and dinner tables turning into studios.
            </p>
          </PaperCard>

          {/* ── PAPER CARD 3: Who ────────────────────────────────*/}
          {/* <PaperCard
            initialX={cx + 180}
            initialY={cy - 80}
            initialRotation={-1}
            width={240}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-accent)", margin: "0 0 10px" }}>
              Who it&apos;s for
            </p>
            <ul style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-primary)", margin: 0, padding: "0 0 0 16px" }}>
              <li>Makers between projects</li>
              <li>Builders who want community</li>
              <li>Creatives seeking a real third space</li>
              <li>Anyone who thinks better with their hands</li>
            </ul>
          </PaperCard> */}

          {/* ── VIDEO CARD ───────────────────────────────────────*/}
          <VideoCard
            initialX={cx - 420}
            initialY={cy + 100}
            initialRotation={1}
            width={400}
          />

          {/* ═══ CAMP MIDNIGHT CLUSTER ═══════════════════════════ */}
          <CampMidnightSection cmX={cmX} cy={cmY} />
        </>
      )}
    </InfiniteCanvas>
  );
}
