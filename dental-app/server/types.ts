export type TimeSlot = {
  start: string
  end: string
  time: string
  label: string
}

export type BookingPayload = {
  name: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
}

export type BookingResult = {
  success: boolean
  appointmentId?: string
  mapsLink: string
  mapsDirectionsLink: string
  whatsappSent: boolean
  whatsappLink: string
  message: string
}
