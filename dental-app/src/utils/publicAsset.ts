import clinicBrandUrl from '../assets/clinic-brand.png'

/** Archivos en /public con el base path de Vite (ej. /DentalS/ en GitHub Pages). */
export const publicAsset = (path: string): string => {
  const file = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${file}`
}

/** Logo/imagen de la clínica — importada por Vite (ruta correcta en GitHub Pages). */
export const CLINIC_BRAND_IMAGE = clinicBrandUrl
