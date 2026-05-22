import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import type { ReactNode } from 'react'

type PageSectionProps = {
  children: ReactNode
  id?: string
  ariaLabelledby?: string
  background?: 'default' | 'paper' | 'warm'
  py?: { xs?: number; md?: number }
}

const backgrounds = {
  default: 'background.default',
  paper: 'background.paper',
  warm: '#F8F6F0',
} as const

const PageSection = ({
  children,
  id,
  ariaLabelledby,
  background = 'default',
  py = { xs: 6, md: 8 },
}: PageSectionProps) => (
  <Box
    component="section"
    id={id}
    aria-labelledby={ariaLabelledby}
    sx={{ bgcolor: backgrounds[background], py }}
  >
    <Container maxWidth="lg">{children}</Container>
  </Box>
)

export default PageSection
