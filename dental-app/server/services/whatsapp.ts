import twilio from 'twilio'
import { config, isTwilioConfigured } from '../config.js'
import { buildGoogleMapsDirectionsLink } from './maps.js'
import type { BookingPayload } from '../types.js'

const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `52${digits}`
  if (digits.startsWith('52')) return digits
  return digits
}

export const buildWhatsAppMessage = (payload: BookingPayload, dateLabel: string): string => {
  const mapsLink = buildGoogleMapsDirectionsLink()
  const lines = [
    `🦷 *Nueva cita — ${config.clinic.name}*`,
    '',
    `👤 Paciente: ${payload.name}`,
    `📞 Teléfono: ${payload.phone}`,
    `🩺 Tratamiento: ${payload.service}`,
    `📅 Fecha: ${dateLabel}`,
    `🕐 Hora: ${payload.time}`,
  ]
  if (payload.message) lines.push(`📝 Notas: ${payload.message}`)
  lines.push('', `📍 Ubicación: ${config.clinic.address}`, mapsLink, '', 'Reservado desde el sitio web.')
  return lines.join('\n')
}

export const buildPatientConfirmationMessage = (
  payload: BookingPayload,
  dateLabel: string,
): string => {
  const mapsLink = buildGoogleMapsDirectionsLink()
  return [
    `Hola ${payload.name}, tu cita en *${config.clinic.name}* quedó registrada.`,
    '',
    `📅 ${dateLabel} a las ${payload.time}`,
    `🩺 ${payload.service}`,
    '',
    `📍 ${config.clinic.address}`,
    `🗺️ Cómo llegar: ${mapsLink}`,
    '',
    `Si necesitas reprogramar, escríbenos al ${config.clinic.phone}.`,
  ].join('\n')
}

export const buildWhatsAppLink = (phone: string, text: string): string => {
  const encoded = encodeURIComponent(text)
  return `https://wa.me/${normalizePhone(phone)}?text=${encoded}`
}

export const sendWhatsAppMessages = async (
  payload: BookingPayload,
  dateLabel: string,
): Promise<{ sent: boolean; clinicLink: string; patientLink: string }> => {
  const clinicMessage = buildWhatsAppMessage(payload, dateLabel)
  const patientMessage = buildPatientConfirmationMessage(payload, dateLabel)
  const clinicLink = buildWhatsAppLink(config.clinic.whatsappNumber, clinicMessage)
  const patientLink = buildWhatsAppLink(payload.phone, patientMessage)

  if (!isTwilioConfigured()) {
    return { sent: false, clinicLink, patientLink }
  }

  try {
    const client = twilio(config.twilio.accountSid, config.twilio.authToken)
    const patientWhatsApp = `whatsapp:+${normalizePhone(payload.phone)}`

    await client.messages.create({
      from: config.twilio.whatsappFrom,
      to: patientWhatsApp,
      body: patientMessage,
    })

    await client.messages.create({
      from: config.twilio.whatsappFrom,
      to: `whatsapp:+${config.clinic.whatsappNumber}`,
      body: clinicMessage,
    })

    return { sent: true, clinicLink, patientLink }
  } catch {
    return { sent: false, clinicLink, patientLink }
  }
}
