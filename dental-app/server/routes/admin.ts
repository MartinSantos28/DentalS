import { Router } from 'express'
import { z } from 'zod'
import { requireAdmin } from '../middleware/requireAdmin.js'
import {
  createSession,
  revokeSession,
  validatePassword,
} from '../services/adminAuth.js'
import {
  deleteAppointment,
  getAllAppointments,
  getAppointmentStats,
} from '../services/appointmentStore.js'
import { config } from '../config.js'

const router = Router()

const loginSchema = z.object({
  password: z.string().min(1),
})

router.post('/login', (req, res) => {
  try {
    const { password } = loginSchema.parse(req.body)
    if (!validatePassword(password)) {
      res.status(401).json({ error: 'Contraseña incorrecta' })
      return
    }
    const { token, expiresAt } = createSession()
    res.json({
      token,
      expiresAt,
      clinic: config.clinic.name,
    })
  } catch {
    res.status(400).json({ error: 'Datos inválidos' })
  }
})

router.post('/logout', requireAdmin, (req, res) => {
  const token = req.headers.authorization?.slice(7)
  if (token) revokeSession(token)
  res.json({ success: true })
})

router.get('/me', requireAdmin, (_req, res) => {
  res.json({
    role: 'admin',
    clinic: config.clinic.name,
    doctor: config.clinic.doctorName,
  })
})

router.get('/appointments', requireAdmin, (req, res) => {
  const date = typeof req.query.date === 'string' ? req.query.date : undefined
  const from = typeof req.query.from === 'string' ? req.query.from : undefined
  const to = typeof req.query.to === 'string' ? req.query.to : undefined

  const appointments = getAllAppointments({ date, from, to })
  res.json({ appointments, count: appointments.length })
})

router.get('/stats', requireAdmin, (_req, res) => {
  res.json(getAppointmentStats())
})

router.delete('/appointments/:id', requireAdmin, (req, res) => {
  const deleted = deleteAppointment(req.params.id)
  if (!deleted) {
    res.status(404).json({ error: 'Cita no encontrada' })
    return
  }
  res.json({ success: true, message: 'Cita eliminada' })
})

export default router
