import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Menu, Close } from '@mui/icons-material'
import BrandLogo from '../common/BrandLogo'
import { NAV_ITEMS, SITE } from '../../data/content'
import { brandColors } from '../../theme/brand'
import { tokens } from '../../theme/tokens'

type HeaderProps = {
  onBookingClick: () => void
}

const Header = ({ onBookingClick }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  const handleNavClick = (_path: string, isAction?: boolean) => {
    if (isAction) {
      onBookingClick()
      handleDrawerClose()
      return
    }
    handleDrawerClose()
  }

  const drawer = (
    <Box
      component="nav"
      aria-label="Menú principal"
      sx={{ width: 300, pt: 1, pb: 2 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
        }}
      >
        <BrandLogo height={44} />
        <IconButton
          onClick={handleDrawerClose}
          aria-label="Cerrar menú"
          sx={{ color: brandColors.slate }}
        >
          <Close />
        </IconButton>
      </Box>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.label}
            component={item.isAction ? 'button' : RouterLink}
            to={item.isAction ? undefined : item.path}
            onClick={() => handleNavClick(item.path, item.isAction)}
            selected={!item.isAction && location.pathname === item.path}
          >
            <ListItemText
              primary={
                <Typography
                  component="span"
                  sx={{
                    fontWeight: !item.isAction && location.pathname === item.path ? 700 : 500,
                  }}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
        <ListItemButton
          component="a"
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemText primary="Instagram" />
        </ListItemButton>
      </List>
    </Box>
  )

  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: tokens.elevation.header,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: { xs: tokens.headerHeight.mobile, md: tokens.headerHeight.desktop },
          gap: 2,
        }}
      >
        <BrandLogo height={48} />

        <Box
          component="nav"
          aria-label="Navegación principal"
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
        >
          {NAV_ITEMS.map((item) =>
            item.isAction ? (
              <Button
                key={item.label}
                variant="contained"
                color="secondary"
                onClick={onBookingClick}
                aria-label="Reservar cita dental"
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                sx={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  color: location.pathname === item.path ? 'primary.dark' : 'text.primary',
                  position: 'relative',
                  '&::after': location.pathname === item.path
                    ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '20%',
                        right: '20%',
                        height: 2,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                      }
                    : {},
                }}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Button>
            ),
          )}
          <Link
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            aria-label={`Instagram ${SITE.instagramHandle}`}
            sx={{ ml: 0.5 }}
          >
            <Button variant="outlined" size="small" color="secondary">
              IG
            </Button>
          </Link>
        </Box>

        <IconButton
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' }, color: 'secondary.main' }}
        >
          <Menu />
        </IconButton>
      </Toolbar>

      <Drawer
        id="mobile-navigation"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Header
