import React, { useState, useMemo } from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
import {
  Student,
  Envelope,
  Phone,
  MapPin,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  Users,
  FilmStrip,
  MaskHappy,
  MicrophoneStage,
  Camera,
  PenNib,
  MusicNote,
  Palette,
  GameController,
  BookOpen,
  Headphones,
  Video,
  Lightbulb,
  Star,
  Rocket,
  Briefcase,
  Heart,
  GraduationCap,
  Buildings,
  HandsClapping,
  UsersThree,
  Globe,
  Leaf,
  ClipboardText,
  Files,
  PencilSimpleLine,
  Megaphone,
  Pencil,
  TrendUp,
  Chat,
  Presentation,
  Broadcast,
  DeviceMobile,
  MagnifyingGlass,
  Newspaper,
  // ── Additional icons ──
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Check,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Link,
  PlayCircle,
  PauseCircle,
  Smiley,
  Article,
  Bookmark,
  Certificate,
  FilePdf,
  FileDoc,
  Clock,
  CalendarBlank,
  CalendarCheck,
  Hourglass,
  User,
  UserCircle,
  UserCircleGear,
  UsersFour,
  MedalMilitary,
  Trophy,
  Crown,
  Chalkboard,
  ChalkboardTeacher,
  Notebook,
  Code,
  Terminal,
  Database,
  Devices,
  ChatCircle,
  ChatCentered,
  ChatText,
  EnvelopeOpen,
  PaperPlane,
  Gear,
  Key,
  Lock,
  LockOpen,
  Tag,
  Sparkle,
  PuzzlePiece,
  IdentificationCard,
  IdentificationBadge,
  ShoppingBag,
  GlobeStand,
  Airplane,
  BookBookmark,
  Books,
  // ── Navbar legacy icons ──
  Eye,
  BookOpenText,
  TreeStructure,
  Flask,
  Calendar,
  FileText,
  Medal,
  UserPlus,
} from '@phosphor-icons/react/dist/ssr';

/** Map of kebab-case name → React icon component */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  student: Student,
  envelope: Envelope,
  phone: Phone,
  'map-pin': MapPin,
  'instagram-logo': InstagramLogo,
  'twitter-logo': TwitterLogo,
  'youtube-logo': YoutubeLogo,
  users: Users,
  'film-strip': FilmStrip,
  'mask-happy': MaskHappy,
  'microphone-stage': MicrophoneStage,
  camera: Camera,
  'pen-nib': PenNib,
  'music-note': MusicNote,
  palette: Palette,
  'game-controller': GameController,
  'book-open': BookOpen,
  headphones: Headphones,
  video: Video,
  lightbulb: Lightbulb,
  star: Star,
  rocket: Rocket,
  briefcase: Briefcase,
  heart: Heart,
  'graduation-cap': GraduationCap,
  buildings: Buildings,
  'hands-clapping': HandsClapping,
  'users-three': UsersThree,
  globe: Globe,
  leaf: Leaf,
  'clipboard-text': ClipboardText,
  files: Files,
  'pencil-simple-line': PencilSimpleLine,
  megaphone: Megaphone,
  pencil: Pencil,
  'trend-up': TrendUp,
  chat: Chat,
  presentation: Presentation,
  broadcast: Broadcast,
  'device-mobile': DeviceMobile,
  'magnifying-glass': MagnifyingGlass,
  newspaper: Newspaper,
  // ── Additional icons ──
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  check: Check,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  download: Download,
  upload: Upload,
  link: Link,
  'play-circle': PlayCircle,
  'pause-circle': PauseCircle,
  smiley: Smiley,
  article: Article,
  bookmark: Bookmark,
  certificate: Certificate,
  'file-pdf': FilePdf,
  'file-doc': FileDoc,
  clock: Clock,
  'calendar-blank': CalendarBlank,
  'calendar-check': CalendarCheck,
  hourglass: Hourglass,
  user: User,
  'user-circle': UserCircle,
  'user-circle-gear': UserCircleGear,
  'users-four': UsersFour,
  award: MedalMilitary,
  trophy: Trophy,
  crown: Crown,
  chalkboard: Chalkboard,
  'chalkboard-teacher': ChalkboardTeacher,
  notebook: Notebook,
  code: Code,
  terminal: Terminal,
  database: Database,
  devices: Devices,
  'chat-circle': ChatCircle,
  'chat-centered': ChatCentered,
  comment: ChatText,
  'envelope-open': EnvelopeOpen,
  'paper-plane': PaperPlane,
  gear: Gear,
  key: Key,
  lock: Lock,
  'lock-open': LockOpen,
  tag: Tag,
  sparkle: Sparkle,
  'puzzle-piece': PuzzlePiece,
  'identification-card': IdentificationCard,
  'identification-badge': IdentificationBadge,
  'shopping-bag': ShoppingBag,
  'globe-stand': GlobeStand,
  airplane: Airplane,
  'book-bookmark': BookBookmark,
  books: Books,
  // ── Navbar legacy icons ──
  eye: Eye,
  'book-open-text': BookOpenText,
  'tree-structure': TreeStructure,
  flask: Flask,
  calendar: Calendar,
  'file-text': FileText,
  medal: Medal,
  'user-plus': UserPlus,
};

/** Human-readable label for each icon */
const ICON_LABELS: Record<string, string> = {
  student: 'Estudiante',
  envelope: 'Sobre',
  phone: 'Teléfono',
  'map-pin': 'Ubicación',
  'instagram-logo': 'Instagram',
  'twitter-logo': 'Twitter',
  'youtube-logo': 'YouTube',
  users: 'Usuarios',
  'film-strip': 'Película',
  'mask-happy': 'Máscara',
  'microphone-stage': 'Micrófono',
  camera: 'Cámara',
  'pen-nib': 'Pluma',
  'music-note': 'Música',
  palette: 'Paleta',
  'game-controller': 'Videojuegos',
  'book-open': 'Libro',
  headphones: 'Audífonos',
  video: 'Video',
  lightbulb: 'Foco',
  star: 'Estrella',
  rocket: 'Cohete',
  briefcase: 'Maletín',
  heart: 'Corazón',
  'graduation-cap': 'Graduación',
  buildings: 'Edificios',
  'hands-clapping': 'Aplausos',
  'users-three': 'Grupo',
  globe: 'Globo',
  leaf: 'Hoja',
  'clipboard-text': 'Clipboard',
  files: 'Archivos',
  'pencil-simple-line': 'Lápiz',
  megaphone: 'Megáfono',
  pencil: 'Lápiz 2',
  'trend-up': 'Tendencia',
  chat: 'Chat',
  presentation: 'Presentación',
  broadcast: 'Transmisión',
  'device-mobile': 'Móvil',
  'magnifying-glass': 'Lupa',
  newspaper: 'Periódico',
  // ── Additional labels ──
  'arrow-right': 'Flecha derecha',
  'arrow-left': 'Flecha izquierda',
  'arrow-up': 'Flecha arriba',
  'arrow-down': 'Flecha abajo',
  check: 'Check',
  'check-circle': 'Check círculo',
  'x-circle': 'X círculo',
  download: 'Descargar',
  upload: 'Subir',
  link: 'Enlace',
  'play-circle': 'Reproducir',
  'pause-circle': 'Pausa',
  smiley: 'Sonrisa',
  article: 'Artículo',
  bookmark: 'Marcador',
  certificate: 'Certificado',
  'file-pdf': 'Archivo PDF',
  'file-doc': 'Archivo DOC',
  clock: 'Reloj',
  'calendar-blank': 'Calendario',
  'calendar-check': 'Calendario check',
  hourglass: 'Reloj arena',
  user: 'Usuario',
  'user-circle': 'Usuario círculo',
  'user-circle-gear': 'Usuario config',
  'users-four': '4 Usuarios',
  award: 'Premio',
  trophy: 'Trofeo',
  crown: 'Corona',
  chalkboard: 'Pizarra',
  'chalkboard-teacher': 'Profesor pizarra',
  notebook: 'Cuaderno',
  code: 'Código',
  terminal: 'Terminal',
  database: 'Base datos',
  devices: 'Dispositivos',
  'chat-circle': 'Chat círculo',
  'chat-centered': 'Chat centrado',
  comment: 'Comentario',
  'envelope-open': 'Sobre abierto',
  'paper-plane': 'Avión papel',
  gear: 'Engranaje',
  key: 'Llave',
  lock: 'Candado',
  'lock-open': 'Candado abierto',
  tag: 'Etiqueta',
  sparkle: 'Brillo',
  'puzzle-piece': 'Pieza puzzle',
  'identification-card': 'Carnet',
  'identification-badge': 'Identificación',
  'shopping-bag': 'Bolsa',
  'globe-stand': 'Globo soporte',
  airplane: 'Avión',
  'book-bookmark': 'Libro marcador',
  books: 'Libros',
  // ── Navbar legacy icons ──
  eye: 'Ojo',
  'book-open-text': 'Libro abierto texto',
  'tree-structure': 'Estructura árbol',
  flask: 'Matraz',
  calendar: 'Calendario',
  'file-text': 'Archivo texto',
  medal: 'Medalla',
  'user-plus': 'Añadir usuario',
};

/** Sort icons alphabetically by label for easier browsing */
const SORTED_NAMES = Object.keys(ICONS).sort(
  (a, b) => (ICON_LABELS[a] || a).localeCompare(ICON_LABELS[b] || b)
);

export const IconPickerInput = wrapFieldsWithMeta(
  ({ input }: { input: { name: string; value: string; onChange: (v: string) => void } }) => {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');

    const filteredIcons = useMemo(() => {
      if (!filter) return SORTED_NAMES;
      const q = filter.toLowerCase();
      return SORTED_NAMES.filter(
        (name) =>
          name.includes(q) ||
          (ICON_LABELS[name] || '').toLowerCase().includes(q)
      );
    }, [filter]);

    const SelectedIcon = input.value ? ICONS[input.value] : null;

    return (
      <div className="relative">
        {/* Hidden input for Tina form binding */}
        <input type="hidden" {...input} />

        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-3 py-2 border rounded-md text-sm transition-colors ${
            open
              ? 'border-blue-500 shadow-sm'
              : 'border-gray-200 hover:border-gray-300'
          } bg-white`}
        >
          {SelectedIcon ? (
            <>
              <SelectedIcon size={22} className="text-blue-500 shrink-0" />
              <span className="flex-1 text-left text-gray-800">
                {ICON_LABELS[input.value] || input.value}
              </span>
            </>
          ) : (
            <span className="flex-1 text-left text-gray-400">Seleccionar icono…</span>
          )}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown grid */}
        {open && (
          <div className="absolute left-0 right-0 z-[9999] mt-1 bg-white border border-gray-200 rounded-lg shadow-xl">
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Buscar icono…"
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-blue-400"
                autoFocus
              />
            </div>

            {/* Grid */}
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredIcons.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-4">
                  Sin resultados
                </p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {filteredIcons.map((name) => {
                    const IconComp = ICONS[name];
                    const label = ICON_LABELS[name] || name;
                    const isSelected = input.value === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          input.onChange(name);
                          setOpen(false);
                          setFilter('');
                        }}
                        title={label}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs transition-colors ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        <IconComp size={18} className="shrink-0" />
                        <span className="truncate max-w-[80px]">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
