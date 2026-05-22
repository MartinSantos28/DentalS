import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppGlobalStyles } from './theme/globalStyles'
import MainLayout from './components/layout/MainLayout'
import AdminRoute from './components/admin/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import ScrollToTop from './components/common/ScrollToTop'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import OurTeamsPage from './pages/OurTeamsPage'
import ContactPage from './pages/ContactPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import { dentalTheme } from './theme/theme'

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')

const BookingRedirect = () => <Navigate to="/" replace />

const App = () => (
  <ThemeProvider theme={dentalTheme}>
    <CssBaseline />
    <AppGlobalStyles />
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="teams" element={<OurTeamsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="booking" element={<BookingRedirect />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
