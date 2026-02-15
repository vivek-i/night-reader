"use client";

import { Document } from "react-pdf";
import { useReader } from "@/context/ReaderContext";
import { getModeConfig } from "@/lib/viewingModes";
import SinglePageScroll from "./SinglePageScroll";
import TwoPageSpread from "./TwoPageSpread";

export default function PdfViewer() {
  const { fileUrl, layout, viewingMode, setNumPages } = useReader();
  const mode = getModeConfig(viewingMode);

  if (!fileUrl) return null;

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
        {layout === "single-scroll" ? <SinglePageScroll /> : <TwoPageSpread />}
      </Document>
    </div>
  );
}
