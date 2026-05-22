# DS Dental Aesthetics

Sitio web de **Dr. Daniel Sarmiento** — Odontología Estética en Cintalapa.  
React + MUI + agendación **open source** (SQLite) + **Google Maps** (ubicación) + WhatsApp + **panel admin**.

## Inicio rápido

```bash
cd dental-app
npm install
cp .env.example .env
npm run dev:all
```

- Frontend: http://localhost:5173  
- API: http://localhost:3001  

## Agendación (sin API de Google Calendar)

| Componente | Tecnología |
|------------|------------|
| Citas | **SQLite** local ([better-sqlite3](https://github.com/WiseLibs/better-sqlite3)) |
| Ubicación | Enlaces a **Google Maps** (búsqueda y cómo llegar) |
| Notificaciones | **WhatsApp** (Twilio opcional o wa.me) |

### Flujo

1. Paciente elige fecha → horarios libres desde SQLite  
2. Confirma cita → se guarda en `server/data/appointments.sqlite`  
3. WhatsApp con confirmación + enlace a Maps  
4. Botón **Cómo llegar — Google Maps** en la confirmación  

### Configuración mínima

Solo necesitas `.env` con datos de la clínica (ver `.env.example`).  
**No** se requiere cuenta de Google Cloud ni Calendar API.

### WhatsApp (opcional)

Variables `TWILIO_*` en `.env`. Sin Twilio, se usa el botón wa.me con mensaje prellenado.

### Google Maps

Ajusta `CLINIC_MAPS_QUERY` en `.env` con la dirección exacta del consultorio para que el pin sea preciso.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev:all` | Frontend + API |
| `npm run dev:server` | Solo API |
| `npm run build` | Build producción |

## Servicios del consultorio

Limpieza Dental · Blanqueamiento · Ortodoncia · Odontopediatría · Endodoncia · Prótesis · Extracciones · Resinas

## Panel administrador

- URL: http://localhost:5173/admin/login  
- Contraseña: variable `ADMIN_PASSWORD` en `.env` (por defecto `ds-admin-2026`)  
- Ver citas, filtrar por fecha, eliminar citas, estadísticas  

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado |
| GET | `/api/appointments/availability?date=YYYY-MM-DD` | Horarios libres |
| POST | `/api/appointments` | Crear cita |
| POST | `/api/admin/login` | Login admin |
| GET | `/api/admin/appointments` | Listar citas (auth) |
| DELETE | `/api/admin/appointments/:id` | Eliminar cita (auth) |

## Guía de diseño (UI/UX)

Ver [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) — paleta slate/dorado, accesibilidad WCAG 2.1, mobile-first y componentes del sistema.
