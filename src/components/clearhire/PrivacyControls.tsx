import React from 'react';
import { ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
interface PrivacyControlsProps {
  onWithdrawApplication: () => void;
}
export function PrivacyControls({ onWithdrawApplication }: PrivacyControlsProps) {
  const handleConfirmWithdraw = () => {
    onWithdrawApplication();
    toast.success('Postulación retirada y datos eliminados (Simulación)', {
      description: 'Tu solicitud ha sido procesada. Gracias por tu interés.',
    });
  };
  return (
    <Card className="shadow-soft border-red-500/20 bg-red-50/30 dark:bg-red-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <ShieldAlert className="h-5 w-5" />
          Zona de Privacidad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Tienes control total sobre tus datos. Al retirar tu postulación, simularemos la eliminación de tu información de nuestros sistemas de acuerdo con las leyes de protección de datos (LGPD/LFPDPPP).
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Retirar postulación y olvidar mis datos
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es irreversible. Tu postulación a Fintech Andina S.A. será retirada permanentemente y tus datos personales serán eliminados de nuestros registros (simulación). No podrás deshacer esta acción.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmWithdraw} className="bg-destructive hover:bg-destructive/90">
                Sí, retirar y olvidar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}