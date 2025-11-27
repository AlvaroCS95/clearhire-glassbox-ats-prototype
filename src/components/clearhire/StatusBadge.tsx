import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { statusIcons } from '@/data/clearhire-data';
interface StatusBadgeProps {
  status: 'Completado' | 'En Proceso' | 'Rechazado';
  date?: string;
}
export function StatusBadge({ status, date }: StatusBadgeProps) {
  const statusConfig = {
    Completado: {
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300/50',
      label: 'Completado',
    },
    'En Proceso': {
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300/50 animate-pulse',
      label: 'En Proceso',
    },
    Rechazado: {
      className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300/50',
      label: 'Rechazado',
    },
  };
  const config = statusConfig[status];
  const Icon = statusIcons[status];
  const badgeContent = (
    <Badge variant="outline" className={cn('font-semibold transition-colors', config.className)}>
      <Icon className="mr-1.5 h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
  if (date) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{badgeContent}</TooltipTrigger>
          <TooltipContent>
            <p>Completado el {date}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return badgeContent;
}