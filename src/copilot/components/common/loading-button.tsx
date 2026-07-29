// Copilot Test
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className={cn('relative inline-block', className)}>
      <Button asChild size="sm" variant="ghost">
        <button
          aria-expanded={open}
          aria-label="Status"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2"
        >
          <div className="relative w-6 h-6">
            <Image src="/zpd_logo.svg" alt="zpd" width={24} height={24} className={loading ? 'opacity-70' : ''} />
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              </span>
            )}
          </div>
        </button>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 z-50">
          <div className="rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-3 dark:bg-muted">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Status</span>
              <span className="text-sm text-muted-foreground">
                {loading ? 'Carregando...' : 'Pronto'}
              </span>
            </div>

            <ul className="space-y-1 max-h-48 overflow-auto">
              {messages.length > 0 ? (
                messages.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground truncate">
                    {m}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">Nenhuma mensagem</li>
              )}
            </ul>

            <div className="mt-3 flex justify-end gap-3">
              {issuesUrl && (
                <a
                  href={issuesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary underline"
                >
                  Issues
                </a>
              )}
              <button
                className="text-sm text-muted-foreground"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
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
