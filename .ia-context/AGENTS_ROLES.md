# Roles para asistentes de IA

## Contexto del repositorio

`Nextjs-Developer-Portfolio` es un portafolio editorial de una sola página para CodeBucks. El sitio está implementado, no es un starter con secciones pendientes: `app/page.tsx` compone hero, práctica, proyectos, capacidades, proceso, stack y contacto.

La aplicación usa Next.js App Router, Server Components por defecto y componentes cliente solo para interacción, animación o APIs del navegador. El contenido repetitivo del sitio está centralizado en `lib/content.ts`.

## Exploración obligatoria

Antes de editar:

1. Revisar `README.md`, `package.json`, `tsconfig.json` y los archivos de la ruta afectada.
2. Comprobar `git status` y conservar cambios locales no relacionados.
3. Buscar componentes, utilidades y tokens existentes antes de duplicar lógica.
4. Identificar si el cambio afecta Server Components, componentes cliente, metadata, assets públicos o llamadas de red.

## Implementación

- Preferir cambios pequeños, tipados y coherentes con App Router.
- Seguir `FRONTEND_STANDARDS.md` para UI y `BACKEND_STANDARDS.md` para red y datos.
- Usar `REGLAS_DESARROLLO.md` para comandos, validación y dependencias.
- Mantener metadata, navegación, responsive design y accesibilidad al cambiar páginas o layout.
- No editar `.next/`, `next-env.d.ts` ni otros artefactos generados.
- No afirmar que una compilación es correcta si termina con errores de TypeScript, lint o build.

## Comunicación

- Reportar el alcance exacto del cambio, los archivos afectados y la validación ejecutada.
- Distinguir fallos reales de red de los fallbacks previstos para ubicación y clima.
- No crear secretos, credenciales ni archivos de configuración local con datos sensibles.