import { PanOffset } from "@/components/canvas/usePan";
import HeaderCard from "@/components/cards/HeaderCard";
import PaperCard from "@/components/cards/PaperCard";
import VideoCard from "@/components/cards/VideoCard";
import DrawingCanvas, { DrawingCanvasHandle } from "@/components/tools/DrawingCanvas";
import EraserTool from "@/components/tools/EraserTool";
import PencilTool from "@/components/tools/PencilTool";

export default function TMCSection(
    { cx,
        cy,
        offset,
        drawingCanvasRef,
        setToolHeld,
        handleNavClick,
        showHeader = true,
        scale = 1,
    }: {
        cx: number,
        cy: number,
        offset: PanOffset,
        drawingCanvasRef: React.RefObject<DrawingCanvasHandle | null>,
        setToolHeld: (held: boolean) => void,
        handleNavClick: (section: string) => void,
        showHeader?: boolean,
        scale?: number,
    } ) {
    // Header/footer appear viewport-aligned on load
    const headerX = 0;
    const headerY = 0;
    return (
        <div>
            {/* ── DRAWING SURFACE (below all cards, z-index 3) ─────*/}
            <DrawingCanvas ref={drawingCanvasRef} />

            {/* ── PENCIL ───────────────────────────────────────────*/}
            <PencilTool
            initialX={cx + 250}
            initialY={cy + 200}
            canvasOffset={offset}
            drawingCanvasRef={drawingCanvasRef}
            onHeldChange={setToolHeld}
            scale={scale}
            />

            {/* ── ERASER ───────────────────────────────────────────*/}
            <EraserTool
            initialX={cx + 300}
            initialY={cy + 330}
            canvasOffset={offset}
            drawingCanvasRef={drawingCanvasRef}
            onHeldChange={setToolHeld}
            scale={scale}
            />

            {/* ── HEADER ─────────────────────────────────────────── */}
            {showHeader && (
                <HeaderCard
                initialX={headerX}
                initialY={headerY}
                wordmark="The Midnight Collective"
                onNavClick={handleNavClick}
                />
            )}

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
        </div>
    )
}