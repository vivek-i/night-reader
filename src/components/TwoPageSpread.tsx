"use client";

import { useRef, useState, useEffect } from "react";
import { useReader } from "@/context/ReaderContext";
import PageRenderer from "./PageRenderer";

export default function TwoPageSpread() {
  const { numPages, currentPage } = useReader();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setPageHeight(entry.contentRect.height - 48);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasRightPage = currentPage + 1 <= numPages;

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center gap-6 px-8"
    >
      <PageRenderer pageNumber={currentPage} height={pageHeight} />
      {hasRightPage && (
        <PageRenderer pageNumber={currentPage + 1} height={pageHeight} />
      )}
    </div>
  );
}
