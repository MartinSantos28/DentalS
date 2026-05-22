import { createTheme } from '@mui/material/styles'
import { brandColors } from './brand'
import { tokens } from './tokens'

export const dentalTheme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  palette: {
    primary: {
      main: brandColors.gold,
      light: brandColors.goldLight,
      dark: brandColors.goldDark,
      contrastText: brandColors.slateDark,
    },
    secondary: {
      main: brandColors.slate,
      light: brandColors.slateLight,
      dark: brandColors.slateDark,
      contrastText: brandColors.white,
    },
    background: {
      default: brandColors.background,
      paper: brandColors.white,
    },
    text: {
      primary: brandColors.slateDark,
      secondary: brandColors.slate,
    },
    success: { main: '#2E7D4F' },
    error: { main: '#B42318' },
    divider: 'rgba(74, 85, 104, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: brandColors.slateDark,
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: brandColors.slateDark,
      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      color: brandColors.slateDark,
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      lineHeight: 1.25,
    },
    h4: { fontWeight: 600, color: brandColors.slateDark, lineHeight: 1.3 },
    h5: { fontWeight: 600, color: brandColors.slate, lineHeight: 1.35 },
    h6: { fontWeight: 600, color: brandColors.slate, lineHeight: 1.4 },
    body1: { lineHeight: 1.75, fontSize: '1rem' },
    body2: { lineHeight: 1.65, fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.9375rem' },
  },
  shape: { borderRadius: 12 },
  transitions: {
    duration: { short: 150, standard: 250, complex: 400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#root': { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: tokens.touchTargetMin,
          padding: '10px 24px',
          transition: `background-color ${tokens.transitionBase}, color ${tokens.transitionBase}, border-color ${tokens.transitionBase}, transform ${tokens.transitionFast}`,
          '&:active': { transform: 'scale(0.98)' },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            fontWeight: 700,
            '&:hover': { bgcolor: brandColors.goldDark },
          },
        },
        outlined: {
          borderColor: brandColors.slate,
          color: brandColors.slateDark,
          borderWidth: 2,
          '&:hover': {
            borderColor: brandColors.gold,
            borderWidth: 2,
            bgcolor: 'rgba(197, 160, 33, 0.08)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: tokens.touchTargetMin,
          minHeight: tokens.touchTargetMin,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: tokens.touchTargetMin,
          borderRadius: 8,
          '&.Mui-selected': {
            bgcolor: 'rgba(197, 160, 33, 0.12)',
            borderLeft: `3px solid ${brandColors.gold}`,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.gold,
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: tokens.elevation.card,
          border: `1px solid rgba(74, 85, 104, 0.08)`,
          transition: `box-shadow ${tokens.transitionBase}, transform ${tokens.transitionBase}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: tokens.elevation.dialog,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: brandColors.goldDark,
          fontWeight: 600,
          '&:hover': { color: brandColors.slateDark },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '&.MuiAlert-standardSuccess': {
            bgcolor: '#E8F5EC',
            color: '#1B4332',
          },
          '&.MuiAlert-standardError': {
            bgcolor: '#FEF3F2',
            color: '#7A271A',
          },
        },
      },
    },
  },
})
