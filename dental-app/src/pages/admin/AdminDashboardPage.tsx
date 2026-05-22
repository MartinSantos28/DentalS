import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import { Delete, Refresh } from '@mui/icons-material'
import {
  deleteAdminAppointment,
  fetchAdminAppointments,
  fetchAdminStats,
  type AdminStats,
  type Appointment,
} from '../../api/admin'
import { brandColors } from '../../theme/brand'

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <Paper
    sx={{
      p: 3,
      textAlign: 'center',
      borderLeft: `4px solid ${brandColors.gold}`,
      bgcolor: brandColors.white,
    }}
  >
    <Typography variant="h3" sx={{ fontWeight: 800, color: brandColors.slateDark }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Paper>
)

const formatDate = (dateStr: string): string =>
  new Date(`${dateStr}T12:00:00`).toLocaleDateString('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filterDate, setFilterDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsData, appointmentsData] = await Promise.all([
        fetchAdminStats(),
        fetchAdminAppointments(filterDate || undefined),
      ])
      setStats(statsData)
      setAppointments(appointmentsData.appointments)
    } catch {
      setError('No se pudo cargar la información. ¿Está activo el servidor?')
    } finally {
      setLoading(false)
    }
  }, [filterDate])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar esta cita? El horario quedará disponible de nuevo.')) return
    try {
      await deleteAdminAppointment(id)
      await loadData()
    } catch {
      setError('No se pudo eliminar la cita')
    }
  }

  const handleClearFilter = () => {
    setFilterDate('')
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: brandColors.slateDark, mb: 3 }}>
        Citas agendadas
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {stats && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Citas hoy" value={stats.today} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Próximas citas" value={stats.upcoming} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard label="Total registradas" value={stats.total} />
          </Grid>
        </Grid>
      )}

      <Paper sx={{ p: 2, mb: 3, bgcolor: brandColors.white }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Filtrar por fecha"
            type="date"
            size="small"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Button variant="outlined" color="secondary" onClick={handleClearFilter}>
            Ver todas
          </Button>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={loadData}
            sx={{ bgcolor: brandColors.gold, '&:hover': { bgcolor: brandColors.goldDark } }}
          >
            Actualizar
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress sx={{ color: brandColors.gold }} />
        </Box>
      ) : appointments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No hay citas para mostrar.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Tabla de citas">
            <TableHead sx={{ bgcolor: brandColors.slateDark }}>
              <TableRow>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }}>Fecha</TableCell>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }}>Hora</TableCell>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }}>Paciente</TableCell>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }}>Teléfono</TableCell>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }}>Servicio</TableCell>
                <TableCell sx={{ color: brandColors.white, fontWeight: 700 }} align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>
                    <Chip label={row.time} size="small" sx={{ bgcolor: brandColors.backgroundWarm }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.service}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.id)}
                      aria-label={`Eliminar cita de ${row.name}`}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default AdminDashboardPage
