"use client";

import { Page } from "react-pdf";
import { useReader } from "@/context/ReaderContext";
import { getModeConfig } from "@/lib/viewingModes";

interface PageRendererProps {
  pageNumber: number;
  width?: number;
  height?: number;
}

export default function PageRenderer({ pageNumber, width, height }: PageRendererProps) {
  const { viewingMode } = useReader();
  const mode = getModeConfig(viewingMode);

  return (
    <div
      style={{ filter: mode.filter }}
      className="transition-[filter] duration-300 ease-in-out"
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        height={height}
        renderTextLayer={true}
        renderAnnotationLayer={true}
      />
    </div>
  );
}
