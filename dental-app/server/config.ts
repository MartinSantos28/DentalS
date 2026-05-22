import 'dotenv/config'

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const CLINIC_SERVICE_LABELS = [
  'Limpieza Dental',
  'Blanqueamiento',
  'Ortodoncia',
  'Odontopediatría',
  'Endodoncia',
  'Prótesis',
  'Extracciones',
  'Resinas',
] as const

export const config = {
  port: parseNumber(process.env.PORT, 3004),
  timezone: process.env.TZ || 'America/Mexico_City',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  db: {
    fileName: process.env.DB_FILE || 'appointments.sqlite',
  },

  admin: {
    password: process.env.ADMIN_PASSWORD || 'ds-admin-2026',
    sessionKey: process.env.ADMIN_SESSION_KEY || 'ds-admin-authenticated',
    sessionHours: parseNumber(process.env.ADMIN_SESSION_HOURS, 8),
  },

  clinic: {
    name: process.env.CLINIC_NAME || 'DS Dental Aesthetics',
    doctorName: process.env.DOCTOR_NAME || 'Dr. Daniel Sarmiento',
    phone: process.env.CLINIC_PHONE || '961-254-4233',
    whatsappNumber: process.env.CLINIC_WHATSAPP || '529612544233',
    address: process.env.CLINIC_ADDRESS || 'Cintalapa, Chiapas, México',
    mapsQuery:
      process.env.CLINIC_MAPS_QUERY ||
      'DS Dental Aesthetics, Cintalapa, Chiapas, México',
    services: CLINIC_SERVICE_LABELS,
  },

  schedule: {
    slotMinutes: parseNumber(process.env.SLOT_MINUTES, 60),
    workDays: (process.env.WORK_DAYS || '1,2,3,4,5,6').split(',').map(Number),
    startHour: parseNumber(process.env.WORK_START_HOUR, 9),
    endHour: parseNumber(process.env.WORK_END_HOUR, 18),
    saturdayEndHour: parseNumber(process.env.SATURDAY_END_HOUR, 14),
  },

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM || '',
  },
}

export const isTwilioConfigured = (): boolean =>
  Boolean(config.twilio.accountSid && config.twilio.authToken && config.twilio.whatsappFrom)

export const isValidService = (service: string): boolean =>
  (config.clinic.services as readonly string[]).includes(service)
