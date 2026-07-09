// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || "master",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "/images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ════════════════════════════════════════════════════════════
      // Artículos
      // ════════════════════════════════════════════════════════════
      {
        name: "articles",
        label: "Art\xEDculos",
        path: "src/content/articles",
        format: "md",
        ui: {
          router: ({ document }) => `/portfolio/articles/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().replace(/[^\w]+/g, "-") || "untitled"
          }
        },
        fields: [
          { type: "string", name: "title", label: "T\xEDtulo", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Fecha", required: true },
          { type: "string", name: "author", label: "Autor", required: true },
          {
            type: "string",
            name: "category",
            label: "Categor\xEDa",
            required: true,
            options: [
              { label: "Investigaci\xF3n", value: "investigacion" },
              { label: "Actualidad", value: "actualidad" },
              { label: "Opini\xF3n", value: "opinion" },
              { label: "Cr\xF3nica", value: "cronica" }
            ]
          },
          { type: "string", name: "excerpt", label: "Extracto", ui: { component: "textarea" } },
          { type: "image", name: "coverImage", label: "Imagen de Portada" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Eventos
      // ════════════════════════════════════════════════════════════
      {
        name: "events",
        label: "Eventos",
        path: "src/content/events",
        format: "md",
        ui: {
          router: ({ document }) => `/student-life/events/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().replace(/[^\w]+/g, "-") || "untitled"
          }
        },
        fields: [
          { type: "string", name: "title", label: "T\xEDtulo", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Fecha", required: true },
          { type: "datetime", name: "endDate", label: "Fecha de Fin" },
          { type: "string", name: "location", label: "Ubicaci\xF3n", required: true },
          {
            type: "string",
            name: "type",
            label: "Tipo",
            required: true,
            options: [
              { label: "Foro", value: "foro" },
              { label: "Taller", value: "taller" },
              { label: "Charla", value: "charla" },
              { label: "Semana", value: "semana" },
              { label: "Acad\xE9mico", value: "academico" },
              { label: "Cultural", value: "cultural" }
            ]
          },
          { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
          { type: "image", name: "coverImage", label: "Imagen" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Profesores
      // ════════════════════════════════════════════════════════════
      {
        name: "faculty",
        label: "Profesores",
        path: "src/content/faculty",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, "-") || "untitled"
          }
        },
        fields: [
          { type: "string", name: "name", label: "Nombre", isTitle: true, required: true },
          { type: "string", name: "title", label: "T\xEDtulo Acad\xE9mico", required: true },
          { type: "string", name: "specialization", label: "Especializaci\xF3n", required: true },
          { type: "string", name: "email", label: "Correo Electr\xF3nico" },
          { type: "string", name: "bio", label: "Biograf\xEDa", ui: { component: "textarea" } },
          { type: "image", name: "photo", label: "Foto" },
          {
            type: "string",
            name: "status",
            label: "Estado",
            options: [
              { label: "Activo", value: "active" },
              { label: "Jubilado", value: "retired" }
            ]
          }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Personal Directivo
      // ════════════════════════════════════════════════════════════
      {
        name: "staff",
        label: "Personal Directivo",
        path: "src/content/staff",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, "-") || "untitled"
          }
        },
        fields: [
          { type: "string", name: "name", label: "Nombre", isTitle: true, required: true },
          { type: "string", name: "role", label: "Cargo", required: true },
          { type: "string", name: "department", label: "Departamento", required: true },
          { type: "string", name: "email", label: "Correo Electr\xF3nico" },
          { type: "string", name: "phone", label: "Tel\xE9fono" },
          { type: "image", name: "photo", label: "Foto" }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Testimonios
      // ════════════════════════════════════════════════════════════
      {
        name: "testimonials",
        label: "Testimonios",
        path: "src/content/testimonials",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.name?.toLowerCase().replace(/[^\w]+/g, "-") || "untitled"
          }
        },
        fields: [
          { type: "string", name: "name", label: "Nombre", isTitle: true, required: true },
          { type: "number", name: "graduationYear", label: "A\xF1o de Graduaci\xF3n", required: true },
          { type: "string", name: "currentRole", label: "Cargo Actual", required: true },
          { type: "string", name: "quote", label: "Testimonio", ui: { component: "textarea" } },
          { type: "image", name: "photo", label: "Foto" }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Cursos
      // ════════════════════════════════════════════════════════════
      {
        name: "courses",
        label: "Cursos",
        path: "src/content/courses",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.code?.toLowerCase() || "untitled"
          }
        },
        fields: [
          { type: "string", name: "code", label: "C\xF3digo", isTitle: true, required: true },
          { type: "string", name: "name", label: "Nombre", required: true },
          { type: "number", name: "semester", label: "Semestre", required: true },
          { type: "number", name: "credits", label: "Cr\xE9ditos", required: true },
          { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
          { type: "string", name: "pdfUrl", label: "URL de PDF" }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // Páginas — una collection por página
      // ════════════════════════════════════════════════════════════
      // ── Inicio ───────────────────────────────────────────────
      {
        name: "pageHome",
        label: "P\xE1gina \u2014 Inicio",
        path: "src/content/pages",
        format: "md",
        match: { include: "home" },
        ui: { router: () => "/" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo (admin)" },
          {
            type: "object",
            name: "hero",
            label: "Hero \u2014 Secci\xF3n Principal",
            fields: [
              { type: "string", name: "eyebrow", label: "Etiqueta superior" },
              { type: "string", name: "title_line1", label: "L\xEDnea 1 del t\xEDtulo" },
              { type: "string", name: "title_line2", label: "L\xEDnea 2 del t\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "cta_text", label: "Texto del bot\xF3n principal" },
              { type: "string", name: "cta_link", label: "Enlace del bot\xF3n principal" },
              { type: "string", name: "secondary_text", label: "Texto del bot\xF3n secundario" },
              { type: "string", name: "secondary_link", label: "Enlace del bot\xF3n secundario" }
            ]
          },
          {
            type: "object",
            name: "quickAccess",
            label: "Accesos R\xE1pidos",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo de la secci\xF3n" },
              {
                type: "object",
                name: "items",
                label: "Elementos (m\xE1x. 4)",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "T\xEDtulo" },
                  { type: "string", name: "subtitle", label: "Subt\xEDtulo (m\xF3vil)" },
                  { type: "string", name: "subtitle_desktop", label: "Subt\xEDtulo (escritorio)" },
                  { type: "string", name: "href", label: "Enlace" },
                  { type: "string", name: "aria_label", label: "Etiqueta ARIA" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "news",
            label: "Noticias \u2014 Secci\xF3n Destacada",
            fields: [
              { type: "string", name: "tag", label: "Etiqueta" },
              { type: "string", name: "category", label: "Categor\xEDa" },
              { type: "string", name: "title", label: "T\xEDtulo principal" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Imagen destacada" },
              { type: "string", name: "image_alt", label: "Texto alternativo" },
              { type: "string", name: "link_text", label: "Texto del enlace" },
              { type: "string", name: "link_href", label: "Enlace de la imagen" },
              {
                type: "object",
                name: "secondary",
                label: "Noticias secundarias",
                list: true,
                fields: [
                  { type: "string", name: "category", label: "Categor\xEDa" },
                  { type: "string", name: "title", label: "T\xEDtulo" },
                  { type: "datetime", name: "date", label: "Fecha" },
                  { type: "string", name: "href", label: "Enlace" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "video",
            label: "Video \u2014 Secci\xF3n Experiencia",
            fields: [
              { type: "string", name: "eyebrow", label: "Etiqueta superior" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "badge", label: "Insignia" },
              { type: "string", name: "video_id", label: "ID de YouTube" },
              { type: "string", name: "duration", label: "Duraci\xF3n" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer \u2014 Pie de P\xE1gina",
            fields: [
              { type: "string", name: "email", label: "Correo electr\xF3nico" },
              { type: "string", name: "phone", label: "Tel\xE9fono" },
              { type: "string", name: "schedule", label: "Horario" },
              { type: "string", name: "social_instagram", label: "Instagram (URL)" },
              { type: "string", name: "social_twitter", label: "Twitter / X (URL)" },
              { type: "string", name: "social_youtube", label: "YouTube (URL)" }
            ]
          }
        ]
      },
      // ── Contacto ─────────────────────────────────────────────
      {
        name: "pageContact",
        label: "P\xE1gina \u2014 Contacto",
        path: "src/content/pages",
        format: "md",
        match: { include: "contact" },
        ui: { router: () => "/contact" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          {
            type: "object",
            name: "items",
            label: "Contactos y Redes Sociales",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Valor" },
              { type: "string", name: "detail", label: "Detalle" },
              {
                type: "string",
                name: "icon",
                label: "Icono",
                options: ["envelope", "phone", "map-pin", "instagram-logo", "twitter-logo", "youtube-logo"]
              },
              { type: "string", name: "href", label: "Enlace" }
            ]
          }
        ]
      },
      // ── Historia ─────────────────────────────────────────────
      {
        name: "pageHistory",
        label: "P\xE1gina \u2014 Historia",
        path: "src/content/pages",
        format: "md",
        match: { include: "program-history" },
        ui: { router: () => "/program/history" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Cuerpo", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Elementos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "detail", label: "Detalle" }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Estad\xEDsticas",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Valor" },
              { type: "string", name: "label", label: "Etiqueta" }
            ]
          }
        ]
      },
      // ── Perfil del Egresado ──────────────────────────────────
      {
        name: "pageGraduateProfile",
        label: "P\xE1gina \u2014 Perfil del Egresado",
        path: "src/content/pages",
        format: "md",
        match: { include: "program-graduate-profile" },
        ui: { router: () => "/program/graduate-profile" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Cuerpo", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Elementos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              {
                type: "string",
                name: "icon",
                label: "Icono",
                options: [
                  "pencil",
                  "megaphone",
                  "video",
                  "globe",
                  "trend",
                  "camera",
                  "microphone",
                  "newspaper",
                  "users",
                  "chat",
                  "presentation",
                  "book",
                  "broadcast",
                  "cellphone",
                  "search",
                  "lightbulb",
                  "star"
                ]
              }
            ]
          },
          {
            type: "object",
            name: "headings",
            label: "Secciones",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "items", label: "Elementos", list: true }
            ]
          }
        ]
      },
      // ── Pasantías ────────────────────────────────────────────
      {
        name: "pageInternships",
        label: "P\xE1gina \u2014 Pasant\xEDas",
        path: "src/content/pages",
        format: "md",
        match: { include: "academics-internships" },
        ui: { router: () => "/academics/internships" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          { type: "string", name: "requirements", label: "Requisitos", list: true },
          {
            type: "object",
            name: "modalities",
            label: "Modalidades",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              {
                type: "string",
                name: "icon",
                label: "\xCDcono",
                options: [
                  "Briefcase",
                  "Heart",
                  "GraduationCap",
                  "Buildings",
                  "HandsClapping",
                  "UsersThree",
                  "Globe",
                  "Leaf",
                  "Star",
                  "Rocket",
                  "Lightbulb",
                  "BookOpen"
                ]
              }
            ]
          },
          { type: "string", name: "formUrl", label: "URL del Formulario" },
          {
            type: "object",
            name: "contact",
            label: "Contacto",
            fields: [
              { type: "string", name: "name", label: "Nombre" },
              { type: "string", name: "role", label: "Cargo" },
              { type: "string", name: "email", label: "Correo electr\xF3nico" },
              { type: "string", name: "phone", label: "Tel\xE9fono" },
              { type: "string", name: "office", label: "Oficina" }
            ]
          }
        ]
      },
      // ── Asociación de Estudiantes ────────────────────────────
      {
        name: "pageAssociation",
        label: "P\xE1gina \u2014 Asociaci\xF3n de Estudiantes",
        path: "src/content/pages",
        format: "md",
        match: { include: "student-life-association" },
        ui: { router: () => "/student-life/association" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          { type: "string", name: "activities", label: "Actividades", list: true },
          { type: "string", name: "participationText", label: "Texto de participaci\xF3n", ui: { component: "textarea" } },
          {
            type: "object",
            name: "alert",
            label: "Aviso informativo",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ── Grupos y Talleres ────────────────────────────────────
      {
        name: "pageGroups",
        label: "P\xE1gina \u2014 Grupos y Talleres",
        path: "src/content/pages",
        format: "md",
        match: { include: "student-life-groups" },
        ui: { router: () => "/student-life/groups" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          {
            type: "object",
            name: "groups",
            label: "Grupos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Nombre del grupo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "detail", label: "Detalle" },
              {
                type: "string",
                name: "icon",
                label: "\xCDcono",
                options: [
                  "Users",
                  "FilmStrip",
                  "MaskHappy",
                  "MicrophoneStage",
                  "Camera",
                  "PenNib",
                  "MusicNote",
                  "Palette",
                  "GameController",
                  "BookOpen",
                  "Headphones",
                  "Video",
                  "Lightbulb",
                  "Star",
                  "Rocket"
                ]
              }
            ]
          },
          {
            type: "object",
            name: "workshops",
            label: "Talleres",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Nombre del taller" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "detail", label: "Detalle" },
              {
                type: "string",
                name: "icon",
                label: "\xCDcono",
                options: [
                  "Users",
                  "FilmStrip",
                  "MaskHappy",
                  "MicrophoneStage",
                  "Camera",
                  "PenNib",
                  "MusicNote",
                  "Palette",
                  "GameController",
                  "BookOpen",
                  "Headphones",
                  "Video",
                  "Lightbulb",
                  "Star",
                  "Rocket"
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA \u2014 Crear nuevo grupo",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Texto del bot\xF3n" }
            ]
          }
        ]
      },
      // ── Servicio Comunitario ─────────────────────────────────
      {
        name: "pageCommunity",
        label: "P\xE1gina \u2014 Servicio Comunitario",
        path: "src/content/pages",
        format: "md",
        match: { include: "student-life-community" },
        ui: { router: () => "/student-life/community" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          { type: "string", name: "descriptionItems", label: "Descripci\xF3n", list: true, ui: { component: "textarea" } },
          { type: "string", name: "requirements", label: "Requisitos", list: true },
          {
            type: "object",
            name: "cta",
            label: "CTA \u2014 Iniciar proyecto",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Texto del bot\xF3n" }
            ]
          },
          {
            type: "object",
            name: "alert",
            label: "Aviso informativo",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ── Proceso de Admisión ──────────────────────────────────
      {
        name: "pageAdmissionProcess",
        label: "P\xE1gina \u2014 Proceso de Admisi\xF3n",
        path: "src/content/pages",
        format: "md",
        match: { include: "admission-process" },
        ui: { router: () => "/admission/process" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          { type: "string", name: "eyebrow", label: "Etiqueta" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Pasos del Proceso",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "detail", label: "Fecha / Per\xEDodo" },
              {
                type: "string",
                name: "icon",
                label: "Icono",
                options: ["clipboard-text", "files", "pencil-simple-line", "megaphone", "student"]
              },
              { type: "boolean", name: "emphasis", label: "Destacar" }
            ]
          }
        ]
      },
      // ── Requisitos de Admisión ───────────────────────────────
      {
        name: "pageAdmissionRequirements",
        label: "P\xE1gina \u2014 Requisitos de Admisi\xF3n",
        path: "src/content/pages",
        format: "md",
        match: { include: "admission-requirements" },
        ui: { router: () => "/admission/requirements" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          { type: "string", name: "eyebrow", label: "Etiqueta" },
          {
            type: "object",
            name: "items",
            label: "Documentos Requeridos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "headings",
            label: "Secciones",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "items", label: "Elementos", list: true }
            ]
          }
        ]
      },
      // ── Testimonios de Egresados ─────────────────────────────
      {
        name: "pageAlumniTestimonials",
        label: "P\xE1gina \u2014 Testimonios de Egresados",
        path: "src/content/pages",
        format: "md",
        match: { include: "alumni-testimonials" },
        ui: { router: () => "/alumni/testimonials" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          { type: "string", name: "eyebrow", label: "Etiqueta" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } }
        ]
      },
      // ── Formación Continua ───────────────────────────────────
      {
        name: "pageContinuingEducation",
        label: "P\xE1gina \u2014 Formaci\xF3n Continua",
        path: "src/content/pages",
        format: "md",
        match: { include: "alumni-continuing-education" },
        ui: { router: () => "/alumni/continuing-education" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          { type: "string", name: "eyebrow", label: "Etiqueta" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Cursos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "detail", label: "Duraci\xF3n" },
              {
                type: "string",
                name: "icon",
                label: "Icono",
                options: ["newspaper", "video", "megaphone", "camera"]
              },
              { type: "string", name: "href", label: "Enlace" }
            ]
          }
        ]
      },
      // ── Listado de Eventos ───────────────────────────────────
      {
        name: "pageEventsListing",
        label: "P\xE1gina \u2014 Listado de Eventos",
        path: "src/content/pages",
        format: "md",
        match: { include: "student-life-events-listing" },
        ui: { router: () => "/student-life/events" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } },
          {
            type: "object",
            name: "cta",
            label: "CTA \u2014 Organizar evento",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Texto del bot\xF3n" }
            ]
          },
          {
            type: "object",
            name: "emptyState",
            label: "Estado vac\xEDo",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              { type: "string", name: "label", label: "Texto del bot\xF3n" }
            ]
          }
        ]
      },
      // ── Currículo ────────────────────────────────────────────
      {
        name: "pageCurriculum",
        label: "P\xE1gina \u2014 Curr\xEDculo",
        path: "src/content/pages",
        format: "md",
        match: { include: "academics-curriculum" },
        ui: { router: () => "/academics/curriculum" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "pdfUrl", label: "URL del P\xE9nsum PDF" },
          {
            type: "object",
            name: "headings",
            label: "Secciones",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      // ── Contenido de Cursos ──────────────────────────────────
      {
        name: "pageCourseContent",
        label: "P\xE1gina \u2014 Contenido de Cursos",
        path: "src/content/pages",
        format: "md",
        match: { include: "academics-course-content" },
        ui: { router: () => "/academics/course-content" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          { type: "string", name: "body", label: "Texto introductorio", ui: { component: "textarea" } }
        ]
      },
      // ── Misión y Visión ──────────────────────────────────────
      {
        name: "pageMission",
        label: "P\xE1gina \u2014 Misi\xF3n y Visi\xF3n",
        path: "src/content/pages",
        format: "md",
        match: { include: "program-mission" },
        ui: { router: () => "/program/mission" },
        fields: [
          { type: "string", name: "pageType", ui: { component: "hidden" } },
          { type: "string", name: "pageId", ui: { component: "hidden" } },
          { type: "string", name: "title", label: "T\xEDtulo" },
          {
            type: "object",
            name: "headings",
            label: "Secciones",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "eyebrow", label: "Pie" }
            ]
          },
          {
            type: "object",
            name: "items",
            label: "Elementos",
            list: true,
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
