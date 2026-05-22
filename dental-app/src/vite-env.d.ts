/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_ADMIN_PASSWORD?: string
  readonly VITE_ADMIN_SESSION_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
