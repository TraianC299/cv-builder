import React, { useRef, useLayoutEffect, useState, useCallback } from "react";

interface CollapseProps {
  children: React.ReactNode;
  on: boolean;
}
const style = { overflow: "scroll" }
const Collapse: React.FC<CollapseProps> = ({ children, on }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const animateOpen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    // start from 0
    el.style.height = "0px";
    el.style.transition = "";
    // force a layout so the browser sees the 0px
    el.getBoundingClientRect();

    // then turn on transition and expand to scrollHeight
    el.style.transition = "height 300ms ease";
    setIsTransitioning(true);
    el.style.height = `${el.scrollHeight}px`;

    const handleEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "height") return;
      // once open, switch to auto so content changes aren’t clipped
      el.style.height = "auto";
      setIsTransitioning(false);
      el.removeEventListener("transitionend", handleEnd);
    };
    el.addEventListener("transitionend", handleEnd);
  }, []);

  const animateClose = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    // snap to current pixel height (in case it was "auto")
    el.style.height = `${el.scrollHeight}px`;
    el.style.transition = "";
    el.getBoundingClientRect();

    // then animate down to 0
    el.style.transition = "height 300ms ease";
    setIsTransitioning(true);
    el.style.height = "0px";

    const handleEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "height") return;
      setIsTransitioning(false);
      el.removeEventListener("transitionend", handleEnd);
    };
    el.addEventListener("transitionend", handleEnd);
  }, []);

  // when `on` flips, run the appropriate animation
  useLayoutEffect(() => {
    if (on) {
      animateOpen();
    } else {
      animateClose();
    }
  }, [on, animateOpen, animateClose]);

  return (
    <div
      ref={containerRef}
      className={isTransitioning ? "collapse--animating" : undefined}
      style={style}
    >
      {children}
    </div>
  );
};

export default Collapse;
