"use client";

import { useEffect } from "react";
import { useReader } from "@/context/ReaderContext";

export function useKeyboardNav() {
  const { goForward, goBackward } = useReader();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goForward();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goBackward();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goForward, goBackward]);
}
