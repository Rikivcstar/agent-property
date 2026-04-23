import { useRef, useCallback } from "react";

export const useTilt = (options = {}) => {
  const { maxTilt = 15, scale = 1.05, speed = 400 } = options;
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.transition = `transform ${speed / 4}ms ease-out`;
    },
    [maxTilt, scale, speed]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.transition = `transform ${speed}ms ease-out`;
  }, [speed]);

  return { ref, handleMouseMove, handleMouseLeave };
};
