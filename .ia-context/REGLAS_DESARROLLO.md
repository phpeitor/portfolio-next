# Reglas de desarrollo

## Comandos

- El repositorio declara Bun como gestor preferido y mantiene `bun.lock`; npm también está soportado.
- Instalar dependencias: `bun install` o `npm install`.
- Desarrollo: `bun dev` o `npm run dev`.
- Build de producción: `bun run build` o `npm run build`.
- Servir el build: `bun run start` o `npm run start`.
- Tipos: `npm run typecheck`.
- Lint: `npm run lint`.
- Formato: `npm run format`.
- Diagnóstico opcional: `npm run doctor`.

## Dependencias y cambios

- Respetar las versiones declaradas en `package.json` y `bun.lock`.
- No añadir dependencias si una utilidad existente o una API nativa resuelve el problema.
- Mantener sincronizados `package.json` y el lockfile cuando cambien dependencias.
- No editar archivos generados como `.next/`, `next-env.d.ts` o artefactos de build.

## Código

- Mantener TypeScript en modo estricto y evitar `any` o casts innecesarios.
- Seguir el patrón App Router: Server Components por defecto y `"use client"` solo cuando haya estado, eventos o APIs del navegador.
- Mantener el contenido repetitivo del sitio centralizado en `lib/content.ts`.
- Reutilizar componentes y utilidades antes de duplicar lógica.
- Mostrar errores de forma explícita; no ocultar excepciones con catches amplios.
- Mantener cambios quirúrgicos y no modificar archivos no relacionados.

## Control de calidad

- Comprobar tipos y lint después de cambios de código.
- Ejecutar el build antes de considerar terminado un cambio que afecte rutas, estilos o componentes.
- Probar en viewport móvil y escritorio los cambios de UI.
- Verificar navegación por teclado, nombres accesibles y contraste.