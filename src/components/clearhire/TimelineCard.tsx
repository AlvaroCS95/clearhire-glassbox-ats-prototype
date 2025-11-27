import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';
import type { TimelineStage } from '@/data/clearhire-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { stageIcons } from '@/data/clearhire-data';
import { cn } from '@/lib/utils';
interface TimelineCardProps {
  stage: TimelineStage;
  isLast: boolean;
}
export function TimelineCard({ stage, isLast }: TimelineCardProps) {
  const Icon = stageIcons[stage.title] || 'div';
  const isCompleted = stage.status === 'Completado';
  const isInProcess = stage.status === 'En Proceso';
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div className="relative flex items-start" variants={cardVariants}>
      <div className="absolute -left-[23px] top-1.5 z-10">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isCompleted ? "bg-blue-500 text-white" : "bg-card border-2",
          isInProcess && "ring-4 ring-blue-500/30"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="ml-4 w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-foreground">{stage.title}</h4>
          <StatusBadge status={stage.status} date={stage.completedDate} />
        </div>
        <div className="mt-2 text-sm text-muted-foreground space-y-1">
          {stage.subStages.map((sub, i) => (
            <p key={i}>{sub}</p>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <p>Tiempo estimado: <span className="font-medium text-foreground">{stage.estimatedTime}</span></p>
          {stage.assignedRecruiter && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={stage.assignedRecruiter.avatarUrl} alt={stage.assignedRecruiter.name} />
                      <AvatarFallback>{stage.assignedRecruiter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{stage.assignedRecruiter.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Asignado a: {stage.assignedRecruiter.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </motion.div>
  );
}