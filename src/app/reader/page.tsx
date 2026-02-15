"use client";

import dynamic from "next/dynamic";
import { useReader } from "@/context/ReaderContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Toolbar from "@/components/Toolbar";

const PdfViewerClient = dynamic(
  () => import("@/components/PdfViewerClient"),
  { ssr: false }
);

export default function ReaderPage() {
  const { file } = useReader();
  const router = useRouter();

  useEffect(() => {
    if (!file) router.replace("/");
  }, [file, router]);

  if (!file) return null;

  return (
    <div className="h-screen flex flex-col">
      <PdfViewerClient />
      <Toolbar />
    </div>
  );
}
