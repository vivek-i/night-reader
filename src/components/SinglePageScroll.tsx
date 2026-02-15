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
        const w = entry.contentRect.width - 64;
        setPageWidth(Math.min(w, 900));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto flex flex-col items-center py-8 px-8"
    >
      {Array.from({ length: numPages }, (_, i) => (
        <div key={i + 1} className="mb-4">
          <PageRenderer pageNumber={i + 1} width={pageWidth} />
        </div>
      ))}
    </div>
  );
}
