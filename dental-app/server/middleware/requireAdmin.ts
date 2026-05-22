import type { Request, Response, NextFunction } from 'express'
import { config } from '../config.js'
import { verifySession } from '../services/adminAuth.js'

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

  if (!token) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }

  const isStaticSession = token === config.admin.sessionKey
  const isServerSession = verifySession(token)

  if (!isStaticSession && !isServerSession) {
    res.status(401).json({ error: 'Sesión inválida o expirada' })
    return
  }

  next()
}
