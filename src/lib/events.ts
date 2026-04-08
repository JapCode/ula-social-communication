import {
  PhMegaphone,
  PhChalkboardTeacher,
  PhMicrophoneStage,
  PhCalendarStar,
  PhBookOpenText,
  PhPalette,
  PhCalendar,
  type Icon,
} from 'phosphor-icons-astro';

const typeLabels: Record<string, string> = {
  foro: "Foro",
  taller: "Taller",
  charla: "Charla",
  semana: "Semana",
  academico: "Académico",
  cultural: "Cultural",
};

// Luma-compliant: brand-primary tint for all types, varied by subtle background intensity
// instead of a rainbow palette that doesn't exist elsewhere on the site
const typeColors: Record<string, string> = {
  foro: "bg-primary/10 text-primary",
  taller: "bg-primary/10 text-primary",
  charla: "bg-primary/10 text-primary",
  semana: "bg-accent/10 text-accent",
  academico: "bg-slate-100 text-slate-600",
  cultural: "bg-primary/10 text-primary",
};

const typeIcons: Record<string, typeof PhMegaphone> = {
  foro: PhMegaphone,
  taller: PhChalkboardTeacher,
  charla: PhMicrophoneStage,
  semana: PhCalendarStar,
  academico: PhBookOpenText,
  cultural: PhPalette,
};

export function getTypeLabel(type: string): string {
  return typeLabels[type] || type;
}

export function getTypeColors(type: string): string {
  return typeColors[type] || typeColors.academico;
}

export function getTypeIcon(type: string): typeof Icon {
  return typeIcons[type] || PhCalendar;
}
