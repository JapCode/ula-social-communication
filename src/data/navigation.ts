// ============================================================
// Navigation data & types for the ULA Social Communication site
// ============================================================

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface DropdownSection {
  heading?: string;
  items: DropdownItem[];
}

export interface DropdownGroup {
  label: string;
  sections: DropdownSection[];
}

// ── Dropdown 1: La Carrera (Institucional + Académico) ──────
const programaData: DropdownSection[] = [
  {
    heading: "Institucional",
    items: [
      {
        label: "Misión y Visión",
        href: "/program/mission",
        description: "Propósito del programa",
        icon: "eye",
      },
      {
        label: "Historia",
        href: "/program/history",
        description: "Orígenes del programa",
        icon: "book-open-text",
      },
      {
        label: "Autoridades",
        href: "/program/authorities",
        description: "Directores y coordinadores",
        icon: "gear",
      },
      {
        label: "Docentes",
        href: "/program/faculty",
        description: "Directorio de profesores",
        icon: "users",
      },
    ],
  },
  {
    heading: "Académico",
    items: [
      {
        label: "Perfil del Egresado",
        href: "/program/graduate-profile",
        description: "Competencias de graduados",
        icon: "graduation-cap",
      },
      {
        label: "Currículo",
        href: "/academics/curriculum",
        description: "Malla curricular",
        icon: "tree-structure",
      },
      {
        label: "Contenido de Cursos",
        href: "/academics/course-content",
        description: "Programa anual de cada materia",
        icon: "book-open",
      },
      {
        label: "Líneas de Investigación",
        href: "/academics/research",
        description: "Temas de tesis",
        icon: "flask",
      },
      {
        label: "Pasantías",
        href: "/academics/internships",
        description: "Requisitos",
        icon: "briefcase",
      },
    ],
  },
];

// ── Dropdown 2: Vida Estudiantil ────────────────────────────
const vidaEstudiantilData: DropdownSection[] = [
  {
    heading: "Vida Estudiantil",
    items: [
      {
        label: "Asociación",
        href: "/student-life/association",
        description: "Contacto y noticias",
        icon: "users",
      },
      {
        label: "Grupos y Talleres",
        href: "/student-life/groups",
        description: "Cine, teatro, radio",
        icon: "masks",
      },
      {
        label: "Servicio Comunitario",
        href: "/student-life/community",
        description: "Proyectos activos",
        icon: "heart",
      },
      {
        label: "Eventos",
        href: "/student-life/events",
        description: "Foros, charlas",
        icon: "calendar",
      },
    ],
  },
  {
    heading: "Producción",
    items: [
      {
        label: "NURR en Medios",
        href: "/portfolio/articles",
        description: "Artículos",
        icon: "newspaper",
      },
      {
        label: "Lab Radio/TV",
        href: "/portfolio/media-lab",
        description: "Producción audiovisual",
        icon: "video",
      },
      {
        label: "Revista Digital",
        href: "/portfolio/magazine",
        description: "Publicaciones",
        icon: "notebook",
      },
    ],
  },
];

// ── Dropdown 3: Admisión (Admisión + Egresados) ────────────
const admisionData: DropdownSection[] = [
  {
    heading: "Admisión",
    items: [
      {
        label: "Proceso de Admisión",
        href: "/admission/process",
        description: "Inscripción, pruebas internas",
        icon: "user-plus",
      },
      {
        label: "Requisitos",
        href: "/admission/requirements",
        description: "Documentación",
        icon: "file-text",
      },
    ],
  },
  {
    heading: "Egresados",
    items: [
      {
        label: "Testimonios",
        href: "/alumni/testimonials",
        description: "Historias de éxito",
        icon: "medal",
      },
      {
        label: "Educación Continua",
        href: "/alumni/continuing-education",
        description: "Postgrados",
        icon: "trend-up",
      },
    ],
  },
];

// Consolidated export for easy iteration
export const dropdownGroups: DropdownGroup[] = [
  { label: "La Carrera", sections: programaData },
  { label: "Vida Estudiantil", sections: vidaEstudiantilData },
  { label: "Admisión", sections: admisionData },
];

// Icon name → Phosphor component mapping for runtime lookup
// Map from kebab-case names used in data to PascalCase imports
export const NAV_ICONS = {
  eye: "PhEye",
  "graduation-cap": "PhGraduationCap",
  "book-open-text": "PhBookOpenText",
  gear: "PhGear",
  users: "PhUsers",
  "tree-structure": "PhTreeStructure",
  "book-open": "PhBookOpen",
  flask: "PhFlask",
  briefcase: "PhBriefcase",
  masks: "PhHeart", // intentionally mapped — no dedicated masks icon
  heart: "PhHeart",
  calendar: "PhCalendar",
  newspaper: "PhNewspaper",
  notebook: "PhNotebook",
  video: "PhVideo",
  "file-text": "PhFileText",
  medal: "PhMedal",
  "trend-up": "PhTrendUp",
  "user-plus": "PhUserPlus",
} as const;

export type NavIconName = keyof typeof NAV_ICONS;
