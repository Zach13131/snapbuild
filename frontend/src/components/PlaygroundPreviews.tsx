import { useEffect, useRef, useState } from "react";
import {
    segmentWash,
    type PlaygroundCopy,
    type PlaygroundFormat,
    type PlaygroundSegment,
} from "../playground";
import { usePrefersReducedMotion } from "../motion";
import { SegmentStage } from "./PlaygroundWorlds";

export function FormatPreview({
    copy,
    format,
    segment,
}: {
    copy: PlaygroundCopy;
    format: PlaygroundFormat;
    segment: PlaygroundSegment;
}) {
    const reduced = usePrefersReducedMotion();
    const [wash, setWash] = useState(false);
    const prev = useRef(segment);

    useEffect(() => {
        if (prev.current === segment) return;
        prev.current = segment;
        if (reduced) return;
        setWash(true);
        const id = window.setTimeout(() => setWash(false), 380);
        return () => window.clearTimeout(id);
    }, [segment, reduced]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <div key={format} className={`absolute inset-0 ${reduced ? "" : "stage-fade"}`}>
                <SegmentStage copy={copy} format={format} />
            </div>
            <div
                className={`pointer-events-none absolute inset-0 ${segmentWash(segment)} motion-safe:transition-opacity motion-safe:duration-300 ${
                    wash ? "opacity-35" : "opacity-0"
                }`}
            />
        </div>
    );
}
