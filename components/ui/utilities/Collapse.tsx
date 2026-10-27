import React, { useEffect, useRef, useState } from "react";

interface CollapseProps {
  children: React.ReactNode;
  on: boolean;
  className?: string;
  durationMs?: number;
}

const Collapse: React.FC<CollapseProps> = ({
  children,
  on,
  className,
  durationMs = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialMountRef = useRef(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (initialMountRef.current) {
      initialMountRef.current = false;
      el.style.height = on ? "auto" : "0px";
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || durationMs <= 0) {
      el.style.transition = "";
      el.style.height = on ? "auto" : "0px";
      setIsTransitioning(false);
      return;
    }

    const startHeight = el.getBoundingClientRect().height;
    const endHeight = on ? el.scrollHeight : 0;

    el.style.transition = "";
    el.style.height = `${startHeight}px`;
    el.getBoundingClientRect();

    el.style.transition = `height ${durationMs}ms ease`;
    setIsTransitioning(true);

    const frameId = requestAnimationFrame(() => {
      el.style.height = `${endHeight}px`;
    });

    const handleEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "height") return;
      el.style.transition = "";
      el.style.height = on ? "auto" : "0px";
      setIsTransitioning(false);
    };

    el.addEventListener("transitionend", handleEnd, { once: true });

    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("transitionend", handleEnd);
    };
  }, [on, durationMs]);

  return (
    <div
      ref={containerRef}
      aria-hidden={!on}
      className={
        `overflow-hidden ${className ?? ""} ${isTransitioning ? "collapse--animating" : ""}`.trim() ||
        undefined
      }
    >
      {children}
    </div>
  );
};

export default Collapse;
