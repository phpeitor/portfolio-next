export type Language = "en" | "es"

const TRANSLATIONS: Record<string, string> = {
  Work: "Trabajo",
  Capabilities: "Capacidades",
  Approach: "Proceso",
  Stack: "Tecnologías",
  About: "Sobre mí",
  "Let's talk": "Hablemos",
  "Practice areas": "Áreas de práctica",
  "Full-stack · AI-first engineer": "Ingeniero full-stack · AI-first",
  "Modern software,": "Software moderno,",
  "built to think,": "diseñado para pensar,",
  "shipped end-to-end.": "lanzado de principio a fin.",
  "I'm phpeitor, a full-stack engineer designing and shipping AI-native products from the inference layer to the last interaction.":
  "Soy phpeitor, un ingeniero full-stack que diseña y lanza productos nativos de IA, desde la inferencia hasta la última interacción.",
  "View selected work": "Ver proyectos destacados",
  "Get in touch": "Contactar",
  "Available for new work · Q3 2026": "Disponible para nuevos proyectos · Q3 2026",
  Scroll: "Desplazar",
  "Selected work": "Proyectos destacados",
  "What I do": "Lo que hago",
  "How I work": "Cómo trabajo",
  "Tools / 2026": "Herramientas / 2026",
  Contact: "Contacto",
  "Who": "Quién",
  "Three practices that compound engineering, AI systems, and interface design.":
    "Tres prácticas que combinan ingeniería, sistemas de IA y diseño de interfaces.",
  "Four moves, in order. Most of the work is removing things before adding them.":
    "Cuatro pasos, en orden. Gran parte del trabajo consiste en quitar antes de añadir.",
  "A small, durable toolchain I trust to take an idea all the way to production.":
    "Una cadena de herramientas pequeña y sólida para llevar una idea hasta producción.",
  "A boring stack, on purpose.": "Una pila aburrida, a propósito.",
  "Stable defaults, opinionated where it matters, and replaceable where it doesn't. The result is a product that ships faster the second time and the tenth time.":
    "Valores estables por defecto, decisiones firmes donde importan y piezas reemplazables donde no. El resultado es un producto que se entrega más rápido cada vez.",
  "Have an AI product, SaaS idea, or workflow worth building?":
    "¿Tienes un producto de IA, una idea SaaS o un flujo que valga la pena construir?",
  "Send a short brief. I'll help turn it into a focused, shippable product, usually within a couple of days, sometimes the same one.":
    "Envíame un resumen. Te ayudaré a convertirlo en un producto enfocado y listo para lanzar, normalmente en pocos días.",
  "Start a conversation": "Iniciar una conversación",
  "Book a 20-min intro": "Agendar una intro de 20 min",
  Based: "Ubicación",
  Practice: "Práctica",
  "Years shipping": "Años entregando",
  Availability: "Disponibilidad",
  Engagements: "Modalidades",
  "Selected product builds": "Proyectos seleccionados",
  "Fractional · Build · Advisory": "Fractional · Desarrollo · Asesoría",
  Site: "Sitio",
  "Start a project": "Iniciar un proyecto",
  "Independent developer building AI-first SaaS products. Available for selected engagements.":
    "Desarrollador independiente que construye productos SaaS con IA. Disponible para proyectos seleccionados.",
  Now: "Ahora",
  "Remote · Perú": "Remoto · Perú",
  Primary: "Principal",
  "Close menu": "Cerrar menú",
  "Open menu": "Abrir menú",
  "Previous project": "Proyecto anterior",
  "Next project": "Siguiente proyecto",
  "Project list": "Lista de proyectos",
  "A focused set of recent AI products and systems, each shipped to real users.":
    "Una selección de productos y sistemas recientes de IA, lanzados para usuarios reales.",
  "I'm a developer who cares about both the": "Soy un desarrollador al que le importan tanto el",
  system: "sistema",
  "and the": "como la",
  surface: "superficie",
  "the architecture users never see, and the interface they feel every second.":
    "la arquitectura que los usuarios nunca ven y la interfaz que sienten cada segundo.",
  "Token usage": "Uso de tokens",
  tokens: "tokens",
  Updated: "Actualizado",
  "See breakdown": "Ver detalle",
  offline: "sin conexión",
  "Global model usage": "Uso global de modelos",
  "Global data unavailable": "Datos globales no disponibles",
  daily: "diario",
  Clear: "Despejado",
  "Partly cloudy": "Parcialmente nublado",
  Overcast: "Nublado",
  Fog: "Niebla",
  Drizzle: "Llovizna",
  Rain: "Lluvia",
  Snow: "Nieve",
  Showers: "Chubascos",
  Thunderstorm: "Tormenta",
  Cloudy: "Nublado",
  "Dataset Report": "Dataset Reportes",
  "Digital platform specializing in data management, exploration, and visualization, designed to transform complex information into structured datasets, interactive dashboards, and decision-oriented analysis tools.":
  "Plataforma digital especializada en la gestión, exploración y visualización de datos, diseñada para transformar información compleja en datasets estructurados, dashboards interactivos y herramientas de análisis orientadas a la toma de decisiones.",
  "Cotix360": "Cotix360",
  "A web platform specialized in the management and automation of commercial quotes, designed to simplify cost and sales price calculations. Its flexible architecture integrates tools for managing products, commercial recipes, freight, factors, margins, and exchange rates.":
  "Plataforma web especializada en la gestión y automatización de cotizaciones comerciales, diseñada para simplificar el cálculo de costos y precios de venta. Su arquitectura flexible integra herramientas para la gestión de productos, recetas comerciales, fletes, factores, márgenes y tipos de cambio.",
  "Xintra Elephpant": "Xintra Elephpant",
  "Its flexible architecture combines a responsive interface with reusable components, dynamic data visualization, and a user experience optimized for handling large volumes of data.":
  "Su arquitectura flexible combina una interfaz responsive con componentes reutilizables, visualización dinámica de información y una experiencia de usuario optimizada para trabajar con grandes volúmenes de datos.",
  "Marketo Ecommerce": "PHPeitor Ecommerce",
  "A clean, vertically menued multi-vendor e-commerce platform, perfect for your online business. Marketo's design maximizes available space in an elegant and user-friendly way to showcase a wide range of products in various formats.":
  "Multivendedor para comercio electrónico, limpio y con menú vertical, perfecto para tu negocio online. La idea de Marketo es aprovechar al máximo el espacio disponible de forma elegante y fácil de usar para mostrar una gran cantidad de productos de diferentes maneras.",
  "Pixitor Media": "Pixitor Media",
  "A digital solution specialized in professional photography, designed to create high-impact visual experiences and manage portfolios, galleries, and content delivery from a single environment.":
  "Solución digital especializada en fotografía profesional, diseñada para crear experiencias visuales de alto impacto y gestionar portfolios, galerías y entregas de contenido desde un único entorno.",
  "Product engineering": "Ingeniería de producto",
  "End-to-end SaaS systems built for actual production load. Type-safe APIs, predictable data layers, and a frontend that survives real users without ceremony.":
  "Sistemas SaaS integrales preparados para carga real de producción. APIs con tipos, capas de datos predecibles y un frontend resistente a usuarios reales.",
  "AI workflow systems": "Sistemas de flujos con IA",
  "Image, text, and agent pipelines that respect latency, cost, and failure modes. The hard parts — queues, retries, observability — built in from day one.":
  "Pipelines de imágenes, texto y agentes que cuidan la latencia, el coste y los fallos. Colas, reintentos y observabilidad desde el primer día.",
  "Interface design": "Diseño de interfaces",
  "Calm, opinionated product UI with restraint. Typography, hierarchy, and motion treated as engineering disciplines — not decoration applied at the end.":
  "Interfaces de producto claras y con criterio. Tipografía, jerarquía y movimiento tratados como disciplinas de ingeniería.",
  "Before any UI or schema. What does this product change for the people using it, and how do we know it worked?":
  "Antes de cualquier UI o esquema. ¿Qué cambia este producto para quienes lo usan y cómo sabremos que funcionó?",
  "The shortest path between a real user and a real outcome. Everything else is deferred until the core is honest.":
  "El camino más corto entre un usuario real y un resultado real. Todo lo demás espera hasta validar el núcleo.",
  "Type-safe from edge to database. Observability, retries, and migrations as first-class — not bolted on under pressure.":
  "Tipado de extremo a extremo. Observabilidad, reintentos y migraciones como elementos centrales, no añadidos bajo presión.",
  "The last 20% is where products stop feeling like demos. Latency, copy, motion, edge cases — sanded down until they disappear.":
  "El último 20% es donde los productos dejan de parecer demos. Latencia, copy, movimiento y casos límite pulidos hasta desaparecer.",
  "Designed & built with care by": "Diseñado y construido con cuidado por",
  "last updated 10 / 26": "última actualización 10 / 26",
  "AI SaaS products": "Productos SaaS con IA",
  "Full-stack systems": "Sistemas full-stack",
  "Workflow automation": "Automatización de flujos",
  "Product UI": "UI de producto",
  "API-first architecture": "Arquitectura API-first",
  "Understand the business goal": "Entender el objetivo de negocio",
  "Design the smallest useful product": "Diseñar el producto útil más pequeño",
  "Build with production architecture": "Construir con arquitectura de producción",
  "Refine until it feels effortless": "Refinar hasta que se sienta natural",
  "View case study": "Ver caso de estudio",
  Live: "Activo",
  Private: "Privado",
  "saved": "guardado",
  "editing": "editando",
}

export function translate(value: string, language: Language): string {
  return language === "es" ? (TRANSLATIONS[value] ?? value) : value
}
