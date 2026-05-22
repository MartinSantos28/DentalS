import express from 'express'
import cors from 'cors'
import { config, isTwilioConfigured } from './config.js'
import appointmentsRouter from './routes/appointments.js'
import adminRouter from './routes/admin.js'

const app = express()

app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    storage: 'sqlite',
    whatsappTwilio: isTwilioConfigured(),
    timezone: config.timezone,
    maps: true,
  })
})

app.use('/api/appointments', appointmentsRouter)
app.use('/api/admin', adminRouter)

app.listen(config.port, () => {
  console.log(`API agendación: http://localhost:${config.port}`)
  console.log(`Almacenamiento: SQLite (open source, local)`)
  console.log(`Google Maps: enlaces de ubicación (sin API Calendar)`)
  console.log(`WhatsApp Twilio: ${isTwilioConfigured() ? 'configurado' : 'solo enlaces wa.me'}`)
})
