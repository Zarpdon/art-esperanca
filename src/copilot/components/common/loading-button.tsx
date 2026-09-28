// Copilot Test
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  loading?: boolean;
  messages?: string[];
  issuesUrl?: string;
  className?: string;
}

export default function LoadingButton({
  loading = false,
  messages = [],
  issuesUrl,
  className,
}: LoadingButtonProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative inline-block", className)}>
      <Button asChild size="sm" variant="ghost">
        <button
          aria-expanded={open}
          aria-label="Status"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2"
        >
          <div className="relative h-6 w-6">
            <Image
              src="/zpd_logo.svg"
              alt="zpd"
              width={24}
              height={24}
              className={loading ? "opacity-70" : ""}
            />
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            )}
          </div>
        </button>
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72">
          <div className="dark:bg-muted rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Status</span>
              <span className="text-muted-foreground text-sm">
                {loading ? "Carregando..." : "Pronto"}
              </span>
            </div>

            <ul className="max-h-48 space-y-1 overflow-auto">
              {messages.length > 0 ? (
                messages.map((m, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground truncate text-sm"
                  >
                    {m}
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground text-sm">
                  Nenhuma mensagem
                </li>
              )}
            </ul>

            <div className="mt-3 flex justify-end gap-3">
              {issuesUrl && (
                <a
                  href={issuesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-sm underline"
                >
                  Issues
                </a>
              )}
              <button
                className="text-muted-foreground text-sm"
                onClick={() =>
                  navigator.clipboard?.writeText(window.location.href)
                }
              >
                Copiar URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
