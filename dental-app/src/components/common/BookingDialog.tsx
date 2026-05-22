import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { Close, CheckCircle, LocationOn, Phone } from '@mui/icons-material'
import { CLINIC_SERVICES, SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'
import { CLINIC_BRAND_IMAGE } from '../../utils/publicAsset'
import { createBooking, fetchAvailability, type BookingResponse, type TimeSlot } from '../../api/booking'

const BOOKING_IMAGE =
  'https://images.unsplash.com/photo-1629909613654-28e377b37e8f?w=900&q=80'

type BookingDialogProps = {
  open: boolean
  onClose: () => void
}

type BookingForm = {
  name: string
  phone: string
  service: string
  date: string
  time: string
  message: string
}

const initialForm: BookingForm = {
  name: '',
  phone: '',
  service: CLINIC_SERVICES[0].label,
  date: '',
  time: '',
  message: '',
}

const getMinDate = (): string => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const BookingPanel = () => (
  <Box
    sx={{
      display: { xs: 'none', md: 'flex' },
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: { md: '40%' },
      minHeight: { md: 560 },
      position: 'relative',
      backgroundImage: `url(${BOOKING_IMAGE})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    aria-hidden
  >
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(165deg, ${brandColors.slateDark}ee 0%, ${brandColors.slate}cc 45%, ${brandColors.slateDark}dd 100%)`,
      }}
    />
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: brandColors.white,
      }}
    >
      <Box>
        <Box
          component="img"
          src={CLINIC_BRAND_IMAGE}
          alt={SITE.name}
          sx={{
            height: 48,
            width: 'auto',
            mb: 3,
            objectFit: 'contain',
            opacity: 0.95,
          }}
        />
        <Typography
          variant="overline"
          sx={{ color: brandColors.goldLight, fontWeight: 700, letterSpacing: 2 }}
        >
          {SITE.tagline}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, lineHeight: 1.3 }}>
          Reserva tu cita
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.9, lineHeight: 1.7, maxWidth: 280 }}>
          Odontología estética de calidad en {SITE.city}. Confirmación por WhatsApp y ubicación en
          Google Maps.
        </Typography>
      </Box>

      <Stack spacing={1.5} sx={{ mt: 4 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Phone sx={{ color: brandColors.gold, fontSize: 20 }} />
          <Typography variant="body2">{SITE.phone}</Typography>
        </Stack>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <LocationOn sx={{ color: brandColors.gold, fontSize: 20 }} />
          <Typography variant="body2">{SITE.city}, Chiapas</Typography>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 1 }} />
        <Typography variant="caption" sx={{ opacity: 0.75 }}>
          {SITE.cedProf} · {SITE.cofepris}
        </Typography>
      </Stack>
    </Box>
  </Box>
)

const BookingDialog = ({ open, onClose }: BookingDialogProps) => {
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BookingResponse | null>(null)

  useEffect(() => {
    if (!open || !form.date) {
      setSlots([])
      return
    }

    const loadSlots = async () => {
      setLoadingSlots(true)
      setError(null)
      setForm((prev) => ({ ...prev, time: '' }))
      try {
        const available = await fetchAvailability(form.date)
        setSlots(available)
        if (available.length === 0) {
          setError('No hay horarios disponibles este día. Elige otra fecha.')
        }
      } catch {
        setError('No se pudo cargar la disponibilidad. Verifica que el servidor esté activo.')
        setSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }

    loadSlots()
  }, [open, form.date])

  const handleClose = () => {
    setResult(null)
    setError(null)
    setForm(initialForm)
    setSlots([])
    onClose()
  }

  const handleChange = (field: keyof BookingForm) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleTimeChange = (event: SelectChangeEvent) => {
    setForm((prev) => ({ ...prev, time: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.time) {
      setError('Selecciona un horario disponible')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await createBooking({
        name: form.name,
        phone: form.phone,
        service: form.service,
        date: form.date,
        time: form.time,
        message: form.message || undefined,
      })
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo agendar la cita')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      aria-labelledby="booking-dialog-title"
      aria-describedby={result ? undefined : 'booking-dialog-desc'}
      role="dialog"
      aria-modal="true"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: { xs: '100%', sm: 560, md: 920 },
            m: { xs: 1, sm: 2 },
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: brandColors.white,
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: { md: 560 },
        }}
      >
        <BookingPanel />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: brandColors.white,
            borderLeft: { md: `4px solid ${brandColors.gold}` },
          }}
        >
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              height: 140,
              backgroundImage: `url(${BOOKING_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, ${brandColors.slateDark}dd, ${brandColors.slate}99)`,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'relative',
                zIndex: 1,
                color: brandColors.white,
                p: 2,
                fontWeight: 700,
              }}
            >
              Reservar cita
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 2.5, sm: 4 }, pt: 3, pb: 2, flex: 1 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography
                  id="booking-dialog-title"
                  variant="h5"
                  sx={{ fontWeight: 700, color: brandColors.slateDark }}
                >
                  {result ? '¡Cita registrada!' : 'Agenda tu consulta'}
                </Typography>
                {!result && (
                  <Typography
                    id="booking-dialog-desc"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, maxWidth: 400 }}
                  >
                    Completa el formulario. Te confirmamos por WhatsApp.
                  </Typography>
                )}
              </Box>
              <IconButton
                onClick={handleClose}
                aria-label="Cerrar"
                size="small"
                sx={{ color: brandColors.slate }}
              >
                <Close />
              </IconButton>
            </Stack>

            {result ? (
              <Stack spacing={2.5} sx={{ py: 2 }}>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <CheckCircle sx={{ fontSize: 56, color: brandColors.gold }} />
                </Box>
                <Alert
                  severity="success"
                  role="status"
                  sx={{
                    bgcolor: brandColors.backgroundWarm,
                    color: brandColors.slateDark,
                    '& .MuiAlert-icon': { color: brandColors.gold },
                  }}
                >
                  {result.message}
                </Alert>
                <Button
                  variant="contained"
                  component="a"
                  href={result.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  aria-label="Abrir WhatsApp con confirmación"
                >
                  Abrir WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component="a"
                  href={result.mapsDirectionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  aria-label="Ver ubicación en Google Maps"
                >
                  Cómo llegar — Google Maps
                </Button>
                {!result.whatsappSent && (
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Usa WhatsApp para enviar el mensaje de confirmación.
                  </Typography>
                )}
              </Stack>
            ) : (
              <Stack spacing={2}>
                {error && (
                  <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                <TextField
                  label="Nombre completo"
                  required
                  fullWidth
                  size="small"
                  value={form.name}
                  onChange={handleChange('name')}
                  slotProps={{ htmlInput: { 'aria-label': 'Nombre completo' } }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Teléfono (WhatsApp)"
                      required
                      fullWidth
                      size="small"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="9612544233"
                      slotProps={{ htmlInput: { 'aria-label': 'Teléfono' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      label="Tratamiento"
                      fullWidth
                      required
                      size="small"
                      value={form.service}
                      onChange={handleChange('service')}
                      slotProps={{ htmlInput: { 'aria-label': 'Tratamiento' } }}
                    >
                {CLINIC_SERVICES.map((service) => (
                  <MenuItem key={service.id} value={service.label}>
                    {service.label}
                  </MenuItem>
                ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Fecha"
                      type="date"
                      required
                      fullWidth
                      size="small"
                      value={form.date}
                      onChange={handleChange('date')}
                      slotProps={{
                        inputLabel: { shrink: true },
                        htmlInput: { min: getMinDate(), 'aria-label': 'Fecha' },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required size="small" disabled={!form.date || loadingSlots}>
                      <InputLabel id="time-slot-label">Horario</InputLabel>
                      <Select
                        labelId="time-slot-label"
                        label="Horario"
                        value={form.time}
                        onChange={handleTimeChange}
                        aria-label="Seleccionar horario"
                      >
                        {loadingSlots ? (
                          <MenuItem disabled value="">
                            Cargando...
                          </MenuItem>
                        ) : (
                          slots.map((slot) => (
                            <MenuItem key={slot.time} value={slot.time}>
                              {slot.label}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {loadingSlots && (
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} sx={{ color: brandColors.gold }} aria-hidden />
                    <Typography variant="caption" color="text.secondary">
                      Consultando horarios...
                    </Typography>
                  </Stack>
                )}

                <TextField
                  label="Mensaje (opcional)"
                  multiline
                  rows={2}
                  fullWidth
                  size="small"
                  value={form.message}
                  onChange={handleChange('message')}
                  slotProps={{ htmlInput: { 'aria-label': 'Mensaje adicional' } }}
                />

                <Typography variant="caption" sx={{ color: brandColors.slateLight }}>
                  ¿Prefieres escribir directo?{' '}
                  <Link
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: brandColors.goldDark, fontWeight: 600 }}
                  >
                    WhatsApp {SITE.phone}
                  </Link>
                </Typography>
              </Stack>
            )}
          </Box>

          <Box
            sx={{
              px: { xs: 2.5, sm: 4 },
              py: 2.5,
              borderTop: `1px solid ${brandColors.backgroundWarm}`,
              bgcolor: brandColors.background,
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <Button
              onClick={handleClose}
              disabled={submitting}
              aria-label="Cerrar"
              sx={{ color: brandColors.slate, fontWeight: 600 }}
            >
              {result ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!result && (
              <Button
                type="submit"
                variant="contained"
                disabled={submitting || loadingSlots || !form.time}
                aria-label="Confirmar cita"
                sx={{
                  px: 4,
                  bgcolor: brandColors.gold,
                  color: brandColors.white,
                  fontWeight: 700,
                  '&:hover': { bgcolor: brandColors.goldDark },
                  '&.Mui-disabled': {
                    bgcolor: `${brandColors.gold}55`,
                    color: brandColors.white,
                  },
                }}
              >
                {submitting ? 'Agendando...' : 'Confirmar cita'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default BookingDialog
