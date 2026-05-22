import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import DoctorCard from '../common/DoctorCard'
import type { Doctor } from '../../data/content'

type DoctorsSectionProps = {
  title?: string
  subtitle?: string
  doctors: Doctor[]
  compact?: boolean
}

const DoctorsSection = ({
  title = 'Nuestro equipo',
  subtitle = 'A cargo de DS Dental Aesthetics, el Dr. Daniel Sarmiento ofrece tratamientos de odontología estética con calidad y atención personalizada.',
  doctors,
  compact = false,
}: DoctorsSectionProps) => (
  <Box sx={{ py: { xs: 6, md: 8 } }}>
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" color="secondary.main" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.8 }}>
        {subtitle}
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid key={doctor.id} size={{ xs: 12, md: doctors.length === 1 ? 12 : 6 }}>
            <DoctorCard doctor={doctor} variant={compact ? 'compact' : 'full'} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)

export default DoctorsSection
