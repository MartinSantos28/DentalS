import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { ArrowForward } from '@mui/icons-material'
import { CLINIC_SERVICES, SERVICES_HERO, SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'
import { CLINIC_BRAND_IMAGE } from '../../utils/publicAsset'

type ServicesContentProps = {
  onBookingClick: () => void
}

const ServicesContent = ({ onBookingClick }: ServicesContentProps) => {
  const [selectedId, setSelectedId] = useState(CLINIC_SERVICES[0].id)
  const selected = CLINIC_SERVICES.find((s) => s.id === selectedId) ?? CLINIC_SERVICES[0]

  const handleKeyDownBook = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onBookingClick()
  }

  const handleSelectService = (id: string) => {
    setSelectedId(id)
  }

  const handleKeyDownService = (id: string) => (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleSelectService(id)
  }

  return (
    <Box component="article">
      <Box
        component="header"
        sx={{
          background: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.backgroundWarm} 100%)`,
          py: { xs: 5, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="img"
            src={CLINIC_BRAND_IMAGE}
            alt={SITE.name}
            sx={{ height: 56, mb: 2 }}
          />
          <Typography variant="h3" component="h1" color="secondary.main" gutterBottom>
            {SERVICES_HERO.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: brandColors.goldDark, fontWeight: 600, fontStyle: 'italic' }}
          >
            {SERVICES_HERO.subtitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {SERVICES_HERO.cta}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {CLINIC_SERVICES.map((service) => {
            const isActive = service.id === selectedId
            return (
              <Grid key={service.id} size={{ xs: 6, sm: 3 }}>
                <Paper
                  component="button"
                  type="button"
                  onClick={() => handleSelectService(service.id)}
                  onKeyDown={handleKeyDownService(service.id)}
                  elevation={isActive ? 4 : 1}
                  aria-label={`Servicio ${service.label}`}
                  aria-pressed={isActive}
                  sx={{
                    width: '100%',
                    minHeight: 48,
                    py: 2,
                    px: 1.5,
                    border: 'none',
                    borderRadius: 50,
                    cursor: 'pointer',
                    textAlign: 'center',
                    bgcolor: brandColors.white,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: isActive ? brandColors.gold : 'transparent',
                    boxShadow: isActive
                      ? `0 8px 24px ${brandColors.gold}33`
                      : '0 2px 12px rgba(74,85,104,0.08)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: brandColors.goldLight,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: brandColors.slateDark,
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      letterSpacing: 0.5,
                    }}
                  >
                    {service.label}
                  </Typography>
                </Paper>
              </Grid>
            )
          })}
        </Grid>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            borderLeft: `6px solid ${brandColors.gold}`,
            bgcolor: brandColors.background,
          }}
        >
          <Typography variant="overline" sx={{ color: brandColors.goldDark, fontWeight: 700 }}>
            {selected.label}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, mb: 2, color: brandColors.slateDark, fontWeight: 700 }}>
            {selected.description}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={onBookingClick}
              onKeyDown={handleKeyDownBook}
              aria-label={`Reservar cita de ${selected.label}`}
              tabIndex={0}
              sx={{
                bgcolor: brandColors.gold,
                fontWeight: 700,
                '&:hover': { bgcolor: brandColors.goldDark },
              }}
            >
              Agenda tu cita
            </Button>
            <Typography variant="body2" color="text.secondary">
              {SITE.contactPhone}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default ServicesContent
