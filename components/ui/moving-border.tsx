"use client";

import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const rxValue = rx ? (parseFloat(rx) / 100) * Math.min(width, height) : 0;
      const ryValue = ry ? (parseFloat(ry) / 100) * Math.min(width, height) : 0;
      
      // Create a rounded rectangle path that follows the border
      const path = `
        M ${rxValue},0
        L ${width - rxValue},0
        A ${rxValue},${ryValue} 0 0 1 ${width},${ryValue}
        L ${width},${height - ryValue}
        A ${rxValue},${ryValue} 0 0 1 ${width - rxValue},${height}
        L ${rxValue},${height}
        A ${rxValue},${ryValue} 0 0 1 0,${height - ryValue}
        L 0,${ryValue}
        A ${rxValue},${ryValue} 0 0 1 ${rxValue},0
        Z
      `;
      setPathData(path);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [rx, ry]);

  useAnimationFrame((time) => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      if (length > 0) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    }
  });

  const x = useTransform(
    progress,
    (val) => {
      if (pathRef.current) {
        try {
          const point = pathRef.current.getPointAtLength(val);
          return point.x;
        } catch {
          return 0;
        }
      }
      return 0;
    }
  );
  
  const y = useTransform(
    progress,
    (val) => {
      if (pathRef.current) {
        try {
          const point = pathRef.current.getPointAtLength(val);
          return point.y;
        } catch {
          return 0;
        }
      }
      return 0;
    }
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <path
          d={pathData}
          fill="none"
          stroke="none"
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
          pointerEvents: "none",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export function MovingBorderCard({
  borderRadius = "0.75rem",
  children,
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "relative overflow-visible bg-transparent",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute -inset-[2px] z-0 overflow-visible"
        style={{ borderRadius: borderRadius }}
      >
        <MovingBorder duration={duration} rx="12%" ry="12%">
          <div
            className={cn(
              "h-1 w-16 rounded-full",
              borderClassName,
            )}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 1), transparent)",
              boxShadow: "0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(59, 130, 246, 0.4)",
            }}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative z-10 h-full w-full bg-card text-card-foreground rounded-xl border border-border shadow-sm",
          className,
        )}
        style={{
          borderRadius: borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  );
}

