import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { gamificationData } from '@/data/clearhire-data';
import { Check, Star } from 'lucide-react';
import { toast } from 'sonner';
export function GamificationPanel() {
  const { profileCompletion, badges } = gamificationData;
  const controls = useAnimation();
  const [fastPassActive, setFastPassActive] = React.useState(false);
  React.useEffect(() => {
    controls.start({
      strokeDashoffset: 283 * (1 - profileCompletion / 100),
      transition: { duration: 1.5, ease: 'easeInOut' },
    });
  }, [profileCompletion, controls]);
  const handleFastPass = () => {
    setFastPassActive(true);
    toast.success('FastPass Activado (Simulación)', {
      description: 'Ahora puedes ver tu ranking entre los candidatos.',
    });
  };
  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-none">
        <CardHeader>
          <CardTitle>Progreso del Perfil</CardTitle>
          <CardDescription>Completa tu perfil para destacar.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative h-40 w-40">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="hsl(var(--muted))" strokeWidth="10" fill="transparent" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={283}
                strokeDashoffset={283}
                animate={controls}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground">
              {profileCompletion}%
            </div>
          </div>
          <Button variant="outline">Completar Perfil</Button>
        </CardContent>
      </Card>
      <Card className="shadow-soft border-none">
        <CardHeader>
          <CardTitle>Insignias Obtenidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {badges.map(badge => (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-accent transition-colors">
                      <badge.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-soft border-none bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <CardTitle className="text-primary">ClearHire FastPass</CardTitle>
          </div>
          <CardDescription className="text-foreground/80">
            Obtén una ventaja competitiva y mira dónde te posicionas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fastPassActive ? (
            <div className="text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <p className="font-semibold text-green-800 dark:text-green-200">¡FastPass Activo!</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">Ranking: #3 de 50</p>
            </div>
          ) : (
            <>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Ver tu ranking exacto</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Notificaciones prioritarias</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleFastPass}>
                Activar por $5/mes (Simulación)
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}