import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { schedulerData } from '@/data/clearhire-data';
import { toast } from 'sonner';
export function SchedulerInterface() {
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [whatsAppOptIn, setWhatsAppOptIn] = React.useState(false);
  const handleSchedule = () => {
    if (selectedSlot) {
      toast.success('¡Entrevista agendada! (Simulación)', {
        description: `Confirmado para el ${selectedSlot}. Recibirás un recordatorio.`,
      });
    } else {
      toast.error('Por favor, selecciona un horario.');
    }
  };
  return (
    <Card className="shadow-soft border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Agendar Entrevista
        </CardTitle>
        <CardDescription>
          Selecciona un horario disponible para tu próxima entrevista.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {schedulerData.availableSlots.map(slot => (
            <Button
              key={slot}
              variant={selectedSlot === slot ? 'default' : 'outline'}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <Label htmlFor="whatsapp-toggle" className="flex items-center gap-3 cursor-pointer">
            <MessageCircle className="h-6 w-6 text-green-500" />
            <span className="font-medium">Recibir actualizaciones por WhatsApp</span>
          </Label>
          <Switch
            id="whatsapp-toggle"
            checked={whatsAppOptIn}
            onCheckedChange={setWhatsAppOptIn}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleSchedule} disabled={!selectedSlot}>
          Confirmar Horario
        </Button>
      </CardContent>
    </Card>
  );
}