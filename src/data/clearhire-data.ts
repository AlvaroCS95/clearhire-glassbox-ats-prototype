import {
  User,
  CheckCircle2,
  Loader,
  XCircle,
  Award,
  ShieldCheck,
  Rocket,
  Briefcase,
  Code,
  Users,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
export interface RecruiterProfile {
  name: string;
  avatarUrl: string;
}
export interface TimelineStage {
  id: string;
  title: string;
  subStages: string[];
  status: "Completado" | "En Proceso" | "Rechazado";
  assignedRecruiter?: RecruiterProfile;
  estimatedTime: string;
  completedDate?: string;
}
export interface RejectionFeedback {
  reason: string;
  aiExplanation: string;
  actionableGrowth: {
    title: string;
    description: string;
    link: string;
  }[];
}
export interface ApplicationData {
  id: string;
  jobTitle: string;
  company: {
    name: string;
    logoUrl: string;
  };
  timeline: TimelineStage[];
  feedback?: RejectionFeedback;
  overallStatus: "En Proceso" | "Rechazado";
  averageResponseTime: string;
}
export const mockRecruiters: { [key: string]: RecruiterProfile } = {
  juanPerez: {
    name: "Juan Pérez",
    avatarUrl: "https://i.pravatar.cc/150?u=juanperez",
  },
  mariaGarcia: {
    name: "Maria García",
    avatarUrl: "https://i.pravatar.cc/150?u=mariagarcia",
  },
  carlosRodriguez: {
    name: "Carlos Rodríguez",
    avatarUrl: "https://i.pravatar.cc/150?u=carlosrodriguez",
  },
};
export const mockApplication: ApplicationData = {
  id: "app-12345",
  jobTitle: "Ingeniero de Software Senior (React)",
  company: {
    name: "Fintech Andina S.A.",
    logoUrl: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600", // Placeholder logo
  },
  overallStatus: "En Proceso",
  averageResponseTime: "12 días",
  timeline: [
    {
      id: "stage-1",
      title: "Postulación Recibida",
      subStages: ["CV recibido", "Datos verificados"],
      status: "Completado",
      estimatedTime: "1 día",
      completedDate: "2024-07-15",
    },
    {
      id: "stage-2",
      title: "Revisión de Perfil",
      subStages: ["Análisis de CV", "Compatibilidad con el rol"],
      status: "Completado",
      assignedRecruiter: mockRecruiters.juanPerez,
      estimatedTime: "3 días",
      completedDate: "2024-07-18",
    },
    {
      id: "stage-3",
      title: "Prueba Técnica",
      subStages: ["Prueba de código enviada", "Esperando resultados"],
      status: "En Proceso",
      assignedRecruiter: mockRecruiters.mariaGarcia,
      estimatedTime: "5 días",
    },
    {
      id: "stage-4",
      title: "Entrevista Cultural",
      subStages: ["Agendamiento", "Entrevista con equipo"],
      status: "Rechazado",
      assignedRecruiter: mockRecruiters.carlosRodriguez,
      estimatedTime: "3 días",
    },
    {
      id: "stage-5",
      title: "Oferta",
      subStages: ["Preparación de oferta", "Envío y negociación"],
      status: "Rechazado",
      estimatedTime: "2 días",
    },
  ],
  feedback: {
    reason: "Brecha de Habilidades Técnicas",
    aiExplanation:
      "Hemos notado una oportunidad de mejora en el manejo de infraestructura como código. Aunque tu perfil en desarrollo es muy sólido, para este rol senior es crucial tener autonomía en el despliegue y mantenimiento de servicios en la nube. ¡Estás muy cerca y con un poco de foco en esta área serás un candidato imparable!",
    actionableGrowth: [
      {
        title: "Aprender Docker a fondo",
        description:
          "Contenerizar aplicaciones es un est��ndar en la industria. Dominar Docker te dará una ventaja competitiva.",
        link: "#",
      },
      {
        title: "Explorar conceptos de CI/CD",
        description:
          "Entender cómo funciona la integración y el despliegue continuo es vital para equipos ágiles.",
        link: "#",
      },
      {
        title: "Curso de Terraform Básico",
        description:
          "Aprender a definir infraestructura como código te permitirá desplegar ambientes de forma predecible y escalable.",
        link: "#",
      },
    ],
  },
};
export const gamificationData = {
  profileCompletion: 75,
  badges: [
    { id: "b1", name: "Early Bird", icon: Rocket, description: "Postulaste en las primeras 24h" },
    { id: "b2", name: "Skill Master", icon: Code, description: "Completaste 5+ habilidades" },
    { id: "b3", name: "Perfil Completo", icon: ShieldCheck, description: "Tu perfil está al 100%" },
    { id: "b4", name: "Verificado", icon: Award, description: "Identidad verificada" },
  ],
};
export const schedulerData = {
    availableSlots: [
        "Lunes 22, 10:00 AM",
        "Lunes 22, 02:00 PM",
        "Martes 23, 09:00 AM",
        "Martes 23, 11:00 AM",
        "Miércoles 24, 03:00 PM",
        "Jueves 25, 10:30 AM",
    ]
}
export const stageIcons: { [key: string]: React.ElementType } = {
  "Postulación Recibida": ClipboardList,
  "Revisión de Perfil": User,
  "Prueba Técnica": Code,
  "Entrevista Cultural": Users,
  "Oferta": Briefcase,
};
export const statusIcons = {
  Completado: CheckCircle2,
  "En Proceso": Loader,
  Rechazado: XCircle,
};