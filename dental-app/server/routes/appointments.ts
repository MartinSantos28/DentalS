import { Router } from 'express'
import { z } from 'zod'
import { config, isValidService } from '../config.js'
import {
  createAppointment,
  getAvailableSlots,
  isSlotStillAvailable,
} from '../services/scheduling.js'
import { buildGoogleMapsDirectionsLink, buildGoogleMapsSearchLink } from '../services/maps.js'
import { buildWhatsAppLink, buildWhatsAppMessage, sendWhatsAppMessages } from '../services/whatsapp.js'
import type { BookingResult } from '../types.js'

const router = Router()

const bookingSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  service: z.string().min(1, 'Servicio requerido'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
  message: z.string().optional(),
})

router.get('/availability', (req, res) => {
  try {
    const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).parse(req.query.date)
    const slots = getAvailableSlots(date)
    res.json({ date, slots, timezone: config.timezone })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Fecha inválida' })
      return
    }
    res.status(500).json({ error: 'No se pudo consultar disponibilidad' })
  }
})

router.get('/maps', (_req, res) => {
  res.json({
    searchLink: buildGoogleMapsSearchLink(),
    directionsLink: buildGoogleMapsDirectionsLink(),
    address: config.clinic.address,
  })
})

router.get('/services', (_req, res) => {
  res.json({ services: config.clinic.services })
})

router.post('/', async (req, res) => {
  try {
    const payload = bookingSchema.parse(req.body)

    if (!isValidService(payload.service)) {
      res.status(400).json({ error: 'Servicio no válido' })
      return
    }

    if (!isSlotStillAvailable(payload.date, payload.time)) {
      res.status(409).json({ error: 'El horario ya no está disponible. Elige otro.' })
      return
    }

    const dateLabel = new Date(`${payload.date}T12:00:00`).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: config.timezone,
    })

    const { appointmentId } = createAppointment(payload)
    const whatsapp = await sendWhatsAppMessages(payload, `${dateLabel} — ${payload.time}`)

    const fallbackLink = buildWhatsAppLink(
      config.clinic.whatsappNumber,
      buildWhatsAppMessage(payload, `${dateLabel} — ${payload.time}`),
    )

    const result: BookingResult = {
      success: true,
      appointmentId,
      mapsLink: buildGoogleMapsSearchLink(),
      mapsDirectionsLink: buildGoogleMapsDirectionsLink(),
      whatsappSent: whatsapp.sent,
      whatsappLink: whatsapp.patientLink,
      message: whatsapp.sent
        ? 'Cita agendada. Recibirás confirmación por WhatsApp con la ubicación en Maps.'
        : 'Cita agendada. Abre WhatsApp o Google Maps para confirmar.',
    }

    res.status(201).json({
      ...result,
      clinicWhatsAppLink: whatsapp.clinicLink || fallbackLink,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues[0]?.message || 'Datos inválidos' })
      return
    }
    if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
      res.status(409).json({ error: 'El horario ya fue reservado. Elige otro.' })
      return
    }
    console.error('Booking error:', error)
    res.status(500).json({ error: 'No se pudo agendar la cita. Intenta de nuevo.' })
  }
})

export default router
