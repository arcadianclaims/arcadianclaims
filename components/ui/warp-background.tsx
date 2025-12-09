"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const WarpBackground = ({
    children,
    className,
    perspective = 1000,
    starsCount = 500,
}: {
    children?: React.ReactNode;
    className?: string;
    perspective?: number;
    starsCount?: number;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; color: string }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starsCount; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * canvas.width * 2,
                    y: (Math.random() - 0.5) * canvas.height * 2,
                    z: Math.random() * perspective,
                    color: Math.random() > 0.5 ? "var(--primary)" : "var(--accent)",
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trail effect? Maybe too dark for light mode.
            // Let's just clear for now to be safe with themes.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                // Move star towards screen
                star.z -= 5; // Speed

                // Reset if passed screen
                if (star.z <= 0) {
                    star.z = perspective;
                    star.x = (Math.random() - 0.5) * canvas.width * 2;
                    star.y = (Math.random() - 0.5) * canvas.height * 2;
                }

                const k = perspective / star.z;
                const x = star.x * k + cx;
                const y = star.y * k + cy;
                const size = (1 - star.z / perspective) * 4;

                // Get color from CSS variable
                const computedColor = getComputedStyle(document.documentElement)
                    .getPropertyValue(star.color === "var(--primary)" ? "--primary" : "--accent")
                    .trim();

                // Fallback if variable not found (though it should be)
                ctx.fillStyle = computedColor || (star.color === "var(--primary)" ? "#3b82f6" : "#06b6d4");

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [perspective, starsCount]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
