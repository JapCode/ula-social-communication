import { defineConfig } from 'tinacms';
import { IconPickerInput } from './components/IconPicker';
import { StaffCollectionLink } from './components/StaffCollectionLink';
import { routerMap } from './generated-router';

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'master',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '/images/uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      // ════════════════════════════════════════════════════════════
      // Artículos
      // ════════════════════════════════════════════════════════════
      {
        name: 'articles',
        label: 'Artículos',
        path: 'src/content/articles',
        format: 'md',
        ui: {
          router: ({ document }) => `/portfolio/articles/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().replace(/[^\w]+/g, '-') || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Fecha', required: true },
          { type: 'string', name: 'author', label: 'Autor', required: true },
          {
            type: 'string',
            name: 'category',
            label: 'Categoría',
            required: true,
            options: [
              { label: 'Investigación', value: 'investigacion' },
              { label: 'Actualidad', value: 'actualidad' },
              { label: 'Opinión', value: 'opinion' },
              { label: 'Crónica', value: 'cronica' },
            ],
          },
          {
            type: 'object',
            name: 'contributors',
            label: 'Equipo / Créditos',
            description: 'Lista de personas que participaron en el artículo (investigación, redacción, fotografía, etc.)',
            list: true,
            ui: {
              component: 'group-list',
              itemProps: (item: any) => ({
                label: `${item.name || 'Nuevo colaborador'}${item.role ? ` — ${item.role}` : ' — sin rol'}`,
              }),
            },
            fields: [
              { type: 'string', name: 'name', label: 'Nombre', required: true },
              { type: 'string', name: 'role', label: 'Rol (ej: Investigación, Redacción, Fotografía, Edición)' },
            ],
          },
          { type: 'string', name: 'excerpt', label: 'Extracto', ui: { component: 'textarea' } },
          { type: 'string', name: 'authorRole', label: 'Rol del autor', description: 'Ej: Estudiante de 5to año, Docente investigador' },
          { type: 'image', name: 'coverImage', label: 'Imagen de Portada' },
          { type: 'rich-text', name: 'body', label: 'Contenido', isBody: true },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Eventos
      // ════════════════════════════════════════════════════════════
      {
        name: 'events',
        label: 'Eventos',
        path: 'src/content/events',
        format: 'md',
        ui: {
          router: ({ document }) => `/student-life/events/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().replace(/[^\w]+/g, '-') || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Fecha', required: true },
          { type: 'datetime', name: 'endDate', label: 'Fecha de Fin' },
          { type: 'string', name: 'location', label: 'Ubicación', required: true },
          {
            type: 'string',
            name: 'type',
            label: 'Tipo',
            required: true,
            options: [
              { label: 'Foro', value: 'foro' },
              { label: 'Taller', value: 'taller' },
              { label: 'Charla', value: 'charla' },
              { label: 'Semana', value: 'semana' },
              { label: 'Académico', value: 'academico' },
              { label: 'Cultural', value: 'cultural' },
            ],
          },
          { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
          { type: 'image', name: 'coverImage', label: 'Imagen' },
          { type: 'rich-text', name: 'body', label: 'Contenido', isBody: true },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Profesores
      // ════════════════════════════════════════════════════════════
      {
        name: 'faculty',
        label: 'Planta Profesoral',
        path: 'src/content/faculty',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, '-') || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Nombre', isTitle: true, required: true },
          { type: 'string', name: 'title', label: 'Título Académico', required: true },
          { type: 'string', name: 'specialization', label: 'Especialización', required: true },
          { type: 'string', name: 'email', label: 'Correo Electrónico' },
          { type: 'string', name: 'bio', label: 'Biografía', ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'status',
            label: 'Estado',
            options: [
              { label: 'Activo', value: 'active' },
              { label: 'Jubilado', value: 'retired' },
            ],
          },
          {
            type: 'string',
            name: 'classification',
            label: 'Clasificación',
            options: [
              { label: 'Ordinario', value: 'ordinario' },
              { label: 'Contratado', value: 'contratado' },
              { label: 'Jubilado', value: 'jubilado' },
              { label: 'Invitado', value: 'invitado' },
            ],
          },
          {
            type: 'string',
            name: 'subjects',
            label: 'Materias',
            list: true,
          },
          {
            type: 'string',
            name: 'academicPeriods',
            label: 'Periodos Académicos',
            list: true,
          },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Personal Directivo
      // ════════════════════════════════════════════════════════════
      {
        name: 'staff',
        label: 'Personal Directivo',
        path: 'src/content/staff',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, '-') || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Nombre', isTitle: true, required: true },
          { type: 'string', name: 'role', label: 'Cargo', required: true },
          { type: 'string', name: 'department', label: 'Departamento', required: true },
          { type: 'string', name: 'email', label: 'Correo Electrónico' },
          { type: 'string', name: 'phone', label: 'Teléfono' },
          { type: 'image', name: 'photo', label: 'Foto' },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Testimonios
      // ════════════════════════════════════════════════════════════
      {
        name: 'testimonials',
        label: 'Testimonios',
        path: 'src/content/testimonials',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, '-') || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Nombre', isTitle: true, required: true },
          { type: 'number', name: 'graduationYear', label: 'Año de Graduación', required: true },
          { type: 'string', name: 'currentRole', label: 'Cargo Actual', required: true },
          { type: 'string', name: 'quote', label: 'Testimonio', ui: { component: 'textarea' } },
          { type: 'image', name: 'photo', label: 'Foto' },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Cursos
      // ════════════════════════════════════════════════════════════
      {
        name: 'courses',
        label: 'Cursos',
        path: 'src/content/courses',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.code?.toLowerCase() || 'untitled',
          },
        },
        fields: [
          { type: 'string', name: 'code', label: 'Código', isTitle: true, required: true },
          { type: 'string', name: 'name', label: 'Nombre', required: true },
          { type: 'number', name: 'semester', label: 'Semestre', required: true },
          { type: 'number', name: 'credits', label: 'Créditos', required: true },
          { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
          { type: 'string', name: 'pdfUrl', label: 'URL de PDF' },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Navegación Global
      // ════════════════════════════════════════════════════════════
      {
        name: 'navigation',
        label: 'Navegación',
        path: 'src/content/global',
        format: 'json',
        match: { include: 'navigation' },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'label', label: 'Etiqueta del menú', ui: { component: 'hidden' } },
          { type: 'string', name: 'searchLabel', label: 'Texto del botón buscar' },
          { type: 'string', name: 'homeLabel', label: 'Texto del botón Inicio' },
          { type: 'string', name: 'ctaLabel', label: 'Texto del botón CTA' },
          { type: 'string', name: 'ctaHref', label: 'Enlace del botón CTA' },
          {
            type: 'object',
            name: 'groups',
            label: 'Grupos del menú',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || 'Grupo' }),
            },
            fields: [
              { type: 'string', name: 'label', label: 'Nombre del grupo (ej: La Carrera)' },
              {
                type: 'object',
                name: 'sections',
                label: 'Secciones',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.heading || 'Sección' }),
                },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de sección (ej: Institucional)' },
                  {
                    type: 'object',
                    name: 'items',
                    label: 'Enlaces',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.label || 'Enlace' }),
                    },
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto del enlace' },
                      { type: 'string', name: 'href', label: 'URL (ej: /program/mission)' },
                      { type: 'string', name: 'description', label: 'Descripción corta' },
                      { type: 'string', name: 'icon', label: 'Icono', ui: { component: IconPickerInput } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Footer Global
      // ════════════════════════════════════════════════════════════
      {
        name: 'footer',
        label: 'Footer',
        path: 'src/content/global',
        format: 'json',
        match: { include: 'footer' },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // ── Brand ───────────────────────────────────────────
          { type: 'string', name: 'brandDescription', label: 'Descripción de la marca' },

          // ── Redes sociales ──────────────────────────────────
          { type: 'string', name: 'social_instagram', label: 'Instagram (URL)' },
          { type: 'string', name: 'social_twitter', label: 'Twitter / X (URL)' },
          { type: 'string', name: 'social_youtube', label: 'YouTube (URL)' },
          { type: 'string', name: 'social_tiktok', label: 'TikTok (URL)' },

          // ── Sección de Contacto ─────────────────────────────
          { type: 'string', name: 'contactHeading', label: 'Título de sección Contacto' },
          { type: 'string', name: 'email', label: 'Correo electrónico' },
          { type: 'string', name: 'emailLabel', label: 'Etiqueta de Email' },
          { type: 'string', name: 'phone', label: 'Teléfono' },
          { type: 'string', name: 'phoneLabel', label: 'Etiqueta de Teléfono' },
          { type: 'string', name: 'schedule', label: 'Horario' },
          { type: 'string', name: 'scheduleLabel', label: 'Etiqueta de Horario' },

          // ── Columnas de enlaces (Admisión, Académico, etc.) ─
          {
            type: 'object',
            name: 'linkColumns',
            label: 'Columnas de Enlaces',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.heading || 'Columna' }),
            },
            fields: [
              { type: 'string', name: 'heading', label: 'Título de columna' },
              {
                type: 'object',
                name: 'links',
                label: 'Enlaces',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || 'Enlace' }),
                },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
            ],
          },

          // ── Enlaces secundarios ─────────────────────────────
          {
            type: 'object',
            name: 'secondaryLinks',
            label: 'Enlaces secundarios',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || 'Enlace' }),
            },
            fields: [
              { type: 'string', name: 'label', label: 'Texto' },
              { type: 'string', name: 'href', label: 'URL' },
            ],
          },

          // ── WhatsApp ───────────────────────────────────────
          { type: 'string', name: 'whatsappPhone', label: 'WhatsApp — Número (ej: 584120000000)' },
          { type: 'string', name: 'whatsappMessage', label: 'WhatsApp — Mensaje predeterminado', ui: { component: 'textarea' } },
          { type: 'string', name: 'whatsappTooltip', label: 'WhatsApp — Texto del tooltip' },

          // ── Copyright ─────────────────────────────────────
          { type: 'string', name: 'copyright', label: 'Texto de copyright (el año se agrega automáticamente)' },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // Páginas — Block-based (replaces all page* collections)
      // ════════════════════════════════════════════════════════════
      {
        name: 'pages',
        label: 'Páginas',
        path: 'src/content/pages',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return routerMap[document._sys.filename] || `/${document._sys.filename}`;
          },
          filename: {
            readonly: false,
            slugify: (values) => {
              // Use the title to generate a meaningful filename
              const title = values?.title;
              if (title) {
                return title
                  .toLowerCase()
                  .replace(/[^a-z0-9áéíóúñü]+/g, '-')
                  .replace(/^-|-$/g, '')
                  .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
                  .replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n')
                  .replace(/^-+|-+$/g, '');
              }
              // Fallback that produces a unique name for new pages
              const fallback = values?._sys?.filename;
              if (fallback && fallback !== 'page') return fallback;
              return `nueva-pagina`;
            },
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la página', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Descripción (meta)' },
          {
            type: 'string',
            name: 'slug',
            label: 'URL personalizada (opcional)',
            description: 'Ej: /program/convenios. Si se deja vacío, se usa el nombre del archivo.',
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Bloques de Contenido',
            list: true,
            ui: {
              visualSelector: true,
              itemProps: (item) => ({
                label: item?._template ? blockLabel(item._template) : 'Bloque',
              }),
            },
            templates: [
              // ── Page Header ────────────────────────────────────
              {
                name: 'pageHeader',
                label: 'Encabezado de Página',
                ui: { icon: 'heading' },
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior' },
                  { type: 'string', name: 'pageTitle', label: 'Título de la página' },
                  { type: 'string', name: 'subtitle', label: 'Subtítulo' },
                  {
                    type: 'object', name: 'breadcrumb', label: 'Migas de pan', list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto' },
                      { type: 'string', name: 'href', label: 'Enlace' },
                    ],
                  },
                ],
              },

              // ── Hero Banner ────────────────────────────────────
              {
                name: 'heroBanner',
                label: 'Hero — Encabezado Principal',
                ui: { icon: 'heading' },
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior' },
                  { type: 'string', name: 'titleLine1', label: 'Línea 1 del título (estilo Inicio)' },
                  { type: 'string', name: 'titleLine2', label: 'Línea 2 del título (estilo Inicio)' },
                  { type: 'string', name: 'title', label: 'Título (páginas interiores)' },
                  { type: 'string', name: 'subtitle', label: 'Subtítulo' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  {
                    type: 'object', name: 'ctas', label: 'Botones de acción', list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto' },
                      { type: 'string', name: 'href', label: 'Enlace' },
                      { type: 'boolean', name: 'isPrimary', label: '¿Es el botón principal?' },
                    ],
                  },
                ],
              },

              // ── Rich Text ─────────────────────────────────────
              {
                name: 'richText',
                label: 'Texto Enriquecido',
                ui: { icon: 'text' },
                fields: [
                  {
                    type: 'string', name: 'variant', label: 'Variante visual',
                    options: ['default', 'lead'],
                  },
                  { type: 'boolean', name: 'constrainWidth', label: 'Limitar ancho del texto (lead)' },
                  { type: 'string', name: 'body', label: 'Contenido', ui: { component: 'textarea' } },
                ],
              },

              // ── Items List ────────────────────────────────────
              {
                name: 'itemsList',
                label: 'Lista de Elementos',
                ui: { icon: 'list' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'intro', label: 'Texto introductorio', ui: { component: 'textarea' } },
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior (sección)' },
                  { type: 'boolean', name: 'constrainWidth', label: 'Limitar ancho del texto' },
                  {
                    type: 'string', name: 'variant', label: 'Estilo visual',
                    options: ['default', 'numbered', 'timeline', 'competencies'],
                  },
                  {
                    type: 'object', name: 'items', label: 'Elementos', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'detail', label: 'Detalle adicional' },
                      { type: 'string', name: 'href', label: 'Enlace' },
                      { type: 'string', name: 'icon', label: 'Icono', ui: { component: IconPickerInput } },
                      { type: 'boolean', name: 'emphasis', label: 'Destacar' },
                    ],
                  },
                ],
              },

              // ── Cards ─────────────────────────────────────────
              {
                name: 'cards',
                label: 'Tarjetas de Navegación',
                ui: { icon: 'grid' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  {
                    type: 'object', name: 'cards', label: 'Tarjetas', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'href', label: 'Enlace' },
                      { type: 'string', name: 'icon', label: 'Icono', ui: { component: IconPickerInput } },
                    ],
                  },
                ],
              },

              // ── Stats ─────────────────────────────────────────
              {
                name: 'stats',
                label: 'Estadísticas',
                ui: { icon: 'table' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'intro', label: 'Texto introductorio', ui: { component: 'textarea' } },
                  {
                    type: 'object', name: 'stats', label: 'Estadísticas', list: true,
                    fields: [
                      { type: 'string', name: 'value', label: 'Valor' },
                      { type: 'string', name: 'label', label: 'Etiqueta' },
                    ],
                  },
                ],
              },

              // ── CTA ───────────────────────────────────────────
              {
                name: 'cta',
                label: 'Llamado a la Acción',
                ui: { icon: 'button' },
                fields: [
                  {
                    type: 'string', name: 'variant', label: 'Variante visual',
                    options: ['default', 'banner'],
                  },
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior' },
                  { type: 'string', name: 'heading', label: 'Título' },
                  { type: 'string', name: 'body', label: 'Texto', ui: { component: 'textarea' } },
                  { type: 'string', name: 'label', label: 'Texto del botón' },
                  { type: 'string', name: 'href', label: 'Enlace del botón' },
                ],
              },

              // ── Contextual Help ─────────────────────────────
              {
                name: 'contextualHelp',
                label: 'Ayuda Contextual',
                ui: { icon: 'help' },
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior' },
                  { type: 'string', name: 'heading', label: 'Pregunta / Título' },
                  { type: 'string', name: 'body', label: 'Texto de ayuda', ui: { component: 'textarea' } },
                  {
                    type: 'object', name: 'links', label: 'Enlaces', list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.label || 'Enlace' }),
                    },
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto del enlace' },
                      { type: 'string', name: 'href', label: 'URL' },
                    ],
                  },
                ],
              },

              // ── Staff Directory ────────────────────────────
              {
                name: 'staffDirectory',
                label: 'Directorio de Autoridades',
                ui: { icon: 'team' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  { type: 'string', name: 'featuredStaffName', label: 'Director destacado — Nombre (tal cual en colección staff)' },
                  { type: 'string', name: 'direccionHeading', label: 'Etiqueta — Sección destacada' },
                  { type: 'string', name: 'equipoHeading', label: 'Etiqueta — Equipo' },
                  { type: 'string', name: '_staffLink', label: ' ', ui: { component: StaffCollectionLink } },
                  { type: 'string', name: 'contactHeading', label: 'Contacto — Título' },
                  { type: 'string', name: 'contactBody', label: 'Contacto — Cuerpo', ui: { component: 'textarea' } },
                  { type: 'string', name: 'contactHours', label: 'Contacto — Horario' },
                  { type: 'string', name: 'contactLocation', label: 'Contacto — Ubicación' },
                  { type: 'string', name: 'contactEmail', label: 'Contacto — Correo electrónico' },
                  { type: 'string', name: 'contactPhone', label: 'Contacto — Teléfono' },
                ],
              },

              // ── Faculty Directory ───────────────────────────
              {
                name: 'facultyDirectory',
                label: 'Directorio de Docentes',
                ui: { icon: 'team' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  { type: 'string', name: 'contactHeading', label: 'Contacto — Título' },
                  { type: 'string', name: 'contactBody', label: 'Contacto — Cuerpo', ui: { component: 'textarea' } },
                  { type: 'string', name: 'contactHours', label: 'Contacto — Horario' },
                  { type: 'string', name: 'contactLocation', label: 'Contacto — Ubicación' },
                ],
              },

              // ── Alert ─────────────────────────────────────────
              {
                name: 'alert',
                label: 'Aviso Informativo',
                ui: { icon: 'alert-circle' },
                fields: [
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'body', label: 'Texto', ui: { component: 'textarea' } },
                  {
                    type: 'string', name: 'variant', label: 'Variante',
                    options: ['info', 'warning', 'success', 'error'],
                  },
                ],
              },

              // ── Articles List ─────────────────────────────────
              {
                name: 'articlesList',
                label: 'Listado de Artículos',
                ui: { icon: 'newspaper' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección (opcional)' },
                ],
              },

              // ── Sections List ─────────────────────────────────
              {
                name: 'sectionsList',
                label: 'Secciones con Listas',
                ui: { icon: 'list' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'intro', label: 'Texto introductorio', ui: { component: 'textarea' } },
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior (sección)' },
                  { type: 'boolean', name: 'constrainWidth', label: 'Limitar ancho del texto' },
                  {
                    type: 'string', name: 'variant', label: 'Variante visual',
                    options: ['default', 'fields', 'curriculum'],
                  },
                  {
                    type: 'object', name: 'sections', label: 'Secciones', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'items', label: 'Elementos', list: true },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'eyebrow', label: 'Pie' },
                      {
                        type: 'string', name: 'style', label: 'Estilo visual',
                        options: ['card', 'highlight', 'plain'],
                      },
                    ],
                  },
                ],
              },

              // ── Contact Info ──────────────────────────────────
              {
                name: 'contactInfo',
                label: 'Información de Contacto',
                ui: { icon: 'mail' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'mapEmbed', label: 'Mapa embebido (código iframe)', ui: { component: 'textarea' } },
                  {
                    type: 'object', name: 'contacts', label: 'Contactos', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'value', label: 'Valor' },
                      { type: 'string', name: 'detail', label: 'Detalle' },
                      { type: 'string', name: 'icon', label: 'Icono', ui: { component: IconPickerInput } },
                      { type: 'string', name: 'href', label: 'Enlace' },
                    ],
                  },
                ],
              },

              // ── Quick Access ──────────────────────────────────
              {
                name: 'quickAccess',
                label: 'Accesos Rápidos (Inicio)',
                ui: { icon: 'navigation' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  {
                    type: 'object', name: 'items', label: 'Elementos (máx. 4)', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'subtitle', label: 'Subtítulo (móvil)' },
                      { type: 'string', name: 'subtitleDesktop', label: 'Subtítulo (escritorio)' },
                      { type: 'string', name: 'href', label: 'Enlace' },
                      { type: 'string', name: 'ariaLabel', label: 'Etiqueta ARIA' },
                    ],
                  },
                ],
              },

              // ── News Section ──────────────────────────────────
              {
                name: 'newsSection',
                label: 'Sección de Noticias (Inicio)',
                ui: { icon: 'note' },
                fields: [
                  { type: 'string', name: 'tag', label: 'Etiqueta' },
                  { type: 'string', name: 'category', label: 'Categoría' },
                  { type: 'string', name: 'title', label: 'Título principal' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Imagen destacada' },
                  { type: 'string', name: 'imageAlt', label: 'Texto alternativo' },
                  { type: 'string', name: 'linkText', label: 'Texto del enlace' },
                  { type: 'string', name: 'linkHref', label: 'Enlace de la imagen' },
                  {
                    type: 'object', name: 'secondary', label: 'Noticias secundarias', list: true,
                    fields: [
                      { type: 'string', name: 'category', label: 'Categoría' },
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'datetime', name: 'date', label: 'Fecha' },
                      { type: 'string', name: 'href', label: 'Enlace' },
                    ],
                  },
                ],
              },

              // ── Video Section ─────────────────────────────────
              {
                name: 'videoSection',
                label: 'Sección de Video (Inicio)',
                ui: { icon: 'play' },
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Etiqueta superior' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'badge', label: 'Insignia' },
                  { type: 'string', name: 'videoId', label: 'ID de YouTube' },
                  { type: 'string', name: 'duration', label: 'Duración (ej: "3:28")' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                ],
              },

              // ── Files ─────────────────────────────────────────
              {
                name: 'files',
                label: 'Archivos para Descargar',
                ui: { icon: 'file' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  {
                    type: 'object', name: 'files', label: 'Archivos', list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto del enlace' },
                      { type: 'string', name: 'url', label: 'URL del archivo' },
                    ],
                  },
                ],
              },

              // ── Groups & Workshops ────────────────────────────
              {
                name: 'groupsWorkshops',
                label: 'Grupos y Talleres',
                ui: { icon: 'users' },
                fields: [
                  {
                    type: 'object', name: 'groups', label: 'Grupos', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Nombre del grupo' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'detail', label: 'Detalle' },
                      { type: 'string', name: 'icon', label: 'Ícono', ui: { component: IconPickerInput } },
                    ],
                  },
                  {
                    type: 'object', name: 'workshops', label: 'Talleres', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Nombre del taller' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'detail', label: 'Detalle' },
                      { type: 'string', name: 'icon', label: 'Ícono', ui: { component: IconPickerInput } },
                    ],
                  },
                  {
                    type: 'object', name: 'cta', label: 'CTA',
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'body', label: 'Texto', ui: { component: 'textarea' } },
                      { type: 'string', name: 'label', label: 'Texto del botón' },
                    ],
                  },
                ],
              },

              // ── Modalities List ───────────────────────────────
              {
                name: 'modalitiesList',
                label: 'Modalidades (Pasantías)',
                ui: { icon: 'list' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'requirements', label: 'Requisitos', list: true },
                  {
                    type: 'object', name: 'modalities', label: 'Modalidades', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'string', name: 'icon', label: 'Ícono', ui: { component: IconPickerInput } },
                    ],
                  },
                  { type: 'string', name: 'formUrl', label: 'URL del Formulario' },
                  {
                    type: 'object', name: 'contact', label: 'Contacto',
                    fields: [
                      { type: 'string', name: 'name', label: 'Nombre' },
                      { type: 'string', name: 'role', label: 'Cargo' },
                      { type: 'string', name: 'email', label: 'Correo electrónico' },
                      { type: 'string', name: 'phone', label: 'Teléfono' },
                      { type: 'string', name: 'office', label: 'Oficina' },
                    ],
                  },
                ],
              },

              // ── Research Lines ────────────────────────────────
              {
                name: 'researchLines',
                label: 'Líneas de Investigación',
                ui: { icon: 'bullet-list' },
                fields: [
                  {
                    type: 'object', name: 'lines', label: 'Líneas de Investigación', list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                    ],
                  },
                  {
                    type: 'object', name: 'thesis', label: 'Trabajos de Grado',
                    fields: [
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'text', label: 'Texto', ui: { component: 'textarea' } },
                      { type: 'string', name: 'note', label: 'Nota' },
                    ],
                  },
                  {
                    type: 'object', name: 'contact', label: 'Contacto',
                    fields: [
                      { type: 'string', name: 'name', label: 'Nombre' },
                      { type: 'string', name: 'role', label: 'Cargo' },
                      { type: 'string', name: 'email', label: 'Correo electrónico' },
                      { type: 'string', name: 'phone', label: 'Teléfono' },
                      { type: 'string', name: 'office', label: 'Oficina' },
                    ],
                  },
                ],
              },

              // ── Association Info ──────────────────────────────
              {
                name: 'associationInfo',
                label: 'Asociación de Estudiantes',
                ui: { icon: 'users' },
                fields: [
                  { type: 'string', name: 'activities', label: 'Actividades', list: true },
                  { type: 'string', name: 'participationText', label: 'Texto de participación', ui: { component: 'textarea' } },
                  {
                    type: 'object',
                    name: 'voceros',
                    label: 'Voceros Estudiantiles',
                    list: true,
                    ui: {
                      component: 'group-list',
                      itemProps: (item) => ({ label: item?.name || 'Vocero' }),
                    },
                    fields: [
                      { type: 'string', name: 'name', label: 'Nombre completo', required: true },
                      { type: 'string', name: 'role', label: 'Cargo', description: 'Ej: Presidente, Vicepresidente, Secretario' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                      { type: 'image', name: 'photo', label: 'Foto' },
                    ],
                  },
                ],
              },

              // ── Community Service ─────────────────────────────
              {
                name: 'communityService',
                label: 'Servicio Comunitario',
                ui: { icon: 'heart' },
                fields: [
                  { type: 'string', name: 'descriptionItems', label: 'Descripción', list: true, ui: { component: 'textarea' } },
                  { type: 'string', name: 'requirements', label: 'Requisitos', list: true },
                ],
              },

              // ── Testimonials List ──────────────────────────────
              {
                name: 'testimonialsList',
                label: 'Lista de Testimonios',
                ui: { icon: 'quote' },
                fields: [
                  { type: 'string', name: 'heading', label: 'Título de la sección' },
                  { type: 'string', name: 'intro', label: 'Texto introductorio', ui: { component: 'textarea' } },
                  { type: 'string', name: 'featuredTestimonialName', label: 'Testimonio destacado — Nombre (tal cual en colección testimonials)' },
                ],
              },

            ],
          },
        ],
      },
    ],
  },
});

// Helper function for block item labels
function blockLabel(template: string): string {
  const labels: Record<string, string> = {
    pageHeader: 'Encabezado',
    heroBanner: 'Hero — Encabezado',
    richText: 'Texto',
    itemsList: 'Lista',
    cards: 'Tarjetas',
    stats: 'Estadísticas',
    cta: 'CTA',
    alert: 'Aviso',
    sectionsList: 'Secciones',
    contactInfo: 'Contacto',
    quickAccess: 'Accesos Rápidos',
    newsSection: 'Noticias',
    videoSection: 'Video',
    files: 'Archivos',
    groupsWorkshops: 'Grupos y Talleres',
    modalitiesList: 'Modalidades',
    researchLines: 'Investigación',
    associationInfo: 'Asociación',
    communityService: 'Serv. Comunitario',
    contextualHelp: 'Ayuda',
    staffDirectory: 'Autoridades',
    facultyDirectory: 'Docentes',
    testimonialsList: 'Testimonios',
  };
  return labels[template] || template;
}
