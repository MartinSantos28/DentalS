/** Archivos en /public con el base path de Vite (ej. /DentalS/ en GitHub Pages). */
export const publicAsset = (path: string): string => {
  const file = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${file}`
}

export const CLINIC_BRAND_IMAGE = publicAsset('clinic-brand.png')
