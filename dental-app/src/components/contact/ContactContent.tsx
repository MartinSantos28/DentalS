import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { Phone, Instagram, LocationOn } from '@mui/icons-material'
import { CONTACT, SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'

const ContactContent = () => (
  <Box
    sx={{
      background: `linear-gradient(135deg, ${brandColors.white} 0%, ${brandColors.background} 100%)`,
      py: { xs: 6, md: 10 },
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" color="secondary.main" gutterBottom>
        {CONTACT.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 600, lineHeight: 1.8 }}>
        {CONTACT.subtitle}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Phone color="primary" sx={{ fontSize: 40, mb: 2 }} aria-hidden />
              <Typography variant="h6" component="h2" gutterBottom>
                {CONTACT.talkTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                {CONTACT.talkDescription}
              </Typography>
              <Typography
                component="a"
                href={`tel:+52${SITE.phone.replace(/-/g, '')}`}
                variant="h6"
                color="primary"
                sx={{ textDecoration: 'none', fontWeight: 700, display: 'block', mb: 2 }}
                aria-label={`Llamar al ${SITE.phone}`}
                tabIndex={0}
              >
                {SITE.phone}
              </Typography>
              <Button
                variant="contained"
                component="a"
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar mensaje por WhatsApp"
              >
                WhatsApp
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Instagram color="primary" sx={{ fontSize: 40, mb: 2 }} aria-hidden />
              <Typography variant="h6" component="h2" gutterBottom>
                {CONTACT.instagramTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                {CONTACT.instagramDescription}
              </Typography>
              <Link
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="h6"
                color="primary"
                sx={{ fontWeight: 700, textDecoration: 'none' }}
                aria-label={`Instagram ${SITE.instagramHandle}`}
                tabIndex={0}
              >
                {SITE.instagramHandle}
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <LocationOn color="primary" sx={{ fontSize: 40, mb: 2 }} aria-hidden />
              <Typography variant="h6" component="h2" gutterBottom>
                {CONTACT.locationTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                📍 {SITE.address}
              </Typography>
              <Button
                variant="outlined"
                component="a"
                href={SITE.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 2 }}
                aria-label="Abrir Google Maps"
              >
                Ver en Google Maps
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                {SITE.cofepris}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {SITE.cedProf}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
)

export default ContactContent
