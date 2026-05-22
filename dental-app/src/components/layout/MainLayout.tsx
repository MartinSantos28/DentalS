import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { CalendarMonth } from '@mui/icons-material'
import SkipLink from '../common/SkipLink'
import Header from './Header'
import Footer from './Footer'
import BookingDialog from '../common/BookingDialog'
import { brandColors } from '../../theme/brand'
import { tokens } from '../../theme/tokens'

const MainLayout = () => {
  const [bookingOpen, setBookingOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleBookingOpen = () => {
    setBookingOpen(true)
  }

  const handleBookingClose = () => {
    setBookingOpen(false)
  }

  useEffect(() => {
    if (location.pathname !== '/booking') return
    setBookingOpen(true)
    navigate('/', { replace: true })
  }, [location.pathname, navigate])

  return (
    <>
      <SkipLink />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onBookingClick={handleBookingOpen} />
        <Box
          component="main"
          id="contenido-principal"
          tabIndex={-1}
          sx={{ flex: 1, outline: 'none' }}
        >
          <Outlet context={{ onBookingClick: handleBookingOpen }} />
        </Box>
        <Footer />
        <BookingDialog open={bookingOpen} onClose={handleBookingClose} />

        <Fab
          color="primary"
          aria-label="Reservar cita"
          onClick={handleBookingOpen}
          sx={{
            position: 'fixed',
            bottom: { xs: 24, md: 32 },
            right: { xs: 16, md: 32 },
            bgcolor: brandColors.gold,
            color: brandColors.slateDark,
            fontWeight: 700,
            minWidth: tokens.touchTargetMin,
            minHeight: tokens.touchTargetMin,
            boxShadow: tokens.elevation.dialog,
            '&:hover': { bgcolor: brandColors.goldDark },
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <CalendarMonth />
        </Fab>
      </Box>
    </>
  )
}

export default MainLayout
