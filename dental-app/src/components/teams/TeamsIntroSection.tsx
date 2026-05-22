import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { ArrowForward } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import LazyImage from '../common/LazyImage'
import { TEAMS_INTRO, SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'

type TeamsIntroSectionProps = {
  onServicesClick: () => void
  onBookingClick?: () => void
}

const TeamsIntroSection = ({ onServicesClick, onBookingClick }: TeamsIntroSectionProps) => {
  const handleKeyDownServices = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onServicesClick()
  }

  return (
    <Box
      component="section"
      aria-labelledby="teams-intro-heading"
      sx={{
        background: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.backgroundWarm} 50%, ${brandColors.background} 100%)`,
        py: { xs: 5, sm: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Typography
                variant="overline"
                color="primary.dark"
                sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '1rem' } }}
              >
                {TEAMS_INTRO.number}
              </Typography>
              <Typography
                id="teams-intro-heading"
                variant="h2"
                component="h1"
                color="secondary.dark"
              >
                {TEAMS_INTRO.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, maxWidth: '36rem' }}
              >
                {TEAMS_INTRO.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {SITE.cedProf} · {SITE.cofepris}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                {onBookingClick && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onBookingClick}
                    aria-label="Reservar cita"
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
                  onClick={onServicesClick}
                  onKeyDown={handleKeyDownServices}
                  aria-label="Ver servicios del consultorio"
                >
                  Ver servicios
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: brandColors.white,
                borderRadius: 3,
                border: `1px solid rgba(74, 85, 104, 0.1)`,
                boxShadow: '0 16px 40px rgba(74, 85, 104, 0.08)',
                maxWidth: { md: 520 },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <LazyImage
                src={TEAMS_INTRO.imageSrc}
                alt={TEAMS_INTRO.imageAlt}
                aspectRatio="16/10"
                objectFit="contain"
                priority
                backgroundColor={brandColors.white}
                sx={{
                  borderRadius: 2,
                  border: 'none',
                  boxShadow: 'none',
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default TeamsIntroSection
