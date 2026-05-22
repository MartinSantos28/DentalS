import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TeamsIntroSection from '../components/teams/TeamsIntroSection'
import WhyChoosingUs from '../components/home/WhyChoosingUs'
import DoctorsSection from '../components/home/DoctorsSection'
import { DOCTORS_TEAM, SITE } from '../data/content'
import { useNavigate, useOutletContext } from 'react-router-dom'

type LayoutContext = {
  onBookingClick: () => void
}

const OurTeamsPage = () => {
  const navigate = useNavigate()
  const { onBookingClick } = useOutletContext<LayoutContext>()

  const handleServicesClick = () => {
    navigate('/services')
  }

  return (
    <Box>
      <TeamsIntroSection
        onServicesClick={handleServicesClick}
        onBookingClick={onBookingClick}
      />
      <WhyChoosingUs />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          Síguenos en Instagram {SITE.instagramHandle} para conocer más tratamientos y
          resultados de nuestros pacientes.
        </Typography>
      </Container>
      <DoctorsSection
        title="Dr. Daniel Sarmiento"
        subtitle="Odontólogo a cargo de DS Dental Aesthetics. Cédula profesional y registro COFEPRIS vigentes."
        doctors={DOCTORS_TEAM}
      />
    </Box>
  )
}

export default OurTeamsPage
