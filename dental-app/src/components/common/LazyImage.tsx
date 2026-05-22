import { useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { brandColors } from '../../theme/brand'

type LazyImageProps = {
  src: string
  alt: string
  sx?: object
  aspectRatio?: string
  objectFit?: 'cover' | 'contain'
  backgroundColor?: string
}

const LazyImage = ({
  src,
  alt,
  sx = {},
  aspectRatio = '4/3',
  objectFit = 'cover',
  backgroundColor = brandColors.backgroundWarm,
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: backgroundColor,
        ...sx,
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', inset: 0, height: '100%', bgcolor: backgroundColor }}
          aria-hidden
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </Box>
  )
}

export default LazyImage
