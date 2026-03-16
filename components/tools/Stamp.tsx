import DraggableCard from "../cards/DraggableCard";

export enum StampVariation {
    "UMICH" = "umich",
    "TMC" = "tmc",
    "BRITISH" = "british",
}

export default function Stamp({
    initialX,
    initialY,
    initialRotation = 0,
    variation,
}: {
    initialX: number;
    initialY: number;
    initialRotation?: number;
    variation: StampVariation;
}) {
    return (
        <DraggableCard
            initialX={initialX}
            initialY={initialY}
            initialRotation={initialRotation}
        >
            <div style={{ width: 120, height: 140, background: 'red', backgroundImage: `url('/canvas-elements/stamp_${variation}.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </DraggableCard>
    )
}