export type ViewingMode = "normal" | "dark" | "dusk" | "low-blue-light";

export type LayoutMode = "single-scroll" | "two-page";

export interface ViewingModeConfig {
  key: ViewingMode;
  label: string;
  filter: string;
  backgroundColor: string;
  toolbarClass: string;
}
