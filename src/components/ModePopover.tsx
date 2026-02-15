"use client";

import { useEffect, useRef } from "react";
import { Sun, Moon, Sunset, Eye } from "lucide-react";
import { useReader } from "@/context/ReaderContext";
import { VIEWING_MODES, isDarkMode } from "@/lib/viewingModes";
import { ViewingMode } from "@/types";

const MODE_ICONS: Record<ViewingMode, typeof Sun> = {
  normal: Sun,
  dark: Moon,
  dusk: Sunset,
  "low-blue-light": Eye,
};

interface ModePopoverProps {
  onClose: () => void;
  isMobile?: boolean;
}

export default function ModePopover({
  onClose,
  isMobile = false,
}: ModePopoverProps) {
  const { viewingMode, setViewingMode } = useReader();
  const ref = useRef<HTMLDivElement>(null);
  const dark = isDarkMode(viewingMode);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Small delay so the opening tap doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl backdrop-blur-xl pb-[env(safe-area-inset-bottom)] px-2 pt-3 pb-4 ${
          dark
            ? "bg-[#1a1a1a]/95 text-white/80"
            : "bg-white/95 text-[#333]"
        }`}
      >
        <div
          className={`w-8 h-0.5 rounded-full mx-auto mb-4 ${
            dark ? "bg-white/20" : "bg-black/15"
          }`}
        />
        {VIEWING_MODES.map((mode) => {
          const Icon = MODE_ICONS[mode.key];
          const isActive = viewingMode === mode.key;

          return (
            <button
              key={mode.key}
              onClick={() => {
                setViewingMode(mode.key);
                onClose();
              }}
              className={`flex items-center gap-4 w-full px-5 py-4 text-sm tracking-wide rounded-xl transition-all cursor-pointer ${
                isActive
                  ? dark
                    ? "bg-white/10 opacity-100"
                    : "bg-black/5 opacity-100"
                  : "opacity-50 active:opacity-80"
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              {mode.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-xl backdrop-blur-xl p-1.5 min-w-[160px] ${
        dark
          ? "bg-white/12 text-white/80 shadow-lg shadow-black/20"
          : "bg-white/85 text-[#333] shadow-lg shadow-black/8"
      }`}
    >
      {VIEWING_MODES.map((mode) => {
        const Icon = MODE_ICONS[mode.key];
        const isActive = viewingMode === mode.key;

        return (
          <button
            key={mode.key}
            onClick={() => {
              setViewingMode(mode.key);
              onClose();
            }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 text-[11px] tracking-wide rounded-lg transition-all cursor-pointer ${
              isActive
                ? dark
                  ? "bg-white/10 opacity-100"
                  : "bg-black/5 opacity-100"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Icon size={13} strokeWidth={1.5} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
