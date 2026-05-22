import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { adminLogout } from '../../api/admin'
import { SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'

const AdminLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: brandColors.background }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: brandColors.slateDark, borderBottom: `3px solid ${brandColors.gold}` }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColors.white }}>
              Panel Administrador
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.goldLight }}>
              {SITE.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate('/')}
              aria-label="Ir al sitio público"
            >
              Ver sitio
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{
                color: brandColors.goldLight,
                borderColor: brandColors.gold,
                '&:hover': { borderColor: brandColors.goldLight },
              }}
              aria-label="Cerrar sesión"
            >
              Salir
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default AdminLayout
