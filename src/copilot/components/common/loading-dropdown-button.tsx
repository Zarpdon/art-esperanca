// Copilot Test
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Issue = {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
};

interface LoadingDropdownButtonProps {
  loading?: boolean;
  issues?: Issue[];
  className?: string;
}

export default function LoadingDropdownButton({
  loading = false,
  issues = [],
  className,
}: LoadingDropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const errorCount = issues.filter((i) => i.type === "error").length;
  const warnCount = issues.filter((i) => i.type === "warning").length;

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <Button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        size="sm"
        variant={loading ? "destructive" : "outline"}
        className="flex items-center gap-2"
      >
        <span className="font-bold">N</span>

        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeOpacity="0.25"
            />
            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}

        <span className="text-muted-foreground ml-1 text-xs">
          {errorCount + warnCount}
        </span>
      </Button>

      {open && (
        <div className="bg-popover absolute right-0 z-50 mt-2 w-80 rounded-md border p-2 shadow-lg">
          <div className="flex items-center justify-between px-2 pb-2">
            <div>
              <p className="text-sm font-medium">Dev overlay</p>
              <p className="text-muted-foreground text-xs">
                Status rápido e issues
              </p>
            </div>
            <div className="text-right text-xs">
              <div className="text-destructive">Erros: {errorCount}</div>
              <div className="text-amber-500">Avisos: {warnCount}</div>
            </div>
          </div>

          <div className="max-h-56 overflow-auto">
            {issues.length === 0 && (
              <div className="text-muted-foreground px-2 py-3 text-sm">
                Sem issues
              </div>
            )}

            {issues.map((it) => (
              <div
                key={it.id}
                className={cn(
                  "group/item hover:bg-muted flex items-start gap-2 rounded px-2 py-2",
                  it.type === "error"
                    ? "border-destructive/60 border-l-2"
                    : "border-l-2 border-amber-400/60",
                )}
              >
                <div className="text-xs font-semibold">
                  {it.type === "error"
                    ? "Erro"
                    : it.type === "warning"
                      ? "Aviso"
                      : "Info"}
                </div>
                <div className="text-muted-foreground text-sm">
                  {it.message}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-end gap-2 px-2">
            <button
              className="text-muted-foreground text-xs underline"
              onClick={() => alert("Abrir painel de desenvolvimento")}
            >
              Abrir painel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
