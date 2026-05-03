"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const dotX = useSpring(cursorX, { damping: 50, stiffness: 800 });
  const dotY = useSpring(cursorY, { damping: 50, stiffness: 800 });

  const isHovering = useRef(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const addHover = () => (isHovering.current = true);
    const removeHover = () => (isHovering.current = false);

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-accent/60 mix-blend-difference"
        style={{ x, y }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-1 w-1 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "15px", translateY: "15px" }}
      />
    </>
  );
}
