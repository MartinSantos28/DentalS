import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router-dom'
import { SITE } from '../../data/content'

type BrandLogoProps = {
  height?: number
}

const BrandLogo = ({ height = 56 }: BrandLogoProps) => (
  <Box
    component={RouterLink}
    to="/"
    sx={{
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    }}
    aria-label={`${SITE.name} — inicio`}
  >
    <Box
      component="img"
      src="/logo.png"
      alt={`${SITE.doctorName} — ${SITE.name}`}
      sx={{
        height,
        width: 'auto',
        maxWidth: { xs: 180, sm: 240, md: 280 },
        objectFit: 'contain',
      }}
    />
  </Box>
)

export default BrandLogo
