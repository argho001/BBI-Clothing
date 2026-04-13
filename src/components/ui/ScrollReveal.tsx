import React, { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
}

export const ScrollReveal = ({
  children,
  width = "100%",
  className = "",
  animation = "slide-up",
  delay = 0,
  duration = 0.5,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slide-up" ? 50 : 0,
      x: animation === "slide-left" ? 50 : animation === "slide-right" ? -50 : 0,
      scale: animation === "scale" ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
