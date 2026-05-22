import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { ArrowForward } from '@mui/icons-material'
import LazyImage from '../common/LazyImage'
import { HERO } from '../../data/content'
import { brandColors } from '../../theme/brand'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1629909613654-28e377b37e8f?w=900&q=80'

type HeroSectionProps = {
  onDetailsClick: () => void
  onBookingClick?: () => void
}

const HeroSection = ({ onDetailsClick, onBookingClick }: HeroSectionProps) => {
  const handleKeyDownDetails = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onDetailsClick()
  }

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        background: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.backgroundWarm} 50%, ${brandColors.background} 100%)`,
        py: { xs: 5, sm: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography
                variant="overline"
                color="primary.dark"
                sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '1rem' } }}
              >
                {HERO.number}
              </Typography>
              <Typography
                id="hero-heading"
                variant="h2"
                component="h1"
                color="secondary.dark"
              >
                {HERO.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, maxWidth: '40rem' }}
              >
                {HERO.description}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                {onBookingClick && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onBookingClick}
                    aria-label="Reservar cita ahora"
                    sx={{ fontWeight: 700 }}
                  >
                    Reservar cita
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForward aria-hidden />}
                  onClick={onDetailsClick}
                  onKeyDown={handleKeyDownDetails}
                  aria-label="Ver todos los servicios"
                >
                  Ver servicios
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <LazyImage
              src={HERO_IMAGE}
              alt="Consultorio de odontología estética DS Dental Aesthetics"
              aspectRatio="5/4"
              sx={{
                border: `2px solid ${brandColors.gold}`,
                boxShadow: '0 16px 40px rgba(74, 85, 104, 0.12)',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HeroSection
