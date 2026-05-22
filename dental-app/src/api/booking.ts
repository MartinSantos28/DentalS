export type TimeSlot = {
  start: string
  end: string
  time: string
  label: string
}

export type BookingRequest = {
  name: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
}

export type BookingResponse = {
  success: boolean
  appointmentId?: string
  mapsLink: string
  mapsDirectionsLink: string
  whatsappSent: boolean
  whatsappLink: string
  clinicWhatsAppLink?: string
  message: string
}

const API_BASE = import.meta.env.VITE_API_URL || ''

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Error en la solicitud')
  }
  return data as T
}

export const fetchAvailability = async (date: string): Promise<TimeSlot[]> => {
  const response = await fetch(`${API_BASE}/api/appointments/availability?date=${date}`)
  const data = await handleResponse<{ slots: TimeSlot[] }>(response)
  return data.slots
}

export const createBooking = async (payload: BookingRequest): Promise<BookingResponse> => {
  const response = await fetch(`${API_BASE}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse<BookingResponse>(response)
}
