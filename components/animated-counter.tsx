"use client";
import { formatCurrency } from "@/lib/utils";
import { KeyframeOptions, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

type Props = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
};

const AnimatedCounter = ({ from = 0, to, animationOptions }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = formatCurrency(value);
      },
    });
  }, [ref, from, to, animationOptions]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
