import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'
import { Spinner } from './UI/LoadingDesign.jsx'


export const AdminRoute = () => {
  const { user, loading } = useAuth()

  
  if (loading) return <Spinner/>

  if (!user || user.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />
  }

  
  return <Outlet />
}