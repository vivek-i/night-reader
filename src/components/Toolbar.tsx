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
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSwipe } from "@/hooks/useSwipe";
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
  const isMobile = useIsMobile();
  const visible = useAutoHide(3000, isMobile);
  const [showModes, setShowModes] = useState(false);
  const mode = getModeConfig(viewingMode);
  const dark = isDarkMode(viewingMode);

  useKeyboardNav();
  useSwipe({
    onSwipeLeft: goForward,
    onSwipeRight: goBackward,
  });

  const ModeIcon = MODE_ICONS[viewingMode];

  const pageDisplay =
    layout === "two-page" && currentPage + 1 <= numPages
      ? `${currentPage}-${currentPage + 1} / ${numPages}`
      : `${currentPage} / ${numPages}`;

  const iconSize = isMobile ? 18 : 15;
  const btnClass = isMobile
    ? "flex items-center justify-center w-11 h-11 rounded-full opacity-60 active:opacity-100 transition-all cursor-pointer"
    : "flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer";
  const disabledBtnClass = isMobile
    ? "flex items-center justify-center w-11 h-11 rounded-full opacity-60 active:opacity-100 transition-all disabled:opacity-15 cursor-pointer disabled:cursor-default"
    : "flex items-center justify-center w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all disabled:opacity-15 cursor-pointer disabled:cursor-default";

  return (
    <>
      <div
        className={`fixed z-50 transition-opacity duration-200 ${
          isMobile
            ? "bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)]"
            : "bottom-4 left-1/2 -translate-x-1/2"
        }`}
        style={{ opacity: visible || showModes ? 1 : 0 }}
      >
        <div
          className={`flex items-center justify-center backdrop-blur-xl ${
            isMobile
              ? `gap-2 px-4 py-3 ${mode.toolbarClass}`
              : `gap-1 rounded-full px-2 py-2 ${mode.toolbarClass}`
          }`}
        >
          {/* Mode selector */}
          <div className="relative">
            <button
              onClick={() => setShowModes(!showModes)}
              className={btnClass}
            >
              <ModeIcon size={iconSize} strokeWidth={1.5} />
            </button>
            {showModes && (
              <ModePopover
                onClose={() => setShowModes(false)}
                isMobile={isMobile}
              />
            )}
          </div>

          {!isMobile && (
            <div
              className={`w-px h-3.5 mx-1 ${
                dark ? "bg-white/15" : "bg-black/8"
              }`}
            />
          )}

          {/* Layout toggle — desktop only */}
          {!isMobile && (
            <>
              <button
                onClick={() =>
                  setLayout(
                    layout === "single-scroll" ? "two-page" : "single-scroll"
                  )
                }
                className={btnClass}
              >
                {layout === "two-page" ? (
                  <BookOpen size={iconSize} strokeWidth={1.5} />
                ) : (
                  <AlignJustify size={iconSize} strokeWidth={1.5} />
                )}
              </button>

              <div
                className={`w-px h-3.5 mx-1 ${
                  dark ? "bg-white/15" : "bg-black/8"
                }`}
              />
            </>
          )}

          {/* Page indicator */}
          <span
            className={`tabular-nums opacity-50 select-none tracking-wide ${
              isMobile ? "text-xs px-3" : "text-[11px] px-2"
            }`}
          >
            {pageDisplay}
          </span>

          {/* Navigation — desktop only */}
          {!isMobile && (
            <>
              <div
                className={`w-px h-3.5 mx-1 ${
                  dark ? "bg-white/15" : "bg-black/8"
                }`}
              />
              <button
                onClick={goBackward}
                disabled={currentPage <= 1}
                className={disabledBtnClass}
              >
                <ChevronLeft size={iconSize} strokeWidth={1.5} />
              </button>
              <button
                onClick={goForward}
                disabled={currentPage >= numPages}
                className={disabledBtnClass}
              >
                <ChevronRight size={iconSize} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop to close popover on mobile */}
      {showModes && isMobile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowModes(false)}
        />
      )}
    </>
  );
}
