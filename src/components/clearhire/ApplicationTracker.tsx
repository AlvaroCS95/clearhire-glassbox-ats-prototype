import React from 'react';
import { motion } from 'framer-motion';
import { TimelineCard } from './TimelineCard';
import { FeedbackCard } from './FeedbackCard';
import type { ApplicationData } from '@/data/clearhire-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
interface ApplicationTrackerProps {
  application: ApplicationData;
}
export function ApplicationTracker({ application }: ApplicationTrackerProps) {
  const completedStages = application.timeline.filter(stage => stage.status === 'Completado').length;
  const totalStages = application.timeline.length;
  const progressPercentage = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <Card className="w-full overflow-hidden shadow-soft border-none bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Seguimiento de Postulación</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              {application.jobTitle} en {application.company.name}
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Tiempo promedio de respuesta: <span className="font-semibold text-foreground">{application.averageResponseTime}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="relative space-y-8 pl-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
          {application.timeline.map((stage, index) => (
            <TimelineCard key={stage.id} stage={stage} isLast={index === application.timeline.length - 1} />
          ))}
        </motion.div>
        {application.overallStatus === 'Rechazado' && application.feedback && (
          <>
            <Separator className="my-8" />
            <FeedbackCard feedback={application.feedback} />
          </>
        )}
      </CardContent>
    </Card>
  );
}