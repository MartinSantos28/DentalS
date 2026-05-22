import GlobalStyles from '@mui/material/GlobalStyles'
import { brandColors } from './brand'
import { tokens } from './tokens'

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={{
      html: {
        scrollBehavior: 'smooth',
      },
      '@media (prefers-reduced-motion: reduce)': {
        html: { scrollBehavior: 'auto' },
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
        },
      },
      body: {
        margin: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      ':focus-visible': {
        outline: 'none',
        boxShadow: tokens.focusRing,
      },
      '.skip-link': {
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden',
        zIndex: 9999,
        padding: '12px 24px',
        backgroundColor: brandColors.gold,
        color: brandColors.slateDark,
        fontWeight: 700,
        textDecoration: 'none',
        borderRadius: 8,
      },
      '.skip-link:focus': {
        left: 16,
        top: 16,
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        boxShadow: tokens.focusRing,
      },
    }}
  />
)
