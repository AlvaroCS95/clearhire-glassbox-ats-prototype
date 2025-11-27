import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ApplicationTracker } from '@/components/clearhire/ApplicationTracker';
import { GamificationPanel } from '@/components/clearhire/GamificationPanel';
import { PrivacyControls } from '@/components/clearhire/PrivacyControls';
import { SchedulerInterface } from '@/components/clearhire/SchedulerInterface';
import { mockApplication, ApplicationData } from '@/data/clearhire-data';
import { FileQuestion, Building } from 'lucide-react';
const EmptyState = () => (
  <div className="text-center p-12 bg-card rounded-xl shadow-soft border border-dashed">
    <div className="flex justify-center mb-4">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
    </div>
    <h2 className="text-2xl font-bold">Postulación Retirada</h2>
    <p className="text-muted-foreground mt-2">
      Tus datos han sido eliminados. ¡Te deseamos mucho éxito en tu búsqueda!
    </p>
  </div>
);
export function HomePage() {
  const [application, setApplication] = useState<ApplicationData | null>(mockApplication);
  const handleWithdraw = () => {
    setApplication(null);
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 font-sans text-foreground">
      <ThemeToggle className="fixed top-4 right-4" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
              <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              Bienvenido a ClearHire
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              El "FedEx" del reclutamiento. Transparencia radical para tu postulación.
            </p>
          </motion.div>
          {application ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Content: Tracker */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ApplicationTracker application={application} />
              </motion.div>
              {/* Sidebar */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GamificationPanel />
                <SchedulerInterface />
                <PrivacyControls onWithdrawApplication={handleWithdraw} />
              </motion.div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <EmptyState />
            </motion.div>
          )}
          <footer className="text-center mt-16 text-sm text-muted-foreground">
            <p>Built with ���️ at Cloudflare</p>
          </footer>
        </div>
      </main>
      <Toaster richColors closeButton />
    </div>
  );
}