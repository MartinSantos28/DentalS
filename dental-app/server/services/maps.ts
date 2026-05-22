import { config } from '../config.js'

/** Enlace a Google Maps (solo ubicación, sin API de Calendar) */
export const buildGoogleMapsSearchLink = (): string => {
  const query = encodeURIComponent(config.clinic.mapsQuery)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export const buildGoogleMapsDirectionsLink = (): string => {
  const destination = encodeURIComponent(config.clinic.mapsQuery)
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}
