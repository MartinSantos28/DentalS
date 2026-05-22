import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CheckCircleOutlined } from '@mui/icons-material'
import { MISSION, FEATURES } from '../../data/content'
import { brandColors } from '../../theme/brand'
import { tokens } from '../../theme/tokens'

const WhyChoosingUs = () => (
  <Box
    component="section"
    aria-labelledby="why-us-heading"
    sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.paper' }}
  >
    <Container maxWidth="lg">
      <Typography
        id="why-us-heading"
        variant="h4"
        component="h2"
        color="secondary.dark"
        gutterBottom
      >
        {MISSION.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: { xs: 3, md: 5 }, maxWidth: '56rem', lineHeight: 1.8 }}
      >
        {MISSION.text}
      </Typography>
      <Grid container spacing={2} role="list">
        {FEATURES.map((feature) => (
          <Grid key={feature} size={{ xs: 12, sm: 6, md: 3 }} role="listitem">
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderColor: brandColors.gold,
                transition: `box-shadow ${tokens.transitionBase}, transform ${tokens.transitionBase}`,
                '@media (hover: hover)': {
                  '&:hover': {
                    boxShadow: tokens.elevation.card,
                    transform: 'translateY(-4px)',
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  minHeight: tokens.touchTargetMin,
                }}
              >
                <CheckCircleOutlined
                  sx={{ color: brandColors.gold, flexShrink: 0, mt: 0.25 }}
                  aria-hidden
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
                  {feature}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)

export default WhyChoosingUs
