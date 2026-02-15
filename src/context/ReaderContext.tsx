"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { ViewingMode, LayoutMode } from "@/types";

interface ReaderState {
  file: File | null;
  fileUrl: string | null;
  numPages: number;
  currentPage: number;
  viewingMode: ViewingMode;
  layout: LayoutMode;
  setFile: (file: File) => void;
  setNumPages: (n: number) => void;
  setCurrentPage: (n: number) => void;
  setViewingMode: (mode: ViewingMode) => void;
  setLayout: (layout: LayoutMode) => void;
  goForward: () => void;
  goBackward: () => void;
}

const ReaderContext = createContext<ReaderState | null>(null);

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [file, setFileState] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingMode, setViewingMode] = useState<ViewingMode>("normal");
  const [layout, setLayout] = useState<LayoutMode>("single-scroll");

  const setFile = useCallback((f: File) => {
    setFileState(f);
    setCurrentPage(1);
    setNumPages(0);
  }, []);

  useEffect(() => {
    if (!file) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const goForward = useCallback(() => {
    setCurrentPage((prev) => {
      const step = layout === "two-page" ? 2 : 1;
      return Math.min(prev + step, numPages);
    });
  }, [layout, numPages]);

  const goBackward = useCallback(() => {
    setCurrentPage((prev) => {
      const step = layout === "two-page" ? 2 : 1;
      return Math.max(prev - step, 1);
    });
  }, [layout]);

  return (
    <ReaderContext.Provider
      value={{
        file,
        fileUrl,
        numPages,
        currentPage,
        viewingMode,
        layout,
        setFile,
        setNumPages,
        setCurrentPage,
        setViewingMode,
        setLayout,
        goForward,
        goBackward,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export function useReader(): ReaderState {
  const ctx = useContext(ReaderContext);
  if (!ctx) throw new Error("useReader must be used within ReaderProvider");
  return ctx;
}
