"use client";

import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportPdfButton() {
  return (
    <Button
      className="fixed bottom-4 left-4 z-50 gap-2 rounded-full shadow-2xl print:hidden"
      variant="outline"
      aria-label="Export resume as PDF"
      asChild={true}
    >
      <a href="/resume.pdf" download="CHZarles-resume.pdf">
        <DownloadIcon className="size-4" aria-hidden="true" />
        Export PDF
      </a>
    </Button>
  );
}
