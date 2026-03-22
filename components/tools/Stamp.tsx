"use client";

import DraggableCard from "../cards/DraggableCard";

export enum StampVariation {
    "MICHIGAN" = "michigan",
    "MICHIGAN_2" = "michigan_2",
    // "TMC" = "tmc",
    "BRITISH" = "british",
}

export default function Stamp({
    initialX,
    initialY,
    initialRotation = 0,
    variation,
    onSnapToPostcard,
    postcardRef,
}: {
    initialX: number;
    initialY: number;
    initialRotation?: number;
    variation: StampVariation;
    onSnapToPostcard?: () => void;
    postcardRef?: React.RefObject<HTMLDivElement | null>;
}) {
    const handleDragEnd = (event: any, info: any) => {
        if (!postcardRef?.current || !onSnapToPostcard) return;

        const postcardRect = postcardRef.current.getBoundingClientRect();
        const stampX = info.point.x;
        const stampY = info.point.y;

        // Stamp area is top-right of postcard, roughly where the address lines are
        const stampAreaX = postcardRect.right - 150;
        const stampAreaY = postcardRect.top + 120;
        const snapThreshold = 100;

        const distanceX = Math.abs(stampX - stampAreaX);
        const distanceY = Math.abs(stampY - stampAreaY);

        if (distanceX < snapThreshold && distanceY < snapThreshold) {
            onSnapToPostcard();
        }
    };

    return (
        <DraggableCard
            initialX={initialX}
            initialY={initialY}
            initialRotation={initialRotation}
            onDragEnd={handleDragEnd}
        >
            <img
                src={`/canvas-elements/stamps/${variation}.jpg`}
                alt=""
                draggable={false}
                style={{ display: "block", width: "auto", height: "auto", maxWidth: "210px", maxHeight: "200px"}}
            />
        </DraggableCard>
    )
}