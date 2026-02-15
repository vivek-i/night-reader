"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useAutoHide(delay = 3000, disabled = false): boolean {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!disabled) {
      timerRef.current = setTimeout(() => setVisible(false), delay);
    }
  }, [delay, disabled]);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    resetTimer();

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity, true);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity, true);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [resetTimer, disabled]);

  return visible;
}
