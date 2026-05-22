import { db, type AppointmentRow } from '../db/database.js'

export const getAllAppointments = (filters?: {
  date?: string
  from?: string
  to?: string
}): AppointmentRow[] => {
  if (filters?.date) {
    return db
      .prepare('SELECT * FROM appointments WHERE date = ? ORDER BY time ASC')
      .all(filters.date) as AppointmentRow[]
  }

  if (filters?.from && filters?.to) {
    return db
      .prepare(
        'SELECT * FROM appointments WHERE date >= ? AND date <= ? ORDER BY date ASC, time ASC',
      )
      .all(filters.from, filters.to) as AppointmentRow[]
  }

  return db
    .prepare('SELECT * FROM appointments ORDER BY date DESC, time ASC')
    .all() as AppointmentRow[]
}

export const getAppointmentById = (id: string): AppointmentRow | undefined =>
  db.prepare('SELECT * FROM appointments WHERE id = ?').get(id) as AppointmentRow | undefined

export const deleteAppointment = (id: string): boolean => {
  const result = db.prepare('DELETE FROM appointments WHERE id = ?').run(id)
  return result.changes > 0
}

export const getAppointmentStats = () => {
  const today = new Date().toISOString().split('T')[0]
  const total = db.prepare('SELECT COUNT(*) as count FROM appointments').get() as {
    count: number
  }
  const todayCount = db
    .prepare('SELECT COUNT(*) as count FROM appointments WHERE date = ?')
    .get(today) as { count: number }
  const upcoming = db
    .prepare('SELECT COUNT(*) as count FROM appointments WHERE date >= ?')
    .get(today) as { count: number }

  return {
    total: total.count,
    today: todayCount.count,
    upcoming: upcoming.count,
  }
}
