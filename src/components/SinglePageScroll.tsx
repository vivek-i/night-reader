"use client";

import { useRef, useState, useEffect } from "react";
import { useReader } from "@/context/ReaderContext";
import PageRenderer from "./PageRenderer";

export default function SinglePageScroll() {
  const { numPages } = useReader();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Tighter padding on narrow screens
        const padding = entry.contentRect.width < 640 ? 16 : 64;
        const w = entry.contentRect.width - padding;
        setPageWidth(Math.min(w, 900));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto flex flex-col items-center py-4 px-2 sm:py-8 sm:px-8"
    >
      {Array.from({ length: numPages }, (_, i) => (
        <div key={i + 1} className="mb-2 sm:mb-4">
          <PageRenderer pageNumber={i + 1} width={pageWidth} />
        </div>
      ))}
    </div>
  );
}
