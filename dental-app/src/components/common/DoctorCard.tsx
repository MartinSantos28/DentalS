import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import type { Doctor } from '../../data/content'
import { brandColors } from '../../theme/brand'

type DoctorCardProps = {
  doctor: Doctor
  variant?: 'full' | 'compact'
}

const getInitials = (name: string): string => {
  const parts = name.replace(/Dr\.\s*/i, '').split(/[\s,]+/)
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

const DoctorCard = ({ doctor, variant = 'full' }: DoctorCardProps) => (
  <Card sx={{ height: '100%' }} role="article" aria-label={`${doctor.name} profile`}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar
          sx={{ width: 56, height: 56, bgcolor: brandColors.slate, color: brandColors.white, fontWeight: 700 }}
          aria-hidden
        >
          {getInitials(doctor.name)}
        </Avatar>
        <Box>
          <Typography variant="h6" component="h3">
            {doctor.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: brandColors.goldDark }}>
            {doctor.title}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.8, display: variant === 'compact' ? '-webkit-box' : 'block', WebkitLineClamp: variant === 'compact' ? 4 : undefined, WebkitBoxOrient: 'vertical', overflow: variant === 'compact' ? 'hidden' : 'visible' }}
      >
        {doctor.bio}
      </Typography>
      {doctor.credentials && doctor.credentials.length > 0 && (
        <List dense sx={{ mt: 2 }}>
          {doctor.credentials.map((credential) => (
            <ListItem key={credential} disableGutters sx={{ display: 'list-item', pl: 2 }}>
              <ListItemText
                primary={credential}
                slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </CardContent>
  </Card>
)

export default DoctorCard
