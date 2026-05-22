import { randomUUID } from 'node:crypto'
import { db, type AppointmentRow } from '../db/database.js'
import { config } from '../config.js'
import type { BookingPayload, TimeSlot } from '../types.js'

const formatSlotLabel = (dateStr: string, timeStr: string): string => {
  const date = new Date(`${dateStr}T${timeStr}:00-06:00`)
  return date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: config.timezone,
  })
}

const toIsoInTimezone = (dateStr: string, timeStr: string): string =>
  `${dateStr}T${timeStr}:00-06:00`

const getDayEndHour = (dateStr: string): number => {
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  return day === 6 ? config.schedule.saturdayEndHour : config.schedule.endHour
}

const getBookedTimesForDate = (dateStr: string): Set<string> => {
  const rows = db
    .prepare('SELECT time FROM appointments WHERE date = ?')
    .all(dateStr) as { time: string }[]

  return new Set(rows.map((r) => r.time))
}

const generateAllSlots = (dateStr: string): TimeSlot[] => {
  const date = new Date(`${dateStr}T12:00:00`)
  const dayOfWeek = date.getDay()

  if (!config.schedule.workDays.includes(dayOfWeek)) {
    return []
  }

  const endHour = getDayEndHour(dateStr)
  const slots: TimeSlot[] = []
  const { slotMinutes, startHour } = config.schedule

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += slotMinutes) {
      const endMinutes = hour * 60 + min + slotMinutes
      const endH = Math.floor(endMinutes / 60)
      const endM = endMinutes % 60
      if (endH > endHour || (endH === endHour && endM > 0)) break

      const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
      const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
      const startIso = toIsoInTimezone(dateStr, timeStr)
      const endIso = toIsoInTimezone(dateStr, endTimeStr)

      if (new Date(startIso) <= new Date()) continue

      slots.push({
        start: startIso,
        end: endIso,
        time: timeStr,
        label: formatSlotLabel(dateStr, timeStr),
      })
    }
  }

  return slots
}

export const getAvailableSlots = (dateStr: string): TimeSlot[] => {
  const booked = getBookedTimesForDate(dateStr)
  return generateAllSlots(dateStr).filter((slot) => !booked.has(slot.time))
}

export const isSlotStillAvailable = (dateStr: string, timeStr: string): boolean =>
  getAvailableSlots(dateStr).some((s) => s.time === timeStr)

export const createAppointment = (
  payload: BookingPayload,
): { appointmentId: string; row: AppointmentRow } => {
  const [startH, startM] = payload.time.split(':').map(Number)
  const totalEndMin = startH * 60 + startM + config.schedule.slotMinutes
  const endTimeStr = `${String(Math.floor(totalEndMin / 60)).padStart(2, '0')}:${String(totalEndMin % 60).padStart(2, '0')}`

  const id = randomUUID()

  const insert = db.prepare(`
    INSERT INTO appointments (id, name, phone, service, date, time, end_time, message)
    VALUES (@id, @name, @phone, @service, @date, @time, @end_time, @message)
  `)

  insert.run({
    id,
    name: payload.name,
    phone: payload.phone,
    service: payload.service,
    date: payload.date,
    time: payload.time,
    end_time: endTimeStr,
    message: payload.message || null,
  })

  const row = db
    .prepare('SELECT * FROM appointments WHERE id = ?')
    .get(id) as AppointmentRow

  return { appointmentId: id, row }
}
