import { Navigate, Outlet } from 'react-router-dom'
import { verifyAdminSession } from '../../api/admin'

const AdminRoute = () => {
  if (!verifyAdminSession()) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminRoute
