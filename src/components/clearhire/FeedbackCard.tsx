import React from 'react';
import { Lightbulb, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { RejectionFeedback } from '@/data/clearhire-data';
interface FeedbackCardProps {
  feedback: RejectionFeedback;
}
export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('¡Copiado al portapapeles!');
  };
  return (
    <Card className="bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
            <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-200">Feedback Constructivo</CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-400/80">
              Motivo del rechazo: <span className="font-semibold">{feedback.reason}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Análisis de nuestro equipo:</h4>
          <p className="text-muted-foreground text-pretty">{feedback.aiExplanation}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Rutas de Crecimiento Sugeridas:</h4>
          <div className="space-y-3">
            {feedback.actionableGrowth.map((item, index) => (
              <div key={index} className="p-3 bg-background/50 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(item.title)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Ver cursos <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}