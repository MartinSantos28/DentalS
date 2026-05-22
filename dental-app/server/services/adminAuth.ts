import { randomUUID, timingSafeEqual } from 'node:crypto'
import { config } from '../config.js'

type Session = { expiresAt: number }

const sessions = new Map<string, Session>()

const safeCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export const validatePassword = (password: string): boolean =>
  safeCompare(password, config.admin.password)

export const createSession = (): { token: string; expiresAt: number } => {
  const token = randomUUID()
  const expiresAt = Date.now() + config.admin.sessionHours * 60 * 60 * 1000
  sessions.set(token, { expiresAt })
  return { token, expiresAt }
}

export const verifySession = (token: string | undefined): boolean => {
  if (!token) return false
  const session = sessions.get(token)
  if (!session) return false
  if (session.expiresAt < Date.now()) {
    sessions.delete(token)
    return false
  }
  return true
}

export const revokeSession = (token: string): void => {
  sessions.delete(token)
}
