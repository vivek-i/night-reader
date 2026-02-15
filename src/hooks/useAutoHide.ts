"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useAutoHide(delay = 3000): boolean {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), delay);
  }, [delay]);

  useEffect(() => {
    resetTimer();

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity, true);
    window.addEventListener("keydown", handleActivity);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity, true);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [resetTimer]);

  return visible;
}
