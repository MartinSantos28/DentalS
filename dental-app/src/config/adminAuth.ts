/** Login admin estático (solo frontend + token compartido con la API) */
export const STATIC_ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || 'ds-admin-2026'

export const ADMIN_SESSION_KEY =
  import.meta.env.VITE_ADMIN_SESSION_KEY || 'ds-admin-authenticated'

export const isValidAdminPassword = (password: string): boolean =>
  password === STATIC_ADMIN_PASSWORD

export const isAdminSessionActive = (token: string | null): boolean =>
  token === ADMIN_SESSION_KEY
