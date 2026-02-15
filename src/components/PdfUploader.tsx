"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useReader } from "@/context/ReaderContext";

export default function PdfUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFile } = useReader();
  const router = useRouter();

  const handleFile = useCallback(
    (f: File) => {
      if (f.type !== "application/pdf") return;
      setFile(f);
      router.push("/reader");
    },
    [setFile, router]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className={`absolute inset-12 rounded-sm border-2 border-dashed transition-opacity duration-200 pointer-events-none ${
          isDragging
            ? "border-[#ccc] opacity-100"
            : "border-transparent opacity-0"
        }`}
      />

      <h1 className="text-2xl font-light tracking-widest text-[#333]">
        night reader
      </h1>

      <p className="mt-2 text-sm text-[#999]">
        upload a pdf to start reading
      </p>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 cursor-pointer text-xs text-[#999] underline underline-offset-4 hover:text-[#666] transition-colors"
      >
        browse files
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
