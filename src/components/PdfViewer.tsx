"use client";

import { Document } from "react-pdf";
import { useReader } from "@/context/ReaderContext";
import { getModeConfig } from "@/lib/viewingModes";
import { useIsMobile } from "@/hooks/useIsMobile";
import SinglePageScroll from "./SinglePageScroll";
import TwoPageSpread from "./TwoPageSpread";

export default function PdfViewer() {
  const { fileUrl, layout, viewingMode, setNumPages } = useReader();
  const mode = getModeConfig(viewingMode);
  const isMobile = useIsMobile();

  if (!fileUrl) return null;

  // Force single-scroll on mobile — two-page is unreadable on small screens
  const effectiveLayout = isMobile ? "single-scroll" : layout;

  return (
    <div
      className="flex-1 flex flex-col min-h-0 transition-colors duration-300"
      style={{ backgroundColor: mode.backgroundColor }}
    >
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-[#999]">loading...</p>
          </div>
        }
        error={
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-[#999]">failed to load pdf</p>
          </div>
        }
        className="flex-1 flex flex-col min-h-0"
      >
        {effectiveLayout === "single-scroll" ? (
          <SinglePageScroll />
        ) : (
          <TwoPageSpread />
        )}
      </Document>
    </div>
  );
}
