"use client";

import { useState } from "react";
import {
  Sun,
  Moon,
  Sunset,
  Eye,
  BookOpen,
  AlignJustify,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useReader } from "@/context/ReaderContext";
import { getModeConfig, isDarkMode } from "@/lib/viewingModes";
import { useAutoHide } from "@/hooks/useAutoHide";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import ModePopover from "./ModePopover";

const MODE_ICONS = {
  normal: Sun,
  dark: Moon,
  dusk: Sunset,
  "low-blue-light": Eye,
} as const;

export default function Toolbar() {
  const {
    viewingMode,
    layout,
    currentPage,
    numPages,
    setLayout,
    goForward,
    goBackward,
  } = useReader();
  const visible = useAutoHide(3000);
  const [showModes, setShowModes] = useState(false);
  const mode = getModeConfig(viewingMode);
  const dark = isDarkMode(viewingMode);

  useKeyboardNav();

  const ModeIcon = MODE_ICONS[viewingMode];

  const pageDisplay =
    layout === "two-page" && currentPage + 1 <= numPages
      ? `${currentPage}-${currentPage + 1} / ${numPages}`
      : `${currentPage} / ${numPages}`;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-200"
      style={{ opacity: visible || showModes ? 1 : 0 }}
    >
      <div
        className={`flex items-center gap-1 rounded-full backdrop-blur-xl px-2 py-2 ${mode.toolbarClass}`}
      >
        {/* Mode selector */}
        <div className="relative">
          <button
            onClick={() => setShowModes(!showModes)}
            className="flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            <ModeIcon size={15} strokeWidth={1.5} />
          </button>
          {showModes && <ModePopover onClose={() => setShowModes(false)} />}
        </div>

        <div
          className={`w-px h-3.5 mx-1 ${dark ? "bg-white/15" : "bg-black/8"}`}
        />

        {/* Layout toggle */}
        <button
          onClick={() =>
            setLayout(layout === "single-scroll" ? "two-page" : "single-scroll")
          }
          className="flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
        >
          {layout === "two-page" ? (
            <BookOpen size={15} strokeWidth={1.5} />
          ) : (
            <AlignJustify size={15} strokeWidth={1.5} />
          )}
        </button>

        <div
          className={`w-px h-3.5 mx-1 ${dark ? "bg-white/15" : "bg-black/8"}`}
        />

        {/* Page indicator */}
        <span className="text-[11px] tabular-nums opacity-50 select-none px-2 tracking-wide">
          {pageDisplay}
        </span>

        <div
          className={`w-px h-3.5 mx-1 ${dark ? "bg-white/15" : "bg-black/8"}`}
        />

        {/* Navigation */}
        <button
          onClick={goBackward}
          disabled={currentPage <= 1}
          className="flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all disabled:opacity-15 cursor-pointer disabled:cursor-default"
        >
          <ChevronLeft size={15} strokeWidth={1.5} />
        </button>
        <button
          onClick={goForward}
          disabled={currentPage >= numPages}
          className="flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all disabled:opacity-15 cursor-pointer disabled:cursor-default"
        >
          <ChevronRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
