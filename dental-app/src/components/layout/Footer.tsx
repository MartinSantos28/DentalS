import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { SITE, NAV_ITEMS } from '../../data/content'
import { brandColors } from '../../theme/brand'

const footerLinkSx = {
  color: brandColors.white,
  opacity: 0.92,
  textDecoration: 'none',
  display: 'inline-block',
  py: 0.75,
  fontWeight: 500,
  '&:hover': { color: brandColors.goldLight, opacity: 1 },
  '&:focus-visible': {
    outline: `2px solid ${brandColors.goldLight}`,
    outlineOffset: 2,
  },
}

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'secondary.dark',
      color: 'common.white',
      py: { xs: 4, md: 5 },
      mt: 'auto',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" component="p" sx={{ fontWeight: 800, letterSpacing: 2, mb: 1 }}>
            {SITE.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
            {SITE.tagline}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
            {SITE.doctorName}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="subtitle2"
            component="h2"
            sx={{ color: brandColors.goldLight, fontWeight: 700, mb: 1.5 }}
          >
            Navegación
          </Typography>
          <Box component="nav" aria-label="Enlaces del pie de página">
            {NAV_ITEMS.filter((item) => !item.isAction).map((item) => (
              <Link
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{ ...footerLinkSx, display: 'block' }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography
            variant="subtitle2"
            component="h2"
            sx={{ color: brandColors.goldLight, fontWeight: 700, mb: 1.5 }}
          >
            Contacto
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
            {SITE.address}
          </Typography>
          <Link href={`tel:+52${SITE.phone.replace(/\D/g, '')}`} sx={footerLinkSx}>
            Tel: {SITE.phone}
          </Link>
          <Link href={SITE.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" sx={{ ...footerLinkSx, display: 'block' }}>
            Cómo llegar (Google Maps)
          </Link>
          <Link href={SITE.instagram} target="_blank" rel="noopener noreferrer" sx={{ ...footerLinkSx, display: 'block' }}>
            {SITE.instagramHandle}
          </Link>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.15)' }} />
      <Typography variant="caption" component="p" sx={{ opacity: 0.75 }}>
        {SITE.cofepris} · {SITE.cedProf}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </Typography>
    </Container>
  </Box>
)

export default Footer
