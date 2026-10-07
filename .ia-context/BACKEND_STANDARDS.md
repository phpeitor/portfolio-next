# Estándares backend y datos

## Alcance actual

No hay backend propio, base de datos, API routes, Server Actions ni autenticación. La página usa dos integraciones server-side sin API key:

- `lib/location.ts`: primero lee headers de geolocalización de Vercel; en desarrollo consulta `https://ipapi.co/json/`; si no puede resolverlos usa Bangalore como fallback.
- `lib/weather.ts`: consulta Open-Meteo con coordenadas redondeadas y cache de Next.js durante seis horas.

No crear una capa backend o persistencia para resolver necesidades de contenido estático.

## Red, datos y errores

- Ejecutar las llamadas externas desde el servidor siempre que sea posible.
- Validar y tipar respuestas externas antes de pasarlas a la UI.
- Mantener URLs, contratos, cache y normalización dentro de módulos reutilizables de `lib/`.
- Degradar explícitamente: la ubicación tiene fallback estático y el clima puede ser `null`, mostrando la UI sin datos meteorológicos.
- No exponer credenciales, coordenadas precisas innecesarias ni datos privados en componentes cliente.
- No introducir catches amplios que oculten errores nuevos; conservar los fallbacks existentes solo cuando sean parte del contrato.
- Si se agrega persistencia o una nueva API, documentar configuración local, límites, cache y estrategia de error antes de implementarla.

## Seguridad

- No guardar secretos en el repositorio; los archivos `.env*.local` están excluidos por `.gitignore`.
- No registrar respuestas externas ni información de ubicación personal.