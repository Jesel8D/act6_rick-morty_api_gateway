# act6_rick-morty_api_gateway

> **Capa de Coordinación (BFF)** — Arquitectura SOA | Proyecto Rick & Morty

API Gateway / Backend for Frontend desarrollado con **NestJS**. Actúa como único punto de entrada para el Frontend: distribuye las peticiones hacia la API pública de Rick & Morty y hacia el Microservicio de Persistencia. **No posee base de datos propia.**

## Rol en la Arquitectura SOA

```
Frontend → [API Gateway / BFF] → Persistence Microservice
                               Rick & Morty API (externa)
```

## Tecnologías

- NestJS 11
- TypeScript
- @nestjs/axios (HTTP client)
- RxJS

## Levantar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con las URLs locales

# 3. Iniciar en modo desarrollo (watch)
npm run start:dev
```

El servidor arranca en `http://localhost:3001`.

## Seguridad

CORS configurado para aceptar exclusivamente peticiones desde `FRONTEND_URL`. En producción, apunta a la URL de Vercel.

## Producción

Desplegado en **Render** como Web Service Node.js.  
Build: `npm install && npm run build` | Start: `node dist/main`
