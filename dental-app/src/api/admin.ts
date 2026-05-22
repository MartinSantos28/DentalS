import {
  ADMIN_SESSION_KEY,
  isAdminSessionActive,
  isValidAdminPassword,
} from '../config/adminAuth'

export type Appointment = {
  id: string
  name: string
  phone: string
  service: string
  date: string
  time: string
  end_time: string
  message: string | null
  created_at: string
}

export type AdminStats = {
  total: number
  today: number
  upcoming: number
}

const API_BASE = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'ds_admin_token'

export const getAdminToken = (): string | null => sessionStorage.getItem(TOKEN_KEY)

export const setAdminToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const clearAdminToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY)
}

const adminFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAdminToken()
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Error en la solicitud')
  }
  return data as T
}

/** Validación local — no llama al servidor */
export const adminLogin = (password: string): { token: string } => {
  if (!isValidAdminPassword(password)) {
    throw new Error('Contraseña incorrecta')
  }
  setAdminToken(ADMIN_SESSION_KEY)
  return { token: ADMIN_SESSION_KEY }
}

export const adminLogout = (): void => {
  clearAdminToken()
}

export const fetchAdminStats = (): Promise<AdminStats> => adminFetch('/api/admin/stats')

export const fetchAdminAppointments = (date?: string): Promise<{ appointments: Appointment[] }> => {
  const query = date ? `?date=${date}` : ''
  return adminFetch(`/api/admin/appointments${query}`)
}

export const deleteAdminAppointment = (id: string): Promise<void> => {
  return adminFetch(`/api/admin/appointments/${id}`, { method: 'DELETE' })
}

/** Verificación local en sessionStorage */
export const verifyAdminSession = (): boolean => isAdminSessionActive(getAdminToken())
