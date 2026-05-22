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
  /** Imagen visible de inmediato (hero, above the fold) */
  priority?: boolean
}

const LazyImage = ({
  src,
  alt,
  sx = {},
  aspectRatio = '4/3',
  objectFit = 'cover',
  backgroundColor = brandColors.backgroundWarm,
  priority = false,
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const markLoaded = () => setLoaded(true)
  const markFailed = () => {
    setFailed(true)
    setLoaded(true)
  }

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
      {!loaded && !failed && (
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', inset: 0, height: '100%', bgcolor: backgroundColor }}
          aria-hidden
        />
      )}
      {failed ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: '0.875rem',
          }}
          role="img"
          aria-label={alt}
        >
          Imagen no disponible
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={markLoaded}
          onError={markFailed}
          sx={{
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
    </Box>
  )
}

export default LazyImage
