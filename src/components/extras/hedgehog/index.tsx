"use client";

import { useEffect, useState } from "react";
import { HedgeHogMode } from "./hedgehog-mode";

export default function Hedgehog() {
    const [game, setGame] = useState<HedgeHogMode | null>(null);

    const setupHedgehogMode = async (container: HTMLDivElement) => {
        const hedgehogMode = new HedgeHogMode();
        setGame(hedgehogMode);
        await hedgehogMode.render(container);
    }

    useEffect(() => {
        return () => game?.destroy();
    }, [game]);

    return (
        <div
            className="absolute inset-0 z-[-1]"
            ref={(el) => {
                if (el && !game) {
                    setupHedgehogMode(el);
                }
            }}
        />
    )
}