import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { adminLogin } from '../../api/admin'
import { SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'

const AdminLoginPage = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    try {
      adminLogin(password)
      navigate('/admin')
    } catch {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: brandColors.slateDark,
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          borderTop: `6px solid ${brandColors.gold}`,
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt={SITE.name}
          sx={{ height: 48, display: 'block', mx: 'auto', mb: 2 }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700, color: brandColors.slateDark, textAlign: 'center' }}>
          Administración
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          {SITE.doctorName} — Citas
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{ htmlInput: { 'aria-label': 'Contraseña de administrador' } }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: brandColors.gold,
            fontWeight: 700,
            '&:hover': { bgcolor: brandColors.goldDark },
          }}
        >
          Iniciar sesión
        </Button>
      </Paper>
    </Box>
  )
}

export default AdminLoginPage
