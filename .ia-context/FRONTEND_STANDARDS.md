# Estándares frontend del proyecto

## Alcance

El frontend es un portafolio editorial moderno construido con Next.js 16, App Router, React 19, TypeScript, Tailwind CSS v4 y Motion (`motion/react`). La página principal ya incluye todas las secciones del portfolio.

## Arquitectura de interfaz

- Las rutas, metadata, fuentes y estilos globales viven en `app/`.
- `app/page.tsx` es un Server Component asíncrono que obtiene ubicación y clima y compone las secciones.
- Las secciones viven en `components/`; los primitives compartidos están en `components/ui/` y los widgets interactivos en `components/widgets/`.
- Las utilidades y el contenido repetitivo viven en `lib/`; `lib/content.ts` es el punto principal para copy, proyectos, navegación y stack.
- Los recursos estáticos se sirven desde `public/assets/`; las imágenes de referencia del README viven en `project-images/`.
- Usar el alias `@/*` para imports internos.

## Estilo y UX

- Usar Tailwind CSS v4, tokens definidos en `app/globals.css` y `cn` de `lib/utils.ts`.
- Preservar el sistema editorial: canvas crema, bordes hairline, tipografía Geist/Geist Mono, acento naranja único y ausencia de sombras decorativas.
- Mantener responsive design, HTML semántico, nombres accesibles, navegación por teclado y contraste suficiente.
- Usar componentes pequeños, composables y tipos explícitos.
- Respetar `prefers-reduced-motion`; `Reveal` y el hero deben degradar las animaciones y evitar video cuando corresponde.

## Imágenes, video y motion

- Referenciar assets públicos con rutas `/assets/...` y usar `next/image` para imágenes.
- El hero alterna videos y posters day/night; no cambiar nombres o rutas sin actualizar `components/hero.tsx`.
- Pausar video fuera del viewport y evitar APIs del navegador en Server Components.
- Mantener la lógica de interacción en componentes `"use client"` y dejar el resto como Server Components.

## Validación

- Ejecutar `npm run typecheck`, `npm run lint` y `npm run build` antes de entregar cambios relevantes.
- Usar `npm run dev` para desarrollo y `npm run start` para probar el build de producción.
- Revisar los cambios de UI en viewport móvil y escritorio.