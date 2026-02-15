import { ViewingModeConfig } from "@/types";

export const VIEWING_MODES: ViewingModeConfig[] = [
  {
    key: "normal",
    label: "normal",
    filter: "none",
    backgroundColor: "#f5f5f5",
    toolbarClass: "bg-black/5 text-[#333]",
  },
  {
    key: "dark",
    label: "dark",
    filter: "invert(1) hue-rotate(180deg)",
    backgroundColor: "#1a1a1a",
    toolbarClass: "bg-white/10 text-white/80",
  },
  {
    key: "dusk",
    label: "dusk",
    filter: "sepia(0.4) brightness(0.95) contrast(1.05)",
    backgroundColor: "#f5f0e8",
    toolbarClass: "bg-black/5 text-[#333]",
  },
  {
    key: "low-blue-light",
    label: "low blue light",
    filter: "sepia(0.25) saturate(1.1) brightness(0.9)",
    backgroundColor: "#2a2520",
    toolbarClass: "bg-white/10 text-white/80",
  },
];

export function getModeConfig(key: string): ViewingModeConfig {
  return VIEWING_MODES.find((m) => m.key === key) ?? VIEWING_MODES[0];
}

export function isDarkMode(key: string): boolean {
  return key === "dark" || key === "low-blue-light";
}
