"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable (e.g. insecure context) — nothing to do
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar ${label}`}
      className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-2 opacity-0 transition-all duration-200 hover:bg-surface hover:text-power group-hover:opacity-100"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-volt" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
